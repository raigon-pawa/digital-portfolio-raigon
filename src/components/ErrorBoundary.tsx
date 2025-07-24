import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-cyber-gray border border-red-500/20 rounded-xl p-6 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠</div>
            <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-gray-300 mb-6">
              The application encountered an error. Please refresh the page or check the console for details.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-cyber-blue text-white rounded-lg hover:bg-cyber-blue/80 transition-colors"
              >
                Reload Page
              </button>
              <details className="text-left">
                <summary className="text-cyber-blue cursor-pointer hover:text-cyber-pink">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 bg-cyber-gray-light rounded text-xs text-red-400 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
