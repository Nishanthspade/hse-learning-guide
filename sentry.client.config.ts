import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";

export function initSentry() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        browserTracingIntegration({
          // Set tracingOrigins to capture navigation events
          tracingOrigins: [
            "localhost",
            /^\/(?!api\/)/, // Capture all routes except /api/
          ],
        }),
      ],
      
      // Performance monitoring
      tracesSampleRate: 0.1, // 10% of transactions
      
      // Session replay for debugging
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Error filtering
      ignoreErrors: [
        // Ignore network errors
        "Network Error",
        "Network request failed",
        "Failed to fetch",
        // Ignore resize observer errors (common in React)
        "ResizeObserver loop limit exceeded",
        "ResizeObserver loop completed",
        // Ignore extension errors
        "Extension",
      ],
      
      // Ignore certain URLs
      ignoreUrls: [
        /^chrome-extension:/,
        /^moz-extension:/,
        /^safari-extension:/,
      ],
      
      // Before send hook for filtering
      beforeSend(event, hint) {
        // Don't send errors from development
        if (import.meta.env.DEV) {
          return null;
        }
        
        // Filter out known benign errors
        const error = hint.originalException;
        if (error instanceof Error) {
          // Ignore network errors
          if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            return null;
          }
          // Ignore abort errors
          if (error.name === 'AbortError' || error.name === 'CancellationError') {
            return null;
          }
          // Ignore resize observer errors
          if (error.message.includes('ResizeObserver')) {
            return null;
          }
        }
        
        return event;
      },
      
      // Before send transaction
      beforeSendTransaction(event) {
        // Drop transactions from health checks
        if (event.request?.url?.includes('/health') || 
            event.request?.url?.includes('/ready') ||
            event.request?.url?.includes('/live')) {
          return null;
        }
        return event;
      },
      
      // Initial scope
      initialScope: {
        tags: {
          component: 'hse-learning-guide',
          environment: import.meta.env.MODE,
          version: import.meta.env.VITE_APP_VERSION || 'unknown',
        },
      },
    });
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  Sentry.captureMessage(message, level);
}

export function setUserContext(user: { id: string; email?: string; name?: string; role?: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
    role: user.role,
  });
}

export function clearUserContext() {
  Sentry.setUser(null);
}

export function addBreadcrumb(category: string, message: string, level: 'info' | 'warning' | 'error' = 'info', data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    category,
    message,
    level,
    data,
    type: 'default',
  });
}

export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({
    name,
    op,
  });
}

export function setUserContext(user: { id: string; email?: string; name?: string; role?: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
    role: user.role,
  });
}

export function clearUserContext() {
  Sentry.setUser(null);
}

export function addBreadcrumb(category: string, message: string, level: 'info' | 'warning' | 'error' = 'info', data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    category,
    message,
    level,
    data,
    type: 'default',
  });
}