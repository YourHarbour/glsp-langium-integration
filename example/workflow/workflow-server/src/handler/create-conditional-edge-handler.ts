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
import { ConditionalEdge } from '../graph-extension';
import { ModelTypes } from '../util/model-types';
import { findNearestUpstreamVariable } from '../util/variable-scope';

/**
 * Creates a new conditional edge. The initial condition references the variable of the
 * nearest upstream task of the new edge's source (if there is one), so that the default
 * text is in scope and valid right away. If no upstream task provides a variable, the
 * placeholder condition is immediately flagged by the Langium validation — demonstrating
 * that conditions can only use variables provided upstream.
 */
@injectable()
export class CreateConditionalEdgeHandler extends GModelCreateEdgeOperationHandler {
    elementTypeIds = [ModelTypes.CONDITIONAL_EDGE];
    label = 'Conditional edge';

    createEdge(source: GModelElement, target: GModelElement): GEdge | undefined {
        const variable = findNearestUpstreamVariable(this.modelState.index, source.id);
        return ConditionalEdge.builder()
            .sourceId(source.id)
            .targetId(target.id)
            .condition(variable ? `if ${variable.name}.${variable.property} > 0` : 'if input.value > 0')
            .variableId(variable?.nodeId)
            .build();
    }
}
