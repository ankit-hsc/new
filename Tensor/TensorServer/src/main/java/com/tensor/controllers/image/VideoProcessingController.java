package com.tensor.controllers.image;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.servlet.annotation.MultipartConfig;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tensor.exceptions.VGSException;
import com.tensor.mkv.MkvElementVisitException;
import com.tensor.models.ImageDetectionTO;
import com.tensor.models.JSONOutputModel;
import com.tensor.services.image.VideoProcessingService;
import com.tensor.utilities.RestURLConstants;

@RestController

public class VideoProcessingController {
	ExecutorService executorService = Executors.newFixedThreadPool(10);

	@Autowired
	VideoProcessingService videoProcessingService;

	private static final Logger LOGGER = (Logger) LogManager.getLogger(VideoProcessingController.class);

	/**
	 * To upload data of Terminal entities through file upload
	 * 
	 * @return JSONOutputModel
	 * @throws VGSException
	 * @throws ExecutionException
	 * @throws InterruptedException
	 */
	@RequestMapping(value = RestURLConstants.VIDEO_RECOGNITION, method = RequestMethod.POST)
	@ResponseBody
	public String parseImage(@RequestParam("file") MultipartFile multipartFile)throws VGSException, InterruptedException, ExecutionException {
		
		Future<String> future = executorService.submit(() -> {
			return UUID.randomUUID().toString();
		});

		if (multipartFile != null) {
			executorService.submit(() -> {
				try {
					videoProcessingService.streamVideo(future.get(), multipartFile.getInputStream());
				} catch (IOException | InterruptedException | ExecutionException e) {
					e.printStackTrace();
				}
			});
		}
		//executorService.shutdown();
		return future.get();
	}

	@RequestMapping(value = RestURLConstants.VIDEO_REPORT, method = RequestMethod.GET)
	@ResponseBody  
	public JSONOutputModel getImageData( @RequestParam(value="token") String token, @RequestParam(value="ml") String ML) throws VGSException, IOException, MkvElementVisitException, InterruptedException, ExecutionException, JSONException{
		JSONOutputModel output = new JSONOutputModel();
		List<String> resultList = new ArrayList<>();
		ImageDetectionTO imageDetectionTO=new ImageDetectionTO();
		try {
			resultList= videoProcessingService.createFrame(token,ML);

			if (resultList != null && !resultList.isEmpty()) {
				imageDetectionTO.setResult(resultList);;
				output.setData(imageDetectionTO);
				output.setMessage("Object Detected Successfully");
			} else {
				output.setData(imageDetectionTO);
				output.setMessage("Object Detection Data not available");
			}
		}
		catch(Exception e) {

		}
		return output;
	}
}
