import type { GModelElementSchema, GModelRootSchema } from '@eclipse-glsp/client';
import type { ProvidedVariable, WorkflowScopingInformation } from '../langium/ls/workflow-dsl-references.js';
import { WorkflowLangiumTypes } from './workflow-langium-types.js';

/**
 * Computes the variables visible to each conditional edge of the given model:
 * the id of every conditional edge is mapped to the variables provided by the
 * nodes *upstream* of the edge (provider node id -> variable name + property).
 *
 * A node provides a variable by carrying non-empty `variable`/`property` properties (see the
 * `TaskNode` of the workflow example, e.g. `ChkWt` provides `water` with the property `level`,
 * declared as `water:level` on the node). The variables visible to a conditional edge are those
 * of all nodes from which the edge's source node is reachable - including the source node
 * itself - following any kind of edge.
 */
export function computeConditionalEdgeScopes(model: GModelRootSchema): WorkflowScopingInformation['Variable'] {
    /** node id -> variable it provides */
    const providers = new Map<string, ProvidedVariable>();
    /** node id -> ids of the source nodes of its incoming edges */
    const incoming = new Map<string, string[]>();
    const conditionalEdges: { id: string; sourceId: string }[] = [];

    const visit = (element: GModelElementSchema): void => {
        const { sourceId, targetId, variable, property } = element as {
            sourceId?: unknown;
            targetId?: unknown;
            variable?: unknown;
            property?: unknown;
        };
        if (typeof sourceId === 'string' && typeof targetId === 'string') {
            incoming.set(targetId, [...(incoming.get(targetId) ?? []), sourceId]);
            if (element.type === WorkflowLangiumTypes.CONDITIONAL_EDGE) {
                conditionalEdges.push({ id: element.id, sourceId });
            }
        } else if (typeof variable === 'string' && variable.length > 0 && typeof property === 'string' && property.length > 0) {
            providers.set(element.id, { name: variable, property });
        }
        element.children?.forEach(visit);
    };
    model.children?.forEach(visit);

    const scopes: WorkflowScopingInformation['Variable'] = {};
    conditionalEdges.forEach(edge => (scopes[edge.id] = collectUpstreamVariables(edge.sourceId, incoming, providers)));
    return scopes;
}

/** Collects the variables of all nodes from which `startId` is reachable, including `startId` itself */
function collectUpstreamVariables(
    startId: string,
    incoming: Map<string, string[]>,
    providers: Map<string, ProvidedVariable>
): Record<string, ProvidedVariable> {
    const variables: Record<string, ProvidedVariable> = {};
    const visited = new Set<string>();
    const queue = [startId];
    while (queue.length > 0) {
        const nodeId = queue.shift()!;
        if (visited.has(nodeId)) {
            continue;
        }
        visited.add(nodeId);
        const variable = providers.get(nodeId);
        if (variable) {
            variables[nodeId] = variable;
        }
        queue.push(...(incoming.get(nodeId) ?? []));
    }
    return variables;
}
