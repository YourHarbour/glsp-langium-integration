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
import { ArgsUtil, GCompartment, GEdge, GEdgeBuilder, GLabel, GLabelBuilder, GNode, GNodeBuilder } from '@eclipse-glsp/server';
import { ModelTypes } from './util/model-types';

/** A state of the machine, shown as a rounded rectangle with an editable name label. */
export class StateNode extends GNode {
    name: string;
    /** Whether this is the initial state of the machine (rendered with an accented border) */
    initial?: boolean;

    static override builder(): StateNodeBuilder {
        return new StateNodeBuilder(StateNode)
            .type(ModelTypes.STATE_NODE)
            .layout('vbox')
            .addArgs(ArgsUtil.cornerRadius(5))
            .addCssClass('state');
    }
}

export class StateNodeBuilder<T extends StateNode = StateNode> extends GNodeBuilder<T> {
    name(name: string): this {
        this.proxy.name = name;
        return this;
    }

    initial(initial?: boolean): this {
        this.proxy.initial = initial;
        return this;
    }

    override build(): T {
        this.add(this.createHeaderCompartment());
        const node = super.build();
        if (node.initial) {
            node.cssClasses = [...(node.cssClasses ?? []), 'initial'];
        }
        return node;
    }

    protected createHeaderCompartment(): GCompartment {
        return GCompartment.builder()
            .type(ModelTypes.COMP_HEADER)
            .id(this.proxy.id + '_header')
            .layout('hbox')
            .addLayoutOptions({ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 })
            .add(this.createCompartmentHeader())
            .build();
    }

    protected createCompartmentHeader(): GLabel {
        return new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_HEADING)
            .id(this.proxy.id + '_label')
            .text(this.proxy.name)
            .build();
    }
}

/**
 * The declarations element of the diagram: carries the textual event and command
 * declarations. The concrete text is edited on the client via an embedded multi-line
 * Monaco editor (the `label:monaco-declarations` child); the names of the declared events
 * and commands — extracted from the parsed Langium AST at submit time — are persisted
 * alongside the text and are the source of the scoping information for the transition
 * labels.
 */
export class DeclarationsNode extends GNode {
    /** The concrete declarations text */
    declarations: string;
    /** Names of the declared events */
    events: string[];
    /** Names of the declared commands */
    commands: string[];

    static override builder(): DeclarationsNodeBuilder {
        return new DeclarationsNodeBuilder(DeclarationsNode).type(ModelTypes.DECLARATIONS_NODE).addCssClass('declarations');
    }
}

export class DeclarationsNodeBuilder<T extends DeclarationsNode = DeclarationsNode> extends GNodeBuilder<T> {
    declarations(text: string, events: string[] = [], commands: string[] = []): this {
        this.proxy.declarations = text;
        this.proxy.events = events;
        this.proxy.commands = commands;
        return this;
    }

    override build(): T {
        this.layout('vbox')
            .addLayoutOptions({ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 })
            .add(this.createDeclarationsLabel());
        return super.build();
    }

    protected createDeclarationsLabel(): GLabel {
        return new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_MONACO_DECLARATIONS)
            .id(`${this.proxy.id}_declarations`)
            .text(this.proxy.declarations ?? '')
            .build();
    }
}

/**
 * A transition between two states, taken when its event occurs, e.g. `brewCoffee / startPump`.
 * The label is edited on the client via an embedded Monaco editor backed by Langium
 * (the `label:monaco` child of this edge); it may only reference events and commands
 * declared in the declarations element of the diagram.
 */
export class TransitionEdge extends GEdge {
    /** The concrete transition text */
    spec: string;
    /** Name of the referenced event, if resolved by Langium */
    eventName?: string;
    /** Names of the referenced commands, if resolved by Langium */
    actionNames?: string[];

    static override builder(): TransitionEdgeBuilder {
        return new TransitionEdgeBuilder(TransitionEdge).type(ModelTypes.TRANSITION_EDGE).addCssClass('transition');
    }
}

export class TransitionEdgeBuilder<E extends TransitionEdge = TransitionEdge> extends GEdgeBuilder<E> {
    spec(spec: string): this {
        this.proxy.spec = spec;
        return this;
    }

    eventName(eventName?: string): this {
        this.proxy.eventName = eventName;
        return this;
    }

    actionNames(actionNames?: string[]): this {
        this.proxy.actionNames = actionNames;
        return this;
    }

    override build(): E {
        this.add(this.createSpecLabel());
        return super.build();
    }

    protected createSpecLabel(): GLabel {
        return new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_MONACO)
            .id(`${this.proxy.id}_spec`)
            .text(this.proxy.spec ?? '')
            .edgePlacement({ position: 0.5, side: 'on', rotate: false, offset: 0 })
            .build();
    }
}
