/**
 * ADNOC Glossary Page
 * Comprehensive dictionary of ADNOC HSE terminology, acronyms, and definitions
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getADNOCGlossary } from '../data/adnoc-content';
import { cn } from '../utils/cn';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  TagIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

export function ADNOCGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'term' | 'category'>('term');
  const [expandedTerms, setExpandedTerms] = useState<string[]>([]);

  const glossary = useMemo(() => getADNOCGlossary(), []);

  const categories = useMemo(() => {
    const cats = [...new Set(glossary.map(t => t.category))];
    return ['all', ...cats.sort()];
  }, [glossary]);

  const filteredGlossary = useMemo(() => {
    let result = glossary;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query) ||
        t.synonyms.some(s => s.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'term') return a.term.localeCompare(b.term);
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.term.localeCompare(b.term);
    });

    return result;
  }, [glossary, searchQuery, selectedCategory, sortBy]);

  const toggleTerm = (term: string) => {
    setExpandedTerms(prev =>
      prev.includes(term)
        ? prev.filter(t => t !== term)
        : [...prev, term]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpenIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            ADNOC HSE Glossary
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive dictionary of ADNOC HSE terminology, acronyms, and definitions
          </p>
        </div>
        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {glossary.length} Terms
        </span>
      </div>

      {/* Search & Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search terms, definitions, acronyms..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search glossary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{formatCategory(cat)}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Sort by"
            >
              <option value="term">Sort by Term (A-Z)</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>Showing {filteredGlossary.length} of {glossary.length} terms</span>
        <button
          type="button"
          onClick={() => setExpandedTerms(filteredGlossary.map(t => t.term))}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Expand All
        </button>
      </div>

      {/* Glossary Terms */}
      <div className="space-y-2">
        {filteredGlossary.map(term => (
          <GlossaryTermCard
            key={term.term}
            term={term}
            isExpanded={expandedTerms.includes(term.term)}
            onToggle={() => toggleTerm(term.term)}
          />
        ))}
      </div>

      {filteredGlossary.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No terms found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function GlossaryTermCard({ term, isExpanded, onToggle }: { term: any; isExpanded: boolean; onToggle: () => void }) {
  const categoryColors: Record<string, string> = {
    'safety-management-systems': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'oil-gas-safety': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'process-safety': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'environmental-protection': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'emergency-response': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'lockout-tagout': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  const categoryColor = categoryColors[term.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';

  return (
    <div className="card group">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 text-left flex items-start justify-between"
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">{term.term}</h3>
            <span className={cn('badge text-xs', categoryColor)}>
              {formatCategory(term.category)}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{term.definition}</p>
        </div>
        <ChevronDownIcon
          className={cn('h-5 w-5 text-gray-400 transition-transform flex-shrink-0', isExpanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-3 pt-3">
            {term.synonyms.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <TagIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  Synonyms / Also Known As
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.synonyms.map((s, i) => (
                    <span key={i} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {term.relatedTerms.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  Related Terms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((rt, i) => (
                    <span key={i} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800">{rt}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatCategory(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}