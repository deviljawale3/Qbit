import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
  info?: ErrorInfo | null;
}

// Fix: The ErrorBoundary class must extend React.Component to be a valid class component.
// This gives it access to React component features like state, props, and lifecycle methods,
// resolving the errors related to missing 'setState' and 'props'.
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ fontFamily: "system-ui", padding: 24, color: '#e0e0e0' }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace: "pre-wrap", background: '#1a1a1a', padding: '1rem', border: '1px solid #ff8c00', marginTop: '1rem' }}>
            {String(this.state.error?.message || "Unknown error")}
          </pre>
          <p style={{ marginTop: '1rem' }}>Try reloading or contact support@yourdomain.com</p>
        </main>
      );
    }

    return this.props.children;
  }
}