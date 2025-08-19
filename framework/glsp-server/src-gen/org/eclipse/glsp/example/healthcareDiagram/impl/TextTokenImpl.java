/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.TextToken;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Text Token</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl#getProperty <em>Property</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.TextTokenImpl#getText <em>Text</em>}</li>
 * </ul>
 *
 * @generated
 */
public class TextTokenImpl extends IdentifiableImpl implements TextToken {
   /**
    * The default value of the '{@link #getProperty() <em>Property</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getProperty()
    * @generated
    * @ordered
    */
   protected static final String PROPERTY_EDEFAULT = null;

   /**
    * The cached value of the '{@link #getProperty() <em>Property</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getProperty()
    * @generated
    * @ordered
    */
   protected String property = PROPERTY_EDEFAULT;

   /**
    * The default value of the '{@link #getText() <em>Text</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getText()
    * @generated
    * @ordered
    */
   protected static final String TEXT_EDEFAULT = null;

   /**
    * The cached value of the '{@link #getText() <em>Text</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getText()
    * @generated
    * @ordered
    */
   protected String text = TEXT_EDEFAULT;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected TextTokenImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.TEXT_TOKEN;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public String getProperty() {
      return property;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setProperty(String newProperty) {
      String oldProperty = property;
      property = newProperty;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.TEXT_TOKEN__PROPERTY, oldProperty, property));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public String getText() {
      return text;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setText(String newText) {
      String oldText = text;
      text = newText;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.TEXT_TOKEN__TEXT, oldText, text));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Object eGet(int featureID, boolean resolve, boolean coreType) {
      switch (featureID) {
         case HealthcareDiagramPackage.TEXT_TOKEN__PROPERTY:
            return getProperty();
         case HealthcareDiagramPackage.TEXT_TOKEN__TEXT:
            return getText();
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
         case HealthcareDiagramPackage.TEXT_TOKEN__PROPERTY:
            setProperty((String)newValue);
            return;
         case HealthcareDiagramPackage.TEXT_TOKEN__TEXT:
            setText((String)newValue);
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
         case HealthcareDiagramPackage.TEXT_TOKEN__PROPERTY:
            setProperty(PROPERTY_EDEFAULT);
            return;
         case HealthcareDiagramPackage.TEXT_TOKEN__TEXT:
            setText(TEXT_EDEFAULT);
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
         case HealthcareDiagramPackage.TEXT_TOKEN__PROPERTY:
            return PROPERTY_EDEFAULT == null ? property != null : !PROPERTY_EDEFAULT.equals(property);
         case HealthcareDiagramPackage.TEXT_TOKEN__TEXT:
            return TEXT_EDEFAULT == null ? text != null : !TEXT_EDEFAULT.equals(text);
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
      result.append(" (property: ");
      result.append(property);
      result.append(", text: ");
      result.append(text);
      result.append(')');
      return result.toString();
   }

} //TextTokenImpl
