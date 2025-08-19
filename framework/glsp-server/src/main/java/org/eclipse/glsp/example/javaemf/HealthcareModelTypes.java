package org.eclipse.glsp.example.javaemf;

import org.eclipse.glsp.graph.DefaultTypes;

public final class HealthcareModelTypes {
    private HealthcareModelTypes() {}

    // Actual graph elements
    public static final String ACTION_CARD = "action_card_node";
    public static final String BRANCH = "branch_node";
    public static final String ACTION_CARD_CONDITION = "action_card_condition_node";
    public static final String TRANSITION = DefaultTypes.EDGE;
    public static final String ACTION = "action_node";
    public static final String ADMISSION_ACTION = "admission_action_node";
    public static final String DISCHARGE_ACTION = "discharge_action_node";
    public static final String TEST = "test_node";
    public static final String DISEASE = "disease_node";
    public static final String DIA_EDGE = "edge";
    public static final String MONACO_LABEL = "monaco_label";

    // Virtual graph elements
    public static final String REFERABLE_NODE_ATTRIBUTE_TEXT = "text";
    public static final String REFERENCING_NODE_ATTRIBUTE_EXPRESSION = "expression";

}
