/** @jsx React.createElement */
import { MonacoEditorCreationService } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import { MonacoEditorLanguageClientWrapper, WrapperConfig } from 'monaco-editor-wrapper';
import React from 'react';
import { MessageConnection } from 'vscode-languageclient';
import { MultiLineMonacoEditorWrapper } from './multi-line-monaco-editor.component.js';
import { StatemachineLangiumTypes } from './statemachine-langium-types.js';

/**
 * Chooses the editor component per label: the declarations element gets the multi-line
 * component, while all other labels keep the framework default, which enforces
 * single-line input. The editor of a label is identified via the id of its wrapper
 * config, which the framework builds as `<containerId>.<grammar type>`.
 *
 * This uses the customization hook documented on the framework's
 * `MonacoEditorCreationService`; the service is rebound in the `statemachineLangiumModule`.
 */
@injectable()
export class StatemachineMonacoEditorCreationService extends MonacoEditorCreationService {
    public override createMonacoEditor(
        connection: Promise<MessageConnection>,
        onSubmit: (text: string, ast: any) => void,
        wrapperConfig: WrapperConfig,
        initHeight: string
    ): [React.JSX.Element, () => void, (height: string) => void] {
        if (!this.isDeclarationsEditor(wrapperConfig)) {
            return super.createMonacoEditor(connection, onSubmit, wrapperConfig, initHeight);
        }

        const loadContainer: { wrapper?: MonacoEditorLanguageClientWrapper; setHeight?: React.Dispatch<React.SetStateAction<string>> } = {};

        const triggerValidation = () => {
            if (loadContainer.wrapper) {
                const activeEditor = loadContainer.wrapper.getEditor();
                activeEditor?.setValue(activeEditor.getValue());
            }
        };

        const setHeight = (height: string) => {
            loadContainer.setHeight?.(height);
        };

        return [
            <MultiLineMonacoEditorWrapper
                wrapperConfig={wrapperConfig}
                onLoad={(wrapper, setHeightCallback) => {
                    loadContainer.wrapper = wrapper;
                    loadContainer.setHeight = setHeightCallback;
                }}
                onSubmit={onSubmit}
                connection={connection}
                initHeight={initHeight}
            />,
            triggerValidation,
            setHeight
        ];
    }

    protected isDeclarationsEditor(wrapperConfig: WrapperConfig): boolean {
        return !!wrapperConfig.id?.endsWith(`.${StatemachineLangiumTypes.DECLARATIONS_GRAMMAR}`);
    }
}
