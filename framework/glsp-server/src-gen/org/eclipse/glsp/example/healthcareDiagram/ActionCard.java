/**
 */
package org.eclipse.glsp.example.healthcareDiagram;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Action Card</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActions <em>Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getBranches <em>Branches</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getAdmissionActions <em>Admission Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDischargeActions <em>Discharge Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActionCardCondition <em>Action Card Condition</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getTests <em>Tests</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getDiseases <em>Diseases</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getEdges <em>Edges</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard()
 * @model
 * @generated
 */
public interface ActionCard extends Node {
   /**
    * Returns the value of the '<em><b>Actions</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.Action}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Actions</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_Actions()
    * @model containment="true"
    * @generated
    */
   EList<Action> getActions();

   /**
    * Returns the value of the '<em><b>Branches</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.Branch}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Branches</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_Branches()
    * @model containment="true"
    * @generated
    */
   EList<Branch> getBranches();

   /**
    * Returns the value of the '<em><b>Admission Actions</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.AdmissionAction}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Admission Actions</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_AdmissionActions()
    * @model containment="true"
    * @generated
    */
   EList<AdmissionAction> getAdmissionActions();

   /**
    * Returns the value of the '<em><b>Discharge Actions</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.DischargeAction}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Discharge Actions</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_DischargeActions()
    * @model containment="true"
    * @generated
    */
   EList<DischargeAction> getDischargeActions();

   /**
    * Returns the value of the '<em><b>Action Card Condition</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Action Card Condition</em>' containment reference.
    * @see #setActionCardCondition(ActionCardCondition)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_ActionCardCondition()
    * @model containment="true"
    * @generated
    */
   ActionCardCondition getActionCardCondition();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCard#getActionCardCondition <em>Action Card Condition</em>}' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Action Card Condition</em>' containment reference.
    * @see #getActionCardCondition()
    * @generated
    */
   void setActionCardCondition(ActionCardCondition value);

   /**
    * Returns the value of the '<em><b>Tests</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.Test}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Tests</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_Tests()
    * @model containment="true"
    * @generated
    */
   EList<Test> getTests();

   /**
    * Returns the value of the '<em><b>Diseases</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.Disease}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Diseases</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_Diseases()
    * @model containment="true"
    * @generated
    */
   EList<Disease> getDiseases();

   /**
    * Returns the value of the '<em><b>Edges</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Edges</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCard_Edges()
    * @model containment="true"
    * @generated
    */
   EList<ConnectEdge> getEdges();

} // ActionCard
