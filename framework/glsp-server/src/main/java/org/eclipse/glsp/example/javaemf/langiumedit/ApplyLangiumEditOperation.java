package org.eclipse.glsp.example.javaemf.langiumedit;

import org.eclipse.glsp.server.operations.Operation;

import java.util.List;

public class ApplyLangiumEditOperation extends Operation {

    public static final String KIND = "applyLangiumEditOperation";
    private String elementId;
    private String rule;
    private List<Token> tokens;
    private String text;

    public ApplyLangiumEditOperation() {
        super(KIND);
    }

    public ApplyLangiumEditOperation(String elementId, String rule, List<Token> tokens, String text) {
        super(KIND);
        this.elementId = elementId;
        this.rule = rule;
        this.tokens = tokens;
        this.text = text;
    }

    public String getElementId() {
        return elementId;
    }

    public void setElementId(String elementId) {
        this.elementId = elementId;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public static record Token(String property, String text, String node) {
        boolean isNodeToken() {
            return this.node != null;
        }
    }

}