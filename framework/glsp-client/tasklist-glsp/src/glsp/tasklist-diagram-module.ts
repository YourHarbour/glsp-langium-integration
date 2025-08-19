/********************************************************************************
 * Copyright (c) 2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied:
 * -- GNU General Public License, version 2 with the GNU Classpath Exception
 * which is available at https://www.gnu.org/software/classpath/license.html
 * -- MIT License which is available at https://opensource.org/license/mit.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR MIT
 ********************************************************************************/
import {
    configureDefaultModelElements,
    configureModelElement,
    ConsoleLogger,
    ContainerConfiguration,
    DefaultTypes,
    editLabelFeature,
    GEdge,
    GLabel,
    GLabelView,
    LogLevel,
    RoundedCornerNodeView,
    TYPES
} from '@eclipse-glsp/client';
import { Container, ContainerModule } from 'inversify';
import '../../css/diagram.css';
import { HealthcareModelTypes } from './constants/HealthcareModelTypes.js';
import { ArrowEdgeView } from './views/EdgeViews.js';
// eslint-disable-next-line max-len
import { MonacoLabelView } from '../framework/glsp/editor/monaco-label.view.js';
import { initializeLangiumDiagramContainer } from '../framework/glsp/glsp-langium-module.js';
import { communicationModule } from './communication/communication.module.js';
import { ActionCardModule } from './ui-extensions/ActionCardModule.js';
import {
    ActionCardConditionNode,
    ActionNode,
    AdmissionActionNode,
    BranchNode,
    DischargeActionNode,
    DiseaseNode,
    TestNode
} from './views/NodeView.js';

const taskListDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    const context = { bind, unbind, isBound, rebind };
    configureDefaultModelElements(context);
    configureModelElement(context, HealthcareModelTypes.ACTION_NODE, ActionNode, RoundedCornerNodeView);
    configureModelElement(context, HealthcareModelTypes.ACTION_CARD_CONDITION_NODE, ActionCardConditionNode, RoundedCornerNodeView);
    configureModelElement(context, HealthcareModelTypes.BRANCH_NODE, BranchNode, RoundedCornerNodeView);
    configureModelElement(context, HealthcareModelTypes.ADMISSION_ACTION_NODE, AdmissionActionNode, RoundedCornerNodeView);
    configureModelElement(context, HealthcareModelTypes.DISCHARGE_ACTION_NODE, DischargeActionNode, RoundedCornerNodeView);
    configureModelElement(context, DefaultTypes.EDGE, GEdge, ArrowEdgeView);
    configureModelElement(context, DefaultTypes.LABEL, GLabel, GLabelView, { enable: [editLabelFeature] });
    configureModelElement(context, HealthcareModelTypes.MONACO_LABEL, GLabel, MonacoLabelView);
    configureModelElement(context, HealthcareModelTypes.TEST_NODE, TestNode, RoundedCornerNodeView);
    configureModelElement(context, HealthcareModelTypes.DISEASE_NODE, DiseaseNode, RoundedCornerNodeView);
});

export function initializeTasklistDiagramContainer(container: Container, ...containerConfiguration: ContainerConfiguration): Container {
    return initializeLangiumDiagramContainer(
        container,
        taskListDiagramModule,
        ActionCardModule,
        communicationModule,
        ...containerConfiguration
    );
}
