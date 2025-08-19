/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import org.eclipse.glsp.example.healthcareDiagram.Action;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Action</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionImpl#isRequiresPatient <em>Requires Patient</em>}</li>
 * </ul>
 *
 * @generated
 */
public class ActionImpl extends ReferencingNodeImpl implements Action {
   /**
    * The default value of the '{@link #isRequiresPatient() <em>Requires Patient</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #isRequiresPatient()
    * @generated
    * @ordered
    */
   protected static final boolean REQUIRES_PATIENT_EDEFAULT = false;

   /**
    * The cached value of the '{@link #isRequiresPatient() <em>Requires Patient</em>}' attribute.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #isRequiresPatient()
    * @generated
    * @ordered
    */
   protected boolean requiresPatient = REQUIRES_PATIENT_EDEFAULT;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected ActionImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.ACTION;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public boolean isRequiresPatient() {
      return requiresPatient;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setRequiresPatient(boolean newRequiresPatient) {
      boolean oldRequiresPatient = requiresPatient;
      requiresPatient = newRequiresPatient;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.ACTION__REQUIRES_PATIENT, oldRequiresPatient, requiresPatient));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Object eGet(int featureID, boolean resolve, boolean coreType) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION__REQUIRES_PATIENT:
            return isRequiresPatient();
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
         case HealthcareDiagramPackage.ACTION__REQUIRES_PATIENT:
            setRequiresPatient((Boolean)newValue);
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
         case HealthcareDiagramPackage.ACTION__REQUIRES_PATIENT:
            setRequiresPatient(REQUIRES_PATIENT_EDEFAULT);
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
         case HealthcareDiagramPackage.ACTION__REQUIRES_PATIENT:
            return requiresPatient != REQUIRES_PATIENT_EDEFAULT;
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
      result.append(" (requiresPatient: ");
      result.append(requiresPatient);
      result.append(')');
      return result.toString();
   }

} //ActionImpl
