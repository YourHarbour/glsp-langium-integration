/**
 */
package org.eclipse.glsp.example.healthcareDiagram;

import org.eclipse.emf.ecore.EFactory;

/**
 * <!-- begin-user-doc -->
 * The <b>Factory</b> for the model.
 * It provides a create method for each non-abstract class of the model.
 * <!-- end-user-doc -->
 * @see org.eclipse.glsp.example.healthcareDiagram.HealthcareDiagramPackage
 * @generated
 */
public interface HealthcareDiagramFactory extends EFactory {
   /**
    * The singleton instance of the factory.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @generated
    */
   HealthcareDiagramFactory eINSTANCE = org.eclipse.glsp.example.healthcareDiagram.impl.HealthcareDiagramFactoryImpl.init();

   /**
    * Returns a new object of class '<em>Action Card</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Action Card</em>'.
    * @generated
    */
   ActionCard createActionCard();

   /**
    * Returns a new object of class '<em>Action</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Action</em>'.
    * @generated
    */
   Action createAction();

   /**
    * Returns a new object of class '<em>Admission Action</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Admission Action</em>'.
    * @generated
    */
   AdmissionAction createAdmissionAction();

   /**
    * Returns a new object of class '<em>Discharge Action</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Discharge Action</em>'.
    * @generated
    */
   DischargeAction createDischargeAction();

   /**
    * Returns a new object of class '<em>Branch</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Branch</em>'.
    * @generated
    */
   Branch createBranch();

   /**
    * Returns a new object of class '<em>Action Card Condition</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Action Card Condition</em>'.
    * @generated
    */
   ActionCardCondition createActionCardCondition();

   /**
    * Returns a new object of class '<em>Connect Edge</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Connect Edge</em>'.
    * @generated
    */
   ConnectEdge createConnectEdge();

   /**
    * Returns a new object of class '<em>Test</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Test</em>'.
    * @generated
    */
   Test createTest();

   /**
    * Returns a new object of class '<em>Disease</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Disease</em>'.
    * @generated
    */
   Disease createDisease();

   /**
    * Returns a new object of class '<em>Expression</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Expression</em>'.
    * @generated
    */
   Expression createExpression();

   /**
    * Returns a new object of class '<em>Text Token</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Text Token</em>'.
    * @generated
    */
   TextToken createTextToken();

   /**
    * Returns a new object of class '<em>Node Token</em>'.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return a new object of class '<em>Node Token</em>'.
    * @generated
    */
   NodeToken createNodeToken();

   /**
    * Returns the package supported by this factory.
    * <!-- begin-user-doc -->
    * <!-- end-user-doc -->
    * @return the package supported by this factory.
    * @generated
    */
   HealthcareDiagramPackage getHealthcareDiagramPackage();

} //HealthcareDiagramFactory
