import { Action, GLabelSchema, IActionHandler, ICommand, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { MonacoLabelConfig } from 'glsp-langium-integration/common';
import { LANGIUM_COMPONENT_TYPES, MonacoContainerUIExtension } from 'glsp-langium-integration/glsp';
import { inject, injectable } from 'inversify';
import { WorkflowLangiumTypes } from './workflow-langium-types.js';

/**
 * Creates (or updates) the Monaco editor elements for all monaco labels in the model
 * whenever the model is set or updated. The editors are managed by the
 * {@link MonacoContainerUIExtension} of the integration framework and attached to the
 * diagram by the `MonacoLabelView`.
 */
@injectable()
export class WorkflowMonacoContainerHandler implements IActionHandler {
    @inject(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension)
    protected monacoContainer: MonacoContainerUIExtension;

    handle(action: Action): ICommand | Action | void {
        if (!SetModelAction.is(action) && !UpdateModelAction.is(action)) {
            return;
        }

        const model = action.newRoot;
        if (!model.children) {
            return;
        }

        this.monacoContainer.show();

        const labels: MonacoLabelConfig[] = [];
        model.children.forEach(child => {
            if (child.type !== WorkflowLangiumTypes.CONDITIONAL_EDGE || !child.children) {
                return;
            }
            for (const grandChild of child.children) {
                if (grandChild.type === WorkflowLangiumTypes.MONACO_LABEL) {
                    labels.push({
                        id: grandChild.id,
                        containerId: child.id,
                        // Used as file extension of the Langium document and thereby selects the grammar
                        type: WorkflowLangiumTypes.CONDITIONAL_EDGE_GRAMMAR,
                        text: (grandChild as GLabelSchema).text ?? ''
                    });
                }
            }
        });

        this.monacoContainer.createElements(labels);
    }
}
