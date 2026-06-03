import { IActionDispatcher, IDiagramStartup, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { LangiumWorkerStartupAction } from './worker.action.js';

/** This class simply dispatches an action to communicate the successful startup of GLSP, and thus triggers the creation of the Langium LSP worker */
@injectable()
export class LangiumWorkerStartup implements IDiagramStartup {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: IActionDispatcher;

    public async postRequestModel(): Promise<void> {
        this.actionDispatcher.dispatch(LangiumWorkerStartupAction.create());
    }
}
