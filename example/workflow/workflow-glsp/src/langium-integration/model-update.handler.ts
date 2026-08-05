import { Action, GLabelSchema, IActionHandler, ICommand, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { NodeTextToValidate } from 'glsp-langium-integration/common';
import { GenerateLangiumScopingInformationAction } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { WorkflowLangiumTypes } from './workflow-langium-types.js';

/**
 * Whenever the model is set or updated, this handler triggers the (client-side) generation
 * of the Langium scoping information based on the new model and requests a batch validation
 * of all condition texts of the conditional edges.
 */
@injectable()
export class WorkflowCommunicationHandler implements IActionHandler {
    handle(action: Action): ICommand | Action | void {
        if (!SetModelAction.is(action) && !UpdateModelAction.is(action)) {
            return;
        }

        const model = action.newRoot;
        if (!model.children) {
            return;
        }

        const elementsToValidate: NodeTextToValidate[] = [];

        model.children.forEach(child => {
            if (child.type !== WorkflowLangiumTypes.CONDITIONAL_EDGE || !child.children) {
                return;
            }
            const label = child.children.find(grandChild => grandChild.type === WorkflowLangiumTypes.MONACO_LABEL);
            if (label) {
                elementsToValidate.push({
                    text: (label as GLabelSchema).text ?? '',
                    elementId: child.id,
                    type: WorkflowLangiumTypes.CONDITIONAL_EDGE_GRAMMAR
                });
            }
        });

        return GenerateLangiumScopingInformationAction.create({ model, elementsToValidate });
    }
}
