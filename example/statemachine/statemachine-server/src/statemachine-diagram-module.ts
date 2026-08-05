/********************************************************************************
 * Copyright (c) 2022-2026 STMicroelectronics and others.
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
    BindingTarget,
    DiagramConfiguration,
    EdgeCreationChecker,
    GLSPServerInitializer,
    GModelDiagramModule,
    InstanceMultiBinding,
    LabelEditValidator,
    MultiBinding,
    OperationHandlerConstructor,
    ServerModule,
    SourceModelStorage
} from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { ApplyDeclarationsEditHandler } from './declarationsedit/apply-declarations-edit-handler';
import { CreateDeclarationsNodeHandler } from './handler/create-declarations-node-handler';
import { CreateStateNodeHandler } from './handler/create-state-node-handler';
import { CreateTransitionEdgeHandler } from './handler/create-transition-edge-handler';
import { StatemachineLabelEditValidator } from './labeledit/statemachine-label-edit-validator';
import { StatemachineDiagramConfiguration } from './statemachine-diagram-configuration';
import { StatemachineEdgeCreationChecker } from './statemachine-edge-creation-checker';
import { CustomArgsInitContribution } from './statemachine-glsp-server';
import { ApplyTransitionEditHandler } from './transitionedit/apply-transition-edit-handler';

@injectable()
export class StatemachineServerModule extends ServerModule {
    protected override configureGLSPServerInitializers(binding: MultiBinding<GLSPServerInitializer>): void {
        binding.add(CustomArgsInitContribution);
    }
}

@injectable()
export class StatemachineDiagramModule extends GModelDiagramModule {
    constructor(public bindSourceModelStorage: () => BindingTarget<SourceModelStorage>) {
        super();
    }

    get diagramType(): string {
        return 'statemachine-diagram';
    }

    protected override configureOperationHandlers(binding: InstanceMultiBinding<OperationHandlerConstructor>): void {
        super.configureOperationHandlers(binding);
        binding.add(CreateStateNodeHandler);
        binding.add(CreateDeclarationsNodeHandler);
        binding.add(CreateTransitionEdgeHandler);
        binding.add(ApplyTransitionEditHandler);
        binding.add(ApplyDeclarationsEditHandler);
    }

    protected bindDiagramConfiguration(): BindingTarget<DiagramConfiguration> {
        return StatemachineDiagramConfiguration;
    }

    protected override bindLabelEditValidator(): BindingTarget<LabelEditValidator> | undefined {
        return StatemachineLabelEditValidator;
    }

    protected override bindEdgeCreationChecker(): BindingTarget<EdgeCreationChecker> | undefined {
        return StatemachineEdgeCreationChecker;
    }
}
