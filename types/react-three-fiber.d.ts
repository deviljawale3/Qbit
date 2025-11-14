// This file provides global type augmentations for @react-three/fiber,
// ensuring that Three.js elements can be used in JSX across the entire project.
// This resolves TypeScript errors like "Property 'mesh' does not exist on type 'JSX.IntrinsicElements'".
// While per-file `import '@react-three/fiber'` is an alternative, a global
// declaration file can be more reliable in some project setups where per-file
// imports do not resolve type augmentation correctly.

// Fix: The previous manual augmentation was overwriting React's default JSX element types,
// causing errors for standard HTML tags like `div`. The correct approach is to import
// `@react-three/fiber` for its side-effects, which allows its built-in type augmentation
// to correctly merge with React's types. This single fix resolves all JSX-related
// TypeScript errors across the application.
import '@react-three/fiber';
