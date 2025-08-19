import { NotificationType } from 'vscode-languageserver';
import { NodeTextToValidate, ValidationResult } from '../types/types.js';

/** The message types for worker and JSON-RPC communication between GLSP and the Langium Language Server */
export enum LangiumMessageTypes {
    /** Scoping information is sent by the GLSP client to the Langium worker */
    SCOPING_INFORMATION_GLSP = 'glspLangiumIntegration/scopingInformationFromGlsp',
    /** Elements that need to be validated are sent from the GLSP client to the Langium worker */
    VALIDATE_GLSP = 'glspLangiumIntegration/validateFromGlsp',
    /** The response to {@link VALIDATE_GLSP} with the results of the validation sent from the Langium worker to the GLSP client */
    VALIDATE_LANGIUM = 'glspLangiumIntegration/validatedByLangium',
    /**
     * The Langium AST is sent from the Langium worker to the GLSP client
     *
     * Should be extended with an id to make proper matching possible
     */
    AST_LANGIUM = 'glspLangiumIntegration/astFromLangium',
    /** Plain worker message sent from the GLSP client to the Langium worker to initalize the JSON-RPC connection */
    INIT_CHANNEL = 'glspLangiumIntegration/initChannel'
}

/** Properly typed `NotificationType` for {@link LangiumMessageTypes.VALIDATE_LANGIUM} */
export const ValidateLangiumType = new NotificationType<ValidationResult[]>(LangiumMessageTypes.VALIDATE_LANGIUM);
/** Properly typed `NotificationType` for {@link LangiumMessageTypes.VALIDATE_GLSP} */
export const ValidateGlspType = new NotificationType<NodeTextToValidate[]>(LangiumMessageTypes.VALIDATE_GLSP);
/**
 * Proper `NotificationType` for {@link LangiumMessageTypes.SCOPING_INFORMATION_GLSP}
 *
 * Due to the type for the scoping information only known on application level and not framework level, it has to by `any`
 */
export const ScopingInformationGlspType = new NotificationType<any>(LangiumMessageTypes.SCOPING_INFORMATION_GLSP);
