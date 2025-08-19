package org.eclipse.glsp.example.javaemf.model;

import java.util.Map;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.glsp.example.javaemf.HealthcareModelTypes;
import org.eclipse.glsp.graph.DefaultTypes;
import org.eclipse.glsp.graph.GEdge;
import org.eclipse.glsp.graph.GGraph;
import org.eclipse.glsp.graph.GModelElement;
import org.eclipse.glsp.graph.GModelRoot;
import org.eclipse.glsp.graph.GNode;
import org.eclipse.glsp.graph.builder.impl.GEdgeBuilder;
import org.eclipse.glsp.graph.builder.impl.GLabelBuilder;
import org.eclipse.glsp.graph.builder.impl.GLayoutOptions;
import org.eclipse.glsp.graph.builder.impl.GNodeBuilder;
import org.eclipse.glsp.graph.util.GConstants;
import org.eclipse.glsp.server.emf.model.notation.Diagram;
import org.eclipse.glsp.server.emf.notation.EMFNotationGModelFactory;

import org.eclipse.glsp.example.healthcareDiagram.Action;
import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.AdmissionAction;
import org.eclipse.glsp.example.healthcareDiagram.Branch;
import org.eclipse.glsp.example.healthcareDiagram.ConnectEdge;
import org.eclipse.glsp.example.healthcareDiagram.DischargeAction;
import org.eclipse.glsp.example.healthcareDiagram.Disease;
import org.eclipse.glsp.example.healthcareDiagram.Test;

public class HealthcareGModelFactory extends EMFNotationGModelFactory {

    @Override
    protected void fillRootElement(final EObject semanticModel, final Diagram notationModel, final GModelRoot newRoot) {
        ActionCard actionCard = ActionCard.class.cast(semanticModel);
        GGraph graph = GGraph.class.cast(newRoot);
        
        if (actionCard.getActions() != null && actionCard.getActions().size() > 0) {
            actionCard.getActions().stream().map(this::createActionNode)
            .forEachOrdered(graph.getChildren()::add);
        }

        if(actionCard.getAdmissionActions() != null && actionCard.getAdmissionActions().size() > 0){
            actionCard.getAdmissionActions().stream().map(this::createAdmissionActionNode)
            .forEachOrdered(graph.getChildren()::add);
        }

        if (actionCard.getActionCardCondition() != null) {
            graph.getChildren().add(createActionCardConditionNode(actionCard.getActionCardCondition()));
            // throw new IllegalAccessError(actionCard.getActionCardCondition().getConditionalStatement());
        }

        actionCard.getTests().stream().map(this::createTestsNode).forEachOrdered(graph.getChildren()::add);
        actionCard.getDiseases().stream().map(this::createDiseasesNode).forEachOrdered(graph.getChildren()::add);

        actionCard.getBranches().stream().map(this::createBranchNode)
            .forEachOrdered(graph.getChildren()::add);
        if(actionCard.getDischargeActions() != null && actionCard.getDischargeActions().size() > 0) {
            actionCard.getDischargeActions().stream().map(this::createDischargeActionNode)
                .forEachOrdered(graph.getChildren()::add);
        }

        // nodes first, then edges
        actionCard.getEdges().stream().map(eachEdge -> this.createEdge(graph, eachEdge))
        .forEachOrdered(graph.getChildren()::add);

        // actionCard.getTests().stream().map(this::createTestsNode).forEachOrdered(graph.getChildren()::add);
    }

    protected GNode createActionNode(final Action action) {
        GNodeBuilder actionNodeBuilder = new GNodeBuilder(HealthcareModelTypes.ACTION)
            .id(idGenerator.getOrCreateId(action))
            .addCssClass("action-node")
            .add(new GLabelBuilder(HealthcareModelTypes.MONACO_LABEL).text(action.getName()).id(action.getId() + "_label")
                .addCssClass("action-node-label")
                .build())
            .addArgument(HealthcareModelTypes.REFERENCING_NODE_ATTRIBUTE_EXPRESSION, action.getExpression())
            .layout(GConstants.Layout.HBOX,
                Map.of(GLayoutOptions.KEY_V_ALIGN, "center"));
        applyShapeData(action, actionNodeBuilder);
        return actionNodeBuilder.build();
    }

    protected GNode createAdmissionActionNode(final AdmissionAction action) {
        GNodeBuilder admissionActionNodeBuilder = new GNodeBuilder(HealthcareModelTypes.ADMISSION_ACTION)
            .id(idGenerator.getOrCreateId(action))
            .addCssClass("admission-action-node")
            .add(new GLabelBuilder(DefaultTypes.LABEL).text(action.getName()).id(action.getId() + "_label")
                .build())
            .layout(GConstants.Layout.HBOX, Map.of(GLayoutOptions.KEY_PADDING_LEFT, 5));
        applyShapeData(action, admissionActionNodeBuilder);
        return admissionActionNodeBuilder.build();
    }

