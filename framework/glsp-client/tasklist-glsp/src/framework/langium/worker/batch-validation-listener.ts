import { URI } from 'langium';
import { ValidateGlspType } from '../../common/constants/langium-message-types.js';
import { GlspLangiumSharedServices } from '../../common/types/types.js';

/** Listens to batch validation requests from the GLSP client */
export class BatchValidationListener {
    constructor(protected services: GlspLangiumSharedServices) {}

    public async listen() {
        const connection = await this.services.glsp.GlspConnection.connection;
        connection.onNotification(ValidateGlspType, elements => {
            const documents = elements.map(element =>
                this.services.workspace.LangiumDocumentFactory.fromString(
                    element.text,
                    URI.parse(`inmemory://model/validate/${element.elementId}.${element.type}`)
                )
            );
            this.services.workspace.DocumentBuilder.build(documents, { validation: true });
        });
    }
}
