import { AstNode, LangiumDocument } from 'langium';
import { ValidateLangiumType } from '../../common/constants/langium-message-types.js';
import { ValidationUriRegex } from '../../common/constants/langium-uri-regex.js';
import { GlspLangiumSharedServices, ValidationResult } from '../../common/types/types.js';

/** Sends a batch validation response to the GLSP client once all documents have been validated */
export class BatchValidationHandler {
    constructor(protected services: GlspLangiumSharedServices) {}

    public onBuildValidated(docs: LangiumDocument<AstNode>[]) {
        const validationResults = docs
            .filter(doc => doc.diagnostics != null)
            .map(doc => ({ uri: doc.uri.toString(), diagnostics: doc.diagnostics! })) as ValidationResult[];
        const isNotMonacoValidation = validationResults.some(result => !result.uri.match(ValidationUriRegex));
        if (!isNotMonacoValidation) {
            this.services.glsp.GlspConnection.connection.then(connection =>
                connection.sendNotification(ValidateLangiumType, validationResults)
            );
        }
    }
}
