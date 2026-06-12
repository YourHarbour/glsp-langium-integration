import { createAstNodeDescriptions, UriRegex } from 'glsp-langium-integration/common';
import { ExternalNodeInformationService, GlspScopeComputation, GlspScopeProvider } from 'glsp-langium-integration/langium';
import { AstNodeDescription, LangiumDocument, Reference, ReferenceInfo, Scope, stream, StreamScope } from 'langium';

/** A variable provided by a task node, e.g. `water` with the property `level` (declared as `water:level` on the task) */
export type ProvidedVariable = {
    /** Name of the variable, e.g. `water` */
    name: string;
    /** Name of the property that can be inspected within the variable, e.g. `level` */
    property: string;
};

/**
 * The scoping information sent by the GLSP client.
 *
 * The scope of a conditional edge depends on its position in the graph: a condition may only
 * reference the variables provided by the tasks *upstream* of the edge (e.g. only nodes after
 * `ChkWt` may use `water`). The client therefore computes one variable map per conditional edge:
 * the element id of the edge maps to the variables visible to it (provider node id -> variable).
 */
export type WorkflowScopingInformation = {
    Variable: Record<string, Record<string, ProvidedVariable>>;
};

/** Declares which grammar types are backed by external (GLSP diagram) elements instead of parsed AST nodes */
export class WorkflowExternalNodeInformationService extends ExternalNodeInformationService {
    public override getExternalNodeNames(): string[] {
        return ['Variable', 'Property'];
    }
}

/**
 * Looks up the variables that are in scope for the given document, i.e. the variables provided
 * by the tasks upstream of the conditional edge the document belongs to. The document is tied
 * to its edge via the element id encoded in the document URI (both the batch validation and the
 * Monaco editor documents are named after the edge id).
 */
function getVariablesInScope(scopingInformation: WorkflowScopingInformation | undefined, elementId: string): [string, ProvidedVariable][] {
    return Object.entries(scopingInformation?.Variable?.[elementId] ?? {});
}

/** Descriptions of the variables themselves; the description path carries the provider task node id */
function createVariableDescriptions(document: LangiumDocument, variables: [string, ProvidedVariable][]): AstNodeDescription[] {
    return createAstNodeDescriptions(
        document,
        'Variable',
        variables.map(([nodeId, variable]) => [nodeId, variable.name])
    );
}

/**
 * Descriptions of the properties available *within* the given variables, i.e. the inner scope
 * of a variable reference (`water.level` -> `level` is only visible within `water`).
 */
function createPropertyDescriptions(document: LangiumDocument, variables: [string, ProvidedVariable][]): AstNodeDescription[] {
    return createAstNodeDescriptions(
        document,
        'Property',
        variables.map(([nodeId, variable]) => [nodeId, variable.property])
    );
}

/** Extracts the element id of the owning conditional edge from a document URI */
function getElementId(document: LangiumDocument): string | undefined {
    const match = document.uri.toString().match(UriRegex);
    // Each matching group excludes the other, so only one can be defined
    return match ? match[1] ?? match[2] : undefined;
}

/**
 * Injects the variables (and their properties) visible to a document's conditional edge into the
 * document's exported symbols, so that the linker can resolve references to them.
 *
 * Compared to the framework default, this implementation derives the per-edge scope from the
 * document URI and is defensive against the scoping information not having arrived yet.
 */
export class WorkflowDslScopeComputation extends GlspScopeComputation {
    protected override getCustomNodes(document: LangiumDocument): AstNodeDescription[] {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as WorkflowScopingInformation | undefined;
        const elementId = getElementId(document);
        if (elementId === undefined) {
            return [];
        }
        const variables = getVariablesInScope(scopingInformation, elementId);
        return [...createVariableDescriptions(document, variables), ...createPropertyDescriptions(document, variables)];
    }
}

/**
 * Provides the scopes for the two cross-references of the `Condition` rule, which demonstrate
 * two different kinds of scoping:
 *
 * - `variable` — **external scoping** from the graph topology: exactly the variables provided by
 *   the tasks upstream of the conditional edge being edited or validated.
 * - `property` — **internal scoping** within the referenced element: only the property declared
 *   by the variable that the condition actually references (`water.level` resolves `level`
 *   within `water`, like the former `Beans.amount` resolved `amount` within `Beans`).
 *
 * This single method drives both linking and code completion, so an out-of-scope variable or
 * property is neither suggested nor resolvable (which surfaces as a validation error on the edge).
 */
export class WorkflowDslScopeProvider extends GlspScopeProvider {
    protected override getCustomScope(context: ReferenceInfo, document: LangiumDocument, id: string): Scope | void {
        const scopingInformation = this.glsp.ScopingInformationListener.scopingInformation as WorkflowScopingInformation | undefined;

        if (context.container.$type !== 'Condition') {
            return;
        }
        const visibleVariables = getVariablesInScope(scopingInformation, id);

        if (context.property === 'variable') {
            return new StreamScope(stream(createVariableDescriptions(document, visibleVariables)));
        }

        if (context.property === 'property') {
            // Internal scope: only the properties of the variable this condition references
            const variableReference = (context.container as { variable?: Reference }).variable;
            const referencedName = variableReference?.$refText;
            const referencedVariables = visibleVariables.filter(([, variable]) => variable.name === referencedName);
            return new StreamScope(stream(createPropertyDescriptions(document, referencedVariables)));
        }
    }
}
