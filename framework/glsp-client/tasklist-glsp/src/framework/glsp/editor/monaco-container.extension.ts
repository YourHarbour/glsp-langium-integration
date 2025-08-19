import { GLSPAbstractUIExtension, GLSPActionDispatcher, TYPES } from '@eclipse-glsp/client';
import { inject, injectable } from 'inversify';
import ReactDOM from 'react-dom/client';
import { MonacoLabelConfig } from '../../common/types/types.js';
import { LANGIUM_COMPONENT_TYPES } from '../constants/langium-component-types.js';
import { LangiumWorkerHandler } from '../worker/langium-worker.handler.js';
import { MonacoEditorCreationService } from './monaco-editor-creation.service.js';
import { MonacoEditorSizeService } from './monaco-editor-size.service.js';
import { MonacoSubmitService } from './monaco-submit.service.js';
import { MonacoWrapperConfigService } from './monaco-wrapper-config.service.js';

/**
 * Provides APIs to create and manage Monaco editors.
 * This circumvents the need of re-creating editors by instead attaching and detaching them from
 * their desired place in the DOM-tree, keeping them rendered inside an invisible container
 * in the meantime.
 *
 * If a change in behaviour is desired, this should in most cases not happen via
 * extension of this class, but rather the custom implementation of its injected
 * components. Nonetheless, in case of override, it must be rebound like this:
 * `bind(LANGIUM_COMPONENT_TYPES.MonacoContainerUIExtension).to(MyMonacoContainerUIExtension).inSingletonScope();`
 */
