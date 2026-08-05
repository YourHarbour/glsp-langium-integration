import { MonacoEditorSizeService } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';

/**
 * Provides the size of the embedded Monaco editors: the labels on the transition edges are
 * compact single-line editors, while the declarations label is a multi-line editor.
 */
@injectable()
export class StatemachineMonacoEditorSizeService extends MonacoEditorSizeService {
    public override getWidth(id: string): string {
        return this.isDeclarationsLabel(id) ? '280px' : '200px';
    }

    public override getHeight(id: string): string {
        return this.isDeclarationsLabel(id) ? '110px' : '22px';
    }

    protected isDeclarationsLabel(id: string): boolean {
        return id.endsWith('_declarations');
    }
}
