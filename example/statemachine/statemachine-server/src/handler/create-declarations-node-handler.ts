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
import { GhostElement, Point } from '@eclipse-glsp/protocol';
import { CreateNodeOperation, GModelCreateNodeOperationHandler, GNode, ModelState } from '@eclipse-glsp/server';
import { inject, injectable } from 'inversify';
import { DeclarationsNode, DeclarationsNodeBuilder } from '../graph-extension';
import { ModelTypes } from '../util/model-types';
import { GridSnapper } from './grid-snapper';

const DEFAULT_DECLARATIONS_TEXT = 'events\n    brewCoffee\ncommands\n    startPump';
const DEFAULT_EVENTS = ['brewCoffee'];
const DEFAULT_COMMANDS = ['startPump'];

/**
 * Creates a new declarations element. The initial text declares one event and one command,
 * so the multi-line editor demonstrates the declaration language right away; the declared
 * names immediately become referable from the transition labels.
 */
@injectable()
export class CreateDeclarationsNodeHandler extends GModelCreateNodeOperationHandler {
    elementTypeIds = [ModelTypes.DECLARATIONS_NODE];
    label = 'Declarations';

    @inject(ModelState)
    protected override modelState: ModelState;

    override getLocation(operation: CreateNodeOperation): Point | undefined {
        return GridSnapper.snap(operation.location);
    }

    createNode(operation: CreateNodeOperation, relativeLocation?: Point): GNode | undefined {
        return this.builder(relativeLocation).build();
    }

    protected builder(point: Point = Point.ORIGIN): DeclarationsNodeBuilder {
        return DeclarationsNode.builder()
            .position(point ?? Point.ORIGIN)
            .declarations(DEFAULT_DECLARATIONS_TEXT, [...DEFAULT_EVENTS], [...DEFAULT_COMMANDS]);
    }

    override createTriggerGhostElement(elementTypeId: string): GhostElement | undefined {
        return { template: this.serializer.createSchema(this.builder(undefined).build()), dynamic: true };
    }
}
