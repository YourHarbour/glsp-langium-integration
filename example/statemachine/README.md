# Statemachine example with GLSP-Langium integration

This example interweaves the language of the [official Langium statemachine example](https://github.com/eclipse-langium/langium/tree/main/examples/statemachine) — originally a purely textual DSL — with a GLSP-based graphical editor, using the [`glsp-langium-integration`](../../framework) framework.

Where the original language expresses everything as text, this example splits the language along the natural boundary between structure and content:

| Original textual construct | In this example |
| --- | --- |
| `state <name> ... end` blocks | Graphical state nodes |
| `initialState <state>` | Marked state node (accented border) |
| `<event> => <state>` transitions | Graphical edges; the target is the edge itself |
| `events` / `commands` declarations | Multi-line textual declarations element |
| Event/command references | Textual transition labels, e.g. `brewCoffee / startPump` |

Cross-references that encode topology become graphical edges; cross-references into the declarations stay textual.

## What this example demonstrates

Compared to the [workflow example](../workflow), this example shows a different set of integration styles:

- **Multiple sub-languages in one diagram**: the declarations language (multi-line) and the transition label language (single-line) are two separate Langium grammars, served by a single language server worker; the file extension of each virtual document selects the grammar.
- **Multi-line textual elements**: the declarations element embeds a multi-line Monaco editor inside the diagram.
- **References between textual elements**: the events and commands referable from transition labels are declared in *another* grammar-controlled textual element. The declared names are extracted from the parsed Langium AST at submit time, persisted with the declarations node, and fed back to Langium as scoping information.
- **Global scoping**: every transition label may reference every declared event and command, so the scope provider is a few lines of code (compare with the position-dependent scoping of the workflow example).
- **Reference-only completion**: the `event` position of a transition label accepts exactly one cross-reference, so the completion popup is effectively a drop-down over the declared events.
- **Propagation between textual elements**: removing a declaration re-validates all transition labels; dangling references surface as validation markers on the affected edges.

## Try it

Open `coffee.sm` from the workspace in the Statemachine Diagram Editor, then:

1. Double-click the label of the transition between `Idle` and `Brewing` and trigger completion — only the declared events are offered.
2. Edit the declarations element (e.g. rename `brewCoffee`) and click outside the editor — the transition labels referencing the old name are flagged immediately.
3. Create a new transition between two states — its default label references the first declared event.

## Grammar attribution

The grammars in `statemachine-glsp/src/langium/ls/grammars/` are adapted from the grammar of the official Langium statemachine example, which is published under the MIT license as part of the [Langium](https://github.com/eclipse-langium/langium) project.

## Build and run

```bash
yarn
yarn build
yarn start
```

Open `http://localhost:3000` and load `coffee.sm` from the workspace in the Statemachine Diagram Editor.

For debugging with an external GLSP server:

```bash
yarn start:server
yarn start:external
```
