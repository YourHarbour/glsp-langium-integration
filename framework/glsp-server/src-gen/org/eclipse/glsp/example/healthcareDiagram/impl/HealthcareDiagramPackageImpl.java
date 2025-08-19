/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;

import org.eclipse.emf.ecore.impl.EPackageImpl;

import org.eclipse.glsp.example.healthcareDiagram.Action;
import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.AdmissionAction;
import org.eclipse.glsp.example.healthcareDiagram.Branch;
import org.eclipse.glsp.example.healthcareDiagram.ConnectEdge;
import org.eclipse.glsp.example.healthcareDiagram.DischargeAction;
import org.eclipse.glsp.example.healthcareDiagram.Disease;
import org.eclipse.glsp.example.healthcareDiagram.Expression;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.Identifiable;
import org.eclipse.glsp.example.healthcareDiagram.Nameable;
import org.eclipse.glsp.example.healthcareDiagram.Node;
import org.eclipse.glsp.example.healthcareDiagram.NodeToken;
import org.eclipse.glsp.example.healthcareDiagram.ReferableNode;
import org.eclipse.glsp.example.healthcareDiagram.ReferencingNode;
import org.eclipse.glsp.example.healthcareDiagram.Test;
import org.eclipse.glsp.example.healthcareDiagram.TextToken;
import org.eclipse.glsp.example.healthcareDiagram.Token;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model <b>Package</b>.
 * <!-- end-user-doc -->
 * @generated
 */
public class HealthcareDiagramPackageImpl extends EPackageImpl implements HealthcareDiagramPackage {
   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass identifiableEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass nameableEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass nodeEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass referableNodeEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass referencingNodeEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass actionCardEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass actionEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass admissionActionEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass dischargeActionEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass branchEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass actionCardConditionEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass connectEdgeEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass testEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass diseaseEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass expressionEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass tokenEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass textTokenEClass = null;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private EClass nodeTokenEClass = null;

   /**
    * Creates an instance of the model <b>Package</b>, registered with
    * {@link org.eclipse.emf.ecore.EPackage.Registry EPackage.Registry} by the package
    * package URI value.
    * <p>Note: the correct way to create the package is via the static
    * factory method {@link #init init()}, which also performs
    * initialization of the package, or returns the registered package,
    * if one already exists.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.emf.ecore.EPackage.Registry
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#eNS_URI
    * @see #init()
    * @generated
    */
   private HealthcareDiagramPackageImpl() {
      super(eNS_URI, HealthcareDiagramFactory.eINSTANCE);
   }
   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private static boolean isInited = false;

