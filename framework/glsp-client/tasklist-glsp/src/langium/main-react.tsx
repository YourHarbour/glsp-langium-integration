/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */
/** @jsx React.createElement */
import { MonacoEditorProps, MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import { editor, KeyCode } from 'monaco-editor';
import { MonacoEditorLanguageClientWrapper, WrapperConfig } from 'monaco-editor-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createLangiumGlobalConfig } from './config/wrapperHealthcareDSMLConfig.js';

type AppProps = {
    wrapperConfig: WrapperConfig;
    onLoad: MonacoEditorProps['onLoad'];
    onSubmit: (text: string, ast: any) => void;
    worker: Worker;
    initHeight: string;
    onInitSetHeightCb: (cb: (height: string) => void) => void;
};

const App = ({ wrapperConfig, onLoad, onSubmit, worker, initHeight, onInitSetHeightCb }: AppProps) => {
    const clientWrapper = useRef<MonacoEditorLanguageClientWrapper>();
    // We actually don't want to care for rerenders and only need the value on demand
    const text = useRef<string>();
    const ast = useRef<any>();
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const containerRef = useRef<HTMLDivElement>(null);
    const hasFocus = useRef(false);

    const [height, setHeight] = useState(initHeight);

    useEffect(() => {
        const callback = ({ data }: MessageEvent<any>) => {
            const name = clientWrapper.current?.getModelRefs()?.modelRef?.object.name;
            const nameRegex = new RegExp(`^file:\\/\\/\\/monaco\\/edit\\/${name?.replaceAll('.', '\\.')}$`);
            if (data.type === 'ast' && data.payload.uri.match(nameRegex)) {
                ast.current = data.payload.ast;
            }
        };

        worker.addEventListener('message', callback);
        return () => worker.removeEventListener('message', callback);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && hasFocus.current && !containerRef.current.contains(event.target as any)) {
                if (text.current != null && ast.current != null) {
                    clientWrapper.current?.getModelRefs()?.modelRef?.object.save();
                    onSubmit(text.current, ast.current);
                }
                hasFocus.current = false;
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        onInitSetHeightCb(height => {
            setHeight(height);
        });
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

                    onLoad?.(wrapper);
                }}
                onTextChanged={changes => (text.current = changes.text ?? '')}
            />
        </div>
    );
};

export const runHealthcareDSMLReact = (worker: Worker, onSubmit: (text: string, ast: any) => void) => {
    const wrapperConfig = createLangiumGlobalConfig({
        languageServerId: 'react',
        useLanguageClient: true,
        worker,
        htmlContainer: document.getElementById('monaco-editor-root')!,
        init: true
    });

    const [app, updateText] = createHealthcareDsmlReactComponent(worker, onSubmit, wrapperConfig, '20px', cb => cb('20px'));

    const root = ReactDOM.createRoot(document.getElementById('react-root')!);
    root.render(app);

    return updateText;
};

export const createHealthcareDsmlReactComponent = (
    worker: Worker,
    onSubmit: (text: string, ast: any) => void,
    wrapperConfig: WrapperConfig,
    initHeight: string,
    onInitSetHeightCb: (cb: (height: string) => void) => void
): [React.JSX.Element, () => void] => {
    const wrapperContainer: { wrapper?: MonacoEditorLanguageClientWrapper } = {};
    const triggerValidation = () => {
        if (wrapperContainer.wrapper) {
            const editor = wrapperContainer.wrapper.getEditor();
            editor?.setValue(editor.getValue());
        }
    };

    return [
        <App
            wrapperConfig={wrapperConfig}
            onLoad={wrapper => (wrapperContainer.wrapper = wrapper)}
            onSubmit={onSubmit}
            worker={worker}
            initHeight={initHeight}
            onInitSetHeightCb={onInitSetHeightCb}
        />,
        triggerValidation
    ];
};
