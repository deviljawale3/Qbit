// This file provides global type augmentations for @react-three/fiber,
// ensuring that Three.js elements can be used in JSX across the entire project.
// This resolves TypeScript errors like "Property 'mesh' does not exist on type 'JSX.IntrinsicElements'".
// While per-file `import '@react-three/fiber'` is an alternative, a global
// declaration file can be more reliable in some project setups where per-file
// imports do not resolve type augmentation correctly.

// Fix: Correctly augment the global JSX namespace for @react-three/fiber. This file must be a module to use 'declare global'. Importing 'ThreeElements' makes it a module and allows extending JSX.IntrinsicElements, which fixes TypeScript errors for Three.js components throughout the app.
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
