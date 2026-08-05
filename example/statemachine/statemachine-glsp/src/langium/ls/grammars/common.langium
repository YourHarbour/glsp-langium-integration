// Shared terminals and the interfaces of the external elements: events and commands are
// declared in the declarations element of the diagram and referenced from transition labels.

interface Event {
    name: string
}

interface Command {
    name: string
}

terminal ID: /[_a-zA-Z][\w_]*/;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
