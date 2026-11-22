/**
 * Unified HSE Standards Dashboard
 * Main landing page for the collaborative HSE knowledge bank
 * Covers ADNOC, ADOSH, ISO, OSHA, ARAMCO, NEBOSH, IOSH, NFPA, API, IOGP, CCPS
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UNIFIED_TOPICS, 
  STANDARD_FRAMEWORKS, 
  UNIFIED_LEARNING_PATHS,
  getTopicsByCategory,
  getTopicsByDifficulty,
  getLearningPathById 
} from '../data/unified-standards';
import { cn } from '../utils/cn';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  GridIcon,
  ListBulletIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  SwatchIcon,
  FaceSmileIcon,
  ExclamationTriangleIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  ScaleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export function UnifiedDashboard() {
  const { user, progress, getPathProgress } = useApp();

  // Stats
  const stats = useMemo(() => {
    const completedTopics = UNIFIED_TOPICS.filter(t => {
      const prog = progress[t.topicId];
      return prog?.status === 'completed' || prog?.status === 'mastered';
    }).length;
    const inProgressTopics = UNIFIED_TOPICS.filter(t => {
      const prog = progress[t.topicId];
      return prog?.status === 'in-progress';
    }).length;
    const totalHours = UNIFIED_TOPICS.reduce((sum, t) => sum + t.estimatedHours, 0);
    const completedHours = UNIFIED_TOPICS
      .filter(t => {
        const prog = progress[t.topicId];
        return prog?.status === 'completed' || prog?.status === 'mastered';
      })
      .reduce((sum, t) => sum + t.estimatedHours, 0);
    const avgScore = Object.values(progress)
      .flatMap(p => p.quizScores || [])
      .reduce((sum, q, _, arr) => sum + (q.percentage || 0) / (arr.length || 1), 0);

    return {
      completedTopics,
      inProgressTopics,
      totalTopics: UNIFIED_TOPICS.length,
      completionRate: UNIFIED_TOPICS.length > 0 ? Math.round((completedTopics / UNIFIED_TOPICS.length) * 100) : 0,
      totalHours,
      completedHours,
      avgScore: Math.round(avgScore),
      frameworksCount: STANDARD_FRAMEWORKS.length,
    };
  }, [progress]);

  // Category stats
  const categoryStats = useMemo(() => {
    const categories = [...new Set(UNIFIED_TOPICS.map(t => t.category))];
    return categories.map(cat => {
      const topics = getTopicsByCategory(cat);
      const completed = topics.filter(t => {
        const prog = progress[t.topicId];
        return prog?.status === 'completed' || prog?.status === 'mastered';
      }).length;
      return { category: cat, total: topics.length, completed };
    });
  }, [progress]);

  // Active learning paths
  const activePaths = useMemo(() => {
    return UNIFIED_LEARNING_PATHS.map(path => {
      const pathProgress = getPathProgress(path.id);
      return { ...path, progress: pathProgress };
    });
  }, [getPathProgress]);

  if (!user) {
    return <UnifiedDashboardGuest />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your unified HSE knowledge bank — {STANDARD_FRAMEWORKS.length} frameworks, {UNIFIED_TOPICS.length} topics, {UNIFIED_LEARNING_PATHS.length} pathways
          </p>
        </div>
      </div>

      {/* Framework Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STANDARD_FRAMEWORKS.map(fw => (
          <FrameworkBadge key={fw.id} framework={fw} />
        ))}
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          icon={CheckCircleIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value={stats.completedTopics}
          label="Completed"
          subtitle={`${stats.completionRate}% of ${stats.totalTopics}`}
        />
        <StatCard
          icon={SparklesIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={stats.inProgressTopics}
          label="In Progress"
          subtitle={`${stats.completedHours}h / ${stats.totalHours}h`}
        />
        <StatCard
          icon={TrophyIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={`${stats.avgScore}%`}
          label="Avg Score"
          subtitle={stats.avgScore > 0 ? 'Assessments' : 'No data'}
        />
        <StatCard
          icon={ClockIcon}
          iconColor="text-purple-600 bg-purple-100 dark:bg-purple-900/30"
          value={`${stats.completedHours}h`}
          label="Hours Learned"
          subtitle={`of ${stats.totalHours}h total`}
        />
        <StatCard
          icon={BuildingLibraryIcon}
          iconColor="text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30"
          value={stats.frameworksCount}
          label="Frameworks"
          subtitle="Standards covered"
        />
        <StatCard
          icon={RocketLaunchIcon}
          iconColor="text-pink-600 bg-pink-100 dark:bg-pink-900/30"
          value={UNIFIED_LEARNING_PATHS.length}
          label="Pathways"
          subtitle="Guided journeys"
        />
      </div>

      {/* Active Learning Paths */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <RocketLaunchIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Your Learning Paths
          </h2>
          <Link to="/paths" className="btn-ghost text-sm">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePaths.slice(0, 3).map(path => (
            <PathCard key={path.id} path={path} onClick={() => {}} />
          ))}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categoryStats
            .filter(c => c.total > 0)
            .sort((a, b) => b.total - a.total)
            .map(cat => (
              <CategoryCard key={cat.category} category={cat} />
            ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ActionCard
            icon={BuildingLibraryIcon}
            label="All Topics"
            description={`Browse ${UNIFIED_TOPICS.length} topics`}
            href="/topics"
            color="blue"
          />
          <ActionCard
            icon={AcademicCapIcon}
            label="Learning Paths"
            description={`${UNIFIED_LEARNING_PATHS.length} guided journeys`}
            href="/paths"
            color="purple"
          />
          <ActionCard
            icon={ScaleIcon}
            label="Compare Standards"
            description="Side-by-side comparison"
            href="/compare"
            color="orange"
          />
          <ActionCard
            icon={MagnifyingGlassIcon}
            label="Search"
            description="Find any topic, standard, or term"
            href="/search"
            color="green"
          />
          <ActionCard
            icon={BookOpenIcon}
            label="Glossary"
            description="Unified terminology"
            href="/glossary"
            color="indigo"
          />
          <ActionCard
            icon={UserGroupIcon}
            label="Community"
            description="Discussions & Q&A"
            href="/community"
            color="pink"
          />
          <ActionCard
            icon={BuildingOfficeIcon}
            label="Industry Paths"
            description="Oil & Gas, Construction, etc."
            href="/paths?industry=oil-gas"
            color="slate"
          />
          <ActionCard
            icon={ShieldCheckIcon}
            label="Assessments"
            description="Test your knowledge"
            href="/assessments"
            color="red"
          />
        </div>
      </section>

      {/* Recently Viewed / Continue Learning */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Continue Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UNIFIED_TOPICS
            .filter(t => {
              const prog = progress[t.topicId];
              return prog?.status === 'in-progress';
            })
            .slice(0, 4)
            .map(topic => (
              <TopicCard key={topic.topicId} topic={topic} variant="continue" />
            ))}
          {UNIFIED_TOPICS
            .filter(t => {
              const prog = progress[t.topicId];
              return !prog || prog.status === 'not-started';
            })
            .slice(0, Math.max(0, 4 - UNIFIED_TOPICS.filter(t => progress[t.topicId]?.status === 'in-progress').length))
            .map(topic => (
              <TopicCard key={topic.topicId} topic={topic} variant="recommended" />
            ))}
        </div>
      </section>

      {/* Framework Comparison Preview */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Standards Cross-Reference
        </h2>
        <div className="card p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Compare how different frameworks address the same topic. Select a topic to see side-by-side requirements.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['risk-assessment', 'fall-protection', 'confined-space', 'process-safety', 'permit-to-work', 'h2s-management', 'chemical-safety', 'emergency-response'].map(topicId => (
              <button
                key={topicId}
                onClick={() => {}}
                className="btn-secondary text-sm"
              >
                {UNIFIED_TOPICS.find(t => t.topicId === topicId)?.topicName || topicId}
              </button>
            ))}
          </div>
          <Link to="/compare" className="btn-primary">
            Open Comparison Tool <ArrowRightIcon className="h-4 w-4 ml-2" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function FrameworkBadge({ framework }: { framework: any }) {
  const colors: Record<string, string> = {
    ADNOC: 'bg-blue-900 text-white',
    ADOSH: 'bg-green-700 text-white',
    ISO45001: 'bg-red-600 text-white',
    ISO14001: 'bg-green-600 text-white',
    ISO31000: 'bg-gray-700 text-white',
    OSHA: 'bg-blue-700 text-white',
    ARAMCO: 'bg-amber-800 text-white',
    NEBOSH: 'bg-purple-700 text-white',
    IOSH: 'bg-blue-800 text-white',
    NFPA: 'bg-red-700 text-white',
    API: 'bg-orange-700 text-white',
    IOGP: 'bg-teal-700 text-white',
    CCPS: 'bg-indigo-700 text-white',
  };
  return (
    <span className={cn('badge px-3 py-1 text-xs font-medium', colors[framework.id] || 'bg-gray-600 text-white')}>
      {framework.name}
    </span>
  );
}

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

