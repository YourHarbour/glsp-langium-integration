// The declaration language of the statemachine example: declares the events and commands
// that transition labels can reference.
//
// Adapted from the grammar of the official Langium statemachine example
// (https://github.com/eclipse-langium/langium/tree/main/examples/statemachine, MIT licensed):
// the state and transition structure of the original grammar is expressed graphically in
// this example, while the event and command declarations remain textual.
grammar StatemachineDeclarationsDSL

import './common';

entry Declarations:
    ('events' events+=EventDecl+)?
    ('commands' commands+=CommandDecl+)?;

EventDecl returns Event:
    name=ID;

CommandDecl returns Command:
    name=ID;
