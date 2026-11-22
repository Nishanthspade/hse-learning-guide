/**
 * HSE Learning Guide - Theme Toggle Component
 * Cycles through light, dark, and system themes
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, setTheme } = useApp();

  const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
  const currentIndex = themes.indexOf(theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const themeLabels: Record<'light' | 'dark' | 'system', string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };

  const themeIcons = {
    light: SunIcon,
    dark: MoonIcon,
    system: ComputerDesktopIcon,
  };

  const CurrentIcon = themeIcons[theme];
  const NextIcon = themeIcons[nextTheme];

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      aria-label={`Current theme: ${themeLabels[theme]}. Click to switch to ${themeLabels[nextTheme]}`}
      title={`Theme: ${themeLabels[theme]}. Click for ${themeLabels[nextTheme]}`}
    >
      <span className="sr-only">Theme: {themeLabels[theme]}</span>

      {/* Current theme icon */}
      <CurrentIcon
        className="h-5 w-5 transition-all duration-300"
        aria-hidden="true"
      />

      {/* Next theme indicator (on hover) */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <NextIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    </button>
  );
}

// Alternative: Dropdown theme selector
export function ThemeSelector() {
  const { theme, setTheme } = useApp();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: SunIcon },
    { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
    { value: 'system' as const, label: 'System', icon: ComputerDesktopIcon },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-haspopup="listbox"
        aria-label="Select theme"
      >
        {(() => {
          const currentTheme = themes.find(t => t.value === theme);
          return currentTheme?.icon ? <currentTheme.icon className="h-5 w-5" aria-hidden="true" /> : null;
        })()}
        <span className="hidden sm:block capitalize">{theme}</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50" role="listbox">
        {themes.map(({ value, label, icon: Icon }) => (
          <li key={value} role="option" aria-selected={theme === value}>
            <button
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors',
                theme === value
                  ? 'bg-hse-primary/10 text-hse-primary'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="capitalize">{label}</span>
              {theme === value && (
                <svg className="ml-auto h-5 w-5 text-hse-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}