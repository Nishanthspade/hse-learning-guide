/**
 * HSE Learning Guide - Achievements Page
 * Track learning milestones and earn recognition
 */

import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  TrophyIcon,
  StarIcon,
  SparklesIcon,
  AwardIcon,
  ClockIcon,
  FireIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  SparklesIcon as SparklesIcon2,
  TrophyIcon as TrophyIcon2,
  ArrowRightIcon,
  CheckCircleIcon as CheckIcon,
} from '@heroicons/react/24/outline';

export function Achievements() {
  const { achievements, user } = useApp();

  // Define all available achievements
  const allAchievements = useMemo(() => [
    {
      id: 'first-module',
      title: 'First Steps',
      description: 'Completed your first HSE module',
      category: 'completion',
      criteria: { type: 'module_complete', value: 1 },
      points: 50,
      rarity: 'common',
      icon: '🎓',
    },
    {
      id: 'five-modules',
      title: 'Getting Started',
      description: 'Completed 5 learning modules',
      category: 'completion',
      criteria: { type: 'module_complete', value: 5 },
      points: 100,
      rarity: 'common',
      icon: '📚',
    },
    {
      id: 'ten-modules',
      title: 'Knowledge Seeker',
      description: 'Completed 10 learning modules',
      category: 'completion',
      criteria: { type: 'module_complete', value: 10 },
      points: 250,
      rarity: 'uncommon',
      icon: '📖',
    },
    {
      id: 'twenty-modules',
      title: 'Safety Scholar',
      description: 'Completed 20 learning modules',
      category: 'completion',
      criteria: { type: 'module_complete', value: 20 },
      points: 500,
      rarity: 'rare',
      icon: '🎓',
    },
    {
      id: 'fifty-modules',
      title: 'HSE Master',
      description: 'Completed 50 learning modules',
      category: 'completion',
      criteria: { type: 'module_complete', value: 50 },
      points: 1000,
      rarity: 'epic',
      icon: '🏆',
    },
    {
      id: 'hundred-modules',
      title: 'HSE Legend',
      description: 'Completed 100 learning modules',
      category: 'completion',
      criteria: { type: 'module_complete', value: 100 },
      points: 2500,
      rarity: 'legendary',
      icon: '👑',
    },
    {
      id: 'perfect-score',
      title: 'Perfectionist',
      description: 'Scored 100% on an assessment',
      category: 'assessment',
      criteria: { type: 'quiz_score', value: 100 },
      points: 100,
      rarity: 'uncommon',
      icon: '💯',
    },
    {
      id: 'streak-3',
      title: 'Getting Started',
      description: 'Maintained a 3-day learning streak',
      category: 'streak',
      criteria: { type: 'streak_days', value: 3 },
      points: 50,
      rarity: 'common',
      icon: '🔥',
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak',
      category: 'streak',
      criteria: { type: 'streak_days', value: 7 },
      points: 150,
      rarity: 'uncommon',
      icon: '🔥',
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintained a 30-day learning streak',
      category: 'streak',
      criteria: { type: 'streak_days', value: 30 },
      points: 500,
      rarity: 'rare',
      icon: '🔥',
    },
    {
      id: 'streak-100',
      title: 'Century Streak',
      description: 'Maintained a 100-day learning streak',
      category: 'streak',
      criteria: { type: 'streak_days', value: 100 },
      points: 1500,
      rarity: 'epic',
      icon: '🔥',
    },
    {
      id: 'streak-365',
      title: 'Year of Learning',
      description: 'Maintained a 365-day learning streak',
      category: 'streak',
      criteria: { type: 'streak_days', value: 365 },
      points: 5000,
      rarity: 'legendary',
      icon: '🔥',
    },
    {
      id: 'perfect-quiz-5',
      title: 'Quiz Master',
      description: 'Scored 100% on 5 assessments',
      category: 'assessment',
      criteria: { type: 'perfect_quizzes', value: 5 },
      points: 300,
      rarity: 'rare',
      icon: '🧠',
    },
    {
      id: 'path-complete-foundation',
      title: 'Foundation Graduate',
      description: 'Completed HSE Officer Foundation pathway',
      category: 'path',
      criteria: { type: 'path_complete', value: 'hse-officer-foundation' },
      points: 500,
      rarity: 'rare',
      icon: '🎓',
    },
    {
      id: 'path-complete-construction',
      title: 'Construction Pro',
      description: 'Completed Construction Safety Specialist pathway',
      category: 'path',
      criteria: { type: 'path_complete', value: 'construction-safety-specialist' },
      points: 600,
      rarity: 'rare',
      icon: '🏗️',
    },
    {
      id: 'path-complete-process',
      title: 'Process Safety Expert',
      description: 'Completed Process Safety Engineer pathway',
      category: 'path',
      criteria: { type: 'path_complete', value: 'process-safety-engineer' },
      points: 800,
      rarity: 'epic',
      icon: '🏭',
    },
    {
      id: 'path-complete-oil-gas',
      title: 'Oil & Gas Specialist',
      description: 'Completed Oil & Gas HSE Specialist pathway',
      category: 'path',
      criteria: { type: 'path_complete', value: 'oil-gas-hse-specialist' },
      points: 800,
      rarity: 'epic',
      icon: '🛢️',
    },
    {
      id: 'path-complete-management',
      title: 'Safety Leader',
      description: 'Completed Safety Management Professional pathway',
      category: 'path',
      criteria: { type: 'path_complete', value: 'safety-management-professional' },
      points: 1000,
      rarity: 'legendary',
      icon: '👑',
    },
    {
      id: 'all-hazards',
      title: 'Hazard Expert',
      description: 'Completed all major hazard modules',
      category: 'special',
      criteria: { type: 'all_hazards' },
      points: 1000,
      rarity: 'epic',
      icon: '🛡️',
    },
    {
      id: 'assessment-master',
      title: 'Assessment Master',
      description: 'Completed 50 assessments',
      category: 'assessment',
      criteria: { type: 'assessment_count', value: 50 },
      points: 500,
      rarity: 'rare',
      icon: '📝',
    },
    {
      id: 'simulation-master',
      title: 'Simulation Pro',
      description: 'Completed 10 simulations',
      category: 'simulation',
      criteria: { type: 'simulation_count', value: 10 },
      points: 500,
      rarity: 'rare',
      icon: '🎮',
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Completed a module before 8 AM',
      category: 'special',
      criteria: { type: 'early_bird' },
      points: 50,
      rarity: 'uncommon',
      icon: '🌅',
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Completed a module after 10 PM',
      category: 'special',
      criteria: { type: 'night_owl' },
      points: 50,
      rarity: 'uncommon',
      icon: '🦉',
    },
    {
      id: 'weekend-warrior',
      title: 'Weekend Warrior',
      description: 'Completed 5 modules on weekends',
      category: 'special',
      criteria: { type: 'weekend_modules', value: 5 },
      points: 100,
      rarity: 'uncommon',
      icon: '🏃',
    },
    {
      id: 'helpful-peer',
      title: 'Helpful Peer',
      description: 'Answered 10 community questions',
      category: 'social',
      criteria: { type: 'answers_given', value: 10 },
      points: 200,
      rarity: 'uncommon',
      icon: '🤝',
    },
  ], []);

  // Calculate earned achievements
  const earnedAchievementIds = new Set(achievements.map(a => a.achievementId));
  const completedModules = useMemo(() => {
    return Object.values(progress).filter(p => p.status === 'completed' || p.status === 'mastered').length;
  }, [progress]);

  const streakDays = 0; // Would come from context
  const perfectQuizCount = 0; // Would come from context
  const completedPaths = 0; // Would come from context

  const achievementsWithStatus = useMemo(() => {
    return allAchievements.map(achievement => {
      const earned = earnedAchievementIds.has(achievement.id);
      let progress = 0;
      let isEligible = false;

      switch (achievement.criteria.type) {
        case 'module_complete':
          progress = Math.min(100, (completedModules / achievement.criteria.value) * 100);
          isEligible = completedModules >= achievement.criteria.value;
          break;
        case 'streak_days':
          progress = Math.min(100, (streakDays / achievement.criteria.value) * 100);
          isEligible = streakDays >= achievement.criteria.value;
          break;
        case 'perfect_quizzes':
          progress = Math.min(100, (perfectQuizCount / achievement.criteria.value) * 100);
          isEligible = perfectQuizCount >= achievement.criteria.value;
          break;
        case 'path_complete':
          progress = completedPaths.includes(achievement.criteria.value) ? 100 : 0;
          isEligible = completedPaths.includes(achievement.criteria.value);
          break;
        case 'all_hazards':
          const hazardModules = ['fall-protection', 'confined-space', 'fire-safety', 'chemical-safety', 'electrical-safety', 'h2s-management'];
          const completedHazards = hazardModules.filter(m => {
            const prog = progress[m];
            return prog?.status === 'completed' || prog?.status === 'mastered';
          }).length;
          progress = Math.min(100, (completedHazards / hazardModules.length) * 100);
          isEligible = completedHazards === hazardModules.length;
          break;
        case 'assessment_count':
          progress = 0; // Would calculate from progress
          isEligible = false;
          break;
        case 'simulation_count':
          progress = 0;
          isEligible = false;
          break;
        default:
          progress = earned ? 100 : 0;
          isEligible = earned;
      }

      return {
        ...achievement,
        earned,
        progress: Math.round(progress),
        isEligible,
      };
    });
  }, [achievements, earnedAchievementIds, completedModules, streakDays, perfectQuizCount, completedPaths]);

  const earnedCount = achievementsWithStatus.filter(a => a.earned).length;
  const totalPoints = achievementsWithStatus.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  // Rarity order for sorting
  const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };

  const sortedAchievements = useMemo(() => {
    return [...achievementsWithStatus].sort((a, b) => {
      // Earned first
      if (a.earned !== b.earned) return a.earned ? -1 : 1;
      // Then by rarity
      if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
      }
      // Then by points
      return b.points - a.points;
    });
  }, [achievementsWithStatus]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-md">
          <TrophyIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In Required</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to view your achievements.
          </p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const rarityColors: Record<string, string> = {
    common: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200',
    uncommon: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    rare: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200',
    epic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200',
    legendary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200',
  };

  const rarityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    common: TrophyIcon,
    uncommon: StarIcon,
    rare: SparklesIcon,
    epic: AwardIcon,
    legendary: TrophyIcon,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrophyIcon className="h-6 w-6 text-amber-500" aria-hidden="true" />
            Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning milestones and earn recognition for your HSE expertise
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl">
            <p className="text-2xl font-bold">{earnedCount}</p>
            <p className="text-sm">Unlocked</p>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl">
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-sm">Total XP</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {earnedCount} of {allAchievements.length} achievements unlocked
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / allAchievements.length) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{earnedCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unlocked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalPoints}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round((earnedCount / allAchievements.length) * 100)}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {['All', 'Earned', 'Available', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].map((filter, i) => (
          <button
            key={filter}
            role="tab"
            aria-selected={false}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {filter} {filter !== 'All' && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                {filteredByType(filter).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedAchievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

function filteredByType(filter: string) {
  // This would filter by category in real implementation
  return [];
}

function AchievementCard({ achievement }: { achievement: any }) {
  const rarityColors: Record<string, string> = {
    common: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200',
    uncommon: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    rare: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200',
    epic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200',
    legendary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200',
  };

  const iconMap: Record<string, string> = {
    '🎓': '🎓',
    '📚': '📚',
    '📖': '📖',
    '🎓': '🎓',
    '🏆': '🏆',
    '👑': '👑',
    '💯': '💯',
    '🔥': '🔥',
    '🔥': '🔥',
    '🔥': '🔥',
    '🔥': '🔥',
    '🔥': '🔥',
    '🧠': '🧠',
    '🎓': '🎓',
    '🏗️': '🏗️',
    '🏭': '🏭',
    '🛢️': '🛢️',
    '👑': '👑',
    '🛡️': '🛡️',
    '📝': '📝',
    '🎮': '🎮',
    '🌅': '🌅',
    '🦉': '🦉',
    '🏃': '🏃',
    '🤝': '🤝',
  };

  return (
    <div className={cn(
      'card relative overflow-hidden transition-all duration-300 hover:shadow-xl',
      'border-2',
      'opacity-100'
    )}>
      {/* Rarity border */}
      <div className={`absolute inset-0 border-2 ${rarityColors[achievement.rarity] || rarityColors.common}`} />
      
      <div className="relative p-6">
        {/* Rarity badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            'badge px-2 py-1 text-xs font-medium uppercase tracking-wider',
            'capitalize',
            {
              common: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
              uncommon: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
              rare: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
              epic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
              legendary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            }[achievement.rarity] || 'bg-gray-100 text-gray-700')
          }>
            {achievement.rarity}
          </span>
        </div>

        {/* Achievement Icon */}
        <div className="text-center mb-4">
          <div className={cn(
            'h-20 w-20 mx-auto mb-4 rounded-2xl flex items-center justify-center',
            achievement.earned 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
              : 'bg-gray-100 dark:bg-gray-800'
          )}>
            <span className="text-3xl" role="img" aria-label={achievement.title}>
              {achievement.icon}
            </span>
          </div>
          
          {/* Progress ring for unearned */}
          {!achievement.earned && achievement.progress > 0 && (
            <div className="mt-3">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {achievement.progress}% complete
              </p>
            </div>
          )}

          <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-1">
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3 line-clamp-2">
            {achievement.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="flex items-center gap-1">
              <StarIcon className="h-3 w-3 text-amber-500" />
              {achievement.points} XP
            </span>
            <span className="capitalize">{achievement.rarity}</span>
          </div>

          {/* Status */}
          {achievement.earned ? (
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-sm">Unlocked</span>
            </div>
          ) : achievement.isEligible ? (
            <button className="btn-primary w-full py-2 text-sm">
              Claim Reward
            </button>
          ) : (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {achievement.criteria.type === 'module_complete' 
                ? `Complete ${achievement.criteria.value} modules` 
                : achievement.criteria.type === 'streak_days'
                ? `Maintain ${achievement.criteria.value}-day streak`
                : achievement.criteria.type === 'path_complete'
                ? `Complete ${achievement.criteria.value} pathway`
                : 'Continue learning to unlock'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}