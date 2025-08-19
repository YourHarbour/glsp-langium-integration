/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Action</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.Action#isRequiresPatient <em>Requires Patient</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getAction()
 * @model
 * @generated
 */
public interface Action extends ReferencingNode {
   /**
    * Returns the value of the '<em><b>Requires Patient</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Requires Patient</em>' attribute.
    * @see #setRequiresPatient(boolean)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getAction_RequiresPatient()
    * @model required="true"
    * @generated
    */
   boolean isRequiresPatient();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.Action#isRequiresPatient <em>Requires Patient</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Requires Patient</em>' attribute.
    * @see #isRequiresPatient()
    * @generated
    */
   void setRequiresPatient(boolean value);

} // Action
