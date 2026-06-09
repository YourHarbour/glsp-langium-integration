/** @jsx svg */
import { GLSPActionDispatcher, RectangularNodeView, RenderingContext, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { AddInventoryItemOperation, RemoveInventoryItemOperation } from './inventory-operations.js';
import { InventoryNode } from './model.js';
import { svg } from './sprotty-jsx.js';

/**
 * Layout constants of the inventory table.
 *
 * MUST be kept in sync with `InventoryNodeLayout` in `workflow-server/src/graph-extension.ts`,
 * which positions the editable cell labels accordingly.
 */
const TITLE_HEIGHT = 22;
const HEADER_HEIGHT = 18;
const ROW_HEIGHT = 18;
const FOOTER_HEIGHT = 18;
const COLUMN_RATIO = 0.62;

/**
 * Renders an {@link InventoryNode} as an editable table with two columns: the item name
 * and its amount.
 * The name/amount texts are *not* drawn by this view: they are `label:inventory-name` /
 * `label:inventory-amount` children created by the server, so that GLSP's standard
 * double-click label editing works on them. This view draws the table frame and the
 * add/delete buttons, which dispatch {@link AddInventoryItemOperation} and
 * {@link RemoveInventoryItemOperation} to the server.
 */
@injectable()
export class InventoryNodeView extends RectangularNodeView {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    override render(node: Readonly<InventoryNode>, context: RenderingContext): VNode | undefined {
        if (!this.isVisible(node, context)) {
            return undefined;
        }

        const items = node.items ?? [];
        const width = Math.max(node.bounds.width, 100);
        const tableTop = TITLE_HEIGHT + HEADER_HEIGHT;
        const footerY = tableTop + items.length * ROW_HEIGHT;
        const height = footerY + FOOTER_HEIGHT;
        // separator between the "Item" and the "Amount" column
        const columnX = Math.round(width * COLUMN_RATIO);
        const stopMouse = (event: MouseEvent): void => event.stopPropagation();

        return (
            <g class-node-inventory={true}>
                <rect
                    class-sprotty-node={true}
                    class-inventory-body={true}
                    class-mouseover={node.hoverFeedback}
                    class-selected={node.selected}
                    x='0'
                    y='0'
                    rx='5'
                    ry='5'
                    width={width}
                    height={height}
                />
                <text class-inventory-title={true} x={width / 2} y={TITLE_HEIGHT / 2 + 1}>
                    Inventory
                </text>
                <line class-inventory-line={true} x1={0} y1={TITLE_HEIGHT} x2={width} y2={TITLE_HEIGHT} />
                <text class-inventory-header={true} x={columnX / 2} y={TITLE_HEIGHT + HEADER_HEIGHT / 2 + 1}>
                    Item
                </text>
                <text class-inventory-header={true} x={columnX + (width - columnX) / 2} y={TITLE_HEIGHT + HEADER_HEIGHT / 2 + 1}>
                    Amount
                </text>
                <line class-inventory-line={true} x1={0} y1={tableTop} x2={width} y2={tableTop} />
                <line class-inventory-line={true} x1={columnX} y1={TITLE_HEIGHT} x2={columnX} y2={footerY} />
                {items.map((item, index) => {
                    const rowY = tableTop + index * ROW_HEIGHT;
                    return (
                        <g class-inventory-row={true}>
                            {index < items.length - 1 ? (
                                <line class-inventory-line={true} x1={0} y1={rowY + ROW_HEIGHT} x2={width} y2={rowY + ROW_HEIGHT} />
                            ) : undefined}
                            <g
                                class-inventory-button={true}
                                on-click={(event: MouseEvent) => this.onDeleteItem(event, node, item.id)}
                                on-mousedown={stopMouse}
                                on-mouseup={stopMouse}
                                on-dblclick={stopMouse}
                            >
                                <circle class-inventory-button-background={true} cx={width - 11} cy={rowY + ROW_HEIGHT / 2} r={6} />
                                <path
                                    class-inventory-button-icon={true}
                                    d={`M ${width - 13.5} ${rowY + 6.5} L ${width - 8.5} ${rowY + 11.5} ` +
                                        `M ${width - 8.5} ${rowY + 6.5} L ${width - 13.5} ${rowY + 11.5}`}
                                />
                            </g>
                        </g>
                    );
                })}
                <line class-inventory-line={true} x1={0} y1={footerY} x2={width} y2={footerY} />
                <g
                    class-inventory-button={true}
                    on-click={(event: MouseEvent) => this.onAddItem(event, node)}
                    on-mousedown={stopMouse}
                    on-mouseup={stopMouse}
                    on-dblclick={stopMouse}
                >
                    <rect class-inventory-button-background={true} x={0} y={footerY} width={width} height={FOOTER_HEIGHT} />
                    <text class-inventory-add-label={true} x={width / 2} y={footerY + FOOTER_HEIGHT / 2 + 1}>
                        + Add item
                    </text>
                </g>
                {context.renderChildren(node)}
            </g>
        );
    }

    protected onAddItem(event: MouseEvent, node: Readonly<InventoryNode>): void {
        event.stopPropagation();
        this.actionDispatcher.dispatch(AddInventoryItemOperation.create({ nodeId: node.id }));
    }

    protected onDeleteItem(event: MouseEvent, node: Readonly<InventoryNode>, itemId: string): void {
        event.stopPropagation();
        this.actionDispatcher.dispatch(RemoveInventoryItemOperation.create({ nodeId: node.id, itemId }));
    }
}
