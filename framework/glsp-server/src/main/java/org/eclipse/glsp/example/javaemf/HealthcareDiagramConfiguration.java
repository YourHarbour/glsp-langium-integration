package org.eclipse.glsp.example.javaemf;

import java.util.List;

import org.eclipse.glsp.server.diagram.BaseDiagramConfiguration;
import org.eclipse.glsp.server.types.EdgeTypeHint;
import org.eclipse.glsp.server.types.ShapeTypeHint;

public class HealthcareDiagramConfiguration extends BaseDiagramConfiguration {

    @Override
    public List<ShapeTypeHint> getShapeTypeHints() {
        return List.of(
            new ShapeTypeHint(HealthcareModelTypes.ACTION, true, true, true, false),
            new ShapeTypeHint(HealthcareModelTypes.BRANCH, true, true, true, true),
            new ShapeTypeHint(HealthcareModelTypes.ACTION_CARD_CONDITION, true, true, true, false),
            new ShapeTypeHint(HealthcareModelTypes.ADMISSION_ACTION, true, true, true, false),
            new ShapeTypeHint(HealthcareModelTypes.DISCHARGE_ACTION, true, true, true, false),
            new ShapeTypeHint(HealthcareModelTypes.TEST, true, true, true, false),
            new ShapeTypeHint(HealthcareModelTypes.DISEASE, true, true, true, false)
            // new ShapeTypeHint(HealthcareModelTypes.ACTION_CARD_CONDITION, true, true, true, false)
        );
    }

    @Override
    public List<EdgeTypeHint> getEdgeTypeHints() {
        return List.of(
                new EdgeTypeHint(HealthcareModelTypes.DIA_EDGE, false, true, false,
                        List.of(HealthcareModelTypes.ACTION, HealthcareModelTypes.ADMISSION_ACTION,
                                HealthcareModelTypes.BRANCH, HealthcareModelTypes.DISCHARGE_ACTION, HealthcareModelTypes.TEST),
                        List.of(HealthcareModelTypes.ACTION, HealthcareModelTypes.ADMISSION_ACTION,
                                HealthcareModelTypes.BRANCH, HealthcareModelTypes.DISCHARGE_ACTION, HealthcareModelTypes.DISEASE)
                )
        );
    }

}
