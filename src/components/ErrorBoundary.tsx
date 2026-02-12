import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.hasError && this.state.hasError) {
      // Auto-recover after a brief moment
      setTimeout(() => this.setState({ hasError: false, error: null }), 100);
    }
  }

  render() {
    if (this.state.hasError) {
      // Silently retry rendering instead of showing error UI
      return this.props.children;
    }
    return this.props.children;
  }
}
