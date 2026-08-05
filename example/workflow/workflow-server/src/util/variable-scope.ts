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
import { GModelIndex } from '@eclipse-glsp/server';
import { TaskNode } from '../graph-extension';

/** A variable provided by a task node, e.g. `water` with the property `level` provided by the `ChkWt` task */
export interface ProvidedVariable {
    /** Id of the task node providing the variable */
    nodeId: string;
    /** Name of the variable, e.g. `water` */
    name: string;
    /** Name of the property that can be inspected within the variable, e.g. `level` */
    property: string;
}

/**
 * Finds the variable "nearest" to the given start node by walking the edges backwards
 * in breadth-first order, i.e. the variable of the closest upstream task (including the
 * start node itself). This mirrors the per-edge scoping used by the Langium language
 * server: a conditional edge starting at `startId` may reference exactly the variables
 * found by this upstream walk.
 */
export function findNearestUpstreamVariable(index: GModelIndex, startId: string): ProvidedVariable | undefined {
    const visited = new Set<string>();
    const queue = [startId];
    while (queue.length > 0) {
        const nodeId = queue.shift()!;
        if (visited.has(nodeId)) {
            continue;
        }
        visited.add(nodeId);
        const node = index.find(nodeId);
        if (node instanceof TaskNode && node.variable && node.property) {
            return { nodeId: node.id, name: node.variable, property: node.property };
        }
        if (node) {
            index.getIncomingEdges(node).forEach(edge => queue.push(edge.sourceId));
        }
    }
    return undefined;
}
