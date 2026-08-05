import { Action, hasStringProp, Operation } from '@eclipse-glsp/client';

/**
 * Is sent from the client (`StatemachineMonacoSubmitService`) to the GLSP server to update
 * the label of a transition edge after it was edited in the embedded Monaco editor.
 */
export interface ApplyTransitionEditOperation extends Operation {
    kind: typeof ApplyTransitionEditOperation.KIND;

    /** Id of the transition edge whose label should be updated */
    elementId: string;

    /** The new transition text */
    text: string;

    /** Name of the referenced event, if it could be resolved by Langium */
    eventName?: string;

    /** Names of the referenced commands, if they could be resolved by Langium */
    actionNames?: string[];
}

export namespace ApplyTransitionEditOperation {
    export const KIND = 'applyTransitionEdit';

    export function is(object: any): object is ApplyTransitionEditOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'elementId') && hasStringProp(object, 'text');
    }

    export function create(options: { elementId: string; text: string; eventName?: string; actionNames?: string[] }): ApplyTransitionEditOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}
