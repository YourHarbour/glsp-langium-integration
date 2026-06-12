/**
 * Type constants for the Langium-backed model elements of the workflow example.
 */
export namespace WorkflowLangiumTypes {
    /** An edge guarded by a condition over the upstream task variables, e.g. `if water >= 50` */
    export const CONDITIONAL_EDGE = 'edge:conditional';
    /** A label that is rendered as an embedded Monaco editor */
    export const MONACO_LABEL = 'label:monaco';
    /** Editable label showing the variable a task provides to its downstream conditional edges */
    export const LABEL_VARIABLE = 'label:variable';
    /**
     * The grammar identifier of the conditional edge language.
     *
     * It is used as the file extension of the in-memory Langium documents
     * (`.conditional_edge`, see `fileExtensions` in `langium-config.json`),
     * which is how the Langium service registry picks the grammar to parse with.
     */
    export const CONDITIONAL_EDGE_GRAMMAR = 'conditional_edge';
}
