package org.eclipse.glsp.example.editActionCardCondition;

import org.eclipse.glsp.server.features.directediting.ContextEditValidator;
import org.eclipse.glsp.server.features.directediting.RequestEditValidationAction;
import org.eclipse.glsp.server.features.directediting.ValidationStatus;
import org.eclipse.glsp.server.types.Severity;

public class ActionCardConditionValidator implements ContextEditValidator{

    @Override
    public String getContextId() { 
        return "action-card-condition-editor";
    }

    @Override
    public ValidationStatus validate(RequestEditValidationAction action) {
        String text = action.getText();
        // if(text.startsWith(ActionCardConditionEditContextProvider.CONDITIONAL_STATEMENT_PREFIX)){
            
        // }
        ValidationStatus status = new ValidationStatus(Severity.NONE, "");
        return status;
    }
    
}
