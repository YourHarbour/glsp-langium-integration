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
import { GEdge, GModelCreateEdgeOperationHandler, GModelElement } from '@eclipse-glsp/server';
import { injectable } from 'inversify';
import { DeclarationsNode, TransitionEdge } from '../graph-extension';
import { ModelTypes } from '../util/model-types';

/**
 * Creates a new transition edge. The initial label references the first declared event
 * (if there is one), so that the default text is in scope and valid right away. If no
 * event is declared yet, the placeholder label is immediately flagged by the Langium
 * validation — demonstrating that transitions can only reference declared events.
 */
@injectable()
export class CreateTransitionEdgeHandler extends GModelCreateEdgeOperationHandler {
    elementTypeIds = [ModelTypes.TRANSITION_EDGE];
    label = 'Transition';

    createEdge(source: GModelElement, target: GModelElement): GEdge | undefined {
        const event = this.findFirstDeclaredEvent();
        return TransitionEdge.builder()
            .sourceId(source.id)
            .targetId(target.id)
            .spec(event ?? 'event')
            .eventName(event)
            .build();
    }

    protected findFirstDeclaredEvent(): string | undefined {
        return this.modelState.index.getAllByClass(DeclarationsNode).flatMap(node => node.events ?? [])[0];
    }
}
