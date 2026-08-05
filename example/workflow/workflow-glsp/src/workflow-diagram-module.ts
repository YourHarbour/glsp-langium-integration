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
    DEFAULT_ALIGNABLE_ELEMENT_FILTER,
    DefaultTypes,
    DeleteElementContextMenuItemProvider,
    DiamondNodeView,
    FeatureModule,
    GCompartment,
    GCompartmentView,
    GEdge,
    GGraph,
    GLSPProjectionView,
    GLabel,
    GLabelView,
    IHelperLineOptions,
    LogLevel,
    RectangularNodeView,
    RevealNamedElementActionProvider,
    RoundedCornerNodeView,
    StructureCompartmentView,
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
import { taskEditorModule } from './direct-task-editing/task-editor-module.js';
import { workflowLangiumModule } from './langium-integration/workflow-langium-module.js';
import { WorkflowLangiumTypes } from './langium-integration/workflow-langium-types.js';
import { BranchingNode, CategoryNode, ConditionalEdge, Icon, SynchronizationNode, TaskNode, WeightedEdge } from './model.js';
import { WorkflowSnapper } from './workflow-snapper.js';
import { WorkflowStartup } from './workflow-startup.js';
import { IconView, TaskNodeView, WorkflowEdgeView } from './workflow-views.js';

export const workflowDiagramModule = new FeatureModule(
    (bind, unbind, isBound, rebind) => {
        const context = { bind, unbind, isBound, rebind };

        bindOrRebind(context, TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        bindOrRebind(context, TYPES.LogLevel).toConstantValue(LogLevel.warn);
        bindAsService(context, TYPES.ICommandPaletteActionProvider, RevealNamedElementActionProvider);
        bindAsService(context, TYPES.IContextMenuItemProvider, DeleteElementContextMenuItemProvider);

        configureDefaultModelElements(context);
        configureModelElement(context, 'task:automated', TaskNode, TaskNodeView);
        configureModelElement(context, 'task:manual', TaskNode, TaskNodeView);
        configureModelElement(context, 'label:heading', GLabel, GLabelView, { enable: [editLabelFeature] });
        configureModelElement(context, 'comp:comp', GCompartment, GCompartmentView);
        configureModelElement(context, 'label:icon', GLabel, GLabelView);
        overrideModelElement(context, DefaultTypes.EDGE, GEdge, WorkflowEdgeView);
        configureModelElement(context, 'edge:weighted', WeightedEdge, WorkflowEdgeView);
        configureModelElement(context, 'icon', Icon, IconView);
        configureModelElement(context, 'activityNode:merge', BranchingNode, DiamondNodeView);
        configureModelElement(context, 'activityNode:decision', BranchingNode, DiamondNodeView);
        configureModelElement(context, 'activityNode:fork', SynchronizationNode, RectangularNodeView);
        configureModelElement(context, 'activityNode:join', SynchronizationNode, RectangularNodeView);
        overrideModelElement(context, DefaultTypes.GRAPH, GGraph, GLSPProjectionView);
        configureModelElement(context, 'category', CategoryNode, RoundedCornerNodeView);
        configureModelElement(context, 'struct', GCompartment, StructureCompartmentView);
        configureModelElement(context, WorkflowLangiumTypes.CONDITIONAL_EDGE, ConditionalEdge, WorkflowEdgeView);
        configureModelElement(context, WorkflowLangiumTypes.MONACO_LABEL, GLabel, MonacoLabelView);
        configureModelElement(context, WorkflowLangiumTypes.LABEL_VARIABLE, GLabel, GLabelView, { enable: [editLabelFeature] });

        bind<IHelperLineOptions>(TYPES.IHelperLineOptions).toDynamicValue(ctx => {
            const options: IHelperLineOptions = {};
            // skip icons for alignment as well as compartments which are only used for structure
            options.alignmentElementFilter = element =>
                DEFAULT_ALIGNABLE_ELEMENT_FILTER(element) && !(element instanceof Icon) && !(element instanceof GCompartment);
            return options;
        });

        bindAsService(context, TYPES.IDiagramStartup, WorkflowStartup);
        bindOrRebind(context, TYPES.ISnapper).to(WorkflowSnapper);
    },
    { featureId: Symbol('workflowDiagram') }
);

export function createWorkflowDiagramContainer(...containerConfiguration: ContainerConfiguration): Container {
    return initializeWorkflowDiagramContainer(new Container(), ...containerConfiguration);
}

export function initializeWorkflowDiagramContainer(container: Container, ...containerConfiguration: ContainerConfiguration): Container {
    return initializeLangiumDiagramContainer(
        container,
        taskEditorModule,
        helperLineModule,
        gridModule,
        debugModule,
        workflowDiagramModule,
        workflowLangiumModule,
        ...containerConfiguration
    );
}
