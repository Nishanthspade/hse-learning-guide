/**
 * HSE Learning Guide - Assessment Center
 * Central hub for all assessments, quizzes, and practice exams
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UNIFIED_TOPICS, getQuestionsByTopic } from '../../data/assessments';
import { cn } from '../../utils/cn';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
  ClipboardDocumentListIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export function AssessmentCenter() {
  const { progress, getTopicProgress, isTopicCompleted } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = [...new Set(UNIFIED_TOPICS.map(t => t.category))];
    return ['all', ...cats.sort()];
  }, []);

  const topicsWithAssessments = useMemo(() => {
    return UNIFIED_TOPICS.filter(t => {
      const questions = getQuestionsByTopic(t.topicId);
      return questions.length > 0;
    });
  }, []);

  const filteredTopics = useMemo(() => {
    let result = topicsWithAssessments;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.topicName.toLowerCase().includes(query) ||
        t.topicId.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter(t => t.difficulty === selectedDifficulty);
    }

    return result;
  }, [topicsWithAssessments, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            Assessment Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Test your knowledge with quizzes, simulations, and practical assessments across all frameworks
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={ClipboardDocumentListIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={topicsWithAssessments.length}
          label="Available Quizzes"
          subtitle="Across all topics"
        />
        <StatCard
          icon={PlayCircleIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value={calculateCompletedAssessments()}
          label="Completed"
          subtitle="Assessments passed"
        />
        <StatCard
          icon={TrophyIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={calculateAverageScore()} + '%'
          label="Avg Score"
          subtitle="Across all attempts"
        />
        <StatCard
          icon={ClockIcon}
          iconColor="text-purple-600 bg-purple-100 dark:bg-purple-900/30"
          value={calculateTotalTime()} + 'h'
          label="Practice Time"
          subtitle="Total practice time"
        />
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assessments..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search assessments"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {getCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by difficulty"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      {/* Assessment Categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quizzes by Topic</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredTopics.length} topics with assessments</span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assessments found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTopics.map(topic => {
              const topicProgress = getTopicProgress(topic.topicId);
              const isCompleted = topicProgress?.status === 'completed' || topicProgress?.status === 'mastered';
              const isInProgress = topicProgress?.status === 'in-progress';
              const questions = getQuestionsByTopic(topic.topicId);
              const completedQuestions = questions.filter(q => false).length; // Would track per-question progress

              return (
                <Link key={topic.topicId} to={`/assessments/quiz/${topic.topicId}`} className="card group hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 p-4">
                    <div className={cn('flex-shrink-0 h-14 w-14 rounded-xl flex items-center justify-center', isCompleted ? 'bg-green-100 dark:bg-green-900/30' : isInProgress ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800')}>
                      <span className="text-2xl">{getCategoryEmoji(topic.category)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{topic.topicName}</h3>
                        <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
                          {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                        </span>
                        {isCompleted && <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completed</span>}
                        {isInProgress && <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">In Progress</span>}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{topic.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          {getQuestionsByTopic(topic.topicId).length} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          ~{topic.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          {Object.keys(topic.frameworks).length} frameworks
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <span className="btn-success text-sm">
                          <CheckCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                          Completed
                        </span>
                      ) : (
                        <span className="btn-primary text-sm">
                          <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                          {isInProgress ? 'Continue' : 'Start'}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Specialized Assessments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AssessmentTypeCard
            icon={ShieldCheckIcon}
            title="Certification Practice Exams"
            description="Full-length practice exams for NEBOSH, CSP, CSP, ASP, CHST"
            href="/assessments/certification"
            color="blue"
            count="5+ Exams"
          />
          <AssessmentTypeCard
            icon={ShieldCheckIcon}
            title="Framework-Specific Exams"
            description="ADNOC, ADOSH, ISO, OSHA, ARAMCO focused assessments"
            href="/assessments/framework"
            color="blue"
            count="13 Frameworks"
          />
          <AssessmentTypeCard
            icon={PlayCircleIcon}
            title="Simulation Exercises"
            description="Interactive scenarios: HAZOP, Confined Space, LOTO, Emergency Response"
            href="/assessments/simulations"
            color="purple"
            count="8+ Simulations"
          />
          <AssessmentTypeCard
            icon={DocumentTextIcon}
            title="Practical Exercises"
            description="Risk Assessment, JSA, Site Inspection, Incident Investigation workshops"
            href="/assessments/practical"
            color="green"
            count="6+ Exercises"
          />
        </div>
      </section>

      {/* Progress Overview */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Your Assessment Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnalyticsCard title="By Framework" icon={BuildingLibraryIcon} color="blue">
            <div className="space-y-2">
              {['ADNOC', 'ADOSH', 'ISO 45001', 'OSHA', 'ARAMCO'].map(fw => (
                <FrameworkProgressBar key={fw} framework={fw} progress={Math.floor(Math.random() * 100)} />
              )}
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="By Category" icon={ShieldCheckIcon} color="green">
            <div className="space-y-2">
              {getCategories().slice(0, 5).map(cat => (
                <CategoryProgressBar key={cat} category={cat} progress={Math.floor(Math.random() * 100)} />
              ))}
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="By Difficulty" icon={TrophyIcon} color="purple">
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((diff, i) => (
                <DifficultyProgressBar key={diff} difficulty={diff} progress={Math.floor(Math.random() * 100)} />
              ))}
            </div>
          </AnalyticsCard>
        </div>
      </section>
    </div>
  );
}

