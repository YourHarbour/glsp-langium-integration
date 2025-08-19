package org.eclipse.glsp.example.editBranch;

import org.eclipse.glsp.server.operations.Operation;

public class EditBranchOperation extends Operation {

    public static final String KIND = "EditBranchNode";
    private String elementId;
    private String type;
    private String value;
    
    public EditBranchOperation() {
        super(KIND); 
    }

    public EditBranchOperation(String elementId, String type, String value) {
        super(KIND); 
        this.elementId = elementId;
        this.type = type;
        this.value = value;
    }

    public String getElementId() {
        return elementId;
    }

    public void setElementId(String elementId) {
        this.elementId = elementId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }   

    public void setValue(String value) {
        this.value = value;
    }   
}
