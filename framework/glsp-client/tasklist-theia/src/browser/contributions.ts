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
// import { GLSPCommandHandler, GLSPContextMenu } from '@eclipse-glsp/theia-integration';
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { ApplicationShell } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';

@injectable()
export class TaskListContribution implements CommandContribution, MenuContribution {
    @inject(ApplicationShell) protected readonly shell: ApplicationShell;

    static HELLO_WORLD_COMMAND = { id: 'glsp-say-hello', label: 'Say hello from GLSP' };
    static ADD_BRANCH_COMMAND = { id: 'glsp-add-branch', label: 'Add Branch' };

    registerCommands(commands: CommandRegistry): void {
        // commands.registerCommand(TaskListContribution.HELLO_WORLD_COMMAND, { execute: () => console.log('Hello world') });
        // commands.registerCommand(
        //     TaskListContribution.ADD_BRANCH_COMMAND,
        //     new GLSPCommandHandler(this.shell, {
        //         actions: context => [runCreateBranchNodeOperation.create(context.selectedElements[0].id)],
        //         isEnabled: context => context.selectedElements.length === 1 && context.selectedElements[0].type === 'action_card_node'
        //     })
        // );
    }

    registerMenus(menus: MenuModelRegistry): void {
        // menus.registerMenuAction(GLSPContextMenu.MENU_PATH.concat('edit'), {
        //     commandId: TaskListContribution.ADD_BRANCH_COMMAND.id,
        //     label: TaskListContribution.ADD_BRANCH_COMMAND.label
        // });
        // menus.registerMenuAction(GLSPContextMenu.MENU_PATH.concat('edit'), {
        //     commandId: TaskListContribution.HELLO_WORLD_COMMAND.id,
        //     label: TaskListContribution.HELLO_WORLD_COMMAND.label
        // });
    }
}
