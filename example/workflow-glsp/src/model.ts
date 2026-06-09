/********************************************************************************
 * Copyright (c) 2020-2026 EclipseSource and others.
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
    DiamondNode,
    EditableLabel,
    GChildElement,
    GEdge,
    GModelElement,
    GShapeElement,
    LayoutContainer,
    Nameable,
    RectangularNode,
    ResizableModelElement,
    WithEditableLabel,
    boundsFeature,
    connectableFeature,
    deletableFeature,
    fadeFeature,
    hoverFeedbackFeature,
    isEditableLabel,
    layoutContainerFeature,
    layoutableChildFeature,
    moveFeature,
    nameFeature,
    popupFeature,
    selectFeature,
    withEditLabelFeature
} from '@eclipse-glsp/client';

export class TaskNode extends RectangularNode implements Nameable, WithEditableLabel {
    static override readonly DEFAULT_FEATURES = [
        connectableFeature,
        deletableFeature,
        selectFeature,
        boundsFeature,
        moveFeature,
        layoutContainerFeature,
        fadeFeature,
        hoverFeedbackFeature,
        popupFeature,
        nameFeature,
        withEditLabelFeature
    ];
    duration?: number;
    taskType?: string;
    reference?: string;

    get editableLabel(): (GChildElement & EditableLabel) | undefined {
        const label = this.children.find(element => element.type === 'label:heading');
        if (label && isEditableLabel(label)) {
            return label;
        }
        return undefined;
    }

    get name(): string {
        const labelText = this.editableLabel?.text;
        return labelText ? labelText : '<unknown>';
    }
}

export function isTaskNode(element: GModelElement): element is TaskNode {
    return element instanceof TaskNode || false;
}

export class WeightedEdge extends GEdge {
    probability?: string;
}

export class ControlNode extends DiamondNode implements ResizableModelElement {
    nodeType: string = ActivityNode.Type.UNDEFINED;
    override size = {
        width: 32,
        height: 32
    };
    override strokeWidth = 1;
}

export class BranchingNode extends ControlNode {}

export class SynchronizationNode extends ControlNode {}

export namespace ActivityNode {
    export namespace Type {
        export const INITIAL = 'initialNode';
        export const FINAL = 'finalNode';
        export const DECISION = 'decisionNode';
        export const MERGE = 'mergeNode';
        export const JOIN = 'joinNode';
        export const FORK = 'forkNode';
        export const UNDEFINED = 'undefined';
    }
}

export class Icon extends GShapeElement implements LayoutContainer {
    static readonly DEFAULT_FEATURES = [boundsFeature, layoutContainerFeature, layoutableChildFeature, fadeFeature];

    layout: string;
    override layoutOptions?: { [key: string]: string | number | boolean };
    override size = {
        width: 32,
        height: 32
    };
}

export class CategoryNode extends RectangularNode implements Nameable, WithEditableLabel {
    static override readonly DEFAULT_FEATURES = [
        deletableFeature,
        selectFeature,
        boundsFeature,
        moveFeature,
        layoutContainerFeature,
        fadeFeature,
        hoverFeedbackFeature,
        popupFeature,
        nameFeature,
        withEditLabelFeature
    ];

    name = '';

    get editableLabel(): (GChildElement & EditableLabel) | undefined {
        const label = this.children.find(element => element.type === 'label:heading');
        if (label && isEditableLabel(label)) {
            return label;
        }
        return undefined;
    }
}

/** A single item of an {@link InventoryNode}, e.g. `Steel` with an amount of `120` */
export interface InventoryItem {
    id: string;
    name: string;
    amount: number;
}

/**
 * A node holding the available inventory items. It is rendered as a two-column table
 * (item name and amount) by the `InventoryNodeView`. Its items can be referenced by
 * the conditions of {@link ConditionalEdge}s.
 */
export class InventoryNode extends RectangularNode {
    static override readonly DEFAULT_FEATURES = [
        deletableFeature,
        selectFeature,
        boundsFeature,
        moveFeature,
        layoutContainerFeature,
        fadeFeature,
        hoverFeedbackFeature,
        popupFeature
    ];

    items: InventoryItem[] = [];
}

export function isInventoryNode(element: GModelElement): element is InventoryNode {
    return element instanceof InventoryNode;
}

/**
 * An edge that is only taken if its condition over the inventory items holds,
 * e.g. `if Steel.amount > 100`. The condition is edited via an embedded Monaco
 * editor (the `label:monaco` child of the edge) backed by Langium.
 */
export class ConditionalEdge extends GEdge {
    condition?: string;
    /** Id of the inventory item referenced by the condition, if resolved */
    itemId?: string;
}

export function isConditionalEdge(element: GModelElement): element is ConditionalEdge {
    return element instanceof ConditionalEdge;
}
