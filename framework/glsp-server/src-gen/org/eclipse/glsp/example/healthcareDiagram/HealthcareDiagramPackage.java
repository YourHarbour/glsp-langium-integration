/**
 */
package org.eclipse.glsp.example.healthcareDiagram;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;

/**
 * <!-- begin-user-doc -->
 * The <b>Package</b> for the model.
 * It contains accessors for the meta objects to represent
 * <ul>
 *   <li>each class,</li>
 *   <li>each feature of each class,</li>
 *   <li>each operation of each class,</li>
 *   <li>each enum,</li>
 *   <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramFactory
 * @model kind="package"
 * @generated
 */
public interface HealthcareDiagramPackage extends EPackage {
   /**
    * The package name.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   String eNAME = "healthcareDiagram";

   /**
    * The package namespace URI.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   String eNS_URI = "convertion/healthcare/diagram";

   /**
    * The package namespace name.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   String eNS_PREFIX = "convertion.healthcare.diagram";

   /**
    * The singleton instance of the package.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   HealthcareDiagramPackage eINSTANCE = org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl.init();

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.IdentifiableImpl <em>Identifiable</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.IdentifiableImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getIdentifiable()
    * @generated
    */
   int IDENTIFIABLE = 0;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int IDENTIFIABLE__ID = 0;

   /**
    * The number of structural features of the '<em>Identifiable</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int IDENTIFIABLE_FEATURE_COUNT = 1;

   /**
    * The number of operations of the '<em>Identifiable</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int IDENTIFIABLE_OPERATION_COUNT = 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NameableImpl <em>Nameable</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.NameableImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNameable()
    * @generated
    */
   int NAMEABLE = 1;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NAMEABLE__NAME = 0;

   /**
    * The number of structural features of the '<em>Nameable</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NAMEABLE_FEATURE_COUNT = 1;

   /**
    * The number of operations of the '<em>Nameable</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NAMEABLE_OPERATION_COUNT = 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeImpl <em>Node</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.NodeImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNode()
    * @generated
    */
   int NODE = 2;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE__ID = IDENTIFIABLE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE__NAME = IDENTIFIABLE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_FEATURE_COUNT = IDENTIFIABLE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_OPERATION_COUNT = IDENTIFIABLE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ReferableNodeImpl <em>Referable Node</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ReferableNodeImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getReferableNode()
    * @generated
    */
   int REFERABLE_NODE = 3;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERABLE_NODE__ID = NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERABLE_NODE__NAME = NODE__NAME;

   /**
    * The feature id for the '<em><b>Text</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERABLE_NODE__TEXT = NODE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Referable Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERABLE_NODE_FEATURE_COUNT = NODE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Referable Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERABLE_NODE_OPERATION_COUNT = NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ReferencingNodeImpl <em>Referencing Node</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ReferencingNodeImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getReferencingNode()
    * @generated
    */
   int REFERENCING_NODE = 4;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERENCING_NODE__ID = NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERENCING_NODE__NAME = NODE__NAME;

   /**
    * The feature id for the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERENCING_NODE__EXPRESSION = NODE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Referencing Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERENCING_NODE_FEATURE_COUNT = NODE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Referencing Node</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int REFERENCING_NODE_OPERATION_COUNT = NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl <em>Action Card</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getActionCard()
    * @generated
    */
   int ACTION_CARD = 5;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__ID = NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__NAME = NODE__NAME;

   /**
    * The feature id for the '<em><b>Actions</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__ACTIONS = NODE_FEATURE_COUNT + 0;

   /**
    * The feature id for the '<em><b>Branches</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__BRANCHES = NODE_FEATURE_COUNT + 1;

   /**
    * The feature id for the '<em><b>Admission Actions</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__ADMISSION_ACTIONS = NODE_FEATURE_COUNT + 2;

   /**
    * The feature id for the '<em><b>Discharge Actions</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__DISCHARGE_ACTIONS = NODE_FEATURE_COUNT + 3;

   /**
    * The feature id for the '<em><b>Action Card Condition</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__ACTION_CARD_CONDITION = NODE_FEATURE_COUNT + 4;

   /**
    * The feature id for the '<em><b>Tests</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__TESTS = NODE_FEATURE_COUNT + 5;

   /**
    * The feature id for the '<em><b>Diseases</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__DISEASES = NODE_FEATURE_COUNT + 6;

   /**
    * The feature id for the '<em><b>Edges</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD__EDGES = NODE_FEATURE_COUNT + 7;

   /**
    * The number of structural features of the '<em>Action Card</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_FEATURE_COUNT = NODE_FEATURE_COUNT + 8;

   /**
    * The number of operations of the '<em>Action Card</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_OPERATION_COUNT = NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionImpl <em>Action</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getAction()
    * @generated
    */
   int ACTION = 6;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION__ID = REFERENCING_NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION__NAME = REFERENCING_NODE__NAME;

