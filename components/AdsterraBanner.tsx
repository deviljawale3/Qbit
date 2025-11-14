"use client";
import { useEffect, useRef } from "react";

// Define the shape of Adsterra's global configuration object for TypeScript
declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: object;
    };
  }
}

export default function AdsterraBanner({ id = "300x250", width = 300, height = 250 }: { id?: string; width?: number; height?: number; }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up previous instances to prevent duplicates on re-render
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
    }
    container.innerHTML = '';

    // Set the global configuration object directly on the window
    window.atOptions = {
      'key' : 'a66572bd475fd2446dcec9d8884e6cb1',
      'format' : 'iframe',
      'height' : height,
      'width' : width,
      'params' : {}
    };

    // Create and append the main ad script
    const adScript = document.createElement("script");
    adScript.type = "text/javascript";
    adScript.src = "//www.highperformanceformat.com/a66572bd475fd2446dcec9d8884e6cb1/invoke.js";
    adScript.async = true;
    
    scriptRef.current = adScript;
    container.appendChild(adScript);

    // Cleanup function to run when the component unmounts
    return () => {
      if (adScript && adScript.parentNode) {
        adScript.parentNode.removeChild(adScript);
      }
      // Clean up the global variable
      try {
        delete window.atOptions;
      } catch (e) {
        window.atOptions = undefined;
      }
    };
  }, [width, height]); // Rerun effect if dimensions change

  return (
    <div style={{ textAlign: "center", margin: "28px 0" }} aria-hidden="true">
      <div ref={containerRef} id={`adsterra-container-${id}`} style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }} />
    </div>
  );
}