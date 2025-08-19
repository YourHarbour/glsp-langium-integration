/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Node Token</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.NodeToken#getNode <em>Node</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getNodeToken()
 * @model
 * @generated
 */
public interface NodeToken extends Token {
   /**
    * Returns the value of the '<em><b>Node</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Node</em>' reference.
    * @see #setNode(ReferableNode)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getNodeToken_Node()
    * @model required="true"
    * @generated
    */
   ReferableNode getNode();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.NodeToken#getNode <em>Node</em>}' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Node</em>' reference.
    * @see #getNode()
    * @generated
    */
   void setNode(ReferableNode value);

} // NodeToken
