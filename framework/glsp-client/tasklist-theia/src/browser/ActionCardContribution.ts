/********************************************************************************
 * Copyright (c) 2024 EclipseSource and others.
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

import { SetUIExtensionVisibilityAction } from '@eclipse-glsp/client';
import { GLSPCommandHandler, GLSPContextMenu } from '@eclipse-glsp/theia-integration';
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { ApplicationShell } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
// eslint-disable-next-line max-len
import { ActionCardConditionNodeEditor, EditBranchEditor, isActionCardConditionNode, isBranchNode, TextEditorUIExtension } from 'tasklist-glsp';

export namespace ActionCardNodeEditCommands {
    export const EDIT_CONDITIONAL_STATEMENT = 'glsp-edit-action-card-conditional-statement';
    export const EDIT_BRANCH = 'glsp-edit-branch';
    export const EDIT_TEXT = 'glsp-edit-text';
}


@injectable()
export class ActionCardEditCommandContribution implements CommandContribution {
    @inject(ApplicationShell) protected readonly shell: ApplicationShell;
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(
            { id: ActionCardNodeEditCommands.EDIT_CONDITIONAL_STATEMENT, label: 'Edit Conditional Statement' },
            new GLSPCommandHandler(this.shell, {
                actions: context => [
                    SetUIExtensionVisibilityAction.create({
                        extensionId: ActionCardConditionNodeEditor.ID,
                        visible: true,
                        contextElementsId: [context.selectedElements[0].id]
                    })
                ],
                isEnabled: context => !context.isReadonly && context.selectedElements.filter(isActionCardConditionNode).length === 1
            })
        );
    }
}

@injectable()
export class ActionCardEditMenuContribution implements MenuContribution {
    static readonly EDIT = GLSPContextMenu.MENU_PATH.concat('edit');
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(ActionCardEditMenuContribution.EDIT,
            { commandId: ActionCardNodeEditCommands.EDIT_CONDITIONAL_STATEMENT }
        );
    }
}

@injectable()
export class BranchEditCommandContribution implements CommandContribution {
    @inject(ApplicationShell) protected readonly shell: ApplicationShell;
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(
            { id: ActionCardNodeEditCommands.EDIT_BRANCH, label: 'Edit Branch' },
            new GLSPCommandHandler(this.shell, {
                actions: context => [
                    SetUIExtensionVisibilityAction.create({
                        extensionId: EditBranchEditor.ID,
                        visible: true,
                        contextElementsId: [context.selectedElements[0].id]
                    })
                ],
                isEnabled: context => !context.isReadonly && context.selectedElements.filter(isBranchNode).length === 1
            })
        );
    }
}

@injectable()
export class BranchEditMenuContribution implements MenuContribution {
    static readonly EDIT = GLSPContextMenu.MENU_PATH.concat('edit');
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(BranchEditMenuContribution.EDIT,
            { commandId: ActionCardNodeEditCommands.EDIT_BRANCH }
        );
    }
}

@injectable()
export class TextEditCommandContribution implements CommandContribution {
    @inject(ApplicationShell) protected readonly shell: ApplicationShell;
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(
            { id: ActionCardNodeEditCommands.EDIT_TEXT, label: 'Edit Text' },
            new GLSPCommandHandler(this.shell, {
                actions: context => [
                    SetUIExtensionVisibilityAction.create({
                        extensionId: TextEditorUIExtension.ID,
                        visible: true,
                        contextElementsId: [context.selectedElements[0].id]
                    })
                ],
                isEnabled: context => !context.isReadonly
            })
        );
    }
}

@injectable()
export class TextEditMenuContribution implements MenuContribution {
    static readonly EDIT = GLSPContextMenu.MENU_PATH.concat('edit');
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(TextEditMenuContribution.EDIT,
            { commandId: ActionCardNodeEditCommands.EDIT_TEXT }
        );
    }
}
