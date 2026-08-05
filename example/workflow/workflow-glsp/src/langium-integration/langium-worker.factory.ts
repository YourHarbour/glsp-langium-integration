import { LangiumWorkerFactory } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';

/**
 * Creates the web worker running the Langium language server for the workflow DSL.
 * The worker bundle is built by webpack (see `webpack.config.worker.cjs`) from
 * `src/langium/worker/workflow-language-server.ts`.
 */
@injectable()
export class WorkflowLangiumWorkerFactory extends LangiumWorkerFactory {
    public override create(): Worker {
        const workerUrl = new URL('../../lib/workflow-language-server.bundle.js', import.meta.url);

        console.log('Starting WorkflowDSL Language Server Worker:', workerUrl.toString());

        return new Worker(workerUrl, {
            type: 'module',
            name: 'WorkflowDSL Language Server'
        });
    }
}
