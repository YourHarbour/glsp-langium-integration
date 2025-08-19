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
    Action,
    AutoCompleteWidget,
    DOMHelper,
    EditorContextService,
    GLSPAbstractUIExtension,
    GLSPActionDispatcher,
    GModelRoot,
    LabeledAction,
    ModelIndexImpl,
    Operation,
    RequestContextActions,
    RequestEditValidationAction,
    SetContextActions,
    SetEditValidationResultAction,
    TYPES,
    ValidationDecorator,
    ValidationStatus,
    ViewerOptions,
    getAbsoluteClientBounds,
    hasStringProp,
    toActionArray
} from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import { BranchNode, isBranchNode } from '../views/NodeView.js';


export interface EditBranchOperation extends Operation {
    kind: typeof EditBranchOperation.KIND;
    elementId: string;
    type: 'diagnostic condition';
    value: string
}

export namespace EditBranchOperation {
    export const KIND = 'EditBranchNode';
    export function is(object: any): object is EditBranchOperation {
        return (
            Action.hasKind(object, KIND) &&
            hasStringProp(object, 'elementId') &&
            hasStringProp(object, 'type') &&
            hasStringProp(object, 'value')
        );
    }

    export function create(elementId: string, type: 'diagnostic condition', value: string): EditBranchOperation {
        return {
            kind: KIND,
            elementId,
            type,
            value,
            isOperation: true
        };
    }
}

@injectable()
export class EditBranchEditor extends GLSPAbstractUIExtension {
    static readonly ID = 'action-card-branch-editor';
    readonly autoSuggestionSettings = {
        noSuggestionsMessage: 'No suggestions available',
        suggestionsClass: 'command-palette-suggestions',
        debounceWaitMs: 50,
        showOnFocus: true
    };

    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;

    @inject(EditorContextService)
    protected editorContextService: EditorContextService;

    @inject(TYPES.ViewerOptions)
    protected viewerOptions: ViewerOptions;

    @inject(TYPES.DOMHelper)
    protected domHelper: DOMHelper;

    // @inject(TYPES.ILogger)
    // protected override logger: ILogger;

    // protected actionCardCondition: ActionCardConditionNode;
    protected branchNode: BranchNode;

    protected autoSuggestion: AutoCompleteWidget;

    id(): string {
        return EditBranchEditor.ID;
    }
    containerClass(): string {
        return 'command-palette';
    }

    protected initializeContents(containerElement: HTMLElement): void {
        this.autoSuggestion = new AutoCompleteWidget(
            this.autoSuggestionSettings,
            { provideSuggestions: input => this.retrieveSuggestions(input) },
            { executeFromSuggestion: input => this.executeFromSuggestion(input) },
            () => this.hide(),
            this.logger
        );
        this.autoSuggestion.configureValidation(
            { validate: input => this.validateInput(input) },
            new ValidationDecorator(containerElement)
        );
        this.autoSuggestion.configureTextSubmitHandler({
            executeFromTextOnlyInput: (input: string) => this.executeFromTextOnlyInput(input)
        });
        this.autoSuggestion.initialize(containerElement);
    }

    override show(root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        super.show(root, ...contextElementIds);
        this.autoSuggestion.open(root);
    }

    protected override onBeforeShow(containerElement: HTMLElement, root: Readonly<GModelRoot>, ...contextElementIds: string[]): void {
        console.log('onBeforeShow: ', contextElementIds);
        this.branchNode = getBranchNode(contextElementIds, root.index);
        console.log('onBeforeShow: ', this.branchNode);
        this.autoSuggestion.inputField.value = '';
        this.setPosition(containerElement);
    }

    protected setPosition(containerElement: HTMLElement): void {
        let x = 0;
        let y = 0;

        if (this.branchNode) {
            const bounds = getAbsoluteClientBounds(this.branchNode, this.domHelper, this.viewerOptions);
            x = bounds.x + 5;
            y = bounds.y + 5;
        }

        containerElement.style.left = `${x}px`;
        containerElement.style.top = `${y}px`;
        containerElement.style.width = '500px';
    }

    protected async retrieveSuggestions(input: string): Promise<LabeledAction[]> {
        const response = await this.actionDispatcher.request(
            RequestContextActions.create(
                { contextId: EditBranchEditor.ID, editorContext: this.editorContextService.get({ ['text']: input }) }
            )
        );
        if (SetContextActions.is(response)) {
            return response.actions;
        }
        return Promise.reject();
    }

    protected async validateInput(input: string): Promise<ValidationStatus> {
        console.log('validateInput: ', input);
        const response = await this.actionDispatcher.request(
            RequestEditValidationAction.create(
                { contextId: EditBranchEditor.ID, modelElementId: this.branchNode.id, text: input }
            )
        );
        if (SetEditValidationResultAction.is(response)) {
            return response.status;
        }
        return Promise.reject();
    }

    protected executeFromSuggestion(input: LabeledAction | Action[] | Action): void {
        console.log('executeFromSuggestion: ', input);
        this.actionDispatcher.dispatchAll(toActionArray(input));
    }

    protected executeFromTextOnlyInput(input: string): void {
        if (input.startsWith('Branch:')) {
            const value = input.substring('Branch: '.length);
            console.log('executeFromTextOnlyInput: ', input);
            const action = EditBranchOperation.create(
                this.branchNode.id,
                'diagnostic condition',
                value
            );
            console.log('executeFromTextOnlyInput: ', action);
            this.actionDispatcher.dispatch(action);
        }else {
            throw new Error('Unsupported Editing: ' + input);
        }
    }

    override hide(): void {
        this.autoSuggestion.dispose();
        super.hide();
    }
}

function getBranchNode(ids: string[], index: ModelIndexImpl): BranchNode {
    return ids.map(id => index.getById(id))
    .find(element => element && isBranchNode(element)) as BranchNode;
}