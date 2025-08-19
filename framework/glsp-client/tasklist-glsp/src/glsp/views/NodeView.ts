/********************************************************************************
 * Copyright (c) 2024 Bofan Zhang.
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import {
    GModelElement,
    RectangularNode,
    boundsFeature,
    connectableFeature,
    deletableFeature,
    fadeFeature,
    hoverFeedbackFeature,
    layoutContainerFeature,
    moveFeature,
    nameFeature,
    popupFeature,
    selectFeature,
    withEditLabelFeature
} from '@eclipse-glsp/client';

export interface Expression {
    tokens: (TextToken | NodeToken)[];
}

export interface Token {}
export interface TextToken extends Token {
    text: string;
}
export interface NodeToken extends Token {
    node: ReferableNode;
}

export interface ReferableNode {
    id: string;
    text: string;
}

export class ActionNode extends RectangularNode {
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
    reference?: string;
    args: { expression?: Expression };
}

export class ActionCardConditionNode extends RectangularNode {
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
    reference?: string;
}

export function isActionCardConditionNode(element: GModelElement): element is ActionCardConditionNode {
    return element instanceof ActionCardConditionNode;
}

export class BranchNode extends RectangularNode {
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
    reference?: string;
    args: { expression?: Expression };
}

export function isBranchNode(element: GModelElement): element is BranchNode {
    return element instanceof BranchNode;
}

export class AdmissionActionNode extends RectangularNode {
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
    reference?: string;
}

export class DischargeActionNode extends RectangularNode {
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
    reference?: string;
}

export class TestNode extends RectangularNode {
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
    reference?: string;
}


export class DiseaseNode extends RectangularNode {
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
    reference?: string;
}
