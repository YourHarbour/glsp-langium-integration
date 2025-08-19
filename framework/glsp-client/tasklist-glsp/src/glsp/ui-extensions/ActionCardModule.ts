/********************************************************************************
 * Copyright (c) 2024 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { bindAsService, configureActionHandler, FeatureModule, SetModelAction, TYPES, UpdateModelAction } from '@eclipse-glsp/client';
import { LANGIUM_COMPONENT_TYPES } from '../../framework/glsp/constants/langium-component-types.js';
import { ActionCardConditionNodeEditor } from './EditActionCardCondition.js';
import { EditBranchEditor } from './EditBranch.js';
import { TextEditorUIExtension } from './TextEditorUIExtension.js';
import { MonacoContainerHandler } from './monaco-container.handler.js';
import { HealthcareMonacoSubmitService } from './monaco-submit.service.js';
import { HealthcareMonacoWrapperConfigService } from './monaco-wrapper-config.service.js';

export const ActionCardModule = new FeatureModule(
    (bind, _unbind, isBound, rebind) => {
        const context = { bind, _unbind, isBound, rebind };

        bindAsService(bind, TYPES.IUIExtension, ActionCardConditionNodeEditor);
        bindAsService(bind, TYPES.IUIExtension, EditBranchEditor);
        bindAsService(bind, TYPES.IUIExtension, TextEditorUIExtension);

        bind(MonacoContainerHandler).toSelf().inSingletonScope();
        configureActionHandler(context, SetModelAction.KIND, MonacoContainerHandler);
        configureActionHandler(context, UpdateModelAction.KIND, MonacoContainerHandler);

        bind(LANGIUM_COMPONENT_TYPES.MonacoSubmitService).to(HealthcareMonacoSubmitService);
        bind(LANGIUM_COMPONENT_TYPES.MonacoWrapperConfigService).to(HealthcareMonacoWrapperConfigService);
    },
    { featureId: Symbol('ActionCardNodeEditorModule') }
);
