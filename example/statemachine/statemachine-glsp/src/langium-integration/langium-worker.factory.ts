import { LangiumWorkerFactory } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';

/**
 * Creates the web worker running the Langium language server for the statemachine DSL.
 * The worker bundle is built by webpack (see `webpack.config.worker.cjs`) from
 * `src/langium/worker/statemachine-language-server.ts`.
 */
@injectable()
export class StatemachineLangiumWorkerFactory extends LangiumWorkerFactory {
    public override create(): Worker {
        const workerUrl = new URL('../../lib/statemachine-language-server.bundle.js', import.meta.url);

        console.log('Starting StatemachineDSL Language Server Worker:', workerUrl.toString());

        return new Worker(workerUrl, {
            type: 'module',
            name: 'StatemachineDSL Language Server'
        });
    }
}
