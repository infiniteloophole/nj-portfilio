import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <motion.div
            className="max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Oops! Something went wrong
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're sorry, but an unexpected error occurred. Please try refreshing the page.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Reload Page
              </button>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Error Details:
                  </h3>
                  <code className="text-sm text-red-700 dark:text-red-300 break-all">
                    {this.state.error.toString()}
                  </code>
                  <pre className="mt-2 text-xs text-red-600 dark:text-red-300 overflow-auto max-h-48 p-2 bg-black/5 dark:bg-white/5 rounded">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
