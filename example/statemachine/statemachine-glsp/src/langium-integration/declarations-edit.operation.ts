import { Action, hasStringProp, Operation } from '@eclipse-glsp/client';

/**
 * Is sent from the client (`StatemachineMonacoSubmitService`) to the GLSP server to update
 * the declarations element after its text was edited in the embedded Monaco editor.
 *
 * Alongside the concrete text, the names of the declared events and commands (extracted
 * from the parsed Langium AST) are sent, so the server can persist them with the node:
 * they are the source of the scoping information for the transition labels.
 */
export interface ApplyDeclarationsEditOperation extends Operation {
    kind: typeof ApplyDeclarationsEditOperation.KIND;

    /** Id of the declarations node that should be updated */
    elementId: string;

    /** The new declarations text */
    text: string;

    /** Names of the declared events */
    events: string[];

    /** Names of the declared commands */
    commands: string[];
}

export namespace ApplyDeclarationsEditOperation {
    export const KIND = 'applyDeclarationsEdit';

    export function is(object: any): object is ApplyDeclarationsEditOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'elementId') && hasStringProp(object, 'text');
    }

    export function create(options: { elementId: string; text: string; events: string[]; commands: string[] }): ApplyDeclarationsEditOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}
