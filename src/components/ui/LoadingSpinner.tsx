/**
 * HSE Learning Guide - Loading Spinner Component
 * Accessible loading indicator with multiple sizes and variants
 */

import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  ariaLabel?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
  xl: 'h-16 w-16 border-4',
};

const variantClasses = {
  primary: 'border-hse-primary border-t-transparent',
  secondary: 'border-gray-300 dark:border-gray-600 border-t-transparent',
  white: 'border-white border-t-transparent',
};

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className,
  ariaLabel = 'Loading',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <svg
        className={cn(
          'animate-spin text-hse-primary',
          sizeClasses[size],
          variantClasses[variant]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

// Full page loading overlay
export function PageLoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <LoadingSpinner size="xl" variant="primary" ariaLabel={message} />
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">{message}</p>
    </div>
  );
}

// Inline loading for buttons
export function ButtonLoading({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <LoadingSpinner
      size={size}
      variant="white"
      ariaLabel="Processing"
    />
  );
}

// Skeleton loader for content placeholders
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('card animate-pulse', className)}>
      <Skeleton className="aspect-video w-full bg-gray-200 dark:bg-gray-700" />
      <div className="card-body space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={3} />
        <Skeleton className="h-10 w-24 mt-4" />
      </div>
    </div>
  );
}