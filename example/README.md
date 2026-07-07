# Eclipse GLSP Workflow example with GLSP-Langium integration

This example extends the standard Eclipse GLSP Workflow editor with embedded Langium language services. It keeps the familiar graphical Workflow editor, but adds textual guard expressions directly on selected edges.

The example is intended as a reusable blueprint for researchers or tool builders who want to combine graphical modelling with small domain-specific textual languages inside the same GLSP model.

## Integration additions

On top of the stock Workflow example, this variant integrates the [`glsp-langium-integration`](../framework) framework and extends the model with Langium-backed condition editing.

### Variable-providing tasks

Task nodes can provide a variable and one property. In the demo model:

- `ChkWt` provides `water:level`
- `ChkTp` provides `temperature:degree`

The variable declaration is shown as an editable `label:variable` child on the task node. Editing this label updates the task's `variable` and `property` fields on the GLSP server. The label edit validator checks that declarations have the form:

```text
<variable>:<property>
```

For example:

```text
water:level
```

### Conditional edges

Conditional edges (`edge:conditional`) are guarded by textual conditions such as:

```text
if water.level >= 50
```

The condition is shown and edited directly on the edge through an embedded Monaco editor. The editor is backed by a Langium language server running in a web worker.

The condition language is defined in:

```text
workflow-glsp/src/langium/ls/grammars/conditional_edge.langium
```

The grammar accepts an `if` condition with:

- a variable reference,
- a property reference,
- a comparison operator,
- an integer literal.

### Graph-derived scoping

The important integration point is that Langium scopes are derived from the GLSP graph. A conditional edge may only reference variables provided by tasks upstream of the edge source.

For example:

- a condition after `ChkWt` can reference `water.level`;
- a condition after `ChkTp` can reference `temperature.degree`;
- referencing an out-of-scope variable or a wrong property produces Langium diagnostics that are displayed as GLSP markers.

The client computes this information in:

```text
workflow-glsp/src/langium-integration/variable-scope.ts
workflow-glsp/src/langium-integration/scoping-information.handler.ts
```

The Langium language services consume it in:

```text
workflow-glsp/src/langium/ls/workflow-dsl-references.ts
```

### Edit persistence

When a condition is edited and the editor loses focus, the client dispatches an `applyConditionEdit` operation. The server updates the conditional edge's stored `condition`, its resolved `variableId` if available, and the label text used to recreate the Monaco editor.

Relevant files:

```text
workflow-glsp/src/langium-integration/monaco-submit.service.ts
workflow-server/src/conditionedit/apply-condition-edit-handler.ts
```

## Reuse checklist

To adapt the framework to another graphical language, replace the Workflow-specific pieces:

1. Define a Langium grammar for the text embedded in the diagram.
2. Register the GLSP model element and Monaco-backed label that host the text.
3. Compute domain-specific scoping information from the GLSP model.
4. Provide Langium scope computation and scope provider services for external graph elements.
5. Submit edited text back to the GLSP server through a custom operation.

The framework provides the common infrastructure for worker startup, JSON-RPC communication, Monaco editor management, batch validation, and conversion of Langium diagnostics into GLSP markers.

## Generated Langium artifacts

The generated Langium artifacts are located in:

```text
workflow-glsp/src/langium/ls/generated
```

The TextMate grammar used by Monaco syntax highlighting is located in:

```text
workflow-glsp/src/langium/syntaxes
```

They are generated from the `.langium` grammar files by `langium-cli`. The build runs the relevant generation and bundling steps, including the worker bundle for the browser-based Langium language server.

## Prerequisites

- [Node.js](https://nodejs.org/en/) `>=22`
- [Yarn Classic](https://classic.yarnpkg.com/en/docs/install) `>=1.7.0 <2`

The example is an Eclipse Theia application, so the [Theia development prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites) may also apply to your system.

This project template is compatible with Theia `>=1.66.0`.

## Building the example

From this `example` directory:

```bash
yarn
yarn build
```

## Running the example

Start the Theia web app with the integrated Workflow example:

```bash
yarn start
```

This launches the application at:

```text
http://localhost:3000
```

Open `coffee.wf` from the workspace in the Workflow Diagram Editor.

## External GLSP server mode

For debugging, the Theia application can connect to an already running GLSP server:

```bash
yarn start:server
yarn start:external
```

`yarn start:server` starts the Workflow GLSP server on port `5007`. `yarn start:external` starts the Theia browser application and expects the server to be available externally.

## Watching the example

To run TypeScript and bundled components in watch mode:

```bash
yarn watch
```

## Demo material

The repository root contains `demo-video-script.md`, which provides a 5 minute screencast outline and appendix text for demonstrating this example in a paper submission.
