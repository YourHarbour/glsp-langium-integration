// The transition label language of the statemachine example: a transition fires on an
// event and may execute commands, both declared in the declarations element of the diagram.
//
// Adapted from the grammar of the official Langium statemachine example
// (https://github.com/eclipse-langium/langium/tree/main/examples/statemachine, MIT licensed):
// the original `Transition: event=[Event] '=>' state=[State]` encodes the target state
// textually; in this example the target is the graphical edge itself, so the label keeps
// only the references into the textual declarations.
grammar StatemachineTransitionDSL

import './common';

entry TransitionSpec:
    event=[Event:ID] ('/' actions+=[Command:ID] (',' actions+=[Command:ID])*)?;
