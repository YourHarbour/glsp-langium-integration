import { createAstNodeDescriptions } from 'glsp-langium-integration/common';
import { ExternalNodeInformationService, GlspScopeComputation, GlspScopeProvider } from 'glsp-langium-integration/langium';
import { AstNodeDescription, LangiumDocument, ReferenceInfo, Scope, stream, StreamScope } from 'langium';

/**
 * The scoping information sent by the GLSP client: the events and commands declared in the
 * declarations element of the diagram, as maps from declaration id to name.
 *
 * The scope is global — every transition label may reference every declared event and
 * command — so, unlike the workflow example, no per-element filtering is needed.
 */
export type StatemachineScopingInformation = {
    Event: Record<string, string>;
    Command: Record<string, string>;
};

/** Declares which grammar types are backed by external (GLSP diagram) elements instead of parsed AST nodes */
export class StatemachineExternalNodeInformationService extends ExternalNodeInformationService {
    public override getExternalNodeNames(): string[] {
        return ['Event', 'Command'];
    }
}

function createDescriptions(document: LangiumDocument, type: string, entries: Record<string, string> | undefined): AstNodeDescription[] {
    return createAstNodeDescriptions(document, type, Object.entries(entries ?? {}));
}

/**
 * Exports the declared events and commands into every document's symbols, so that the
 * linker can resolve references to them. Defensive against the scoping information not
 * having arrived yet.
 */
export class StatemachineDslScopeComputation extends GlspScopeComputation {
    protected override getCustomNodes(document: LangiumDocument): AstNodeDescription[] {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as StatemachineScopingInformation | undefined;
        return [
            ...createDescriptions(document, 'Event', scopingInformation?.Event),
            ...createDescriptions(document, 'Command', scopingInformation?.Command)
        ];
    }
}

/**
 * Provides the (global) scopes for the two cross-references of the `TransitionSpec` rule:
 * `event` may reference any declared event, `actions` any declared command.
 *
 * The same scope drives both linking and code completion, so the completion popup lists
 * exactly the declared elements — for the `event` reference this is effectively a
 * drop-down over the declared events.
 */
export class StatemachineDslScopeProvider extends GlspScopeProvider {
    protected override getCustomScope(context: ReferenceInfo, document: LangiumDocument, _id: string): Scope | void {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as StatemachineScopingInformation | undefined;

        if (context.container.$type !== 'TransitionSpec') {
            return;
        }
        if (context.property === 'event') {
            return new StreamScope(stream(createDescriptions(document, 'Event', scopingInformation?.Event)));
        }
        if (context.property === 'actions') {
            return new StreamScope(stream(createDescriptions(document, 'Command', scopingInformation?.Command)));
        }
    }
}
