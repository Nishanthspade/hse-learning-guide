/**
 * ADNOC Path Detail Page
 * Detailed view of the ADNOC HSE Mastery learning path
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ADNOC_MODULES, ADNOC_LEARNING_PATH, getADNOCModules, getADNOCModulesByCategory } from '../data/adnoc-content';
import { cn } from '../utils/cn';
import {
  ArrowLeftIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  TrophyIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export function ADNOCPathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const {
    progress,
    getPathProgress,
    startPath,
    isModuleCompleted,
    startModule,
  } = useApp();

  const path = ADNOC_LEARNING_PATH;
  const pathProgress = path ? getPathProgress(path.id) : { completed: 0, total: 0, percentage: 0 };

  if (!path) {
    return <PathNotFound />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/adnoc" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to ADNOC Dashboard
      </Link>

      {/* Path Header */}
      <div className="card overflow-hidden">
        <div className="relative h-56 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="badge bg-white/20 text-white mb-2">ADNOC Mastery Pathway</span>
                <span className="badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ml-2">
                  <TrophyIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Certification Eligible
                </span>
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
          <ChartBarIcon className="h-10 w-10 text-blue-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pathProgress.percentage}%</p>
          <p className="text-gray-500 dark:text-gray-400">Completion</p>
        </div>
        <div className="card p-6 text-center">
          <ClockIcon className="h-10 w-10 text-blue-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{path.estimatedHours}h</p>
          <p className="text-gray-500 dark:text-gray-400">Estimated Time</p>
        </div>
        <div className="card p-6 text-center">
          <BookOpenIcon className="h-10 w-10 text-blue-600 mx-auto mb-2" aria-hidden="true" />
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
        <Link to={`/adnoc/modules/${path.modules[0].moduleId}`} className="btn-secondary">
          View First Module
        </Link>
        {path.certificationEligible && pathProgress.percentage === 100 && (
          <button className="btn-primary bg-yellow-500 hover:bg-yellow-600 flex items-center gap-2">
            <TrophyIcon className="h-5 w-5" aria-hidden="true" />
            Claim Certificate
          </button>
        )}
      </div>

      {/* Modules */}
      <div className="card overflow-hidden">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Path Curriculum - ADNOC HSE Mastery
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {path.modules.map((pathModule, index) => {
            const module = ADNOC_MODULES.find(m => m.id === pathModule.moduleId);
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
                  <div className={cn('flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium', isCompleted ? 'bg-green-500 text-white' : isInProgress ? 'bg-blue-500 text-white' : isLocked ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400')}>
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
                  <Link to={`/adnoc/modules/${module.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{module.title}</h3>
                      {pathModule.required && (
                        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Required</span>
                      )}
                      {pathModule.milestone && (
                        <span className="badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Milestone</span>
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
                      <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {module.standards.filter(s => s.framework === 'ADNOC').length} ADNOC Standards
                      </span>
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
              <TrophyIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Learning Objectives
            </h3>
          </div>
          <div className="card-body">
            <ul className="space-y-2">
              {path.modules.flatMap(m => {
                const module = ADNOC_MODULES.find(mod => mod.id === m.moduleId);
                return module?.learningObjectives.slice(0, 2).map((obj, i) => (
                  <li key={`${m.moduleId}-${i}`} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-medium">
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
              <ChartBarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Path Details
            </h3>
          </div>
          <div className="card-body">
            <dl className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Target Level</dt>
                <dd className="font-medium text-gray-900 dark:text-white capitalize">{path.targetLevel}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Target Role</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.targetRole || 'ADNOC HSE Professional'}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Certification</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.certificationEligible ? 'Yes' : 'No'}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Modules</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.modules.length}</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Prerequisites</dt>
                <dd className="font-medium text-gray-900 dark:text-white mt-1">
                  <div className="flex flex-wrap gap-2">
                    {path.prerequisites.map((prereqId: string) => {
                      const prereq = ADNOC_MODULES.find(mod => mod.id === prereqId);
                      return prereq ? (
                        <Link key={prereqId} to={`/adnoc/modules/${prereqId}`} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800">
                          {prereq.shortTitle}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Career Outcomes */}
      <div className="card border-l-4 border-l-yellow-500">
        <div className="card-header flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20">
          <TrophyIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Career Outcomes After Completion</h3>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <TrophyIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Eligible for ADNOC HSE Roles</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">HSE Officer, Senior HSE Officer, HSE Engineer positions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <RocketLaunchIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Salary Range AED 15,000 - 55,000+/month</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Based on grade, experience, and certifications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">ADNOC Golden Rules Mastery</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Demonstrate deep understanding of all 10 Life-Saving Rules</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BookOpenIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">ADNOC Standards Expertise</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">100/200/300 Series, Golden Rules, UAE Regulations</p>
              </div>
            </div>
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
          The ADNOC learning path you're looking for doesn't exist.
        </p>
        <Link to="/adnoc" className="btn-primary">
          Back to ADNOC Dashboard
        </Link>
      </div>
    </div>
  );
}