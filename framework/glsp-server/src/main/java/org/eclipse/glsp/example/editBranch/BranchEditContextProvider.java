package org.eclipse.glsp.example.editBranch;

import java.util.List;
import java.util.Set;

import javax.naming.Context;

import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.features.contextactions.ContextActionsProvider;
import org.eclipse.glsp.server.features.contextactions.SetAutoCompleteValueAction;
import org.eclipse.glsp.server.features.directediting.LabeledAction;
import org.eclipse.glsp.server.types.EditorContext;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.Branch;

public class BranchEditContextProvider implements ContextActionsProvider {

    public static final String contextID = "action-card-branch-editor";
    public static final String BRANCH_PREFIX = "Branch: ";

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public String getContextId() { return contextID; }

    @Override
    public List<? extends LabeledAction> getActions(EditorContext editorContext) {
        String text = editorContext.getArgs().get("text");
        String selectId = editorContext.getSelectedElementIds().get(0);
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        Branch branch = (Branch) FindObjectById.findObjectById(actionCard, selectId);
        if (text.startsWith(BRANCH_PREFIX)) {
            EditBranchOperation editOperation = new EditBranchOperation(selectId, "diagnostic condition",
                text.substring(BRANCH_PREFIX.length()));
            LabeledAction action = new LabeledAction("Branch", List.of(editOperation));
            return List.of(action);
        }
        SetAutoCompleteValueAction setOne = new SetAutoCompleteValueAction("Branch:", "Branch:",
            BRANCH_PREFIX + branch.getName());
        return List.of(setOne);
    }

}
