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
import { GEdge, GModelCreateEdgeOperationHandler, GModelElement } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { ConditionalEdge, InventoryNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Creates a new conditional edge. The initial condition references the first item
 * of the first inventory node on the diagram (if present), so that the default text
 * is valid right away and demonstrates the expected syntax.
 */
@injectable()
export class CreateConditionalEdgeHandler extends GModelCreateEdgeOperationHandler {
    elementTypeIds = [ModelTypes.CONDITIONAL_EDGE];
    label = 'Conditional edge';

    createEdge(source: GModelElement, target: GModelElement): GEdge | undefined {
        return ConditionalEdge.builder()
            .sourceId(source.id)
            .targetId(target.id)
            .condition(this.defaultCondition())
            .build();
    }

    protected defaultCondition(): string {
        const inventoryNode = this.modelState.index.getAllByClass(InventoryNode)[0];
        const firstItem = inventoryNode?.items?.[0];
        return firstItem ? `if ${firstItem.name}.amount > 100` : 'if Item.amount > 100';
    }
}
