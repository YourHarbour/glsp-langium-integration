import { svg as sprottySvg } from '@eclipse-glsp/client';
import { VNode } from 'snabbdom';

/**
 * Re-export of the sprotty `svg` JSX factory with an attached, factory-local `JSX` namespace.
 *
 * Since this package also pulls in `@types/react` (required by the Monaco editor React
 * components of the glsp-langium-integration framework), the global `JSX` namespace is
 * taken over by React and no longer matches the snabbdom `VNode`s produced by the sprotty
 * views. TypeScript prefers a `JSX` namespace declared on the factory function itself over
 * the global one, so importing `svg` from this module (together with the `@jsx svg` pragma)
 * restores the correct `VNode` typing for the diagram views.
 */
export const svg = sprottySvg;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace svg {
    export namespace JSX {
        export interface Element extends VNode {}
        export interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
