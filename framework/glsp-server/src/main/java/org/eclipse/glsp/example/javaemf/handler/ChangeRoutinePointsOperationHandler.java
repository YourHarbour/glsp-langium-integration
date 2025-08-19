package org.eclipse.glsp.example.javaemf.handler;

import java.util.List;
import java.util.Optional;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.edit.command.CopyToClipboardCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.model.notation.Diagram;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.operations.ChangeRoutingPointsOperation;
import org.eclipse.glsp.server.types.ElementAndRoutingPoints;

import com.google.inject.Inject;

public class ChangeRoutinePointsOperationHandler extends EMFOperationHandler<ChangeRoutingPointsOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public Optional<Command> createCommand(ChangeRoutingPointsOperation operation) {
        return Optional.of(changeRoutingPoints(operation));
    }

    protected Command changeRoutingPoints(ChangeRoutingPointsOperation operation) {
        List<ElementAndRoutingPoints> elementsAndRoutingPoints = operation.getNewRoutingPoints();
        StringBuilder infoBuilder = new StringBuilder();
        elementsAndRoutingPoints.forEach(elementAndRoutingPoint -> {
            infoBuilder.append("Element: ");
            infoBuilder.append(elementAndRoutingPoint.getElementId());
            infoBuilder.append(" Points: ");
            elementAndRoutingPoint.getNewRoutingPoints().forEach(point -> {
                infoBuilder.append(point.getX());
                infoBuilder.append(",");
                infoBuilder.append(point.getY());
                infoBuilder.append(" ");
            });
        });
        EditingDomain editingDomain = modelState.getEditingDomain();
        String info = infoBuilder.toString();
        Diagram diagram = modelState.getNotationModel();
        if (editingDomain == null) {
            throw new UnsupportedOperationException(info);
        }

        return CopyToClipboardCommand.create(editingDomain, diagram);
    }
}
