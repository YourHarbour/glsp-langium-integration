/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Referable Node</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ReferableNode#getText <em>Text</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getReferableNode()
 * @model abstract="true"
 * @generated
 */
public interface ReferableNode extends Node {
   /**
    * Returns the value of the '<em><b>Text</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Text</em>' attribute.
    * @see #setText(String)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getReferableNode_Text()
    * @model required="true"
    * @generated
    */
   String getText();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ReferableNode#getText <em>Text</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Text</em>' attribute.
    * @see #getText()
    * @generated
    */
   void setText(String value);

} // ReferableNode
