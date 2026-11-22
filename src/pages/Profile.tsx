/**
 * HSE Learning Guide - Profile Page
 * User profile, preferences, and account management
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export function Profile() {
  const { user, updatePreferences, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'notifications'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: '',
    organization: '',
  });

  if (!user) {
    return <AuthRequired />;
  }

  const handleSave = () => {
    // In real app, would call API
    updatePreferences({
      // preferences don't include name/email, those would be separate
    });
    setEditMode(false);
    addNotification({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been saved successfully.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-hse-primary/10 flex items-center justify-center">
                <span className="text-hse-primary text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {editMode && (
                <button type="button" className="absolute bottom-0 right-0 p-2 bg-hse-primary text-white rounded-full shadow-lg hover:bg-hse-secondary">
                  <CameraIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-3">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="input"
                      placeholder="e.g., HSE Officer, Safety Manager"
                    />
                  </div>
                  <div>
                    <label className="label">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      className="input"
                      placeholder="Company or organization name"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                  {user.role && <p className="text-gray-500 dark:text-gray-400 mt-1">{user.role}</p>}
                  {user.organization && <p className="text-gray-500 dark:text-gray-400">{user.organization}</p>}
                  <div className="flex items-center gap-3 mt-3">
                    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getLevelColor(user.level))}>
                      {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
                    </span>
                    {user.certifications.length > 0 && (
                      <span className="badge-accent">
                        {user.certifications.length} certification{user.certifications.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              {editMode ? (
                <>
                  <button type="button" onClick={() => setEditMode(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="button" onClick={handleSave} className="btn-primary">
                    Save
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setEditMode(true)} className="btn-secondary flex items-center gap-2">
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px" role="tablist">
            {[
              { id: 'profile', label: 'Profile', icon: UserCircleIcon },
              { id: 'preferences', label: 'Preferences', icon: Cog6ToothIcon },
              { id: 'security', label: 'Security', icon: ShieldCheckIcon },
              { id: 'notifications', label: 'Notifications', icon: BellIcon },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-hse-primary text-hse-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <tab.icon className="h-5 w-5" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="card-body">
          {activeTab === 'preferences' && <PreferencesTab user={user} onUpdate={updatePreferences} />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'profile' && <ProfileDetailsTab user={user} />}
        </div>
      </div>
    </div>
  );
}

// ============================================
// TAB COMPONENTS
// ============================================

function PreferencesTab({ user, onUpdate }: { user: any; onUpdate: (prefs: any) => void }) {
  const [prefs, setPrefs] = useState(user.preferences);

  const handleChange = (key: string, value: any) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    onUpdate(newPrefs);
  };

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="label">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: SunIcon },
                { value: 'dark', label: 'Dark', icon: MoonIcon },
                { value: 'system', label: 'System', icon: ComputerDesktopIcon },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange('theme', option.value)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-colors flex flex-col items-center gap-2',
                    prefs.theme === option.value
                      ? 'border-hse-primary bg-hse-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <option.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Font Size</label>
              <select
                value={prefs.fontSize}
                onChange={e => handleChange('fontSize', e.target.value)}
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
                value={prefs.language}
                onChange={e => handleChange('language', e.target.value)}
                className="input"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Accessibility</h3>
        <div className="space-y-3">
          {[
            { key: 'reducedMotion', label: 'Reduce Motion', description: 'Disable animations and transitions' },
            { key: 'highContrast', label: 'High Contrast', description: 'Increase color contrast for better visibility' },
            { key: 'autoPlayVideos', label: 'Auto-play Videos', description: 'Automatically play video content' },
          ].map(item => (
            <label key={item.key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs[item.key as keyof typeof prefs]}
                onChange={e => handleChange(item.key, e.target.checked)}
                className="h-4 w-4 text-hse-primary rounded focus:ring-hse-primary"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning</h3>
        <div className="space-y-4">
          <div>
            <label className="label">Daily Goal</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={prefs.dailyGoalMinutes}
                onChange={e => handleChange('dailyGoalMinutes', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none accent-hse-primary"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white w-20 text-right">
                {prefs.dailyGoalMinutes} min
              </span>
            </div>
          </div>

          <div>
            <label className="label">Preferred Standards</label>
            <div className="flex flex-wrap gap-2">
              {['OSHA', 'ISO45001', 'NEBOSH', 'IOSH', 'ANSI', 'NFPA'].map(std => (
                <label key={std} className={cn(
                  'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors',
                  prefs.preferredStandards.includes(std)
                    ? 'bg-hse-primary/10 text-hse-primary border border-hse-primary/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}>
                  <input
                    type="checkbox"
                    checked={prefs.preferredStandards.includes(std)}
                    onChange={e => {
                      const newStandards = e.target.checked
                        ? [...prefs.preferredStandards, std]
                        : prefs.preferredStandards.filter((s: string) => s !== std);
                      handleChange('preferredStandards', newStandards);
                    }}
                    className="sr-only"
                  />
                  {std}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h3>
        <div className="card p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Change your password to keep your account secure.</p>
          <button className="btn-primary">Change Password</button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <div className="card p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add an extra layer of security to your account.</p>
          <button className="btn-secondary">Enable 2FA</button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">This device • Active now</p>
          </div>
          <div className="p-4">
            <button className="btn-danger text-sm">Sign Out Everywhere</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400">Notification preferences coming soon.</p>
    </div>
  );
}

function ProfileDetailsTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Member Since</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Last Active</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{new Date(user.lastActiveAt).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Current Level</dt>
            <dd className="font-medium text-gray-900 dark:text-white capitalize">{user.level}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Certifications</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{user.certifications.length}</dd>
          </div>
        </dl>
      </section>

      {user.certifications.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Certifications</h3>
          <div className="space-y-3">
            {user.certifications.map((cert: any) => (
              <div key={cert.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuingBody}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                    {cert.expiryDate && (
                      <p className="text-xs text-hse-warning">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  {cert.verified && (
                    <span className="badge-success">Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function AuthRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <UserCircleIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to view your profile.
        </p>
        <a href="/login" className="btn-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    professional: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };
  return colors[level] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}