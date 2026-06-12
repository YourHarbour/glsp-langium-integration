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
 * `{ $type: 'Model', condition: { $type: 'Condition', variable: { name, type, refId }, operator, value } }`
 * If the variable reference was resolved, the id of the providing task node (`refId`) is sent
 * along, so the server can persist which task the condition depends on.
 */
@injectable()
export class WorkflowMonacoSubmitService extends MonacoSubmitService {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    public override handleSubmit(label: MonacoLabelConfig, text: string, ast: any): void {
        const variableId: string | undefined = ast?.condition?.variable?.refId;
        this.actionDispatcher.dispatch(ApplyConditionEditOperation.create({ elementId: label.containerId, text, variableId }));
    }
}
