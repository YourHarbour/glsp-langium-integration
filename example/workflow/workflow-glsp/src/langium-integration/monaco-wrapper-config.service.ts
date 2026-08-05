import { MonacoWrapperConfigService } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { ExtensionConfig } from 'monaco-editor-wrapper';
// cannot be imported with assert as json contains comments
import workflowDslLanguageConfig from '../langium/config/language-configuration.json' with { type: 'json' };
import conditionalEdgeDSLTm from '../langium/syntaxes/conditional-edge.tmLanguage.json' with { type: 'json' };

/**
 * Provides the Monaco editor wrapper configuration for the conditional edge language,
 * i.e. the language registration including its TextMate grammar for syntax highlighting.
 */
@injectable()
export class WorkflowMonacoWrapperConfigService extends MonacoWrapperConfigService {
    protected override getExtensionConfig(): ExtensionConfig {
        const extensionFilesOrContents = new Map<string, string | URL>();
        extensionFilesOrContents.set('/workflow-dsl-configuration.json', JSON.stringify(workflowDslLanguageConfig));
        extensionFilesOrContents.set('/workflow-conditional-edge-grammar.json', JSON.stringify(conditionalEdgeDSLTm));

        return {
            config: {
                name: 'WorkflowDsl',
                publisher: 'glsp-langium-integration',
                version: '1.0.0',
                engines: {
                    vscode: '*'
                },
                contributes: {
                    languages: [
                        {
                            id: 'conditional-edge',
                            extensions: ['.conditional_edge'],
                            aliases: ['conditional-edge'],
                            configuration: './workflow-dsl-configuration.json'
                        }
                    ],
                    grammars: [
                        {
                            language: 'conditional-edge',
                            scopeName: 'source.conditional-edge',
                            path: './workflow-conditional-edge-grammar.json'
                        }
                    ]
                }
            },
            filesOrContents: extensionFilesOrContents
        };
    }

    protected override getDocumentSelectors(): string[] {
        return ['conditional-edge'];
    }
}
