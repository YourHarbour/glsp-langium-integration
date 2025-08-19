import { DocumentState } from 'langium';
import { startLanguageServer } from 'langium/lsp';
import { GlspLangiumSharedServices } from '../../common/types/types.js';

/** Registers our custom services in addition to the default services */
export function startGlspLanguageServer(services: GlspLangiumSharedServices) {
    services.glsp.GlspConnection.init();

    startLanguageServer(services);

    services.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, docs =>
        services.glsp.BatchValidationHandler.onBuildValidated(docs)
    );
    services.workspace.DocumentBuilder.onDocumentPhase(DocumentState.Validated, doc =>
        services.glsp.DocumentAstHandler.onDocumentValidated(doc)
    );
    services.glsp.ScopingInformationListener.listen();
    services.glsp.BatchValidationListener.listen();
}
