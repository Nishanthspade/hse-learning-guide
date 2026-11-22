/**
 * HSE Learning Guide - Achievement Toast Component
 * Displays achievement unlock notifications with animation
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import { TrophyIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ACHIEVEMENT_ICONS = {
  common: TrophyIcon,
  uncommon: StarIcon,
  rare: SparklesIcon,
  epic: SparklesIcon,
  legendary: TrophyIcon,
};

const ACHIEVEMENT_COLORS = {
  common: 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
  uncommon: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
  rare: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
  epic: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400',
  legendary: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
};

interface AchievementToastProps {
  // This component reads from context, no props needed
}

export function AchievementToast() {
  const { newAchievement, dismissAchievement, achievements } = useApp();
  const [showToast, setShowToast] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<typeof newAchievement>(null);

  // Watch for new achievements
  useEffect(() => {
    if (newAchievement) {
      setCurrentAchievement(newAchievement);
      setShowToast(true);
      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => dismissAchievement(), 300);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement, dismissAchievement]);

  if (!showToast || !currentAchievement) return null;

  const rarity = currentAchievement.achievementId.includes('legendary') ? 'legendary' :
                 currentAchievement.achievementId.includes('epic') ? 'epic' :
                 currentAchievement.achievementId.includes('rare') ? 'rare' :
                 currentAchievement.achievementId.includes('uncommon') ? 'uncommon' : 'common';

  const Icon = ACHIEVEMENT_ICONS[rarity];
  const colors = ACHIEVEMENT_COLORS[rarity];

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up',
        colors
      )}
      role="status"
      aria-live="polite"
      aria-label="Achievement unlocked"
    >
      <div className="card border-l-4 border-l-hse-accent overflow-hidden">
        <div className="card-body p-4">
          <div className="flex items-start gap-3">
            <div className={cn('flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center', colors.replace('bg-', 'bg-').replace('text-', 'bg-').replace('border-', 'bg-'))}>
              <Icon className={cn('h-6 w-6', colors.replace('bg-', 'text-').replace('border-', 'text-'))} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-hse-accent uppercase tracking-wide">Achievement Unlocked!</p>
              <h4 className="font-semibold text-gray-900 dark:text-white mt-1">{getAchievementTitle(currentAchievement.achievementId)}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{getAchievementDescription(currentAchievement.achievementId)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', colors)}>
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">+{getAchievementPoints(currentAchievement.achievementId)} XP</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowToast(false);
                setTimeout(() => dismissAchievement(), 300);
              }}
              className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Dismiss achievement"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Progress bar for auto-dismiss */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full bg-hse-accent animate-progress"
            style={{ animationDuration: '6s' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

// Helper functions to get achievement details
function getAchievementTitle(achievementId: string): string {
  const titles: Record<string, string> = {
    'first-module': 'First Steps',
    'five-modules': 'Getting Started',
    'ten-modules': 'Knowledge Seeker',
    'twenty-modules': 'Safety Scholar',
    'perfect-score': 'Perfectionist',
    'streak-7': 'Week Warrior',
    'streak-30': 'Monthly Master',
    'all-hazards': 'Hazard Expert',
    'construction-complete': 'Construction Pro',
    'process-safety-complete': 'PSM Specialist',
    'oil-gas-complete': 'Oil & Gas Expert',
  };
  return titles[achievementId] || 'New Achievement';
}

function getAchievementDescription(achievementId: string): string {
  const descriptions: Record<string, string> = {
    'first-module': 'Completed your first HSE module',
    'five-modules': 'Completed 5 learning modules',
    'ten-modules': 'Completed 10 learning modules',
    'twenty-modules': 'Completed 20 learning modules',
    'perfect-score': 'Scored 100% on an assessment',
    'streak-7': 'Maintained a 7-day learning streak',
    'streak-30': 'Maintained a 30-day learning streak',
    'all-hazards': 'Completed all major hazard modules',
    'construction-complete': 'Completed the Construction Safety pathway',
    'process-safety-complete': 'Completed the Process Safety pathway',
    'oil-gas-complete': 'Completed the Oil & Gas pathway',
  };
  return descriptions[achievementId] || 'Keep up the great work!';
}

function getAchievementPoints(achievementId: string): number {
  const points: Record<string, number> = {
    'first-module': 50,
    'five-modules': 100,
    'ten-modules': 250,
    'twenty-modules': 500,
    'perfect-score': 100,
    'streak-7': 150,
    'streak-30': 500,
    'all-hazards': 1000,
    'construction-complete': 300,
    'process-safety-complete': 400,
    'oil-gas-complete': 400,
  };
  return points[achievementId] || 50;
}