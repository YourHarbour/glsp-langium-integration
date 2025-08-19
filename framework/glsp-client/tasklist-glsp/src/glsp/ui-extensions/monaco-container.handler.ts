import {
    Action,
    GLabelSchema,
    GLSPActionDispatcher,
    IActionHandler,
    ICommand,
    SetModelAction,
    TYPES,
    UpdateModelAction
} from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { LANGIUM_COMPONENT_TYPES } from '../../framework/glsp/constants/langium-component-types.js';
import { MonacoContainerUIExtension } from '../../framework/glsp/editor/monaco-container.extension.js';
import { HealthcareModelTypes } from '../constants/HealthcareModelTypes.js';

@injectable()
export class MonacoContainerHandler implements IActionHandler {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    @inject(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension)
    private monacoContainer: MonacoContainerUIExtension;

    handle(action: Action): ICommand | Action | void {
        if (!SetModelAction.is(action) && !UpdateModelAction.is(action)) {
            return;
        }

        const model = action.newRoot;
        if (!model.children) {
            return;
        }

        if (SetModelAction.is(action)) {
            this.monacoContainer.show();
        }

        const labels = model.children
            .map(child => {
                if (child.children) {
                    for (const c of child.children) {
                        if (c.type === HealthcareModelTypes.MONACO_LABEL) {
                            return { id: c.id, containerId: child.id, type: child.type, text: (c as GLabelSchema).text };
                        }
                    }
                }
                return undefined;
            })
            .filter(child => child != null);

        this.monacoContainer.createElements(labels);
    }
}
