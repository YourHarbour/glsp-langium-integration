import { LangiumDocument, ReferenceInfo, Scope, stream, StreamScope } from 'langium';
import { createAstNodeDescriptions } from '../../framework/common/util/langium-ast.util.js';
import { GlspScopeProvider } from '../../framework/langium/language/index.js';
import { ExternalNodeInformationService } from '../../framework/langium/worker/external-node-information-service.js';

export class HealthcareExternalNodeInformationService extends ExternalNodeInformationService {
    public override getExternalNodeNames(): string[] {
        return ['Test', 'Disease'];
    }
}

export class HealtcareDsmlScopeProvider extends GlspScopeProvider {
    protected override getCustomScope(context: ReferenceInfo, document: LangiumDocument, id: string): Scope | void {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as {
            Test: Record<string, string>;
            Disease: Record<string, string>;
            nodeIdsToTestIds: Record<string, string[]>;
            testIdsToDiseaseIds: Record<string, string[]>;
        };

        // The context-based scope provision needs to be on the level of grammar rules...
        if (context.container.$type === 'TestExecution') {
            // ...and on the level of property
            switch (context.property) {
                case 'test':
                    const availableTests =
                        scopingInformation.nodeIdsToTestIds[id]?.map(testId => [testId, scopingInformation.Test[testId]]) ??
                        Object.entries(scopingInformation.Test);
                    return new StreamScope(stream(createAstNodeDescriptions(document, 'Test', availableTests)));
                case 'disease':
                    const selectedTest = (context.container as any).test?.['$nodeDescription']?.path;
                    if (!selectedTest) {
                        return new StreamScope(stream([]));
                    }
                    const availableDiseases =
                        scopingInformation.testIdsToDiseaseIds[selectedTest]?.map(diseaseId => [
                            diseaseId,
                            scopingInformation.Disease[diseaseId]
                        ]) ?? Object.entries(scopingInformation.Disease);
                    return new StreamScope(stream(createAstNodeDescriptions(document, 'Disease', availableDiseases)));
            }
        }
    }
}
