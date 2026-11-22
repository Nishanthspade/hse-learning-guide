/**
 * HSE Learning Guide - Module Detail Page
 * Comprehensive module overview with lessons, assessments, resources, and progress tracking
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getModuleById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ClockIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  TrophyIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const {
    progress,
    getModuleWithProgress,
    isModuleCompleted,
    isLessonCompleted,
    startModule,
    startLesson,
    completeLesson,
    bookmarkedModules,
    toggleBookmark,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'assessments' | 'resources'>('overview');
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  const module = useMemo(() => getModuleById(moduleId!), [moduleId, getModuleById]);
  const moduleWithProgress = useMemo(() => getModuleWithProgress(moduleId!), [moduleId, getModuleWithProgress]);
  const moduleProgress = moduleWithProgress?.progress;
  const isCompleted = moduleProgress ? (moduleProgress.status === 'completed' || moduleProgress.status === 'mastered') : false;
  const isInProgress = moduleProgress?.status === 'in-progress';
  const completedLessons = moduleProgress?.completedLessons || [];
  const completionPercent = module.lessons.length > 0
    ? Math.round((completedLessons.length / module.lessons.length) * 100)
    : 0;

  if (!module) {
    return <ModuleNotFound />;
  }

  // Start module if not started
  React.useEffect(() => {
    if (!moduleProgress) {
      startModule(module.id);
    }
  }, [moduleProgress, module, startModule]);

  const handleLessonClick = (lessonId: string) => {
    startLesson(module.id, lessonId);
  };

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(module.id, lessonId);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="card overflow-hidden">
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-hse-primary to-hse-secondary">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-end p-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                <div>
                  <span className="badge bg-white/20 text-white text-sm mb-2">{formatCategory(module.category)}</span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{module.title}</h1>
                  <p className="text-white/90 mt-1 max-w-2xl">{module.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(module.id)}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      bookmarkedModules.includes(module.id)
                        ? 'bg-white/30 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                      )
                    }
                    aria-label={bookmarkedModules.includes(module.id) ? 'Remove bookmark' : 'Add bookmark'}
                    aria-pressed={bookmarkedModules.includes(module.id)}
                  >
                    <svg className={cn('h-6 w-6', bookmarkedModules.includes(module.id) && 'fill-current')} fill={bookmarkedModules.includes(module.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  {isCompleted ? (
                    <span className="btn-success px-4 py-2" disabled>
                      <CheckCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Completed
                    </span>
                  ) : isInProgress ? (
                    <button
                      type="button"
                      onClick={() => startLesson(module.id, module.lessons.find(l => !completedLessons.includes(l.id))?.id || module.lessons[0].id)}
                      className="btn-primary px-4 py-2"
                    >
                      <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startLesson(module.id, module.lessons[0].id)}
                      className="btn-primary px-4 py-2"
                    >
                      <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Start Module
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex-1 max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <span className="font-medium">{completionPercent}% complete</span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
                  {completedLessons.length}/{module.lessons.length} lessons
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" aria-hidden="true" />
                  ~{module.estimatedHours}h
                </span>
                <span className="flex items-center gap-1">
                  <TrophyIcon className="h-4 w-4" aria-hidden="true" />
                  {module.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px" role="tablist" aria-label="Module sections">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpenIcon },
              { id: 'lessons', label: 'Lessons', icon: ClipboardDocumentListIcon, count: module.lessons.length },
              { id: 'assessments', label: 'Assessments', icon: ShieldCheckIcon, count: module.assessments.length },
              { id: 'resources', label: 'Resources', icon: DocumentTextIcon, count: module.resources.length },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-hse-primary text-hse-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <tab.icon className="h-5 w-5" aria-hidden="true" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={cn('px-2 py-0.5 text-xs rounded-full', activeTab === tab.id ? 'bg-hse-primary/20 text-hse-primary' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400')}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Panels */}
        <div className="card-body">
          {/* Overview Tab */}
          <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab" hidden={activeTab !== 'overview'}>
            <OverviewTab module={module} moduleProgress={moduleProgress} />
          </div>

          {/* Lessons Tab */}
          <div role="tabpanel" id="lessons-panel" aria-labelledby="lessons-tab" hidden={activeTab !== 'lessons'}>
            <LessonsTab
              module={module}
              completedLessons={completedLessons}
              expandedLessons={expandedLessons}
              setExpandedLessons={setExpandedLessons}
              onLessonClick={handleLessonClick}
              onCompleteLesson={handleCompleteLesson}
            />
          </div>

          {/* Assessments Tab */}
          <div role="tabpanel" id="assessments-panel" aria-labelledby="assessments-tab" hidden={activeTab !== 'assessments'}>
            <AssessmentsTab module={module} moduleProgress={moduleProgress} />
          </div>

          {/* Resources Tab */}
          <div role="tabpanel" id="resources-panel" aria-labelledby="resources-tab" hidden={activeTab !== 'resources'}>
            <ResourcesTab module={module} />
          </div>
        </div>
      </div>

      {/* Related Modules */}
      <RelatedModules currentModule={module} />
    </div>
  );
}

