/**
 * HSE Learning Guide - Settings Page
 * Application settings and preferences
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  KeyIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export function Settings() {
  const { user, updatePreferences, theme, setTheme, addNotification } = useApp();

  if (!user) {
    return <AuthRequired />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your application preferences</p>
      </div>

      {/* Appearance */}
      <section className="card">
        <div className="card-header flex items-center gap-3">
          <PaintBrushIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="card-body space-y-6">
          <div>
            <label className="label">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: '☀️' },
                { value: 'dark', label: 'Dark', icon: '🌙' },
                { value: 'system', label: 'System', icon: '💻' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value as any)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-colors flex flex-col items-center gap-2',
                    theme === option.value
                      ? 'border-hse-primary bg-hse-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <span className="text-2xl" role="img" aria-label={option.label}>{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Font Size</label>
              <select
                value={user.preferences.fontSize}
                onChange={e => updatePreferences({ fontSize: e.target.value as any })}
                className="input"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="label">Language</label>
              <select
                value={user.preferences.language}
                onChange={e => updatePreferences({ language: e.target.value })}
                className="input"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="card">
        <div className="card-header flex items-center gap-3">
          <ShieldCheckIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Accessibility</h2>
        </div>
        <div className="card-body space-y-4">
          {[
            { key: 'reducedMotion', label: 'Reduce Motion', description: 'Disable animations and transitions for reduced motion preference' },
            { key: 'highContrast', label: 'High Contrast', description: 'Increase color contrast for better visibility' },
            { key: 'autoPlayVideos', label: 'Auto-play Videos', description: 'Automatically play video content when available' },
            { key: 'showProgressIndicators', label: 'Show Progress Indicators', description: 'Display progress bars and completion percentages' },
          ].map(item => (
            <label key={item.key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={user.preferences[item.key as keyof typeof user.preferences]}
                onChange={e => updatePreferences({ [item.key]: e.target.checked })}
                className="h-5 w-5 text-hse-primary rounded focus:ring-hse-primary"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Learning Preferences */}
      <section className="card">
        <div className="card-header flex items-center gap-3">
          <Cog6ToothIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Learning Preferences</h2>
        </div>
        <div className="card-body space-y-6">
          <div>
            <label className="label">Daily Learning Goal</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={user.preferences.dailyGoalMinutes}
                onChange={e => updatePreferences({ dailyGoalMinutes: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none accent-hse-primary"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white w-20 text-right">
                {user.preferences.dailyGoalMinutes} min
              </span>
            </div>
          </div>

          <div>
            <label className="label">Preferred Standards</label>
            <div className="flex flex-wrap gap-2">
              {['OSHA', 'ISO45001', 'NEBOSH', 'IOSH', 'ANSI', 'NFPA', 'EPA', 'MSHA'].map(std => (
                <label key={std} className={cn(
                  'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors',
                  user.preferences.preferredStandards.includes(std)
                    ? 'bg-hse-primary/10 text-hse-primary border border-hse-primary/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}>
                  <input
                    type="checkbox"
                    checked={user.preferences.preferredStandards.includes(std)}
                    onChange={e => {
                      const newStandards = e.target.checked
                        ? [...user.preferences.preferredStandards, std]
                        : user.preferences.preferredStandards.filter((s: string) => s !== std);
                      updatePreferences({ preferredStandards: newStandards });
                    }}
                    className="sr-only"
                  />
                  {std}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Reminder Time</label>
            <input
              type="time"
              value={user.preferences.reminderTime || ''}
              onChange={e => updatePreferences({ reminderTime: e.target.value || undefined })}
              className="input"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set a daily reminder to continue learning</p>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="card">
        <div className="card-header flex items-center gap-3">
          <BellIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        <div className="card-body space-y-4">
          <p className="text-gray-600 dark:text-gray-400">Notification preferences will be available in a future update.</p>
          <div className="space-y-3">
            {[
              { label: 'Email notifications', description: 'Receive email updates about your progress' },
              { label: 'Push notifications', description: 'Get browser notifications for reminders' },
              { label: 'Achievement alerts', description: 'Notify when you unlock achievements' },
              { label: 'Weekly progress report', description: 'Receive a weekly summary of your learning' },
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input type="checkbox" className="h-5 w-5 text-hse-primary rounded focus:ring-hse-primary" disabled />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
                <span className="badge-secondary text-xs">Coming Soon</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Data & Privacy */}
      <section className="card border-l-4 border-l-hse-warning">
        <div className="card-header flex items-center gap-3">
          <ShieldCheckIcon className="h-5 w-5 text-hse-warning" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Data & Privacy</h2>
        </div>
        <div className="card-body space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Export Your Data</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Download a copy of your learning data, progress, and preferences.</p>
            <button className="btn-secondary" disabled>Export Data (Coming Soon)</button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delete Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button className="btn-danger flex items-center gap-2" disabled>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              Delete Account (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="card">
        <div className="card-header flex items-center gap-3">
          <GlobeAltIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white">About</h2>
        </div>
        <div className="card-body">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Version</dt>
              <dd className="font-medium text-gray-900 dark:text-white">1.0.0</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Build</dt>
              <dd className="font-medium text-gray-900 dark:text-white">2024.01.15</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Framework</dt>
              <dd className="font-medium text-gray-900 dark:text-white">React 19 + TypeScript + Vite</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Styling</dt>
              <dd className="font-medium text-gray-900 dark:text-white">Tailwind CSS</dd>
            </div>
          </dl>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              HSE Learning Guide © 2024. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <Cog6ToothIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to manage your settings.
        </p>
        <a href="/login" className="btn-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}