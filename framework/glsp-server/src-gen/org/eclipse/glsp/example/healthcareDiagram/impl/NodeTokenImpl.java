/**
 */
package org.eclipse.glsp.example.healthcareDiagram.impl;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;

import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.NodeToken;
import org.eclipse.glsp.example.healthcareDiagram.ReferableNode;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Node Token</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl#getProperty <em>Property</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.NodeTokenImpl#getNode <em>Node</em>}</li>
 * </ul>
 *
 * @generated
 */
public class NodeTokenImpl extends IdentifiableImpl implements NodeToken {
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
    * The cached value of the '{@link #getNode() <em>Node</em>}' reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getNode()
    * @generated
    * @ordered
    */
   protected ReferableNode node;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected NodeTokenImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.NODE_TOKEN;
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
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.NODE_TOKEN__PROPERTY, oldProperty, property));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public ReferableNode getNode() {
      if (node != null && node.eIsProxy()) {
         InternalEObject oldNode = (InternalEObject)node;
         node = (ReferableNode)eResolveProxy(oldNode);
         if (node != oldNode) {
            if (eNotificationRequired())
               eNotify(new ENotificationImpl(this, Notification.RESOLVE, HealthcareDiagramPackage.NODE_TOKEN__NODE, oldNode, node));
         }
      }
      return node;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public ReferableNode basicGetNode() {
      return node;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setNode(ReferableNode newNode) {
      ReferableNode oldNode = node;
      node = newNode;
      if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.NODE_TOKEN__NODE, oldNode, node));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public Object eGet(int featureID, boolean resolve, boolean coreType) {
      switch (featureID) {
         case HealthcareDiagramPackage.NODE_TOKEN__PROPERTY:
            return getProperty();
         case HealthcareDiagramPackage.NODE_TOKEN__NODE:
            if (resolve) return getNode();
            return basicGetNode();
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
         case HealthcareDiagramPackage.NODE_TOKEN__PROPERTY:
            setProperty((String)newValue);
            return;
         case HealthcareDiagramPackage.NODE_TOKEN__NODE:
            setNode((ReferableNode)newValue);
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
         case HealthcareDiagramPackage.NODE_TOKEN__PROPERTY:
            setProperty(PROPERTY_EDEFAULT);
            return;
         case HealthcareDiagramPackage.NODE_TOKEN__NODE:
            setNode((ReferableNode)null);
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
         case HealthcareDiagramPackage.NODE_TOKEN__PROPERTY:
            return PROPERTY_EDEFAULT == null ? property != null : !PROPERTY_EDEFAULT.equals(property);
         case HealthcareDiagramPackage.NODE_TOKEN__NODE:
            return node != null;
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
      result.append(')');
      return result.toString();
   }

} //NodeTokenImpl
