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
    EditableLabel,
    GChildElement,
    GEdge,
    GModelElement,
    GParentElement,
    Nameable,
    RectangularNode,
    WithEditableLabel,
    boundsFeature,
    connectableFeature,
    deletableFeature,
    fadeFeature,
    hoverFeedbackFeature,
    isEditableLabel,
    layoutContainerFeature,
    moveFeature,
    nameFeature,
    popupFeature,
    selectFeature,
    withEditLabelFeature
} from '@eclipse-glsp/client';

/**
 * Finds the editable heading label of a node, also looking into nested compartments
 * (the state name label lives inside the `comp:header` compartment of the node).
 */
function findEditableHeading(element: GParentElement): (GChildElement & EditableLabel) | undefined {
    for (const child of element.children) {
        if (child.type === 'label:heading' && isEditableLabel(child)) {
            return child;
        }
        const nested = findEditableHeading(child);
        if (nested) {
            return nested;
        }
    }
    return undefined;
}

export class StateNode extends RectangularNode implements Nameable, WithEditableLabel {
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

    /** Whether this is the initial state of the machine (rendered with an accented border) */
    initial?: boolean;

    get editableLabel(): (GChildElement & EditableLabel) | undefined {
        return findEditableHeading(this);
    }

    get name(): string {
        const labelText = this.editableLabel?.text;
        return labelText ? labelText : '<unknown>';
    }
}

export function isStateNode(element: GModelElement): element is StateNode {
    return element instanceof StateNode || false;
}

/**
 * The declarations element of the diagram: carries the textual event and command
 * declarations in a multi-line embedded Monaco editor (the `label:monaco-declarations`
 * child). The declared names are persisted alongside the concrete text and are the source
 * of the scoping information for the transition labels.
 */
export class DeclarationsNode extends RectangularNode {
    static override readonly DEFAULT_FEATURES = [
        deletableFeature,
        selectFeature,
        boundsFeature,
        moveFeature,
        layoutContainerFeature,
        fadeFeature,
        hoverFeedbackFeature
    ];

    /** The concrete declarations text, e.g. `events\n  brewCoffee\ncommands\n  startPump` */
    declarations?: string;
    /** Names of the declared events */
    events?: string[];
    /** Names of the declared commands */
    commands?: string[];
}

/**
 * A transition between two states, labelled `event / command, ...`. The label is edited
 * via an embedded Monaco editor (the `label:monaco` child of the edge) backed by Langium;
 * it may only reference events and commands declared in the declarations element.
 */
export class TransitionEdge extends GEdge {
    spec?: string;
    /** Name of the referenced event, if resolved */
    eventName?: string;
    /** Names of the referenced commands, if resolved */
    actionNames?: string[];
}
