package org.eclipse.glsp.example.javaemf.palette;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.glsp.server.actions.GhostElement;
import org.eclipse.glsp.server.actions.TriggerElementCreationAction;

public class TriggerCreateBranchAction extends TriggerElementCreationAction{
   public static final String KIND = "runCreateBranchOperation";

   private GhostElement ghostElement;

   public TriggerCreateBranchAction() {
      this(null);
   }

   public TriggerCreateBranchAction(final String elementTypeId) {
      this(elementTypeId, new HashMap<>());
   }

   public TriggerCreateBranchAction(final String elementTypeId, final GhostElement ghostElement) {
      this(elementTypeId, new HashMap<>(), ghostElement);
   }

   public TriggerCreateBranchAction(final String elementTypeId,
      final Map<String, String> args) {
      super(KIND, elementTypeId, args);
   }

   public TriggerCreateBranchAction(final String elementTypeId,
      final Map<String, String> args, final GhostElement ghostElement) {
      super(KIND, elementTypeId, args);
      this.ghostElement = ghostElement;
   }

   public GhostElement getGhostElement() { return ghostElement; }

   public void setGhostElement(final GhostElement ghostElement) { this.ghostElement = ghostElement; }
    
}
