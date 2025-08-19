import { injectable } from 'inversify';
import { LangiumWorkerFactory } from '../../framework/glsp/worker/langium-worker.factory.js';

@injectable()
export class HealthcareLangiumWorkerFactory extends LangiumWorkerFactory {
    public override create(): Worker {
        const workerUrl = new URL('../../../lib/healthcaredsml-server.bundle.js', import.meta.url);

        console.log('Starting HealthcareDSML Server Regular Worker:', workerUrl);

        const worker = new Worker(workerUrl, {
            type: 'module',
            name: 'HealthcareDSML Server Regular'
        });

        return worker;
    }
}
