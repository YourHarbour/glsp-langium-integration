import { configureActionHandler, FeatureModule, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { LANGIUM_COMPONENT_TYPES } from 'glsp-langium-integration/glsp';
import { StatemachineLangiumWorkerFactory } from './langium-worker.factory.js';
import { StatemachineMonacoContainerHandler } from './monaco-container.handler.js';
import { StatemachineMonacoEditorCreationService } from './monaco-editor-creation.service.js';
import { StatemachineMonacoEditorSizeService } from './monaco-editor-size.service.js';
import { StatemachineMonacoSubmitService } from './monaco-submit.service.js';
import { StatemachineMonacoWrapperConfigService } from './monaco-wrapper-config.service.js';
import { StatemachineCommunicationHandler } from './model-update.handler.js';
import { StatemachineLangiumScopingInformationHandler } from './scoping-information.handler.js';

/**
 * Registers the application-specific services and handlers of the GLSP-Langium integration
 * for the statemachine example:
 * - the worker factory creating the Langium language server worker
 * - the Monaco editor management for the conditional edges (creation, sizing, submit handling)
 * - the generation of the scoping information (upstream task variables per conditional edge) and the validation trigger
 *
 * The framework-level defaults are registered by the `GlspLangiumModule` of the
 * `glsp-langium-integration` package (see `initializeLangiumDiagramContainer`).
 */
export const statemachineLangiumModule = new FeatureModule(
    (bind, _unbind, isBound, rebind) => {
        const context = { bind, _unbind, isBound, rebind };

        bind(StatemachineMonacoContainerHandler).toSelf().inSingletonScope();
        configureActionHandler(context, SetModelAction.KIND, StatemachineMonacoContainerHandler);
        configureActionHandler(context, UpdateModelAction.KIND, StatemachineMonacoContainerHandler);

        bind(StatemachineCommunicationHandler).toSelf().inSingletonScope();
        configureActionHandler(context, SetModelAction.KIND, StatemachineCommunicationHandler);
        configureActionHandler(context, UpdateModelAction.KIND, StatemachineCommunicationHandler);

        bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory).to(StatemachineLangiumWorkerFactory).inSingletonScope();
        bind(LANGIUM_COMPONENT_TYPES.MonacoSubmitService).to(StatemachineMonacoSubmitService);
        bind(LANGIUM_COMPONENT_TYPES.MonacoWrapperConfigService).to(StatemachineMonacoWrapperConfigService);

        rebind(LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler).to(StatemachineLangiumScopingInformationHandler);
        rebind(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService).to(StatemachineMonacoEditorSizeService).inSingletonScope();
        // The declarations element needs a multi-line editor; the framework default enforces single-line labels
        rebind(LANGIUM_COMPONENT_TYPES.MonacoEditorCreationService).to(StatemachineMonacoEditorCreationService).inSingletonScope();
    },
    { featureId: Symbol('statemachineLangiumModule') }
);
