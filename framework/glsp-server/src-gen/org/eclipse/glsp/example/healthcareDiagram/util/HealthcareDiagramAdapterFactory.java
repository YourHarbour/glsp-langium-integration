/**
 */
package org.eclipse.glsp.example.healthcareDiagram.util;

import org.eclipse.emf.common.notify.Adapter;
import org.eclipse.emf.common.notify.Notifier;

import org.eclipse.emf.common.notify.impl.AdapterFactoryImpl;

import org.eclipse.emf.ecore.EObject;

import org.eclipse.glsp.example.healthcareDiagram.*;

/**
 * <!-- begin-user-doc -->
 * The <b>Adapter Factory</b> for the model.
 * It provides an adapter <code>createXXX</code> method for each class of the model.
 * <!-- end-user-doc -->
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage
 * @generated
 */
public class HealthcareDiagramAdapterFactory extends AdapterFactoryImpl {
   /**
    * The cached model package.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected static HealthcareDiagramPackage modelPackage;

   /**
    * Creates an instance of the adapter factory.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public HealthcareDiagramAdapterFactory() {
      if (modelPackage == null) {
         modelPackage = HealthcareDiagramPackage.eINSTANCE;
      }
   }

   /**
    * Returns whether this factory is applicable for the type of the object.
    * <!-- begin-user-doc -->
    * This implementation returns <code>true</code> if the object is either the model's package or is an instance object of the model.
    * <!-- end-user-doc -->
    * @return whether this factory is applicable for the type of the object.
    * @generated
    */
   @Override
   public boolean isFactoryForType(Object object) {
      if (object == modelPackage) {
         return true;
      }
      if (object instanceof EObject) {
         return ((EObject)object).eClass().getEPackage() == modelPackage;
      }
      return false;
   }

   /**
    * The switch that delegates to the <code>createXXX</code> methods.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected HealthcareDiagramSwitch<Adapter> modelSwitch =
      new HealthcareDiagramSwitch<Adapter>() {
         @Override
         public Adapter caseIdentifiable(Identifiable object) {
            return createIdentifiableAdapter();
         }
         @Override
         public Adapter caseNameable(Nameable object) {
            return createNameableAdapter();
         }
         @Override
         public Adapter caseNode(Node object) {
            return createNodeAdapter();
         }
         @Override
         public Adapter caseReferableNode(ReferableNode object) {
            return createReferableNodeAdapter();
         }
         @Override
         public Adapter caseReferencingNode(ReferencingNode object) {
            return createReferencingNodeAdapter();
         }
         @Override
         public Adapter caseActionCard(ActionCard object) {
            return createActionCardAdapter();
         }
         @Override
         public Adapter caseAction(Action object) {
            return createActionAdapter();
         }
         @Override
         public Adapter caseAdmissionAction(AdmissionAction object) {
            return createAdmissionActionAdapter();
         }
         @Override
         public Adapter caseDischargeAction(DischargeAction object) {
            return createDischargeActionAdapter();
         }
         @Override
         public Adapter caseBranch(Branch object) {
            return createBranchAdapter();
         }
         @Override
         public Adapter caseActionCardCondition(ActionCardCondition object) {
            return createActionCardConditionAdapter();
         }
         @Override
         public Adapter caseConnectEdge(ConnectEdge object) {
            return createConnectEdgeAdapter();
         }
         @Override
         public Adapter caseTest(Test object) {
            return createTestAdapter();
         }
         @Override
         public Adapter caseDisease(Disease object) {
            return createDiseaseAdapter();
         }
         @Override
         public Adapter caseExpression(Expression object) {
            return createExpressionAdapter();
         }
         @Override
         public Adapter caseToken(Token object) {
            return createTokenAdapter();
         }
         @Override
         public Adapter caseTextToken(TextToken object) {
            return createTextTokenAdapter();
         }
         @Override
         public Adapter caseNodeToken(NodeToken object) {
            return createNodeTokenAdapter();
         }
         @Override
         public Adapter defaultCase(EObject object) {
            return createEObjectAdapter();
         }
      };

   /**
    * Creates an adapter for the <code>target</code>.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param target the object to adapt.
    * @return the adapter for the <code>target</code>.
    * @generated
    */
   @Override
   public Adapter createAdapter(Notifier target) {
      return modelSwitch.doSwitch((EObject)target);
   }


   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Identifiable <em>Identifiable</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Identifiable
    * @generated
    */
   public Adapter createIdentifiableAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Nameable <em>Nameable</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Nameable
    * @generated
    */
   public Adapter createNameableAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Node <em>Node</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Node
    * @generated
    */
   public Adapter createNodeAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.ReferableNode <em>Referable Node</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferableNode
    * @generated
    */
   public Adapter createReferableNodeAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.ReferencingNode <em>Referencing Node</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferencingNode
    * @generated
    */
   public Adapter createReferencingNodeAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard <em>Action Card</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard
    * @generated
    */
   public Adapter createActionCardAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Action <em>Action</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Action
    * @generated
    */
   public Adapter createActionAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.AdmissionAction <em>Admission Action</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.AdmissionAction
    * @generated
    */
   public Adapter createAdmissionActionAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.DischargeAction <em>Discharge Action</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.DischargeAction
    * @generated
    */
   public Adapter createDischargeActionAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Branch <em>Branch</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Branch
    * @generated
    */
   public Adapter createBranchAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition <em>Action Card Condition</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition
    * @generated
    */
   public Adapter createActionCardConditionAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge <em>Connect Edge</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.ConnectEdge
    * @generated
    */
   public Adapter createConnectEdgeAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Test <em>Test</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Test
    * @generated
    */
   public Adapter createTestAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Disease <em>Disease</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Disease
    * @generated
    */
   public Adapter createDiseaseAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Expression <em>Expression</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Expression
    * @generated
    */
   public Adapter createExpressionAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.Token <em>Token</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.Token
    * @generated
    */
   public Adapter createTokenAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.TextToken <em>Text Token</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.TextToken
    * @generated
    */
   public Adapter createTextTokenAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for an object of class '{@link org.eclipse.glsp.example.healthcareDiagram.NodeToken <em>Node Token</em>}'.
    * <!-- begin-user-doc -->
    * This default implementation returns null so that we can easily ignore cases;
    * it's useful to ignore a case when inheritance will catch all the cases anyway.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @see org.eclipse.glsp.example.healthcareDiagram.NodeToken
    * @generated
    */
   public Adapter createNodeTokenAdapter() {
      return null;
   }

   /**
    * Creates a new adapter for the default case.
    * <!-- begin-user-doc -->
    * This default implementation returns null.
    * <!-- end-user-doc -->
    * @return the new adapter.
    * @generated
    */
   public Adapter createEObjectAdapter() {
      return null;
   }

} //HealthcareDiagramAdapterFactory
