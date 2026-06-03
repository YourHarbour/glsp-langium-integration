/** @jsx svg */
import { GLabel, RenderingContext, setAttr, ShapeView, svg } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { h, VNode } from 'snabbdom';
import { LANGIUM_COMPONENT_TYPES } from '../constants/langium-component-types.js';
import { MonacoContainerUIExtension } from './monaco-container.extension.js';
import { MonacoEditorSizeService } from './monaco-editor-size.service.js';

/**
 * A custom label view that injects html elements into the svg context and uses them as anchors
 * to attach Monaco editors to.
 */
@injectable()
export class MonacoLabelView extends ShapeView {
    @inject(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension)
    private monacoContainer: MonacoContainerUIExtension;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService)
    private monacoEditorSizeService: MonacoEditorSizeService;

    render(label: Readonly<GLabel>, context: RenderingContext): VNode | undefined {
        const node: any = (
            <g>
                <foreignObject
                    x={0}
                    y={0}
                    width={this.monacoEditorSizeService.getWidth(label.id)}
                    height={this.monacoEditorSizeService.getHeight(label.id)}
                >
                    {
                        h('div', {
                            hook: {
                                insert: vnode => {
                                    const container = vnode.elm;
                                    container?.appendChild(this.monacoContainer.getElement(label.id));
                                },
                                destroy: vnode => {
                                    this.monacoContainer.returnElement(label.id);
                                }
                            }
                        }) as any
                    }
                </foreignObject>
            </g>
        );
        setAttr(node, 'class', label.type);
        this.monacoContainer.resizeEditor(label.id);
        return node;
    }
}
