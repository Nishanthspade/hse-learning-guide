/**
 * HSE Learning Guide - Simulation Player
 * Interactive simulation player for scenario-based learning
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SIMULATIONS, getSimulationById } from '../../data/assessments';
import { cn } from '../../utils/cn';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  ClockIcon,
  ListBulletIcon,
  CheckCircleIcon as CheckIcon,
  XCircleIcon as CloseIcon,
  ArrowLeftIcon,
  FlagIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export function SimulationPlayer() {
  const { simulationId } = useParams<{ simulationId: string }>();
  const navigate = useNavigate();
  const { progress, completeLesson } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [stepStates, setStepStates] = useState<Record<string, any>>({});
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentStepStartTime, setCurrentStepStartTime] = useState(Date.now());

  const simulation = useMemo(() => getSimulationById(simulationId!), [simulationId]);

  // Timer
  useEffect(() => {
    if (simulationStarted && !simulationCompleted) {
      const interval = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [simulationStarted, simulationCompleted]);

  // Initialize step states
  useEffect(() => {
    if (simulation && Object.keys(stepStates).length === 0) {
      const initialStates: Record<string, any> = {};
      simulation.steps.forEach((step: any) => {
        initialStates[step.id] = {
          completed: false,
          answer: null,
          isCorrect: null,
          timeSpent: 0,
          attempts: 0,
        };
      });
      setStepStates(initialStates);
    }
  }, [simulation, stepStates]);

  // Timer
  useEffect(() => {
    if (simulationStarted && !simulationCompleted) {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        setStepStates(prev => ({
          ...prev,
          [simulation.steps[currentStep].id]: {
            ...prev[simulation.steps[currentStep].id],
            timeSpent: prev[simulation.steps[currentStep].id]?.timeSpent + 1 || 1,
          },
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [simulationStarted, simulationCompleted, currentStep]);

  const currentStepData = simulation?.steps[currentStep];
  const currentStepState = stepStates[currentStepData?.id];
  const isStepCompleted = currentStepState?.completed;
  const isLastStep = currentStep === (simulation?.steps.length - 1);
  const completedSteps = Object.values(stepStates).filter(s => s.completed).length;
  const progressPercent = simulation ? ((completedSteps + (isStepCompleted ? 1 : 0)) / simulation.steps.length) * 100 : 0;

  const handleAction = useCallback((action: any, answer: any) => {
    const stepId = currentStepData.id;
    const stepState = stepStates[currentStepData.id];
    
    let isCorrect = true;
    let feedback = '';

    // Evaluate answer based on step type
    switch (currentStepData.type) {
      case 'decision':
        isCorrect = action.correct === true;
        feedback = action.feedback || (action.correct ? 'Correct!' : 'Incorrect. Review the procedure.');
        break;
      case 'sequence':
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentStepData.correctOrder);
        feedback = isCorrect ? 'Correct sequence!' : `Incorrect. Correct order: ${currentStepData.correctOrder.join(' → ')}`;
        break;
      case 'checklist':
        isCorrect = action.every((item: string) => true); // All items checked
        feedback = 'All items verified.';
        break;
      case 'input':
        // For input, we'd do fuzzy matching or keyword matching
        isCorrect = true; // Simplified for now
        feedback = 'Response recorded.';
        break;
      case 'action':
        isCorrect = true;
        feedback = 'Action completed.';
        break;
      default:
        isCorrect = true;
    }

    const timeSpent = Math.floor((Date.now() - currentStepStartTime) / 1000);
    const newAttempts = (stepStates[currentStepData.id]?.attempts || 0) + 1;

    setStepStates(prev => ({
      ...prev,
      [currentStepData.id]: {
        ...stepState,
        completed: isCorrect,
        answer,
        isCorrect,
        timeSpent: (stepState?.timeSpent || 0) + Math.floor((Date.now() - currentStepStartTime) / 1000),
        attempts: newAttempts,
        feedback,
      },
    }));

    // Auto-advance if correct and not last step
    if (isCorrect && !disabled) {
      setTimeout(() => {
        if (currentStep < (simulation?.steps.length || 1) - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          handleComplete();
        }
      }, 1500);
    }
  }, [currentStep, stepStates]);

  const handleComplete = useCallback(() => {
    setSimulationCompleted(true);
    setShowResults(true);
    
    // Record completion
    if (simulation) {
      completeLesson(`simulation-${simulation.id}`, simulation.title, 100);
    }
  }, [simulation]);

  const handleNext = useCallback(() => {
    if (currentStep < (simulation?.steps.length || 1) - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [simulation]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, []);

  const handleRestart = useCallback(() => {
    setSimulationStarted(false);
    setSimulationCompleted(false);
    setShowResults(false);
    setCurrentStep(0);
    setTimeElapsed(0);
    setStepStates({});
  }, []);

  if (!simulation) {
    return <LoadingSpinner size="lg" />;
  }

  if (!simulationStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <SparklesIcon className="h-8 w-8 text-purple-600" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{simulation.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{simulation.description}</p>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-6">
              <span className="flex items-center gap-1"><ClockIcon className="h-4 w-4" /> ~{simulation.estimatedMinutes} minutes</span>
              <span className="flex items-center gap-1"><ListBulletIcon className="h-4 w-4" /> {simulation.steps.length} steps</span>
              <span className="flex items-center gap-1"><ShieldCheckIcon className="h-4 w-4" /> {simulation.difficulty}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Simulation Overview</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> {simulation.steps.length} interactive steps</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Real-time feedback</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Score tracking</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> ~{simulation.estimatedMinutes} minutes</li>
              </ul>
            </div>

            <button
              onClick={() => { setSimulationStarted(true); }}
              className="btn-primary w-full py-4 text-lg"
            >
              <PlayCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Start Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const completedSteps = Object.values(stepStates).filter(s => s.completed).length;
    const correctSteps = Object.values(stepStates).filter(s => s.isCorrect === true).length;
    const totalSteps = simulation?.steps.length || 1;
    const score = Math.round((Object.values(stepStates).filter(s => s.isCorrect === true).length / totalSteps) * 100);
    const passed = score >= simulation?.scoring?.passThreshold || 70;

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
              {passed ? 'Simulation Complete!' : 'Simulation Incomplete'}
            </h1>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{score}%</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {correctSteps} of {totalSteps} steps correct
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {simulation?.steps.map((step, i) => {
              const stepState = stepStates[step.id];
              const isCorrect = stepState?.isCorrect === true;
              return (
                <div key={step.id} className="card p-4 border-l-4 border-l-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          'badge text-xs',
                          stepState?.isCorrect === true ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          stepState?.completed ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        )}>
                          Step {i + 1}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{step.title}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {stepStates[simulation.steps[i].id]?.isCorrect === true ? (
                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                      ) : stepStates[simulation.steps[i].id]?.completed ? (
                        <XCircleIcon className="h-8 w-8 text-red-500" />
                      ) : (
                        <ClockIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleRestart} className="btn-primary flex-1 sm:flex-none py-3">
              <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Retry Simulation
            </button>
            <Link to={`/topics/${simulation?.topicId}`} className="btn-secondary flex-1 sm:flex-none py-3">
              Back to Topic
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!simulation) return <LoadingSpinner size="lg" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to={`/topics/${simulation?.topicId}`} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{simulation.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Simulation • {simulation.steps.length} steps</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <ClockIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6" role="main">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl">
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentStepData?.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{currentStepData?.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('badge text-sm', isStepCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400')}>
                {isStepCompleted ? 'Completed' : 'In Progress'}
              </span>
              <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                Step {currentStep + 1} of {simulation?.steps.length}
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="card p-6">
            <div className="space-y-6">
              {/* Step Instructions */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300">{currentStepData?.description}</p>
              </div>

              {/* Step Content based on type */}
              <div className="space-y-6">
                {renderStepContent(currentStepData, stepStates[currentStepData?.id], disabled)}
              </div>

              {/* Feedback */}
              {currentStepState?.feedback && (
                <div className={cn(
                  'mt-6 p-4 rounded-lg border-l-4',
                  currentStepState?.isCorrect === true ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' : 'bg-red-50 dark:bg-red-900/20 border-l-red-500'
                )}>
                  <div className="flex items-start gap-3">
                    <div className={cn('flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center',
                      currentStepState?.isCorrect === true ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'
                    )}>
                      {currentStepState?.isCorrect === true ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <XCircleIcon className="h-5 w-5" />
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{currentStepState.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              Previous
            </button>

            <div className="flex-1 text-center">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                Step {currentStep + 1} of {simulation?.steps.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep >= (simulation?.steps.length || 1) - 1}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {isLastStep ? 'Complete' : 'Next'}
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper function to render step content based on type
function renderStepContent(step: any, stepState: any, disabled: boolean) {
  if (!step) return <div>Loading...</div>;

  switch (step.type) {
    case 'decision':
      return (
        <div className="space-y-3">
          {step.options?.map((opt: any, idx: number) => (
            <button
              key={opt.id}
              onClick={() => handleAction(opt, opt.id)}
              disabled={disabled}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all',
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500 dark:hover:border-purple-500',
                stepState?.answer === opt.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium',
                  stepState?.answer === opt.id ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                )}>
                  {stepState?.answer === opt.id ? <CheckCircleIcon className="h-4 w-4" /> : idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{opt.text}</p>
                  {opt.feedback && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{opt.feedback}</p>}
                </div>
                {stepState?.answer === opt.id && <CheckCircleIcon className="h-5 w-5 text-purple-600" />}
              </div>
            ))}
          </div>
      );

    case 'sequence':
      return (
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Drag and drop to arrange in correct order:</p>
          <div className="space-y-2">
            {step.correctOrder?.map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                  {idx + 1}
                </span>
                <span className="text-gray-900 dark:text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Correct order: {step.correctOrder?.join(' → ')}</p>
        </div>
      );

    case 'checklist':
      return (
        <div className="space-y-2">
          {step.items?.map((item: string, idx: number) => (
            <label key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={false}
                onChange={() => {}}
                className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </label>
          ))}
          <button className="btn-primary mt-4" disabled={true}>Verify Checklist</button>
        </div>
      );

    case 'input':
      return (
        <div className="space-y-3">
          <textarea
            rows={4}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your response..."
            disabled={disabled}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Your response will be evaluated for key concepts and correctness.</p>
        </div>
      );

    case 'action':
      return (
        <div className="space-y-3">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Action Required</h4>
            <p className="text-purple-800 dark:text-purple-300">{step.action}</p>
          </div>
          <button 
            onClick={() => handleAction({ type: 'action' }, { completed: true })}
            disabled={disabled}
            className="btn-primary w-full py-3"
          >
            <PlayCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Execute Action
          </button>
        </div>
      );

    default:
      return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400">
          Step type "{step.type}" not yet implemented
        </div>
      );
  }
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}