package org.eclipse.glsp.example.javaemf.handler;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.common.command.CompoundCommand;
import org.eclipse.emf.edit.command.AddCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.example.javaemf.HealthcareModelTypes;
import org.eclipse.glsp.graph.GModelElement;
import org.eclipse.glsp.graph.GPoint;
import org.eclipse.glsp.graph.GraphPackage;
import org.eclipse.glsp.graph.util.GraphUtil;
import org.eclipse.glsp.server.emf.EMFCreateOperationHandler;
import org.eclipse.glsp.server.emf.EMFIdGenerator;
import org.eclipse.glsp.server.emf.model.notation.Diagram;
import org.eclipse.glsp.server.emf.model.notation.NotationFactory;
import org.eclipse.glsp.server.emf.model.notation.NotationPackage;
import org.eclipse.glsp.server.emf.model.notation.SemanticElementReference;
import org.eclipse.glsp.server.emf.model.notation.Shape;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.operations.CreateNodeOperation;
import org.eclipse.glsp.server.utils.LayoutUtil;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.Action;
import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

public class CreateActionNodeHandler extends EMFCreateOperationHandler<CreateNodeOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Inject
    protected EMFIdGenerator idGenerator;

    public CreateActionNodeHandler() {
        super(HealthcareModelTypes.ACTION);
    }

    @Override
    public Optional<Command> createCommand(final CreateNodeOperation operation) {
        GModelElement container = modelState.getIndex().get(operation.getContainerId()).orElseGet(modelState::getRoot);
        Optional<GPoint> relativeLocation = operation.getLocation()
            .map(location -> LayoutUtil.getRelativeLocation(location, container));

        return Optional.of(createActionAndShape(relativeLocation));
    }

    @Override
    public String getLabel() { return "Action"; }

    protected Command createActionAndShape(final Optional<GPoint> relativeLocation) {
        Diagram diagram = modelState.getNotationModel();
        EditingDomain editingDomain = modelState.getEditingDomain();
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();

        Action newAction = createAction();
        Command actionCommand = AddCommand.create(editingDomain, actionCard,
            HealthcareDiagramPackage.Literals.ACTION_CARD__ACTIONS, newAction);

        Shape shape = createShape(idGenerator.getOrCreateId(newAction), relativeLocation);
        Command shapeCommand = AddCommand.create(editingDomain, diagram,
            NotationPackage.Literals.DIAGRAM__ELEMENTS, shape);

        CompoundCommand compoundCommand = new CompoundCommand();
        compoundCommand.append(actionCommand);
        compoundCommand.append(shapeCommand);
        return compoundCommand;
    }

    protected Action createAction() {
        Action newAction = HealthcareDiagramFactory.eINSTANCE.createAction();
        newAction.setId(UUID.randomUUID().toString());
        setInitialName(newAction);
        return newAction;
    }

    protected void setInitialName(final Action action) {
        Function<Integer, String> nameProvider = i -> "New" + action.eClass().getName() + i;
        int nodeCounter = modelState.getIndex().getCounter(GraphPackage.Literals.GNODE, nameProvider);
        action.setName(nameProvider.apply(nodeCounter));
    }

    protected Shape createShape(final String elementId, final Optional<GPoint> relativeLocation) {
        Shape newAction = NotationFactory.eINSTANCE.createShape();
        newAction.setPosition(relativeLocation.orElse(GraphUtil.point(0, 0)));
        newAction.setSize(GraphUtil.dimension(100, 50)); // Adjust dimensions
        SemanticElementReference reference = NotationFactory.eINSTANCE.createSemanticElementReference();
        reference.setElementId(elementId);
        newAction.setSemanticElement(reference);
        return newAction;
    }
}
