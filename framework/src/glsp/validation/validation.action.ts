import { Action, GModelRootSchema } from '@eclipse-glsp/client';
import { NodeTextToValidate } from '../../common/types/types.js';

/**
 * This action is sent by the server to the client, specifically the `LangiumScopingInformationHandler`, to act as a middleman
 * in communicating the information relevant for scoping to the Langium Language Server.
 *
 * For client-generated scoping information, see {@link GenerateLangiumScopingInformationAction}.
 */
export interface SetLangiumScopingInformationAction<T = any> extends Action {
    kind: typeof SetLangiumScopingInformationAction.KIND;
    /** Server-generated scoping information to send to the Langium Language Server */
    scopingInformation: T;
    /** Optional list of nodes to attach to a {@link LangiumScopingInformationSuccessAction} in order to automatically trigger validation if present */
    elementsToValidate?: NodeTextToValidate[];
}
export namespace SetLangiumScopingInformationAction {
    export const KIND = 'SetLangiumScopingInformationAction';

    export function is(object: unknown): object is SetLangiumScopingInformationAction {
        return Action.hasKind(object, KIND);
    }

    export function create(options?: Omit<SetLangiumScopingInformationAction, 'kind'>): SetLangiumScopingInformationAction {
        return {
            kind: KIND,
            scopingInformation: {},
            ...options
        };
    }
}

/**
 * This action is sent by some client handler to the `LangiumScopingInformationHandler` (also on the client) in order to
 * generate the information relevant for scoping based on the `GModel` and then communicate it to the Langium Language Server.
 * This means the action cycle for scoping information is contained on the client.
 *
 * For server-generated scoping information, see {@link SetLangiumScopingInformationAction}.
 */
export interface GenerateLangiumScopingInformationAction extends Action {
    kind: typeof GenerateLangiumScopingInformationAction.KIND;
    /** Current model to extract scoping information from */
    model: GModelRootSchema;
    /** Optional list of nodes to attach to a {@link LangiumScopingInformationSuccessAction} in order to automatically trigger validation if present */
    elementsToValidate?: NodeTextToValidate[];
}
export namespace GenerateLangiumScopingInformationAction {
    export const KIND = 'GenerateLangiumScopingInformationAction';

    export function is(object: unknown): object is GenerateLangiumScopingInformationAction {
        return Action.hasKind(object, KIND);
    }

    export function create(options?: Omit<GenerateLangiumScopingInformationAction, 'kind'>): GenerateLangiumScopingInformationAction {
        return {
            kind: KIND,
            model: { type: 'graph', id: '_no-model_', children: [] },
            ...options
        };
    }
}

/**
 * An action that is sent once the Langium Language Server has been communicated some scoping information via `LangiumScopingInformationHandler`.
 */
export interface LangiumScopingInformationSuccessAction extends Action {
    kind: typeof LangiumScopingInformationSuccessAction.KIND;
    /** Information to help the recipient identify who provided the scoping information */
    cause: 'server' | 'client';
    /** If present, the default `LangiumValidationHandler` will trigger a batch validation using the Langium Language Server */
    elementsToValidate?: NodeTextToValidate[];
}
export namespace LangiumScopingInformationSuccessAction {
    export const KIND = 'LangiumScopingInformationSuccessAction';

    export function is(object: unknown): object is LangiumScopingInformationSuccessAction {
        return Action.hasKind(object, KIND);
    }

    export function create(options?: Omit<LangiumScopingInformationSuccessAction, 'kind'>): LangiumScopingInformationSuccessAction {
        return {
            kind: KIND,
            cause: 'client',
            ...options
        };
    }
}
