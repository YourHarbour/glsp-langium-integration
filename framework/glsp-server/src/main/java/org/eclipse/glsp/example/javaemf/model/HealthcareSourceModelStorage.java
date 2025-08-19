package org.eclipse.glsp.example.javaemf.model;

import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.glsp.server.emf.notation.EMFNotationSourceModelStorage;

import org.eclipse.glsp.example.healthcareDiagram.*;

public class HealthcareSourceModelStorage extends EMFNotationSourceModelStorage {
    @Override
    protected ResourceSet setupResourceSet(final ResourceSet resourceSet) {
        resourceSet.getPackageRegistry().put(HealthcareDiagramPackage.eINSTANCE.getNsURI(),
            HealthcareDiagramPackage.eINSTANCE);
        return super.setupResourceSet(resourceSet);
    }
}
