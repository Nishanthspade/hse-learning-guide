/**
 * HSE Learning Guide - Dashboard Page
 * Main landing page showing progress, recommendations, and quick actions
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HSE_MODULES, LEARNING_PATHS, getModuleById, getLearningPathById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner, SkeletonCard } from '../components/ui/LoadingSpinner';
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  FireIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

export function Dashboard() {
  const {
    user,
    progress,
    modules,
    learningPaths,
    currentStreak,
    todayMinutes,
    dailyGoalMinutes,
    getModuleWithProgress,
    getPathProgress,
    isModuleCompleted,
    startModule,
    startPath,
  } = useApp();

  // Calculate stats
  const stats = useMemo(() => {
    const completedModules = Object.values(progress).filter(p => p.status === 'completed' || p.status === 'mastered').length;
    const inProgressModules = Object.values(progress).filter(p => p.status === 'in-progress').length;
    const totalModules = modules.length;
    const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);
    const completedHours = Object.entries(progress)
      .filter(([_, p]) => p.status === 'completed' || p.status === 'mastered')
      .reduce((sum, [id]) => sum + (getModuleById(id)?.estimatedHours ?? 0), 0);
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
      avgScore: Math.round(avgScore),
      currentStreak,
      todayMinutes,
      dailyGoalMinutes,
    };
  }, [progress, modules]);

  // Get in-progress modules
  const inProgressModules = useMemo(() => {
    return Object.entries(progress)
      .filter(([_, p]) => p.status === 'in-progress')
      .sort((a, b) => new Date(b[1].lastAccessedAt).getTime() - new Date(a[1].lastAccessedAt).getTime())
      .slice(0, 4)
      .map(([id]) => getModuleWithProgress(id))
      .filter(Boolean);
  }, [progress, getModuleWithProgress]);

  // Get recommended modules (next in path or prerequisites met)
  const recommendedModules = useMemo(() => {
    const completedIds = new Set(
      Object.entries(progress)
        .filter(([_, p]) => p.status === 'completed' || p.status === 'mastered')
        .map(([id]) => id)
    );

    return modules
      .filter(m => {
        if (completedIds.has(m.id)) return false;
        if (progress[m.id]?.status === 'in-progress') return false;
        // Check prerequisites
        return m.prerequisites.every(p => completedIds.has(p));
      })
      .sort((a, b) => a.difficulty.localeCompare(b.difficulty))
      .slice(0, 4);
  }, [progress, modules]);

  // Get active learning path
  const activePath = useMemo(() => {
    // In a real app, this would be user-selected
    return learningPaths[0]; // HSE Officer Foundation
  }, [learningPaths]);

  const pathProgress = activePath ? getPathProgress(activePath.id) : { completed: 0, total: 0, percentage: 0 };

  if (!user) {
    return <DashboardGuest />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Continue your journey to becoming a certified HSE Officer
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="btn-ghost text-sm"
          >
            <ClockIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Daily Goal: {todayMinutes}/{dailyGoalMinutes} min
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircleIcon}
          iconColor="text-hse-success bg-hse-success/10"
          value={stats.completedModules}
          label="Completed"
          subtitle={`${stats.completionRate}% of ${stats.totalModules} modules`}
        />
        <StatCard
          icon={PlayCircleIcon}
          iconColor="text-hse-primary bg-hse-primary/10"
          value={stats.inProgressModules}
          label="In Progress"
          subtitle={`${stats.completedHours}h / ${stats.totalHours}h completed`}
        />
        <StatCard
          icon={TrophyIcon}
          iconColor="text-hse-accent bg-hse-accent/10"
          value={`${stats.avgScore}%`}
          label="Avg Score"
          subtitle={stats.avgScore > 0 ? 'Assessment average' : 'No assessments yet'}
        />
        <StatCard
          icon={FireIcon}
          iconColor="text-hse-danger bg-hse-danger/10"
          value={stats.currentStreak}
          label="Day Streak"
          subtitle={`${stats.todayMinutes} min today • ${stats.dailyGoalMinutes} min goal`}
        />
      </div>

      {/* Active Learning Path */}
      {activePath && (
        <section className="card">
          <div className="card-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-hse-primary/10 flex items-center justify-center">
                <AcademicCapIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{activePath.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activePath.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {pathProgress.percentage}%
              </span>
              <Link
                to={`/paths/${activePath.id}`}
                className="btn-primary text-sm"
              >
                Continue <ArrowRightIcon className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-hse-primary rounded-full transition-all duration-500"
                style={{ width: `${pathProgress.percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {pathProgress.completed} of {pathProgress.total} required modules completed
            </p>
          </div>
        </section>
      )}

      {/* Continue Learning */}
      {(inProgressModules.length > 0 || recommendedModules.length > 0) && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PlayCircleIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
              Continue Learning
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inProgressModules.map(module => (
              <ModuleCard
                key={module!.id}
                module={module!}
                variant="continue"
                onClick={() => startModule(module!.id)}
              />
            ))}
            {inProgressModules.length < 4 && recommendedModules.slice(0, 4 - inProgressModules.length).map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                variant="recommended"
                onClick={() => startModule(module.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <ActionCard
            icon={BookOpenIcon}
            label="Browse Modules"
            description="Explore all HSE topics"
            href="/modules"
            color="hse-primary"
          />
          <ActionCard
            icon={AcademicCapIcon}
            label="Learning Paths"
            description="Guided certification tracks"
            href="/paths"
            color="hse-secondary"
          />
          <ActionCard
            icon={ClipboardDocumentListIcon}
            label="Assessments"
            description="Test your knowledge"
            href="/assessments"
            color="hse-accent"
          />
          <ActionCard
            icon={BuildingLibraryIcon}
            label="Resources"
            description="Checklists, procedures & more"
            href="/resources"
            color="hse-success"
          />
        </div>
      </section>

      {/* Recently Viewed */}
      {/* This would come from context in a real implementation */}
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

function ModuleCard({
  module,
  variant,
  onClick,
}: {
  module: ReturnType<typeof getModuleWithProgress> & { progress?: { status: string } };
  variant: 'continue' | 'recommended';
  onClick: () => void;
}) {
  const progress = module.progress;
  const isCompleted = progress?.status === 'completed' || progress?.status === 'mastered';
  const isInProgress = progress?.status === 'in-progress';

  return (
    <button
      type="button"
      onClick={onClick}
      className="card group h-full flex flex-col transition-all duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{getCategoryIcon(module.category)}</span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <DifficultyBadge difficulty={module.difficulty} />
        </div>
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-primary text-xs">{module.category.replace('-', ' ')}</span>
          {isInProgress && <span className="badge-accent text-xs">In Progress</span>}
          {isCompleted && <span className="badge-success text-xs">Completed</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{module.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1">{module.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {module.estimatedHours}h
          </span>
          {isInProgress && progress && (
            <span className="font-medium text-hse-primary">
              {Math.round((progress.completedLessons.length / module.lessons.length) * 100)}%
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ActionCard({
  icon: Icon,
  label,
  description,
  href,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  href: string;
  color: 'hse-primary' | 'hse-secondary' | 'hse-accent' | 'hse-success';
}) {
  const colorClasses = {
    'hse-primary': 'text-hse-primary bg-hse-primary/10 hover:bg-hse-primary/20',
    'hse-secondary': 'text-hse-secondary bg-hse-secondary/10 hover:bg-hse-secondary/20',
    'hse-accent': 'text-hse-accent bg-hse-accent/10 hover:bg-hse-accent/20',
    'hse-success': 'text-hse-success bg-hse-success/10 hover:bg-hse-success/20',
  };

  return (
    <Link
      to={href}
      className={cn(
        'card p-4 flex flex-col items-center text-center group',
        'hover:shadow-md transition-shadow'
      )}
    >
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-3', colorClasses[color])}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </Link>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    basic: 'badge-primary',
    intermediate: 'badge-accent',
    advanced: 'badge-warning',
    expert: 'badge-danger',
  };
  return <span className={cn('badge text-xs', colors[difficulty as keyof typeof colors] || 'badge-secondary')}>{difficulty}</span>;
}

function getCategoryIcon(category: string): string {
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
  return icons[category] || '📖';
}

// Guest Dashboard (not logged in)
function DashboardGuest() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-hse-primary/10 flex items-center justify-center">
        <span className="text-4xl">🛡️</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to HSE Learning Guide
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
        Your comprehensive platform for mastering Health, Safety, and Environment.
        Learn from beginner to professional with interactive modules, assessments, and certifications.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/register" className="btn-primary text-lg px-8 py-3">
          Start Free
        </a>
        <a href="/login" className="btn-secondary text-lg px-8 py-3">
          Sign In
        </a>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-hse-primary">{HSE_MODULES.length}+</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Modules</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-hse-primary">{LEARNING_PATHS.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Learning Paths</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-hse-primary">4</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Frameworks</p>
        </div>
      </div>
    </div>
  );
}