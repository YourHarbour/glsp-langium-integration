import { LangiumCoreServices, LangiumDefaultCoreServices, Module } from 'langium';
import {
    DefaultModuleContext,
    DefaultSharedModuleContext,
    LangiumLSPServices,
    LangiumServices,
    LangiumSharedServices,
    PartialLangiumServices,
    createDefaultModule,
    createDefaultSharedModule
} from 'langium/lsp';
import { GlspLangiumSharedGlspServices, GlspLangiumSharedServices, GlspServiceInjectors } from '../../common/types/types.js';
import { GlspLinker, GlspScopeComputation, GlspScopeProvider } from '../language/index.js';
import { BatchValidationHandler } from './batch-validation-handler.js';
import { BatchValidationListener } from './batch-validation-listener.js';
import { DocumentAstHandler } from './document-ast-handler.js';
import { ExternalNodeInformationService } from './external-node-information-service.js';
import { GlspConnection } from './glsp-connection.js';
import { ScopingInformationListener } from './validation-information-listener.js';

/** Creates an dependency injection module of the shared services that contains our custom services */
export function createGlspSharedModule(
    context: DefaultSharedModuleContext,
    glspServices: GlspServiceInjectors = {}
): Module<GlspLangiumSharedServices, LangiumSharedServices & GlspLangiumSharedGlspServices> {
    return Module.merge(createDefaultSharedModule(context), createGlspSharedGlspModule(glspServices)) as Module<
        GlspLangiumSharedServices,
        LangiumSharedServices & GlspLangiumSharedGlspServices
    >;
}

function createGlspSharedGlspModule(glspServices: GlspServiceInjectors): Module<GlspLangiumSharedServices, GlspLangiumSharedGlspServices> {
    return {
        glsp: {
            BatchValidationHandler: services => glspServices.BatchValidationHandler?.(services) ?? new BatchValidationHandler(services),
            DocumentAstHandler: services => glspServices.DocumentAstHandler?.(services) ?? new DocumentAstHandler(services),
            ScopingInformationListener: services =>
                glspServices.ScopingInformationListener?.(services) ?? new ScopingInformationListener(services),
            BatchValidationListener: services => glspServices.BatchValidationListener?.(services) ?? new BatchValidationListener(services),
            GlspConnection: services => glspServices.GlspConnection?.(services) ?? new GlspConnection(services),
            ExternalNodeInformationService: services =>
                glspServices.ExternalNodeInformationService?.(services) ?? new ExternalNodeInformationService(services)
        }
    };
}

/** Creates an dependency injection module of language-specific services that contains our custom services */
export function createGlspModule(context: DefaultModuleContext): Module<LangiumServices, LangiumDefaultCoreServices & LangiumLSPServices> {
    return Module.merge(createDefaultModule(context), createGlspCoreModule());
}

function createGlspCoreModule(): Module<LangiumCoreServices, PartialLangiumServices> {
    return {
        references: {
            ScopeComputation: services => new GlspScopeComputation(services),
            ScopeProvider: services => new GlspScopeProvider(services),
            Linker: services => new GlspLinker(services)
        }
    };
}
