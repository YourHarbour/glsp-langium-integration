package org.eclipse.glsp.example.javaemf;

import org.eclipse.glsp.example.editActionCardCondition.ActionCardConditionEditContextProvider;
import org.eclipse.glsp.example.editActionCardCondition.ActionCardConditionValidator;
import org.eclipse.glsp.example.editActionCardCondition.EditActionCardConditionOperationHandler;
import org.eclipse.glsp.example.editBranch.BranchEditContextProvider;
import org.eclipse.glsp.example.editBranch.BranchValidator;
import org.eclipse.glsp.example.editBranch.EditBranchOperationHandler;
import org.eclipse.glsp.example.javaemf.handler.ChangeRoutinePointsOperationHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateActionCardConditionNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateActionNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateAdmissionActionNodeHandler;
// import org.eclipse.glsp.example.javaemf.handler.CreateActionCardNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateBranchNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateDischargeActionNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateDiseaseNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateEdgeHandler;
import org.eclipse.glsp.example.javaemf.handler.CreateTestNodeHandler;
import org.eclipse.glsp.example.javaemf.handler.DeleteElementOperationHandler;
import org.eclipse.glsp.example.javaemf.handler.LabelEditHandler;
import org.eclipse.glsp.example.javaemf.langiumedit.ApplyLangiumEditHandler;
import org.eclipse.glsp.example.javaemf.model.HealthcareGModelFactory;
import org.eclipse.glsp.example.javaemf.model.HealthcareSourceModelStorage;
import org.eclipse.glsp.example.javaemf.palette.HealthcareToolPaletteItemProvider;
import org.eclipse.glsp.server.di.MultiBinding;
import org.eclipse.glsp.server.diagram.DiagramConfiguration;
import org.eclipse.glsp.server.emf.EMFIdGenerator;
import org.eclipse.glsp.server.emf.EMFSourceModelStorage;
import org.eclipse.glsp.server.emf.idgen.AttributeIdGenerator;
import org.eclipse.glsp.server.emf.notation.EMFNotationDiagramModule;
import org.eclipse.glsp.server.features.contextactions.ContextActionsProvider;
import org.eclipse.glsp.server.features.core.model.GModelFactory;
import org.eclipse.glsp.server.features.directediting.ContextEditValidator;
import org.eclipse.glsp.server.features.toolpalette.ToolPaletteItemProvider;
import org.eclipse.glsp.server.operations.OperationHandler;

public class HealthcareDiagramModule extends EMFNotationDiagramModule {

    @Override
    protected Class<? extends EMFIdGenerator> bindEMFIdGenerator() {
        return AttributeIdGenerator.class;
    }

    @Override
    protected Class<? extends EMFSourceModelStorage> bindSourceModelStorage() {
        // ensure our custom package is registered when loading our models
        return HealthcareSourceModelStorage.class;
    }

    @Override
    protected Class<? extends DiagramConfiguration> bindDiagramConfiguration() {
        return HealthcareDiagramConfiguration.class;
    }

    @Override
    protected Class<? extends GModelFactory> bindGModelFactory() {
        return HealthcareGModelFactory.class;
    }

    @Override
    public String getDiagramType() { return "healthcare-dsml-diagram"; }

    @Override
    protected Class<? extends ToolPaletteItemProvider> bindToolPaletteItemProvider() {
        return HealthcareToolPaletteItemProvider.class;
    }

    @Override
    protected void configureOperationHandlers(final MultiBinding<OperationHandler<?>> binding) {
        super.configureOperationHandlers(binding);
        // binding.add(CreateActionCardNodeHandler.class);
        binding.add(CreateBranchNodeHandler.class);
        // binding.add(CreateBranchHandler.class);
        binding.add(CreateActionNodeHandler.class);
        binding.add(CreateActionCardConditionNodeHandler.class);
        binding.add(CreateAdmissionActionNodeHandler.class);
        binding.add(CreateTestNodeHandler.class);
        binding.add(CreateDiseaseNodeHandler.class);
        // binding.add(CreateActionCardConditionNodeHandler.class);
        // binding.add(CreateDiagnosticConditionEdgeHandler.class);
        binding.add(CreateEdgeHandler.class);
        binding.add(ChangeRoutinePointsOperationHandler.class);
        binding.add(DeleteElementOperationHandler.class);
        binding.add(LabelEditHandler.class);
        binding.add(CreateDischargeActionNodeHandler.class);
        binding.add(EditActionCardConditionOperationHandler.class);
        binding.add(EditBranchOperationHandler.class);
        binding.add(ApplyLangiumEditHandler.class);
    }



    @Override
    protected void configureContextActionsProviders(final MultiBinding<ContextActionsProvider> binding) {
        super.configureContextActionsProviders(binding);
        binding.add(ActionCardConditionEditContextProvider.class);
        binding.add(BranchEditContextProvider.class);
    }

    @Override
    protected void configureContextEditValidators(final MultiBinding<ContextEditValidator> binding) {
        super.configureContextEditValidators(binding);
        binding.add(ActionCardConditionValidator.class);
        binding.add(BranchValidator.class);
    }
}
