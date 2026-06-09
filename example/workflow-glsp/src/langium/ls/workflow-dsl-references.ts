import { createAstNodeDescriptions } from 'glsp-langium-integration/common';
import { ExternalNodeInformationService, GlspScopeComputation, GlspScopeProvider } from 'glsp-langium-integration/langium';
import { AstNodeDescription, LangiumDocument, ReferenceInfo, Scope, stream, StreamScope } from 'langium';

/**
 * The scoping information sent by the GLSP client.
 * Maps the type name used in the grammar to id/name pairs of the diagram elements.
 */
export type WorkflowScopingInformation = {
    InventoryItem: Record<string, string>;
};

/** Declares which grammar types are backed by external (GLSP diagram) elements instead of parsed AST nodes */
export class WorkflowExternalNodeInformationService extends ExternalNodeInformationService {
    public override getExternalNodeNames(): string[] {
        return ['InventoryItem'];
    }
}

/**
 * Injects the inventory items received from the GLSP client into the exported symbols of each document,
 * so that the linker can resolve references to them.
 *
 * Compared to the framework default, this implementation is defensive against the scoping information
 * not having arrived yet.
 */
export class WorkflowDslScopeComputation extends GlspScopeComputation {
    protected override getCustomNodes(document: LangiumDocument): AstNodeDescription[] {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as WorkflowScopingInformation | undefined;
        const externalNodeNames = this.glsp.ExternalNodeInformationService.getExternalNodeNames();

        const externalNodeDescriptions: AstNodeDescription[] = [];

        externalNodeNames.forEach(name => {
            const externalNodes = (scopingInformation as any)?.[name] ?? {};
            externalNodeDescriptions.push(...createAstNodeDescriptions(document, name, Object.entries(externalNodes)));
        });

        return externalNodeDescriptions;
    }
}

/**
 * Provides the scope for the `item` cross-reference of the `Condition` rule, i.e. all inventory items
 * currently present on the diagram, based on the latest scoping information from the GLSP client.
 */
export class WorkflowDslScopeProvider extends GlspScopeProvider {
    protected override getCustomScope(context: ReferenceInfo, document: LangiumDocument, id: string): Scope | void {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as WorkflowScopingInformation | undefined;

        if (context.container.$type === 'Condition' && context.property === 'item') {
            const availableItems = Object.entries(scopingInformation?.InventoryItem ?? {});
            return new StreamScope(stream(createAstNodeDescriptions(document, 'InventoryItem', availableItems)));
        }
    }
}
