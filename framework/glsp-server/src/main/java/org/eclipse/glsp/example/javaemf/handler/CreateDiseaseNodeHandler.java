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

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.Disease;

public class CreateDiseaseNodeHandler extends EMFCreateOperationHandler<CreateNodeOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Inject
    protected EMFIdGenerator idGenerator;

    public CreateDiseaseNodeHandler() {
        super(HealthcareModelTypes.DISEASE);
    }

    @Override
    public Optional<Command> createCommand(final CreateNodeOperation operation) {
        GModelElement container = modelState.getIndex().get(operation.getContainerId()).orElseGet(modelState::getRoot);
        Optional<GPoint> relativeLocation = operation.getLocation()
            .map(location -> LayoutUtil.getRelativeLocation(location, container));

        return Optional.of(createActionAndShape(relativeLocation));
    }

    @Override
    public String getLabel() { return "Disease"; }

    protected Command createActionAndShape(final Optional<GPoint> relativeLocation) {
        Diagram diagram = modelState.getNotationModel();
        EditingDomain editingDomain = modelState.getEditingDomain();
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();

        Disease newDisease = createDisease();
        Command actionCommand = AddCommand.create(editingDomain, actionCard,
            HealthcareDiagramPackage.Literals.ACTION_CARD__DISEASES, newDisease);

        Shape shape = createShape(idGenerator.getOrCreateId(newDisease), relativeLocation);
        Command shapeCommand = AddCommand.create(editingDomain, diagram,
            NotationPackage.Literals.DIAGRAM__ELEMENTS, shape);

        CompoundCommand compoundCommand = new CompoundCommand();
        compoundCommand.append(actionCommand);
        compoundCommand.append(shapeCommand);
        return compoundCommand;
    }

    protected Disease createDisease() {
        Disease newDisease = HealthcareDiagramFactory.eINSTANCE.createDisease();
        newDisease.setId(UUID.randomUUID().toString());
        setInitialName(newDisease);
        return newDisease;
    }

    protected void setInitialName(final Disease Disease) {
        Function<Integer, String> nameProvider = i -> "New" + Disease.eClass().getName() + i;
        int nodeCounter = modelState.getIndex().getCounter(GraphPackage.Literals.GNODE, nameProvider);
        String name = nameProvider.apply(nodeCounter);
        Disease.setName(name);
        Disease.setText(name);
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
