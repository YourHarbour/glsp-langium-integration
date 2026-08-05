import { Action, GLabelSchema, GModelElementSchema, IActionHandler, ICommand, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { NodeTextToValidate } from 'glsp-langium-integration/common';
import { GenerateLangiumScopingInformationAction } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { StatemachineLangiumTypes } from './statemachine-langium-types.js';

function findLabelText(element: GModelElementSchema, labelType: string): string | undefined {
    const label = element.children?.find(child => child.type === labelType);
    return label ? ((label as GLabelSchema).text ?? '') : undefined;
}

/**
 * Whenever the model is set or updated, this handler triggers the (client-side) generation
 * of the Langium scoping information based on the new model and requests a batch validation
 * of all grammar-controlled texts: the declarations of the declarations elements and the
 * labels of the transition edges.
 */
@injectable()
export class StatemachineCommunicationHandler implements IActionHandler {
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
            if (child.type === StatemachineLangiumTypes.TRANSITION_EDGE) {
                const text = findLabelText(child, StatemachineLangiumTypes.MONACO_LABEL);
                if (text !== undefined) {
                    elementsToValidate.push({ text, elementId: child.id, type: StatemachineLangiumTypes.TRANSITION_GRAMMAR });
                }
            } else if (child.type === StatemachineLangiumTypes.DECLARATIONS_NODE) {
                const text = findLabelText(child, StatemachineLangiumTypes.DECLARATIONS_LABEL);
                if (text !== undefined) {
                    elementsToValidate.push({ text, elementId: child.id, type: StatemachineLangiumTypes.DECLARATIONS_GRAMMAR });
                }
            }
        });

        return GenerateLangiumScopingInformationAction.create({ model, elementsToValidate });
    }
}
