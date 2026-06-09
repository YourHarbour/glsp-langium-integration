import { GLSPActionDispatcher, TYPES } from '@eclipse-glsp/client';
import { MonacoLabelConfig } from 'glsp-langium-integration/common';
import { MonacoSubmitService } from 'glsp-langium-integration/glsp';
import { inject, injectable } from 'inversify';
import { ApplyConditionEditOperation } from './condition-edit.operation.js';

/**
 * Handles the submit of an embedded Monaco editor (i.e. the user clicking outside of it)
 * by sending the edited condition text to the GLSP server.
 *
 * The minimized Langium AST received alongside the text has the following shape for the
 * conditional edge grammar:
 * `{ $type: 'Model', condition: { $type: 'Condition', item: { name, type, refId }, operator, value } }`
 * If the inventory item reference was resolved, its id (`refId`) is sent along, so the server
 * can persist which item the condition refers to.
 */
@injectable()
export class WorkflowMonacoSubmitService extends MonacoSubmitService {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    public override handleSubmit(label: MonacoLabelConfig, text: string, ast: any): void {
        const itemId: string | undefined = ast?.condition?.item?.refId;
        this.actionDispatcher.dispatch(ApplyConditionEditOperation.create({ elementId: label.containerId, text, itemId }));
    }
}
