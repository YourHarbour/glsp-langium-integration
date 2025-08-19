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

import org.eclipse.glsp.example.healthcareDiagram.Action;
import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.ActionCardCondition;
import org.eclipse.glsp.example.healthcareDiagram.AdmissionAction;
import org.eclipse.glsp.example.healthcareDiagram.Branch;
import org.eclipse.glsp.example.healthcareDiagram.ConnectEdge;
import org.eclipse.glsp.example.healthcareDiagram.DischargeAction;
import org.eclipse.glsp.example.healthcareDiagram.Disease;
import org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage;
import org.eclipse.glsp.example.healthcareDiagram.Test;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Action Card</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getActions <em>Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getBranches <em>Branches</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getAdmissionActions <em>Admission Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getDischargeActions <em>Discharge Actions</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getActionCardCondition <em>Action Card Condition</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getTests <em>Tests</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getDiseases <em>Diseases</em>}</li>
 *   <li>{@link org.eclipse.glsp.example.healthcareDiagram.impl.ActionCardImpl#getEdges <em>Edges</em>}</li>
 * </ul>
 *
 * @generated
 */
public class ActionCardImpl extends NodeImpl implements ActionCard {
   /**
    * The cached value of the '{@link #getActions() <em>Actions</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getActions()
    * @generated
    * @ordered
    */
   protected EList<Action> actions;

   /**
    * The cached value of the '{@link #getBranches() <em>Branches</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getBranches()
    * @generated
    * @ordered
    */
   protected EList<Branch> branches;

   /**
    * The cached value of the '{@link #getAdmissionActions() <em>Admission Actions</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getAdmissionActions()
    * @generated
    * @ordered
    */
   protected EList<AdmissionAction> admissionActions;

   /**
    * The cached value of the '{@link #getDischargeActions() <em>Discharge Actions</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getDischargeActions()
    * @generated
    * @ordered
    */
   protected EList<DischargeAction> dischargeActions;

   /**
    * The cached value of the '{@link #getActionCardCondition() <em>Action Card Condition</em>}' containment reference.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getActionCardCondition()
    * @generated
    * @ordered
    */
   protected ActionCardCondition actionCardCondition;

   /**
    * The cached value of the '{@link #getTests() <em>Tests</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getTests()
    * @generated
    * @ordered
    */
   protected EList<Test> tests;

   /**
    * The cached value of the '{@link #getDiseases() <em>Diseases</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getDiseases()
    * @generated
    * @ordered
    */
   protected EList<Disease> diseases;

   /**
    * The cached value of the '{@link #getEdges() <em>Edges</em>}' containment reference list.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @see #getEdges()
    * @generated
    * @ordered
    */
   protected EList<ConnectEdge> edges;

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   protected ActionCardImpl() {
      super();
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   protected EClass eStaticClass() {
      return HealthcareDiagramPackage.Literals.ACTION_CARD;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<Action> getActions() {
      if (actions == null) {
         actions = new EObjectContainmentEList<Action>(Action.class, this, HealthcareDiagramPackage.ACTION_CARD__ACTIONS);
      }
      return actions;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<Branch> getBranches() {
      if (branches == null) {
         branches = new EObjectContainmentEList<Branch>(Branch.class, this, HealthcareDiagramPackage.ACTION_CARD__BRANCHES);
      }
      return branches;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<AdmissionAction> getAdmissionActions() {
      if (admissionActions == null) {
         admissionActions = new EObjectContainmentEList<AdmissionAction>(AdmissionAction.class, this, HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS);
      }
      return admissionActions;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<DischargeAction> getDischargeActions() {
      if (dischargeActions == null) {
         dischargeActions = new EObjectContainmentEList<DischargeAction>(DischargeAction.class, this, HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS);
      }
      return dischargeActions;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public ActionCardCondition getActionCardCondition() {
      return actionCardCondition;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   public NotificationChain basicSetActionCardCondition(ActionCardCondition newActionCardCondition, NotificationChain msgs) {
      ActionCardCondition oldActionCardCondition = actionCardCondition;
      actionCardCondition = newActionCardCondition;
      if (eNotificationRequired()) {
         ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION, oldActionCardCondition, newActionCardCondition);
         if (msgs == null) msgs = notification; else msgs.add(notification);
      }
      return msgs;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public void setActionCardCondition(ActionCardCondition newActionCardCondition) {
      if (newActionCardCondition != actionCardCondition) {
         NotificationChain msgs = null;
         if (actionCardCondition != null)
            msgs = ((InternalEObject)actionCardCondition).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION, null, msgs);
         if (newActionCardCondition != null)
            msgs = ((InternalEObject)newActionCardCondition).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION, null, msgs);
         msgs = basicSetActionCardCondition(newActionCardCondition, msgs);
         if (msgs != null) msgs.dispatch();
      }
      else if (eNotificationRequired())
         eNotify(new ENotificationImpl(this, Notification.SET, HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION, newActionCardCondition, newActionCardCondition));
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<Test> getTests() {
      if (tests == null) {
         tests = new EObjectContainmentEList<Test>(Test.class, this, HealthcareDiagramPackage.ACTION_CARD__TESTS);
      }
      return tests;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<Disease> getDiseases() {
      if (diseases == null) {
         diseases = new EObjectContainmentEList<Disease>(Disease.class, this, HealthcareDiagramPackage.ACTION_CARD__DISEASES);
      }
      return diseases;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public EList<ConnectEdge> getEdges() {
      if (edges == null) {
         edges = new EObjectContainmentEList<ConnectEdge>(ConnectEdge.class, this, HealthcareDiagramPackage.ACTION_CARD__EDGES);
      }
      return edges;
   }

   /**
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   @Override
   public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
      switch (featureID) {
         case HealthcareDiagramPackage.ACTION_CARD__ACTIONS:
            return ((InternalEList<?>)getActions()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__BRANCHES:
            return ((InternalEList<?>)getBranches()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS:
            return ((InternalEList<?>)getAdmissionActions()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS:
            return ((InternalEList<?>)getDischargeActions()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION:
            return basicSetActionCardCondition(null, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__TESTS:
            return ((InternalEList<?>)getTests()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__DISEASES:
            return ((InternalEList<?>)getDiseases()).basicRemove(otherEnd, msgs);
         case HealthcareDiagramPackage.ACTION_CARD__EDGES:
            return ((InternalEList<?>)getEdges()).basicRemove(otherEnd, msgs);
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
         case HealthcareDiagramPackage.ACTION_CARD__ACTIONS:
            return getActions();
         case HealthcareDiagramPackage.ACTION_CARD__BRANCHES:
            return getBranches();
         case HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS:
            return getAdmissionActions();
         case HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS:
            return getDischargeActions();
         case HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION:
            return getActionCardCondition();
         case HealthcareDiagramPackage.ACTION_CARD__TESTS:
            return getTests();
         case HealthcareDiagramPackage.ACTION_CARD__DISEASES:
            return getDiseases();
         case HealthcareDiagramPackage.ACTION_CARD__EDGES:
            return getEdges();
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
         case HealthcareDiagramPackage.ACTION_CARD__ACTIONS:
            getActions().clear();
            getActions().addAll((Collection<? extends Action>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__BRANCHES:
            getBranches().clear();
            getBranches().addAll((Collection<? extends Branch>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS:
            getAdmissionActions().clear();
            getAdmissionActions().addAll((Collection<? extends AdmissionAction>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS:
            getDischargeActions().clear();
            getDischargeActions().addAll((Collection<? extends DischargeAction>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION:
            setActionCardCondition((ActionCardCondition)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__TESTS:
            getTests().clear();
            getTests().addAll((Collection<? extends Test>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__DISEASES:
            getDiseases().clear();
            getDiseases().addAll((Collection<? extends Disease>)newValue);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__EDGES:
            getEdges().clear();
            getEdges().addAll((Collection<? extends ConnectEdge>)newValue);
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
         case HealthcareDiagramPackage.ACTION_CARD__ACTIONS:
            getActions().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__BRANCHES:
            getBranches().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS:
            getAdmissionActions().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS:
            getDischargeActions().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION:
            setActionCardCondition((ActionCardCondition)null);
            return;
         case HealthcareDiagramPackage.ACTION_CARD__TESTS:
            getTests().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__DISEASES:
            getDiseases().clear();
            return;
         case HealthcareDiagramPackage.ACTION_CARD__EDGES:
            getEdges().clear();
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
         case HealthcareDiagramPackage.ACTION_CARD__ACTIONS:
            return actions != null && !actions.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__BRANCHES:
            return branches != null && !branches.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__ADMISSION_ACTIONS:
            return admissionActions != null && !admissionActions.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__DISCHARGE_ACTIONS:
            return dischargeActions != null && !dischargeActions.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__ACTION_CARD_CONDITION:
            return actionCardCondition != null;
         case HealthcareDiagramPackage.ACTION_CARD__TESTS:
            return tests != null && !tests.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__DISEASES:
            return diseases != null && !diseases.isEmpty();
         case HealthcareDiagramPackage.ACTION_CARD__EDGES:
            return edges != null && !edges.isEmpty();
      }
      return super.eIsSet(featureID);
   }

} //ActionCardImpl
