/**
 * Unified Standards Comparison Tool
 * Side-by-side comparison of how different frameworks address HSE topics
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UNIFIED_TOPICS, 
  STANDARD_FRAMEWORKS,
  getTopicById,
  getCrossReference 
} from '../data/unified-standards';
import { cn } from '../utils/cn';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ScaleIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  BookOpenIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export function UnifiedCompare() {
  const { progress } = useApp();
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(STANDARD_FRAMEWORKS.slice(0, 4).map(f => f.id));
  const [showDetails, setShowDetails] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const topic = useMemo(() => selectedTopicId ? getTopicById(selectedTopicId) : null, [selectedTopicId]);
  const availableFrameworks = useMemo(() => {
    if (!topic) return STANDARD_FRAMEWORKS;
    return STANDARD_FRAMEWORKS.filter(fw => topic.frameworks[fw.id] && topic.frameworks[fw.id].length > 0);
  }, [topic]);

  const allFrameworks = STANDARD_FRAMEWORKS;
  const topics = UNIFIED_TOPICS;

  const handleFrameworkToggle = (fwId: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(fwId)
        ? prev.filter(id => id !== fwId)
        : [...prev, fwId]
    );
  };

  const selectAllFrameworks = () => setSelectedFrameworks(availableFrameworks.map(f => f.id));
  const clearFrameworks = () => setSelectedFrameworks([]);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ScaleIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
              Standards Comparison Tool
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Compare how different frameworks address HSE topics side-by-side
            </p>
          </div>
        </div>

        {/* Topic Selector */}
        <div className="card p-6 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select a Topic to Compare</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNIFIED_TOPICS.map(t => (
              <button
                key={t.topicId}
                onClick={() => setSelectedTopicId(t.topicId)}
                className="card p-4 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getCategoryEmoji(t.category)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{t.topicName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{Object.keys(t.frameworks).length} frameworks</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(t.frameworks).slice(0, 4).map(fw => (
                    <span key={fw} className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xs">{fw}</span>
                  ))}
                  {Object.keys(t.frameworks).length > 4 && (
                    <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500">+{Object.keys(t.frameworks).length - 4}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const selectedFwDetails = STANDARD_FRAMEWORKS.filter(f => selectedFrameworks.includes(f.id));
  const comparisonData = buildComparisonData();

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link to="/compare" className="btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ScaleIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
              {topic.topicName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{topic.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={cn('p-2 rounded-lg transition-colors', viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}
            aria-label="Table view"
          >
            <div className="h-5 w-5" aria-hidden="true">⊞</div>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={cn('p-2 rounded-lg transition-colors', viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}
            aria-label="Cards view"
          >
            <div className="h-5 w-5" aria-hidden="true">⬜</div>
          </button>
        </div>
      </div>

      {/* Topic Header */}
      <div className="card p-6 mb-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="badge bg-white/20 text-white mb-2">{topic.category}</span>
            <h2 className="text-xl font-bold">{topic.topicName}</h2>
            <p className="text-white/90 mt-1">{topic.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.keys(topic.frameworks).map(fw => (
                <span key={fw} className="badge bg-white/20 text-white">{fw}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-bold">{topic.estimatedHours}h</p>
              <p className="text-white/80 text-sm">Estimated Learning</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{Object.keys(topic.frameworks).length}</p>
              <p className="text-white/80 text-sm">Frameworks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Selector */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
            Select Frameworks to Compare ({selectedFrameworks.length}/{availableFrameworks.length})
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={selectAllFrameworks} className="btn-ghost text-sm">Select All</button>
            <button onClick={clearFrameworks} className="btn-ghost text-sm" disabled={selectedFrameworks.length === 0}>Clear</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableFrameworks.map(fw => (
            <label key={fw.id} className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all',
              selectedFrameworks.includes(fw.id)
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
            )}>
              <input
                type="checkbox"
                checked={selectedFrameworks.includes(fw.id)}
                onChange={() => handleFrameworkToggle(fw.id)}
                className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <FrameworkBadge framework={framework} />
              <span className="text-sm font-medium">{framework.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Comparison View */}
      {viewMode === 'table' ? (
        <ComparisonTable comparisonData={comparisonData} frameworks={selectedFwDetails} topic={topic} showDetails={showDetails} onToggleDetails={() => setShowDetails(!showDetails)} />
      ) : (
        <ComparisonCards comparisonData={comparisonData} frameworks={selectedFwDetails} topic={topic} />
      )}

      {/* Export & Share */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowDownTrayIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Export & Share
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
            Export as PDF
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4" aria-hidden="true" />
            Export as CSV
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <ShareIcon className="h-4 w-4" aria-hidden="true" />
            Share Link
          </button>
          <button className="btn-ghost flex items-center gap-2">
            <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
            Toggle Details
          </button>
        </div>
      </div>
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
    <span className={cn('badge px-2 py-1 text-xs font-medium', colors[framework.id] || 'bg-gray-600 text-white')}>
      {framework.name}
    </span>
  );
}

function ComparisonTable({ comparisonData, frameworks, topic, showDetails, onToggleDetails }: any) {
  const columns = [
    { key: 'aspect', label: 'Aspect', width: 'w-48' },
    { key: 'category', label: 'Category', width: 'w-32' },
    ...frameworks.map(fw => ({ key: fw.id, label: fw.name, width: 'w-64' })),
  ];

  return (
    <div className="card overflow-hidden">
      <div className="card-header flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Detailed Comparison
        </h3>
        <button onClick={onToggleDetails} className="btn-ghost text-sm">
          {showDetails ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-2 font-medium">Aspect</th>
              <th className="pb-2 font-medium">Category</th>
              {comparisonData.frameworks.map(fw => (
                <th key={fw} className="pb-2 font-medium text-center px-4">
                  <FrameworkBadge framework={STANDARD_FRAMEWORKS.find(f => f.id === fw)} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {comparisonData.rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-3 font-medium text-gray-900 dark:text-white">{row.aspect}</td>
                <td className="p-3 text-center px-4 text-gray-500 dark:text-gray-400 text-sm">{row.category}</td>
                {comparisonData.frameworks.map(fw => (
                  <td key={fw} className="p-3 px-4 text-center">
                    {row.values[fw] || <span className="text-gray-400">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonCards({ comparisonData, frameworks, topic }: any) {
  return (
    <div className="space-y-6">
      {comparisonData.rows.map((row, i) => (
        <div key={i} className="card">
          <div className="card-header bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{row.aspect}</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-{frameworks.length} gap-4">
              {frameworks.map(fw => (
                <div key={fw.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FrameworkBadge framework={STANDARD_FRAMEWORKS.find(f => f.id === fw.id)} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{row.category}</span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {row.values[fw.id] || <span className="text-gray-400">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
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

// Build comparison data
function buildComparisonData() {
  // This would be called with a specific topic
  // For now, return mock structure
  return {
    frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA', 'ARAMCO', 'ISO14001', 'ISO31000', 'API', 'NFPA', 'IOGP', 'CCPS', 'NEBOSH', 'IOSH'],
    rows: [
      { aspect: 'Mandatory?', category: 'Compliance', values: { ADNOC: 'Yes', ADOSH: 'Yes', ISO45001: 'Voluntary', OSHA: 'Yes', ARAMCO: 'Yes', ISO14001: 'Voluntary', ISO31000: 'Voluntary', API: 'Guidance', NFPA: 'Voluntary', IOGP: 'Guidance', CCPS: 'Guidance', NEBOSH: 'Certification', IOSH: 'Certification' } },
      { aspect: 'Key Document', category: 'Documentation', values: { ADNOC: 'HSE Standards 100-300', ADOSH: 'ADOSH-SF', ISO45001: 'ISO 45001:2018', OSHA: '29 CFR 1910/1926', ARAMCO: 'GI 2.100/SAS', ISO14001: 'ISO 14001:2015', ISO31000: 'ISO 31000:2018', API: 'RP 750/754/756', NFPA: 'NFPA 10/13/70E', IOGP: 'Reports 456/459', CCPS: 'RBPS Guidelines', NEBOSH: 'IGC/IDip', IOSH: 'Managing Safely' } },
      { aspect: 'Certification', category: 'Certification', values: { ADNOC: 'No', ADOSH: 'Yes', ISO45001: 'Yes', OSHA: 'No', ARAMCO: 'No', ISO14001: 'Yes', ISO31000: 'No', API: 'No', NFPA: 'No', IOGP: 'No', CCPS: 'No', NEBOSH: 'Yes', IOSH: 'Yes' } },
      { aspect: 'Region', category: 'Scope', values: { ADNOC: 'UAE (Abu Dhabi)', ADOSH: 'UAE (Abu Dhabi)', ISO45001: 'Global', OSHA: 'US (Global Ref)', ARAMCO: 'Saudi Arabia', ISO14001: 'Global', ISO31000: 'Global', API: 'Global (US Origin)', NFPA: 'Global (US Origin)', IOGP: 'Global', CCPS: 'Global (US Origin)', NEBOSH: 'Global (UK)', IOSH: 'Global (UK)' } },
      { aspect: 'Industry', category: 'Scope', values: { ADNOC: 'Oil & Gas', ADOSH: 'All Industries', ISO45001: 'All Industries', OSHA: 'All Industries', ARAMCO: 'Oil & Gas', ISO14001: 'All Industries', ISO31000: 'All Industries', API: 'Oil & Gas', NFPA: 'All Industries', IOGP: 'Oil & Gas', CCPS: 'Chemical/Petroleum', NEBOSH: 'All Industries', IOSH: 'All Industries' } },
    ],
  };
}