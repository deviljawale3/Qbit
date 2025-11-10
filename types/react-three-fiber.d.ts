// Fix: Add a side-effect import for 'react' to ensure its types are loaded before augmentation.
// This resolves issues with both standard HTML JSX elements and React.Component properties not being found.
import 'react';
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// An empty export ensures this file is treated as a module,
// which helps build tools correctly process the global JSX namespace augmentation.
export {};
