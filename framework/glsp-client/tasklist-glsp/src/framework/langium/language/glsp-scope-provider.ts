import { AstUtils, DefaultScopeProvider, LangiumCoreServices, LangiumDocument, ReferenceInfo, Scope } from 'langium';
import { UriRegex } from '../../common/constants/langium-uri-regex.js';
import { GlspLangiumSharedServices, GlspServices } from '../../common/types/types.js';

/**
 * The `ScopeProvider` is responsible to actually provide a `Scope` for a given context, not only `AstNodeDescription` elements.
 * It has thus access to more granular information about the context in question.
 */
export class GlspScopeProvider extends DefaultScopeProvider {
    protected glsp: GlspServices;

    constructor(services: LangiumCoreServices) {
        super(services);
        this.glsp = (services.shared as GlspLangiumSharedServices).glsp;
    }

    override getScope(context: ReferenceInfo): Scope {
        const document = AstUtils.getDocument(context.container);

        // Capture both batch validation and Monaco-based edits
        const match = document.uri.toString().match(UriRegex);
        if (!match) {
            console.log('Non-configured document URI received', document);
            return super.getScope(context);
        }

        // Each matching group excludes the other, so only 1 can be defined
        const id = match[1] ?? match[2];

        return this.getCustomScope(context, document, id) ?? super.getScope(context);
    }

    /**
     * This method allows easy access to all context information, including the id, in order to allow
     * context-aware scoping.
     *
     * @param context Information about a cross-reference
     * @param document The document using the reference
     * @param id The id extracted from the document's URI
     */
    protected getCustomScope(context: ReferenceInfo, document: LangiumDocument, id: string): Scope | void {}
}
