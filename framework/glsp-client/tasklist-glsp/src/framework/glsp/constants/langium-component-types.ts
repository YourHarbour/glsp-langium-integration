/**
 * An object containing all the symbols of the newly created services and handlers that are used
 * to register and access them using `inversify`.
 */
export const LANGIUM_COMPONENT_TYPES = {
    LangiumScopingInformationHandler: Symbol('LangiumScopingInformationHandler'),
    LangiumValidationHandler: Symbol('LangiumValidationHandler'),
    LangiumWorkerHandler: Symbol('LangiumWorkerHandler'),
    LangiumWorkerFactory: Symbol('LangiumWorkerFactory'),
    MonacoContainerUIExtension: Symbol('MonacoContainerUIExtension'),
    MonacoEditorSizeService: Symbol('MonacoEditorSizeService'),
    MonacoSubmitService: Symbol('MonacoSubmitService'),
    MonacoWrapperConfigService: Symbol('MonacoWrapperConfigService'),
    MonacoEditorCreationService: Symbol('MonacoEditorCreationService')
};
