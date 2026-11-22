/**
 * HSE Learning Guide - Path Detail Page
 * Detailed view of a learning path with module progression
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LEARNING_PATHS, getModuleById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ArrowLeftIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ClockIcon,
  BookOpenIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export function PathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const {
    progress,
    getPathProgress,
    startPath,
    isModuleCompleted,
    startModule,
  } = useApp();

  const path = useMemo(() => LEARNING_PATHS.find(p => p.id === pathId), [pathId]);
  const pathProgress = path ? getPathProgress(path.id) : { completed: 0, total: 0, percentage: 0 };

  if (!path) {
    return <PathNotFound />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/paths" className="btn-ghost inline-flex items-center gap-2">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Paths
      </Link>

      {/* Path Header */}
      <div className="card overflow-hidden">
        <div className="relative h-56 bg-gradient-to-br from-hse-primary via-hse-secondary to-hse-accent">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="badge bg-white/20 text-white mb-2">{path.targetLevel}</span>
                {path.certificationEligible && (
                  <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <TrophyIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Certification Eligible
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white">{pathProgress.percentage}%</p>
                <p className="text-white/80">{pathProgress.completed} of {pathProgress.total} modules</p>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{path.title}</h1>
              <p className="text-white/90 max-w-2xl">{path.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-white/20">
            <div
              className="h-full bg-white rounded-t-lg transition-all duration-500"
              style={{ width: `${pathProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats & Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-6 text-center">
          <ChartBarIcon className="h-10 w-10 text-hse-primary mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pathProgress.percentage}%</p>
          <p className="text-gray-500 dark:text-gray-400">Completion</p>
        </div>
        <div className="card p-6 text-center">
          <ClockIcon className="h-10 w-10 text-hse-accent mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{path.estimatedHours}h</p>
          <p className="text-gray-500 dark:text-gray-400">Estimated Time</p>
        </div>
        <div className="card p-6 text-center">
          <BookOpenIcon className="h-10 w-10 text-hse-success mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{path.modules.length}</p>
          <p className="text-gray-500 dark:text-gray-400">Total Modules</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {progress[path.modules[0]?.moduleId] ? (
          <button
            type="button"
            onClick={() => startModule(path.modules.find(m => {
              const prog = progress[m.moduleId];
              return !prog || prog.status === 'not-started';
            })?.moduleId || path.modules[0].moduleId)}
            className="btn-primary flex items-center gap-2"
          >
            <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
            Continue Path
          </button>
        ) : (
          <button
            type="button"
            onClick={() => startPath(path.id)}
            className="btn-primary flex items-center gap-2"
          >
            <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
            Start Path
          </button>
        )}
        <Link to={`/modules/${path.modules[0].moduleId}`} className="btn-secondary">
          View First Module
        </Link>
        {path.certificationEligible && pathProgress.percentage === 100 && (
          <button className="btn-accent flex items-center gap-2">
            <TrophyIcon className="h-5 w-5" aria-hidden="true" />
            Claim Certificate
          </button>
        )}
      </div>

      {/* Modules */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Path Curriculum
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {path.modules.map((pathModule, index) => {
            const module = getModuleById(pathModule.moduleId);
            if (!module) return null;

            const prog = progress[module.id];
            const isCompleted = prog?.status === 'completed' || prog?.status === 'mastered';
            const isInProgress = prog?.status === 'in-progress';
            const isLocked = index > 0 && path.modules.slice(0, index).some(m => {
              const p = progress[m.moduleId];
              return !p || (p.status !== 'completed' && p.status !== 'mastered');
            });
            const isCurrent = !isCompleted && !isLocked && (isInProgress || index === 0);

            return (
              <div key={module.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={cn('flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium', isCompleted ? 'bg-hse-success text-white' : isInProgress ? 'bg-hse-primary text-white' : isLocked ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-hse-primary/10 text-hse-primary')}>
                    {isCompleted ? (
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                    ) : isLocked ? (
                      <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                    ) : isCurrent ? (
                      <SparklesIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Module Info */}
                  <Link to={`/modules/${module.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-hse-primary transition-colors">{module.title}</h3>
                      {pathModule.required && (
                        <span className="badge-primary text-xs">Required</span>
                      )}
                      {pathModule.milestone && (
                        <span className="badge-accent text-xs">Milestone</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{module.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {module.estimatedHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpenIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {module.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1 capitalize">{module.difficulty}</span>
                    </div>
                  </Link>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <span className="btn-success text-sm">
                        <CheckCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        Done
                      </span>
                    ) : isLocked ? (
                      <span className="btn-secondary text-sm" disabled>
                        <LockClosedIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        Locked
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startModule(module.id)}
                        className="btn-primary text-sm"
                      >
                        {isInProgress ? (
                          <>
                            <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                            Continue
                          </>
                        ) : (
                          <>
                            <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                            Start
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Path Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
              Learning Objectives
            </h3>
          </div>
          <div className="card-body">
            <ul className="space-y-2">
              {path.modules.flatMap(m => {
                const module = getModuleById(m.moduleId);
                return module?.learningObjectives.slice(0, 2).map((obj, i) => (
                  <li key={`${m.moduleId}-${i}`} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-hse-primary/10 text-hse-primary flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                )) || [];
              })}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
              Path Details
            </h3>
          </div>
          <div className="card-body">
            <dl className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Target Level</dt>
                <dd className="font-medium text-gray-900 dark:text-white capitalize">{path.targetLevel}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Target Role</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.targetRole || 'General HSE'}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Certification</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.certificationEligible ? 'Yes' : 'No'}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Modules</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.modules.length}</dd>
              </div>
              {path.prerequisites.length > 0 && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Prerequisites</dt>
                  <dd className="font-medium text-gray-900 dark:text-white mt-1">
                    <div className="flex flex-wrap gap-2">
                      {path.prerequisites.map((prereqId: string) => {
                        const prereq = LEARNING_PATHS.find(p => p.id === prereqId);
                        return prereq ? (
                          <Link key={prereqId} to={`/paths/${prereqId}`} className="badge-secondary hover:bg-hse-primary/10 hover:text-hse-primary">
                            {prereq.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Path Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The learning path you're looking for doesn't exist.
        </p>
        <Link to="/paths" className="btn-primary">
          Browse All Paths
        </Link>
      </div>
    </div>
  );
}