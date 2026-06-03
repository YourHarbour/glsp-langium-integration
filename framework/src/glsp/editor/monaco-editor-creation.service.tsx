/** @jsx React.createElement */
import { injectable } from 'inversify';
import { MonacoEditorLanguageClientWrapper, WrapperConfig } from 'monaco-editor-wrapper';
import React from 'react';
import { MessageConnection } from 'vscode-languageclient';
import { MonacoEditorWrapper } from './monaco-editor.component.js';

/**
 * Provides a method to create a Monaco editor React component.
 * Returns not only the component but also a callback that allows to manually trigger a re-validation of the component
 * and another callback to set the height of the component.
 *
 * Regarding customization, much of the behaviour and design of the editor is actually defined by `WrapperConfig`.
 * Thus, if there is a need for further customization, first look into `MonacoWrapperConfigService`.
 * Should there still be a need for a custom editor React component, this class can be rebound like this:
 * `bind(LANGIUM_COMPONENT_TYPES.MonacoEditorCreationService).to(MyMonacoEditorCreationService)`
 */
@injectable()
export class MonacoEditorCreationService {
    public createMonacoEditor(
        connection: Promise<MessageConnection>,
        onSubmit: (text: string, ast: any) => void,
        wrapperConfig: WrapperConfig,
        initHeight: string
    ): [React.JSX.Element, () => void, (height: string) => void] {
        const loadContainer: { wrapper?: MonacoEditorLanguageClientWrapper; setHeight?: React.Dispatch<React.SetStateAction<string>> } = {};

        const triggerValidation = () => {
            if (loadContainer.wrapper) {
                const editor = loadContainer.wrapper.getEditor();
                editor?.setValue(editor.getValue());
            }
        };

        const setHeight = (height: string) => {
            loadContainer.setHeight?.(height);
        };

        return [
            <MonacoEditorWrapper
                wrapperConfig={wrapperConfig}
                onLoad={(wrapper, setHeight) => {
                    loadContainer.wrapper = wrapper;
                    loadContainer.setHeight = setHeight;
                }}
                onSubmit={onSubmit}
                connection={connection}
                initHeight={initHeight}
            />,
            triggerValidation,
            setHeight
        ];
    }
}
