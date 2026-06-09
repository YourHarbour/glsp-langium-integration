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
import { Action, Command, GLabel, GModelOperationHandler, getOrThrow, hasStringProp, MaybePromise, Operation } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { ConditionalEdge } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Is sent from the client (`WorkflowMonacoSubmitService`) to the GLSP server to update
 * the condition of a conditional edge after it was edited in the embedded Monaco editor.
 */
export interface ApplyConditionEditOperation extends Operation {
    kind: typeof ApplyConditionEditOperation.KIND;

    /** Id of the conditional edge whose condition should be updated */
    elementId: string;

    /** The new condition text */
    text: string;

    /** Id of the inventory item referenced by the condition, if it could be resolved by Langium */
    itemId?: string;
}

export namespace ApplyConditionEditOperation {
    export const KIND = 'applyConditionEdit';

    export function is(object: any): object is ApplyConditionEditOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'elementId') && hasStringProp(object, 'text');
    }

    export function create(options: { elementId: string; text: string; itemId?: string }): ApplyConditionEditOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}

/**
 * Applies a condition edit to the {@link ConditionalEdge}: the condition text (and the id of
 * the referenced inventory item) are stored on the edge and the text of the monaco label is
 * updated, which is the text the embedded Monaco editors are initialized with.
 */
@injectable()
export class ApplyConditionEditHandler extends GModelOperationHandler {
    readonly operationType = ApplyConditionEditOperation.KIND;

    createCommand(operation: ApplyConditionEditOperation): MaybePromise<Command | undefined> {
        const edge = getOrThrow(
            this.modelState.index.findByClass(operation.elementId, ConditionalEdge),
            `Cannot find conditional edge with id '${operation.elementId}'`
        );
        const newText = operation.text ?? '';
        if (edge.condition === newText && edge.itemId === operation.itemId) {
            return undefined;
        }
        return this.commandOf(() => this.applyConditionEdit(edge, newText, operation.itemId));
    }

    protected applyConditionEdit(edge: ConditionalEdge, text: string, itemId?: string): void {
        edge.condition = text;
        edge.itemId = itemId;
        const label = edge.children.find(child => child.type === ModelTypes.LABEL_MONACO);
        if (label instanceof GLabel) {
            label.text = text;
        }
    }
}