   /**
    * The feature id for the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION__EXPRESSION = REFERENCING_NODE__EXPRESSION;

   /**
    * The feature id for the '<em><b>Requires Patient</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION__REQUIRES_PATIENT = REFERENCING_NODE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_FEATURE_COUNT = REFERENCING_NODE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_OPERATION_COUNT = REFERENCING_NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.AdmissionActionImpl <em>Admission Action</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.AdmissionActionImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getAdmissionAction()
    * @generated
    */
   int ADMISSION_ACTION = 7;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION__ID = ACTION__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION__NAME = ACTION__NAME;

   /**
    * The feature id for the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION__EXPRESSION = ACTION__EXPRESSION;

   /**
    * The feature id for the '<em><b>Requires Patient</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION__REQUIRES_PATIENT = ACTION__REQUIRES_PATIENT;

   /**
    * The number of structural features of the '<em>Admission Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION_FEATURE_COUNT = ACTION_FEATURE_COUNT + 0;

   /**
    * The number of operations of the '<em>Admission Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ADMISSION_ACTION_OPERATION_COUNT = ACTION_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.DischargeActionImpl <em>Discharge Action</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.DischargeActionImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getDischargeAction()
    * @generated
    */
   int DISCHARGE_ACTION = 8;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION__ID = ACTION__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION__NAME = ACTION__NAME;

   /**
    * The feature id for the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION__EXPRESSION = ACTION__EXPRESSION;

   /**
    * The feature id for the '<em><b>Requires Patient</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION__REQUIRES_PATIENT = ACTION__REQUIRES_PATIENT;

   /**
    * The number of structural features of the '<em>Discharge Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION_FEATURE_COUNT = ACTION_FEATURE_COUNT + 0;

   /**
    * The number of operations of the '<em>Discharge Action</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISCHARGE_ACTION_OPERATION_COUNT = ACTION_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.BranchImpl <em>Branch</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.BranchImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getBranch()
    * @generated
    */
   int BRANCH = 9;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int BRANCH__ID = REFERENCING_NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int BRANCH__NAME = REFERENCING_NODE__NAME;

   /**
    * The feature id for the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int BRANCH__EXPRESSION = REFERENCING_NODE__EXPRESSION;

   /**
    * The number of structural features of the '<em>Branch</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int BRANCH_FEATURE_COUNT = REFERENCING_NODE_FEATURE_COUNT + 0;

   /**
    * The number of operations of the '<em>Branch</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int BRANCH_OPERATION_COUNT = REFERENCING_NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardConditionImpl <em>Action Card Condition</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardConditionImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getActionCardCondition()
    * @generated
    */
   int ACTION_CARD_CONDITION = 10;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_CONDITION__ID = NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_CONDITION__NAME = NODE__NAME;

   /**
    * The feature id for the '<em><b>Conditional Statement</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT = NODE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Action Card Condition</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_CONDITION_FEATURE_COUNT = NODE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Action Card Condition</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int ACTION_CARD_CONDITION_OPERATION_COUNT = NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ConnectEdgeImpl <em>Connect Edge</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ConnectEdgeImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getConnectEdge()
    * @generated
    */
   int CONNECT_EDGE = 11;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int CONNECT_EDGE__ID = IDENTIFIABLE__ID;

   /**
    * The feature id for the '<em><b>Source</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int CONNECT_EDGE__SOURCE = IDENTIFIABLE_FEATURE_COUNT + 0;

   /**
    * The feature id for the '<em><b>Target</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int CONNECT_EDGE__TARGET = IDENTIFIABLE_FEATURE_COUNT + 1;

   /**
    * The number of structural features of the '<em>Connect Edge</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int CONNECT_EDGE_FEATURE_COUNT = IDENTIFIABLE_FEATURE_COUNT + 2;

   /**
    * The number of operations of the '<em>Connect Edge</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int CONNECT_EDGE_OPERATION_COUNT = IDENTIFIABLE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.TestImpl <em>Test</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.TestImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getTest()
    * @generated
    */
   int TEST = 12;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEST__ID = REFERABLE_NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEST__NAME = REFERABLE_NODE__NAME;

