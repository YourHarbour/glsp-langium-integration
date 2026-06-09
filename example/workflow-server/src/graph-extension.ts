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

    children(): this {
        return this;
    }

    override build(): T {
        this.layout('hbox').addLayoutOption('paddingRight', 10).add(this.createCompartmentIcon()).add(this.createCompartmentHeader());
        return super.build();
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

/** A single item of an {@link InventoryNode}, e.g. `Steel` with an amount of `120` */
export interface InventoryItem {
    id: string;
    name: string;
    amount: number;
}

/**
 * A node holding the available inventory items. It is rendered as a two-column table
 * (item name and amount) on the client. Its items can be referenced by the conditions
 * of {@link ConditionalEdge}s, e.g. `if Steel.amount > 100`.
 *
 * The name and amount cells of each row are editable {@link GLabel} children
 * (see {@link rebuildInventoryNode}); rows can be added and removed via the
 * `addInventoryItem`/`removeInventoryItem` operations.
 */
export class InventoryNode extends GNode {
    items: InventoryItem[] = [];

    static override builder(): InventoryNodeBuilder {
        return new InventoryNodeBuilder(InventoryNode).type(ModelTypes.INVENTORY_NODE).addCssClass('inventory');
    }
}

/**
 * Layout constants of the inventory table.
 *
 * MUST be kept in sync with the values used by the `InventoryNodeView` in
 * `workflow-glsp/src/inventory-views.tsx`.
 */
export namespace InventoryNodeLayout {
    export const TITLE_HEIGHT = 22;
    export const HEADER_HEIGHT = 18;
    export const ROW_HEIGHT = 18;
    export const FOOTER_HEIGHT = 18;
    export const DEFAULT_WIDTH = 160;
    /** Relative position of the separator between the "Item" and the "Amount" column */
    export const COLUMN_RATIO = 0.62;
    /** Horizontal padding of the text inside a cell */
    export const CELL_PADDING = 6;
    /** Horizontal space reserved at the right edge of a row for the delete button */
    export const DELETE_BUTTON_ZONE = 16;

    export function tableTop(): number {
        return TITLE_HEIGHT + HEADER_HEIGHT;
    }

    export function height(itemCount: number): number {
        return tableTop() + itemCount * ROW_HEIGHT + FOOTER_HEIGHT;
    }
}

/** Creates an item id that is unique within the diagram (item ids are derived from the generated node id) */
export function createInventoryItemId(node: InventoryNode): string {
    let index = node.items.length;
    while (node.items.some(item => item.id === `${node.id}_item${index}`)) {
        index++;
    }
    return `${node.id}_item${index}`;
}

/** Creates a default item name (`Item0`, `Item1`, ...) that is unique within the given node */
export function createInventoryItemName(node: InventoryNode): string {
    let index = node.items.length;
    while (node.items.some(item => item.name === `Item${index}`)) {
        index++;
    }
    return `Item${index}`;
}

/**
 * (Re-)creates the editable cell labels of the inventory table from the node's items and
 * recomputes the node size. Must be called whenever the items of the node change.
 */
export function rebuildInventoryNode(node: InventoryNode): void {
    const width = node.size?.width ?? InventoryNodeLayout.DEFAULT_WIDTH;
    node.size = { width, height: InventoryNodeLayout.height(node.items.length) };

    const columnX = Math.round(width * InventoryNodeLayout.COLUMN_RATIO);
    const cellY = (index: number): number => InventoryNodeLayout.tableTop() + index * InventoryNodeLayout.ROW_HEIGHT + 2;
    const cellHeight = InventoryNodeLayout.ROW_HEIGHT - 4;

    node.children = node.items.flatMap((item, index) => [
        new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_INVENTORY_NAME)
            .id(`${item.id}_name`)
            .text(item.name)
            .position(InventoryNodeLayout.CELL_PADDING, cellY(index))
            .size(columnX - 2 * InventoryNodeLayout.CELL_PADDING, cellHeight)
            .build(),
        new GLabelBuilder(GLabel)
            .type(ModelTypes.LABEL_INVENTORY_AMOUNT)
            .id(`${item.id}_amount`)
            .text(String(item.amount))
            .position(columnX + InventoryNodeLayout.CELL_PADDING, cellY(index))
            .size(
                width - columnX - 2 * InventoryNodeLayout.CELL_PADDING - InventoryNodeLayout.DELETE_BUTTON_ZONE,
                cellHeight
            )
            .build()
    ]);
    node.children.forEach(child => (child.parent = node));
}

export class InventoryNodeBuilder<T extends InventoryNode = InventoryNode> extends GNodeBuilder<T> {
    items(items: InventoryItem[]): this {
        this.proxy.items = items;
        return this;
    }

    addItem(name: string, amount: number): this {
        this.proxy.items = [...(this.proxy.items ?? []), { id: createInventoryItemId(this.proxy), name, amount }];
        return this;
    }

    override build(): T {
        const node = super.build();
        rebuildInventoryNode(node);
        return node;
    }
}

/**
 * An edge that is only taken if its condition over the inventory items holds,
 * e.g. `if Steel.amount > 100`. The condition is edited on the client via an
 * embedded Monaco editor backed by Langium; the editor is attached to the
 * `label:monaco` child of this edge.
 */
export class ConditionalEdge extends GEdge {
    condition: string;
    /** Id of the inventory item referenced by the condition, if resolved */
    itemId?: string;

    static override builder(): ConditionalEdgeBuilder {
        return new ConditionalEdgeBuilder(ConditionalEdge).type(ModelTypes.CONDITIONAL_EDGE).addCssClass('conditional');
    }
}

export class ConditionalEdgeBuilder<E extends ConditionalEdge = ConditionalEdge> extends GEdgeBuilder<E> {
    condition(condition: string): this {
        this.proxy.condition = condition;
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