// ============================================
// TAB COMPONENTS
// ============================================

function OverviewTab({ module, moduleProgress }: { module: any; moduleProgress: any }) {
  return (
    <div className="space-y-6">
      {/* Learning Objectives */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrophyIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {module.learningObjectives.map((objective: string, index: number) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-hse-primary/10 text-hse-primary flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300">{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key Topics */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          Key Topics Covered
        </h3>
        <div className="flex flex-wrap gap-2">
          {module.tags.map((tag: string) => (
            <span key={tag} className="badge-secondary">{tag.replace('-', ' ')}</span>
          ))}
        </div>
      </section>

      {/* Standards Alignment */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          Standards Alignment
        </h3>
        <div className="space-y-3">
          {module.standards.map((standard: any) => (
            <div key={standard.framework} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 px-3 py-1 bg-hse-primary/10 text-hse-primary rounded-lg text-sm font-medium">
                  {standard.framework}
                </span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{standard.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{standard.standardCode}</p>
                  {standard.sections.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Sections: {standard.sections.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites */}
      {module.prerequisites.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {module.prerequisites.map((prereqId: string) => {
              const prereq = getModuleById(prereqId);
              return prereq ? (
                <Link
                  key={prereqId}
                  to={`/modules/${prereqId}`}
                  className="badge-secondary hover:bg-hse-primary/10 hover:text-hse-primary transition-colors"
                >
                  {prereq.shortTitle}
                </Link>
              ) : null;
            })}
          </div>
        </section>
      )}

      {/* Module Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
          Module Information
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Difficulty</dt>
            <dd className="font-medium text-gray-900 dark:text-white capitalize">{module.difficulty}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Estimated Time</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{module.estimatedHours} hours</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Lessons</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{module.lessons.length}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Assessments</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{module.assessments.length}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Version</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{module.version}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{new Date(module.lastUpdated).toLocaleDateString()}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function LessonsTab({
  module,
  completedLessons,
  expandedLessons,
  setExpandedLessons,
  onLessonClick,
  onCompleteLesson,
}: {
  module: any;
  completedLessons: string[];
  expandedLessons: string[];
  setExpandedLessons: React.Dispatch<React.SetStateAction<string[]>>;
  onLessonClick: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
}) {
  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="space-y-3">
      {module.lessons.map((lesson: any, index: number) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isExpanded = expandedLessons.includes(lesson.id);
        const canAccess = index === 0 || completedLessons.includes(module.lessons[index - 1]?.id);

        return (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            index={index + 1}
            isCompleted={isCompleted}
            isExpanded={isExpanded}
            canAccess={canAccess}
            onClick={() => canAccess && onLessonClick(lesson.id)}
            onToggle={() => toggleLesson(lesson.id)}
            onComplete={() => onCompleteLesson(lesson.id)}
          />
        );
      })}
    </div>
  );
}

function LessonItem({
  lesson,
  index,
  isCompleted,
  isExpanded,
  canAccess,
  onClick,
  onToggle,
  onComplete,
}: {
  lesson: any;
  index: number;
  isCompleted: boolean;
  isExpanded: boolean;
  canAccess: boolean;
  onClick: () => void;
  onToggle: () => void;
  onComplete: () => void;
}) {
  return (
    <div className={cn(
      'card group',
      isCompleted && 'border-hse-success/50 bg-hse-success/5'
    )}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
        aria-expanded={isExpanded}
      >
        <div className={cn('flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center', isCompleted ? 'bg-hse-success/10' : 'bg-gray-100 dark:bg-gray-800')}>
          {isCompleted ? (
            <CheckCircleIcon className="h-5 w-5 text-hse-success" aria-hidden="true" />
          ) : (
            <span className="font-medium text-gray-900 dark:text-white">{index}</span>
          )}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h4 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {lesson.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1 capitalize">{lesson.difficulty}</span>
            <span className="badge-secondary text-xs">{lesson.contentType}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canAccess ? (
            isCompleted ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
                className="btn-ghost text-sm"
              >
                Review
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="btn-primary text-sm"
              >
                <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Start
              </button>
            )
          ) : (
            <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
          <ChevronDownIcon
            className={cn('h-5 w-5 text-gray-400 transition-transform', isExpanded && 'rotate-180')}
            aria-hidden="true"
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{lesson.description}</p>
          <div className="flex flex-wrap gap-2">
            {lesson.learningObjectives.map((obj: string, i: number) => (
              <span key={i} className="badge-primary text-xs">{obj}</span>
            ))}
          </div>
          {lesson.illustrations.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Illustrations</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {lesson.illustrations.map((ill: any) => (
                  <div key={ill.id} className="flex-shrink-0 w-32 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
                    {ill.type === 'diagram' ? '📊' : ill.type === 'photo' ? '📷' : '🎨'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AssessmentsTab({ module, moduleProgress }: { module: any; moduleProgress: any }) {
  if (module.assessments.length === 0) {
    return (
      <div className="text-center py-12">
        <ShieldCheckIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assessments available</h3>
        <p className="text-gray-500 dark:text-gray-400">This module doesn't have formal assessments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {module.assessments.map((assessment: any) => (
        <div key={assessment.id} className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-primary">{assessment.type}</span>
                {assessment.certificateEligible && (
                  <TrophyIcon className="h-5 w-5 text-hse-accent" aria-hidden="true" />
                )}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{assessment.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{assessment.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <ClipboardDocumentListIcon className="h-4 w-4" aria-hidden="true" />
                {assessment.questions.length} questions
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                {assessment.timeLimitMinutes ? `${assessment.timeLimitMinutes} min` : 'No time limit'}
              </span>
              <span className="flex items-center gap-1">
                <TrophyIcon className="h-4 w-4" aria-hidden="true" />
                {assessment.passingScore}% to pass
              </span>
            </div>
            <button
              type="button"
              className="btn-primary"
              disabled={!moduleProgress || moduleProgress.status === 'not-started'}
            >
              <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Start Assessment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResourcesTab({ module }: { module: any }) {
  const allResources = [
    ...module.resources,
    ...module.checklists.map((c: any) => ({ ...c, type: 'checklist' as const })),
    ...module.procedures.map((p: any) => ({ ...p, type: 'procedure' as const })),
    ...module.caseStudies.map((c: any) => ({ ...c, type: 'case-study' as const })),
  ];

  if (allResources.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources available</h3>
        <p className="text-gray-500 dark:text-gray-400">Resources will be added soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {allResources.map((resource: any) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

function ResourceItem({ resource }: { resource: any }) {
  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    pdf: DocumentTextIcon,
    video: PlayCircleIcon,
    link: MagnifyingGlassIcon,
    tool: MagnifyingGlassIcon,
    template: DocumentTextIcon,
    poster: DocumentTextIcon,
    checklist: ClipboardDocumentListIcon,
    procedure: DocumentTextIcon,
    'case-study': MagnifyingGlassIcon,
  };
  const Icon = typeIcons[resource.type] || DocumentTextIcon;

  return (
    <Link
      to={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow group"
    >
      <div className="h-12 w-12 rounded-lg bg-hse-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-6 w-6 text-hse-primary" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-hse-primary transition-colors">{resource.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{resource.description}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="capitalize">{resource.type}</span>
          {resource.fileSize && <span>{resource.fileSize}</span>}
          <span>{resource.language}</span>
        </div>
      </div>
      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-hse-primary transition-colors" aria-hidden="true" />
    </Link>
  );
}

function RelatedModules({ currentModule }: { currentModule: any }) {
  // Find modules with same category or tags
  const related = HSE_MODULES
    .filter(m => m.id !== currentModule.id &&
      (m.category === currentModule.category || m.tags.some((t: string) => currentModule.tags.includes(t))))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
        Related Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map(module => (
          <Link
            key={module.id}
            to={`/modules/${module.id}`}
            className="card group hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-3xl">{getCategoryIcon(module.category)}</span>
            </div>
            <div className="card-body">
              <span className="badge-primary text-xs mb-2">{formatCategory(module.category)}</span>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{module.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {module.estimatedHours}h
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ModuleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Module Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The module you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/modules" className="btn-primary">
          Browse All Modules
        </Link>
      </div>
    </div>
  );
}

// Import at the top
import { HSE_MODULES, getModuleById } from '../data/modules';
import { formatCategory, getCategoryIcon } from '../utils/category';