   /**
    * The feature id for the '<em><b>Text</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEST__TEXT = REFERABLE_NODE__TEXT;

   /**
    * The number of structural features of the '<em>Test</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEST_FEATURE_COUNT = REFERABLE_NODE_FEATURE_COUNT + 0;

   /**
    * The number of operations of the '<em>Test</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEST_OPERATION_COUNT = REFERABLE_NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.DiseaseImpl <em>Disease</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.DiseaseImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getDisease()
    * @generated
    */
   int DISEASE = 13;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISEASE__ID = REFERABLE_NODE__ID;

   /**
    * The feature id for the '<em><b>Name</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISEASE__NAME = REFERABLE_NODE__NAME;

   /**
    * The feature id for the '<em><b>Text</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISEASE__TEXT = REFERABLE_NODE__TEXT;

   /**
    * The number of structural features of the '<em>Disease</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISEASE_FEATURE_COUNT = REFERABLE_NODE_FEATURE_COUNT + 0;

   /**
    * The number of operations of the '<em>Disease</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int DISEASE_OPERATION_COUNT = REFERABLE_NODE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl <em>Expression</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getExpression()
    * @generated
    */
   int EXPRESSION = 14;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int EXPRESSION__ID = IDENTIFIABLE__ID;

   /**
    * The feature id for the '<em><b>Tokens</b></em>' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int EXPRESSION__TOKENS = IDENTIFIABLE_FEATURE_COUNT + 0;

   /**
    * The feature id for the '<em><b>Rule</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int EXPRESSION__RULE = IDENTIFIABLE_FEATURE_COUNT + 1;

   /**
    * The number of structural features of the '<em>Expression</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int EXPRESSION_FEATURE_COUNT = IDENTIFIABLE_FEATURE_COUNT + 2;

   /**
    * The number of operations of the '<em>Expression</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int EXPRESSION_OPERATION_COUNT = IDENTIFIABLE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.Token <em>Token</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.Token
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getToken()
    * @generated
    */
   int TOKEN = 15;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TOKEN__ID = IDENTIFIABLE__ID;

   /**
    * The feature id for the '<em><b>Property</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TOKEN__PROPERTY = IDENTIFIABLE_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TOKEN_FEATURE_COUNT = IDENTIFIABLE_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TOKEN_OPERATION_COUNT = IDENTIFIABLE_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl <em>Text Token</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getTextToken()
    * @generated
    */
   int TEXT_TOKEN = 16;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEXT_TOKEN__ID = TOKEN__ID;

   /**
    * The feature id for the '<em><b>Property</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEXT_TOKEN__PROPERTY = TOKEN__PROPERTY;

   /**
    * The feature id for the '<em><b>Text</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEXT_TOKEN__TEXT = TOKEN_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Text Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEXT_TOKEN_FEATURE_COUNT = TOKEN_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Text Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int TEXT_TOKEN_OPERATION_COUNT = TOKEN_OPERATION_COUNT + 0;

   /**
    * The meta object id for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl <em>Node Token</em>}' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl
    * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNodeToken()
    * @generated
    */
   int NODE_TOKEN = 17;

