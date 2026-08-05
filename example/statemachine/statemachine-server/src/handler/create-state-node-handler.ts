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
import { GhostElement, Point } from '@eclipse-glsp/protocol';
import { CreateNodeOperation, GModelCreateNodeOperationHandler, GNode, ModelState } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { StateNode, StateNodeBuilder } from '../graph-extension';
import { ModelTypes } from '../util/model-types';
import { GridSnapper } from './grid-snapper';

@injectable()
export class CreateStateNodeHandler extends GModelCreateNodeOperationHandler {
    elementTypeIds = [ModelTypes.STATE_NODE];
    label = 'State';

    @inject(ModelState)
    protected override modelState: ModelState;

    override getLocation(operation: CreateNodeOperation): Point | undefined {
        return GridSnapper.snap(operation.location);
    }

    createNode(operation: CreateNodeOperation, relativeLocation?: Point): GNode | undefined {
        return this.builder(relativeLocation).build();
    }

    protected builder(point: Point = Point.ORIGIN): StateNodeBuilder {
        return StateNode.builder()
            .position(point ?? Point.ORIGIN)
            .name('State' + this.modelState.index.getAllByClass(StateNode).length);
    }

    override createTriggerGhostElement(elementTypeId: string): GhostElement | undefined {
        return { template: this.serializer.createSchema(this.builder(undefined).build()), dynamic: true };
    }
}
