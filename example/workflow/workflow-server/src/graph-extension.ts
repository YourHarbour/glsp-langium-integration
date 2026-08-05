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
import {
    Args,
    ArgsUtil,
    GCompartment,
    GCompartmentBuilder,
    GEdge,
    GEdgeBuilder,
    GLabel,
    GLabelBuilder,
    GNode,
    GNodeBuilder
} from '@eclipse-glsp/server';
import { ModelTypes } from './util/model-types';

export class ActivityNode extends GNode {
    nodeType: string;

    static override builder(): ActivityNodeBuilder {
        return new ActivityNodeBuilder(ActivityNode);
    }
}

export class ActivityNodeBuilder<T extends ActivityNode = ActivityNode> extends GNodeBuilder<T> {
    nodeType(nodeType: string): this {
        this.proxy.nodeType = nodeType;
        return this;
    }
}

export class TaskNode extends GNode {
    name: string;
    duration: number;
    taskType: string;
    references: string;
    /** Name of the variable this task provides to downstream conditional edges, e.g. `water` */
    variable?: string;
    /** Name of the property that can be inspected within {@link variable}, e.g. `level` (declared as `water:level`) */
    property?: string;

    static override builder(): TaskNodeBuilder {
        return new TaskNodeBuilder(TaskNode).layout('vbox').addArgs(ArgsUtil.cornerRadius(5)).addCssClass('task');
    }
}

export class TaskNodeBuilder<T extends TaskNode = TaskNode> extends GNodeBuilder<T> {
    name(name: string): this {
        this.proxy.name = name;
        return this;
    }

    duration(duration: number): this {
        this.proxy.duration = duration;
        return this;
    }

    taskType(tasktype: string): this {
        this.proxy.taskType = tasktype;
        return this;
    }

    references(references: string): this {
        this.proxy.references = references;
        return this;
    }

    variable(variable?: string, property?: string): this {
        this.proxy.variable = variable;
        this.proxy.property = property;
        return this;
    }

    children(): this {
        return this;
    }

    override build(): T {
        // The task is a vertical stack of two sections: the header (icon + name) on top and,
        // if the task provides a variable, its declaration (`water:level`) below. The separator
        // line between the sections is drawn by the client's TaskNodeView.
        this.layout('vbox').addLayoutOptions({ vGap: 6 }).add(this.createHeaderCompartment());
        const node = super.build();
        setTaskVariable(node, node.variable, node.property);
        return node;
    }

    protected createHeaderCompartment(): GCompartment {
        return GCompartment.builder()
            .type(ModelTypes.COMP_HEADER)
            .id(this.proxy.id + '_header')
            .layout('hbox')
            .addLayoutOptions({ paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 10 })
            .add(this.createCompartmentIcon())
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

    protected createCompartmentIcon(): GCompartment {
        return GCompartment.builder()
            .id(this.proxy.id + '_icon')
            .type(ModelTypes.ICON)
            .build();
    }
}

/** Parses a variable declaration of the form `water:level` (identifier `:` identifier) */
export function parseVariableDeclaration(text: string): { variable: string; property: string } | undefined {
    const match = text.trim().match(/^([_a-zA-Z][\w_]*)\s*:\s*([_a-zA-Z][\w_]*)$/);
    return match ? { variable: match[1], property: match[2] } : undefined;
}

/**
 * Sets (or clears, if `variable`/`property` are empty/undefined) the variable provided by the
 * given task and keeps the corresponding editable `label:variable` child - the lower section of
 * the task node, showing the declaration `water:level` - in sync. The label is what makes the
 * variable visible on the diagram and editable via double-click.
 */
export function setTaskVariable(task: TaskNode, variable?: string, property?: string): void {
    const name = variable?.trim();
    const propertyName = property?.trim();
    const provides = !!name && !!propertyName;
    task.variable = provides ? name : undefined;
    task.property = provides ? propertyName : undefined;
    task.children = task.children.filter(child => child.type !== ModelTypes.LABEL_VARIABLE);
    if (task.variable && task.property) {
        const label = new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_VARIABLE)
            .id(`${task.id}_variable`)
            .text(`${task.variable}:${task.property}`)
            .addCssClass('variable')
            .build();
        label.parent = task;
        task.children.push(label);
    }
}

export class WeightedEdge extends GEdge {
    probability?: string;

    static override builder(): WeightedEdgeBuilder {
        return new WeightedEdgeBuilder(WeightedEdge).type(ModelTypes.WEIGHTED_EDGE);
    }
}

export class WeightedEdgeBuilder<E extends WeightedEdge = WeightedEdge> extends GEdgeBuilder<E> {
    probability(probability: string): this {
        this.proxy.probability = probability;
        return this;
    }
}

/**
 * An edge that is only taken if its condition over an upstream task variable holds,
 * e.g. `if water >= 50`. The condition is edited on the client via an embedded
 * Monaco editor backed by Langium; the editor is attached to the `label:monaco`
 * child of this edge. The condition may only reference variables provided by
 * tasks upstream of the edge.
 */
export class ConditionalEdge extends GEdge {
    condition: string;
    /** Id of the task node providing the variable referenced by the condition, if resolved */
    variableId?: string;

    static override builder(): ConditionalEdgeBuilder {
        return new ConditionalEdgeBuilder(ConditionalEdge).type(ModelTypes.CONDITIONAL_EDGE).addCssClass('conditional');
    }
}

export class ConditionalEdgeBuilder<E extends ConditionalEdge = ConditionalEdge> extends GEdgeBuilder<E> {
    condition(condition: string): this {
        this.proxy.condition = condition;
        return this;
    }

    variableId(variableId?: string): this {
        this.proxy.variableId = variableId;
        return this;
    }

    override build(): E {
        this.add(this.createConditionLabel());
        return super.build();
    }

    protected createConditionLabel(): GLabel {
        return new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_MONACO)
            .id(`${this.proxy.id}_condition`)
            .text(this.proxy.condition ?? '')
            .edgePlacement({ position: 0.5, side: 'on', rotate: false, offset: 0 })
            .build();
    }
}

export class Category extends ActivityNode {
    name: string;

    static override builder(): CategoryNodeBuilder {
        return new CategoryNodeBuilder(Category)
            .layout('vbox')
            .addLayoutOptions({ hAlign: 'center', hGrab: false, vGrab: false })
            .addCssClass('category');
    }
}

export class CategoryNodeBuilder<T extends Category = Category> extends ActivityNodeBuilder<T> {
    name(name: string): this {
        this.proxy.name = name;
        return this;
    }

    children(): this {
        this.proxy.children.push(this.createLabelCompartment());
        this.proxy.children.push(this.createStructCompartment());
        return this;
    }

    protected createLabelCompartment(): GCompartment {
        const layoutOptions: Args = {};
        return new GCompartmentBuilder(GCompartment)
            .type(ModelTypes.COMP_HEADER)
            .id(this.proxy.id + '_header')
            .layout('hbox')
            .addLayoutOptions(layoutOptions)
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

    protected createStructCompartment(): GCompartment {
        return new GCompartmentBuilder(GCompartment)
            .type(ModelTypes.STRUCTURE)
            .id(this.proxy.id + '_struct')
            .layout('freeform')
            .addLayoutOptions({ hAlign: 'left', hGrab: true, vGrab: true })
            .build();
    }
}
