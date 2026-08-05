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
import { TransitionEdge } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Is sent from the client (`StatemachineMonacoSubmitService`) to the GLSP server to update
 * the label of a transition edge after it was edited in the embedded Monaco editor.
 */
export interface ApplyTransitionEditOperation extends Operation {
    kind: typeof ApplyTransitionEditOperation.KIND;

    /** Id of the transition edge whose label should be updated */
    elementId: string;

    /** The new transition text */
    text: string;

    /** Name of the referenced event, if it could be resolved by Langium */
    eventName?: string;

    /** Names of the referenced commands, if they could be resolved by Langium */
    actionNames?: string[];
}

export namespace ApplyTransitionEditOperation {
    export const KIND = 'applyTransitionEdit';

    export function is(object: any): object is ApplyTransitionEditOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'elementId') && hasStringProp(object, 'text');
    }

    export function create(options: { elementId: string; text: string; eventName?: string; actionNames?: string[] }): ApplyTransitionEditOperation {
        return {
            kind: KIND,
            isOperation: true,
            ...options
        };
    }
}

function sameNames(left?: string[], right?: string[]): boolean {
    return (left ?? []).join(',') === (right ?? []).join(',');
}

/**
 * Applies a transition edit to the {@link TransitionEdge}: the transition text (and the
 * names of the referenced event and commands) are stored on the edge and the text of the
 * monaco label is updated, which is the text the embedded Monaco editors are initialized with.
 */
@injectable()
export class ApplyTransitionEditHandler extends GModelOperationHandler {
    readonly operationType = ApplyTransitionEditOperation.KIND;

    createCommand(operation: ApplyTransitionEditOperation): MaybePromise<Command | undefined> {
        const edge = getOrThrow(
            this.modelState.index.findByClass(operation.elementId, TransitionEdge),
            `Cannot find transition edge with id '${operation.elementId}'`
        );
        const newText = operation.text ?? '';
        if (edge.spec === newText && edge.eventName === operation.eventName && sameNames(edge.actionNames, operation.actionNames)) {
            return undefined;
        }
        return this.commandOf(() => this.applyTransitionEdit(edge, newText, operation.eventName, operation.actionNames));
    }

    protected applyTransitionEdit(edge: TransitionEdge, text: string, eventName?: string, actionNames?: string[]): void {
        edge.spec = text;
        edge.eventName = eventName;
        edge.actionNames = actionNames;
        const label = edge.children.find(child => child.type === ModelTypes.LABEL_MONACO);
        if (label instanceof GLabel) {
            label.text = text;
        }
    }
}
