import { configureActionHandler, FeatureModule, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { LANGIUM_COMPONENT_TYPES } from 'glsp-langium-integration/glsp';
import { WorkflowLangiumWorkerFactory } from './langium-worker.factory.js';
import { WorkflowMonacoContainerHandler } from './monaco-container.handler.js';
import { WorkflowMonacoEditorSizeService } from './monaco-editor-size.service.js';
import { WorkflowMonacoSubmitService } from './monaco-submit.service.js';
import { WorkflowMonacoWrapperConfigService } from './monaco-wrapper-config.service.js';
import { WorkflowCommunicationHandler } from './model-update.handler.js';
import { WorkflowLangiumScopingInformationHandler } from './scoping-information.handler.js';

/**
 * Registers the application-specific services and handlers of the GLSP-Langium integration
 * for the workflow example:
 * - the worker factory creating the Langium language server worker
 * - the Monaco editor management for the conditional edges (creation, sizing, submit handling)
 * - the generation of the scoping information (inventory items) and the validation trigger
 *
 * The framework-level defaults are registered by the `GlspLangiumModule` of the
 * `glsp-langium-integration` package (see `initializeLangiumDiagramContainer`).
 */
export const workflowLangiumModule = new FeatureModule(
    (bind, _unbind, isBound, rebind) => {
        const context = { bind, _unbind, isBound, rebind };

        bind(WorkflowMonacoContainerHandler).toSelf().inSingletonScope();
        configureActionHandler(context, SetModelAction.KIND, WorkflowMonacoContainerHandler);
        configureActionHandler(context, UpdateModelAction.KIND, WorkflowMonacoContainerHandler);

        bind(WorkflowCommunicationHandler).toSelf().inSingletonScope();
        configureActionHandler(context, SetModelAction.KIND, WorkflowCommunicationHandler);
        configureActionHandler(context, UpdateModelAction.KIND, WorkflowCommunicationHandler);

        bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory).to(WorkflowLangiumWorkerFactory).inSingletonScope();
        bind(LANGIUM_COMPONENT_TYPES.MonacoSubmitService).to(WorkflowMonacoSubmitService);
        bind(LANGIUM_COMPONENT_TYPES.MonacoWrapperConfigService).to(WorkflowMonacoWrapperConfigService);

        rebind(LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler).to(WorkflowLangiumScopingInformationHandler);
        rebind(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService).to(WorkflowMonacoEditorSizeService).inSingletonScope();
    },
    { featureId: Symbol('workflowLangiumModule') }
);
