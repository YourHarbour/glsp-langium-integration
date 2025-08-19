package org.eclipse.glsp.example.javaemf.palette;

import java.util.List;
import java.util.Map;

import org.eclipse.glsp.example.javaemf.HealthcareModelTypes;
import org.eclipse.glsp.server.actions.TriggerEdgeCreationAction;
import org.eclipse.glsp.server.actions.TriggerNodeCreationAction;
import org.eclipse.glsp.server.features.toolpalette.PaletteItem;
import org.eclipse.glsp.server.features.toolpalette.ToolPaletteItemProvider;

import com.google.common.collect.Lists;

public class HealthcareToolPaletteItemProvider implements ToolPaletteItemProvider {

    @Override
    public List<PaletteItem> getItems(Map<String, String> args) {
        return Lists.newArrayList(nodes(), edges());
    }

    private PaletteItem nodes() {
        // PaletteItem createActionCard = node(HealthcareModelTypes.ACTION_CARD, "Action Card");
        PaletteItem createBranch = node(HealthcareModelTypes.BRANCH, "Branch");
        PaletteItem createTest = node(HealthcareModelTypes.TEST, "Test");
        PaletteItem createAction = node(HealthcareModelTypes.ACTION, "Action");
        PaletteItem createAdmissionAction = node(HealthcareModelTypes.ADMISSION_ACTION, "Admission Action");
        PaletteItem createActionCardCondition = node(HealthcareModelTypes.ACTION_CARD_CONDITION, "Action Card Condition");
        PaletteItem createDisease = node(HealthcareModelTypes.DISEASE, "Disease");
        // PaletteItem createBranchTest = branchNode(HealthcareModelTypes.BRANCH, "Branch Test");
        PaletteItem createDischargeAction = node(HealthcareModelTypes.DISCHARGE_ACTION, "Discharge Action");

        List<PaletteItem> nodes = Lists.newArrayList(createAction, createAdmissionAction, createBranch, createDischargeAction, createActionCardCondition, createTest, createDisease);
        return PaletteItem.createPaletteGroup("nodes", "Nodes", nodes, "symbol-property");
    }

    private PaletteItem node(String elementTypeId, String label) {
        return new PaletteItem(elementTypeId, label, new TriggerNodeCreationAction(elementTypeId));
    }

    // private PaletteItem branchNode(String elementTypeId, String label) {
        
    //     return new PaletteItem(elementTypeId, label, new TriggerCreateBranchAction(elementTypeId));
    // }


    private PaletteItem edges() {
        PaletteItem createTransition = edge(HealthcareModelTypes.DIA_EDGE, "Edge");
        List<PaletteItem> edges = Lists.newArrayList(createTransition);
        return PaletteItem.createPaletteGroup("edges", "Edges", edges, "symbol-property");
    }

    private PaletteItem edge(final String elementTypeId, final String label) {
        return new PaletteItem(elementTypeId, label, new TriggerEdgeCreationAction(elementTypeId));
    }
}
