/**
 * HSE Learning Guide - Notification Bell Component
 * Displays notifications with real-time updates
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function NotificationBell() {
  const { notifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead, clearNotification } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'error': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'achievement': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      case 'info':
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'achievement': return 'Achievement Unlocked!';
      case 'info':
      default: return 'Notification';
    }
  };

  if (notifications.length === 0 && unreadNotificationCount === 0) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={`Notifications${unreadNotificationCount > 0 ? `, ${unreadNotificationCount} unread` : ''}`}
        aria-expanded={isOpen}
      >
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        {unreadNotificationCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-hse-danger text-white text-xs font-medium flex items-center justify-center">
            {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadNotificationCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  className="text-sm text-hse-primary hover:text-hse-secondary font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <BellIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                {notifications.slice(0, 20).map(notification => (
                  <li key={notification.id} className={cn('px-4 py-3 transition-colors', !notification.read && 'bg-hse-primary/5')}>
                    <div className="flex gap-3">
                      <div className={cn('flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center', getNotificationIcon(notification.type))}>
                        <BellIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{notification.title}</p>
                          <button
                            type="button"
                            onClick={() => clearNotification(notification.id)}
                            className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Dismiss notification"
                          >
                            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <time className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </time>
                          {!notification.read && (
                            <button
                              type="button"
                              onClick={() => markNotificationRead(notification.id)}
                              className="text-xs text-hse-primary hover:text-hse-secondary font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                        {notification.actionUrl && notification.actionLabel && (
                          <a
                            href={notification.actionUrl}
                            className="inline-flex items-center gap-1 mt-2 text-sm text-hse-primary hover:text-hse-secondary font-medium"
                          >
                            {notification.actionLabel}
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 20 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/notifications"
                className="text-sm text-hse-primary hover:text-hse-secondary font-medium block text-center"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}