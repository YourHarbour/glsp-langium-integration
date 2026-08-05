/**
 * Type constants for the Langium-backed model elements of the statemachine example.
 */
export namespace StatemachineLangiumTypes {
    /** A state of the machine, shown as a rounded rectangle with an editable name */
    export const STATE_NODE = 'node:state';
    /** The declarations element: a node carrying the textual event and command declarations */
    export const DECLARATIONS_NODE = 'node:declarations';
    /** A transition between two states, labelled `event / command, ...` */
    export const TRANSITION_EDGE = 'edge:transition';
    /** The label of a transition edge, rendered as an embedded Monaco editor */
    export const MONACO_LABEL = 'label:monaco';
    /** The multi-line declarations label, rendered as an embedded Monaco editor */
    export const DECLARATIONS_LABEL = 'label:monaco-declarations';
    /**
     * The grammar identifiers of the two sub-languages.
     *
     * They are used as the file extensions of the in-memory Langium documents
     * (`.sm_transition` / `.sm_declarations`, see `fileExtensions` in `langium-config.json`),
     * which is how the Langium service registry picks the grammar to parse with.
     */
    export const TRANSITION_GRAMMAR = 'sm_transition';
    export const DECLARATIONS_GRAMMAR = 'sm_declarations';
}
