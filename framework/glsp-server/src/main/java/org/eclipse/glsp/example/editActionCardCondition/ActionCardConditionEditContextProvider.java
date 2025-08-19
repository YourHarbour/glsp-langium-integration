package org.eclipse.glsp.example.editActionCardCondition;

import java.util.List;

import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.features.contextactions.ContextActionsProvider;
import org.eclipse.glsp.server.features.contextactions.SetAutoCompleteValueAction;
import org.eclipse.glsp.server.features.directediting.LabeledAction;
import org.eclipse.glsp.server.types.EditorContext;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;

public class ActionCardConditionEditContextProvider implements ContextActionsProvider {

    public static final String CONDITIONAL_STATEMENT_PREFIX = "Conditional Statement: ";
    public static final String contextID = "action-card-condition-editor";

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public String getContextId() { return contextID; }

    @Override
    public List<? extends LabeledAction> getActions(EditorContext editorContext) {
        String text = editorContext.getArgs().get("text");
        String selectId = editorContext.getSelectedElementIds().get(0);
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        ActionCardCondition condition = (ActionCardCondition) FindObjectById.findObjectById(actionCard, selectId);
        if (text.startsWith(CONDITIONAL_STATEMENT_PREFIX)) {
            EditActionCardConditionOperation editOperation = new EditActionCardConditionOperation(selectId,
                "conditionalStatement", text.substring(CONDITIONAL_STATEMENT_PREFIX.length()));
            LabeledAction action = new LabeledAction("Conditional Statement", List.of(editOperation));
            return List.of(action);
        }

        SetAutoCompleteValueAction setOne = new SetAutoCompleteValueAction("Conditional Statement:",
            "conditional statement:", "Conditional Statement: " + condition.getConditionalStatement());

        return List.of(setOne);
    }

}
