import { Operation } from '@eclipse-glsp/client';

/**
 * Is sent from the add button of the inventory table to the GLSP server to append
 * a new item (with a generated name and an amount of 0) to an inventory node.
 */
export interface AddInventoryItemOperation extends Operation {
    kind: typeof AddInventoryItemOperation.KIND;
    /** Id of the inventory node to add an item to */
    nodeId: string;
}

export namespace AddInventoryItemOperation {
    export const KIND = 'addInventoryItem';

    export function is(object: unknown): object is AddInventoryItemOperation {
        return Operation.hasKind(object, KIND);
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
 * Is sent from the delete button of an inventory table row to the GLSP server to
 * remove an item from an inventory node.
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

    export function is(object: unknown): object is RemoveInventoryItemOperation {
        return Operation.hasKind(object, KIND);
    }

    export function create(options: { nodeId: string; itemId: string }): RemoveInventoryItemOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}
