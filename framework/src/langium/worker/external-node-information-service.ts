import { GlspLangiumSharedServices } from '../../common/types/types.js';

/** This class provides the type names of the external elements, which must correspond to the types defined in the grammar */
export class ExternalNodeInformationService {
    constructor(protected services: GlspLangiumSharedServices) {}

    public getExternalNodeNames(): string[] {
        return [];
    }
}
