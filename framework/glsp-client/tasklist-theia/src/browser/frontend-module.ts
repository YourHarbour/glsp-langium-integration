/********************************************************************************
 * Copyright (c) 2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied:
 * -- GNU General Public License, version 2 with the GNU Classpath Exception
 * which is available at https://www.gnu.org/software/classpath/license.html
 * -- MIT License which is available at https://opensource.org/license/mit.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR MIT
 ********************************************************************************/
import { ContainerContext, DiagramConfiguration, GLSPTheiaFrontendModule } from '@eclipse-glsp/theia-integration';
import { CommandContribution, MenuContribution } from '@theia/core';
import { TaskListLanguage } from '../common/tasklist-language';
// import { TaskListContribution } from './contributions';
import { TaskListDiagramConfiguration } from './diagram/tasklist-diagram-configuration';
// eslint-disable-next-line max-len
import { ActionCardEditCommandContribution, ActionCardEditMenuContribution, BranchEditCommandContribution, BranchEditMenuContribution, TextEditCommandContribution, TextEditMenuContribution  } from './ActionCardContribution';

export class TaskListTheiaFrontendModule extends GLSPTheiaFrontendModule {
    readonly diagramLanguage = TaskListLanguage;

    bindDiagramConfiguration(context: ContainerContext): void {
        context.bind(DiagramConfiguration).to(TaskListDiagramConfiguration);
    }

    override configure(context: ContainerContext): void {
        // context.bind(TaskListContribution).toSelf();
        // context.bind(CommandContribution).toService(TaskListContribution);
        // context.bind(MenuContribution).to(TaskListContribution);
        context.bind(CommandContribution).to(ActionCardEditCommandContribution);
        context.bind(MenuContribution).to(ActionCardEditMenuContribution);
        context.bind(CommandContribution).to(BranchEditCommandContribution);
        context.bind(MenuContribution).to(BranchEditMenuContribution);
        context.bind(CommandContribution).to(TextEditCommandContribution);
        context.bind(MenuContribution).to(TextEditMenuContribution);
    }
}

export default new TaskListTheiaFrontendModule();
