package org.eclipse.glsp.example.javaemf.handler;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.common.command.CompoundCommand;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.edit.command.RemoveCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.model.notation.NotationElement;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelIndex;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.operations.DeleteOperation;

import com.google.inject.Inject;

public class DeleteElementOperationHandler extends EMFOperationHandler<DeleteOperation> {
    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public Optional<Command> createCommand(final DeleteOperation operation) {
        List<String> elementIds = operation.getElementIds();
        if (elementIds == null || elementIds.size() == 0) {
            System.out.println("Elements to delete are not specified");
            return Optional.empty();
        }

        List<Command> commands = createDeleteCommands(elementIds);
        return commands.isEmpty() ? Optional.empty() : Optional.of(new CompoundCommand(commands));
    }

    private List<Command> createDeleteCommands(final List<String> elementIds) {
        EMFNotationModelIndex index = modelState.getIndex();
        List<Command> commands = new ArrayList<>();
        for (String elementId : elementIds) {
            Optional<EObject> semanticElement = index.get(elementId).flatMap(e -> index.getEObject(e));
            Optional<NotationElement> notationElement = semanticElement.flatMap(e -> index.getNotation(e));
            semanticElement.map(this::createRemoveCommand).ifPresent(commands::add);
            notationElement.map(this::createRemoveCommand).ifPresent(commands::add);
        }
        return commands;
    }

    private Command createRemoveCommand(final EObject element) {
        EditingDomain editingDomain = modelState.getEditingDomain();
        return RemoveCommand.create(editingDomain, element.eContainer(), element.eContainingFeature(), element);
    }
}
