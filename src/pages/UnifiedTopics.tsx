/**
 * Unified Topics Catalog
 * Browse and filter all HSE topics across all frameworks
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UNIFIED_TOPICS, 
  STANDARD_FRAMEWORKS,
  getTopicsByCategory,
  getTopicsByFramework,
  getTopicsByDifficulty,
  searchTopics 
} from '../data/unified-standards';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ViewColumnsIcon,
  ListBulletIcon,
  FunnelIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
  PlayCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

export function UnifiedTopics() {
  const { progress, searchQuery, setSearchQuery, searchFilters, setSearchFilters, sortOption, setSortOption, viewMode, setViewMode, isTopicCompleted } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let result = [...UNIFIED_TOPICS];

    // Search filter
    if (searchQuery.trim()) {
      result = searchTopics(searchQuery);
    }

    // Category filter
    if (searchFilters.categories?.length) {
      result = result.filter(t => searchFilters.categories!.includes(t.category));
    }

    // Difficulty filter
    if (searchFilters.difficulties?.length) {
      result = result.filter(t => searchFilters.difficulties!.includes(t.difficulty));
    }

    // Framework filter
    if (searchFilters.frameworks?.length) {
      result = result.filter(t => 
        searchFilters.frameworks!.some(fw => t.frameworks[fw] && t.frameworks[fw]!.length > 0)
      );
    }

    // Completion filter
    if (searchFilters.completed !== undefined) {
      result = result.filter(t => isTopicCompleted(t.topicId) === searchFilters.completed);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortOption.field) {
        case 'topicName':
          comparison = a.topicName.localeCompare(b.topicName);
          break;
        case 'difficulty': {
          const diffOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
          comparison = diffOrder[a.difficulty] - diffOrder[b.difficulty];
          break;
        }
        case 'estimatedHours':
          comparison = a.estimatedHours - b.estimatedHours;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortOption.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, searchFilters, sortOption, progress]);

  // Group by category
  const topicsByCategory = useMemo(() => {
    const grouped: Record<string, typeof UNIFIED_TOPICS> = {};
    filteredTopics.forEach(topic => {
      if (!grouped[topic.category]) grouped[topic.category] = [];
      grouped[topic.category].push(topic);
    });
    return grouped;
  }, [filteredTopics]);

  const categories = [...new Set(UNIFIED_TOPICS.map(t => t.category))].sort();
  const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
  const frameworks = STANDARD_FRAMEWORKS.map(f => f.id);

  const hasActiveFilters = searchFilters.categories?.length ||
    searchFilters.difficulties?.length ||
    searchFilters.frameworks?.length ||
    searchFilters.completed !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Bank</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Explore {UNIFIED_TOPICS.length} topics across {STANDARD_FRAMEWORKS.length} frameworks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'btn-secondary flex items-center gap-2',
              showFilters && 'bg-blue-600 text-white border-blue-600'
            )}
          >
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="badge bg-white/20 text-white text-xs">{getActiveFilterCount()}</span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, standards, frameworks..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-label="Search topics"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="group" aria-label="View mode">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded transition-colors',
                viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              )}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <ViewColumnsIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded transition-colors',
                viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              )}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Sort */}
          <select
            value={`${sortOption.field}:${sortOption.direction}`}
            onChange={e => {
              const [field, direction] = e.target.value.split(':');
              setSortOption({ field: field as any, direction: direction as any });
            }}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Sort topics"
          >
            <option value="topicName:asc">Name A-Z</option>
            <option value="topicName:desc">Name Z-A</option>
            <option value="difficulty:asc">Difficulty: Beginner → Expert</option>
            <option value="difficulty:desc">Difficulty: Expert → Beginner</option>
            <option value="estimatedHours:asc">Duration: Shortest First</option>
            <option value="estimatedHours:desc">Duration: Longest First</option>
            <option value="category:asc">Category A-Z</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card animate-slide-down mb-6">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button
                type="button"
                onClick={() => setSearchFilters({})}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <FilterSection
                title="Categories"
                options={categories.map(c => ({ value: c, label: c }))}
                selected={searchFilters.categories || []}
                onChange={values => setSearchFilters({ ...searchFilters, categories: values })}
                multiple
              />

              {/* Difficulties */}
              <FilterSection
                title="Difficulty"
                options={difficulties.map(d => ({ value: d, label: d.charAt(0).toUpperCase() + d.slice(1) }))}
                selected={searchFilters.difficulties || []}
                onChange={values => setSearchFilters({ ...searchFilters, difficulties: values })}
                multiple
              />

              {/* Frameworks */}
              <FilterSection
                title="Frameworks"
                options={STANDARD_FRAMEWORKS.map(f => ({ value: f.id, label: f.name }))}
                selected={searchFilters.frameworks || []}
                onChange={values => setSearchFilters({ ...searchFilters, frameworks: values })}
                multiple
              />

              {/* Status */}
              <FilterSection
                title="Status"
                options={[
                  { value: 'completed', label: 'Completed' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'not-started', label: 'Not Started' },
                ]}
                selected={searchFilters.completed !== undefined ? (searchFilters.completed ? ['completed'] : ['not-started']) : []}
                onChange={values => setSearchFilters({ ...searchFilters, completed: values.includes('completed') })}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredTopics.length} of {UNIFIED_TOPICS.length} topics
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTopics.map(topic => (
            <UnifiedTopicCard
              key={topic.topicId}
              topic={topic}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTopics.map(topic => (
            <UnifiedTopicListItem key={topic.topicId} topic={topic} />
          ))}
        </div>
      )}

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No topics found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={() => setSearchFilters({})}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Category View (alternative) */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
        <div className="space-y-6">
          {Object.entries(
            Object.fromEntries(
              Object.entries(
                filteredTopics.reduce((acc, topic) => {
                  if (!acc[topic.category]) acc[topic.category] = [];
                  acc[topic.category].push(topic);
                  return acc;
                }, {} as Record<string, typeof UNIFIED_TOPICS>)
              ).sort(([a], [b]) => a.localeCompare(b))
            )
          ).map(([category, topics]) => (
            <CategorySection key={category} category={category} topics={topics} />
          ))}
        </div>
      </div>
    </div>
  );

  function getActiveFilterCount(): number {
    let count = 0;
    if (searchFilters.categories?.length) count += searchFilters.categories.length;
    if (searchFilters.difficulties?.length) count += searchFilters.difficulties.length;
    if (searchFilters.frameworks?.length) count += searchFilters.frameworks.length;
    if (searchFilters.completed !== undefined) count += 1;
    return count;
  }
}

