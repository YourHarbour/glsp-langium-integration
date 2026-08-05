/********************************************************************************
 * Copyright (c) 2023 EclipseSource and others.
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
import { ContextActionsProvider, EditorContext, LabeledAction, MaybePromise, ModelState, toTypeGuard } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { TaskNode } from '../graph-extension';
import { EditTaskOperation } from './edit-task-operation-handler';

@injectable()
export class TaskEditContextActionProvider implements ContextActionsProvider {
    static readonly DURATION_PREFIX = 'duration:';
    static readonly TYPE_PREFIX = 'type:';
    static readonly TASK_PREFIX = 'task:';
    static readonly VARIABLE_PREFIX = 'variable:';

    readonly contextId = 'task-editor';

    @inject(ModelState)
    protected modelState: ModelState;

    getActions(editorContext: EditorContext): MaybePromise<LabeledAction[]> {
        const text = editorContext.args?.['text'].toString() ?? '';
        const taskNode = this.modelState.index.findParentElement(editorContext.selectedElementIds[0], toTypeGuard(TaskNode));
        if (!taskNode) {
            return [];
        }

        if (text.startsWith(TaskEditContextActionProvider.TYPE_PREFIX)) {
            const taskId = taskNode.id;
            return [
                { label: 'type:automated', actions: [EditTaskOperation.create({ taskId, feature: 'taskType', value: 'automated' })] },
                { label: 'type:manual', actions: [EditTaskOperation.create({ taskId, feature: 'taskType', value: 'manual' })] }
            ];
        }

        if (
            text.startsWith(TaskEditContextActionProvider.DURATION_PREFIX) ||
            text.startsWith(TaskEditContextActionProvider.VARIABLE_PREFIX)
        ) {
            return [];
        }

        const taskType = taskNode.type.substring(TaskEditContextActionProvider.TASK_PREFIX.length);
        const duration = taskNode.duration;
        return [
            <SetAutocompleteValueAction>{ label: 'type:', actions: [], text: `${TaskEditContextActionProvider.TYPE_PREFIX}${taskType}` },
            <SetAutocompleteValueAction>{
                label: 'duration:',
                actions: [],
                text: `${TaskEditContextActionProvider.DURATION_PREFIX}${duration ?? 0}`
            },
            <SetAutocompleteValueAction>{
                label: 'variable:',
                actions: [],
                text: `${TaskEditContextActionProvider.VARIABLE_PREFIX}${
                    taskNode.variable && taskNode.property ? `${taskNode.variable}:${taskNode.property}` : ''
                }`
            }
        ];
    }
}

interface SetAutocompleteValueAction extends LabeledAction {
    text: string;
}
