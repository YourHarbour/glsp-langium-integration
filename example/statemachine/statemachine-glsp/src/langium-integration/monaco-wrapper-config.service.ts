import { MonacoWrapperConfigService } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { ExtensionConfig } from 'monaco-editor-wrapper';
// cannot be imported with assert as json contains comments
import statemachineDslLanguageConfig from '../langium/config/language-configuration.json' with { type: 'json' };
import declarationsDslTm from '../langium/syntaxes/statemachine-declarations.tmLanguage.json' with { type: 'json' };
import transitionDslTm from '../langium/syntaxes/statemachine-transition.tmLanguage.json' with { type: 'json' };

/**
 * Provides the Monaco editor wrapper configuration for the two sub-languages of the
 * statemachine example, i.e. the language registrations including their TextMate grammars
 * for syntax highlighting.
 */
@injectable()
export class StatemachineMonacoWrapperConfigService extends MonacoWrapperConfigService {
    protected override getExtensionConfig(): ExtensionConfig {
        const extensionFilesOrContents = new Map<string, string | URL>();
        extensionFilesOrContents.set('/statemachine-dsl-configuration.json', JSON.stringify(statemachineDslLanguageConfig));
        extensionFilesOrContents.set('/statemachine-declarations-grammar.json', JSON.stringify(declarationsDslTm));
        extensionFilesOrContents.set('/statemachine-transition-grammar.json', JSON.stringify(transitionDslTm));

        return {
            config: {
                name: 'StatemachineDsl',
                publisher: 'glsp-langium-integration',
                version: '1.0.0',
                engines: {
                    vscode: '*'
                },
                contributes: {
                    languages: [
                        {
                            id: 'statemachine-declarations',
                            extensions: ['.sm_declarations'],
                            aliases: ['statemachine-declarations'],
                            configuration: './statemachine-dsl-configuration.json'
                        },
                        {
                            id: 'statemachine-transition',
                            extensions: ['.sm_transition'],
                            aliases: ['statemachine-transition'],
                            configuration: './statemachine-dsl-configuration.json'
                        }
                    ],
                    grammars: [
                        {
                            language: 'statemachine-declarations',
                            scopeName: 'source.statemachine-declarations',
                            path: './statemachine-declarations-grammar.json'
                        },
                        {
                            language: 'statemachine-transition',
                            scopeName: 'source.statemachine-transition',
                            path: './statemachine-transition-grammar.json'
                        }
                    ]
                }
            },
            filesOrContents: extensionFilesOrContents
        };
    }

    protected override getDocumentSelectors(): string[] {
        return ['statemachine-declarations', 'statemachine-transition'];
    }
}