   /**
    * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
    *
    * <p>This method is used to initialize {@link HealthcareDiagramPackage#eINSTANCE} when that field is accessed.
    * Clients should not invoke it directly. Instead, they should simply access that field to obtain the package.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #eNS_URI
    * @see #createPackageContents()
    * @see #initializePackageContents()
    * @generated
    */
   public static HealthcareDiagramPackage init() {
      if (isInited) return (HealthcareDiagramPackage)EPackage.Registry.INSTANCE.getEPackage(HealthcareDiagramPackage.eNS_URI);

      // Obtain or create and register package
      Object registeredHealthcareDiagramPackage = EPackage.Registry.INSTANCE.get(eNS_URI);
      HealthcareDiagramPackageImpl theHealthcareDiagramPackage = registeredHealthcareDiagramPackage instanceof HealthcareDiagramPackageImpl ? (HealthcareDiagramPackageImpl)registeredHealthcareDiagramPackage : new HealthcareDiagramPackageImpl();

      isInited = true;

      // Create package meta-data objects
      theHealthcareDiagramPackage.createPackageContents();

      // Initialize created meta-data
      theHealthcareDiagramPackage.initializePackageContents();

      // Mark meta-data to indicate it can't be changed
      theHealthcareDiagramPackage.freeze();

      // Update the registry and return the package
      EPackage.Registry.INSTANCE.put(HealthcareDiagramPackage.eNS_URI, theHealthcareDiagramPackage);
      return theHealthcareDiagramPackage;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getIdentifiable() {
      return identifiableEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getIdentifiable_Id() {
      return (EAttribute)identifiableEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getNameable() {
      return nameableEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getNameable_Name() {
      return (EAttribute)nameableEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getNode() {
      return nodeEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getReferableNode() {
      return referableNodeEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getReferableNode_Text() {
      return (EAttribute)referableNodeEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getReferencingNode() {
      return referencingNodeEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getReferencingNode_Expression() {
      return (EReference)referencingNodeEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getActionCard() {
      return actionCardEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_Actions() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_Branches() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(1);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_AdmissionActions() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(2);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_DischargeActions() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(3);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_ActionCardCondition() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(4);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_Tests() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(5);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_Diseases() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(6);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getActionCard_Edges() {
      return (EReference)actionCardEClass.getEStructuralFeatures().get(7);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getAction() {
      return actionEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getAction_RequiresPatient() {
      return (EAttribute)actionEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getAdmissionAction() {
      return admissionActionEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getDischargeAction() {
      return dischargeActionEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getBranch() {
      return branchEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getActionCardCondition() {
      return actionCardConditionEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getActionCardCondition_ConditionalStatement() {
      return (EAttribute)actionCardConditionEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getConnectEdge() {
      return connectEdgeEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getConnectEdge_Source() {
      return (EReference)connectEdgeEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getConnectEdge_Target() {
      return (EReference)connectEdgeEClass.getEStructuralFeatures().get(1);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getTest() {
      return testEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getDisease() {
      return diseaseEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getExpression() {
      return expressionEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getExpression_Tokens() {
      return (EReference)expressionEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getExpression_Rule() {
      return (EAttribute)expressionEClass.getEStructuralFeatures().get(1);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getToken() {
      return tokenEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getToken_Property() {
      return (EAttribute)tokenEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getTextToken() {
      return textTokenEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EAttribute getTextToken_Text() {
      return (EAttribute)textTokenEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EClass getNodeToken() {
      return nodeTokenEClass;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EReference getNodeToken_Node() {
      return (EReference)nodeTokenEClass.getEStructuralFeatures().get(0);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public HealthcareDiagramFactory getHealthcareDiagramFactory() {
      return (HealthcareDiagramFactory)getEFactoryInstance();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private boolean isCreated = false;

   /**
    * Creates the meta-model objects for the package.  This method is
    * guarded to have no affect on any invocation but its first.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public void createPackageContents() {
      if (isCreated) return;
      isCreated = true;

      // Create classes and their features
      identifiableEClass = createEClass(IDENTIFIABLE);
      createEAttribute(identifiableEClass, IDENTIFIABLE__ID);

      nameableEClass = createEClass(NAMEABLE);
      createEAttribute(nameableEClass, NAMEABLE__NAME);

      nodeEClass = createEClass(NODE);

      referableNodeEClass = createEClass(REFERABLE_NODE);
      createEAttribute(referableNodeEClass, REFERABLE_NODE__TEXT);

      referencingNodeEClass = createEClass(REFERENCING_NODE);
      createEReference(referencingNodeEClass, REFERENCING_NODE__EXPRESSION);

      actionCardEClass = createEClass(ACTION_CARD);
      createEReference(actionCardEClass, ACTION_CARD__ACTIONS);
      createEReference(actionCardEClass, ACTION_CARD__BRANCHES);
      createEReference(actionCardEClass, ACTION_CARD__ADMISSION_ACTIONS);
      createEReference(actionCardEClass, ACTION_CARD__DISCHARGE_ACTIONS);
      createEReference(actionCardEClass, ACTION_CARD__ACTION_CARD_CONDITION);
      createEReference(actionCardEClass, ACTION_CARD__TESTS);
      createEReference(actionCardEClass, ACTION_CARD__DISEASES);
      createEReference(actionCardEClass, ACTION_CARD__EDGES);

      actionEClass = createEClass(ACTION);
      createEAttribute(actionEClass, ACTION__REQUIRES_PATIENT);

      admissionActionEClass = createEClass(ADMISSION_ACTION);

      dischargeActionEClass = createEClass(DISCHARGE_ACTION);

      branchEClass = createEClass(BRANCH);

      actionCardConditionEClass = createEClass(ACTION_CARD_CONDITION);
      createEAttribute(actionCardConditionEClass, ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT);

      connectEdgeEClass = createEClass(CONNECT_EDGE);
      createEReference(connectEdgeEClass, CONNECT_EDGE__SOURCE);
      createEReference(connectEdgeEClass, CONNECT_EDGE__TARGET);

      testEClass = createEClass(TEST);

      diseaseEClass = createEClass(DISEASE);

      expressionEClass = createEClass(EXPRESSION);
      createEReference(expressionEClass, EXPRESSION__TOKENS);
      createEAttribute(expressionEClass, EXPRESSION__RULE);

      tokenEClass = createEClass(TOKEN);
      createEAttribute(tokenEClass, TOKEN__PROPERTY);

      textTokenEClass = createEClass(TEXT_TOKEN);
      createEAttribute(textTokenEClass, TEXT_TOKEN__TEXT);

      nodeTokenEClass = createEClass(NODE_TOKEN);
      createEReference(nodeTokenEClass, NODE_TOKEN__NODE);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   private boolean isInitialized = false;

   /**
    * Complete the initialization of the package and its meta-model.  This
    * method is guarded to have no affect on any invocation but its first.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public void initializePackageContents() {
      if (isInitialized) return;
      isInitialized = true;

      // Initialize package
      setName(eNAME);
      setNsPrefix(eNS_PREFIX);
      setNsURI(eNS_URI);

      // Create type parameters

      // Set bounds for type parameters

      // Add supertypes to classes
      nodeEClass.getESuperTypes().add(this.getIdentifiable());
      nodeEClass.getESuperTypes().add(this.getNameable());
      referableNodeEClass.getESuperTypes().add(this.getNode());
      referencingNodeEClass.getESuperTypes().add(this.getNode());
      actionCardEClass.getESuperTypes().add(this.getNode());
      actionEClass.getESuperTypes().add(this.getReferencingNode());
      admissionActionEClass.getESuperTypes().add(this.getAction());
      dischargeActionEClass.getESuperTypes().add(this.getAction());
      branchEClass.getESuperTypes().add(this.getReferencingNode());
      actionCardConditionEClass.getESuperTypes().add(this.getNode());
      connectEdgeEClass.getESuperTypes().add(this.getIdentifiable());
      testEClass.getESuperTypes().add(this.getReferableNode());
      diseaseEClass.getESuperTypes().add(this.getReferableNode());
      expressionEClass.getESuperTypes().add(this.getIdentifiable());
      tokenEClass.getESuperTypes().add(this.getIdentifiable());
      textTokenEClass.getESuperTypes().add(this.getToken());
      nodeTokenEClass.getESuperTypes().add(this.getToken());

      // Initialize classes, features, and operations; add parameters
      initEClass(identifiableEClass, Identifiable.class, "Identifiable", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getIdentifiable_Id(), ecorePackage.getEString(), "id", null, 1, 1, Identifiable.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(nameableEClass, Nameable.class, "Nameable", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getNameable_Name(), ecorePackage.getEString(), "name", null, 1, 1, Nameable.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(nodeEClass, Node.class, "Node", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(referableNodeEClass, ReferableNode.class, "ReferableNode", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getReferableNode_Text(), ecorePackage.getEString(), "text", null, 1, 1, ReferableNode.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(referencingNodeEClass, ReferencingNode.class, "ReferencingNode", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEReference(getReferencingNode_Expression(), this.getExpression(), null, "Expression", null, 1, 1, ReferencingNode.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(actionCardEClass, ActionCard.class, "ActionCard", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEReference(getActionCard_Actions(), this.getAction(), null, "Actions", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_Branches(), this.getBranch(), null, "Branches", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_AdmissionActions(), this.getAdmissionAction(), null, "AdmissionActions", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_DischargeActions(), this.getDischargeAction(), null, "DischargeActions", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_ActionCardCondition(), this.getActionCardCondition(), null, "ActionCardCondition", null, 0, 1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_Tests(), this.getTest(), null, "Tests", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_Diseases(), this.getDisease(), null, "Diseases", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getActionCard_Edges(), this.getConnectEdge(), null, "Edges", null, 0, -1, ActionCard.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(actionEClass, Action.class, "Action", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getAction_RequiresPatient(), ecorePackage.getEBoolean(), "requiresPatient", null, 1, 1, Action.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(admissionActionEClass, AdmissionAction.class, "AdmissionAction", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(dischargeActionEClass, DischargeAction.class, "DischargeAction", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(branchEClass, Branch.class, "Branch", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(actionCardConditionEClass, ActionCardCondition.class, "ActionCardCondition", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getActionCardCondition_ConditionalStatement(), ecorePackage.getEString(), "ConditionalStatement", null, 1, 1, ActionCardCondition.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(connectEdgeEClass, ConnectEdge.class, "ConnectEdge", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEReference(getConnectEdge_Source(), this.getNode(), null, "source", null, 1, 1, ConnectEdge.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEReference(getConnectEdge_Target(), this.getNode(), null, "target", null, 1, 1, ConnectEdge.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(testEClass, Test.class, "Test", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(diseaseEClass, Disease.class, "Disease", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

      initEClass(expressionEClass, Expression.class, "Expression", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEReference(getExpression_Tokens(), this.getToken(), null, "Tokens", null, 0, -1, Expression.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
      initEAttribute(getExpression_Rule(), ecorePackage.getEString(), "rule", null, 1, 1, Expression.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(tokenEClass, Token.class, "Token", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getToken_Property(), ecorePackage.getEString(), "property", null, 1, 1, Token.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(textTokenEClass, TextToken.class, "TextToken", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEAttribute(getTextToken_Text(), ecorePackage.getEString(), "text", null, 1, 1, TextToken.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      initEClass(nodeTokenEClass, NodeToken.class, "NodeToken", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
      initEReference(getNodeToken_Node(), this.getReferableNode(), null, "node", null, 1, 1, NodeToken.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

      // Create resource
      createResource(eNS_URI);
   }

} //HealthcareDiagramPackageImpl
