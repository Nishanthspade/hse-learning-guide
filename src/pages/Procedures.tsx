/**
 * HSE Learning Guide - Procedures Page
 * Documented safety procedures and work instructions
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
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DownloadIcon,
  EditIcon,
  PlusIcon,
  CalendarIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export function Procedures() {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock procedures data
  const allProcedures = useMemo(() => [
    {
      id: 'loto-procedure',
      title: 'Lockout/Tagout Procedure - General',
      description: 'General LOTO procedure for energy isolation per OSHA 1910.147 and ADNOC Standard 201',
      category: 'Operational Control',
      version: '3.2',
      lastReviewed: '2024-01-15',
      nextReview: '2025-01-15',
      owner: 'HSE Manager',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI', 'ARAMCO'],
      steps: 12,
      estimatedMinutes: 30,
      attachments: ['loto-form.pdf', 'loto-checklist.pdf', 'energy-source-map.pdf'],
      tags: ['loto', 'energy-isolation', 'lockout', 'tagout'],
    },
    {
      id: 'confined-space-procedure',
      title: 'Confined Space Entry Procedure',
      description: 'Permit-required confined space entry procedure per OSHA 1910.146 and ADNOC Standard 201',
      category: 'Physical Hazards',
      version: '2.8',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Confined Space Coordinator',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI', 'ARAMCO'],
      steps: 15,
      estimatedMinutes: 45,
      attachments: ['cs-permit.pdf', 'gas-test-log.pdf', 'rescue-plan.pdf'],
      tags: ['confined-space', 'gas-testing', 'rescue', 'permit'],
    },
    {
      id: 'hot-work-procedure',
      title: 'Hot Work Safety Procedure',
      description: 'Hot work safety procedure including fire watch, permit, and fire prevention per NFPA 51B',
      category: 'Fire Safety',
      version: '2.5',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Fire Safety Officer',
      status: 'approved',
      frameworks: ['NFPA', 'OSHA', 'ADNOC', 'ADOSH', 'API'],
      steps: 14,
      estimatedMinutes: 30,
      attachments: ['hot-work-permit.pdf', 'fire-watch-log.pdf', 'fire-extinguisher-map.pdf'],
      tags: ['hot-work', 'fire-watch', 'fire-prevention', 'welding'],
    },
    {
      id: 'h2s-emergency-procedure',
      title: 'H2S Emergency Response Procedure',
      description: 'H2S emergency response procedure including detection, evacuation, and rescue per ADNOC Standard 202',
      category: 'Chemical Hazards',
      version: '3.1',
      lastReviewed: '2024-01-12',
      nextReview: '2025-01-12',
      owner: 'H2S Coordinator',
      status: 'approved',
      frameworks: ['ADNOC', 'ADOSH', 'API', 'OPITO', 'ARAMCO'],
      steps: 18,
      estimatedMinutes: 20,
      attachments: ['h2s-zones-map.pdf', 'h2s-alarm-levels.pdf', 'scba-donning-guide.pdf'],
      tags: ['h2s', 'emergency-response', 'evacuation', 'rescue'],
    },
    {
      id: 'loto-procedure-pump',
      title: 'LOTO Procedure - Centrifugal Pump P-101',
      description: 'Machine-specific LOTO procedure for Centrifugal Pump P-101 with electrical, hydraulic, and process isolation',
      category: 'Operational Control',
      version: '1.3',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Maintenance Supervisor',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH', 'ARAMCO'],
      steps: 16,
      estimatedMinutes: 45,
      attachments: ['pump-p101-energy-map.pdf', 'loto-form-p101.pdf', 'verification-checklist.pdf'],
      tags: ['loto', 'pump', 'machine-specific', 'energy-isolation'],
    },
    {
      id: 'confined-space-tank',
      title: 'Confined Space Entry - Crude Oil Storage Tank',
      description: 'Site-specific confined space entry procedure for crude oil storage tank inspection',
      category: 'Physical Hazards',
      version: '2.1',
      lastReviewed: '2024-01-12',
      nextReview: '2025-01-12',
      owner: 'Confined Space Coordinator',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'API', 'ANSI'],
      steps: 18,
      estimatedMinutes: 60,
      attachments: ['tank-entry-permit.pdf', 'gas-test-log-tank.pdf', 'rescue-plan-tank.pdf'],
      tags: ['confined-space', 'storage-tank', 'crude-oil', 'inspection'],
    },
    {
      id: 'hot-work-offshore',
      title: 'Hot Work Procedure - Offshore Platform',
      description: 'Hot work procedure for offshore platforms including helideck operations and SIMOPS',
      category: 'Fire Safety',
      version: '1.8',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Offshore HSE Advisor',
      status: 'approved',
      frameworks: ['ADNOC', 'ADOSH', 'NFPA', 'API', 'BSEE'],
      steps: 16,
      estimatedMinutes: 45,
      attachments: ['offshore-hot-work-permit.pdf', 'simoos-plan.pdf', 'helideck-operations.pdf'],
      tags: ['hot-work', 'offshore', 'simoos', 'helideck'],
    },
    {
      id: 'excavation-shoring',
      title: 'Excavation and Shoring Procedure',
      description: 'Excavation and shoring procedure per OSHA 1926 Subpart P and ADNOC standards',
      category: 'Physical Hazards',
      version: '2.2',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Excavation Competent Person',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI'],
      steps: 14,
      estimatedMinutes: 40,
      attachments: ['excavation-permit.pdf', 'shoring-design.pdf', 'soil-classification-log.pdf'],
      tags: ['excavation', 'shoring', 'trenching', 'competent-person'],
    },
    {
      id: 'scaffolding-erection',
      title: 'Scaffolding Erection and Dismantling Procedure',
      description: 'Scaffolding erection, inspection, and dismantling procedure per OSHA 1926.451 and ADNOC',
      category: 'Physical Hazards',
      version: '2.3',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Scaffolding Supervisor',
      status: 'approved',
      frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH', 'SAIA'],
      steps: 15,
      estimatedMinutes: 40,
      attachments: ['scaffolding-tag-system.pdf', 'scaffolding-inspection-checklist.pdf', 'handover-certificate.pdf'],
      tags: ['scaffolding', 'erection', 'dismantling', 'inspection'],
    },
    {
      id: 'chemical-storage',
      title: 'Chemical Storage and Segregation Procedure',
      description: 'Chemical storage, segregation, and compatibility procedure per OSHA, NFPA, and ADNOC',
      category: 'Chemical Hazards',
      version: '2.4',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Chemical Safety Officer',
      status: 'approved',
      frameworks: ['OSHA', 'NFPA', 'ADNOC', 'ADOSH', 'GHS'],
      steps: 12,
      estimatedMinutes: 30,
      attachments: ['chemical-segregation-chart.pdf', 'chemical-inventory-template.pdf', 'spill-containment-guide.pdf'],
      tags: ['chemical-storage', 'segregation', 'compatibility', 'sds'],
    },
    {
      id: 'spill-response-procedure',
      title: 'Oil/Chemical Spill Response Procedure',
      description: 'Oil and chemical spill response procedure per SPCC, ADNOC, and IPIECA guidelines',
      category: 'Environmental',
      version: '2.6',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Environmental Coordinator',
      status: 'approved',
      frameworks: ['EPA', 'ADNOC', 'ADOSH', 'IPIECA', 'API'],
      steps: 15,
      estimatedMinutes: 30,
      attachments: ['spill-response-flowchart.pdf', 'spill-kit-contents.pdf', 'disposal-manifest.pdf'],
      tags: ['spill-response', 'spcc', 'environmental', 'cleanup'],
    },
    {
      id: 'emergency-response-procedure',
      title: 'Site Emergency Response Procedure',
      description: 'Site emergency response procedure with ICS structure, communication, and evacuation',
      category: 'Emergency Management',
      version: '3.2',
      lastReviewed: '2024-01-15',
      nextReview: '2025-01-15',
      owner: 'Emergency Response Coordinator',
      status: 'approved',
      frameworks: ['ADNOC', 'ADOSH', 'ISO22301', 'NFPA1600', 'NCEMA'],
      steps: 20,
      estimatedMinutes: 60,
      attachments: ['erp-document.pdf', 'ics-organization-chart.pdf', 'communication-plan.pdf', 'evacuation-maps.pdf'],
      tags: ['emergency-response', 'ics', 'evacuation', 'crisis-management'],
    },
    {
      id: 'incident-investigation-procedure',
      title: 'Incident Investigation Procedure',
      description: 'Incident investigation procedure with 5 Whys, Fishbone, ICAM, and TapRooT methodologies',
      category: 'Incident Management',
      version: '2.7',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Investigation Lead',
      status: 'approved',
      frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ICAM', 'Tripod Beta', 'TapRooT'],
      steps: 15,
      estimatedMinutes: 120,
      attachments: ['investigation-form.pdf', 'witness-statement-template.pdf', 'root-cause-analysis-template.pdf'],
      tags: ['incident-investigation', 'root-cause', 'icam', '5-whys'],
    },
    {
      id: 'contractor-hse-procedure',
      title: 'Contractor HSE Management Procedure',
      description: 'Contractor HSE management procedure per ADNOC Standard 105 and IOGP 423',
      category: 'Supply Chain',
      version: '2.3',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Contractor HSE Coordinator',
      status: 'approved',
      frameworks: ['ADNOC', 'ADOSH', 'IOGP', 'ISO45001', 'ARAMCO'],
      steps: 12,
      estimatedMinutes: 45,
      attachments: ['contractor-hse-plan-template.pdf', 'contractor-pre-qual-form.pdf', 'contractor-hse-audit-checklist.pdf'],
      tags: ['contractor', 'hse-management', 'pre-qualification', 'chsep'],
    },
    {
      id: 'waste-management-procedure',
      title: 'Hazardous Waste Management Procedure',
      description: 'Hazardous waste management procedure per RCRA, ADNOC, and EPA regulations',
      category: 'Environmental',
      version: '2.5',
      lastReviewed: '2024-01-10',
      nextReview: '2025-01-10',
      owner: 'Environmental Coordinator',
      status: 'approved',
      frameworks: ['EPA', 'RCRA', 'ADNOC', 'ADOSH', 'EAD'],
      steps: 14,
      estimatedMinutes: 45,
      attachments: ['waste-classification-guide.pdf', 'waste-manifest-template.pdf', 'disposal-facility-list.pdf'],
      tags: ['hazardous-waste', 'rcra', 'disposal', 'manifest'],
    },
  ];
  return procedures;
}, []);

  const categories = useMemo(() => {
    const cats = [...new Set(allProcedures.map(p => p.category))];
    return ['all', ...cats.sort()];
  }, [allProcedures]);

  const statuses = useMemo(() => {
    const statuses = [...new Set(allProcedures.map(p => p.status))];
    return ['all', ...statuses.sort()];
  }, [allProcedures]);

  const filteredProcedures = useMemo(() => {
    let result = allProcedures;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus);
    }

    result.sort((a, b) => new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime());

    return result;
  }, [allProcedures, searchQuery, selectedCategory, selectedStatus]);

  const statuses = useMemo(() => {
    const statuses = [...new Set(allProcedures.map(p => p.status))];
    return ['all', ...statuses.sort()];
  }, [allProcedures]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Safety Procedures</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {allProcedures.length} documented procedures across all frameworks
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
            {((selectedCategory !== 'all' ? 1 : 0) + (selectedStatus !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)) > 0 && (
              <span className="badge bg-white/20 text-white text-xs">
                {(selectedCategory !== 'all' ? 1 : 0) + (selectedStatus !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)}
              </span>
            )}
          </button>
          <Link to="/procedures/new" className="btn-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            Create Procedure
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
            placeholder="Search procedures..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search procedures"
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
            aria-label="Sort procedures"
          >
            <option value="lastReviewed">Recently Reviewed</option>
            <option value="title">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="version">Version</option>
            <option value="category">Category</option>
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
                onClick={() => { setSelectedCategory('all'); setSelectedStatus('all'); }}
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

              {/* Status Filter */}
              <FilterSection
                title="Status"
                options={['approved', 'draft', 'under-review', 'archived'].map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                selected={selectedStatus === 'all' ? [] : [selectedStatus]}
                onChange={values => setSelectedStatus(values.length ? values[0] : 'all')}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProcedures.length} of {allProcedures.length} procedures
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProcedures.map(procedure => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProcedures.map(procedure => (
            <ProcedureListItem key={procedure.id} procedure={procedure} />
          ))}
        </div>
      )}

      {filteredProcedures.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No procedures found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }}
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
function ProcedureCard({ procedure }: { procedure: any }) {
  const statusColors: Record<string, string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    'under-review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500',
  };

  return (
    <Link to={`/procedures/${procedure.id}`} className="card group hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">{getCategoryEmoji(procedure.category)}</span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={cn('badge text-xs', getStatusColor(procedure.status))}>
            {procedure.status.charAt(0).toUpperCase() + procedure.status.slice(1)}
          </span>
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
            v{procedure.version}
          </span>
        </div>
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{procedure.category}</span>
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">
            v{procedure.version}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{procedure.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{procedure.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {procedure.steps} steps
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ~{procedure.estimatedMinutes} min
          </span>
        </div>
      </div>
      <div className="card-footer pt-0">
        <Link to={`/procedures/${procedure.id}`} className="btn-primary w-full text-center py-2">
          <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          View Procedure
        </Link>
      </div>
    </Link>
  );
}

function ProcedureListItem({ procedure }: { procedure: any }) {
  const statusColors: Record<string, string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    'under-review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  };

  return (
    <Link to={`/procedures/${procedure.id}`} className="card flex items-center gap-4 p-4 hover:shadow-md transition-shadow group">
      <div className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <span className="text-3xl">{getCategoryEmoji(procedure.category)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{procedure.category}</span>
          <span className={cn('badge text-xs', getStatusColor(procedure.status))}>
            {procedure.status.charAt(0).toUpperCase() + procedure.status.slice(1)}
          </span>
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">v{procedure.version}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{procedure.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{procedure.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {procedure.steps} steps
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ~{procedure.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Object.keys(procedure.frameworks).length} frameworks
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
  return [...new Set(allProcedures.map(p => p.category))].sort();
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
  return emojis[category] || '📋';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    'under-review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  };
  return colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
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
  return emojis[category] || '📋';
}

function getCategories(): string[] {
  return [...new Set(allProcedures.map(p => p.category))].sort();
}