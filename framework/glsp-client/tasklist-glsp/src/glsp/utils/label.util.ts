import { DefaultTypes, GChildElement, GLabelSchema, GModelElementSchema } from '@eclipse-glsp/client';
import { HealthcareModelTypes } from '../constants/HealthcareModelTypes.js';

export function getFirstLabel(node: GModelElementSchema | GChildElement): { id: string; text: string } | undefined {
    if (node.type === DefaultTypes.LABEL || node.type === HealthcareModelTypes.MONACO_LABEL) {
        const { id, text } = node as GLabelSchema;
        return { id, text };
    }

    for (const child of node.children || []) {
        const label = getFirstLabel(child);
        if (label) {
            return label;
        }
    }

    return undefined;
}
