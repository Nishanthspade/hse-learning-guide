/**
 * HSE Learning Guide - Checklists Page
 * Digital checklists for inspections, audits, and daily safety verification
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  DownloadIcon,
  EditIcon,
  PlusIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export function Checklists() {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock checklists data
  const allChecklists = useMemo(() => [
    {
      id: 'daily-site-inspection',
      title: 'Daily Site Safety Inspection',
      description: 'Comprehensive daily walkthrough checklist for construction sites and industrial facilities',
      category: 'General Safety',
      frequency: 'daily',
      frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA', 'ARAMCO'],
      items: 45,
      estimatedMinutes: 30,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-15',
      downloads: 15420,
      rating: 4.8,
      tags: ['daily', 'inspection', 'site-walkthrough', 'compliance'],
    },
    {
      id: 'pre-task-risk-assessment',
      title: 'Pre-Task Risk Assessment (JSA)',
      description: 'Job Safety Analysis checklist for high-risk activities before work commencement',
      category: 'Risk Management',
      frequency: 'pre-task',
      frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA', 'ARAMCO'],
      items: 25,
      estimatedMinutes: 15,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 18500,
      rating: 4.9,
      tags: ['JSA', 'risk-assessment', 'pre-task', 'hazard-identification'],
    },
    {
      id: 'confined-space-entry',
      title: 'Confined Space Entry Checklist',
      description: 'Complete confined space entry verification including atmospheric testing, isolation, and rescue',
      category: 'Physical Hazards',
      frequency: 'pre-task',
      frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'ANSI'],
      items: 35,
      estimatedMinutes: 20,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-12',
      downloads: 15600,
      rating: 4.9,
      tags: ['confined-space', 'gas-testing', 'isolation', 'rescue'],
    },
    {
      id: 'hot-work-permit',
      title: 'Hot Work Permit Checklist',
      description: 'Hot work permit verification including fire watch, combustible clearance, and fire protection',
      category: 'Fire Safety',
      frequency: 'pre-task',
      frameworks: ['ADNOC', 'ADOSH', 'NFPA', 'OSHA', 'API'],
      items: 28,
      estimatedMinutes: 15,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-08',
      downloads: 14200,
      rating: 4.8,
      tags: ['hot-work', 'fire-watch', 'permit', 'fire-prevention'],
    },
    {
      id: 'confined-space-entry',
      title: 'Confined Space Entry Checklist',
      description: 'Complete confined space entry verification including atmospheric testing, isolation, and rescue',
      category: 'Physical Hazards',
      frequency: 'pre-task',
      frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'ANSI'],
      items: 35,
      estimatedMinutes: 20,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-12',
      downloads: 15600,
      rating: 4.9,
      tags: ['confined-space', 'gas-testing', 'isolation', 'rescue'],
    },
    {
      id: 'scaffolding-inspection',
      title: 'Scaffolding Inspection Checklist',
      description: 'Daily/weekly scaffolding inspection per OSHA 1926.451 and ADNOC standards',
      category: 'Physical Hazards',
      frequency: 'daily',
      frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH'],
      items: 32,
      estimatedMinutes: 20,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 13500,
      rating: 4.8,
      tags: ['scaffolding', 'fall-protection', 'inspection', 'competent-person'],
    },
    {
      id: 'excavation-shoring',
      title: 'Excavation & Shoring Inspection',
      description: 'Excavation and shoring inspection per OSHA 1926 Subpart P and ADNOC standards',
      category: 'Physical Hazards',
      frequency: 'daily',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI'],
      items: 28,
      estimatedMinutes: 25,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-12',
      downloads: 9800,
      rating: 4.7,
      tags: ['excavation', 'shoring', 'trenching', 'soil-classification'],
    },
    {
      id: 'scaffolding-inspection',
      title: 'Scaffolding Inspection Checklist',
      description: 'Daily/weekly scaffolding inspection per OSHA 1926.451 and ADNOC standards',
      category: 'Physical Hazards',
      frequency: 'daily',
      frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH'],
      items: 32,
      estimatedMinutes: 20,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 13500,
      rating: 4.8,
      tags: ['scaffolding', 'fall-protection', 'inspection', 'competent-person'],
    },
    {
      id: 'electrical-safety',
      title: 'Electrical Safety Inspection',
      description: 'Electrical safety inspection per NFPA 70E and OSHA 1910 Subpart S',
      category: 'Electrical Safety',
      frequency: 'monthly',
      frameworks: ['NFPA', 'OSHA', 'ADNOC', 'ADOSH'],
      items: 30,
      estimatedMinutes: 30,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 11200,
      rating: 4.7,
      tags: ['electrical', 'nfpa-70e', 'arc-flash', 'lockout-tagout'],
    },
    {
      id: 'fire-extinguisher',
      title: 'Fire Extinguisher Monthly Inspection',
      description: 'Monthly fire extinguisher inspection per NFPA 10 and OSHA 1910.157',
      category: 'Fire Safety',
      frequency: 'monthly',
      frameworks: ['NFPA', 'OSHA', 'ADNOC', 'ADOSH'],
      items: 15,
      estimatedMinutes: 10,
      signOffRequired: true,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 9800,
      rating: 4.6,
      tags: ['fire-extinguisher', 'nfpa-10', 'monthly-inspection'],
    },
    {
      id: 'fire-alarm-test',
      title: 'Fire Alarm System Quarterly Test',
      description: 'Quarterly fire alarm system functional test per NFPA 72',
      category: 'Fire Safety',
      frequency: 'quarterly',
      frameworks: ['NFPA', 'ADNOC', 'ADOSH', 'OSHA'],
      items: 22,
      estimatedMinutes: 45,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 8500,
      rating: 4.7,
      tags: ['fire-alarm', 'nfpa-72', 'quarterly-test', 'emergency-systems'],
    },
    {
      id: 'emergency-eyewash',
      title: 'Emergency Eyewash/Shower Weekly Test',
      description: 'Weekly emergency eyewash/shower activation test per ANSI Z358.1',
      category: 'Emergency Management',
      frequency: 'weekly',
      frameworks: ['ANSI', 'OSHA', 'ADNOC', 'ADOSH'],
      items: 12,
      estimatedMinutes: 10,
      signOffRequired: true,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 8200,
      rating: 4.6,
      tags: ['eyewash', 'shower', 'ansi-z358', 'weekly-test'],
    },
    {
      id: 'lifting-equipment',
      title: 'Lifting Equipment Inspection',
      description: 'Lifting equipment (cranes, slings, shackles) inspection per ASME B30 and ADNOC',
      category: 'Sector Specific',
      frequency: 'monthly',
      frameworks: ['ASME', 'ADNOC', 'API', 'OSHA', 'ARAMCO'],
      items: 25,
      estimatedMinutes: 30,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 8800,
      rating: 4.8,
      tags: ['lifting', 'crane', 'rigging', 'asme-b30'],
    },
    {
      id: 'ppe-inspection',
      title: 'PPE Inspection Checklist',
      description: 'Personal protective equipment inspection per ANSI/ISEA standards',
      category: 'PPE',
      frequency: 'monthly',
      frameworks: ['ANSI', 'OSHA', 'ADNOC', 'ADOSH'],
      items: 20,
      estimatedMinutes: 15,
      signOffRequired: false,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 7800,
      rating: 4.6,
      tags: ['ppe', 'inspection', 'ansi', 'equipment'],
    },
    {
      id: 'environmental-compliance',
      title: 'Environmental Compliance Checklist',
      description: 'Monthly environmental compliance checklist covering air, water, waste, and spill prevention',
      category: 'Environmental',
      frequency: 'monthly',
      frameworks: ['EPA', 'ADNOC', 'ADOSH', 'EAD', 'ISO14001'],
      items: 35,
      estimatedMinutes: 45,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 8500,
      rating: 4.7,
      tags: ['environmental', 'compliance', 'air', 'water', 'waste'],
    },
    {
      id: 'spill-response',
      title: 'Spill Response Readiness Checklist',
      description: 'Spill response readiness verification per SPCC and ADNOC standards',
      category: 'Environmental',
      frequency: 'quarterly',
      frameworks: ['EPA', 'ADNOC', 'ADOSH', 'API', 'IMO'],
      items: 25,
      estimatedMinutes: 30,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 6200,
      rating: 4.7,
      tags: ['spill-response', 'spcc', 'emergency', 'spill-kit'],
    },
    {
      id: 'contractor-mobilization',
      title: 'Contractor Mobilization HSE Checklist',
      description: 'Contractor mobilization HSE verification per ADNOC Standard 105 and IOGP 423',
      category: 'Supply Chain',
      frequency: 'pre-task',
      frameworks: ['ADNOC', 'ADOSH', 'IOGP', 'ISO45001', 'ARAMCO'],
      items: 40,
      estimatedMinutes: 60,
      signOffRequired: true,
      digitalSignature: true,
      lastUpdated: '2024-01-10',
      downloads: 7200,
      rating: 4.8,
      tags: ['contractor', 'mobilization', 'chsep', 'pre-qualification'],
    },
    {
      id: 'vehicle-inspection',
      title: 'Vehicle Pre-Use Inspection',
      description: 'Daily vehicle pre-use inspection per DOT and ADNOC land transport safety',
      category: 'Transportation',
      frequency: 'daily',
      frameworks: ['DOT', 'ADNOC', 'ADOSH', 'ISO39001'],
      items: 22,
      estimatedMinutes: 10,
      signOffRequired: true,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 12500,
      rating: 4.7,
      tags: ['vehicle', 'fleet', 'dot', 'pre-use'],
    },
    {
      id: 'ergonomics-assessment',
      title: 'Office Ergonomics Workstation Assessment',
      description: 'Office workstation ergonomics assessment per ANSI/HFES 100 and ISO 11226',
      category: 'Health Hazards',
      frequency: 'annually',
      frameworks: ['ANSI', 'ISO11226', 'ISO11228', 'OSHA', 'ADNOC'],
      items: 28,
      estimatedMinutes: 20,
      signOffRequired: false,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 5400,
      rating: 4.5,
      tags: ['ergonomics', 'office', 'workstation', 'musculoskeletal'],
    },
    {
      id: 'first-aid-kit',
      title: 'First Aid Kit Monthly Inspection',
      description: 'First aid kit content verification per OSHA 1910.151 and ANSI Z308.1',
      category: 'Emergency Management',
      frequency: 'monthly',
      frameworks: ['OSHA', 'ANSI', 'ADNOC', 'ADOSH'],
      items: 18,
      estimatedMinutes: 10,
      signOffRequired: true,
      digitalSignature: false,
      lastUpdated: '2024-01-15',
      downloads: 7200,
      rating: 4.6,
      tags: ['first-aid', 'medical', 'emergency', 'kit-inspection'],
    },
  ];
  return checklists;
}, []);

  const categories = useMemo(() => {
    const cats = [...new Set(allChecklists.map(c => c.category))];
    return ['all', ...cats.sort()];
  }, [allChecklists]);

  const frequencies = useMemo(() => {
    const freqs = [...new Set(allChecklists.map(c => c.frequency))];
    return ['all', ...freqs.sort()];
  }, [allChecklists]);

  const filteredChecklists = useMemo(() => {
    let result = allChecklists;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    if (selectedFrequency !== 'all') {
      result = result.filter(c => c.frequency === selectedFrequency);
    }

    result.sort((a, b) => b.downloads - a.downloads);

    return result;
  }, [allChecklists, searchQuery, selectedCategory, selectedFrequency]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedFrequency !== 'all' || searchQuery.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Safety Checklists</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {allChecklists.length} digital checklists for inspections, audits, and daily verification
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
            {((selectedCategory !== 'all' ? 1 : 0) + (selectedFrequency !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)) > 0 && (
              <span className="badge bg-white/20 text-white text-xs">
                {(selectedCategory !== 'all' ? 1 : 0) + (selectedFrequency !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)}
              </span>
            )}
          </button>
          <Link to="/checklists/new" className="btn-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            Create Checklist
          </Link>
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
            placeholder="Search checklists..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search checklists"
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
              <GridIcon className="h-5 w-5" aria-hidden="true" />
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
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort checklists"
          >
            <option value="downloads">Most Downloaded</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="items-asc">Fewest Items</option>
            <option value="items-desc">Most Items</option>
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
                onClick={() => { setSelectedCategory('all'); setSelectedFrequency('all'); }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Category Filter */}
              <FilterSection
                title="Category"
                options={getCategories().map(c => ({ value: c, label: c }))}
                selected={selectedCategory === 'all' ? [] : [selectedCategory]}
                onChange={values => setSelectedCategory(values.length ? values[0] : 'all')}
                multiple={false}
              />

              {/* Frequency Filter */}
              <FilterSection
                title="Frequency"
                options={['daily', 'weekly', 'monthly', 'quarterly', 'annually', 'pre-task', 'post-incident'].map(f => ({ value: f, label: f.charAt(0).toUpperCase() + f.slice(1) }))}
                selected={selectedFrequency === 'all' ? [] : [selectedFrequency]}
                onChange={values => setSelectedFrequency(values.length ? values[0] : 'all')}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredChecklists.length} of {allChecklists.length} checklists
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredChecklists.map(checklist => (
            <ChecklistCard key={checklist.id} checklist={checklist} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredChecklists.map(checklist => (
            <ChecklistListItem key={checklist.id} checklist={checklist} />
          ))}
        </div>
      )}

      {filteredChecklists.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No checklists found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedFrequency('all'); }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

