import { ScopingInformationGlspType } from '../../common/constants/langium-message-types.js';
import { GlspLangiumSharedServices } from '../../common/types/types.js';

/** This class receives the scoping information from the GLSP client and provides access to it */
export class ScopingInformationListener<T = any> {
    public scopingInformation: T;

    constructor(protected services: GlspLangiumSharedServices) {}

    public async listen() {
        const connection = await this.services.glsp.GlspConnection.connection;
        connection.onNotification(ScopingInformationGlspType, data => this.handleInformation(data));
    }

    protected handleInformation(data: T) {
        this.scopingInformation = data;
    }
}
