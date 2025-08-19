import { AstNode, AstNodeDescription, DefaultLinker, LangiumCoreServices } from 'langium';
import { GlspLangiumSharedServices, GlspServices } from '../../common/types/types.js';

/**
 * The `Linker` is responsible for resolving the references in a `LangiumDocument`.
 *
 * The critical part for our integration is to override `loadAstNode` as this tries to lookup the
 * nodes, as defined by a `AstNodeDescription`. The descriptions we injected in the `ScopeComputation`
 * need to resolve to an actual `AstNode` object, though it can be minimal in scope.
 */
export class GlspLinker extends DefaultLinker {
    protected glsp: GlspServices;

    constructor(services: LangiumCoreServices) {
        super(services);
        this.glsp = (services.shared as GlspLangiumSharedServices).glsp;
    }

    protected override loadAstNode(nodeDescription: AstNodeDescription): AstNode | undefined {
        const externalNodeNames = this.glsp.ExternalNodeInformationService.getExternalNodeNames();

        for (const name of externalNodeNames) {
            if (nodeDescription.type === name) {
                return { $type: name };
            }
        }

        return super.loadAstNode(nodeDescription);
    }
}
