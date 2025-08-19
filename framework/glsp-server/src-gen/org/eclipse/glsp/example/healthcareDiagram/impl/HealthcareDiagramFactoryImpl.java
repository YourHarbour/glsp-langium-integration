/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;

import org.eclipse.emf.ecore.impl.EFactoryImpl;

import org.eclipse.emf.ecore.plugin.EcorePlugin;

import org.eclipse.glsp.example.healthcareDiagram.*;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model <b>Factory</b>.
 * <!-- end-user-doc -->
 * @generated
 */
public class HealthcareDiagramFactoryImpl extends EFactoryImpl implements HealthcareDiagramFactory {
   /**
    * Creates the default factory implementation.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public static HealthcareDiagramFactory init() {
      try {
         HealthcareDiagramFactory theHealthcareDiagramFactory = (HealthcareDiagramFactory)EPackage.Registry.INSTANCE.getEFactory(HealthcareDiagramPackage.eNS_URI);
         if (theHealthcareDiagramFactory != null) {
            return theHealthcareDiagramFactory;
         }
      }
      catch (Exception exception) {
         EcorePlugin.INSTANCE.log(exception);
      }
      return new HealthcareDiagramFactoryImpl();
   }

   /**
    * Creates an instance of the factory.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public HealthcareDiagramFactoryImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EObject create(EClass eClass) {
      switch (eClass.getClassifierID()) {
         case HealthcareDiagramPackage.ACTION_CARD: return createActionCard();
         case HealthcareDiagramPackage.ACTION: return createAction();
         case HealthcareDiagramPackage.ADMISSION_ACTION: return createAdmissionAction();
         case HealthcareDiagramPackage.DISCHARGE_ACTION: return createDischargeAction();
         case HealthcareDiagramPackage.BRANCH: return createBranch();
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION: return createActionCardCondition();
         case HealthcareDiagramPackage.CONNECT_EDGE: return createConnectEdge();
         case HealthcareDiagramPackage.TEST: return createTest();
         case HealthcareDiagramPackage.DISEASE: return createDisease();
         case HealthcareDiagramPackage.EXPRESSION: return createExpression();
         case HealthcareDiagramPackage.TEXT_TOKEN: return createTextToken();
         case HealthcareDiagramPackage.NODE_TOKEN: return createNodeToken();
         default:
            throw new IllegalArgumentException("The class '" + eClass.getName() + "' is not a valid classifier");
      }
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public ActionCard createActionCard() {
      ActionCardImpl actionCard = new ActionCardImpl();
      return actionCard;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Action createAction() {
      ActionImpl action = new ActionImpl();
      return action;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public AdmissionAction createAdmissionAction() {
      AdmissionActionImpl admissionAction = new AdmissionActionImpl();
      return admissionAction;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public DischargeAction createDischargeAction() {
      DischargeActionImpl dischargeAction = new DischargeActionImpl();
      return dischargeAction;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Branch createBranch() {
      BranchImpl branch = new BranchImpl();
      return branch;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public ActionCardCondition createActionCardCondition() {
      ActionCardConditionImpl actionCardCondition = new ActionCardConditionImpl();
      return actionCardCondition;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public ConnectEdge createConnectEdge() {
      ConnectEdgeImpl connectEdge = new ConnectEdgeImpl();
      return connectEdge;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Test createTest() {
      TestImpl test = new TestImpl();
      return test;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Disease createDisease() {
      DiseaseImpl disease = new DiseaseImpl();
      return disease;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Expression createExpression() {
      ExpressionImpl expression = new ExpressionImpl();
      return expression;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public TextToken createTextToken() {
      TextTokenImpl textToken = new TextTokenImpl();
      return textToken;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public NodeToken createNodeToken() {
      NodeTokenImpl nodeToken = new NodeTokenImpl();
      return nodeToken;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public HealthcareDiagramPackage getHealthcareDiagramPackage() {
      return (HealthcareDiagramPackage)getEPackage();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @deprecated
    * @generated
    */
   @Deprecated
   public static HealthcareDiagramPackage getPackage() {
      return HealthcareDiagramPackage.eINSTANCE;
   }

} //HealthcareDiagramFactoryImpl
