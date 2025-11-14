"use client";
import { useEffect } from "react";

export default function AdsterraBanner({ id = "300x250", width = 300, height = 250 }: { id?: string; width?: number; height?: number; }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).atOptions) {
      const inline = document.createElement("script");
      inline.type = "text/javascript";
      inline.text = `atOptions = { 'key' : 'a66572bd475fd2446dcec9d8884e6cb1', 'format' : 'iframe', 'height' : ${height}, 'width' : ${width}, 'params' : {} };`;
      document.body.appendChild(inline);
    }
    if (!document.getElementById("adsterra-invoke-script")) {
      const s = document.createElement("script");
      s.src = "//www.highperformanceformat.com/a66572bd475fd2446dcec9d8884e6cb1/invoke.js";
      s.async = true;
      s.id = "adsterra-invoke-script";
      document.body.appendChild(s);
    }
  }, [height, width]);

  return (
    <div style={{ textAlign: "center", margin: "28px 0" }} aria-hidden="true">
      <div id={`adsterra-slot-${id}`} style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }} />
    </div>
  );
}
