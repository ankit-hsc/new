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
package com.amazonaws.kinesisvideo.parser.examples;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.kinesisvideo.parser.TestResourceUtil;
import com.amazonaws.regions.Regions;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

public class KinesisVideoRendererExampleTest {
    /* long running test */
    @Ignore
    @Test
    public static void main(String args[]) throws InterruptedException, IOException {
        KinesisVideoRendererExample example = KinesisVideoRendererExample.builder().region(Regions.US_EAST_1)
                .streamName("HSC_Test")
                .credentialsProvider(new ProfileCredentialsProvider())
                .inputVideoStream(TestResourceUtil.getTestInputStream("rendering_example_video.mkv"))
                .build();

        example.execute();
    }
}

