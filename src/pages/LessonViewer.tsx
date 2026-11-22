/**
 * HSE Learning Guide - Lesson Viewer Page
 * Interactive lesson content with illustrations, quizzes, and progress tracking
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getModuleById } from '../data/modules';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  DownloadIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

export function LessonViewer() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const {
    progress,
    getModuleWithProgress,
    isLessonCompleted,
    startLesson,
    completeLesson,
    bookmarkedModules,
    toggleBookmark,
  } = useApp();

  const [showSidebar, setShowSidebar] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showIllustrationModal, setShowIllustrationModal] = useState<typeof illustrations[0] | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const module = useMemo(() => getModuleById(moduleId!), [moduleId, getModuleById]);
  const moduleWithProgress = useMemo(() => getModuleWithProgress(moduleId!), [moduleId, getModuleWithProgress]);
  const lesson = module?.lessons.find(l => l.id === lessonId);
  const moduleProgress = moduleWithProgress?.progress;
  const completedLessons = moduleProgress?.completedLessons || [];
  const isCompleted = completedLessons.includes(lessonId);
  const lessonIndex = module?.lessons.findIndex(l => l.id === lessonId) ?? 0;
  const prevLesson = lessonIndex > 0 ? module?.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (module?.lessons.length ?? 0) - 1 ? module?.lessons[lessonIndex + 1] : null;

  // Start lesson on mount
  useEffect(() => {
    if (lesson && module) {
      startLesson(module.id, lesson.id);
    }
  }, [lesson, module, startLesson]);

  if (!module || !lesson) {
    return <LessonNotFound />;
  }

  const handleQuizSubmit = () => {
    if (!lesson.quizId) return;
    // In a real app, this would validate against correct answers
    const score = Math.floor(Math.random() * 40) + 60; // Mock score 60-100
    setQuizScore(score);
    setQuizSubmitted(true);
    completeLesson(module.id, lesson.id, score);
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/modules/${moduleId}/lessons/${nextLesson.id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/modules/${moduleId}`)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              aria-label="Back to module"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to={`/modules/${moduleId}`}
              className="hidden lg:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-hse-primary transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              {module.shortTitle}
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden lg:block">
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-hse-primary transition-all duration-500"
                style={{ width: `${((lessonIndex + 1) / (module.lessons.length)) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleBookmark(module.id)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={bookmarkedModules.includes(module.id) ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkIcon className={cn('h-5 w-5', bookmarkedModules.includes(module.id) && 'fill-current')} fill={bookmarkedModules.includes(module.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </BookmarkIcon>
            </button>
            <button
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              aria-label={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
            >
              {showSidebar ? (
                <ArrowsPointingInIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Lesson Sidebar */}
        {(showSidebar || window.innerWidth >= 1024) && (
          <aside className={cn(
            'w-72 lg:w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto transition-all duration-300',
            !showSidebar && 'lg:w-0 lg:border-0 lg:overflow-hidden'
          )}>
            <LessonSidebar
              module={module}
              lesson={lesson}
              completedLessons={completedLessons}
              onLessonClick={(id) => navigate(`/modules/${moduleId}/lessons/${id}`)}
            />
          </aside>
        )}

        {/* Lesson Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8" role="main">
          <article className="max-w-3xl mx-auto space-y-8">
            {/* Lesson Header */}
            <header className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-primary">{lesson.contentType}</span>
                <span className="badge-secondary">{lesson.difficulty}</span>
                {isCompleted && <span className="badge-success">Completed</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{lesson.description}</p>
            </header>

            {/* Learning Objectives */}
            {lesson.learningObjectives.length > 0 && (
              <section className="card p-4 border-l-4 border-l-hse-primary">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AwardIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-hse-primary/10 text-hse-primary flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Lesson Content Sections */}
            {lesson.content.sections.map((section, sectionIndex) => (
              <SectionRenderer
                key={section.id}
                section={section}
                isActive={currentSection === sectionIndex}
                onIllustrationClick={(ill) => setShowIllustrationModal(ill)}
              />
            ))}

            {/* Interactive Elements */}
            {lesson.interactiveElements.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <PlayCircleIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
                  Interactive Elements
                </h3>
                {lesson.interactiveElements.map((element, i) => (
                  <InteractiveElementRenderer key={element.id} element={element} index={i} />
                ))}
              </section>
            )}

            {/* Key Points */}
            {lesson.keyPoints.length > 0 && (
              <section className="card border-l-4 border-l-hse-accent">
                <div className="card-body">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-hse-accent" aria-hidden="true" />
                    Key Points
                  </h3>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-hse-accent mt-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Quiz */}
            {lesson.quizId && (
              <section className="card border-l-4 border-l-hse-warning">
                <div className="card-body">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-hse-warning" aria-hidden="true" />
                    Knowledge Check
                  </h3>
                  <QuizRenderer
                    quizId={lesson.quizId}
                    answers={quizAnswers}
                    onAnswersChange={setQuizAnswers}
                    submitted={quizSubmitted}
                    score={quizScore}
                    onSubmit={handleQuizSubmit}
                  />
                </div>
              </section>
            )}

            {/* References */}
            {lesson.references.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-hse-primary" aria-hidden="true" />
                  References
                </h3>
                <div className="space-y-2">
                  {lesson.references.map((ref, i) => (
                    <ReferenceItem key={ref.id} reference={ref} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => prevLesson && navigate(`/modules/${moduleId}/lessons/${prevLesson.id}`)}
                disabled={!prevLesson}
                className="btn-secondary flex items-center gap-2 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <span className="btn-success">
                    <CheckCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                    Lesson Complete
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleQuizSubmit}
                    className="btn-primary"
                    disabled={quizSubmitted}
                  >
                    {quizSubmitted ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                        Score: {quizScore}%
                      </>
                    ) : (
                      <>
                        <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                        Complete Lesson
                      </>
                    )}
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => nextLesson && navigate(`/modules/${moduleId}/lessons/${nextLesson.id}`)}
                disabled={!nextLesson}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function LessonSidebar({
  module,
  lesson,
  completedLessons,
  onLessonClick,
}: {
  module: any;
  lesson: any;
  completedLessons: string[];
  onLessonClick: (id: string) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Lessons</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{module.lessons.length} lessons</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Lesson navigation">
        {module.lessons.map((l: any, index: number) => {
          const isCurrent = l.id === lesson.id;
          const isCompleted = completedLessons.includes(l.id);
          const canAccess = index === 0 || completedLessons.includes(module.lessons[index - 1]?.id);

          return (
            <button
              key={l.id}
              type="button"
              onClick={() => canAccess && onLessonClick(l.id)}
              disabled={!canAccess}
              className={cn(
                'w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3',
                isCurrent
                  ? 'bg-hse-primary/10 text-hse-primary border border-hse-primary/20'
                  : isCompleted
                  ? 'bg-hse-success/5 text-hse-success hover:bg-hse-success/10'
                  : canAccess
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              )}
            >
              <div className={cn(
                'flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-sm font-medium',
                isCurrent
                  ? 'bg-hse-primary text-white'
                  : isCompleted
                  ? 'bg-hse-success text-white'
                  : canAccess
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              )}>
                {isCompleted ? (
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 min-w-0 text-sm">
                <p className="font-medium truncate">{l.title}</p>
                <p className="text-xs opacity-75">{l.estimatedMinutes} min</p>
              </div>
              {!canAccess && !isCompleted && (
                <LockClosedIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CheckCircleIcon className="h-4 w-4 text-hse-success" aria-hidden="true" />
          <span>{completedLessons.length}/{module.lessons.length} complete</span>
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({
  section,
  isActive,
  onIllustrationClick,
}: {
  section: any;
  isActive: boolean;
  onIllustrationClick: (ill: any) => void;
}) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    text: BookOpenIcon,
    illustration: MagnifyingGlassIcon,
    video: PlayCircleIcon,
    interactive: PlayCircleIcon,
    callout: ClipboardDocumentListIcon,
    table: ClipboardDocumentListIcon,
    list: ClipboardDocumentListIcon,
  };
  const Icon = icons[section.type] || BookOpenIcon;

  return (
    <section className={cn('animate-fade-in', section.type === 'callout' && 'card border-l-4 border-l-hse-warning')}>
      {section.type === 'illustration' && section.illustrations && (
        <IllustrationGallery illustrations={section.illustrations} onClick={onIllustrationClick} />
      )}

      {section.type === 'video' && section.interactiveElement && (
        <InteractiveElementRenderer element={section.interactiveElement} index={0} />
      )}

      <div className={cn('prose prose-gray dark:prose-invert max-w-none', section.type === 'callout' && 'p-4')}>
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      </div>

      {section.type === 'table' && (
        <div className="overflow-x-auto">
          {/* Table would be rendered from HTML content */}
        </div>
      )}
    </section>
  );
}

function IllustrationGallery({
  illustrations,
  onClick,
}: {
  illustrations: any[];
  onClick: (ill: any) => void;
}) {
  return (
    <div className="space-y-4 my-4">
      {illustrations.map((ill, i) => (
        <figure key={ill.id} className="group">
          <button
            type="button"
            onClick={() => onClick(ill)}
            className="w-full aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 relative"
            aria-label={`View illustration: ${ill.title}`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {ill.type === 'diagram' ? '📊' : ill.type === 'photo' ? '📷' : ill.type === 'infographic' ? '📈' : '🎨'}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ArrowsPointingOutIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>
          </button>
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
            <p className="font-medium text-gray-900 dark:text-white">{ill.title}</p>
            {ill.caption && <p>{ill.caption}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function InteractiveElementRenderer({ element, index }: { element: any; index: number }) {
  return (
    <div className="card p-6 border-l-4 border-l-hse-accent">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-hse-accent/10 flex items-center justify-center flex-shrink-0">
          <PlayCircleIcon className="h-6 w-6 text-hse-accent" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{element.title}</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{element.description}</p>
          <button
            type="button"
            className="btn-accent mt-3 text-sm"
            disabled={true}
          >
            Launch Interactive
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizRenderer({
  quizId,
  answers,
  onAnswersChange,
  submitted,
  score,
  onSubmit,
}: {
  quizId: string;
  answers: Record<string, string>;
  onAnswersChange: (answers: Record<string, string>) => void;
  submitted: boolean;
  score: number | null;
  onSubmit: () => void;
}) {
  // Mock quiz questions - in real app would fetch from API
  const questions = [
    {
      id: 'q1',
      question: 'What is the primary purpose of this safety procedure?',
      type: 'single-choice' as const,
      options: [
        { id: 'a', text: 'To protect workers from hazards', correct: true },
        { id: 'b', text: 'To comply with paperwork requirements', correct: false },
        { id: 'c', text: 'To reduce insurance costs', correct: false },
        { id: 'd', text: 'To satisfy management', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'Which of the following are required PPE for this task? (Select all that apply)',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'Hard hat', correct: true },
        { id: 'b', text: 'Safety glasses', correct: true },
        { id: 'c', text: 'Steel-toed boots', correct: true },
        { id: 'd', text: 'Baseball cap', correct: false },
      ],
    },
  ];

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className={cn('p-4 rounded-lg text-center', score && score >= 70 ? 'bg-hse-success/10 text-hse-success' : 'bg-hse-danger/10 text-hse-danger')}>
          <h4 className="text-xl font-bold">{score}%</h4>
          <p>{score && score >= 70 ? 'Congratulations! You passed.' : 'Keep studying and try again.'}</p>
        </div>
        {questions.map((q, i) => (
          <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">{i + 1}. {q.question}</p>
            {q.options.map(opt => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type={q.type === 'multiple-choice' ? 'checkbox' : 'radio'}
                  checked={answers[q.id] === opt.id || (q.type === 'multiple-choice' && answers[q.id]?.includes(opt.id))}
                  disabled
                  className="h-4 w-4 text-hse-primary"
                />
                <span className={cn(opt.correct ? 'text-hse-success' : 'text-hse-danger')}>
                  {opt.text} {opt.correct && '✓'}
                </span>
              </label>
            ))}
          </div>
        ))}
        <button type="button" onClick={onSubmit} className="btn-primary w-full">
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      {questions.map((q, i) => (
        <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="font-medium mb-3">{i + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <input
                  type={q.type === 'multiple-choice' ? 'checkbox' : 'radio'}
                  name={q.id}
                  value={opt.id}
                  checked={q.type === 'multiple-choice'
                    ? answers[q.id]?.split(',').includes(opt.id)
                    : answers[q.id] === opt.id}
                  onChange={e => {
                    if (q.type === 'multiple-choice') {
                      const current = answers[q.id]?.split(',') || [];
                      const updated = e.target.checked
                        ? [...current, opt.id]
                        : current.filter((id: string) => id !== opt.id);
                      onAnswersChange({ ...answers, [q.id]: updated.join(',') });
                    } else {
                      onAnswersChange({ ...answers, [q.id]: opt.id });
                    }
                  }}
                  className="h-4 w-4 text-hse-primary focus:ring-hse-primary"
                />
                <span className="text-gray-700 dark:text-gray-300">{opt.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={questions.some(q => !answers[q.id])}
      >
        Submit Quiz
      </button>
    </form>
  );
}

function ReferenceItem({ reference, index }: { reference: any; index: number }) {
  return (
    <Link
      to={reference.url || '#'}
      target={reference.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-hse-primary/10 text-hse-primary flex items-center justify-center text-sm font-medium">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white">{reference.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{reference.type} • {reference.source}</p>
        {reference.relevance && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{reference.relevance}</p>}
      </div>
    </Link>
  );
}

function LessonNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lesson Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The lesson you're looking for doesn't exist.
        </p>
        <button onClick={() => window.history.back()} className="btn-primary">
          Go Back
        </button>
      </div>
    </div>
  );
}