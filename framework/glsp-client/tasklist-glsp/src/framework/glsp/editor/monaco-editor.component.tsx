/** @jsx React.createElement */
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import { editor, KeyCode } from 'monaco-editor';
import { MonacoEditorLanguageClientWrapper, WrapperConfig } from 'monaco-editor-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import { MessageConnection } from 'vscode-languageclient';
import { LangiumMessageTypes } from '../../common/constants/langium-message-types.js';

export type MonacoEditorWrapperProps = {
    /** Provides various static configs for the `MonacoEditorLanguageClientWrapper` and its wrapped `EditorApp` */
    wrapperConfig: WrapperConfig;
    /** Allows access to the `MonacoEditorLanguageClientWrapper` and `setHeight` on initial load */
    onLoad: (wrapper: MonacoEditorLanguageClientWrapper, setHeight: React.Dispatch<React.SetStateAction<string>>) => void;
    /** Allows external access to the information captured inside the React component on clicking outside */
    onSubmit: (text: string, ast: any) => void;
    /** Promise of the `MessageConnection` with the Langium LSP needed to receive specific AST updates from Langium */
    connection: Promise<MessageConnection>;
    /** The initial height */
    initHeight: string;
};

export const MonacoEditorWrapper = ({ wrapperConfig, onLoad, onSubmit, connection, initHeight }: MonacoEditorWrapperProps) => {
    // We actually don't want to care for rerenders, as they are handled by `MonacoEditorReactComp` itself, and only need the value on demand
    const clientWrapper = useRef<MonacoEditorLanguageClientWrapper>();
    const text = useRef<string>();
    const ast = useRef<any>();
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const containerRef = useRef<HTMLDivElement>(null);
    const hasFocus = useRef(false);

    // The height is the only variable that should impact rendering
    const [height, setHeight] = useState(initHeight);

    // Our mode of submitting the input is by clicking outside
    // TODO extend for keyboard-only accessibility
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && hasFocus.current && !containerRef.current.contains(event.target as any)) {
                if (text.current != null && ast.current != null) {
                    // Save the textual model used by Monaco
                    clientWrapper.current?.getModelRefs()?.modelRef?.object.save();
                    onSubmit(text.current, ast.current);
                }
                hasFocus.current = false;
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div
            onClick={() => {
                editorRef.current?.focus();
                hasFocus.current = true;
            }}
            ref={containerRef}
        >
            <MonacoEditorReactComp
                style={{ height }}
                wrapperConfig={wrapperConfig}
                onLoad={wrapper => {
                    clientWrapper.current = wrapper;

                    // Ensures that any unsaved edits are reverted if reopening a file
                    wrapper.getModelRefs()?.modelRef?.object.revert();
                    editorRef.current = wrapper.getEditor();
                    editorRef.current?.onKeyDown(e => {
                        if (e.keyCode === KeyCode.Enter) {
                            e.preventDefault();
                        }
                    });

                    const name = wrapper.getModelRefs()?.modelRef?.object.name;
                    connection.then(connection =>
                        connection.onNotification(`${LangiumMessageTypes.AST_LANGIUM}/${name}`, data => {
                            ast.current = data.ast;
                        })
                    );

                    onLoad?.(wrapper, setHeight);
                }}
                onTextChanged={changes => (text.current = changes.text ?? '')}
            />
        </div>
    );
};