   /**
    * The feature id for the '<em><b>Id</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_TOKEN__ID = TOKEN__ID;

   /**
    * The feature id for the '<em><b>Property</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_TOKEN__PROPERTY = TOKEN__PROPERTY;

   /**
    * The feature id for the '<em><b>Node</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_TOKEN__NODE = TOKEN_FEATURE_COUNT + 0;

   /**
    * The number of structural features of the '<em>Node Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_TOKEN_FEATURE_COUNT = TOKEN_FEATURE_COUNT + 1;

   /**
    * The number of operations of the '<em>Node Token</em>' class.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    * @ordered
    */
   int NODE_TOKEN_OPERATION_COUNT = TOKEN_OPERATION_COUNT + 0;


   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Identifiable <em>Identifiable</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Identifiable</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Identifiable
    * @generated
    */
   EClass getIdentifiable();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.Identifiable#getId <em>Id</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Id</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Identifiable#getId()
    * @see #getIdentifiable()
    * @generated
    */
   EAttribute getIdentifiable_Id();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Nameable <em>Nameable</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Nameable</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Nameable
    * @generated
    */
   EClass getNameable();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.Nameable#getName <em>Name</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Name</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Nameable#getName()
    * @see #getNameable()
    * @generated
    */
   EAttribute getNameable_Name();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Node <em>Node</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Node</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Node
    * @generated
    */
   EClass getNode();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.ReferableNode <em>Referable Node</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Referable Node</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferableNode
    * @generated
    */
   EClass getReferableNode();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.ReferableNode#getText <em>Text</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Text</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferableNode#getText()
    * @see #getReferableNode()
    * @generated
    */
   EAttribute getReferableNode_Text();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.ReferencingNode <em>Referencing Node</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Referencing Node</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferencingNode
    * @generated
    */
   EClass getReferencingNode();

   /**
    * Returns the meta object for the containment reference '{@link org.eclipse.glsp.example.healthcareDiagram.ReferencingNode#getExpression <em>Expression</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference '<em>Expression</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ReferencingNode#getExpression()
    * @see #getReferencingNode()
    * @generated
    */
   EReference getReferencingNode_Expression();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard <em>Action Card</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Action Card</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard
    * @generated
    */
   EClass getActionCard();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActions <em>Actions</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Actions</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActions()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_Actions();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getBranches <em>Branches</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Branches</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getBranches()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_Branches();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getAdmissionActions <em>Admission Actions</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Admission Actions</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getAdmissionActions()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_AdmissionActions();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDischargeActions <em>Discharge Actions</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Discharge Actions</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDischargeActions()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_DischargeActions();

   /**
    * Returns the meta object for the containment reference '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActionCardCondition <em>Action Card Condition</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference '<em>Action Card Condition</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActionCardCondition()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_ActionCardCondition();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getTests <em>Tests</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Tests</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getTests()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_Tests();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDiseases <em>Diseases</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Diseases</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDiseases()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_Diseases();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getEdges <em>Edges</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Edges</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCard#getEdges()
    * @see #getActionCard()
    * @generated
    */
   EReference getActionCard_Edges();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Action <em>Action</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Action</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Action
    * @generated
    */
   EClass getAction();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.Action#isRequiresPatient <em>Requires Patient</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Requires Patient</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Action#isRequiresPatient()
    * @see #getAction()
    * @generated
    */
   EAttribute getAction_RequiresPatient();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.AdmissionAction <em>Admission Action</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Admission Action</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.AdmissionAction
    * @generated
    */
   EClass getAdmissionAction();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.DischargeAction <em>Discharge Action</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Discharge Action</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.DischargeAction
    * @generated
    */
   EClass getDischargeAction();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Branch <em>Branch</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Branch</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Branch
    * @generated
    */
   EClass getBranch();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition <em>Action Card Condition</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Action Card Condition</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition
    * @generated
    */
   EClass getActionCardCondition();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition#getConditionalStatement <em>Conditional Statement</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Conditional Statement</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition#getConditionalStatement()
    * @see #getActionCardCondition()
    * @generated
    */
   EAttribute getActionCardCondition_ConditionalStatement();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge <em>Connect Edge</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Connect Edge</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ConnectEdge
    * @generated
    */
   EClass getConnectEdge();

   /**
    * Returns the meta object for the reference '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getSource <em>Source</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the reference '<em>Source</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getSource()
    * @see #getConnectEdge()
    * @generated
    */
   EReference getConnectEdge_Source();

   /**
    * Returns the meta object for the reference '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getTarget <em>Target</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the reference '<em>Target</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getTarget()
    * @see #getConnectEdge()
    * @generated
    */
   EReference getConnectEdge_Target();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Test <em>Test</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Test</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Test
    * @generated
    */
   EClass getTest();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Disease <em>Disease</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Disease</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Disease
    * @generated
    */
   EClass getDisease();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Expression <em>Expression</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Expression</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Expression
    * @generated
    */
   EClass getExpression();

