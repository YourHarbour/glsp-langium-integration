/// <reference lib="WebWorker" />
import { startGlspLanguageServer } from 'glsp-langium-integration/langium';
import { EmptyFileSystem } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createStatemachineDslServices } from '../ls/statemachine-dsl-module.js';

declare const self: DedicatedWorkerGlobalScope;

self.addEventListener('error', e => {
    console.error('Statemachine DSL worker global error event:', e);
});
self.addEventListener('unhandledrejection', e => {
    console.error('Statemachine DSL worker unhandled rejection:', e.reason);
});

console.log('Starting statemachine-language-server...');

/* browser specific setup code */
const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

// Inject the shared services and language-specific services
const { shared } = createStatemachineDslServices({ connection, ...EmptyFileSystem });

// Start the language server with the shared services
startGlspLanguageServer(shared);
