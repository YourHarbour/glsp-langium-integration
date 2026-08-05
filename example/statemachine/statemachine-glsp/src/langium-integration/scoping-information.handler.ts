import { GModelRootSchema } from '@eclipse-glsp/client';
import { LangiumScopingInformationHandler } from 'glsp-langium-integration/glsp';
import { injectable } from 'inversify';
import type { StatemachineScopingInformation } from '../langium/ls/statemachine-dsl-references.js';
import { computeDeclarationScopes } from './declarations-scope.js';

/**
 * Generates the scoping information for the Langium language server from the current graph
 * model: the events and commands declared in the declarations element of the diagram.
 *
 * The scope is global — every transition label may reference every declared event and
 * command — so, unlike the workflow example, no per-element scope computation is needed.
 */
@injectable()
export class StatemachineLangiumScopingInformationHandler extends LangiumScopingInformationHandler {
    protected override generateScopingInformation(model: GModelRootSchema): StatemachineScopingInformation {
        return computeDeclarationScopes(model);
    }
}
