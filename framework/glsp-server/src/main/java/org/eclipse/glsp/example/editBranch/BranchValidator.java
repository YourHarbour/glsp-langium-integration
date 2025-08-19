package org.eclipse.glsp.example.editBranch;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.eclipse.glsp.server.emf.notation.EMFNotationModelState;
import org.eclipse.glsp.server.features.directediting.ContextEditValidator;
import org.eclipse.glsp.server.features.directediting.RequestEditValidationAction;
import org.eclipse.glsp.server.features.directediting.ValidationStatus;
import org.eclipse.glsp.server.types.Severity;

import com.google.inject.Inject;

import org.eclipse.glsp.example.healthcareDiagram.ActionCard;
import org.eclipse.glsp.example.healthcareDiagram.Disease;
import org.eclipse.glsp.example.healthcareDiagram.Test;

public class BranchValidator implements ContextEditValidator{

    @Inject
    protected EMFNotationModelState modelState;

    @Override
    public String getContextId() { 
        return "action-card-branch-editor";
    }

    @Override
    public ValidationStatus validate(RequestEditValidationAction action) {
        String text = action.getText();
        ActionCard actionCard = modelState.getSemanticModel(ActionCard.class).orElseThrow();
        List<String> allDiseases = actionCard.getDiseases().stream()
            .map(Disease::getName) 
            .collect(Collectors.toList());
        List<String> allTests = actionCard.getTests().stream()
            .map(Test::getName) 
            .collect(Collectors.toList());
        ValidationStatus status = checkSingleTestAndDisease(text, allTests, allDiseases);
        return status;
    }
    
    public static ValidationStatus checkSingleTestAndDisease(
            String input, 
            List<String> allTests, 
            List<String> allDiseases) {
        

        String regex = "test\\s+(\\S+)\\s+(\\S+)\\s+gives\\s+(\\S+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        ValidationStatus status = new ValidationStatus(Severity.ERROR, "");
        if (matcher.find()) {
            

            String testType = matcher.group(1);
            String disease = matcher.group(2);
            String outcome = matcher.group(3);


            if (testType == null) {
                status.setMessage("Error: Missing TestType. Format is: test &lt;TestType&gt; &lt;Disease&gt; gives &lt;Outcome&gt;.");
                return status;
            }
            if (disease == null) {
                status.setMessage("Error: Missing Disease. Format is: test &lt;TestType&gt; &lt;Disease&gt; gives &lt;Outcome&gt;.");
                return status;
            }
            if (outcome == null) {
                status.setMessage("Error: Missing Outcome. Format is: test &lt;TestType&gt; &lt;Disease&gt; gives &lt;Outcome&gt;.");
                return status;
            }


            if (!outcome.equalsIgnoreCase("Positive") && !outcome.equalsIgnoreCase("Negative")) {
                status.setMessage("Error: Outcome '" + outcome + "' is invalid. Only 'Positive' or 'Negative' are allowed.");
                return status;
            }

            boolean testExists = allTests.contains(testType);
            boolean diseaseExists = allDiseases.contains(disease);

            if (!testExists && !diseaseExists) {
                status.setMessage("Error: TestType '" + testType + "' and Disease '" + disease + "' are invalid.");
            } else if (!testExists) {
                status.setMessage("Error: TestType '" + testType + "' is invalid.");
            } else if (!diseaseExists) {
                status.setMessage("Error: Disease '" + disease + "' is invalid.");
            } else {
                status.setState(Severity.NONE);
            }
        } else {

            status.setMessage("Error: Input format is invalid. Format is: test &lt;TestType&gt; &lt;Disease&gt; gives &lt;Outcome&gt;.");
        }
        return status;
    }

    // public static ValidationStatus checkSingleTestAndDisease(
    //     String input,
    //     List<String> allTests,
    //     List<String> allDiseases) {

    //     // 定义正则表达式匹配 test <TestType> <Disease> gives <outcome>
    //     String regex = "test\\s+(\\S+)\\s+(\\S+)\\s+gives\\s+(\\S+)";
    //     Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
    //     Matcher matcher = pattern.matcher(input);

    //     ValidationStatus status = new ValidationStatus(Severity.ERROR, "");

    //     if (matcher.matches()) {
    //         // 提取 TestType, Disease 和 Outcome（如果存在）
    //         String testType = matcher.group(1);
    //         String disease = matcher.group(2);
    //         String outcome = matcher.group(3);

    //         // 检查缺失项
    //         if (testType == null) {
    //             status.setMessage("Error: Missing TestType. Format is 'test <TestType> <Disease> gives <Outcome>'.");
    //             return status;
    //         }
    //         if (disease == null) {
    //             status.setMessage("Error: Missing Disease. Format is 'test <TestType> <Disease> gives <Outcome>'.");
    //             return status;
    //         }
    //         if (outcome == null) {
    //             status.setMessage("Error: Missing Outcome. Format is 'test <TestType> <Disease> gives <Outcome>'.");
    //             return status;
    //         }

    //         // 检查 Outcome 是否为 'Positive' 或 'Negative'
    //         if (!outcome.equalsIgnoreCase("Positive") && !outcome.equalsIgnoreCase("Negative")) {
    //             status.setMessage("Error: Outcome '" + outcome + "' is invalid. Only 'Positive' or 'Negative' are allowed.");
    //             return status;
    //         }

    //         // 检查 TestType 和 Disease 的有效性
    //         boolean testExists = allTests.contains(testType);
    //         boolean diseaseExists = allDiseases.contains(disease);

    //         if (!testExists && !diseaseExists) {
    //             status.setMessage("Error: TestType '" + testType + "' and Disease '" + disease + "' are invalid.");
    //         } else if (!testExists) {
    //             status.setMessage("Error: TestType '" + testType + "' is invalid.");
    //         } else if (!diseaseExists) {
    //             status.setMessage("Error: Disease '" + disease + "' is invalid.");
    //         } else {
    //             status.setState(Severity.NONE);
    //             // status.setMessage("Success: TestType '" + testType + "' and Disease '" + disease + "' are valid.");
    //         }
    //     } else {
    //         // 输入格式完全无效
    //         status.setMessage("Error: Input format is invalid. Correct format is 'test <TestType> <Disease> gives <Outcome>'.");
    //     }

    //     return status;
    // }

}
