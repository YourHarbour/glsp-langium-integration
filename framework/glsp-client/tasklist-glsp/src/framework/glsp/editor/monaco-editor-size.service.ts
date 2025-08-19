import { injectable } from 'inversify';

/**
 * Provides the size of the the Monaco editor and its containing elements. As it is likely that very specific
 * sizes are required, possibly different for each editor, this should likely be implemented by the application.
 * The `id` parameter of the methods is given as an easily extensible interface but does not need to be used.
 *
 * This gives the application greater control over the size of the editors, e.g. dynamically increasing the width
 * to accommodate longer text.
 *
 * Any custom implementation should rebind the corresponding service like this:
 * `rebind(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService).to(MyMonacoEditorSizeService).inSingletonScope()`
 */
@injectable()
export abstract class MonacoEditorSizeService {
    public abstract getWidth(id: string): string;
    public abstract getHeight(id: string): string;
}

/**
 * A default implementation of {@link MonacoEditorSizeService} that provides fixed values for both width and height
 * without considering the id.
 */
@injectable()
export class DefaultMonacoEditorSizeService extends MonacoEditorSizeService {
    public override getWidth(id: string): string {
        return '300px';
    }
    public override getHeight(id: string): string {
        return '20px';
    }
}
