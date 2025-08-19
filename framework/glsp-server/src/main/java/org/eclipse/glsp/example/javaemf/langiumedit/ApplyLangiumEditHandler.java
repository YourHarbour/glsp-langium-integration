package org.eclipse.glsp.example.javaemf.langiumedit;

import com.google.inject.Inject;
import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.common.command.CompoundCommand;
import org.eclipse.emf.edit.command.SetCommand;
import org.eclipse.glsp.example.healthcareDiagram.*;
import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.server.emf.EMFOperationHandler;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class ApplyLangiumEditHandler extends EMFOperationHandler<ApplyLangiumEditOperation> {

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public Optional<Command> createCommand(ApplyLangiumEditOperation operation) {
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        Identifiable identifiable = FindObjectById.findObjectById(actionCard, operation.getElementId());

        Expression expression = HealthcareDiagramFactory.eINSTANCE.createExpression();
        expression.setId(UUID.randomUUID().toString());
        expression.setRule(operation.getRule());

        List<Token> tokens = operation.getTokens().stream().map(clientToken -> {
            Token modelToken;
            if (clientToken.isNodeToken()) {
                NodeToken nodeToken = HealthcareDiagramFactory.eINSTANCE.createNodeToken();
                nodeToken.setNode((ReferableNode) FindObjectById.findObjectById(actionCard, clientToken.node()));
                modelToken = nodeToken;
            } else {
                TextToken textToken = HealthcareDiagramFactory.eINSTANCE.createTextToken();
                textToken.setText(clientToken.text());
                modelToken = textToken;
            }
            modelToken.setId(UUID.randomUUID().toString());
            modelToken.setProperty(clientToken.property());
            return modelToken;
        }).toList();

        expression.getTokens().addAll(tokens);

        Command setExpressionCommand = SetCommand.create(modelState.getEditingDomain(), identifiable, HealthcareDiagramPackage.Literals.REFERENCING_NODE__EXPRESSION, expression);
        Command setNameCommand = SetCommand.create(modelState.getEditingDomain(), identifiable, HealthcareDiagramPackage.Literals.NAMEABLE__NAME, operation.getText());

        CompoundCommand compoundCommand = new CompoundCommand();
        compoundCommand.append(setExpressionCommand);
        compoundCommand.append(setNameCommand);
        return Optional.of(compoundCommand);
    }

}
