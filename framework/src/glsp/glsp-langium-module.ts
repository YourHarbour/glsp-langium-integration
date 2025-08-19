import { configureActionHandler, ContainerConfiguration, FeatureModule, initializeDiagramContainer, TYPES } from '@eclipse-glsp/client';
import { Container } from 'inversify';
import { LANGIUM_COMPONENT_TYPES } from './constants/langium-component-types.js';
import { MonacoContainerUIExtension } from './editor/monaco-container.extension.js';
import { MonacoEditorCreationService } from './editor/monaco-editor-creation.service.js';
import { DefaultMonacoEditorSizeService } from './editor/monaco-editor-size.service.js';
import { DefaultLangiumScopingInformationHandler } from './validation/langium-scoping-information.handler.js';
import { LangiumValidationHandler } from './validation/langium-validation.handler.js';
import {
    GenerateLangiumScopingInformationAction,
    LangiumScopingInformationSuccessAction,
    SetLangiumScopingInformationAction
} from './validation/validation.action.js';
import { LangiumWorkerHandler } from './worker/langium-worker.handler.js';
import { LangiumWorkerStartup } from './worker/langium-worker.startup.js';
import { LangiumWorkerStartupAction } from './worker/worker.action.js';

/**
 * A module registering the default setup of the services, handlers, and actions necessary for the integration to work.
 * As some services are entirely dependent on the specific application, they still have to be registered manually.
 */
export const GlspLangiumModule = new FeatureModule(
    (bind, _unbind, isBound, rebind) => {
        const context = { bind, _unbind, isBound, rebind };

        bind(LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler).to(DefaultLangiumScopingInformationHandler);
        configureActionHandler(context, SetLangiumScopingInformationAction.KIND, LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler);
        configureActionHandler(
            context,
            GenerateLangiumScopingInformationAction.KIND,
            LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler
        );

        bind(LANGIUM_COMPONENT_TYPES.LangiumValidationHandler).to(LangiumValidationHandler);
        configureActionHandler(context, LangiumScopingInformationSuccessAction.KIND, LANGIUM_COMPONENT_TYPES.LangiumValidationHandler);

        bind(TYPES.IDiagramStartup).to(LangiumWorkerStartup);
        bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler).to(LangiumWorkerHandler).inSingletonScope();
        configureActionHandler(context, LangiumWorkerStartupAction.KIND, LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler);

        bind(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService).to(DefaultMonacoEditorSizeService).inSingletonScope();
        bind(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension).to(MonacoContainerUIExtension).inSingletonScope();
        bind(TYPES.IUIExtension).toService(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension);

        bind(LANGIUM_COMPONENT_TYPES.MonacoEditorCreationService).to(MonacoEditorCreationService);
    },
    { featureId: Symbol('GlspLangiumModule') }
);

export function initializeLangiumDiagramContainer(container: Container, ...containerConfiguration: ContainerConfiguration): Container {
    return initializeDiagramContainer(container, GlspLangiumModule, ...containerConfiguration);
}
