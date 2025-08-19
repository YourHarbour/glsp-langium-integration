import { DefaultTypes, GEdgeSchema, GModelElementSchema, GModelRootSchema } from '@eclipse-glsp/client';
import { injectable } from 'inversify';
import { LangiumScopingInformationHandler } from '../../framework/glsp/validation/langium-scoping-information.handler.js';
import { HealthcareModelTypes } from '../constants/HealthcareModelTypes.js';
import { getFirstLabel } from '../utils/label.util.js';

@injectable()
export class HealthcareLangiumScopingInformationHandler extends LangiumScopingInformationHandler {
    protected override generateScopingInformation(model: GModelRootSchema) {
        const categorizedModel = this.annotateNeighbours(model);

        const nodeIdsToTestIds: Record<string, string[]> = {};
        const testIdsToDiseaseIds: Record<string, string[]> = {};
        const tests: Record<string, string> = {};
        const diseases: Record<string, string> = {};

        categorizedModel.typeToElements[HealthcareModelTypes.BRANCH_NODE].forEach(node => {
            nodeIdsToTestIds[node.id] = [...new Set(this.extractUsedTests(node))];
        });

        categorizedModel.typeToElements[HealthcareModelTypes.TEST_NODE].forEach(node => {
            testIdsToDiseaseIds[node.id] = [];
            ((node as any).args?.targets ?? []).forEach((target: { id: string }) => {
                testIdsToDiseaseIds[node.id].push(target.id);
            });

            const label = getFirstLabel(node);
            if (label) {
                tests[node.id] = label.text;
            } else {
                console.warn(`Relevant node of type ${node.type} without label`);
            }
        });
        categorizedModel.typeToElements[HealthcareModelTypes.DISEASE_NODE].forEach(node => {
            const label = getFirstLabel(node);
            if (label) {
                diseases[node.id] = label.text;
            } else {
                console.warn(`Relevant node of type ${node.type} without label`);
            }
        });

        return { Test: tests, Disease: diseases, nodeIdsToTestIds, testIdsToDiseaseIds };
    }

    private annotateNeighbours(model: GModelRootSchema) {
        const categorizedModel = {
            idToElement: {} as Record<string, GModelElementSchema>,
            typeToElements: {} as Record<string, GModelElementSchema[]>
        };

        model.children?.forEach(child => {
            if (!categorizedModel.typeToElements[child.type]) {
                categorizedModel.typeToElements[child.type] = [];
            }
            categorizedModel.typeToElements[child.type].push(child);
            categorizedModel.idToElement[child.id] = child;
        });

        categorizedModel.typeToElements[DefaultTypes.EDGE].forEach(ele => {
            const edge = ele as GEdgeSchema;

            const sourceNode = categorizedModel.idToElement[edge.sourceId] as any;
            const targetNode = categorizedModel.idToElement[edge.targetId] as any;

            sourceNode.args = { ...(sourceNode.args ?? {}) };
            sourceNode.args.targets = [...(sourceNode.args.targets ?? []), targetNode];
            targetNode.args = { ...(targetNode.args ?? {}) };
            targetNode.args.sources = [...(targetNode.args.sources ?? []), sourceNode];
        });

        return categorizedModel;
    }

    private extractUsedTests(node: any): string[] {
        const res: string[] = [];

        (node.args?.sources ?? []).forEach((source: { type: string; args: { expression: { tokens: any } } }) => {
            if (source.type === HealthcareModelTypes.ACTION_NODE) {
                (source.args?.expression?.tokens ?? []).forEach((token: { property: string; node: { id: string } }) => {
                    if (token.property === 'test' && token.node) {
                        res.push(token.node.id);
                    }
                });
            }
            res.push(...this.extractUsedTests(source));
        });

        return res;
    }
}
