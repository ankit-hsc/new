/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). 
You may not use this file except in compliance with the License. 
A copy of the License is located at

   http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. 
This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
package com.amazonaws.kinesisvideo.parser.utilities;

import static org.jcodec.codecs.h264.H264Utils.splitMOVPacket;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.jcodec.codecs.h264.H264Decoder;
import org.jcodec.codecs.h264.H264Utils;
import org.jcodec.codecs.h264.mp4.AvcCBox;
import org.jcodec.common.model.ColorSpace;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.jcodec.scale.Transform;
import org.jcodec.scale.Yuv420jToRgb;

import com.amazonaws.kinesisvideo.parser.TestResourceUtil;
import com.amazonaws.kinesisvideo.parser.ebml.InputStreamParserByteSource;
import com.amazonaws.kinesisvideo.parser.ebml.MkvTypeInfos;
import com.amazonaws.kinesisvideo.parser.mkv.Frame;
import com.amazonaws.kinesisvideo.parser.mkv.MkvDataElement;
import com.amazonaws.kinesisvideo.parser.mkv.MkvElement;
import com.amazonaws.kinesisvideo.parser.mkv.MkvElementVisitException;
import com.amazonaws.kinesisvideo.parser.mkv.MkvEndMasterElement;
import com.amazonaws.kinesisvideo.parser.mkv.MkvValue;
import com.amazonaws.kinesisvideo.parser.mkv.StreamingMkvReader;

/**
 * Test class to test {@link FragmentMetadataVisitor}.
 */

public class FragmentMetadataVisitorTest {
	private static final H264Decoder decoder = new H264Decoder();
	 private static final Transform transform = new Yuv420jToRgb();
	 private static byte[] codecPrivateData;
	 private static int counter=0;

    public static void createFrame() throws IOException, MkvElementVisitException {
        final InputStream in = TestResourceUtil.getTestInputStream("merged_output2.mkv");
        List<String> continuationTokens = new ArrayList<>();
        continuationTokens.add("91343852333181432392682062607743920146159169392");
        continuationTokens.add("91343852333181432397633822764885441725874549018");
        continuationTokens.add("91343852333181432402585582922026963247510532162");

        FragmentMetadataVisitor fragmentVisitor = FragmentMetadataVisitor.create();
        StreamingMkvReader mkvStreamReader =
                StreamingMkvReader.createDefault(new InputStreamParserByteSource(in));
        int segmentCount = 0;
        while(mkvStreamReader.mightHaveNext()) {
            Optional<MkvElement> mkvElement = mkvStreamReader.nextIfAvailable();
            if (mkvElement.isPresent()) {
                mkvElement.get().accept(fragmentVisitor);
                if (MkvTypeInfos.SIMPLEBLOCK.equals(mkvElement.get().getElementMetaData().getTypeInfo())) {
                	MkvDataElement dataElement = (MkvDataElement) mkvElement.get();
                	Frame frame = ((MkvValue<Frame>)dataElement.getValueCopy()).getVal();
                	MkvTrackMetadata trackMetadata = fragmentVisitor.getMkvTrackMetadata(frame.getTrackNumber());
                	process(frame,trackMetadata);
                	String result=TensorAPI.parseImage("frame-"+counter);
                	System.out.println("FrameTimeStamp: "+timeStamp(counter)+", "+result);
                	final Path path = Paths.get("E:\\Ankit\\AMAZON\\consumer\\amazon-kinesis-video-streams-parser-library\\src\\test\\resources\\Report\\report.txt");
                	Files.write(path, Arrays.asList("FrameTimeStamp: "+timeStamp(counter)+", "+result), StandardCharsets.UTF_8,
                			Files.exists(path) ? StandardOpenOption.APPEND : StandardOpenOption.CREATE);
                }
                if (MkvTypeInfos.SEGMENT.equals(mkvElement.get().getElementMetaData().getTypeInfo())) {
                    if (mkvElement.get() instanceof MkvEndMasterElement) {
                        if (segmentCount < continuationTokens.size()) {
                            Optional<String> continuationToken = fragmentVisitor.getContinuationToken();
                        }
                        segmentCount++;
                    }
                }
            }

        }
        System.out.println("Objects detected successfully");
        
    }
    
    public static void process(Frame frame, MkvTrackMetadata trackMetadata) throws IOException {
     	   ByteBuffer frameBuffer = frame.getFrameData();
           byte[] frameArray=frameBuffer.array();
           int pixelWidth = trackMetadata.getPixelWidth().get().intValue();
           int pixelHeight = trackMetadata.getPixelHeight().get().intValue();
            codecPrivateData = trackMetadata.getCodecPrivateData().array();
           Picture rgb = Picture.create(pixelWidth, pixelHeight, ColorSpace.RGB);
           BufferedImage renderImage = new BufferedImage(pixelWidth, pixelHeight, BufferedImage.TYPE_3BYTE_BGR);
           
           AvcCBox avcC = AvcCBox.parseAvcCBox(ByteBuffer.wrap(codecPrivateData));
           decoder.addSps(avcC.getSpsList());
           decoder.addPps(avcC.getPpsList());
           Picture buf = Picture.create(pixelWidth, pixelHeight, ColorSpace.YUV420J);
         
           List<ByteBuffer> byteBuffers = splitMOVPacket(frameBuffer, avcC);
           Picture pic = decoder.decodeFrameFromNals(byteBuffers, buf.getData());
           
           if (pic != null) {
               // Work around for color issues in JCodec
               // https://github.com/jcodec/jcodec/issues/59
               // https://github.com/jcodec/jcodec/issues/192
               byte[][] dataTemp = new byte[3][pic.getData().length];
               dataTemp[0] = pic.getPlaneData(0);
               dataTemp[1] = pic.getPlaneData(2);
               dataTemp[2] = pic.getPlaneData(1);
               Picture tmpBuf = Picture.createPicture(pixelWidth, pixelHeight, dataTemp, ColorSpace.YUV420J);
               transform.transform(tmpBuf, rgb);
               AWTUtil.toBufferedImage(rgb, renderImage);
               try {
               	if(renderImage!=null)
               	ImageIO.write(renderImage, "jpg", new File("E:\\Ankit\\AMAZON\\consumer\\amazon-kinesis-video-streams-parser-library\\src\\test\\resources\\frame\\"+String.format("frame-%s.jpg", ++counter)));
               	else
               		System.out.println("Empty Image");
               } catch (IOException e) {
               }
           }
        }
    
     public static String timeStamp(int frameNo) {
    	 long time=(1000/30)*frameNo;
    	 long second = (time / 1000) % 60;
    	 long minute = (time / (1000 * 60)) % 60;
    	 long hour = (time / (1000 * 60 * 60)) % 24;
    	 long milli=time-((hour*1000 * 60 * 60)+(minute*1000*60)+(second*1000));
    	 return  String.format("%02d:%02d:%02d:%d", hour, minute, second, milli);
     }
    
  
}
