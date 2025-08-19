package org.eclipse.glsp.example.javaemf.handler;

import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.edit.command.SetCommand;
import org.eclipse.glsp.example.healthcareDiagram.*;
import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.graph.GLabel;
import org.eclipse.glsp.graph.GModelElement;
import org.eclipse.glsp.graph.GPoint;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.features.directediting.ApplyLabelEditOperation;
import org.eclipse.glsp.server.operations.CreateNodeOperation;
import org.eclipse.glsp.server.utils.LayoutUtil;

import com.google.inject.Inject;

public class LabelEditHandler extends EMFOperationHandler<ApplyLabelEditOperation> {

    @Inject
    protected EMFNotationModelState modelState;


    @Override
    public Optional<Command> createCommand(final ApplyLabelEditOperation operation) {
        // GModelElement container = modelState.getRoot();
        String labelID = operation.getLabelId();
        GLabel label = (GLabel) modelState.getIndex().get(labelID).orElseThrow();
        GModelElement parent = label.getParent();
        String newText = operation.getText();
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        Identifiable identifiable = FindObjectById.findObjectById(actionCard, parent.getId());
        // String info = operation.getLabelId() + " / " + operation.getText() + " / " + parent.getId();
        // if(info != null) {
        //     throw new IllegalAccessError(info);
        // }
        ((Nameable) identifiable).setName(newText);
        if (identifiable instanceof ReferableNode) {
            ((ReferableNode) identifiable).setText(newText);
        }
        Command command = SetCommand.create(modelState.getEditingDomain(), identifiable, HealthcareDiagramPackage.Literals.NAMEABLE__NAME, newText);
        return Optional.of(command);
    }


}
