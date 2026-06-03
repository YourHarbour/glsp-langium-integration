import { BrowserMessageReader, BrowserMessageWriter, createMessageConnection, MessageConnection } from 'vscode-languageserver/browser.js';
import { LangiumMessageTypes } from '../../common/constants/langium-message-types.js';
import { GlspLangiumSharedServices, LangiumMessageEvent } from '../../common/types/types.js';

/** A proxy that provides access to the `MessageConnection` established with the GLSP client */
export class GlspConnection {
    protected _connection: MessageConnection;

    protected connectionResolvers: ((value: MessageConnection) => void)[] = [];

    constructor(protected services: GlspLangiumSharedServices) {}

    public init() {
        const initCb = ({ data }: LangiumMessageEvent<MessagePort>) => {
            if (data.type === LangiumMessageTypes.INIT_CHANNEL) {
                const reader = new BrowserMessageReader(data.payload);
                const writer = new BrowserMessageWriter(data.payload);

                this._connection = createMessageConnection(reader, writer);
                this._connection.listen();

                this.connectionResolvers.forEach(resolve => resolve(this._connection));

                self.removeEventListener('message', initCb);
            }
        };

        self.addEventListener('message', initCb);
    }

    public get connection(): Promise<MessageConnection> {
        if (this._connection) {
            return Promise.resolve(this._connection);
        }
        return new Promise(resolve => this.connectionResolvers.push(resolve));
    }
}
