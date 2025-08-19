/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

/// <reference lib="WebWorker" />

import { start, messageReader } from './healthcaredsml-server-start.js';

declare const self: DedicatedWorkerGlobalScope;

self.onmessage = async (event: MessageEvent) => {
    const data = event.data;
    console.log(event.data);
    if (data.port !== undefined) {
        start(data.port, 'healthcaredsml-server-port');

        messageReader?.listen((message) => {
            console.log('Received message from main thread:', message);
        });

        setTimeout(() => {
            // test independent communication
            self.postMessage('started');
        }, 1000);
    }
};

export const workerPortUrl = new URL('./healthcaredsml-server-port.js', import.meta.url).href;
console.log(workerPortUrl);