// Sub-components
function ChecklistCard({ checklist }: { checklist: any }) {
  return (
    <Link to={`/checklists/${checklist.id}`} className="card group hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">{getCategoryEmoji(checklist.category)}</span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={cn('badge text-xs', getFrequencyColor(checklist.frequency))}>
            {checklist.frequency.charAt(0).toUpperCase() + checklist.frequency.slice(1)}
          </span>
          <div className="flex gap-1 justify-end">
            {checklist.signOffRequired && (
              <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Sign-off
              </span>
            )}
            {checklist.digitalSignature && (
              <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs">
                Digital Sig
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{checklist.category}</span>
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">
            {checklist.frequency}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{checklist.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{checklist.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {checklist.items} items
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ~{checklist.estimatedMinutes} min
          </span>
        </div>
      </div>
      <div className="card-footer pt-0">
        <Link
          to={`/checklists/${checklist.id}`}
          className="btn-primary w-full text-center py-2"
        >
          <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          Use Checklist
        </Link>
      </div>
    </Link>
  );
}

function ChecklistListItem({ checklist }: { checklist: any }) {
  return (
    <Link to={`/checklists/${checklist.id}`} className="card flex items-center gap-4 p-4 hover:shadow-md transition-shadow group">
      <div className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <span className="text-3xl">{getCategoryEmoji(checklist.category)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{checklist.category}</span>
          <span className={cn('badge text-xs', getFrequencyColor(checklist.frequency))}>
            {checklist.frequency}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{checklist.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{checklist.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {checklist.items} items
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {checklist.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Object.keys(checklist.frameworks).length} frameworks
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
      </div>
    </Link>
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

function getCategories(): string[] {
  return [...new Set(allChecklists.map(c => c.category))].sort();
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'General Safety': '🛡️',
    'Risk Management': '📊',
    'Physical Hazards': '🛡️',
    'Fire Safety': '🔥',
    'Electrical Safety': '⚡',
    'Fire Safety': '🔥',
    'Emergency Management': '🚨',
    'Sector Specific': '🏗️',
    'PPE': '🪖',
    'Environmental': '🌿',
    'Supply Chain': '🤝',
    'Transportation': '🚛',
    'Health Hazards': '🧠',
  };
  return emojis[category] || '📋';
}

function getFrequencyColor(frequency: string): string {
  const colors: Record<string, string> = {
    daily: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    weekly: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    monthly: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    quarterly: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    annually: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    'pre-task': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'post-incident': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  };
  return colors[frequency] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}