package org.eclipse.glsp.example.javaemf.helper;

import org.checkerframework.checker.units.qual.t;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.Identifiable;

public class FindObjectById {
    public static Identifiable findObjectById(ActionCard actionCard, String elementId) {
      // Search in actions
      for (Identifiable action : actionCard.getActions()) {
         if (elementId.equals(action.getId())) {
            return action;
         }
      }

      // Search in admission actions
      for (Identifiable admissionAction : actionCard.getAdmissionActions()) {
         if (elementId.equals(admissionAction.getId())) {
            return admissionAction;
         }
      }

      // Search in branches
      for (Identifiable branch : actionCard.getBranches()) {
         if (elementId.equals(branch.getId())) {
            return branch;
         }
      }

      // Search in discharge actions
      for (Identifiable dischargeAction : actionCard.getDischargeActions()) {
         if (elementId.equals(dischargeAction.getId())) {
            return dischargeAction;
         }
      }

      for (Identifiable test : actionCard.getTests()) {
         if (elementId.equals(test.getId())) {
            return test;
         }
      }

      for (Identifiable disease: actionCard.getDiseases()) {
         if (elementId.equals(disease.getId())) {
            return disease;
         }
      }

      if (elementId.equals(actionCard.getActionCardCondition().getId())) {
         return actionCard.getActionCardCondition();
      }

      // If not found, return null
      return null;
   }
}
