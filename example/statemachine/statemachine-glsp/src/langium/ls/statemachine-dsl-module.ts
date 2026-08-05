import { createGlspModule, createGlspSharedModule } from 'glsp-langium-integration/langium';
import { inject, type Module } from 'langium';
import { type DefaultSharedModuleContext, type LangiumServices, type PartialLangiumServices } from 'langium/lsp';
import {
    StatemachineDeclarationsDSLGeneratedModule,
    StatemachineDslGeneratedSharedModule,
    StatemachineTransitionDSLGeneratedModule
} from './generated/module.js';
import {
    StatemachineDslScopeComputation,
    StatemachineDslScopeProvider,
    StatemachineExternalNodeInformationService
} from './statemachine-dsl-references.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type StatemachineDslAddedServices = {};

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type StatemachineDslServices = LangiumServices & StatemachineDslAddedServices;

/**
 * Dependency injection module shared by both sub-languages. The declarations language has
 * no cross-references, so the GLSP-aware scoping services only take effect for the
 * transition label language.
 */
export const StatemachineDslModule: Module<StatemachineDslServices, PartialLangiumServices & StatemachineDslAddedServices> = {
    references: {
        ScopeComputation: services => new StatemachineDslScopeComputation(services),
        ScopeProvider: services => new StatemachineDslScopeProvider(services)
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * The statemachine example registers two sub-languages — the declarations language and the
 * transition label language — in a single shared service registry: one language server
 * worker serves both, with the file extension of a document selecting the grammar.
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createStatemachineDslServices(context: DefaultSharedModuleContext) {
    const shared = inject(
        createGlspSharedModule(context, {
            ExternalNodeInformationService: services => new StatemachineExternalNodeInformationService(services)
        }),
        StatemachineDslGeneratedSharedModule
    );

    const StatemachineDeclarationsDSL = inject(
        createGlspModule({ shared }),
        StatemachineDeclarationsDSLGeneratedModule,
        StatemachineDslModule
    );
    const StatemachineTransitionDSL = inject(createGlspModule({ shared }), StatemachineTransitionDSLGeneratedModule, StatemachineDslModule);

    shared.ServiceRegistry.register(StatemachineDeclarationsDSL);
    shared.ServiceRegistry.register(StatemachineTransitionDSL);

    if (!context.connection) {
        // We don't run inside a language server
        // Therefore, initialize the configuration provider instantly
        shared.workspace.ConfigurationProvider.initialized({});
    }
    return { shared, StatemachineDeclarationsDSL, StatemachineTransitionDSL };
}
