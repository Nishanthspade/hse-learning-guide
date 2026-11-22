/**
 * HSE Learning Guide - Module Catalog Page
 * Browse and filter all available HSE modules
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HSE_MODULES, getAllCategories, getAllTags } from '../data/modules';
import { cn } from '../utils/cn';
import { formatCategory, getCategoryIcon } from '../utils/category';
import { LoadingSpinner, SkeletonCard } from '../components/ui/LoadingSpinner';
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
} from '@heroicons/react/24/outline';

export function ModuleCatalog() {
  const {
    progress,
    searchQuery,
    setSearchQuery,
    searchFilters,
    setSearchFilters,
    sortOption,
    setSortOption,
    viewMode,
    setViewMode,
    isModuleCompleted,
    getModuleWithProgress,
    startModule,
  } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Filter and sort modules
  const filteredModules = useMemo(() => {
    let result = [...HSE_MODULES];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.tags.some(t => t.toLowerCase().includes(query)) ||
        m.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (searchFilters.categories?.length) {
      result = result.filter(m => searchFilters.categories!.includes(m.category));
    }

    // Difficulty filter
    if (searchFilters.difficulties?.length) {
      result = result.filter(m => searchFilters.difficulties!.includes(m.difficulty));
    }

    // Standards filter
    if (searchFilters.standards?.length) {
      result = result.filter(m =>
        m.standards.some(s => searchFilters.standards!.includes(s.framework))
      );
    }

    // Tags filter
    if (searchFilters.tags?.length) {
      result = result.filter(m =>
        searchFilters.tags!.some(t => m.tags.includes(t))
      );
    }

    // Completion filter
    if (searchFilters.completed !== undefined) {
      result = result.filter(m => isModuleCompleted(m.id) === searchFilters.completed);
    }

    // Bookmarked filter
    if (searchFilters.bookmarked) {
      // Would need bookmarked modules from context
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortOption.field) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty': {
          const diffOrder = { basic: 0, intermediate: 1, advanced: 2, expert: 3 };
          comparison = diffOrder[a.difficulty] - diffOrder[b.difficulty];
          break;
        }
        case 'estimatedHours':
          comparison = a.estimatedHours - b.estimatedHours;
          break;
        case 'lastUpdated':
          comparison = new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          break;
        case 'completionRate':
          // Would need analytics data
          comparison = 0;
          break;
        default:
          comparison = 0;
      }
      return sortOption.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, searchFilters, sortOption, progress]);

  // Group modules by category
  const modulesByCategory = useMemo(() => {
    const grouped: Record<string, typeof HSE_MODULES> = {};
    filteredModules.forEach(module => {
      if (!grouped[module.category]) grouped[module.category] = [];
      grouped[module.category].push(module);
    });
    return grouped;
  }, [filteredModules]);

  const categories = getAllCategories();
  const allTags = getAllTags();

  const hasActiveFilters = searchFilters.categories?.length ||
    searchFilters.difficulties?.length ||
    searchFilters.standards?.length ||
    searchFilters.tags?.length ||
    searchFilters.completed !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Module Catalog</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Explore {HSE_MODULES.length} comprehensive HSE modules across all major hazards and topics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'btn-secondary flex items-center gap-2',
              showFilters && 'bg-hse-primary/10 text-hse-primary border-hse-primary'
            )}
          >
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="badge-primary text-xs">{getActiveFilterCount()}</span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search modules, hazards, topics..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-hse-primary focus:border-transparent"
            aria-label="Search modules"
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
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-hse-primary"
            aria-label="Sort modules"
          >
            <option value="title:asc">Title A-Z</option>
            <option value="title:desc">Title Z-A</option>
            <option value="difficulty:asc">Difficulty: Easy to Hard</option>
            <option value="difficulty:desc">Difficulty: Hard to Easy</option>
            <option value="estimatedHours:asc">Duration: Shortest First</option>
            <option value="estimatedHours:desc">Duration: Longest First</option>
            <option value="lastUpdated:desc">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card animate-slide-down">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button
                type="button"
                onClick={() => setSearchFilters({})}
                className="text-sm text-hse-primary hover:text-hse-secondary"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <FilterSection
                title="Categories"
                options={categories.map(c => ({ value: c, label: formatCategory(c) }))}
                selected={searchFilters.categories || []}
                onChange={values => setSearchFilters({ ...searchFilters, categories: values })}
                multiple
              />

              {/* Difficulties */}
              <FilterSection
                title="Difficulty"
                options={[
                  { value: 'basic', label: 'Basic' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                  { value: 'expert', label: 'Expert' },
                ]}
                selected={searchFilters.difficulties || []}
                onChange={values => setSearchFilters({ ...searchFilters, difficulties: values })}
                multiple
              />

              {/* Standards */}
              <FilterSection
                title="Standards"
                options={[
                  { value: 'OSHA', label: 'OSHA' },
                  { value: 'ISO45001', label: 'ISO 45001' },
                  { value: 'NEBOSH', label: 'NEBOSH' },
                  { value: 'IOSH', label: 'IOSH' },
                  { value: 'ANSI', label: 'ANSI' },
                  { value: 'NFPA', label: 'NFPA' },
                  { value: 'EPA', label: 'EPA' },
                ]}
                selected={searchFilters.standards || []}
                onChange={values => setSearchFilters({ ...searchFilters, standards: values })}
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
          Showing {filteredModules.length} of {HSE_MODULES.length} modules
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map(module => (
            <ModuleCard
              key={module.id}
              module={getModuleWithProgress(module.id)!}
              onClick={() => startModule(module.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredModules.map(module => (
            <ModuleListItem
              key={module.id}
              module={getModuleWithProgress(module.id)!}
              onClick={() => startModule(module.id)}
            />
          ))}
        </div>
      )}

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No modules found</h3>
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
    </div>
  );

  function getActiveFilterCount(): number {
    let count = 0;
    if (searchFilters.categories?.length) count += searchFilters.categories.length;
    if (searchFilters.difficulties?.length) count += searchFilters.difficulties.length;
    if (searchFilters.standards?.length) count += searchFilters.standards.length;
    if (searchFilters.tags?.length) count += searchFilters.tags.length;
    if (searchFilters.completed !== undefined) count += 1;
    return count;
  }
}

