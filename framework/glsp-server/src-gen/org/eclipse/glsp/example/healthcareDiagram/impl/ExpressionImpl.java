/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import java.util.Collection;

import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

import org.eclipse.glsp.example.healthcareDiagram.Expression;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.Token;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Expression</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl#getTokens <em>Tokens</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ExpressionImpl#getRule <em>Rule</em>}</li>
 * </ul>
 *
 * @generated
 */
public class ExpressionImpl extends IdentifiableImpl implements Expression {
   /**
    * The cached value of the '{@link #getTokens() <em>Tokens</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getTokens()
    * @generated
    * @ordered
    */
   protected EList<Token> tokens;

   /**
    * The default value of the '{@link #getRule() <em>Rule</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getRule()
    * @generated
    * @ordered
    */
   protected static final String RULE_EDEFAULT = null;
   /**
    * The cached value of the '{@link #getRule() <em>Rule</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getRule()
    * @generated
    * @ordered
    */
   protected String rule = RULE_EDEFAULT;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected ExpressionImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.EXPRESSION;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<Token> getTokens() {
      if (tokens == null) {
         tokens = new EObjectContainmentEList<Token>(Token.class, this, HealthcareDiagramPackage.EXPRESSION__TOKENS);
      }
      return tokens;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public String getRule() {
      return rule;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setRule(String newRule) {
      String oldRule = rule;
      rule = newRule;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.EXPRESSION__RULE, oldRule, rule));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
      switch (featureID) {
         case HealthcareDiagramPackage.EXPRESSION__TOKENS:
            return ((InternalEList<?>)getTokens()).basicRemove(otherEnd, msgs);
      }
      return super.eInverseRemove(otherEnd, featureID, msgs);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Object eGet(int featureID, boolean resolve, boolean coreType) {
      switch (featureID) {
         case HealthcareDiagramPackage.EXPRESSION__TOKENS:
            return getTokens();
         case HealthcareDiagramPackage.EXPRESSION__RULE:
            return getRule();
      }
      return super.eGet(featureID, resolve, coreType);
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @SuppressWarnings("unchecked")
   @Override
   public void eSet(int featureID, Object newValue) {
      switch (featureID) {
         case HealthcareDiagramPackage.EXPRESSION__TOKENS:
            getTokens().clear();
            getTokens().addAll((Collection<? extends Token>)newValue);
            return;
         case HealthcareDiagramPackage.EXPRESSION__RULE:
            setRule((String)newValue);
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
         case HealthcareDiagramPackage.EXPRESSION__TOKENS:
            getTokens().clear();
            return;
         case HealthcareDiagramPackage.EXPRESSION__RULE:
            setRule(RULE_EDEFAULT);
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
         case HealthcareDiagramPackage.EXPRESSION__TOKENS:
            return tokens != null && !tokens.isEmpty();
         case HealthcareDiagramPackage.EXPRESSION__RULE:
            return RULE_EDEFAULT == null ? rule != null : !RULE_EDEFAULT.equals(rule);
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
      result.append(" (rule: ");
      result.append(rule);
      result.append(')');
      return result.toString();
   }

} //ExpressionImpl
