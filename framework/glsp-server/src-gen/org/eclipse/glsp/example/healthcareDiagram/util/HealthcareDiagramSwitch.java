/**
 */
package org.eclipse.glsp.example.healthcareDiagram.util;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;

import org.eclipse.emf.ecore.util.Switch;

import org.eclipse.glsp.example.healthcareDiagram.*;

/**
 * <!-- begin-user-doc -->
 * The <b>Switch</b> for the model's inheritance hierarchy.
 * It supports the call {@link #doSwitch(EObject) doSwitch(object)}
 * to invoke the <code>caseXXX</code> method for each class of the model,
 * starting with the actual class of the object
 * and proceeding up the inheritance hierarchy
 * until a non-null result is returned,
 * which is the result of the switch.
 * <!-- end-user-doc -->
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage
 * @generated
 */
public class HealthcareDiagramSwitch<T> extends Switch<T> {
   /**
    * The cached model package
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected static HealthcareDiagramPackage modelPackage;

   /**
    * Creates an instance of the switch.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public HealthcareDiagramSwitch() {
      if (modelPackage == null) {
         modelPackage = HealthcareDiagramPackage.eINSTANCE;
      }
   }

   /**
    * Checks whether this is a switch for the given package.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param ePackage the package in question.
    * @return whether this is a switch for the given package.
    * @generated
    */
   @Override
   protected boolean isSwitchFor(EPackage ePackage) {
      return ePackage == modelPackage;
   }