    protected GNode createDischargeActionNode(final DischargeAction action) {
        GNodeBuilder actionNodeBuilder = new GNodeBuilder(HealthcareModelTypes.DISCHARGE_ACTION)
            .id(idGenerator.getOrCreateId(action))
            .addCssClass("discharge-action-node")
            .add(new GLabelBuilder(DefaultTypes.LABEL).text(action.getName()).id(action.getId() + "_label")
                .addCssClass("action-node-label")
                .build())
            .layout(GConstants.Layout.HBOX,
                Map.of(GLayoutOptions.KEY_V_ALIGN, "center"));
        applyShapeData(action, actionNodeBuilder);
        return actionNodeBuilder.build();
    }

    protected GNode createActionCardConditionNode(final ActionCardCondition action) {
        GNodeBuilder actionCardConditionNodeBuilder = new GNodeBuilder(HealthcareModelTypes.ACTION_CARD_CONDITION)
            .id(idGenerator.getOrCreateId(action))
            .addCssClass("action-condition-node")
            .add(new GLabelBuilder(DefaultTypes.LABEL).text(action.getConditionalStatement()).id(action.getId() + "_label")
                .build())
            .layout(GConstants.Layout.HBOX, Map.of(GLayoutOptions.KEY_PADDING_LEFT, 5));
        applyShapeData(action, actionCardConditionNodeBuilder);
        return actionCardConditionNodeBuilder.build();
    }

    protected GNode createTestsNode(final Test test) {
        GNodeBuilder testNodeBuilder = new GNodeBuilder(HealthcareModelTypes.TEST)
            .id(idGenerator.getOrCreateId(test))
            .addCssClass("test-node")
            .add(new GLabelBuilder(DefaultTypes.LABEL).text(test.getName()).id(test.getId() + "_label")
                .build())
            .addArgument(HealthcareModelTypes.REFERABLE_NODE_ATTRIBUTE_TEXT, test.getText())
            .layout(GConstants.Layout.HBOX, Map.of(GLayoutOptions.KEY_PADDING_LEFT, 5));
        applyShapeData(test, testNodeBuilder);
        return testNodeBuilder.build();
    }

    protected GNode createDiseasesNode(final Disease disease) {
        GNodeBuilder diseaseNodeBuilder = new GNodeBuilder(HealthcareModelTypes.DISEASE)
            .id(idGenerator.getOrCreateId(disease))
            .addCssClass("disease-node")
            .add(new GLabelBuilder(DefaultTypes.LABEL).text(disease.getName()).id(disease.getId() + "_label")
                .build())
            .addArgument(HealthcareModelTypes.REFERABLE_NODE_ATTRIBUTE_TEXT, disease.getText())
            .layout(GConstants.Layout.HBOX, Map.of(GLayoutOptions.KEY_PADDING_LEFT, 5));
        applyShapeData(disease, diseaseNodeBuilder);
        return diseaseNodeBuilder.build();
    }

    protected GNode createBranchNode(final Branch branch) {
        GNodeBuilder branchNodeBuilder = new GNodeBuilder(HealthcareModelTypes.BRANCH)
            .id(idGenerator.getOrCreateId(branch))
            .addCssClass("branch-node")
            .add(new GLabelBuilder(HealthcareModelTypes.MONACO_LABEL).text(branch.getName()).id(branch.getId() + "_label").build())
            .addArgument(HealthcareModelTypes.REFERENCING_NODE_ATTRIBUTE_EXPRESSION, branch.getExpression())
            .layout(GConstants.Layout.HBOX, Map.of(GLayoutOptions.KEY_PADDING_LEFT, 5));
        applyShapeData(branch, branchNodeBuilder);
        return branchNodeBuilder.build();
    }

    protected GModelElement findGNodeById(final EList<GModelElement> eList, final String elementId) {
        return eList.stream().filter(node -> elementId.equals(node.getId())).findFirst().orElse(null);
    }

    protected GEdge createEdge(final GGraph graph, final ConnectEdge edge) {
        String sourceId = edge.getSource().getId();
        String targetId = edge.getTarget().getId();

        GModelElement sourceNode = findGNodeById(graph.getChildren(), sourceId);
        GModelElement targetNode = findGNodeById(graph.getChildren(), targetId);

        if(targetNode == null) {
            throw new IllegalAccessError(graph.getChildren().toString());
        }
        GEdgeBuilder builder = new GEdgeBuilder(HealthcareModelTypes.DIA_EDGE)
            .source(sourceNode)
            .target(targetNode)
            .id(idGenerator.getOrCreateId(edge));

        applyEdgeData(edge, builder);

        return builder.build();
    }

}
