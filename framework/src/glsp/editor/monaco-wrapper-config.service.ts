import { LogLevel } from '@codingame/monaco-vscode-api/services';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import getLifecycleServiceOverride from '@codingame/monaco-vscode-lifecycle-service-override';
import getLocalizationServiceOverride from '@codingame/monaco-vscode-localization-service-override';
import { injectable } from 'inversify';
import { EditorAppConfig, ExtensionConfig, WrapperConfig } from 'monaco-editor-wrapper';
import { Logger } from 'monaco-languageclient/tools';
import { createDefaultLocaleConfiguration } from 'monaco-languageclient/vscode/services';
import { useWorkerFactory } from 'monaco-languageclient/workerFactory';
import { LangiumConfigParams, LangiumInitConfigParams } from '../../common/types/types.js';

/**
 * Provides methods for creating Monaco editor wrapper configs, either for one of many editors
 * or for an initial editor that starts all the important services in the background.
 *
 * Must be implemented by the application and bound like this:
 * `bind(LANGIUM_COMPONENT_TYPES.MonacoWrapperConfigService).to(MyMonacoWrapperConfigService);`
 */
@injectable()
export abstract class MonacoWrapperConfigService {
    /**
     * Creates a `WrapperConfig` fit for every editor.
     *
     * @param params Contains information about containers and the content to render
     */
    public createLangiumGlobalConfig(params: LangiumConfigParams): WrapperConfig {
        return {
            $type: 'extended',
            htmlContainer: params.htmlContainer,
            logLevel: LogLevel.Debug,
            id: params.id,
            vscodeApiConfig: {
                serviceOverrides: {
                    ...getKeybindingsServiceOverride(),
                    ...getLifecycleServiceOverride(),
                    ...getLocalizationServiceOverride(createDefaultLocaleConfiguration())
                },
                userConfiguration: {
                    json: JSON.stringify({
                        'workbench.colorTheme': 'Default Light Modern',
                        'editor.guides.bracketPairsHorizontal': 'active',
                        'editor.wordBasedSuggestions': 'off',
                        'editor.experimental.asyncTokenization': true
                    })
                }
            },
            editorAppConfig: {
                editorOptions: this.getEditorOptions(params.overflowContainer),
                codeResources: params.codeResources,
                monacoWorkerFactory: logger => this.configureMonacoWorkers(logger)
            }
        };
    }

    /**
     * Creates a `WrapperConfig` with additional configurations that cause the creation
     * and registration of services, which are then available for all editors, but should
     * only be created once. Therefore, it should only be created for a special init editor.
     *
     * @param params Contains information about containers and the content to render
     */
    public createLangiumInitConfig(params: LangiumInitConfigParams): WrapperConfig {
        const wrapperConfig = this.createLangiumGlobalConfig(params);

        wrapperConfig.extensions = [this.getExtensionConfig()];

        wrapperConfig.languageClientConfigs = {
            configs: {
                language: {
                    clientOptions: {
                        documentSelector: this.getDocumentSelectors()
                    },
                    connection: {
                        options: {
                            $type: 'WorkerDirect',
                            worker: params.worker,
                            messagePort: params.messagePort
                        },
                        messageTransports: params.messageTransports
                    }
                }
            }
        };

        return wrapperConfig;
    }

    /** Provides the grammar-specific extension config */
    protected abstract getExtensionConfig(): ExtensionConfig;

    /** Provides the grammar-specific document selectors */
    protected abstract getDocumentSelectors(): string[];

    /** Provides the options governing the layout and features of the editor */
    protected getEditorOptions(overflowContainer?: HTMLElement): EditorAppConfig['editorOptions'] {
        return {
            minimap: { enabled: false },
            lineNumbers: 'off',
            scrollBeyondLastLine: false,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            overviewRulerLanes: 0,
            renderLineHighlight: 'none',
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
            },
            wordWrap: 'off',
            contextmenu: false,
            overflowWidgetsDomNode: overflowContainer,
            fixedOverflowWidgets: true
        };
    }

    /** Starts the necessary Monaco workers */
    protected configureMonacoWorkers(logger?: Logger) {
        useWorkerFactory({
            workerLoaders: {
                TextMateWorker: () => {
                    const textMateWorker = new Worker(
                        new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url),
                        { type: 'module', name: 'Healthcare_Textmate' }
                    );
                    return textMateWorker;
                },
                TextEditorWorker: () => {
                    const editorWorker = new Worker(
                        new URL('@codingame/monaco-vscode-editor-api/esm/vs/editor/editor.worker.js', import.meta.url),
                        {
                            type: 'module',
                            name: 'Healthcare_Editor'
                        }
                    );
                    return editorWorker;
                }
            },
            logger
        });
    }
}
