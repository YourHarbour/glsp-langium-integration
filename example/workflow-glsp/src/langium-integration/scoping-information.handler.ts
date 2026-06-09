import { GModelRootSchema } from '@eclipse-glsp/client';
import { LangiumScopingInformationHandler } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { InventoryItem } from '../model.js';
import { WorkflowLangiumTypes } from './workflow-langium-types.js';

/**
 * Generates the scoping information for the Langium language server from the current graph model.
 *
 * All items of all inventory nodes on the diagram are collected and provided as external
 * `InventoryItem` elements, so that the conditional edge grammar can resolve references to them
 * (e.g. `if Steel.amount > 100`).
 */
@injectable()
export class WorkflowLangiumScopingInformationHandler extends LangiumScopingInformationHandler {
    protected override generateScopingInformation(model: GModelRootSchema) {
        const inventoryItems: Record<string, string> = {};

        model.children?.forEach(child => {
            if (child.type === WorkflowLangiumTypes.INVENTORY_NODE) {
                const items = ((child as any).items ?? []) as InventoryItem[];
                items.forEach(item => {
                    inventoryItems[item.id] = item.name;
                });
            }
        });

        return { InventoryItem: inventoryItems };
    }
}
