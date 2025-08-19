/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Action Card Condition</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardConditionImpl#getConditionalStatement <em>Conditional Statement</em>}</li>
 * </ul>
 *
 * @generated
 */
public class ActionCardConditionImpl extends NodeImpl implements ActionCardCondition {
   /**
    * The default value of the '{@link #getConditionalStatement() <em>Conditional Statement</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getConditionalStatement()
    * @generated
    * @ordered
    */
   protected static final String CONDITIONAL_STATEMENT_EDEFAULT = null;

   /**
    * The cached value of the '{@link #getConditionalStatement() <em>Conditional Statement</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getConditionalStatement()
    * @generated
    * @ordered
    */
   protected String conditionalStatement = CONDITIONAL_STATEMENT_EDEFAULT;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected ActionCardConditionImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.ACTION_CARD_CONDITION;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public String getConditionalStatement() {
      return conditionalStatement;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setConditionalStatement(String newConditionalStatement) {
      String oldConditionalStatement = conditionalStatement;
      conditionalStatement = newConditionalStatement;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT, oldConditionalStatement, conditionalStatement));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Object eGet(int featureID, boolean resolve, boolean coreType) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT:
            return getConditionalStatement();
      }
      return super.eGet(featureID, resolve, coreType);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void eSet(int featureID, Object newValue) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT:
            setConditionalStatement((String)newValue);
            return;
      }
      super.eSet(featureID, newValue);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void eUnset(int featureID) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT:
            setConditionalStatement(CONDITIONAL_STATEMENT_EDEFAULT);
            return;
      }
      super.eUnset(featureID);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public boolean eIsSet(int featureID) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION_CARD_CONDITION__CONDITIONAL_STATEMENT:
            return CONDITIONAL_STATEMENT_EDEFAULT == null ? conditionalStatement != null : !CONDITIONAL_STATEMENT_EDEFAULT.equals(conditionalStatement);
      }
      return super.eIsSet(featureID);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public String toString() {
      if (eIsProxy()) return super.toString();

      StringBuilder result = new StringBuilder(super.toString());
      result.append(" (ConditionalStatement: ");
      result.append(conditionalStatement);
      result.append(')');
      return result.toString();
   }

} //ActionCardConditionImpl
