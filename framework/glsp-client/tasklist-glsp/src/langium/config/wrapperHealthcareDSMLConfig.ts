/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import getLifecycleServiceOverride from '@codingame/monaco-vscode-lifecycle-service-override';
import getLocalizationServiceOverride from '@codingame/monaco-vscode-localization-service-override';
import { CodeResources, LanguageClientConfig, WrapperConfig } from 'monaco-editor-wrapper';
import { createDefaultLocaleConfiguration } from 'monaco-languageclient/vscode/services';
import { MessageTransports } from 'vscode-languageclient';
import { LogLevel } from 'vscode/services';
// cannot be imported with assert as json contains comments
import responseActionNodeDSLTm from '../syntaxes/action-node.tmLanguage.json' with { type: 'json' };
import responseAdmissionActionNodeDSLTm from '../syntaxes/admission-action-node.tmLanguage.json' with { type: 'json' };
import responseBranchNodeDSLTm from '../syntaxes/branch-node.tmLanguage.json' with { type: 'json' };
import { configureMonacoWorkers } from '../utils.js';
import healthcareDSMLLanguageConfig from './language-configuration.json' with { type: 'json' };

export const createLangiumGlobalConfig = (params: {
    languageServerId: string;
    useLanguageClient: boolean;
    codeResources?: CodeResources;
    worker?: Worker;
    messagePort?: MessagePort;
    messageTransports?: MessageTransports;
    htmlContainer: HTMLElement;
    overflowContainer?: HTMLElement;
    init?: boolean;
}): WrapperConfig => {
    const extensionFilesOrContents = new Map<string, string | URL>();
    extensionFilesOrContents.set(
        `/${params.languageServerId}-healthcare-dsml-configuration.json`,
        JSON.stringify(healthcareDSMLLanguageConfig)
    );
    extensionFilesOrContents.set(`/${params.languageServerId}-branch-node-grammar.json`, JSON.stringify(responseBranchNodeDSLTm));
    extensionFilesOrContents.set(
        `/${params.languageServerId}-admission-action-node-grammar.json`,
        JSON.stringify(responseAdmissionActionNodeDSLTm)
    );
    extensionFilesOrContents.set(`/${params.languageServerId}-action-node-grammar.json`, JSON.stringify(responseActionNodeDSLTm));

    const languageClientConfigs: Record<string, LanguageClientConfig> | undefined =
        params.useLanguageClient && params.worker && params.init
            ? {
                  healthcareDSML: {
                      clientOptions: {
                          documentSelector: ['branch-node', 'admission-action-node', 'action-node']
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
            : undefined;

    return {
        $type: 'extended',
        htmlContainer: params.htmlContainer,
        logLevel: LogLevel.Debug,
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
        extensions: params.init
            ? [
                  {
                      config: {
                          name: `HealthcareDsml-${params.languageServerId}`,
                          publisher: 'harbour',
                          version: '1.0.0',
                          engines: {
                              vscode: '*'
                          },
                          contributes: {
                              languages: [
                                  {
                                      id: 'branch-node',
                                      extensions: ['.branch_node'],
                                      aliases: ['branch-node'],
                                      configuration: `./${params.languageServerId}-healthcare-dsml-configuration.json`
                                  },
                                  {
                                      id: 'admission-action-node',
                                      extensions: ['.admission_action_node'],
                                      aliases: ['admission-action-node'],
                                      configuration: `./${params.languageServerId}-healthcare-dsml-configuration.json`
                                  },
                                  {
                                      id: 'action-node',
                                      extensions: ['.action_node'],
                                      aliases: ['action-node'],
                                      configuration: `./${params.languageServerId}-healthcare-dsml-configuration.json`
                                  }
                              ],
                              grammars: [
                                  {
                                      language: 'branch-node',
                                      scopeName: 'source.branch-node',
                                      path: `./${params.languageServerId}-branch-node-grammar.json`
                                  },
                                  {
                                      language: 'admission-action-node',
                                      scopeName: 'source.admission-action-node',
                                      path: `./${params.languageServerId}-admission-action-node-grammar.json`
                                  },
                                  {
                                      language: 'action-node',
                                      scopeName: 'source.action-node',
                                      path: `./${params.languageServerId}-action-node-grammar.json`
                                  }
                              ]
                          }
                      },
                      filesOrContents: extensionFilesOrContents
                  }
              ]
            : undefined,
        editorAppConfig: {
            editorOptions: {
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
                overflowWidgetsDomNode: params.overflowContainer,
                fixedOverflowWidgets: true
            },
            codeResources: params.codeResources,
            monacoWorkerFactory: configureMonacoWorkers
        },
        languageClientConfigs
    };
};
