/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Action Card Condition</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition#getConditionalStatement <em>Conditional Statement</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCardCondition()
 * @model
 * @generated
 */
public interface ActionCardCondition extends Node {
   /**
    * Returns the value of the '<em><b>Conditional Statement</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Conditional Statement</em>' attribute.
    * @see #setConditionalStatement(String)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getActionCardCondition_ConditionalStatement()
    * @model required="true"
    * @generated
    */
   String getConditionalStatement();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition#getConditionalStatement <em>Conditional Statement</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Conditional Statement</em>' attribute.
    * @see #getConditionalStatement()
    * @generated
    */
   void setConditionalStatement(String value);

} // ActionCardCondition
