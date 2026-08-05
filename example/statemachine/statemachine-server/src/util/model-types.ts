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
export namespace ModelTypes {
    export const LABEL_HEADING = 'label:heading';
    export const COMP_HEADER = 'comp:header';
    /** A state of the machine, shown as a rounded rectangle with an editable name */
    export const STATE_NODE = 'node:state';
    /** The declarations element: a node carrying the textual event and command declarations */
    export const DECLARATIONS_NODE = 'node:declarations';
    /** A transition between two states, labelled `event / command, ...` */
    export const TRANSITION_EDGE = 'edge:transition';
    /** The label of a transition edge, rendered as an embedded Monaco editor on the client */
    export const LABEL_MONACO = 'label:monaco';
    /** The multi-line declarations label, rendered as an embedded Monaco editor on the client */
    export const LABEL_MONACO_DECLARATIONS = 'label:monaco-declarations';
}
