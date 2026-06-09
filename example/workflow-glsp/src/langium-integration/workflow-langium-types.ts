/**
 * Type constants for the Langium-backed model elements of the workflow example.
 */
export namespace WorkflowLangiumTypes {
    /** A node displaying the available inventory items as a table */
    export const INVENTORY_NODE = 'node:inventory';
    /** An edge guarded by a condition over the inventory items, e.g. `if Steel.amount > 100` */
    export const CONDITIONAL_EDGE = 'edge:conditional';
    /** A label that is rendered as an embedded Monaco editor */
    export const MONACO_LABEL = 'label:monaco';
    /** Editable name cell of an inventory item row */
    export const LABEL_INVENTORY_NAME = 'label:inventory-name';
    /** Editable amount cell of an inventory item row */
    export const LABEL_INVENTORY_AMOUNT = 'label:inventory-amount';
    /**
     * The grammar identifier of the conditional edge language.
     *
     * It is used as the file extension of the in-memory Langium documents
     * (`.conditional_edge`, see `fileExtensions` in `langium-config.json`),
     * which is how the Langium service registry picks the grammar to parse with.
     */
    export const CONDITIONAL_EDGE_GRAMMAR = 'conditional_edge';
}
