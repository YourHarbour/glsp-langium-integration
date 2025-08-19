/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */


// import { workerUrl } from '../../lib/healthcaredsml-server.bundle.js';


export const loadHealthcareDSMLWorkerRegular = () => {

    // const testWorkerUrl = new URL('./worker/test-worker.js', import.meta.url);
    // const w = new Worker(testWorkerUrl, { type: 'module' });
    // w.onmessage = e => console.log('Received from minimal worker:', e.data);
    // w.onerror = e => console.error('Minimal worker error:', e);


    // Language Server preparation
    // const workerUrl = new URL('./worker/healthcaredsml-server.js', import.meta.url);
    const workerUrl = new URL('../../lib/healthcaredsml-server.bundle.js', import.meta.url);

    console.log('Starting HealthcareDSML Server Regular Worker:', workerUrl);

    const worker = new Worker(workerUrl, {
        type: 'module',
        name: 'HealthcareDSML Server Regular',
    });

    return worker;
};
