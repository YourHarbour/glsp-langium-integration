import { injectable } from 'inversify';

/**
 * This abstract class provides an extensible service used to create a Langium LSP server for `LangiumWorkerHandler`.
 *
 * It must be bound using the following code:
 * `bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory).to(MyLangiumWorkerFactory)`
 */
@injectable()
export abstract class LangiumWorkerFactory {
    public abstract create(): Worker;
}
