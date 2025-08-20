import { LangiumSharedServices } from 'langium/lsp';
import { CodeResources } from 'monaco-editor-wrapper';
import { MessageTransports } from 'vscode-languageclient';
import { Diagnostic } from 'vscode-languageserver-types';
import { BatchValidationHandler } from '../../langium/worker/batch-validation-handler.js';
import { BatchValidationListener } from '../../langium/worker/batch-validation-listener.js';
import { DocumentAstHandler } from '../../langium/worker/document-ast-handler.js';
import { ExternalNodeInformationService } from '../../langium/worker/external-node-information-service.js';
import { GlspConnection } from '../../langium/worker/glsp-connection.js';
import { ScopingInformationListener } from '../../langium/worker/validation-information-listener.js';
import { LangiumMessageTypes } from '../constants/langium-message-types.js';

/** Information about the grammar-controlled nodes that need to be validated by Langium */
export type NodeTextToValidate = {
    /** Text to check against the grammar */
    text: string;
    /** Id of the item to validate; should be of the containing node, not the label */
    elementId: string;
    /**
     * Is used as a file ending to determine the grammar to use.
     *
     * Ideally, this is the same string as the type of the node
     */
    type: string;
};

/** The result of a batch validation of grammar-controlled texts (see {@link NodeTextToValidate}) */
export type ValidationResult = {
    /** URI containing `id` and `type` */
    uri: string;
    /**
     * Represents multiple diagnostics, such as a compiler errors or warnings.
     * @see {@link Diagnostic}
     */
    diagnostics: Diagnostic[];
};

/** A message format for plain worker API messages */
export type LangiumMessageData<T = any> = {
    type: LangiumMessageTypes;
    payload: T;
};
/** A type for plain worker API events adhering to {@link LangiumMessageData} as the data format */
export type LangiumMessageEvent<T = any> = MessageEvent<LangiumMessageData<T>>;

/** Information necessary to instantiate a Monaco editor for a label */
export type MonacoLabelConfig = {
    /** Id of the label model element */
    id: string;
    /** Id of the containing node model element */
    containerId: string;
    /**
     * Is used as a file ending to determine the grammar to use.
     *
     * Ideally, this is the same string as the type of the node
     */
    type: string;
    /** Text to initalize the Monaco editor with */
    text: string;
};

/** Derived information to provide to the wrapper of a Monaco editor */
export interface LangiumConfigParams {
    /** Filename of the constructed Langium document */
    id: string;
    /** Initial text information for the editor */
    codeResources?: CodeResources;
    /** The element to render the editor in */
    htmlContainer: HTMLElement;
    /** The element to render the widgets in, as the editor may be too constrained; should be the UI extension */
    overflowContainer?: HTMLElement;
}

/** Extended information of the wrapper of the init editor */
export interface LangiumInitConfigParams extends LangiumConfigParams {
    worker: Worker;
    messagePort?: MessagePort;
    messageTransports?: MessageTransports;
}

/** Injectors for the GLSP-Langium integration services */
export type GlspServiceInjectors = {
    BatchValidationHandler?: (services: GlspLangiumSharedServices) => BatchValidationHandler;
    DocumentAstHandler?: (services: GlspLangiumSharedServices) => DocumentAstHandler;
    ScopingInformationListener?: (services: GlspLangiumSharedServices) => ScopingInformationListener;
    BatchValidationListener?: (services: GlspLangiumSharedServices) => BatchValidationListener;
    GlspConnection?: (services: GlspLangiumSharedServices) => GlspConnection;
    ExternalNodeInformationService?: (services: GlspLangiumSharedServices) => ExternalNodeInformationService;
};

/** GLSP-Langium integration services */
export type GlspServices = {
    BatchValidationHandler: BatchValidationHandler;
    DocumentAstHandler: DocumentAstHandler;
    ScopingInformationListener: ScopingInformationListener;
    BatchValidationListener: BatchValidationListener;
    GlspConnection: GlspConnection;
    ExternalNodeInformationService: ExternalNodeInformationService;
};

/** Additional shared Langium services */
export type GlspLangiumSharedGlspServices = {
    glsp: GlspServices;
};

/** Langium shared services extended with {@link GlspServices} */
export type GlspLangiumSharedServices = LangiumSharedServices & GlspLangiumSharedGlspServices;
