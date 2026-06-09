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
import {
    Action,
    ApplyLabelEditOperation,
    Command,
    GLabel,
    GModelApplyLabelEditOperationHandler,
    GModelOperationHandler,
    getOrThrow,
    hasStringProp,
    MaybePromise,
    Operation
} from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { createInventoryItemId, createInventoryItemName, InventoryNode, rebuildInventoryNode } from '../graph-extension';

/**
 * Is sent from the client (the add button of the inventory table) to append a new
 * item with a generated name and an amount of 0 to an inventory node.
 */
export interface AddInventoryItemOperation extends Operation {
    kind: typeof AddInventoryItemOperation.KIND;
    /** Id of the inventory node to add an item to */
    nodeId: string;
}

export namespace AddInventoryItemOperation {
    export const KIND = 'addInventoryItem';

    export function is(object: any): object is AddInventoryItemOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'nodeId');
    }

    export function create(options: { nodeId: string }): AddInventoryItemOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}

/**
 * Is sent from the client (the delete button of an inventory table row) to remove
 * an item from an inventory node.
 */
export interface RemoveInventoryItemOperation extends Operation {
    kind: typeof RemoveInventoryItemOperation.KIND;
    /** Id of the inventory node containing the item */
    nodeId: string;
    /** Id of the item to remove */
    itemId: string;
}

export namespace RemoveInventoryItemOperation {
    export const KIND = 'removeInventoryItem';

    export function is(object: any): object is RemoveInventoryItemOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'nodeId') && hasStringProp(object, 'itemId');
    }

    export function create(options: { nodeId: string; itemId: string }): RemoveInventoryItemOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}

@injectable()
export class AddInventoryItemHandler extends GModelOperationHandler {
    readonly operationType = AddInventoryItemOperation.KIND;

    createCommand(operation: AddInventoryItemOperation): MaybePromise<Command | undefined> {
        const node = getOrThrow(
            this.modelState.index.findByClass(operation.nodeId, InventoryNode),
            `Cannot find inventory node with id '${operation.nodeId}'`
        );
        return this.commandOf(() => {
            node.items = [...node.items, { id: createInventoryItemId(node), name: createInventoryItemName(node), amount: 0 }];
            rebuildInventoryNode(node);
        });
    }
}

@injectable()
export class RemoveInventoryItemHandler extends GModelOperationHandler {
    readonly operationType = RemoveInventoryItemOperation.KIND;

    createCommand(operation: RemoveInventoryItemOperation): MaybePromise<Command | undefined> {
        const node = getOrThrow(
            this.modelState.index.findByClass(operation.nodeId, InventoryNode),
            `Cannot find inventory node with id '${operation.nodeId}'`
        );
        if (!node.items.some(item => item.id === operation.itemId)) {
            return undefined;
        }
        return this.commandOf(() => {
            node.items = node.items.filter(item => item.id !== operation.itemId);
            rebuildInventoryNode(node);
        });
    }
}

/**
 * Extends the default label edit handler so that edits of the inventory cell labels are
 * applied to the underlying {@link InventoryNode.items} (and the labels are rebuilt from
 * them), keeping the items - the source of the Langium scoping information - in sync.
 */
@injectable()
export class InventoryAwareApplyLabelEditOperationHandler extends GModelApplyLabelEditOperationHandler {
    override createCommand(operation: ApplyLabelEditOperation): MaybePromise<Command | undefined> {
        const label = this.modelState.index.findByClass(operation.labelId, GLabel);
        const node = label?.parent;
        if (label && node instanceof InventoryNode) {
            const item = node.items.find(i => label.id === `${i.id}_name` || label.id === `${i.id}_amount`);
            if (item) {
                return this.commandOf(() => {
                    if (label.id.endsWith('_name')) {
                        item.name = operation.text.trim();
                    } else {
                        item.amount = Math.max(0, Number.parseInt(operation.text, 10) || 0);
                    }
                    rebuildInventoryNode(node);
                });
            }
        }
        return super.createCommand(operation);
    }
}