   /**
    * Calls <code>caseXXX</code> for each class of the model until one returns a non null result; it yields that result.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the first non-null result returned by a <code>caseXXX</code> call.
    * @generated
    */
   @Override
   protected T doSwitch(int classifierID, EObject theEObject) {
      switch (classifierID) {
         case HealthcareDiagramPackage.IDENTIFIABLE: {
            Identifiable identifiable = (Identifiable)theEObject;
            T result = caseIdentifiable(identifiable);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.NAMEABLE: {
            Nameable nameable = (Nameable)theEObject;
            T result = caseNameable(nameable);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.NODE: {
            Node node = (Node)theEObject;
            T result = caseNode(node);
            if (result == null) result = caseIdentifiable(node);
            if (result == null) result = caseNameable(node);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.REFERABLE_NODE: {
            ReferableNode referableNode = (ReferableNode)theEObject;
            T result = caseReferableNode(referableNode);
            if (result == null) result = caseNode(referableNode);
            if (result == null) result = caseIdentifiable(referableNode);
            if (result == null) result = caseNameable(referableNode);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.REFERENCING_NODE: {
            ReferencingNode referencingNode = (ReferencingNode)theEObject;
            T result = caseReferencingNode(referencingNode);
            if (result == null) result = caseNode(referencingNode);
            if (result == null) result = caseIdentifiable(referencingNode);
            if (result == null) result = caseNameable(referencingNode);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.ACTION_CARD: {
            ActionCard actionCard = (ActionCard)theEObject;
            T result = caseActionCard(actionCard);
            if (result == null) result = caseNode(actionCard);
            if (result == null) result = caseIdentifiable(actionCard);
            if (result == null) result = caseNameable(actionCard);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.ACTION: {
            Action action = (Action)theEObject;
            T result = caseAction(action);
            if (result == null) result = caseReferencingNode(action);
            if (result == null) result = caseNode(action);
            if (result == null) result = caseIdentifiable(action);
            if (result == null) result = caseNameable(action);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.ADMISSION_ACTION: {
            AdmissionAction admissionAction = (AdmissionAction)theEObject;
            T result = caseAdmissionAction(admissionAction);
            if (result == null) result = caseAction(admissionAction);
            if (result == null) result = caseReferencingNode(admissionAction);
            if (result == null) result = caseNode(admissionAction);
            if (result == null) result = caseIdentifiable(admissionAction);
            if (result == null) result = caseNameable(admissionAction);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.DISCHARGE_ACTION: {
            DischargeAction dischargeAction = (DischargeAction)theEObject;
            T result = caseDischargeAction(dischargeAction);
            if (result == null) result = caseAction(dischargeAction);
            if (result == null) result = caseReferencingNode(dischargeAction);
            if (result == null) result = caseNode(dischargeAction);
            if (result == null) result = caseIdentifiable(dischargeAction);
            if (result == null) result = caseNameable(dischargeAction);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.BRANCH: {
            Branch branch = (Branch)theEObject;
            T result = caseBranch(branch);
            if (result == null) result = caseReferencingNode(branch);
            if (result == null) result = caseNode(branch);
            if (result == null) result = caseIdentifiable(branch);
            if (result == null) result = caseNameable(branch);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION: {
            ActionCardCondition actionCardCondition = (ActionCardCondition)theEObject;
            T result = caseActionCardCondition(actionCardCondition);
            if (result == null) result = caseNode(actionCardCondition);
            if (result == null) result = caseIdentifiable(actionCardCondition);
            if (result == null) result = caseNameable(actionCardCondition);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.CONNECT_EDGE: {
            ConnectEdge connectEdge = (ConnectEdge)theEObject;
            T result = caseConnectEdge(connectEdge);
            if (result == null) result = caseIdentifiable(connectEdge);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.TEST: {
            Test test = (Test)theEObject;
            T result = caseTest(test);
            if (result == null) result = caseReferableNode(test);
            if (result == null) result = caseNode(test);
            if (result == null) result = caseIdentifiable(test);
            if (result == null) result = caseNameable(test);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.DISEASE: {
            Disease disease = (Disease)theEObject;
            T result = caseDisease(disease);
            if (result == null) result = caseReferableNode(disease);
            if (result == null) result = caseNode(disease);
            if (result == null) result = caseIdentifiable(disease);
            if (result == null) result = caseNameable(disease);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.EXPRESSION: {
            Expression expression = (Expression)theEObject;
            T result = caseExpression(expression);
            if (result == null) result = caseIdentifiable(expression);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.TOKEN: {
            Token token = (Token)theEObject;
            T result = caseToken(token);
            if (result == null) result = caseIdentifiable(token);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.TEXT_TOKEN: {
            TextToken textToken = (TextToken)theEObject;
            T result = caseTextToken(textToken);
            if (result == null) result = caseToken(textToken);
            if (result == null) result = caseIdentifiable(textToken);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         case HealthcareDiagramPackage.NODE_TOKEN: {
            NodeToken nodeToken = (NodeToken)theEObject;
            T result = caseNodeToken(nodeToken);
            if (result == null) result = caseToken(nodeToken);
            if (result == null) result = caseIdentifiable(nodeToken);
            if (result == null) result = defaultCase(theEObject);
            return result;
         }
         default: return defaultCase(theEObject);
      }
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Identifiable</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Identifiable</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseIdentifiable(Identifiable object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Nameable</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Nameable</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseNameable(Nameable object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Node</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Node</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseNode(Node object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Referable Node</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Referable Node</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseReferableNode(ReferableNode object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Referencing Node</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Referencing Node</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseReferencingNode(ReferencingNode object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Action Card</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Action Card</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseActionCard(ActionCard object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Action</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Action</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseAction(Action object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Admission Action</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Admission Action</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseAdmissionAction(AdmissionAction object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Discharge Action</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Discharge Action</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseDischargeAction(DischargeAction object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Branch</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Branch</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseBranch(Branch object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Action Card Condition</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Action Card Condition</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseActionCardCondition(ActionCardCondition object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Connect Edge</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Connect Edge</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseConnectEdge(ConnectEdge object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Test</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Test</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseTest(Test object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Disease</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Disease</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseDisease(Disease object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Expression</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Expression</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseExpression(Expression object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Token</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Token</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseToken(Token object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Text Token</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Text Token</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseTextToken(TextToken object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>Node Token</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>Node Token</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
    * @generated
    */
   public T caseNodeToken(NodeToken object) {
      return null;
   }

   /**
    * Returns the result of interpreting the object as an instance of '<em>EObject</em>'.
    * <!-- begin-user-doc -->
    * This implementation returns null;
    * returning a non-null result will terminate the switch, but this is the last case anyway.
    * <!-- end-user-doc -->
    * @param object the target of the switch.
    * @return the result of interpreting the object as an instance of '<em>EObject</em>'.
    * @see #doSwitch(org.eclipse.emf.ecore.EObject)
    * @generated
    */
   @Override
   public T defaultCase(EObject object) {
      return null;
   }

} //HealthcareDiagramSwitch
