/**
 * HSE Learning Guide - Progress Page
 * Comprehensive progress tracking and analytics
 */

import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HSE_MODULES, LEARNING_PATHS, getModuleById, getLearningPathById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  FireIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export function Progress() {
  const {
    user,
    progress,
    modules,
    learningPaths,
    getModuleWithProgress,
    getPathProgress,
    isModuleCompleted,
    currentStreak,
    todayMinutes,
    dailyGoalMinutes,
  } = useApp();

  // Calculate overall stats
  const stats = useMemo(() => {
    const completedModules = Object.values(progress).filter(p => p.status === 'completed' || p.status === 'mastered').length;
    const inProgressModules = Object.values(progress).filter(p => p.status === 'in-progress').length;
    const totalModules = modules.length;
    const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);
    const completedHours = Object.entries(progress)
      .filter(([_, p]) => p.status === 'completed' || p.status === 'mastered')
      .reduce((sum, [id]) => sum + (getModuleById(id)?.estimatedHours ?? 0), 0);
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = Object.values(progress).flatMap(p => p.completedLessons).length;
    const avgScore = Object.values(progress)
      .flatMap(p => p.quizScores)
      .reduce((sum, q, _, arr) => sum + q.percentage / arr.length, 0) || 0;

    return {
      completedModules,
      inProgressModules,
      totalModules,
      completionRate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      totalHours,
      completedHours,
      totalLessons,
      completedLessons,
      lessonCompletionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      avgScore: Math.round(avgScore),
      currentStreak,
      todayMinutes,
      dailyGoalMinutes,
    };
  }, [progress, modules]);

  // Category progress
  const categoryProgress = useMemo(() => {
    const categories = [...new Set(modules.map(m => m.category))];
    return categories.map(category => {
      const catModules = modules.filter(m => m.category === category);
      const completed = catModules.filter(m => isModuleCompleted(m.id)).length;
      const inProgress = catModules.filter(m => progress[m.id]?.status === 'in-progress').length;
      return {
        category,
        total: catModules.length,
        completed,
        inProgress,
        percentage: catModules.length > 0 ? Math.round((completed / catModules.length) * 100) : 0,
      };
    }).filter(c => c.total > 0);
  }, [modules, progress]);

  // Learning path progress
  const pathProgress = useMemo(() => {
    return learningPaths.map(path => ({
      ...path,
      progress: getPathProgress(path.id),
    }));
  }, [learningPaths, getPathProgress]);

  // Recent activity
  const recentActivity = useMemo(() => {
    return Object.entries(progress)
      .filter(([_, p]) => p.lastAccessedAt)
      .sort((a, b) => new Date(b[1].lastAccessedAt).getTime() - new Date(a[1].lastAccessedAt).getTime())
      .slice(0, 10)
      .map(([moduleId, p]) => {
        const module = getModuleById(moduleId);
        return {
          module,
          progress: p,
          date: p.lastAccessedAt,
        };
      }).filter(a => a.module);
  }, [progress]);

  // Weekly activity (mock data for chart)
  const weeklyActivity = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      minutes: Math.floor(Math.random() * 60) + (i === new Date().getDay() ? todayMinutes : 0),
    }));
  }, [todayMinutes]);

  if (!user) {
    return <AuthRequired />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Progress</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your HSE learning journey</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 p-3 bg-hse-primary/10 rounded-lg">
            <FireIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-hse-primary">{currentStreak}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-hse-accent/10 rounded-lg">
            <ClockIcon className="h-5 w-5 text-hse-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-hse-accent">{todayMinutes}/{dailyGoalMinutes} min</p>
              <p className="text-xs text-gray-500">Today's Goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={CheckCircleIcon}
          iconColor="text-hse-success bg-hse-success/10"
          value={stats.completedModules}
          label="Completed"
          subtitle={`${stats.completionRate}% of modules`}
        />
        <StatCard
          icon={ChartBarIcon}
          iconColor="text-hse-primary bg-hse-primary/10"
          value={stats.inProgressModules}
          label="In Progress"
          subtitle={`${stats.completedHours}h / ${stats.totalHours}h`}
        />
        <StatCard
          icon={TrophyIcon}
          iconColor="text-hse-warning bg-hse-warning/10"
          value={`${stats.avgScore}%`}
          label="Avg Score"
          subtitle="Assessment average"
        />
        <StatCard
          icon={ClockIcon}
          iconColor="text-hse-info bg-hse-info/10"
          value={`${stats.completedHours}h`}
          label="Hours Learned"
          subtitle={`of ${stats.totalHours}h total`}
        />
        <StatCard
          icon={FireIcon}
          iconColor="text-hse-danger bg-hse-danger/10"
          value={stats.currentStreak}
          label="Streak"
          subtitle="Days in a row"
        />
      </div>

      {/* Weekly Activity Chart */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Weekly Activity
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</span>
        </div>
        <div className="card-body">
          <div className="flex items-end justify-center gap-3 h-48">
            {weeklyActivity.map((day, i) => {
              const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes), 1);
              const height = Math.max((day.minutes / maxMinutes) * 100, 8);
              const isToday = i === new Date().getDay();
              return (
                <div key={day.day} className="flex-1 max-w-16 flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-full rounded-t transition-all duration-500',
                      isToday ? 'bg-hse-primary' : 'bg-gray-200 dark:bg-gray-700'
                    )}
                    style={{ height: `${height}%` }}
                    title={`${day.day}: ${day.minutes} min`}
                  />
                  <span className={cn('text-xs font-medium', isToday ? 'text-hse-primary' : 'text-gray-500 dark:text-gray-400')}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="card">
        <div className="card-header">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Progress by Category
          </h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {categoryProgress
              .filter(c => c.total > 0)
              .sort((a, b) => b.percentage - a.percentage)
              .map(cat => (
                <CategoryProgressRow key={cat.category} category={cat} />
              ))}
          </div>
        </div>
      </div>

      {/* Learning Paths Progress */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <AcademicCapIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Learning Paths
          </h3>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            {pathProgress.map(p => (
              <Link
                key={p.id}
                to={`/paths/${p.id}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-hse-primary/10 flex items-center justify-center flex-shrink-0">
                  <AcademicCapIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{p.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.targetLevel} • {p.estimatedHours}h</p>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-hse-primary rounded-full"
                      style={{ width: `${p.progress.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12">{p.progress.percentage}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Recent Activity
          </h3>
        </div>
        <div className="card-body p-0">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" aria-hidden="true" />
              <p>No recent activity</p>
              <p className="text-sm">Start a module to see your activity here</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity, i) => (
                <li key={i} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <Link to={`/modules/${activity.module?.id}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-hse-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{getCategoryIcon(activity.module?.category)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{activity.module?.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last accessed {formatDistance(activity.date)}
                      </p>
                    </div>
                    <span className={cn('text-sm font-medium', activity.progress?.status === 'completed' ? 'text-hse-success' : 'text-hse-primary')}>
                      {activity.progress?.status === 'completed' ? 'Completed' : activity.progress?.status === 'in-progress' ? 'In Progress' : 'Started'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Certificates */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Certificates Earned
          </h3>
        </div>
        <div className="card-body">
          {user?.certifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <DocumentTextIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" aria-hidden="true" />
              <p>No certificates yet</p>
              <p className="text-sm">Complete a learning path to earn certifications</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user?.certifications.map((cert: any) => (
                <div key={cert.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuingBody}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({
  icon: Icon,
  iconColor,
  value,
  label,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  value: string | number;
  label: string;
  subtitle: string;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', iconColor)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryProgressRow({ category }: { category: any }) {
  const categoryLabel = category.category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-900 dark:text-white">{categoryLabel}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-hse-primary rounded-full transition-all duration-500"
          style={{ width: `${category.percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {category.completed}/{category.total} modules • {category.inProgress} in progress
      </p>
    </div>
  );
}

function AuthRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <ChartBarIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to view your progress.
        </p>
        <a href="/login" className="btn-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}

function getCategoryIcon(category?: string): string {
  const icons: Record<string, string> = {
    'fall-protection': '🛡️',
    'confined-space': '📦',
    'fire-safety': '🔥',
    'chemical-safety': '⚗️',
    'electrical-safety': '⚡',
    'lockout-tagout': '🔒',
    'machine-guarding': '⚙️',
    'ppe': '🪖',
    'respiratory-protection': '🫁',
    'hazard-communication': '🏷️',
    'scaffolding': '🏗️',
    'excavation': '🕳️',
    'crane-rigging': '🏗️',
    'welding-cutting': '🔥',
    'ergonomics': '🧍',
    'hearing-conservation': '👂',
    'heat-cold-stress': '🌡️',
    'bloodborne-pathogens': '🩸',
    'emergency-response': '🚨',
    'incident-investigation': '🔍',
    'risk-assessment': '📋',
    'safety-management-systems': '📋',
    'regulatory-compliance': '⚖️',
    'environmental-protection': '🌿',
    'industrial-hygiene': '🔬',
    'behavioral-safety': '🧠',
    'process-safety': '🏭',
    'construction-safety': '🏗️',
    'oil-gas-safety': '🛢️',
    'transportation-safety': '🚛',
    'hse-fundamentals': '📚',
  };
  return icons[category || ''] || '📖';
}

function formatDistance(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}