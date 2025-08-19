/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Referencing Node</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ReferencingNode#getExpression <em>Expression</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getReferencingNode()
 * @model abstract="true"
 * @generated
 */
public interface ReferencingNode extends Node {
   /**
    * Returns the value of the '<em><b>Expression</b></em>' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Expression</em>' containment reference.
    * @see #setExpression(Expression)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getReferencingNode_Expression()
    * @model containment="true" required="true"
    * @generated
    */
   Expression getExpression();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ReferencingNode#getExpression <em>Expression</em>}' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Expression</em>' containment reference.
    * @see #getExpression()
    * @generated
    */
   void setExpression(Expression value);

} // ReferencingNode
