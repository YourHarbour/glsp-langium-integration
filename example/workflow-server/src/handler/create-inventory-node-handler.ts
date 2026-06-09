/********************************************************************************
 * Copyright (c) 2026 EclipseSource and others.
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
import { CreateNodeOperation, GNode, Point } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { InventoryNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';
import { CreateWorkflowNodeOperationHandler } from './create-workflow-node-operation-handler';

/**
 * Creates a new inventory node, pre-filled with a few default items.
 * The item ids are derived from the (generated) node id so that they are unique
 * within the diagram; they are used as reference targets by the Langium scoping.
 */
@injectable()
export class CreateInventoryNodeHandler extends CreateWorkflowNodeOperationHandler {
    elementTypeIds = [ModelTypes.INVENTORY_NODE];
    label = 'Inventory';

    createNode(operation: CreateNodeOperation, relativeLocation?: Point): GNode | undefined {
        return InventoryNode.builder()
            .position(relativeLocation ?? Point.ORIGIN)
            .build();
    }
}
