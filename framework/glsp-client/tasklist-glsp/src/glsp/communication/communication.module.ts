import { configureActionHandler, FeatureModule, SetModelAction, UpdateModelAction } from '@eclipse-glsp/client';
import { LANGIUM_COMPONENT_TYPES } from '../../framework/glsp/constants/langium-component-types.js';
import { HealthcareLangiumScopingInformationHandler } from './langium-scoping-information.handler.js';
import { HealthcareLangiumWorkerFactory } from './langium-worker.factory.js';
import { CommunicationHandler } from './model-update.handler.js';

export const communicationModule = new FeatureModule((bind, _unbind, isBound, rebind) => {
    const context = { bind, _unbind, isBound, rebind };

    bind(CommunicationHandler).toSelf().inSingletonScope();
    configureActionHandler(context, SetModelAction.KIND, CommunicationHandler);
    configureActionHandler(context, UpdateModelAction.KIND, CommunicationHandler);

    rebind(LANGIUM_COMPONENT_TYPES.LangiumScopingInformationHandler).to(HealthcareLangiumScopingInformationHandler);

    bind(LANGIUM_COMPONENT_TYPES.LangiumWorkerFactory).to(HealthcareLangiumWorkerFactory);
});
