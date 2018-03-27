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

import com.tensor.ebml.EBMLTypeInfo;
import com.tensor.mkv.MkvDataElement;
import com.tensor.mkv.MkvElement;
import com.tensor.mkv.MkvElementVisitor;
import com.tensor.mkv.MkvEndMasterElement;
import com.tensor.mkv.MkvStartMasterElement;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A visitor used to count elements of a particular type
 */
@Slf4j
public class CountVisitor extends MkvElementVisitor {
    private final Set<EBMLTypeInfo> typesToCount = new HashSet<>();
    private final Map<EBMLTypeInfo, Integer> typeCount = new HashMap<>();
    private final Map<EBMLTypeInfo, Integer> endMasterCount = new HashMap<>();

    public CountVisitor(Collection<EBMLTypeInfo> typesToCount) {
        this.typesToCount.addAll(typesToCount);
        this.typesToCount.stream().forEach(t -> typeCount.put(t, 0));
        this.typesToCount.stream()
                .filter(t -> t.getType().equals(EBMLTypeInfo.TYPE.MASTER))
                .forEach(t -> endMasterCount.put(t, 0));
    }

    @Override
    public void visit(MkvStartMasterElement startMasterElement) {
        incrementTypeCount(startMasterElement);
    }

    @Override
    public void visit(MkvEndMasterElement endMasterElement) {
        incrementCount(endMasterElement, endMasterCount);
    }

    @Override
    public void visit(MkvDataElement dataElement) {
        incrementTypeCount(dataElement);
    }

    public int getCount(EBMLTypeInfo typeInfo) {
        return typeCount.getOrDefault(typeInfo, 0);
    }

    public boolean doEndAndStartMasterElementsMatch() {
        List<EBMLTypeInfo> mismatchedStartAndEnd = typeCount.entrySet().stream().filter(e -> e.getKey().getType().equals(EBMLTypeInfo.TYPE.MASTER)).filter(e -> typeCount.get(e.getKey()) != endMasterCount.get(e.getKey())).map(Map.Entry::getKey).collect(
                 Collectors.toList());
        if (!mismatchedStartAndEnd.isEmpty()) {
            log.warn(" Some end and master element counts did not match: ");
            mismatchedStartAndEnd.stream().forEach(t -> log.warn("Element {} start count {} end count {}", t, typeCount.get(t), endMasterCount.get(t)));
            return false;
        }
        return true;
    }

    private void incrementTypeCount(MkvElement mkvElement) {
        incrementCount(mkvElement, typeCount);
    }

    private void incrementCount(MkvElement mkvElement, Map<EBMLTypeInfo, Integer> mapToUpdate) {
        if (typesToCount.contains(mkvElement.getElementMetaData().getTypeInfo())) {
            log.debug("Element {} to Count found", mkvElement);
            int oldValue = mapToUpdate.get(mkvElement.getElementMetaData().getTypeInfo());
            mapToUpdate.put(mkvElement.getElementMetaData().getTypeInfo(), oldValue + 1);
        }
    }
}
