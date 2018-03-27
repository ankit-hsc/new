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
package com.tensor.mkv.visitors;

import com.tensor.mkv.MkvDataElement;
import com.tensor.mkv.MkvElementVisitException;
import com.tensor.mkv.MkvElementVisitor;
import com.tensor.mkv.MkvEndMasterElement;
import com.tensor.mkv.MkvStartMasterElement;

import java.io.Closeable;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;

/**
 * This visitor can be used to copy the ray bytes of elements to an output stream.
 * It can be used to create a copy of an mkv stream being parsed.
 * It is particularly useful for debugging as part of a {@link CompositeMkvElementVisitor} since it allows creating
 * a copy of an input stream while also processing it in parallel.
 *
 * For start master elements, it copies the element header, namely its id and size.
 * For data elements, it copies the element header as well as the data bytes.
 * For end master elements, there are no raw bytes to copy.
 */
public class CopyVisitor extends MkvElementVisitor implements Closeable {
    private final WritableByteChannel outputChannel;

    public CopyVisitor(OutputStream outputStream) {
        this.outputChannel = Channels.newChannel(outputStream);
    }

    @Override
    public void visit(MkvStartMasterElement startMasterElement) throws MkvElementVisitException {
        startMasterElement.writeToChannel(outputChannel);
    }

    @Override
    public void visit(MkvEndMasterElement endMasterElement) throws MkvElementVisitException {
    }

    @Override
    public void visit(MkvDataElement dataElement) throws MkvElementVisitException {
        dataElement.writeToChannel(outputChannel);
    }

    @Override
    public void close() throws IOException {
        outputChannel.close();
    }
}
