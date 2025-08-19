package org.eclipse.glsp.example.editActionCardCondition;

import java.util.Optional;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.edit.command.SetCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

public class EditActionCardConditionOperationHandler extends EMFOperationHandler<EditActionCardConditionOperation>{

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public Optional<Command> createCommand(EditActionCardConditionOperation operation) {
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        EditingDomain editingDomain = modelState.getEditingDomain();
        String eleId = operation.getElementId();
        String newValue = operation.getValue();

        ActionCardCondition condition = (ActionCardCondition) FindObjectById.findObjectById(actionCard, eleId);
        // if(eleId != null){
        //     throw new IllegalAccessError(eleId + " not found" + newValue);
        // }
        Command setCommand = SetCommand.create(editingDomain, condition, HealthcareDiagramPackage.Literals.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT, newValue);
        
        return Optional.of(setCommand);
    }
    
}
