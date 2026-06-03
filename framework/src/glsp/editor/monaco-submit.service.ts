import { injectable } from 'inversify';
import { MonacoLabelConfig } from '../../common/types/types.js';

/**
 * Provides a method to handle the submit from a Monaco editor created by `MonacoContainerUIExtension`.
 *
 * In virtually every case it should contain some code to inform the GLSP server of the changes with a
 * (custom) operation, which must then be handled on the server. However this communication takes place
 * is the concern of the application.
 *
 * It must be bound by the application like this:
 * `bind(LANGIUM_COMPONENT_TYPES.MonacoSubmitService).to(MyMonacoSubmitService)`
 */
@injectable()
export abstract class MonacoSubmitService {
    public abstract handleSubmit(label: MonacoLabelConfig, text: string, ast: any): void;
}
