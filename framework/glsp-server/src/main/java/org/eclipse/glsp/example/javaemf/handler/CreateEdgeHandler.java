/********************************************************************************
 * Copyright (c) 2022 Harsh Deshpande, EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
package org.eclipse.glsp.example.javaemf.handler;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

import org.eclipse.emf.common.command.Command;
import org.eclipse.emf.common.command.CompoundCommand;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.edit.command.AddCommand;
import org.eclipse.emf.edit.domain.EditingDomain;
import org.eclipse.glsp.example.healthcareDiagram.*;
import org.eclipse.glsp.example.javaemf.HealthcareModelTypes;
import org.eclipse.glsp.example.javaemf.helper.FindObjectById;
import org.eclipse.glsp.graph.GraphPackage;
import org.eclipse.glsp.server.emf.EMFCreateOperationHandler;
import org.eclipse.glsp.server.emf.EMFIdGenerator;
import org.eclipse.glsp.server.emf.model.notation.Diagram;
import org.eclipse.glsp.server.emf.model.notation.Edge;
import org.eclipse.glsp.server.emf.model.notation.NotationElement;
import org.eclipse.glsp.server.emf.model.notation.NotationFactory;
import org.eclipse.glsp.server.emf.model.notation.NotationPackage;
import org.eclipse.glsp.server.emf.model.notation.SemanticElementReference;
import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.operations.CreateEdgeOperation;

import com.google.inject.Inject;

public class CreateEdgeHandler extends EMFCreateOperationHandler<CreateEdgeOperation> {

   @Inject
   protected EMFNotationModelState modelState;

   @Inject
   protected EMFIdGenerator idGenerator;

   public CreateEdgeHandler() {
      super(HealthcareModelTypes.DIA_EDGE);
   }

   @Override
   public Optional<Command> createCommand(final CreateEdgeOperation operation) {
      ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
      Diagram diagram = modelState.getNotationModel();
      EditingDomain editingDomain = modelState.getEditingDomain();

      String sourceId = operation.getSourceElementId();
      String targetId = operation.getTargetElementId();

      Identifiable source = FindObjectById.findObjectById(actionCard, sourceId);
      Identifiable target = FindObjectById.findObjectById(actionCard, targetId);

      if (source == null || target == null) {
         throw new IllegalAccessError("Source or target not found");
      }

      ConnectEdge newTransition = createConnectEdge((Node) source, (Node) target);
      Command transitionCommand = AddCommand.create(editingDomain, actionCard,
         HealthcareDiagramPackage.Literals.ACTION_CARD__EDGES, newTransition);

      Edge newEdge = createEdge(idGenerator.getOrCreateId(newTransition));
      Command edgeCommand = AddCommand.create(editingDomain, diagram, NotationPackage.Literals.DIAGRAM__ELEMENTS,
         newEdge);

      CompoundCommand compoundCommand = new CompoundCommand();
      compoundCommand.append(transitionCommand);
      compoundCommand.append(edgeCommand);
      return Optional.of(compoundCommand);
   }

   @Override
   public String getLabel() { return "Connect Edge"; }

   protected NotationElement findGNodeById(final EList<NotationElement> eList, final String elementId) {
      return eList.stream().filter(node -> elementId.equals(node.getSemanticElement().getElementId())).findFirst()
         .orElse(null);
   }

   protected ConnectEdge createConnectEdge(final Node source, final Node target) {
      ConnectEdge newEdge = HealthcareDiagramFactory.eINSTANCE.createConnectEdge();
      newEdge.setId(UUID.randomUUID().toString());
      newEdge.setSource(source);
      newEdge.setTarget(target);
      return newEdge;
   }

   protected Edge createEdge(final String elementId) {
      Edge newEdge = NotationFactory.eINSTANCE.createEdge();
      SemanticElementReference reference = NotationFactory.eINSTANCE.createSemanticElementReference();
      reference.setElementId(elementId);
      newEdge.setSemanticElement(reference);
      return newEdge;
   }
}
