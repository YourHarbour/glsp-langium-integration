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
import { ApplyLabelEditOperation, Command, GLabel, GModelApplyLabelEditOperationHandler, MaybePromise } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { parseVariableDeclaration, setTaskVariable, TaskNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Extends the default label edit handler so that edits of a task's variable label (a declaration
 * of the form `water:level`, or an empty text to remove the variable) are applied to
 * {@link TaskNode.variable}/{@link TaskNode.property} - the source of the Langium scoping
 * information - keeping the conditions of downstream conditional edges in sync (renaming a
 * variable or its property immediately flags the edges that still reference the old name).
 */
@injectable()
export class VariableAwareApplyLabelEditOperationHandler extends GModelApplyLabelEditOperationHandler {
    override createCommand(operation: ApplyLabelEditOperation): MaybePromise<Command | undefined> {
        const label = this.modelState.index.findByClass(operation.labelId, GLabel);
        const task = label?.parent;
        if (label && label.type === ModelTypes.LABEL_VARIABLE && task instanceof TaskNode) {
            const declaration = parseVariableDeclaration(operation.text);
            if (!declaration && operation.text.trim().length > 0) {
                // rejected by the label edit validator anyway; do not change anything
                return undefined;
            }
            return this.commandOf(() => setTaskVariable(task, declaration?.variable, declaration?.property));
        }
        return super.createCommand(operation);
    }
}
