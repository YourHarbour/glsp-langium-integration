/** @jsx React.createElement */
import { editor, KeyCode } from '@codingame/monaco-vscode-editor-api';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
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
    const text = useRef<string>(undefined);
    const ast = useRef<any>(undefined);
    const editorRef = useRef<editor.IStandaloneCodeEditor>(undefined);
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
                    editorRef.current = wrapper.getEditor();
                    editorRef.current?.onKeyDown(e => {
                        if (e.keyCode === KeyCode.Enter) {
                            e.preventDefault();
                        }
                    });

                    const name = wrapper.getWrapperConfig()?.id;
                    connection.then(connection =>
                        connection.onNotification(`${LangiumMessageTypes.AST_LANGIUM}/${name}`, data => {
                            ast.current = data.ast;
                        })
                    );

                    onLoad?.(wrapper, setHeight);
                }}
                onTextChanged={changes => (text.current = changes.modified ?? '')}
            />
        </div>
    );
};
