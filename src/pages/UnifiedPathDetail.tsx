/**
 * Unified Path Detail Page
 * Detailed view of a learning path with topic progression
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UNIFIED_LEARNING_PATHS, getModuleById, getTopicsForPath } from '../data/unified-standards';
import { UNIFIED_TOPICS, getTopicById } from '../data/unified-standards';
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
import { useApp } from '../context/AppContext';

export function UnifiedPathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const { progress, getPathProgress, startPath, isTopicCompleted, startTopic } = useApp();

  const path = useMemo(() => UNIFIED_LEARNING_PATHS.find(p => p.id === pathId), [pathId]);
  const pathProgress = path ? getPathProgress(path.id) : { completed: 0, total: 0, percentage: 0 };

  if (!path) {
    return <PathNotFound />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/paths" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Pathways
      </Link>

      {/* Path Header */}
      <div className="card overflow-hidden">
        <div className="relative h-56 bg-gradient-to-br from-blue-900 via-blue-700 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="badge bg-white/20 text-white mb-2">{path.targetAudience?.split(',')[0] || 'All Levels'}</span>
                {path.certificationsEligible && (
                  <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ml-2">
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
            <div className="h-full bg-white rounded-t-lg transition-all duration-500" style={{ width: `${pathProgress.percentage}%` }} />
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
          <ClockIcon className="h-10 w-10 text-amber-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{path.estimatedHours}h</p>
          <p className="text-gray-500 dark:text-gray-400">Estimated Time</p>
        </div>
        <div className="card p-6 text-center">
          <BookOpenIcon className="h-10 w-10 text-green-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{path.modules.length}</p>
          <p className="text-gray-500 dark:text-gray-400">Total Modules</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {progress[path.modules[0]?.topicId] ? (
          <button
            type="button"
            onClick={() => startTopic(path.modules.find(m => {
              const prog = progress[m.topicId];
              return !prog || prog.status === 'not-started';
            })?.topicId || path.modules[0].topicId)}
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
        <Link to={`/topics/${path.modules[0].topicId}`} className="btn-secondary">
          View First Topic
        </Link>
        {path.certificationsEligible && pathProgress.percentage === 100 && (
          <button className="btn-primary bg-amber-500 hover:bg-amber-600 flex items-center gap-2">
            <TrophyIcon className="h-5 w-5" aria-hidden="true" />
            Claim Certificate
          </button>
        )}
      </div>

      {/* Modules */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Path Curriculum
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {path.modules.map((pathModule, index) => {
            const topic = UNIFIED_TOPICS.find(t => t.topicId === pathModule.topicId);
            if (!topic) return null;

            const prog = progress[topic.topicId];
            const isCompleted = prog?.status === 'completed' || prog?.status === 'mastered';
            const isInProgress = prog?.status === 'in-progress';
            const isLocked = index > 0 && path.modules.slice(0, index).some(m => {
              const t = UNIFIED_TOPICS.find(t => t.topicId === m.topicId);
              const p = t ? progress[t.topicId] : null;
              return !p || (p.status !== 'completed' && p.status !== 'mastered');
            });
            const isCurrent = !isCompleted && !isLocked && (isInProgress || index === 0);

            return (
              <div key={topic.topicId} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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

                  {/* Topic Info */}
                  <Link to={`/topics/${topic.topicId}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{topic.topicName}</h3>
                      {pathModule.required && (
                        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Required</span>
                      )}
                      {pathModule.milestone && (
                        <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Milestone</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{topic.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {topic.estimatedHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {Object.keys(topic.frameworks).length} frameworks
                      </span>
                      <span className="flex items-center gap-1 capitalize">{topic.difficulty}</span>
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
                        onClick={() => startTopic(topic.topicId)}
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
                const topic = UNIFIED_TOPICS.find(t => t.topicId === m.topicId);
                return topic?.learningObjectives?.slice(0, 2).map((obj: string, i: number) => (
                  <li key={`${m.topicId}-${i}`} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
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
                <dt className="text-gray-500 dark:text-gray-400">Target Audience</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.targetAudience}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Certification</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.certificationsEligible ? 'Yes' : 'No'}</dd>
                <dt className="text-gray-500 dark:text-gray-400">Estimated Hours</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.estimatedHours}h</dd>
                <dt className="text-gray-500 dark:text-gray-400">Modules</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{path.modules.length}</dd>
              </div>
              {path.prerequisites.length > 0 && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Prerequisites</dt>
                  <dd className="font-medium text-gray-900 dark:text-white mt-1">
                    <div className="flex flex-wrap gap-2">
                      {path.prerequisites.map((prereqId: string) => {
                        const prereq = UNIFIED_LEARNING_PATHS.find(p => p.id === prereqId);
                        return prereq ? (
                          <Link key={prereqId} to={`/paths/${prereqId}`} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600">
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

      {/* Certifications */}
      {path.certifications.length > 0 && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
              Target Certifications
            </h3>
          </div>
          <div className="card-body">
            <div className="flex flex-wrap gap-2">
              {path.certifications.map((cert: string) => (
                <span key={cert} className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Complete this pathway to be eligible for these certifications.
            </p>
          </div>
        </div>
      )}

      {/* Career Outcomes */}
      {path.careerOutcomes && path.careerOutcomes.length > 0 && (
        <div className="card border-l-4 border-l-green-500">
          <div className="card-header flex items-center gap-3 bg-green-50 dark:bg-green-900/20">
            <RocketLaunchIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Career Outcomes</h3>
          </div>
          <div className="card-body">
            <ul className="space-y-2">
              {path.careerOutcomes.map((outcome: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-medium">
                    {i + 1}
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
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
          Browse All Pathways
        </Link>
      </div>
    </div>
  );
}