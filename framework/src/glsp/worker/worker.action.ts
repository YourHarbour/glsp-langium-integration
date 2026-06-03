import { Action } from '@eclipse-glsp/client';

/** An action simply to inform `LangiumWorkerHandler` that GLSP has loaded and it can now create and connect the Langium LSP worker */
export interface LangiumWorkerStartupAction extends Action {
    kind: typeof LangiumWorkerStartupAction.KIND;
}
export namespace LangiumWorkerStartupAction {
    export const KIND = 'LangiumWorkerStartupAction';

    export function is(object: unknown): object is LangiumWorkerStartupAction {
        return Action.hasKind(object, KIND);
    }

    export function create(options?: Omit<LangiumWorkerStartupAction, 'kind'>): LangiumWorkerStartupAction {
        return {
            kind: KIND,
            ...options
        };
    }
}
