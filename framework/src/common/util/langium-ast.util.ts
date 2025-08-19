import { AstNodeDescription, LangiumDocument } from 'langium';

/**
 * This helper function creates an array of `AstNodeDescription` objects that represent the external nodes.
 * However, they are virtual because no corresponding real `AstNode` exists originally.
 *
 * @param document The document whose URI to reference
 * @param type The type of the grammar element we want to create descriptions for
 * @param externalNodePairs id/name pairs, where the id represents the external node id and the name
 * its label that should be available in the scoping
 * @returns A list of `AstNodeDescription` objects
 */
export function createAstNodeDescriptions(
    document: LangiumDocument,
    type: string,
    externalNodePairs: [id: string, name: string][] | string[][]
): AstNodeDescription[] {
    return externalNodePairs.map(([id, value]) => ({
        name: value,
        type,
        documentUri: document.uri,
        path: id
    }));
}