   /**
    * Returns the meta object for the containment reference list '{@link org.eclipse.glsp.example.healthcareDiagram.Expression#getTokens <em>Tokens</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the containment reference list '<em>Tokens</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Expression#getTokens()
    * @see #getExpression()
    * @generated
    */
   EReference getExpression_Tokens();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.Expression#getRule <em>Rule</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Rule</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Expression#getRule()
    * @see #getExpression()
    * @generated
    */
   EAttribute getExpression_Rule();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.Token <em>Token</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Token</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Token
    * @generated
    */
   EClass getToken();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.Token#getProperty <em>Property</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Property</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.Token#getProperty()
    * @see #getToken()
    * @generated
    */
   EAttribute getToken_Property();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.TextToken <em>Text Token</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Text Token</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.TextToken
    * @generated
    */
   EClass getTextToken();

   /**
    * Returns the meta object for the attribute '{@link org.eclipse.glsp.example.healthcareDiagram.TextToken#getText <em>Text</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the attribute '<em>Text</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.TextToken#getText()
    * @see #getTextToken()
    * @generated
    */
   EAttribute getTextToken_Text();

   /**
    * Returns the meta object for class '{@link org.eclipse.glsp.example.healthcareDiagram.NodeToken <em>Node Token</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for class '<em>Node Token</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.NodeToken
    * @generated
    */
   EClass getNodeToken();

   /**
    * Returns the meta object for the reference '{@link org.eclipse.glsp.example.healthcareDiagram.NodeToken#getNode <em>Node</em>}'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the meta object for the reference '<em>Node</em>'.
    * @see org.eclipse.glsp.example.healthcareDiagram.NodeToken#getNode()
    * @see #getNodeToken()
    * @generated
    */
   EReference getNodeToken_Node();

   /**
    * Returns the factory that creates the instances of the model.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the factory that creates the instances of the model.
    * @generated
    */
   HealthcareDiagramFactory getHealthcareDiagramFactory();

   /**
    * <!-- begin-user-doc -->
    * Defines literals for the meta objects that represent
    * <ul>
    *   <li>each class,</li>
    *   <li>each feature of each class,</li>
    *   <li>each operation of each class,</li>
    *   <li>each enum,</li>
    *   <li>and each data type</li>
    * </ul>
    * <!-- end-user-doc -->
    * @generated
    */
   interface Literals {
      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.IdentifiableImpl <em>Identifiable</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.IdentifiableImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getIdentifiable()
       * @generated
       */
      EClass IDENTIFIABLE = eINSTANCE.getIdentifiable();

      /**
       * The meta object literal for the '<em><b>Id</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute IDENTIFIABLE__ID = eINSTANCE.getIdentifiable_Id();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NameableImpl <em>Nameable</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.NameableImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNameable()
       * @generated
       */
      EClass NAMEABLE = eINSTANCE.getNameable();

      /**
       * The meta object literal for the '<em><b>Name</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute NAMEABLE__NAME = eINSTANCE.getNameable_Name();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeImpl <em>Node</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.NodeImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNode()
       * @generated
       */
      EClass NODE = eINSTANCE.getNode();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ReferableNodeImpl <em>Referable Node</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ReferableNodeImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getReferableNode()
       * @generated
       */
      EClass REFERABLE_NODE = eINSTANCE.getReferableNode();

      /**
       * The meta object literal for the '<em><b>Text</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute REFERABLE_NODE__TEXT = eINSTANCE.getReferableNode_Text();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ReferencingNodeImpl <em>Referencing Node</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ReferencingNodeImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getReferencingNode()
       * @generated
       */
      EClass REFERENCING_NODE = eINSTANCE.getReferencingNode();

      /**
       * The meta object literal for the '<em><b>Expression</b></em>' containment reference feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference REFERENCING_NODE__EXPRESSION = eINSTANCE.getReferencingNode_Expression();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl <em>Action Card</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getActionCard()
       * @generated
       */
      EClass ACTION_CARD = eINSTANCE.getActionCard();