function PathCard({ path }: { path: any }) {
  return (
    <Link to={`/paths/${path.id}`} className="card group hover:shadow-xl transition-shadow h-full">
      <div className="card-body">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
              {path.targetAudience?.split(',')[0] || 'All Levels'}
            </span>
            {path.certifications.length > 0 && (
              <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs">
                {path.certifications[0]}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{path.progress?.percentage || 0}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{path.progress?.completed || 0}/{path.progress?.total || 0} modules</p>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{path.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{path.description}</p>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${path.progress?.percentage || 0}%` }} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {path.estimatedHours}h • {path.modules.length} modules • {path.certifications.slice(0, 2).join(', ')}
        </p>
      </div>
    </Link>
  );
}

function CategoryCard({ category }: { category: any }) {
  const percentage = category.total > 0 ? Math.round((category.completed / category.total) * 100) : 0;
  const icons: Record<string, any> = {
    'Management System': ShieldCheckIcon,
    'Risk Management': BeakerIcon,
    'Incident Management': ExclamationTriangleIcon,
    'Physical Hazards': BuildingOffice2Icon,
    'Chemical Hazards': BeakerIcon,
    'Process Safety': FactoryIcon,
    'Operational Control': WrenchScrewdriverIcon,
    'Fire Safety': ExclamationTriangleIcon,
    'Environmental': SwatchIcon,
    'Health Hazards': FaceSmileIcon,
    'Emergency Management': ExclamationTriangleIcon,
    'Sector Specific': FactoryIcon,
    'Supply Chain': UserGroupIcon,
    'Transportation': RocketLaunchIcon,
  };
  const Icon = icons[category.category] || ShieldCheckIcon;
  return (
    <Link to={`/topics?category=${encodeURIComponent(category.category)}`} className="card group hover:shadow-lg transition-shadow p-4 text-center">
      <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" aria-hidden="true" />
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{category.category}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{category.total} topics</p>
      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{percentage}% complete</p>
    </Link>
  );
}

function ActionCard({ icon: Icon, label, description, href, color }: any) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
    purple: 'text-purple-600 bg-purple-100 hover:bg-purple-200',
    orange: 'text-orange-600 bg-orange-100 hover:bg-orange-200',
    green: 'text-green-600 bg-green-100 hover:bg-green-200',
    indigo: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200',
    pink: 'text-pink-600 bg-pink-100 hover:bg-pink-200',
    slate: 'text-slate-600 bg-slate-100 hover:bg-slate-200',
    red: 'text-red-600 bg-red-100 hover:bg-red-200',
  };
  return (
    <Link to={href} className="card p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-3', colorClasses[color] || colorClasses.blue)}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </Link>
  );
}

function TopicCard({ topic, variant }: { topic: any; variant: 'continue' | 'recommended' }) {
  const prog = {}; // progress would come from context
  const isCompleted = false; // progress would come from context
  const isInProgress = variant === 'continue';
  return (
    <Link to={`/topics/${topic.topicId}`} className="card group hover:shadow-lg transition-shadow h-full">
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          <span>{getCategoryEmoji(topic.category)}</span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
            {topic.difficulty}
          </span>
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
            {topic.estimatedHours}h
          </span>
        </div>
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs">{topic.category}</span>
          {isInProgress && <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">In Progress</span>}
          {isCompleted && <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">Completed</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{topic.topicName}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{topic.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {topic.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Object.keys(topic.frameworks).length} frameworks
          </span>
        </div>
      </div>
    </Link>
  );
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

function UnifiedDashboardGuest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-3xl">
        <div className="mb-8">
          <div className="h-24 w-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <ShieldCheckIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Unified HSE Knowledge Bank
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          One platform. 13 major frameworks. 30+ topics. 6 guided pathways.
          Master ADNOC, ADOSH, ISO, OSHA, ARAMCO, NEBOSH, IOSH, NFPA, API, IOGP, CCPS — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="/register" className="btn-primary text-lg px-8 py-3">
            Start Free
          </a>
          <a href="/topics" className="btn-secondary text-lg px-8 py-3">
            Browse Topics
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {STANDARD_FRAMEWORKS.map(fw => (
            <span key={fw.id} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {fw.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{UNIFIED_TOPICS.length}+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Topics</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{STANDARD_FRAMEWORKS.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Frameworks</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{UNIFIED_LEARNING_PATHS.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pathways</p>
          </div>
        </div>
      </div>
    </div>
  );
}