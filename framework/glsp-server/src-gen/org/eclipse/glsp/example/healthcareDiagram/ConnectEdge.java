/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Connect Edge</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getSource <em>Source</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getTarget <em>Target</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getConnectEdge()
 * @model
 * @generated
 */
public interface ConnectEdge extends Identifiable {
   /**
    * Returns the value of the '<em><b>Source</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Source</em>' reference.
    * @see #setSource(Node)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getConnectEdge_Source()
    * @model required="true"
    * @generated
    */
   Node getSource();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getSource <em>Source</em>}' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Source</em>' reference.
    * @see #getSource()
    * @generated
    */
   void setSource(Node value);

   /**
    * Returns the value of the '<em><b>Target</b></em>' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Target</em>' reference.
    * @see #setTarget(Node)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getConnectEdge_Target()
    * @model required="true"
    * @generated
    */
   Node getTarget();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.ConnectEdge#getTarget <em>Target</em>}' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Target</em>' reference.
    * @see #getTarget()
    * @generated
    */
   void setTarget(Node value);

} // ConnectEdge
