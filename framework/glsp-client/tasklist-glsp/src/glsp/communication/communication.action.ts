import { Operation } from '@eclipse-glsp/client';

export type Token = {
    property: string;
    text: string;
    node: string;
};
export interface ApplyLangiumEditOperation extends Operation {
    kind: typeof ApplyLangiumEditOperation.KIND;
    elementId: string;
    rule: string;
    tokens: Token[];
    text: string;
}
export namespace ApplyLangiumEditOperation {
    export const KIND = 'applyLangiumEditOperation';

    export function is(object: unknown): object is ApplyLangiumEditOperation {
        return Operation.hasKind(object, KIND);
    }

    export function create(
        options?: Omit<ApplyLangiumEditOperation, 'kind' | 'isOperation'> & { responseId?: string }
    ): ApplyLangiumEditOperation {
        return {
            kind: KIND,
            responseId: '',
            isOperation: true,
            elementId: '',
            rule: '',
            tokens: [],
            text: '',
            ...options
        };
    }
}
