/**
 * HSE Learning Guide - Quiz Player Component
 * Interactive quiz player with multiple question types, scoring, and progress tracking
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import { getQuestionsByTopic } from '../../data/assessments';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FlagIcon,
  CalculatorIcon,
  ArrowRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface QuizPlayerProps {
  topicId?: string;
  quizId?: string;
  questions?: any[];
  onComplete?: (score: number, results: any[]) => void;
}

interface QuestionState {
  question: any;
  index: number;
  answer: string | string[] | null;
  isCorrect: boolean | null;
  timeSpent: number;
  flagged: boolean;
}

export function QuizPlayer({ topicId, quizId, questions: propQuestions, onComplete }: QuizPlayerProps) {
  const navigate = useNavigate();
  const { progress, completeLesson, startLesson } = useApp();
  const { topicId: paramTopicId, quizId: paramQuizId } = useParams<{ topicId: string; quizId: string }>();
  
  const effectiveTopicId = topicId || paramTopicId;
  const effectiveQuizId = quizId || paramQuizId;
  const questions = useMemo(() => {
    if (propQuestions) return propQuestions;
    if (effectiveTopicId) return getQuestionsByTopic(effectiveTopicId);
    return [];
  }, [propQuestions, effectiveTopicId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(Date.now());

  // Initialize question states
  useEffect(() => {
    if (questions.length > 0 && questionStates.length === 0) {
      const initialStates: QuestionState[] = questions.map(() => ({
        question: null,
        index: -1,
        answer: null,
        isCorrect: null,
        timeSpent: 0,
        flagged: false,
      });
      setQuestionStates(initialStates);
    }
  }, [questions.length, questionStates.length]);

  // Timer
  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        setQuestionStates(prev => prev.map((qs, i) => 
          i === currentIndex ? { ...qs, timeSpent: qs.timeSpent + 1 } : qs
        ));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizStarted, quizSubmitted, currentIndex]);

  const currentQuestion = questions[currentIndex];
  const currentState = questionStates[currentIndex];

  const handleAnswerChange = useCallback((answer: string | string[]) => {
    setQuestionStates(prev => prev.map((qs, i) => 
      i === currentIndex ? { ...qs, answer, isCorrect: null } : qs
    ));
  }, [currentIndex]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || currentState.answer === null) return;

    let isCorrect = false;
    const answer = currentState.answer;

    switch (currentQuestion.type) {
      case 'single-choice':
        isCorrect = answer === currentQuestion.correctAnswer;
        break;
      case 'multiple-choice':
        const correctSet = new Set(currentQuestion.correctAnswer as string[]);
        const answerSet = new Set((answer as string[]).filter(Boolean));
        isCorrect = correctSet.size === answerSet.size && 
          [...correctSet].every(v => answerSet.has(v));
        break;
      case 'true-false':
        isCorrect = answer === currentQuestion.correctAnswer;
        break;
      case 'scenario':
        isCorrect = answer === currentQuestion.scenario?.correctPath?.[0];
        break;
      case 'drag-drop':
        // For drag-drop, check if order matches
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer);
        break;
      default:
        isCorrect = false;
    }

    const timeSpent = Math.floor((Date.now() - currentQuestionStartTime) / 1000);
    
    setQuestionStates(prev => prev.map((qs, i) => 
      i === currentIndex ? { 
        ...qs, 
        isCorrect, 
        timeSpent: qs.timeSpent + timeSpent 
      } : qs
    ));
  }, [currentIndex, currentQuestion, currentState, currentQuestionStartTime]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentQuestionStartTime(Date.now());
    }
  }, [currentIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCurrentQuestionStartTime(Date.now());
    }
  }, [currentIndex]);

  const handleFlagToggle = useCallback(() => {
    setQuestionStates(prev => prev.map((qs, i) => 
      i === currentIndex ? { ...qs, flagged: !qs.flagged } : qs
    ));
  }, [currentIndex]);

  const handleSubmitQuiz = useCallback(() => {
    const allAnswered = questionStates.every(qs => qs.answer !== null);
    if (!allAnswered) {
      if (!confirm('Some questions are unanswered. Submit anyway?')) return;
    }
    setQuizSubmitted(true);
    setShowResults(true);
    
    // Calculate score
    const correctCount = questionStates.filter(qs => qs.isCorrect === true).length;
    const totalQuestions = questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    
    // Record completion
    const topicId = effectiveTopicId || 'unknown';
    const lessonId = `quiz-${topicId}`;
    completeLesson(topicId, lessonId, score);
    
    if (onComplete) {
      onComplete(score, questionStates);
    }
  }, [questionStates, questions, effectiveTopicId, completeLesson]);

  const handleRetake = useCallback(() => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setShowResults(false);
    setCurrentIndex(0);
    setTimeElapsed(0);
    setQuestionStates(questions.map(() => ({
      question: null,
      index: -1,
      answer: null,
      isCorrect: null,
      timeSpent: 0,
      flagged: false,
    }));
    setCurrentQuestionStartTime(Date.now());
  }, [questions.length]);

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <CalculatorIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {effectiveQuizId || `Quiz: ${effectiveTopicId}`}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {questions.length} questions • ~{questions.length * 2} minutes
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quiz Rules</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> {questions.length} questions across multiple formats</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Single choice, multiple choice, true/false, scenarios</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Drag-and-drop and hotspot questions</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Immediate feedback with explanations</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> 70% required to pass</li>
              </ul>
            </div>

            <button
              onClick={() => { setQuizStarted(true); setCurrentQuestionStartTime(Date.now()); }}
              className="btn-primary w-full py-4 text-lg"
              disabled={questions.length === 0}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctCount = questionStates.filter(qs => qs.isCorrect === true).length;
    const totalQuestions = questions.length;
    const score = Math.round((questionStates.filter(qs => qs.isCorrect === true).length / totalQuestions) * 100);
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className={cn(
              'h-24 w-24 mx-auto mb-4 rounded-full flex items-center justify-center',
              passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
            )}>
              {passed ? (
                <TrophyIcon className="h-12 w-12 text-green-600" />
              ) : (
                <XCircleIcon className="h-12 w-12 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {passed ? 'Congratulations!' : 'Keep Practicing'}
            </h1>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{score}%</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {questionStates.filter(qs => qs.isCorrect === true).length} of {totalQuestions} correct
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {questionStates.map((qs, i) => {
              const q = questions[i];
              const isCorrect = qs.isCorrect === true;
              return (
                <div key={i} className="card p-4 border-l-4 border-l-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          'badge text-xs',
                          isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        )}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Q{i + 1} • {qs.timeSpent}s
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{q.question}</p>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {isCorrect ? (
                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                  </div>
                  {!isCorrect && q.explanation && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleRetake} className="btn-primary flex-1 sm:flex-none py-3">
              Retake Quiz
            </button>
            <Link to={`/topics/${effectiveTopicId}`} className="btn-secondary flex-1 sm:flex-none py-3">
              Back to Topic
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <LoadingSpinner size="lg" />;
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to={`/topics/${effectiveTopicId}`} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {effectiveQuizId || `Quiz: ${effectiveTopicId}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <ClockIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={handleFlagToggle}
              className={cn(
                'p-2 rounded-lg transition-colors',
                questionStates[currentIndex]?.flagged 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' 
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-label={questionStates[currentIndex]?.flagged ? 'Unflag' : 'Flag for review'}
            >
              <FlagIcon className={cn('h-5 w-5', questionStates[currentIndex]?.flagged ? 'text-amber-500' : 'text-gray-400')} />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6" role="main">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Question Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              {currentIndex + 1}
            </span>
            <div>
              <span className={cn('badge text-xs', getQuestionTypeColor(currentQuestion.type))}>
                {formatQuestionType(currentQuestion.type)}
              </span>
              <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 ml-2">
                {currentQuestion.points} pts
              </span>
            </div>
          </div>

          {/* Question Content */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {renderQuestionInput(currentQuestion, currentState.answer, handleAnswerChange, quizSubmitted)}
            </div>

            {/* Explanation (shown after submit) */}
            {quizSubmitted && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-l-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-300">Explanation</span>
                </div>
                <p className="text-blue-800 dark:text-blue-300">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Scenario Explanation */}
            {quizSubmitted && currentQuestion.scenario && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-l-amber-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-amber-600" />
                  Scenario Analysis
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{currentQuestion.scenario.description}</p>
                <div className="space-y-2">
                  {currentQuestion.scenario.options?.map((opt: any, idx: number) => (
                    <div key={idx} className={cn(
                      'p-3 rounded-lg',
                      opt.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' : 'bg-red-50 dark:bg-red-900/20 border border-red-200'
                    )}>
                      <div className="flex items-start gap-2">
                        <span className={cn('flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium',
                          opt.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        )}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{opt.text}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{opt.consequence}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="btn-primary flex items-center gap-2"
                disabled={quizSubmitted}
              >
                Submit Quiz
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Question Navigator</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Click to jump • Flagged: {questionStates.filter(qs => qs.flagged).length}
              </span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((_, i) => {
                const qs = questionStates[i];
                const isCurrent = i === currentIndex;
                const isAnswered = qs.answer !== null;
                const isFlagged = qs.flagged;
                const isCorrect = qs.isCorrect === true;
                
                return (
                  <button
                    key={i}
                    onClick={() => { setCurrentIndex(i); setCurrentQuestionStartTime(Date.now()); }}
                    className={cn(
                      'h-10 w-10 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all',
                      isCurrent ? 'ring-2 ring-blue-500' : '',
                      isAnswered ? (qs.isCorrect === true ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400') : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
                      isFlagged && !isAnswered ? 'border-2 border-amber-500' : '',
                      isCurrent ? 'ring-2 ring-blue-500' : ''
                    )}
                    aria-label={`Question ${i + 1}${isFlagged ? ' (flagged)' : ''}${isAnswered ? isCorrect ? ' correct' : ' incorrect' : ''}`}
                  >
                    <span className="font-medium">{i + 1}</span>
                    {isFlagged && <FlagIcon className="h-3 w-3 text-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper functions
function getQuestionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'single-choice': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'multiple-choice': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'true-false': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'scenario': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'drag-drop': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'hotspot': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
}

function formatQuestionType(type: string): string {
  const labels: Record<string, string> = {
    'single-choice': 'Single Choice',
    'multiple-choice': 'Multiple Choice',
    'true-false': 'True/False',
    'scenario': 'Scenario',
    'drag-drop': 'Drag & Drop',
    'hotspot': 'Hotspot',
  };
  return labels[type] || type;
}

function renderQuestionInput(question: any, answer: any, onChange: (answer: any) => void, disabled: boolean) {
  switch (question.type) {
    case 'single-choice':
      return (
        <div className="space-y-2">
          {question.options?.map((opt: any) => (
            <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={answer === opt.id}
                onChange={() => onChange(opt.id)}
                disabled={disabled}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex-1">{opt.text}</span>
              {answer === opt.id && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
            </label>
          ))}
        </div>
      );

    case 'multiple-choice':
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select all that apply:</p>
          {question.options?.map((opt: any) => (
            <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
              <input
                type="checkbox"
                value={opt.id}
                checked={Array.isArray(answer) && answer.includes(opt.id)}
                onChange={e => {
                  const current = Array.isArray(answer) ? answer : [];
                  onChange(e.target.checked ? [...current, opt.id] : current.filter((id: string) => id !== opt.id));
                }}
                disabled={disabled}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300 flex-1">{opt.text}</span>
              {Array.isArray(answer) && answer.includes(opt.id) && <CheckCircleIcon className="h-5 w-5 text-purple-600" />}
            </label>
          ))}
        </div>
      );

    case 'true-false':
      return (
        <div className="grid grid-cols-2 gap-3">
          {['True', 'False'].map((val, idx) => (
            <label key={val} className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={val.toLowerCase()}
                checked={answer === val.toLowerCase()}
                onChange={() => onChange(val.toLowerCase())}
                disabled={disabled}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-gray-700 dark:text-gray-300">{val}</span>
            </label>
          ))}
        </div>
      );

    case 'scenario':
      return (
        <div className="space-y-3">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-l-amber-500 mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scenario</h4>
            <p className="text-gray-700 dark:text-gray-300">{question.scenario?.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{question.scenario?.context}</p>
          </div>
          <div className="space-y-2">
            {question.scenario?.options?.map((opt: any, idx: number) => (
              <label key={idx} className="flex items-start gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={answer === opt.id}
                  onChange={() => onChange(opt.id)}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{opt.text}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      );

    case 'drag-drop':
      return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Drag items to reorder them in the correct sequence:</p>
          <div className="space-y-2">
            {question.dragDropConfig?.items?.map((item: any, idx: number) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium text-gray-500">{idx + 1}</span>
                <span className="flex-1 text-gray-900 dark:text-white">{item.content}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Drag and drop to reorder (coming soon)</p>
        </div>
      );

    case 'hotspot':
      return (
        <div className="relative">
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {question.hotspotConfig?.imageSrc ? (
                <img src={question.hotspotConfig.imageSrc} alt={question.question} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🖼️</span>
              )}
            </div>
            {question.hotspotConfig?.hotspots?.map((hs: any) => (
              <button
                key={hs.id}
                className="absolute rounded-full bg-blue-500/20 border-2 border-blue-500 transition-all hover:bg-blue-500/40"
                style={{
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  width: `${hs.radius * 2}px`,
                  height: `${hs.radius * 2}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={hs.title}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {hs.title}
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">Click on hotspots to explore</p>
        </div>
      );

    default:
      return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400">
          Question type "{question.type}" not yet implemented
        </div>
      );
  }
}

// Need to import missing icons
import { InfoIcon, MagnifyingGlassIcon, TrophyIcon } from '@heroicons/react/24/outline';