// ============================================
// SUB-COMPONENTS
// ============================================

function UnifiedTopicCard({ topic }: { topic: any }) {
  const isCompleted = false; // Would come from context
  const isInProgress = false;

  return (
    <Link to={`/topics/${topic.topicId}`} className="card group h-full flex flex-col transition-all duration-200 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          <span>{getCategoryEmoji(topic.category)}</span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
            {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
          </span>
          <div className="flex gap-1 justify-end">
            {Object.keys(topic.frameworks).slice(0, 3).map(fw => (
              <span key={fw} className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xs">
                {fw}
              </span>
            ))}
            {Object.keys(topic.frameworks).length > 3 && (
              <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xs">
                +{Object.keys(topic.frameworks).length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs">{topic.category}</span>
          <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
            {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
          </span>
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

function UnifiedTopicListItem({ topic }: { topic: any }) {
  return (
    <Link to={`/topics/${topic.topicId}`} className="card flex items-center gap-4 p-4 hover:shadow-md transition-shadow group">
      <div className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <span className="text-3xl">{getCategoryEmoji(topic.category)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs">{topic.category}</span>
          <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
            {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{topic.topicName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">{topic.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {topic.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Object.keys(topic.frameworks).length} frameworks
          </span>
          <span className="flex items-center gap-1">
            <BuildingLibraryIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Object.keys(topic.frameworks).slice(0, 3).join(', ')}
            {Object.keys(topic.frameworks).length > 3 && '...'}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
      </div>
    </Link>
  );
}

function CategorySection({ category, topics }: { category: string; topics: any[] }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="card">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryEmoji(category)}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{topics.length} topics</p>
          </div>
        </div>
        <ChevronDownIcon className={cn('h-5 w-5 text-gray-400 transition-transform', !expanded && 'rotate-180')} aria-hidden="true" />
      </button>
      {expanded && (
        <div className="px-4 pb-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map(topic => (
              <Link key={topic.topicId} to={`/topics/${topic.topicId}`} className="card group hover:shadow-md transition-shadow p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{getCategoryEmoji(topic.category)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{topic.topicName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{topic.description}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className={cn('badge text-xs', getDifficultyColor(topic.difficulty))}>
                        {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                      </span>
                      <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xs">
                        {topic.estimatedHours}h
                      </span>
                      <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xs">
                        {Object.keys(topic.frameworks).length} frameworks
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
  multiple = true,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-white mb-2"
      >
        <span>{title}</span>
        <ChevronDownIcon className={cn('h-4 w-4 text-gray-400 transition-transform', !expanded && 'rotate-180')} aria-hidden="true" />
      </button>
      {expanded && (
        <div className="space-y-2">
          {options.map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type={multiple ? 'checkbox' : 'radio'}
                checked={selected.includes(option.value)}
                onChange={e => {
                  if (multiple) {
                    onChange(e.target.checked
                      ? [...selected, option.value]
                      : selected.filter(v => v !== option.value)
                    );
                  } else {
                    onChange(e.target.checked ? [option.value] : []);
                  }
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      )}
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