@injectable()
export class MonacoContainerUIExtension extends GLSPAbstractUIExtension {
    @inject(TYPES.IActionDispatcher)
    protected actionDispatcher: GLSPActionDispatcher;
    @inject(LANGIUM_COMPONENT_TYPES.LangiumWorkerHandler)
    protected langiumWorkerHandler: LangiumWorkerHandler;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoEditorSizeService)
    protected monacoEditorSizeService: MonacoEditorSizeService;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoSubmitService)
    protected monacoSubmitService: MonacoSubmitService;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoWrapperConfigService)
    protected monacoWrapperConfigService: MonacoWrapperConfigService;
    @inject(LANGIUM_COMPONENT_TYPES.MonacoEditorCreationService)
    protected monacoEditorCreationService: MonacoEditorCreationService;

    protected elements: Record<string, HTMLElement> = {};
    protected preCreatedElements: Record<string, HTMLElement> = {};
    protected elementValidationCallbacks: Record<string, () => void> = {};
    protected elementSetHeightCallbacks: Record<string, (height: string) => void> = {};

    override id(): string {
        return 'monaco-container-ui-extension';
    }

    override containerClass(): string {
        return 'monaco-container-ui-extension';
    }

    protected override initializeContents(containerElement: HTMLElement): void {
        containerElement.style.position = 'absolute';
        containerElement.style.width = '0';
        containerElement.style.height = '0';
        containerElement.classList.add('monaco-editor', 'overflow-guard');

        const monacoContainer = document.createElement('div');
        monacoContainer.style.visibility = 'hidden';
        monacoContainer.style.opacity = '0';
        monacoContainer.style.position = 'absolute';

        containerElement.appendChild(monacoContainer);

        // One Monaco editor is necessary to both start the language client and register the extensions
        // However, this must only be done once.
        this.containerElement.firstChild!.appendChild(
            this.createEditor({ id: 'init_label', containerId: 'init', text: 'init', type: 'init' }, true)
        );
    }

    /** Triggers the initialization */
    override show(): void {
        if (!this.containerElement) {
            this.initialize();
        }
    }

    /**
     * Allows access to an editor element using the id of the relevant label element.
     * Because this method might be called before the editors were initizalized, it just creates
     * empty containers that are filled later on.
     *
     * @param labelId The id corresponding to the required editor
     * @returns The editor's container element
     */
    public getElement(labelId: string): HTMLElement {
        const editor = this.elements[labelId];
        if (editor) {
            return editor;
        }

        const container = this.createEditorContainer(labelId);
        this.preCreatedElements[labelId] = container;
        return container;
    }

    /**
     * Returns an element back to the extension, i.e. detaching it from its place-of-use and
     * attaching it to the invisble container for safe-keeping.
     *
     * @param labelId The id of the element to return
     */
    public returnElement(labelId: string): void {
        this.containerElement.firstChild!.appendChild(this.elements[labelId]);
    }

    /**
     * Activates the validation callbacks of each editor, which each then communicates with Langium.
     */
    public revalidateEditors(): void {
        Object.values(this.elementValidationCallbacks).forEach(cb => cb());
    }

    /**
     * Resizes the container of an editor using the `MonacoEditorSizeService` using the label elements id.
     */
    public resizeEditor(labelId: string): void {
        const element = this.elements[labelId];
        if (element) {
            element.style.width = this.monacoEditorSizeService.getWidth(labelId);
            const height = this.monacoEditorSizeService.getHeight(labelId);
            element.style.height = height;
            this.elementSetHeightCallbacks[labelId]?.(height);
        }
    }

    /**
     * Creates editor elements based on the label element's id, its containing node's id,
     * the type to use as a file ending to identify the grammar to use and the initial text.
     */
    public createElements(labels: MonacoLabelConfig[]) {
        labels.forEach(label => {
            // Check if the creation was only deferred to now and complete the elements
            if (this.preCreatedElements[label.id]) {
                const element = this.preCreatedElements[label.id];
                this.createEditorContent(element, label);
                delete this.preCreatedElements[label.id];
                this.elements[label.id] = element;
                // Otherwise, create new elements if necessary
            } else if (!this.elements[label.id]) {
                const element = this.createEditor(label);
                this.containerElement.firstChild!.appendChild(element);
                this.elements[label.id] = element;
            }
        });
    }

    /** Creates a complete editor element, both container and content */
    protected createEditor(label: MonacoLabelConfig, init?: boolean) {
        const container = this.createEditorContainer(label.id);
        this.createEditorContent(container, label, init);
        return container;
    }

    /** Create a `<div>` to serve as a container for an editor */
    protected createEditorContainer(labelId: string) {
        const container = document.createElement('div');
        container.style.width = this.monacoEditorSizeService.getWidth(labelId);
        container.style.height = this.monacoEditorSizeService.getHeight(labelId);
        return container;
    }

    /**
     * Fill the given container with a proper Monaco editor using a separate React instance.
     *
     * @param container The container to fill
     * @param label The relevant information about the editor to create
     * @param init Whether to create a special init editor that starts various Monaco services
     */
    protected createEditorContent(container: HTMLElement, label: MonacoLabelConfig, init?: boolean) {
        this.langiumWorkerHandler.worker.then(worker => {
            const wrapperConfig = init
                ? this.monacoWrapperConfigService.createLangiumInitConfig({ worker, htmlContainer: container })
                : this.monacoWrapperConfigService.createLangiumGlobalConfig({
                      htmlContainer: container,
                      codeResources: { main: { text: label.text, uri: `file:///monaco/edit/${label.containerId}.${label.type}` } },
                      overflowContainer: this.containerElement
                  });

            const [app, triggerValidation, setHeight] = this.monacoEditorCreationService.createMonacoEditor(
                this.langiumWorkerHandler.connection,
                (text: string, ast: any) => this.monacoSubmitService.handleSubmit(label, text, ast),
                wrapperConfig,
                this.monacoEditorSizeService.getHeight(label.id)
            );
            this.elementValidationCallbacks[label.id] = triggerValidation;
            this.elementSetHeightCallbacks[label.id] = setHeight;

            const root = ReactDOM.createRoot(container);
            root.render(app);
        });
    }
}
