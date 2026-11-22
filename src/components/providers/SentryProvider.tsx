import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration, replayIntegration } from '@sentry/react';

export function SentryProvider({ children }: { children: React.ReactNode }) {
  const { user } = useApp();

  useEffect(() => {
    // Initialize Sentry only in production
    if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
      import('@sentry/react').then((Sentry) => {
        Sentry.init({
          dsn: import.meta.env.VITE_SENTRY_DSN,
          integrations: [
            Sentry.browserTracingIntegration({
              tracingOrigins: [
                'localhost',
                /^\/(?!api\/)/,
              ],
            }),
            Sentry.replayIntegration({
              maskAllText: true,
              blockAllMedia: true,
            }),
          ],
          tracesSampleRate: 0.1,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
          ignoreErrors: [
            'Network Error',
            'Network request failed',
            'Failed to fetch',
            'ResizeObserver loop limit exceeded',
            'ResizeObserver loop completed',
            'Extension',
          ],
          ignoreUrls: [
            /^chrome-extension:/,
            /^moz-extension:/,
            /^safari-extension:/,
          ],
          beforeSend(event, hint) {
            if (import.meta.env.DEV) return null;
            const error = hint.originalException;
            if (error instanceof Error) {
              if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) return null;
              if (error.name === 'AbortError' || error.name === 'CancellationError') return null;
              if (error.message.includes('ResizeObserver')) return null;
            }
            return event;
          },
          beforeSendTransaction(event) {
            if (event.request?.url?.includes('/health') || 
                event.request?.url?.includes('/ready') ||
                event.request?.url?.includes('/live')) {
              return null;
            }
            return event;
          },
          initialScope: {
            tags: {
              component: 'hse-learning-guide',
              environment: import.meta.env.MODE,
              version: import.meta.env.VITE_APP_VERSION || 'unknown',
            },
          },
        });
      });
    }
  }, []);

  // Set user context when user changes
  useEffect(() => {
    if (user) {
      import('@sentry/react').then((Sentry) => {
        Sentry.setUser({
          id: user.id,
          email: user.email,
          username: user.name,
          role: user.role,
        });
      });
    } else {
      import('@sentry/react').then((Sentry) => {
        Sentry.setUser(null);
      });
    }
  }, [user]);

  return <>{children}</>;
}

export function captureException(error: Error, context?: Record<string, any>) {
  import('@sentry/react').then((Sentry) => {
    Sentry.captureException(error, { extra: context });
  });
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  import('@sentry/react').then((Sentry) => {
    Sentry.captureMessage(message, level);
  });
}

export function setUserContext(user: { id: string; email?: string; name?: string; role?: string }) {
  import('@sentry/react').then((Sentry) => {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.name,
      role: user.role,
    });
  });
}

export function clearUserContext() {
  import('@sentry/react').then((Sentry) => {
    Sentry.setUser(null);
  });
}

export function addBreadcrumb(category: string, message: string, level: 'info' | 'warning' | 'error' = 'info', data?: Record<string, any>) {
  import('@sentry/react').then((Sentry) => {
    Sentry.addBreadcrumb({
      category,
      message,
      level,
      data,
      type: 'default',
    });
  });
}