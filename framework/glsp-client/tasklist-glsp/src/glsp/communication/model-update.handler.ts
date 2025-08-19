import { Action, IActionHandler, ICommand, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { injectable } from 'inversify';
import { NodeTextToValidate } from '../../framework/common/types/types.js';
import { GenerateLangiumScopingInformationAction } from '../../framework/glsp/validation/validation.action.js';
import { HealthcareModelTypes } from '../constants/HealthcareModelTypes.js';
import { getFirstLabel } from '../utils/label.util.js';

@injectable()
export class CommunicationHandler implements IActionHandler {
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
            switch (child.type) {
                // This is not an exhaustive list of all possible nodes, but rather those that should be validated
                // and have an associated grammar
                case HealthcareModelTypes.ACTION_NODE:
                case HealthcareModelTypes.ADMISSION_ACTION_NODE:
                case HealthcareModelTypes.BRANCH_NODE:
                    const label = getFirstLabel(child);
                    if (label) {
                        elementsToValidate.push({ text: label.text, elementId: child.id, type: child.type });
                    }
            }
        });

        return GenerateLangiumScopingInformationAction.create({ model, elementsToValidate });
    }
}
