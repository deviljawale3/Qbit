"use client";

// Fix: Changed React import to `import * as React from "react";` to ensure
// correct module resolution, which can resolve issues where TypeScript fails
// to recognize inherited properties like `props` and `setState` from React.Component.
import * as React from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
  info?: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Use a class property initializer for state. This is a modern and concise
  // approach that avoids potential 'this' context issues in constructors
  // under certain TypeScript configurations.
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // explicit console logging (studio-friendly)
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ error, info });
    // Optional: send to remote logger via a client API call
  }

  // Arrow function binds 'this' for the event handler.
  handleReload = () => {
    try {
      window.location.reload();
    } catch {
      window.location.replace(window.location.href);
    }
  };

  render() {
    const { hasError, error, info } = this.state;

    if (hasError) {
      return (
        <main className="error-screen">
          <h1 className="error-title">Something went wrong.</h1>

          <p className="error-message">
            We caught an unexpected error in the application. Try reloading the
            page — if the problem persists, contact{" "}
            <a className="error-contact" href="mailto:deviljawale@gmail.com">
              deviljawale@gmail.com
            </a>
            .
          </p>

          <div className="error-actions">
            <button onClick={this.handleReload} className="reload-btn">
              Reload page
            </button>
          </div>

          <details className="error-details">
            <summary className="error-summary">Error details (expand)</summary>
            <pre className="error-pre">
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
