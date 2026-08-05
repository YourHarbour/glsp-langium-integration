/********************************************************************************
 * Copyright (c) 2022-2026 STMicroelectronics and others.
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
import { EdgeTypeHint, ShapeTypeHint } from '@eclipse-glsp/protocol';
import { DiagramConfiguration, GCompartment, GLabel, GModelElementConstructor, ServerLayoutKind, getDefaultMapping } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { DeclarationsNode, StateNode, TransitionEdge } from './graph-extension';
import { ModelTypes as types } from './util/model-types';

@injectable()
export class StatemachineDiagramConfiguration implements DiagramConfiguration {
    get typeMapping(): Map<string, GModelElementConstructor> {
        const mapping = getDefaultMapping();
        mapping.set(types.LABEL_HEADING, GLabel);
        mapping.set(types.COMP_HEADER, GCompartment);
        mapping.set(types.STATE_NODE, StateNode);
        mapping.set(types.DECLARATIONS_NODE, DeclarationsNode);
        mapping.set(types.TRANSITION_EDGE, TransitionEdge);
        mapping.set(types.LABEL_MONACO, GLabel);
        mapping.set(types.LABEL_MONACO_DECLARATIONS, GLabel);
        return mapping;
    }

    get shapeTypeHints(): ShapeTypeHint[] {
        return [createDefaultShapeTypeHint(types.STATE_NODE), createDefaultShapeTypeHint(types.DECLARATIONS_NODE)];
    }

    get edgeTypeHints(): EdgeTypeHint[] {
        return [
            createDefaultEdgeTypeHint({
                elementTypeId: types.TRANSITION_EDGE,
                sourceElementTypeIds: [types.STATE_NODE],
                targetElementTypeIds: [types.STATE_NODE]
            })
        ];
    }

    layoutKind = ServerLayoutKind.MANUAL;
    needsClientLayout = true;
    animatedUpdate = true;
}

export function createDefaultShapeTypeHint(template: { elementTypeId: string } & Partial<ShapeTypeHint>): ShapeTypeHint;
export function createDefaultShapeTypeHint(elementId: string): ShapeTypeHint;
export function createDefaultShapeTypeHint(
    elementIdOrTemplate: string | ({ elementTypeId: string } & Partial<ShapeTypeHint>)
): ShapeTypeHint {
    const template = typeof elementIdOrTemplate === 'string' ? { elementTypeId: elementIdOrTemplate } : elementIdOrTemplate;
    return { repositionable: true, deletable: true, resizable: true, reparentable: false, ...template };
}

export function createDefaultEdgeTypeHint(template: { elementTypeId: string } & Partial<EdgeTypeHint>): EdgeTypeHint;
export function createDefaultEdgeTypeHint(elementId: string): EdgeTypeHint;
export function createDefaultEdgeTypeHint(elementIdOrTemplate: string | ({ elementTypeId: string } & Partial<EdgeTypeHint>)): EdgeTypeHint {
    const template = typeof elementIdOrTemplate === 'string' ? { elementTypeId: elementIdOrTemplate } : elementIdOrTemplate;
    return {
        repositionable: true,
        deletable: true,
        routable: true,
        sourceElementTypeIds: [types.STATE_NODE],
        targetElementTypeIds: [types.STATE_NODE],
        ...template
    };
}
