/**
 * HSE Learning Guide - Toast Notification System
 * Global toast notifications for user feedback
 */

import React, { useState, useCallback } from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement';
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  toast: (options: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...options, id };
    setToasts(prev => [...prev, newToast]);

    if (options.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, options.duration ?? 5000);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon,
    achievement: SparklesIcon,
  };

  const colors = {
    success: 'bg-hse-success border-hse-success',
    error: 'bg-hse-danger border-hse-danger',
    warning: 'bg-hse-warning border-hse-warning',
    info: 'bg-hse-info border-hse-info',
    achievement: 'bg-hse-accent border-hse-accent',
  };

  const Icon = icons[toast.type];

  return (
    <div className={cn('card border-l-4 shadow-lg animate-slide-up', colors[toast.type])}>
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <div className={cn('flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center', colors[toast.type].replace('bg-', 'bg-').replace('border-', 'bg-') + '/10')}>
            <Icon className={cn('h-5 w-5', colors[toast.type].replace('bg-', 'text-'))} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">{toast.title}</p>
            {toast.message && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{toast.message}</p>}
            {toast.action && (
              <button
                type="button"
                onClick={() => { toast.action!.onClick(); onDismiss(toast.id); }}
                className="mt-2 text-sm font-medium text-hse-primary hover:text-hse-secondary"
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Dismiss"
          >
            <XCircleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple Toaster component for backward compatibility
export function Toaster() {
  // This would integrate with a global toast system
  // For now, we use the AchievementToast and NotificationBell
  return null;
}