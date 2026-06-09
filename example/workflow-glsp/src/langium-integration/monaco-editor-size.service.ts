import { MonacoEditorSizeService } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';

/**
 * Provides the size of the embedded Monaco editors. As the editors are placed directly
 * on the conditional edges, a slightly more compact size than the framework default is used.
 */
@injectable()
export class WorkflowMonacoEditorSizeService extends MonacoEditorSizeService {
    public override getWidth(id: string): string {
        return '230px';
    }

    public override getHeight(id: string): string {
        return '22px';
    }
}
