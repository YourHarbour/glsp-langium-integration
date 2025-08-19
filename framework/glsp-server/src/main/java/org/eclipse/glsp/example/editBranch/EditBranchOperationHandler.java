package org.eclipse.glsp.example.editBranch;

import java.util.Optional;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.edit.command.SetCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.Branch;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

public class EditBranchOperationHandler extends EMFOperationHandler<EditBranchOperation>{

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public Optional<Command> createCommand(EditBranchOperation operation) {
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        EditingDomain editingDomain = modelState.getEditingDomain();
        String eleId = operation.getElementId();
        String newValue = operation.getValue();
        Branch branch = (Branch) FindObjectById.findObjectById(actionCard, eleId);
        Command setCommand = SetCommand.create(editingDomain, branch, HealthcareDiagramPackage.Literals.NAMEABLE__NAME, newValue);
        return Optional.of(setCommand);
    }
    
}
