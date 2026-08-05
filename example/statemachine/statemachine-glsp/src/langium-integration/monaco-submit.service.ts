import { GLSPActionDispatcher, TYPES } from '@eclipse-glsp/client';
import { MonacoLabelConfig } from 'glsp-langium-integration/common';
import { MonacoSubmitService } from 'glsp-langium-integration/glsp';
import { inject, injectable } from 'inversify';
import { ApplyDeclarationsEditOperation } from './declarations-edit.operation.js';
import { StatemachineLangiumTypes } from './statemachine-langium-types.js';
import { ApplyTransitionEditOperation } from './transition-edit.operation.js';

function collectNames(nodes: unknown): string[] {
    if (!Array.isArray(nodes)) {
        return [];
    }
    return nodes.map((node: any) => node?.name).filter((name): name is string => typeof name === 'string');
}

/**
 * Handles the submit of an embedded Monaco editor (i.e. the user clicking outside of it)
 * by sending the edited text to the GLSP server.
 *
 * For declarations, the minimized Langium AST has the shape
 * `{ $type: 'Declarations', events: [{ $type: 'Event', name }], commands: [...] }`.
 * The declared names are persisted with the node; they are the source of the scoping
 * information for the transition labels.
 *
 * For transition labels, the minimized Langium AST has the shape
 * `{ $type: 'TransitionSpec', event: { name, type, refId }, actions: [{ name, type, refId }] }`.
 * If the references were resolved, the referenced names are persisted with the edge.
 */
@injectable()
export class StatemachineMonacoSubmitService extends MonacoSubmitService {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    public override handleSubmit(label: MonacoLabelConfig, text: string, ast: any): void {
        if (label.type === StatemachineLangiumTypes.DECLARATIONS_GRAMMAR) {
            this.actionDispatcher.dispatch(
                ApplyDeclarationsEditOperation.create({
                    elementId: label.containerId,
                    text,
                    events: collectNames(ast?.events),
                    commands: collectNames(ast?.commands)
                })
            );
            return;
        }
        this.actionDispatcher.dispatch(
            ApplyTransitionEditOperation.create({
                elementId: label.containerId,
                text,
                eventName: typeof ast?.event?.name === 'string' ? ast.event.name : undefined,
                actionNames: collectNames(ast?.actions)
            })
        );
    }
}
