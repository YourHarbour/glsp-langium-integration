import type { GModelElementSchema, GModelRootSchema } from '@eclipse-glsp/client';
import type { StatemachineScopingInformation } from '../langium/ls/statemachine-dsl-references.js';
import { StatemachineLangiumTypes } from './statemachine-langium-types.js';

function toNames(value: unknown): string[] {
    return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];
}

/**
 * Collects the events and commands declared by the declarations elements of the model.
 *
 * The declared names are persisted with the declarations node (they are extracted from the
 * parsed Langium AST when a declarations edit is submitted), so the scope of the transition
 * labels originates from another grammar-controlled textual element: editing the
 * declarations re-generates this scoping information and re-validates all transition
 * labels, where dangling references surface as validation markers.
 */
export function computeDeclarationScopes(model: GModelRootSchema): StatemachineScopingInformation {
    const events: Record<string, string> = {};
    const commands: Record<string, string> = {};

    const visit = (element: GModelElementSchema): void => {
        if (element.type === StatemachineLangiumTypes.DECLARATIONS_NODE) {
            const { events: declaredEvents, commands: declaredCommands } = element as { events?: unknown; commands?: unknown };
            toNames(declaredEvents).forEach(name => (events[name] = name));
            toNames(declaredCommands).forEach(name => (commands[name] = name));
        }
        element.children?.forEach(visit);
    };
    model.children?.forEach(visit);

    return { Event: events, Command: commands };
}
