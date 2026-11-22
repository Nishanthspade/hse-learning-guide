/**
 * HSE Learning Guide - Analytics Dashboard
 * Comprehensive learning analytics and reporting
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UNIFIED_TOPICS, UNIFIED_LEARNING_PATHS } from '../data/unified-standards';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  FireIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export function Analytics() {
  const { user, progress, dailyGoalMinutes, todayMinutes, currentStreak } = useApp();
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const [granularity, setGranularity] = useState<'day' | 'week' | 'month'>('day');

  // Mock analytics data - in real app would come from backend
  const analyticsData = useMemo(() => {
    const totalTopics = UNIFIED_TOPICS.length;
    const completedTopics = Object.values(progress).filter(p => p.status === 'completed' || p.status === 'mastered').length;
    const inProgressTopics = Object.values(progress).filter(p => p.status === 'in-progress').length;
    const totalHours = UNIFIED_TOPICS.reduce((sum, m) => sum + m.estimatedHours, 0);
    const completedHours = Object.entries(progress)
      .filter(([_, p]) => p.status === 'completed' || p.status === 'mastered')
      .reduce((sum, [id]) => sum + (UNIFIED_TOPICS.find(m => m.id === id)?.estimatedHours || 0), 0);
    const totalLessons = UNIFIED_TOPICS.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = Object.values(progress).flatMap(p => p.completedLessons).length;
    const avgScore = Object.values(progress)
      .flatMap(p => p.quizScores)
      .reduce((sum, q, _, arr) => sum + (q.percentage || 0) / (arr.length || 1), 0);

    // Generate mock daily activity data
    const dailyActivity = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
      return {
        date: date.toISOString().split('T')[0],
        minutes: Math.floor(Math.random() * 60) + (i === 29 ? todayMinutes : 0),
        topicsCompleted: Math.floor(Math.random() * 3),
        quizzesTaken: Math.floor(Math.random() * 2),
      };
    });

    // Category breakdown
    const categoryStats = [...new Set(UNIFIED_TOPICS.map(m => m.category))]
      .map(category => {
        const catTopics = UNIFIED_TOPICS.filter(m => m.category === category);
        const completed = catTopics.filter(t => {
          const p = progress[t.id];
          return p?.status === 'completed' || p?.status === 'mastered';
        }).length;
        return {
          category,
          total: catTopics.length,
          completed,
          percentage: catTopics.length > 0 ? Math.round((completed / catTopics.length) * 100) : 0,
        };
      });

    // Framework progress
    const frameworkStats = Object.keys(UNIFIED_TOPICS[0]?.frameworks || {}).map(fw => {
      const fwTopics = UNIFIED_TOPICS.filter(m => m.frameworks[fw]);
      const completed = fwTopics.filter(t => {
        const p = progress[t.id];
        return p?.status === 'completed' || p?.status === 'mastered';
      }).length;
      return {
        framework: fw,
        total: fwTopics.length,
        completed,
        percentage: fwTopics.length > 0 ? Math.round((completed / fwTopics.length) * 100) : 0,
      };
    });

    // Learning streak data
    const streakData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
      return {
        date: date.toISOString().split('T')[0],
        active: Math.random() > 0.3,
        minutes: Math.floor(Math.random() * 60),
      };
    });

    // Path progress
    const pathStats = UNIFIED_LEARNING_PATHS.map(path => {
      const pathProgress = path.modules.filter(m => {
        const prog = progress[m.topicId];
        return prog?.status === 'completed' || prog?.status === 'mastered';
      }).length;
      return {
        ...path,
        completed: pathProgress,
        total: path.modules.filter(m => m.required).length,
        percentage: Math.round((pathProgress / path.modules.filter(m => m.required).length) * 100),
      };
    });

    return {
      overview: {
        totalTopics,
        completedTopics,
        inProgressTopics,
        completionRate: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
        totalHours,
        completedHours,
        totalLessons,
        completedLessons,
        lessonCompletionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        avgScore: Math.round(avgScore),
        currentStreak,
        todayMinutes,
        dailyGoalMinutes,
      },
      dailyActivity,
      categoryStats,
      frameworkStats,
      streakData,
      pathStats,
    };
  }, [progress]);

  const { overview, dailyActivity, categoryStats, frameworkStats, streakData, pathStats } = analyticsData;

  const [selectedTab, setSelectedTab] = useState<'overview' | 'activity' | 'categories' | 'frameworks' | 'paths' | 'streaks'>('overview');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning progress across all frameworks and topics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="date"
              value={dateRange.start.toISOString().split('T')[0]}
              onChange={e => setDateRange({ ...dateRange, start: new Date(e.target.value) })}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-2 text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end.toISOString().split('T')[0]}
              onChange={e => setDateRange({ ...dateRange, end: new Date(e.target.value) })}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <MetricCard
          icon={CheckCircleIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value={overview.completedTopics}
          label="Completed"
          subtitle={`${overview.completionRate}% of ${overview.totalTopics}`}
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          icon={ClockIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={`${overview.completedHours}h`}
          label="Hours Learned"
          subtitle={`of ${overview.totalHours}h total`}
          trend={{ value: 8, positive: true }}
        />
        <MetricCard
          icon={TrophyIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={`${overview.avgScore}%`}
          label="Avg Score"
          subtitle="Assessment average"
          trend={{ value: 5, positive: true }}
        />
        <MetricCard
          icon={FireIcon}
          iconColor="text-red-600 bg-red-100 dark:bg-red-900/30"
          value={overview.currentStreak}
          label="Day Streak"
          subtitle={`${overview.todayMinutes}/${overview.dailyGoalMinutes} min today`}
          trend={{ value: 3, positive: true }}
        />
        <MetricCard
          icon={ChartBarIcon}
          iconColor="text-purple-600 bg-purple-100 dark:bg-purple-900/30"
          value={`${overview.lessonCompletionRate}%`}
          label="Lessons Done"
          subtitle={`${overview.completedLessons}/${overview.totalLessons}`}
          trend={{ value: 15, positive: true }}
        />
        <MetricCard
          icon={ClockIcon}
          iconColor="text-orange-600 bg-orange-100 dark:bg-orange-900/30"
          value={`${overview.todayMinutes}min`}
          label="Today"
          subtitle={`Goal: ${overview.dailyGoalMinutes}min`}
          trend={{ value: overview.todayMinutes - overview.dailyGoalMinutes, positive: overview.todayMinutes >= overview.dailyGoalMinutes }}
        />
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px" role="tablist" aria-label="Analytics sections">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'activity', label: 'Activity', icon: CalendarDaysIcon },
            { id: 'categories', label: 'Categories', icon: BuildingLibraryIcon },
            { id: 'frameworks', label: 'Frameworks', icon: ScaleIcon },
            { id: 'paths', label: 'Paths', icon: AcademicCapIcon },
            { id: 'streaks', label: 'Streaks', icon: FireIcon },
          ].map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedTab === tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                selectedTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <tab.icon className="h-5 w-5" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* Overview Tab */}
        <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab" hidden={selectedTab !== 'overview'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Progress */}
            <section className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <BuildingLibraryIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  Progress by Category
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {overview.categoryStats?.map(cat => (
                    <CategoryProgressRow key={cat.category} category={cat} />
                  ))}
                </div>
              </div>
            </section>

            {/* Framework Progress */}
            <section className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
                  Progress by Framework
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {overview.frameworkStats?.map(fw => (
                    <FrameworkProgressRow key={fw.framework} framework={fw} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Path Progress */}
          <section className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Learning Path Progress
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {overview.pathStats?.map(p => (
                  <Link key={p.id} to={`/paths/${p.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <AcademicCapIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{p.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{p.targetLevel} • {p.estimatedHours}h</p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12">{p.percentage}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Activity Tab */}
        <div role="tabpanel" id="activity-panel" aria-labelledby="activity-tab" hidden={selectedTab !== 'activity'}>
          <section className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Daily Activity (Last 30 Days)
              </h3>
              <select
                value={granularity}
                onChange={e => setGranularity(e.target.value as any)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
            <div className="card-body">
              <ActivityChart data={overview.dailyActivity} granularity={granularity} />
            </div>
          </section>

          <section className="card mt-6">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Time Distribution
              </h3>
            </div>
            <div className="card-body">
              <TimeDistributionChart data={overview.dailyActivity} />
            </div>
          </section>
        </div>

        {/* Categories Tab */}
        <div role="tabpanel" id="categories-panel" aria-labelledby="categories-tab" hidden={selectedTab !== 'categories'}>
          <div className="space-y-6">
            {overview.categoryStats?.map(cat => (
              <CategoryDetailCard key={cat.category} category={cat} />
            ))}
          </div>
        </div>

        {/* Frameworks Tab */}
        <div role="tabpanel" id="frameworks-panel" aria-labelledby="frameworks-tab" hidden={selectedTab !== 'frameworks'}>
          <div className="space-y-6">
            {overview.frameworkStats?.map(fw => (
              <FrameworkDetailCard key={fw.framework} framework={fw} />
            ))}
          </div>
        </div>

        {/* Paths Tab */}
        <div role="tabpanel" id="paths-panel" aria-labelledby="paths-tab" hidden={selectedTab !== 'paths'}>
          <div className="space-y-4">
            {overview.pathStats?.map(p => (
              <PathAnalyticsCard key={p.id} path={p} />
            ))}
          </div>
        </div>

        {/* Streaks Tab */}
        <div role="tabpanel" id="streaks-panel" aria-labelledby="streaks-tab" hidden={selectedTab !== 'streaks'}>
          <section className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                Learning Streak
              </h3>
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600">{overview.currentStreak}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
              </div>
            </div>
            <div className="card-body">
              <StreakCalendar data={overview.streakData} />
            </div>
          </section>

          <section className="card mt-6">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Streak Milestones
              </h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { days: 3, label: '3 Days', icon: FireIcon, color: 'red' },
                  { days: 7, label: '1 Week', icon: FireIcon, color: 'orange' },
                  { days: 30, label: '1 Month', icon: FireIcon, color: 'yellow' },
                  { days: 100, label: '100 Days', icon: TrophyIcon, color: 'purple' },
                  { days: 365, label: '1 Year', icon: TrophyIcon, color: 'amber' },
                ].map(milestone => (
                  <div key={milestone.days} className="card p-4 text-center">
                    <milestone.icon className={`h-10 w-10 mx-auto mb-3 text-${milestone.color}-600`} aria-hidden="true" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {overview.currentStreak >= milestone.days ? 'Achieved' : `${milestone.days - overview.currentStreak} days to go`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
function MetricCard({ icon: Icon, iconColor, value, label, subtitle, trend }: any) {
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
        {trend && (
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className={cn('font-medium', trend.positive ? 'text-green-600' : 'text-red-600')}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryProgressRow({ category }: { category: any }) {
  const categoryLabel = category.category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-900 dark:text-white">{categoryLabel}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${category.percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {category.completed}/{category.total} modules
      </p>
    </div>
  );
}

function FrameworkProgressRow({ framework }: { framework: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-900 dark:text-white">{framework.framework}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{framework.percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${framework.percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {framework.completed}/{framework.total} modules
      </p>
    </div>
  );
}

function CategoryDetailCard({ category }: { category: any }) {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-2xl">{getCategoryEmoji(category.category)}</span>
          {category.category
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')}
        </h3>
        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {category.percentage}%
        </span>
      </div>
      <div className="card-body">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${category.percentage}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{category.completed}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{category.total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{category.percentage}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkDetailCard({ framework }: { framework: any }) {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          {framework.framework}
        </h3>
        <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          {framework.percentage}%
        </span>
      </div>
      <div className="card-body">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${framework.percentage}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{framework.completed}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{framework.total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{framework.percentage}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathAnalyticsCard({ path }: { path: any }) {
  return (
    <Link to={`/paths/${path.id}`} className="card group hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{path.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{path.targetLevel} • {path.estimatedHours}h</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{path.progress?.percentage || 0}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{path.progress?.completed || 0}/{path.progress?.total || 0} modules</p>
          </div>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${path.progress?.percentage || 0}%` }} />
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{path.progress?.completed || 0} of {path.progress?.total || 0} required modules completed</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">View Details</span>
        </div>
      </div>
    </Link>
  );
}

function ActivityChart({ data, granularity }: { data: any[]; granularity: string }) {
  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No activity data</div>;
  }

  const maxMinutes = Math.max(...data.map(d => d.minutes), 1);

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((day, i) => {
          const height = Math.max((day.minutes / maxMinutes) * 100, 4);
          const isToday = i === data.length - 1;
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center justify-end gap-1">
              <div
                className={cn(
                  'w-full rounded-t transition-all duration-300',
                  isToday ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                )}
                style={{ height: `${height}%` }}
                title={`${day.date}: ${day.minutes} min`}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {granularity === 'day' ? day.date.split('-')[2] : day.date.split('-')[1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimeDistributionChart({ data }: { data: any[] }) {
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / data.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalMinutes}h</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Hours</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgMinutes}min</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Daily Average</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{data.filter(d => d.minutes > 0).length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Days</p>
        </div>
      </div>
    </div>
  );
}

function StreakCalendar({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center text-xs text-gray-500 dark:text-gray-400 font-medium py-1">
          {day}
        </div>
      ))}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {data.map((day, i) => (
          <div
            key={day.date}
            className={cn(
              'aspect-square flex items-center justify-center text-xs font-medium rounded',
              day.active
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            )}
            title={`${day.date}: ${day.minutes} min`}
          >
            {day.minutes > 0 ? day.minutes : ''}
          </div>
        ))}
      </div>
    </div>
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
    'Health Hazards': '🧠',
  };
  return emojis[category] || '📚';
}