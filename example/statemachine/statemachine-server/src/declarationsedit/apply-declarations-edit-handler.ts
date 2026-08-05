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
import { DeclarationsNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Is sent from the client (`StatemachineMonacoSubmitService`) to the GLSP server to update
 * the declarations element after its text was edited in the embedded Monaco editor.
 *
 * Alongside the concrete text, the names of the declared events and commands (extracted
 * from the parsed Langium AST) are sent, so the server can persist them with the node:
 * they are the source of the scoping information for the transition labels, which is why
 * an edit here re-validates all transition labels of the diagram.
 */
export interface ApplyDeclarationsEditOperation extends Operation {
    kind: typeof ApplyDeclarationsEditOperation.KIND;

    /** Id of the declarations node that should be updated */
    elementId: string;

    /** The new declarations text */
    text: string;

    /** Names of the declared events */
    events: string[];

    /** Names of the declared commands */
    commands: string[];
}

export namespace ApplyDeclarationsEditOperation {
    export const KIND = 'applyDeclarationsEdit';

    export function is(object: any): object is ApplyDeclarationsEditOperation {
        return Action.hasKind(object, KIND) && hasStringProp(object, 'elementId') && hasStringProp(object, 'text');
    }

    export function create(options: { elementId: string; text: string; events: string[]; commands: string[] }): ApplyDeclarationsEditOperation {
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
 * Applies a declarations edit to the {@link DeclarationsNode}: the declarations text and
 * the declared event and command names are stored on the node and the text of the monaco
 * label is updated, which is the text the embedded Monaco editors are initialized with.
 */
@injectable()
export class ApplyDeclarationsEditHandler extends GModelOperationHandler {
    readonly operationType = ApplyDeclarationsEditOperation.KIND;

    createCommand(operation: ApplyDeclarationsEditOperation): MaybePromise<Command | undefined> {
        const node = getOrThrow(
            this.modelState.index.findByClass(operation.elementId, DeclarationsNode),
            `Cannot find declarations node with id '${operation.elementId}'`
        );
        const newText = operation.text ?? '';
        if (node.declarations === newText && sameNames(node.events, operation.events) && sameNames(node.commands, operation.commands)) {
            return undefined;
        }
        return this.commandOf(() => this.applyDeclarationsEdit(node, newText, operation.events, operation.commands));
    }

    protected applyDeclarationsEdit(node: DeclarationsNode, text: string, events: string[], commands: string[]): void {
        node.declarations = text;
        node.events = events ?? [];
        node.commands = commands ?? [];
        const label = node.children.find(child => child.type === ModelTypes.LABEL_MONACO_DECLARATIONS);
        if (label instanceof GLabel) {
            label.text = text;
        }
    }
}
