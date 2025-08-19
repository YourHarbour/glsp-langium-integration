/**
 */
package org.eclipse.glsp.example.healthcareDiagram;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Expression</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.Expression#getTokens <em>Tokens</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.Expression#getRule <em>Rule</em>}</li>
 * </ul>
 *
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getExpression()
 * @model
 * @generated
 */
public interface Expression extends Identifiable {
   /**
    * Returns the value of the '<em><b>Tokens</b></em>' containment reference list.
    * The list contents are of type {@link org.eclipse.glsp.example.healthcareDiagram.Token}.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Tokens</em>' containment reference list.
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getExpression_Tokens()
    * @model containment="true"
    * @generated
    */
   EList<Token> getTokens();

   /**
    * Returns the value of the '<em><b>Rule</b></em>' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the value of the '<em>Rule</em>' attribute.
    * @see #setRule(String)
    * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage#getExpression_Rule()
    * @model required="true"
    * @generated
    */
   String getRule();

   /**
    * Sets the value of the '{@link org.eclipse.glsp.example.healthcareDiagram.Expression#getRule <em>Rule</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @param value the new value of the '<em>Rule</em>' attribute.
    * @see #getRule()
    * @generated
    */
   void setRule(String value);

} // Expression
