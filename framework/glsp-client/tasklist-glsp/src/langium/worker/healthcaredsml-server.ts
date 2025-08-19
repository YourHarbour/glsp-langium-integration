/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

/// <reference lib="WebWorker" />
console.log('Worker file loading: at the top of healthcaredsml-server.ts');
import { EmptyFileSystem } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { startGlspLanguageServer } from '../../framework/langium/worker/start.js';
import { createHealthcareDsmlServices } from '../ls/healthcare-dsml-module.js';
console.log('createHealthcareDsmlServices will be invoked');
console.log('createHealthcareDsmlServices invoked');

declare const self: DedicatedWorkerGlobalScope;

self.addEventListener('error', e => {
    console.error('Worker global error event:', e);
});
self.addEventListener('unhandledrejection', e => {
    console.error('Worker unhandled rejection:', e.reason);
});
export let messageReader: BrowserMessageReader | undefined;
export let messageWriter: BrowserMessageWriter | undefined;

console.log('Starting healthcaredsml-server...');
/* browser specific setup code */
messageReader = new BrowserMessageReader(self);
messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

// Inject the shared services and language-specific services
const { shared } = createHealthcareDsmlServices({ connection, ...EmptyFileSystem });

// Start the language server with the shared services
startGlspLanguageServer(shared);
