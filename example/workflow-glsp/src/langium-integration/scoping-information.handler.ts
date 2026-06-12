import { GModelRootSchema } from '@eclipse-glsp/client';
import { LangiumScopingInformationHandler } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import type { WorkflowScopingInformation } from '../langium/ls/workflow-dsl-references.js';
import { computeConditionalEdgeScopes } from './variable-scope.js';

/**
 * Generates the scoping information for the Langium language server from the current graph model.
 *
 * The scope of a conditional edge is determined by its position in the graph: its condition may
 * only reference the variables provided by the tasks *upstream* of the edge. For every conditional
 * edge, the providers reachable by walking the edges backwards from the edge's source node
 * (including the source node itself) are collected (see {@link computeConditionalEdgeScopes}).
 * A condition after `ChkWt` can therefore use `water`, while a condition after `ChkTp` can use
 * `temperature` — two different scopes within the same diagram.
 */
@injectable()
export class WorkflowLangiumScopingInformationHandler extends LangiumScopingInformationHandler {
    protected override generateScopingInformation(model: GModelRootSchema): WorkflowScopingInformation {
        return { Variable: computeConditionalEdgeScopes(model) };
    }
}
