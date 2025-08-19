package org.eclipse.glsp.example.editActionCardCondition;

import org.eclipse.glsp.server.operations.Operation;

public class EditActionCardConditionOperation extends Operation {

    public static final String KIND = "EditActionCardConditionNodeConditionalStatement";
    private String elementId;
    private String feature;
    private String value;
	
    public EditActionCardConditionOperation() {
        super(KIND); // Call to the superclass constructor
    }
    public EditActionCardConditionOperation(String elementId, String feature, String value) {
        super(KIND); // Call to the superclass constructor
        this.elementId = elementId;
        this.feature = feature;
        this.value = value;
    }

    public String getElementId() {
        return elementId;
    }

    public void setElementId(String elementId) {
        this.elementId = elementId;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
