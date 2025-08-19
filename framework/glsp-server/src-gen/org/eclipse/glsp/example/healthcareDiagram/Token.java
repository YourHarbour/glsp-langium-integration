/**
 */
package org.eclipse.glsp.example.healthcareDiagram;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Token</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.Token#getProperty <em>Property</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getToken()
 * @model interface="true" abstract="true"
 * @generated
 */
public interface Token extends Identifiable {

   /**
    * Returns the value of the '<em><b>Property</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Property</em>' attribute.
    * @see #setProperty(String)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getToken_Property()
    * @model required="true"
    * @generated
    */
   String getProperty();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.Token#getProperty <em>Property</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Property</em>' attribute.
    * @see #getProperty()
    * @generated
    */
   void setProperty(String value);

} // Token
