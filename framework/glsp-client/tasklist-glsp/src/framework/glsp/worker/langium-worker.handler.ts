import { Action, IActionHandler, ICommand } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { BrowserMessageReader, BrowserMessageWriter, createMessageConnection, MessageConnection } from 'vscode-languageclient/browser.js';
import { LangiumMessageTypes } from '../../common/constants/langium-message-types.js';
import { LANGIUM_COMPONENT_TYPES } from '../constants/langium-component-types.js';
import { LangiumWorkerFactory } from './langium-worker.factory.js';
import { LangiumWorkerStartupAction } from './worker.action.js';

/**
 * Handles all communication with the Langium Language Server running in its own web worker. It exposes
 * APIs for other components to use, thus acting as an adapter or proxy.
 *
 * If this class is extended, it must also be rebound like this:
 * `rebind(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler).to(MyLangiumWorkerHandler).inSingletonScope()`
 *
 * It is critical that this handler is registered in singleton scope.
 *
 * This handler requires a `LangiumWorkerFactory` to instantiate the worker and this is must be provided
 * by the application module like this:
 * `bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory).to(MyLangiumWorkerFactory).inSingletonScope()`
 */
@injectable()
export class LangiumWorkerHandler implements IActionHandler {
    @inject(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory)
    protected langiumWorkerFactory: LangiumWorkerFactory;

    protected _worker: Worker;
    protected _connection: MessageConnection;

    protected workerResolvers: ((value: Worker) => void)[] = [];
    protected connectionResolvers: ((value: MessageConnection) => void)[] = [];

    public handle(action: Action): ICommand | Action | void {
        if (this._worker || !LangiumWorkerStartupAction.is(action)) {
            return;
        }

        this._worker = this.langiumWorkerFactory.create();

        const channel = new MessageChannel();

        // The only raw worker API usage required to establish the `MessageChannel`
        this._worker.postMessage({ type: LangiumMessageTypes.INIT_CHANNEL, payload: channel.port2 }, [channel.port2]);

        const reader = new BrowserMessageReader(channel.port1);
        const writer = new BrowserMessageWriter(channel.port1);

        this._connection = createMessageConnection(reader, writer);
        this._connection.listen();

        // Resolve all promises that may have been established
        this.workerResolvers.forEach(resolve => resolve(this._worker));
        this.connectionResolvers.forEach(resolve => resolve(this._connection));
    }

    /** The `MessageConnection` as a promise as it may not be initialized yet */
    public get connection(): Promise<MessageConnection> {
        if (this._connection) {
            return Promise.resolve(this._connection);
        }
        return new Promise(resolve => this.connectionResolvers.push(resolve));
    }

    /** The underlying `Worker` as a promise as it may not be initialized yet */
    public get worker(): Promise<Worker> {
        if (this._worker) {
            return Promise.resolve(this._worker);
        }
        return new Promise(resolve => this.workerResolvers.push(resolve));
    }
}