// ============================================
// SUB-COMPONENTS
// ============================================

function ModuleCard({
  module,
  onClick,
}: {
  module: ReturnType<typeof getModuleWithProgress> & { progress?: { status: string } };
  onClick: () => void;
}) {
  const progress = module.progress;
  const isCompleted = progress?.status === 'completed' || progress?.status === 'mastered';
  const isInProgress = progress?.status === 'in-progress';

  return (
    <button
      type="button"
      onClick={onClick}
      className="card group h-full flex flex-col transition-all duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{getCategoryIcon(module.category)}</span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <DifficultyBadge difficulty={module.difficulty} />
          <div className="flex gap-1 justify-end">
            {module.standards.slice(0, 2).map(s => (
              <span key={s.framework} className="badge-secondary text-xs">{s.framework}</span>
            ))}
          </div>
        </div>
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" aria-hidden="true" />
          </div>
        )}
        {isInProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-hse-primary" />
        )}
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge-primary text-xs">{formatCategory(module.category)}</span>
          {isInProgress && <span className="badge-accent text-xs">In Progress</span>}
          {isCompleted && <span className="badge-success text-xs">Completed</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{module.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{module.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {module.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <PlayCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {module.lessons.length} lessons
          </span>
        </div>
      </div>
    </button>
  );
}

function ModuleListItem({
  module,
  onClick,
}: {
  module: ReturnType<typeof getModuleWithProgress> & { progress?: { status: string } };
  onClick: () => void;
}) {
  const progress = module.progress;
  const isCompleted = progress?.status === 'completed' || progress?.status === 'mastered';
  const isInProgress = progress?.status === 'in-progress';
  const completionPercent = isCompleted ? 100 : isInProgress && module.lessons.length > 0
    ? Math.round((progress!.completedLessons.length / module.lessons.length) * 100)
    : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'card flex items-center gap-4 p-4 transition-all duration-200 hover:shadow-md group',
        isCompleted && 'border-hse-success/50 bg-hse-success/5'
      )}
    >
      <div className={cn('h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0', isCompleted ? 'bg-hse-success/10' : 'bg-gray-100 dark:bg-gray-800')}>
        <span className="text-3xl">{getCategoryIcon(module.category)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge-primary text-xs">{formatCategory(module.category)}</span>
          <DifficultyBadge difficulty={module.difficulty} />
          {isInProgress && <span className="badge-accent text-xs">In Progress</span>}
          {isCompleted && <span className="badge-success text-xs">Completed</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{module.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">{module.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {module.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <PlayCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {module.lessons.length} lessons
          </span>
          {module.standards.length > 0 && (
            <span className="flex items-center gap-1">
              <span className="h-3.5 w-3.5" aria-hidden="true">📋</span>
              {module.standards.map(s => s.framework).join(', ')}
            </span>
          )}
        </div>
        {isInProgress && (
          <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-hse-primary rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-hse-primary transition-colors" aria-hidden="true" />
      </div>
    </button>
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
                className="h-4 w-4 rounded border-gray-300 text-hse-primary focus:ring-hse-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    basic: 'badge-primary',
    intermediate: 'badge-accent',
    advanced: 'badge-warning',
    expert: 'badge-danger',
  };
  return <span className={cn('badge text-xs', colors[difficulty as keyof typeof colors] || 'badge-secondary')}>{difficulty}</span>;
}

// Functions moved to src/utils/category.ts