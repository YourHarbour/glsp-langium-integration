/********************************************************************************
 * Copyright (c) 2024 EclipseSource and others.
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
    DOMHelper,
    EditorContextService,
    getAbsoluteClientBounds,
    GLSPAbstractUIExtension,
    GLSPActionDispatcher,
    GModelRoot,
    ModelIndexImpl,
    RectangularNode,
    TYPES,
    ViewerOptions
} from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { LANGIUM_COMPONENT_TYPES } from '../../framework/glsp/constants/langium-component-types.js';
import { LangiumWorkerHandler } from '../../framework/glsp/worker/langium-worker.handler.js';
import { runHealthcareDSMLReact } from '../../langium/main-react.js';
import { ApplyLangiumEditOperation } from '../communication/communication.action.js';
import { getFirstLabel } from '../utils/label.util.js';

@injectable()
export class TextEditorUIExtension extends GLSPAbstractUIExtension {
    static readonly ID = 'text-editor-ui-extension';

    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    @inject(EditorContextService)
    protected editorContextService: EditorContextService;

    @inject(TYPES.ViewerOptions)
    protected viewerOptions: ViewerOptions;

    @inject(TYPES.DOMHelper)
    protected domHelper: DOMHelper;

    @inject(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler)
    protected langiumWorkerHandler: LangiumWorkerHandler;

    protected node: RectangularNode;

    protected branchNode: RectangularNode;

    protected textEditor: HTMLElement;

    protected updateEditorText: any;

    protected labelId?: string;

    override id(): string {
        return TextEditorUIExtension.ID;
    }
    override containerClass(): string {
        return 'text-editor-ui-extension';
    }

    protected override initializeContents(containerElement: HTMLElement): void {
        this.textEditor = this.createTextEditor(containerElement);

        this.createLangiumEditor(this.textEditor);
    }

    protected createLangiumEditor(containerElement: HTMLElement): void {
        const onSubmit = (text: string, ast: any) => {
            console.log('submitted', text, ast);

            // This AST to operation transformation is specifically for our use case and needs to be adjust for more complex grammars
            for (const key in ast) {
                if (!key.startsWith('$')) {
                    const ruleObj = ast[key];
                    const res: any = { elementId: this.node.id, rule: ruleObj['$type'], tokens: [], text };
                    for (const k in ruleObj) {
                        if (!k.startsWith('$')) {
                            if (Array.isArray(ruleObj[k])) {
                                ruleObj[k].forEach(str => res.tokens.push({ property: k, text: str }));
                            } else if (ruleObj[k] != null) {
                                const token: any = { property: k };
                                if (typeof ruleObj[k] === 'string') {
                                    token.text = ruleObj[k];
                                } else if ('refId' in ruleObj[k]) {
                                    token.node = ruleObj[k].refId;
                                }
                                res.tokens.push(token);
                            }
                        }
                    }
                    this.actionDispatcher.dispatch(ApplyLangiumEditOperation.create(res));
                    return;
                }
            }
        };
        this.langiumWorkerHandler.worker.then(worker => {
            this.updateEditorText = runHealthcareDSMLReact(worker, onSubmit);
        });
    }

    protected createTextEditor(containerElement: HTMLElement): HTMLElement {
        const textEditor = document.createElement('div');
        textEditor.style.width = '600px';
        textEditor.style.height = '600px';
        textEditor.style.backgroundColor = '#1f1f1f !important';
        textEditor.style.display = 'flex';
        textEditor.style.border = '3px solid grey';
        textEditor.id = 'react-root';

        containerElement.appendChild(textEditor);

        return textEditor;
    }

    public override onBeforeShow(containerElement: HTMLElement, root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        this.node = getNode(contextElementIds[0], root.index);
        console.log('onBeforeShow: ', this.node);
        this.setPosition(containerElement);

        const label = getFirstLabel(this.node);
        // this.updateEditorText(label?.text ?? '', this.node.id, this.node.type);
        this.labelId = label?.id;
    }

    protected setPosition(containerElement: HTMLElement): void {
        let x = 0;
        let y = 0;

        if (this.node) {
            const bounds = getAbsoluteClientBounds(this.node, this.domHelper, this.viewerOptions);
            x = bounds.x + this.node.size.width + 5;
            y = bounds.y;
            console.log('setPosition: ', bounds.x, bounds.y);
        }

        console.log('setPosition: ', x, y);

        containerElement.style.left = `${x}px`;
        containerElement.style.top = `${y}px`;
        containerElement.style.position = 'absolute';
    }

    override hide(): void {
        this.setContainerVisible(false);
        super.hide();
    }

    override show(root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        super.show(root, ...contextElementIds);
        this.setContainerVisible(true);
        // this.textEditor.focus();
        // this.createEditor();
    }
}

function getNode(id: string, index: ModelIndexImpl): RectangularNode {
    const element = index.getById(id);
    return element as RectangularNode;
}
