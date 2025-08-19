import { injectable } from 'inversify';
import { ExtensionConfig } from 'monaco-editor-wrapper';
import { MonacoWrapperConfigService } from '../../framework/glsp/editor/monaco-wrapper-config.service.js';
// cannot be imported with assert as json contains comments
import healthcareDSMLLanguageConfig from '../../langium/config/language-configuration.json' with { type: 'json' };
import responseActionNodeDSLTm from '../../langium/syntaxes/action-node.tmLanguage.json' with { type: 'json' };
import responseAdmissionActionNodeDSLTm from '../../langium/syntaxes/admission-action-node.tmLanguage.json' with { type: 'json' };
import responseBranchNodeDSLTm from '../../langium/syntaxes/branch-node.tmLanguage.json' with { type: 'json' };

@injectable()
export class HealthcareMonacoWrapperConfigService extends MonacoWrapperConfigService {
    protected override getExtensionConfig(): ExtensionConfig {
        const extensionFilesOrContents = new Map<string, string | URL>();
        extensionFilesOrContents.set(`/healthcare-dsml-configuration.json`, JSON.stringify(healthcareDSMLLanguageConfig));
        extensionFilesOrContents.set(`/healthcare-branch-node-grammar.json`, JSON.stringify(responseBranchNodeDSLTm));
        extensionFilesOrContents.set(`/healthcare-admission-action-node-grammar.json`, JSON.stringify(responseAdmissionActionNodeDSLTm));
        extensionFilesOrContents.set(`/healthcare-action-node-grammar.json`, JSON.stringify(responseActionNodeDSLTm));

        return {
            config: {
                name: `HealthcareDsml`,
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
                            configuration: `./healthcare-dsml-configuration.json`
                        },
                        {
                            id: 'admission-action-node',
                            extensions: ['.admission_action_node'],
                            aliases: ['admission-action-node'],
                            configuration: `./healthcare-dsml-configuration.json`
                        },
                        {
                            id: 'action-node',
                            extensions: ['.action_node'],
                            aliases: ['action-node'],
                            configuration: `./healthcare-dsml-configuration.json`
                        }
                    ],
                    grammars: [
                        {
                            language: 'branch-node',
                            scopeName: 'source.branch-node',
                            path: `./healthcare-branch-node-grammar.json`
                        },
                        {
                            language: 'admission-action-node',
                            scopeName: 'source.admission-action-node',
                            path: `./healthcare-admission-action-node-grammar.json`
                        },
                        {
                            language: 'action-node',
                            scopeName: 'source.action-node',
                            path: `./healthcare-action-node-grammar.json`
                        }
                    ]
                }
            },
            filesOrContents: extensionFilesOrContents
        };
    }
    protected override getDocumentSelectors(): string[] {
        return ['branch-node', 'admission-action-node', 'action-node'];
    }
}
