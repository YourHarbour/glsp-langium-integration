import { Operation } from '@eclipse-glsp/client';

/**
 * Is sent from the {@link WorkflowMonacoSubmitService} to the GLSP server
 * to update the condition of a conditional edge after it was edited in the
 * embedded Monaco editor.
 */
export interface ApplyConditionEditOperation extends Operation {
    kind: typeof ApplyConditionEditOperation.KIND;
    /** Id of the conditional edge whose condition should be updated */
    elementId: string;
    /** The new condition text */
    text: string;
    /** Id of the task node providing the referenced variable, if it could be resolved by Langium */
    variableId?: string;
}

export namespace ApplyConditionEditOperation {
    export const KIND = 'applyConditionEdit';

    export function is(object: unknown): object is ApplyConditionEditOperation {
        return Operation.hasKind(object, KIND);
    }

    export function create(options: { elementId: string; text: string; variableId?: string }): ApplyConditionEditOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}
