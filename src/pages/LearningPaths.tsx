/**
 * HSE Learning Guide - Learning Paths Page
 * Browse and enroll in guided certification pathways
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LEARNING_PATHS, getModuleById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayCircleIcon,
  LockClosedIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export function LearningPaths() {
  const {
    progress,
    getPathProgress,
    startPath,
    user,
  } = useApp();

  const pathsWithProgress = useMemo(() => {
    return LEARNING_PATHS.map(path => {
      const pathProgress = getPathProgress(path.id);
      const isEnrolled = Object.keys(progress).some(moduleId =>
        path.modules.some(m => m.moduleId === moduleId)
      );
      const canAccess = path.prerequisites.length === 0 || path.prerequisites.every(p =>
        Object.values(progress).some(pr => pr.moduleId === p && (pr.status === 'completed' || pr.status === 'mastered'))
      );

      return { ...path, pathProgress, isEnrolled, canAccess };
    });
  }, [progress, getPathProgress]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Paths</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Guided pathways to certification. Complete structured curriculums designed for your career level.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={AcademicCapIcon}
          iconColor="text-hse-primary bg-hse-primary/10"
          value={LEARNING_PATHS.length}
          label="Available Paths"
          subtitle="Certification tracks"
        />
        <StatCard
          icon={ChartBarIcon}
          iconColor="text-hse-accent bg-hse-accent/10"
          value={pathsWithProgress.filter(p => p.isEnrolled).length}
          label="Enrolled"
          subtitle="Active paths"
        />
        <StatCard
          icon={TrophyIcon}
          iconColor="text-hse-warning bg-hse-warning/10"
          value={pathsWithProgress.filter(p => p.pathProgress.percentage === 100).length}
          label="Completed"
          subtitle="Certifications earned"
        />
        <StatCard
          icon={ClockIcon}
          iconColor="text-hse-success bg-hse-success/10"
          value={pathsWithProgress.reduce((sum, p) => sum + p.estimatedHours, 0)}
          label="Total Hours"
          subtitle="Learning content"
        />
      </div>

      {/* Paths Grid */}
      <div className="space-y-6">
        {pathsWithProgress.map(path => (
          <PathCard
            key={path.id}
            path={path}
            onClick={() => startPath(path.id)}
            progress={progress}
          />
        ))}
      </div>

      {pathsWithProgress.length === 0 && (
        <div className="text-center py-12">
          <AcademicCapIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No learning paths available</h3>
          <p className="text-gray-500 dark:text-gray-400">Check back soon for new certification pathways.</p>
        </div>
      )}
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

function PathCard({
  path,
  onClick,
  progress,
}: {
  path: any;
  onClick: () => void;
  progress: Record<string, any>;
}) {
  const { pathProgress, isEnrolled, canAccess, modules } = path;
  const requiredModules = modules.filter((m: any) => m.required);
  const totalModules = requiredModules.length;
  const completedModules = requiredModules.filter((m: any) => {
    const prog = progress[m.moduleId];
    return prog?.status === 'completed' || prog?.status === 'mastered';
  }).length;

  const difficultyColors = {
    beginner: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    intermediate: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    advanced: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    professional: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  };

  return (
    <Link
      to={`/paths/${path.id}`}
      className="card group overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 bg-gradient-to-br from-hse-primary to-hse-secondary">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className={cn('badge text-sm', difficultyColors[path.targetLevel as keyof typeof difficultyColors] || 'badge-primary')}>
                {path.targetLevel.charAt(0).toUpperCase() + path.targetLevel.slice(1)}
              </span>
              {path.certificationEligible && (
                <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ml-2">
                  <TrophyIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Certification
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{pathProgress.percentage}%</p>
              <p className="text-white/80 text-sm">{completedModules}/{totalModules} modules</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{path.title}</h3>
            <p className="text-white/90 mt-1 max-w-md">{path.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${pathProgress.percentage}%` }}
          />
        </div>
      </div>

      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              {path.estimatedHours}h total
            </span>
            <span className="flex items-center gap-1">
              <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
              {modules.length} modules
            </span>
            {path.targetRole && (
              <span className="flex items-center gap-1">
                <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                {path.targetRole}
              </span>
            )}
          </div>

          {isEnrolled ? (
            <span className="btn-success text-sm">
              <CheckCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Enrolled
            </span>
          ) : !canAccess ? (
            <span className="btn-secondary text-sm" disabled>
              <LockClosedIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Locked
            </span>
          ) : (
            <span className="btn-primary text-sm">
              <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Start Path
            </span>
          )}
        </div>

        {/* Module Preview */}
        <div className="space-y-2">
          {requiredModules.slice(0, 4).map((pathModule: any, index: number) => {
            const module = getModuleById(pathModule.moduleId);
            const prog = progress[pathModule.moduleId];
            const isCompleted = prog?.status === 'completed' || prog?.status === 'mastered';
            const isCurrent = !isCompleted && requiredModules.slice(0, index).every(m => {
              const p = progress[m.moduleId];
              return p?.status === 'completed' || p?.status === 'mastered';
            });

            return module && (
              <div key={module.id} className="flex items-center gap-3 p-2 rounded-lg group hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className={cn('flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-sm font-medium', isCompleted ? 'bg-hse-success text-white' : isCurrent ? 'bg-hse-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400')}>
                  {isCompleted ? <CheckCircleIcon className="h-5 w-5" aria-hidden="true" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0 text-sm">
                  <p className="font-medium truncate">{module.shortTitle}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{module.estimatedHours}h</p>
                </div>
                {isCurrent && <SparklesIcon className="h-4 w-4 text-hse-accent animate-pulse" aria-hidden="true" />}
              </div>
            );
          })}
          {requiredModules.length > 4 && (
            <div className="text-center text-sm text-hse-primary hover:text-hse-secondary font-medium py-2">
              +{requiredModules.length - 4} more modules
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Progress is accessed via useApp hook