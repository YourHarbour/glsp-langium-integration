import { Action, GLabelSchema, IActionHandler, ICommand, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { MonacoLabelConfig } from 'glsp-langium-integration/common';
import { LANGIUM_COMPONENT_TYPES, MonacoContainerUIExtension } from 'glsp-langium-integration/glsp';
import { inject, injectable } from 'inversify';
import { StatemachineLangiumTypes } from './statemachine-langium-types.js';

/**
 * Creates (or updates) the Monaco editor elements for all monaco labels in the model
 * whenever the model is set or updated: the single-line labels of the transition edges and
 * the multi-line declarations labels. The editors are managed by the
 * {@link MonacoContainerUIExtension} of the integration framework and attached to the
 * diagram by the `MonacoLabelView`.
 */
@injectable()
export class StatemachineMonacoContainerHandler implements IActionHandler {
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
            if (!child.children) {
                return;
            }
            const labelType =
                child.type === StatemachineLangiumTypes.TRANSITION_EDGE
                    ? StatemachineLangiumTypes.MONACO_LABEL
                    : child.type === StatemachineLangiumTypes.DECLARATIONS_NODE
                      ? StatemachineLangiumTypes.DECLARATIONS_LABEL
                      : undefined;
            // Used as file extension of the Langium document and thereby selects the grammar
            const grammarType =
                child.type === StatemachineLangiumTypes.TRANSITION_EDGE
                    ? StatemachineLangiumTypes.TRANSITION_GRAMMAR
                    : StatemachineLangiumTypes.DECLARATIONS_GRAMMAR;
            if (!labelType) {
                return;
            }
            for (const grandChild of child.children) {
                if (grandChild.type === labelType) {
                    labels.push({
                        id: grandChild.id,
                        containerId: child.id,
                        type: grammarType,
                        text: (grandChild as GLabelSchema).text ?? ''
                    });
                }
            }
        });

        this.monacoContainer.createElements(labels);
    }
}
