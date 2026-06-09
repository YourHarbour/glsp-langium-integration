/********************************************************************************
 * Copyright (c) 2022-2023 STMicroelectronics and others.
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
import { InventoryNode, TaskNode } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/** Item names are referenced by the conditional edge grammar via its `ID` terminal, so they must be valid identifiers */
const INVENTORY_NAME_PATTERN = /^[_a-zA-Z][\w_]*$/;
/** Keywords of the conditional edge grammar that cannot be used as item names */
const INVENTORY_NAME_KEYWORDS = ['if', 'amount'];

@injectable()
export class WorkflowLabelEditValidator implements LabelEditValidator {
    @inject(ModelState)
    protected modelState: ModelState;

    validate(label: string, element: GModelElement): ValidationStatus {
        if (element.type === ModelTypes.LABEL_INVENTORY_NAME) {
            return this.validateInventoryName(label, element);
        }
        if (element.type === ModelTypes.LABEL_INVENTORY_AMOUNT) {
            return this.validateInventoryAmount(label);
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

    protected validateInventoryName(label: string, element: GModelElement): ValidationStatus {
        const name = label.trim();
        if (!INVENTORY_NAME_PATTERN.test(name)) {
            return {
                severity: ValidationStatus.Severity.ERROR,
                message: 'Item name must be an identifier (letters, digits and _, not starting with a digit)'
            };
        }
        if (INVENTORY_NAME_KEYWORDS.includes(name)) {
            return {
                severity: ValidationStatus.Severity.ERROR,
                message: `'${name}' is a keyword of the condition language and cannot be used as item name`
            };
        }
        const node = element.parent;
        if (node instanceof InventoryNode) {
            const hasDuplicate = node.items.some(item => item.name === name && `${item.id}_name` !== element.id);
            if (hasDuplicate) {
                return { severity: ValidationStatus.Severity.ERROR, message: 'Item name must be unique within the inventory' };
            }
        }
        return { severity: ValidationStatus.Severity.OK };
    }

    protected validateInventoryAmount(label: string): ValidationStatus {
        if (!/^\d+$/.test(label.trim())) {
            return { severity: ValidationStatus.Severity.ERROR, message: 'Amount must be a non-negative integer' };
        }
        return { severity: ValidationStatus.Severity.OK };
    }
}
