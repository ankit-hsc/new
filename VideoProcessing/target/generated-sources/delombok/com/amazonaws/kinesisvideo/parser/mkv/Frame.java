// Generated by delombok at Tue Mar 06 12:22:48 IST 2018
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
package com.amazonaws.kinesisvideo.parser.mkv;

import com.amazonaws.kinesisvideo.parser.ebml.EBMLUtils;
import org.apache.commons.lang3.Validate;
import java.nio.ByteBuffer;

/**
 * Class that captures the meta-data and data for a frame in a Kinesis Video Stream.
 * This is based on the content of a SimpleBlock in Mkv.
 */
public class Frame {
    private final long trackNumber;
    private final int timeCode;
    private final boolean keyFrame;
    private final boolean invisible;
    private final boolean discardable;
    private final Lacing lacing;
    private final ByteBuffer frameData;


    public enum Lacing {
        NO, XIPH, EBML, FIXED_SIZE;
    }

    /**
     * Create a frame object for the provided data buffer.
     * Do not create a copy of the data buffer while creating the frame object.
     * @param simpleBlockDataBuffer The data buffer.
     * @return A frame containing the data buffer.
     */
    public static Frame withoutCopy(ByteBuffer simpleBlockDataBuffer) {
        FrameBuilder builder = getBuilderWithCommonParams(simpleBlockDataBuffer);
        ByteBuffer frameData = simpleBlockDataBuffer.slice();
        return builder.frameData(frameData).build();
    }

    /**
     * Create a frame object for the provided data buffer.
     * Create a copy of the data buffer while creating the frame object.
     * @param simpleBlockDataBuffer The data buffer.
     * @return A frame containing a copy of the data buffer.
     */
    public static Frame withCopy(ByteBuffer simpleBlockDataBuffer) {
        FrameBuilder builder = getBuilderWithCommonParams(simpleBlockDataBuffer);
        ByteBuffer frameData = ByteBuffer.allocate(simpleBlockDataBuffer.remaining());
        frameData.put(simpleBlockDataBuffer);
        frameData.flip();
        return builder.frameData(frameData).build();
    }

    /**
     * Create a FrameBuilder
     * @param simpleBlockDataBuffer
     * @return
     */
    private static FrameBuilder getBuilderWithCommonParams(ByteBuffer simpleBlockDataBuffer) {
        FrameBuilder builder = Frame.builder().trackNumber(EBMLUtils.readEbmlInt(simpleBlockDataBuffer)).timeCode((int) EBMLUtils.readDataSignedInteger(simpleBlockDataBuffer, 2));
        final long flag = EBMLUtils.readUnsignedIntegerSevenBytesOrLess(simpleBlockDataBuffer, 1);
        builder.keyFrame((flag & (1 << 7)) > 0).invisible((flag & (1 << 3)) > 0).discardable((flag & 1) > 0);
        final int laceValue = (int) (flag & 3 << 1) >> 1;
        final Lacing lacing = getLacing(laceValue);
        builder.lacing(lacing);
        return builder;
    }

    private static Lacing getLacing(int laceValue) {
        switch (laceValue) {
        case 0: 
            return Lacing.NO;

        case 1: 
            return Lacing.XIPH;

        case 2: 
            return Lacing.EBML;

        case 3: 
            return Lacing.FIXED_SIZE;

        default: 
            Validate.isTrue(false, "Invalid value of lacing " + laceValue);
        }
        throw new IllegalArgumentException("Invalid value of lacing " + laceValue);
    }


    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public static class FrameBuilder {
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private long trackNumber;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private int timeCode;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private boolean keyFrame;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private boolean invisible;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private boolean discardable;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private Lacing lacing;
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        private ByteBuffer frameData;

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        FrameBuilder() {
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder trackNumber(final long trackNumber) {
            this.trackNumber = trackNumber;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder timeCode(final int timeCode) {
            this.timeCode = timeCode;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder keyFrame(final boolean keyFrame) {
            this.keyFrame = keyFrame;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder invisible(final boolean invisible) {
            this.invisible = invisible;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder discardable(final boolean discardable) {
            this.discardable = discardable;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder lacing(final Lacing lacing) {
            this.lacing = lacing;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public FrameBuilder frameData(final ByteBuffer frameData) {
            this.frameData = frameData;
            return this;
        }

        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public Frame build() {
            return new Frame(trackNumber, timeCode, keyFrame, invisible, discardable, lacing, frameData);
        }

        @Override
        @SuppressWarnings("all")
        @javax.annotation.Generated("lombok")
        public String toString() {
            return "Frame.FrameBuilder(trackNumber=" + this.trackNumber + ", timeCode=" + this.timeCode + ", keyFrame=" + this.keyFrame + ", invisible=" + this.invisible + ", discardable=" + this.discardable + ", lacing=" + this.lacing + ", frameData=" + this.frameData + ")";
        }
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public static FrameBuilder builder() {
        return new FrameBuilder();
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public long getTrackNumber() {
        return this.trackNumber;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public int getTimeCode() {
        return this.timeCode;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public boolean isKeyFrame() {
        return this.keyFrame;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public boolean isInvisible() {
        return this.invisible;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public boolean isDiscardable() {
        return this.discardable;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public Lacing getLacing() {
        return this.lacing;
    }

    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public ByteBuffer getFrameData() {
        return this.frameData;
    }

    @java.beans.ConstructorProperties({"trackNumber", "timeCode", "keyFrame", "invisible", "discardable", "lacing", "frameData"})
    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    private Frame(final long trackNumber, final int timeCode, final boolean keyFrame, final boolean invisible, final boolean discardable, final Lacing lacing, final ByteBuffer frameData) {
        this.trackNumber = trackNumber;
        this.timeCode = timeCode;
        this.keyFrame = keyFrame;
        this.invisible = invisible;
        this.discardable = discardable;
        this.lacing = lacing;
        this.frameData = frameData;
    }

    @Override
    @SuppressWarnings("all")
    @javax.annotation.Generated("lombok")
    public String toString() {
        return "Frame(trackNumber=" + this.getTrackNumber() + ", timeCode=" + this.getTimeCode() + ", keyFrame=" + this.isKeyFrame() + ", invisible=" + this.isInvisible() + ", discardable=" + this.isDiscardable() + ", lacing=" + this.getLacing() + ")";
    }
}