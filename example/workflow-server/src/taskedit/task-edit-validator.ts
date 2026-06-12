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
import { ContextEditValidator, RequestEditValidationAction, ValidationStatus } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { parseVariableDeclaration } from '../graph-extension';
import { TaskEditContextActionProvider } from './task-edit-context-provider';

@injectable()
export class TaskEditValidator implements ContextEditValidator {
    readonly contextId = 'task-editor';

    validate(action: RequestEditValidationAction): ValidationStatus {
        const text = action.text;
        if (text.startsWith(TaskEditContextActionProvider.DURATION_PREFIX)) {
            const durationString = text.substring(TaskEditContextActionProvider.DURATION_PREFIX.length);
            const duration = Number.parseInt(durationString, 10);
            if (Number.isNaN(duration)) {
                return { severity: ValidationStatus.Severity.ERROR, message: `'${durationString}' is not a valid number.` };
            } else if (duration < 0 || duration > 100) {
                return { severity: ValidationStatus.Severity.WARNING, message: `'${durationString}' should be between 0 and 100` };
            }
        } else if (text.startsWith(TaskEditContextActionProvider.TYPE_PREFIX)) {
            const typeString = text.substring(TaskEditContextActionProvider.TYPE_PREFIX.length);
            if (typeString !== 'automated' && typeString !== 'manual') {
                return {
                    severity: ValidationStatus.Severity.ERROR,
                    message: `'Type of task can only be manual or automatic. You entered '${typeString}'.`
                };
            }
        } else if (text.startsWith(TaskEditContextActionProvider.VARIABLE_PREFIX)) {
            const value = text.substring(TaskEditContextActionProvider.VARIABLE_PREFIX.length).trim();
            // an empty declaration removes the variable from the task
            if (value.length > 0) {
                const declaration = parseVariableDeclaration(value);
                if (!declaration) {
                    return {
                        severity: ValidationStatus.Severity.ERROR,
                        message: `Variable declarations have the form '<variable>:<property>' (e.g. 'water:level'). You entered '${value}'.`
                    };
                }
                if (declaration.variable === 'if' || declaration.property === 'if') {
                    return {
                        severity: ValidationStatus.Severity.ERROR,
                        message: `'if' is a keyword of the condition language and cannot be used in a variable declaration.`
                    };
                }
            }
        }
        return ValidationStatus.NONE;
    }
}
