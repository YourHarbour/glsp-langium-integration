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
import { GModelElement, LabelEditValidator, ModelState, ValidationStatus } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { parseVariableDeclaration, TaskNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/** Keywords of the conditional edge grammar that cannot be used as variable or property names */
const VARIABLE_NAME_KEYWORDS = ['if'];

@injectable()
export class WorkflowLabelEditValidator implements LabelEditValidator {
    @inject(ModelState)
    protected modelState: ModelState;

    validate(label: string, element: GModelElement): ValidationStatus {
        if (element.type === ModelTypes.LABEL_VARIABLE) {
            return this.validateVariableName(label, element);
        }
        if (label.length < 1) {
            return { severity: ValidationStatus.Severity.ERROR, message: 'Name must not be empty' };
        }
        const taskNodes = this.modelState.index.getAllByClass<TaskNode>(TaskNode);
        const hasDuplicate = taskNodes
            .filter(e => !(e.id === element.id))
            .map(task => task.name)
            .some(name => name === label);
        if (hasDuplicate) {
            return { severity: ValidationStatus.Severity.WARNING, message: 'Name should be unique' };
        }
        return { severity: ValidationStatus.Severity.OK };
    }

    protected validateVariableName(label: string, element: GModelElement): ValidationStatus {
        const text = label.trim();
        if (text.length === 0) {
            // an empty declaration removes the variable from the task
            return { severity: ValidationStatus.Severity.OK };
        }
        const declaration = parseVariableDeclaration(text);
        if (!declaration) {
            return {
                severity: ValidationStatus.Severity.ERROR,
                message: "Variable declarations have the form '<variable>:<property>' (e.g. 'water:level'), both valid identifiers"
            };
        }
        const keyword = [declaration.variable, declaration.property].find(name => VARIABLE_NAME_KEYWORDS.includes(name));
        if (keyword) {
            return {
                severity: ValidationStatus.Severity.ERROR,
                message: `'${keyword}' is a keyword of the condition language and cannot be used in a variable declaration`
            };
        }
        const hasDuplicate = this.modelState.index
            .getAllByClass<TaskNode>(TaskNode)
            .some(task => task.variable === declaration.variable && task.id !== element.parent?.id);
        if (hasDuplicate) {
            return { severity: ValidationStatus.Severity.WARNING, message: 'Another task already provides a variable with this name' };
        }
        return { severity: ValidationStatus.Severity.OK };
    }
}
