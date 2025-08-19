import { Action, GLSPActionDispatcher, GModelRootSchema, IActionHandler, ICommand, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { ScopingInformationGlspType } from '../../common/constants/langium-message-types.js';
import { LANGIUM_COMPONENT_TYPES } from '../constants/langium-component-types.js';
import { LangiumWorkerHandler } from '../worker/langium-worker.handler.js';
import {
    GenerateLangiumScopingInformationAction,
    LangiumScopingInformationSuccessAction,
    SetLangiumScopingInformationAction
} from './validation.action.js';

/**
 * Handles `SetLangiumScopingInformationAction` and `GenerateLangiumScopingInformationAction` to inform the
 * Langium Language Server of relevant scoping information. If custom client-side scoping information is required,
 * typically only `generateScopingInformation` needes to be overriden.
 *
 * To ensure the aforementioned actions are always handled, a default implementation is already bound and custom
 * implementation must be rebound like this:
 * `rebind(LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler).to(MyLangiumScopingInformationHandler)`
 */
@injectable()
export abstract class LangiumScopingInformationHandler<T = any> implements IActionHandler {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;
    @inject(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler)
    protected langiumWorkerHandler: LangiumWorkerHandler;

    public handle(action: Action): ICommand | Action | void {
        if (SetLangiumScopingInformationAction.is(action)) {
            this.doOnSet(action);
            return;
        }

        if (GenerateLangiumScopingInformationAction.is(action)) {
            this.doOnGenerate(action);
            return;
        }
    }

    protected async doOnSet(action: SetLangiumScopingInformationAction) {
        const connection = await this.langiumWorkerHandler.connection;
        await connection.sendNotification(ScopingInformationGlspType, action.scopingInformation);
        this.actionDispatcher.dispatch(
            LangiumScopingInformationSuccessAction.create({ cause: 'server', elementsToValidate: action.elementsToValidate })
        );
    }

    protected async doOnGenerate(action: GenerateLangiumScopingInformationAction) {
        const connection = await this.langiumWorkerHandler.connection;
        await connection.sendNotification(ScopingInformationGlspType, this.generateScopingInformation(action.model));
        this.actionDispatcher.dispatch(
            LangiumScopingInformationSuccessAction.create({ cause: 'client', elementsToValidate: action.elementsToValidate })
        );
    }

    /**
     * If the server does not provide the information, the scoping information to inject into Langium must be created on the client.
     *
     * @param model The graph model to use as basis for the scoping information
     */
    protected abstract generateScopingInformation(model: GModelRootSchema): T;
}

/** A default implementation to use, if client-generated scoping information is not required */
@injectable()
export class DefaultLangiumScopingInformationHandler extends LangiumScopingInformationHandler {
    protected override generateScopingInformation(model: GModelRootSchema) {
        return {};
    }
}