      /**
       * The meta object literal for the '<em><b>Actions</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__ACTIONS = eINSTANCE.getActionCard_Actions();

      /**
       * The meta object literal for the '<em><b>Branches</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__BRANCHES = eINSTANCE.getActionCard_Branches();

      /**
       * The meta object literal for the '<em><b>Admission Actions</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__ADMISSION_ACTIONS = eINSTANCE.getActionCard_AdmissionActions();

      /**
       * The meta object literal for the '<em><b>Discharge Actions</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__DISCHARGE_ACTIONS = eINSTANCE.getActionCard_DischargeActions();

      /**
       * The meta object literal for the '<em><b>Action Card Condition</b></em>' containment reference feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__ACTION_CARD_CONDITION = eINSTANCE.getActionCard_ActionCardCondition();

      /**
       * The meta object literal for the '<em><b>Tests</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__TESTS = eINSTANCE.getActionCard_Tests();

      /**
       * The meta object literal for the '<em><b>Diseases</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__DISEASES = eINSTANCE.getActionCard_Diseases();

      /**
       * The meta object literal for the '<em><b>Edges</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference ACTION_CARD__EDGES = eINSTANCE.getActionCard_Edges();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionImpl <em>Action</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getAction()
       * @generated
       */
      EClass ACTION = eINSTANCE.getAction();

      /**
       * The meta object literal for the '<em><b>Requires Patient</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute ACTION__REQUIRES_PATIENT = eINSTANCE.getAction_RequiresPatient();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.AdmissionActionImpl <em>Admission Action</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.AdmissionActionImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getAdmissionAction()
       * @generated
       */
      EClass ADMISSION_ACTION = eINSTANCE.getAdmissionAction();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.DischargeActionImpl <em>Discharge Action</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.DischargeActionImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getDischargeAction()
       * @generated
       */
      EClass DISCHARGE_ACTION = eINSTANCE.getDischargeAction();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.BranchImpl <em>Branch</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.BranchImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getBranch()
       * @generated
       */
      EClass BRANCH = eINSTANCE.getBranch();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardConditionImpl <em>Action Card Condition</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardConditionImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getActionCardCondition()
       * @generated
       */
      EClass ACTION_CARD_CONDITION = eINSTANCE.getActionCardCondition();

      /**
       * The meta object literal for the '<em><b>Conditional Statement</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT = eINSTANCE.getActionCardCondition_ConditionalStatement();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ConnectEdgeImpl <em>Connect Edge</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ConnectEdgeImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getConnectEdge()
       * @generated
       */
      EClass CONNECT_EDGE = eINSTANCE.getConnectEdge();

      /**
       * The meta object literal for the '<em><b>Source</b></em>' reference feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference CONNECT_EDGE__SOURCE = eINSTANCE.getConnectEdge_Source();

      /**
       * The meta object literal for the '<em><b>Target</b></em>' reference feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference CONNECT_EDGE__TARGET = eINSTANCE.getConnectEdge_Target();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.TestImpl <em>Test</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.TestImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getTest()
       * @generated
       */
      EClass TEST = eINSTANCE.getTest();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.DiseaseImpl <em>Disease</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.DiseaseImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getDisease()
       * @generated
       */
      EClass DISEASE = eINSTANCE.getDisease();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl <em>Expression</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getExpression()
       * @generated
       */
      EClass EXPRESSION = eINSTANCE.getExpression();

      /**
       * The meta object literal for the '<em><b>Tokens</b></em>' containment reference list feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference EXPRESSION__TOKENS = eINSTANCE.getExpression_Tokens();

      /**
       * The meta object literal for the '<em><b>Rule</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute EXPRESSION__RULE = eINSTANCE.getExpression_Rule();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.Token <em>Token</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.Token
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getToken()
       * @generated
       */
      EClass TOKEN = eINSTANCE.getToken();

      /**
       * The meta object literal for the '<em><b>Property</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute TOKEN__PROPERTY = eINSTANCE.getToken_Property();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl <em>Text Token</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getTextToken()
       * @generated
       */
      EClass TEXT_TOKEN = eINSTANCE.getTextToken();

      /**
       * The meta object literal for the '<em><b>Text</b></em>' attribute feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EAttribute TEXT_TOKEN__TEXT = eINSTANCE.getTextToken_Text();

      /**
       * The meta object literal for the '{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl <em>Node Token</em>}' class.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl
       * @see org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramPackageImpl#getNodeToken()
       * @generated
       */
      EClass NODE_TOKEN = eINSTANCE.getNodeToken();

      /**
       * The meta object literal for the '<em><b>Node</b></em>' reference feature.
       * <!-- begin-user-doc -->
       * <!-- end-user-doc -->
       * @generated
       */
      EReference NODE_TOKEN__NODE = eINSTANCE.getNodeToken_Node();

   }

} //HealthcareDiagramPackage
