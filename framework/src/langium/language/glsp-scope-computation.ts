import { AstNodeDescription, DefaultScopeComputation, LangiumCoreServices, LangiumDocument } from 'langium';
import { GlspLangiumSharedServices, GlspServices } from '../../common/types/types.js';
import { createAstNodeDescriptions } from '../../common/util/langium-ast.util.js';

/**
 * The `ScopeComputation` is responsible for providing `AstNodeDescription`s for the dynamic elements,
 * i.e. non-keyword elements of the grammar.
 *
 * For the purposes of our integration, we override `computeExports` to also inject our external nodes
 * to make them available in the scope. Those elements must then be matched by the `Linker` to ensure
 * the references can be resolved.
 */
export class GlspScopeComputation extends DefaultScopeComputation {
    protected glsp: GlspServices;

    constructor(services: LangiumCoreServices) {
        super(services);
        this.glsp = (services.shared as GlspLangiumSharedServices).glsp;
    }

    override async collectExportedSymbols(document: LangiumDocument): Promise<AstNodeDescription[]> {
        const exports = await super.collectExportedSymbols(document);

        const customNodeDescriptions = this.getCustomNodes(document);

        return [...exports, ...customNodeDescriptions];
    }

    /**
     * By default, we expect the scoping information to follow a certain format, i.e. a simple
     * object, where the name of the type in the grammar identifies an array of scoping information elements.
     */
    protected getCustomNodes(document: LangiumDocument): AstNodeDescription[] {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation;
        const externalNodeNames = this.glsp.ExternalNodeInformationService.getExternalNodeNames();

        const externalNodeDescriptions: AstNodeDescription[] = [];

        externalNodeNames.forEach(name => {
            const nodeDescriptions = createAstNodeDescriptions(document, name, Object.entries(scopingInformation[name]));
            externalNodeDescriptions.push(...nodeDescriptions);
        });

        return externalNodeDescriptions;
    }
}
