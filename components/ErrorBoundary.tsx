"use client";

// Fix: Changed the React import to explicitly import `Component` and other types.
// This is a more robust pattern that ensures TypeScript correctly resolves the
// base class and its properties like `props` and `setState`.
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props { children?: ReactNode; }
interface State { hasError: boolean; error?: Error | null; info?: ErrorInfo | null; }

export default class ErrorBoundary extends Component<Props, State> {
  // Fix: Switched to class property syntax for state initialization.
  // This resolves type errors where properties from the base Component class
  // (like `state` and `props`) were not being correctly inferred.
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log and store error info
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ error, info });
    // (optional) send to logging endpoint if present
  }

  // Arrow function binds 'this' for the event handler.
  handleReload = () => {
    try { window.location.reload(); } catch { window.location.replace(window.location.href); }
  }

  render() {
    const { hasError, error, info } = this.state;
    if (hasError) {
      return (
        <main style={{ fontFamily: "system-ui, sans-serif", padding: 24, color: "#e0e0e0", background: "#040404", minHeight: "100vh" }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Something went wrong.</h1>
          <p style={{ marginTop: 0, opacity: 0.85 }}>
            Try reloading — if the problem persists, contact <a href="mailto:deviljawale@gmail.com" style={{ color: "#ff8c00" }}>deviljawale@gmail.com</a>.
          </p>
          <div style={{ marginTop: 16 }}>
            <button onClick={this.handleReload} style={{ background: "#ff8c00", color: "#000", padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}>
              Reload page
            </button>
          </div>
          <details style={{ marginTop: 16, background: "#0f0f0f", padding: 12, border: "1px solid rgba(255,140,0,0.15)" }}>
            <summary style={{ cursor: "pointer" }}>Error details (expand)</summary>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 8, color: "#e0e0e0" }}>
              {String(error?.message || "Unknown error")}
              {info ? `\n\nComponent stack:\n${info.componentStack}` : ""}
            </pre>
          </details>
        </main>
      );
    }
    return this.props.children ?? null;
  }
}
