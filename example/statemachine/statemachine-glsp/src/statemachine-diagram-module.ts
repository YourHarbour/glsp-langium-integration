/********************************************************************************
 * Copyright (c) 2019-2026 EclipseSource and others.
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
import {
    ConsoleLogger,
    ContainerConfiguration,
    DefaultTypes,
    DeleteElementContextMenuItemProvider,
    FeatureModule,
    GEdge,
    GGraph,
    GLSPProjectionView,
    GLabel,
    GLabelView,
    LogLevel,
    RectangularNodeView,
    RevealNamedElementActionProvider,
    RoundedCornerNodeView,
    TYPES,
    bindAsService,
    bindOrRebind,
    configureDefaultModelElements,
    configureModelElement,
    debugModule,
    editLabelFeature,
    gridModule,
    helperLineModule,
    overrideModelElement
} from '@eclipse-glsp/client';
import 'balloon-css/balloon.min.css';
import { initializeLangiumDiagramContainer, MonacoLabelView } from 'glsp-langium-integration/glsp';
import { Container } from 'inversify';
import 'sprotty/css/edit-label.css';
import '../css/diagram.css';
import { statemachineLangiumModule } from './langium-integration/statemachine-langium-module.js';
import { StatemachineLangiumTypes } from './langium-integration/statemachine-langium-types.js';
import { DeclarationsNode, StateNode, TransitionEdge } from './model.js';
import { StatemachineSnapper } from './statemachine-snapper.js';
import { StatemachineStartup } from './statemachine-startup.js';
import { StatemachineEdgeView } from './statemachine-views.js';

export const statemachineDiagramModule = new FeatureModule(
    (bind, unbind, isBound, rebind) => {
        const context = { bind, unbind, isBound, rebind };

        bindOrRebind(context, TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        bindOrRebind(context, TYPES.LogLevel).toConstantValue(LogLevel.warn);
        bindAsService(context, TYPES.ICommandPaletteActionProvider, RevealNamedElementActionProvider);
        bindAsService(context, TYPES.IContextMenuItemProvider, DeleteElementContextMenuItemProvider);

        configureDefaultModelElements(context);
        configureModelElement(context, StatemachineLangiumTypes.STATE_NODE, StateNode, RoundedCornerNodeView);
        configureModelElement(context, StatemachineLangiumTypes.DECLARATIONS_NODE, DeclarationsNode, RectangularNodeView);
        configureModelElement(context, 'label:heading', GLabel, GLabelView, { enable: [editLabelFeature] });
        overrideModelElement(context, DefaultTypes.EDGE, GEdge, StatemachineEdgeView);
        configureModelElement(context, StatemachineLangiumTypes.TRANSITION_EDGE, TransitionEdge, StatemachineEdgeView);
        configureModelElement(context, StatemachineLangiumTypes.MONACO_LABEL, GLabel, MonacoLabelView);
        configureModelElement(context, StatemachineLangiumTypes.DECLARATIONS_LABEL, GLabel, MonacoLabelView);
        overrideModelElement(context, DefaultTypes.GRAPH, GGraph, GLSPProjectionView);

        bindAsService(context, TYPES.IDiagramStartup, StatemachineStartup);
        bindOrRebind(context, TYPES.ISnapper).to(StatemachineSnapper);
    },
    { featureId: Symbol('statemachineDiagram') }
);

export function createStatemachineDiagramContainer(...containerConfiguration: ContainerConfiguration): Container {
    return initializeStatemachineDiagramContainer(new Container(), ...containerConfiguration);
}

export function initializeStatemachineDiagramContainer(container: Container, ...containerConfiguration: ContainerConfiguration): Container {
    return initializeLangiumDiagramContainer(
        container,
        helperLineModule,
        gridModule,
        debugModule,
        statemachineDiagramModule,
        statemachineLangiumModule,
        ...containerConfiguration
    );
}
