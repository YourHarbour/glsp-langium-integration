/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { Logger } from 'monaco-languageclient/tools';

console.log('monaco-editor-wrapper/workerFactory:');
export const configureMonacoWorkers = (logger?: Logger) => {
    useWorkerFactory({
        workerOverrides: {
            ignoreMapping: true,
            workerLoaders: 
                {
                    TextMateWorker: () => {
                        console.log('try loading TextMateWorker');
                        const textMateWorker = new Worker(new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url), { type: 'module', name: 'Healthcare Textmate' });
                        textMateWorker.onmessage = (e) => {
                            console.log('TextMateWorker message:', e.data);
                          };
                        textMateWorker.onerror = (e) => {
                            console.error('textmateworker error:', {
                                filename: e.filename,
                                lineno: e.lineno,
                                colno: e.colno,
                                message: e.message,
                                error: e.error
                            });
                        };
                        console.log('textMateWorker:', textMateWorker);
                        return textMateWorker;
                    },
                    TextEditorWorker: () => {
                        const editorWorker = new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module', name: 'Healthcare Editor' });
                        editorWorker.onerror = (e) => {
                            console.error('editorworker error:', {
                                filename: e.filename,
                                lineno: e.lineno,
                                colno: e.colno,
                                message: e.message,
                                error: e.error
                            });
                        };
                        console.log('editorWorker:', editorWorker);
                        return editorWorker;
                    }
                }
        },
        logger
    });
};