// Helper components and functions
function StatCard({ icon: Icon, iconColor, value, label, subtitle }: any) {
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

function FeatureCard({ icon: Icon, title, description, href, color, count }: any) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  };
  return (
    <Link to={href} className="card group p-6 hover:shadow-xl transition-shadow h-full">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-4', colors[color] || colors.blue)}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
      </div>
    </Link>
  );
}

function AssessmentTypeCard({ icon: Icon, title, description, href, color, count }: any) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  };
  return (
    <Link to={href} className="card group p-6 hover:shadow-xl transition-shadow h-full">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-4', colors[color] || colors.blue)}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
      </div>
    </Link>
  );
}

function AnalyticsCard({ title, icon: Icon, color, children }: any) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', colors[color] || colors.blue)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FrameworkProgressBar({ framework, progress }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{framework}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function CategoryProgressBar({ category, progress }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{category}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function DifficultyProgressBar({ difficulty, progress }: any) {
  const colors = {
    Beginner: 'bg-green-600',
    Intermediate: 'bg-blue-600',
    Advanced: 'bg-orange-600',
    Expert: 'bg-red-600',
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{difficulty}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500', colors[difficulty] || 'bg-gray-600')} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function AssessmentTypeCard({ icon: Icon, title, description, href, color, count }: any) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  };
  return (
    <Link to={href} className="card group p-6 hover:shadow-xl transition-shadow h-full">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-4', colors[color] || colors.blue)}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
      </div>
    </Link>
  );
}

function CategoryProgressBar({ category, progress }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{category}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function DifficultyProgressBar({ difficulty, progress }: any) {
  const colors = {
    Beginner: 'bg-green-600',
    Intermediate: 'bg-blue-600',
    Advanced: 'bg-orange-600',
    Expert: 'bg-red-600',
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{difficulty}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-500', {
          Beginner: 'bg-green-600',
          Intermediate: 'bg-blue-600',
          Advanced: 'bg-orange-600',
          Expert: 'bg-red-600',
        }[difficulty] || 'bg-gray-600')} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function getCategories() {
  return [...new Set(UNIFIED_TOPICS.map(t => t.category))].sort();
}

function getCategories() {
  return [...new Set(UNIFIED_TOPICS.map(t => t.category))].sort();
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'Management System': '🏢',
    'Risk Management': '📊',
    'Incident Management': '🔍',
    'Physical Hazards': '🛡️',
    'Chemical Hazards': '⚗️',
    'Process Safety': '🏭',
    'Operational Control': '🔧',
    'Fire Safety': '🔥',
    'Environmental': '🌿',
    'Health Hazards': '🧠',
    'Emergency Management': '🚨',
    'Sector Specific': '🏗️',
    'Supply Chain': '🤝',
    'Transportation': '🚛',
  };
  return emojis[category] || '📚';
}

function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

function calculateCompletedAssessments(): number {
  // Would calculate from progress
  return 0;
}

function calculateAverageScore(): number {
  return 0;
}

function calculateTotalTime(): number {
  return 0;
}

function getTopicProgress(topicId: string): any {
  // Would come from context
  return null;
}

function getQuestionsByTopic(topicId: string): any[] {
  // Would import from assessments
  return [];
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'Management System': '🏢',
    'Risk Management': '📊',
    'Incident Management': '🔍',
    'Physical Hazards': '🛡️',
    'Chemical Hazards': '⚗️',
    'Process Safety': '🏭',
    'Operational Control': '🔧',
    'Fire Safety': '🔥',
    'Environmental': '🌿',
    'Health Hazards': '🧠',
    'Emergency Management': '🚨',
    'Sector Specific': '🏗️',
    'Supply Chain': '🤝',
    'Transportation': '🚛',
  };
  return emojis[category] || '📚';
}

function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

function calculateCompletedAssessments(): number {
  return 0;
}

function calculateAverageScore(): number {
  return 0;
}

function calculateTotalTime(): number {
  return 0;
}