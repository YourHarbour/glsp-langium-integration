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
import org.eclipse.glsp.example.healthcareDiagram.Branch;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;


public class CreateBranchNodeHandler extends EMFCreateOperationHandler<CreateNodeOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Inject
    protected EMFIdGenerator idGenerator;

    public CreateBranchNodeHandler() {
        super(HealthcareModelTypes.BRANCH);
    }

    @Override
    public Optional<Command> createCommand(final CreateNodeOperation operation) {
        GModelElement container = modelState.getRoot();
        // GModelElement container = modelState.getIndex().get(operation.getContainerId()).orElseGet(modelState::getRoot);
        Optional<GPoint> absoluteLocation = operation.getLocation();
        Optional<GPoint> relativeLocation = absoluteLocation
            .map(location -> LayoutUtil.getRelativeLocation(location, container));

        return Optional.of(createBranchAndShape(relativeLocation));
    }

    @Override
    public String getLabel() { return "Branch"; }

    protected Command createBranchAndShape(final Optional<GPoint> relativeLocation) {
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();

        Diagram diagram = modelState.getNotationModel();
        EditingDomain editingDomain = modelState.getEditingDomain();

        Branch newBranch = createBranch();
        Command branchCommand = AddCommand.create(editingDomain, actionCard,
            HealthcareDiagramPackage.Literals.ACTION_CARD__BRANCHES, newBranch);

        Shape shape = createShape(idGenerator.getOrCreateId(newBranch), relativeLocation);
        Command shapeCommand = AddCommand.create(editingDomain, diagram,
            NotationPackage.Literals.DIAGRAM__ELEMENTS, shape);

        CompoundCommand compoundCommand = new CompoundCommand();
        compoundCommand.append(branchCommand);
        compoundCommand.append(shapeCommand);
        return compoundCommand;
    }

    protected Branch createBranch() {
        Branch newBranch = HealthcareDiagramFactory.eINSTANCE.createBranch();
        newBranch.setId(UUID.randomUUID().toString());
        setInitialName(newBranch);
        return newBranch;
    }

    protected void setInitialName(final Branch branch) {
        Function<Integer, String> nameProvider = i -> "New" + branch.eClass().getName() + i;
        int nodeCounter = modelState.getIndex().getCounter(GraphPackage.Literals.GNODE, nameProvider);
        branch.setName(nameProvider.apply(nodeCounter));
    }

    protected Shape createShape(final String elementId, final Optional<GPoint> relativeLocation) {
        Shape newBranch = NotationFactory.eINSTANCE.createShape();
        newBranch.setPosition(relativeLocation.orElse(GraphUtil.point(0, 0)));
        newBranch.setSize(GraphUtil.dimension(100, 50)); // Set appropriate dimensions
        SemanticElementReference reference = NotationFactory.eINSTANCE.createSemanticElementReference();
        reference.setElementId(elementId);
        newBranch.setSemanticElement(reference);
        return newBranch;
    }
}
