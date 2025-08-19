package org.eclipse.glsp.example.javaemf.handler;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.common.command.CompoundCommand;
import org.eclipse.emf.edit.command.AddCommand;
import org.eclipse.emf.edit.command.SetCommand;
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
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

public class CreateActionCardConditionNodeHandler extends EMFCreateOperationHandler<CreateNodeOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Inject
    protected EMFIdGenerator idGenerator;

    public CreateActionCardConditionNodeHandler() {
        super(HealthcareModelTypes.ACTION_CARD_CONDITION);
    }

    @Override
    public Optional<Command> createCommand(final CreateNodeOperation operation) {
        GModelElement container = modelState.getIndex().get(operation.getContainerId()).orElseGet(modelState::getRoot);
        Optional<GPoint> relativeLocation = operation.getLocation()
            .map(location -> LayoutUtil.getRelativeLocation(location, container));

        return Optional.of(createActionAndShape(relativeLocation));
    }

    @Override
    public String getLabel() { return "Action Card Condition"; }

    protected Command createActionAndShape(final Optional<GPoint> relativeLocation) {
        Diagram diagram = modelState.getNotationModel();
        EditingDomain editingDomain = modelState.getEditingDomain();
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        // if(actionCard != null){
        //     throw new IllegalAccessError(actionCard.getActionCardCondition().getName());
        // }
        ActionCardCondition existingCondition = actionCard.getActionCardCondition();
        if (existingCondition != null) {
            throw new IllegalStateException("ActionCardCondition already exists for this ActionCard.");
        }
        ActionCardCondition newAction = createAction();
        // Command actionCommand = AddCommand.create(editingDomain, actionCard,
        //     HealthcareDiagramPackage.Literals.ACTION_CARD__ACTION_CARD_CONDITION, newAction);
        Command addConditionCommand = SetCommand.create(editingDomain, actionCard,
            HealthcareDiagramPackage.Literals.ACTION_CARD__ACTION_CARD_CONDITION, newAction);
        // actionCard.setActionCardCondition(newAction);
        // if(newAction != null) {
        //     throw new IllegalAccessError(actionCard.getActionCardCondition().getName());
        // }
        Shape shape = createShape(idGenerator.getOrCreateId(newAction), relativeLocation);
        Command shapeCommand = AddCommand.create(editingDomain, diagram,
            NotationPackage.Literals.DIAGRAM__ELEMENTS, shape);

        CompoundCommand compoundCommand = new CompoundCommand();
        // compoundCommand.append(actionCommand);
        compoundCommand.append(addConditionCommand);
        compoundCommand.append(shapeCommand);
        return compoundCommand;
    }

    protected ActionCardCondition createAction() {
        ActionCardCondition newAction = HealthcareDiagramFactory.eINSTANCE.createActionCardCondition();
        newAction.setId(UUID.randomUUID().toString());
        setInitialName(newAction);
        return newAction;
    }

    protected void setInitialName(final ActionCardCondition action) {
        Function<Integer, String> nameProvider = i -> "New" + action.eClass().getName() + i;
        int nodeCounter = modelState.getIndex().getCounter(GraphPackage.Literals.GNODE, nameProvider);
        action.setName(nameProvider.apply(nodeCounter));
        action.setConditionalStatement(nameProvider.apply(nodeCounter));
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
