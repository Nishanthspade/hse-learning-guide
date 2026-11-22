/**
 * HSE Learning Guide - Resources Page
 * Central hub for all downloadable resources, templates, and reference materials
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UNIFIED_TOPICS } from '../../data/unified-standards';
import { cn } from '../../utils/cn';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  LinkIcon,
  WrenchIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  ArrowRightIcon,
  DownloadIcon,
  FunnelIcon,
  GridIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

export function Resources() {
  const { progress } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock resources data - in real app would come from API
  const allResources = useMemo(() => {
    const resources = [
      {
        id: 'jsa-template',
        title: 'Job Safety Analysis (JSA) Template',
        description: 'Comprehensive JSA template with risk matrix, controls hierarchy, and sign-off sections',
        type: 'template',
        category: 'Risk Management',
        frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA', 'ARAMCO'],
        fileSize: '245 KB',
        downloads: 12450,
        rating: 4.8,
        tags: ['JSA', 'Risk Assessment', 'Template'],
        url: '/templates/jsa-template.pdf',
      },
      {
        id: 'risk-matrix',
        title: '5×5 Risk Assessment Matrix',
        description: 'Color-coded risk matrix with likelihood/severity scales and risk rating guidelines',
        type: 'template',
        category: 'Risk Management',
        frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'ISO31000', 'OSHA'],
        fileSize: '180 KB',
        downloads: 9800,
        rating: 4.9,
        tags: ['Risk Matrix', 'Risk Assessment', 'Template'],
        url: '/templates/risk-matrix.pdf',
      },
      {
        id: 'ptw-form',
        title: 'Permit to Work Form Set',
        description: 'Complete PTW form set: Hot Work, Cold Work, Confined Space, Height, Excavation, Electrical',
        type: 'template',
        category: 'Operational Control',
        frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'IOGP'],
        fileSize: '520 KB',
        downloads: 8200,
        rating: 4.7,
        tags: ['PTW', 'Permit', 'Hot Work', 'Confined Space'],
        url: '/templates/ptw-forms.pdf',
      },
      {
        id: 'loto-procedure',
        title: 'Lockout/Tagout Procedure Template',
        description: 'Machine-specific LOTO procedure template with isolation points, verification steps, and group LOTO',
        type: 'template',
        category: 'Operational Control',
        frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI', 'ARAMCO'],
        fileSize: '310 KB',
        downloads: 7800,
        rating: 4.8,
        tags: ['LOTO', 'Lockout', 'Tagout', 'Template'],
        url: '/templates/loto-procedure.pdf',
      },
      {
        id: 'confined-space-permit',
        title: 'Confined Space Entry Permit',
        description: 'Complete confined space entry permit with gas testing log, rescue plan, and role assignments',
        type: 'template',
        category: 'Physical Hazards',
        frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'ANSI'],
        fileSize: '280 KB',
        downloads: 6500,
        rating: 4.9,
        tags: ['Confined Space', 'Permit', 'Gas Testing', 'Rescue'],
        url: '/templates/confined-space-permit.pdf',
      },
      {
        id: 'h2s-response-plan',
        title: 'H2S Emergency Response Plan Template',
        description: 'H2S emergency response plan with zones, action levels, PPE requirements, and rescue procedures',
        type: 'template',
        category: 'Chemical Hazards',
        frameworks: ['ADNOC', 'ADOSH', 'API', 'OPITO', 'ARAMCO'],
        fileSize: '350 KB',
        downloads: 5200,
        rating: 4.8,
        tags: ['H2S', 'Emergency Response', 'Template', 'Zones'],
        url: '/templates/h2s-response-plan.pdf',
      },
      {
        id: 'jsa-video',
        title: 'How to Conduct a JSA - Video Tutorial',
        description: 'Step-by-step video guide on conducting effective Job Safety Analyses',
        type: 'video',
        category: 'Risk Management',
        frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA'],
        fileSize: '45 MB',
        downloads: 4500,
        rating: 4.7,
        tags: ['JSA', 'Video', 'Training'],
        url: '/videos/jsa-tutorial.mp4',
      },
      {
        id: 'hazop-guide',
        title: 'HAZOP Facilitation Guide',
        description: 'Comprehensive guide to facilitating HAZOP studies with worksheets and examples',
        type: 'guide',
        category: 'Process Safety',
        frameworks: ['ADNOC', 'API', 'CCPS', 'IOGP', 'OSHA'],
        fileSize: '2.1 MB',
        downloads: 3800,
        rating: 4.9,
        tags: ['HAZOP', 'Process Safety', 'Guide'],
        url: '/guides/hazop-guide.pdf',
      },
      {
        id: 'loto-training',
        title: 'LOTO Training Presentation',
        description: 'Complete LOTO training slides with speaker notes, quiz, and practical exercises',
        type: 'presentation',
        category: 'Operational Control',
        frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI', 'ARAMCO'],
        fileSize: '8.5 MB',
        downloads: 3200,
        rating: 4.6,
        tags: ['LOTO', 'Training', 'Presentation'],
        url: '/presentations/loto-training.pptx',
      },
      {
        id: 'incident-investigation-guide',
        title: 'Incident Investigation Guide',
        description: 'Step-by-step incident investigation guide with 5 Whys, Fishbone, ICAM, and TapRooT methods',
        type: 'guide',
        category: 'Incident Management',
        frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ICAM', 'Tripod Beta'],
        fileSize: '1.8 MB',
        downloads: 2900,
        rating: 4.8,
        tags: ['Incident Investigation', 'Root Cause', 'Guide'],
        url: '/guides/incident-investigation.pdf',
      },
      {
        id: 'emergency-response-plan',
        title: 'Emergency Response Plan Template',
        description: 'Complete ERP template with ICS structure, communication plan, and regulatory notifications',
        type: 'template',
        category: 'Emergency Management',
        frameworks: ['ADNOC', 'ADOSH', 'ISO22301', 'NFPA1600', 'NCEMA'],
        fileSize: '420 KB',
        downloads: 2500,
        rating: 4.7,
        tags: ['Emergency Response', 'ERP', 'ICS', 'Crisis Management'],
        url: '/templates/emergency-response-plan.pdf',
      },
      {
        id: 'contractor-hsep-template',
        title: 'Contractor HSE Plan (CHSEP) Template',
        description: 'Contractor HSE Plan template aligned with ADNOC Standard 105 and IOGP 423',
        type: 'template',
        category: 'Supply Chain',
        frameworks: ['ADNOC', 'ADOSH', 'IOGP', 'ISO45001', 'ARAMCO'],
        fileSize: '380 KB',
        downloads: 2200,
        rating: 4.7,
        tags: ['Contractor', 'HSE Plan', 'CHSEP', 'Contractor Management'],
        url: '/templates/contractor-hsep.pdf',
      },
      {
        id: 'environmental-checklist',
        title: 'Environmental Compliance Checklist',
        description: 'Monthly environmental compliance checklist covering air, water, waste, and spill prevention',
        type: 'checklist',
        category: 'Environmental',
        frameworks: ['ADNOC', 'ADOSH', 'EPA', 'EAD', 'ISO14001'],
        fileSize: '220 KB',
        downloads: 2100,
        rating: 4.6,
        tags: ['Environmental', 'Compliance', 'Checklist', 'Audit'],
        url: '/checklists/environmental-compliance.pdf',
      },
      {
        id: 'scaffolding-checklist',
        title: 'Scaffolding Inspection Checklist',
        description: 'Daily/weekly scaffolding inspection checklist per OSHA 1926.451 and ADNOC standards',
        type: 'checklist',
        category: 'Physical Hazards',
        frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH', 'ANSI'],
        fileSize: '180 KB',
        downloads: 1800,
        rating: 4.7,
        tags: ['Scaffolding', 'Inspection', 'Checklist', 'Fall Protection'],
        url: '/checklists/scaffolding-inspection.pdf',
      },
      {
        id: 'lifting-plan',
        title: 'Critical Lift Plan Template',
        description: 'Critical lift plan template with load calculations, rigging diagrams, and competency verification',
        type: 'template',
        category: 'Sector Specific',
        frameworks: ['ADNOC', 'ADOSH', 'API', 'ASME', 'IOGP'],
        fileSize: '320 KB',
        downloads: 1600,
        rating: 4.8,
        tags: ['Lifting', 'Rigging', 'Critical Lift', 'Crane'],
        url: '/templates/lifting-plan.pdf',
      },
      {
        id: 'h2s-emergency-video',
        title: 'H2S Emergency Response - Video',
        description: 'H2S emergency response procedures video with zone recognition, PPE donning, and rescue',
        type: 'video',
        category: 'Chemical Hazards',
        frameworks: ['ADNOC', 'ADOSH', 'API', 'OPITO', 'ARAMCO'],
        fileSize: '62 MB',
        downloads: 1400,
        rating: 4.9,
        tags: ['H2S', 'Emergency', 'Video', 'Training'],
        url: '/videos/h2s-emergency.mp4',
      },
      {
        id: 'incident-investigation-form',
        title: 'Incident Investigation Report Form',
        description: 'Standardized incident investigation report form with 5 Whys, Fishbone, and corrective action tracker',
        type: 'form',
        category: 'Incident Management',
        frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ICAM', 'Tripod Beta'],
        fileSize: '250 KB',
        downloads: 1200,
        rating: 4.7,
        tags: ['Incident Investigation', 'Root Cause', 'Form', 'Corrective Action'],
        url: '/forms/incident-investigation.pdf',
      },
    ];
    return resources;
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(allResources.map(r => r.category))];
    return ['all', ...cats.sort()];
  }, [allResources]);

  const types = useMemo(() => {
    const types = [...new Set(allResources.map(r => r.type))];
    return ['all', ...types.sort()];
  }, [allResources]);

  const filteredResources = useMemo(() => {
    let result = allResources;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'all') {
      result = result.filter(r => r.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(r => r.category === selectedCategory);
    }

    result.sort((a, b) => b.downloads - a.downloads);

    return result;
  }, [allResources, searchQuery, selectedType, selectedCategory]);

  const hasActiveFilters = selectedType !== 'all' || selectedCategory !== 'all' || searchQuery.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resource Library</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {allResources.length} professional resources across all frameworks
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
            {((selectedType !== 'all' ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)) > 0 && (
              <span className="badge bg-white/20 text-white text-xs">
                {(selectedType !== 'all' ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)}
              </span>
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
            placeholder="Search resources, templates, guides..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search resources"
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
            aria-label="Sort resources"
          >
            <option value="downloads">Most Downloaded</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="size-asc">Smallest File First</option>
            <option value="size-desc">Largest File First</option>
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
                onClick={() => { setSelectedType('all'); setSelectedCategory('all'); }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type Filter */}
              <FilterSection
                title="Resource Type"
                options={[
                  { value: 'template', label: 'Template' },
                  { value: 'video', label: 'Video' },
                  { value: 'guide', label: 'Guide' },
                  { value: 'checklist', label: 'Checklist' },
                  { value: 'presentation', label: 'Presentation' },
                  { value: 'form', label: 'Form' },
                  { value: 'guide', label: 'Guide' },
                ]}
                selected={selectedType === 'all' ? [] : [selectedType]}
                onChange={values => setSelectedType(values.length ? values[0] : 'all')}
                multiple={false}
              />

              {/* Category Filter */}
              <FilterSection
                title="Category"
                options={[
                  'Risk Management',
                  'Operational Control',
                  'Physical Hazards',
                  'Chemical Hazards',
                  'Process Safety',
                  'Environmental',
                  'Health Hazards',
                  'Emergency Management',
                  'Sector Specific',
                  'Supply Chain',
                  'Transportation',
                  'Incident Management',
                  'Supply Chain',
                  'Transportation',
                ].filter((v, i, a) => a.indexOf(v) === i).map(c => ({ value: c, label: c }))]
                selected={selectedCategory === 'all' ? [] : [selectedCategory]}
                onChange={values => setSelectedCategory(values.length ? values[0] : 'all')}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredResources.length} of {allResources.length} resources
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredResources.map(resource => (
            <ResourceListItem key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedType('all'); setSelectedCategory('all'); }}
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
function ResourceCard({ resource }: { resource: any }) {
  const typeIcons: Record<string, any> = {
    template: DocumentTextIcon,
    video: VideoCameraIcon,
    guide: DocumentTextIcon,
    checklist: ClipboardDocumentListIcon,
    presentation: DocumentDuplicateIcon,
    form: DocumentTextIcon,
    guide: DocumentTextIcon,
  };
  const Icon = typeIcons[resource.type] || DocumentTextIcon;

  return (
    <Link
      to={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-3xl">{getTypeEmoji(resource.type)}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn('badge text-xs', getTypeColor(resource.type))}>
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          <span className="badge bg-gray-900/80 text-white text-xs">{resource.fileSize}</span>
          <div className="flex items-center gap-1 text-white text-xs">
            <span className="flex items-center gap-1">
              <span className="text-yellow-300">★</span>
              {resource.rating}
            </span>
          </div>
        </div>
      </div>
      <div className="card-body flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
            {resource.category}
          </span>
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">
            {resource.type}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{resource.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{resource.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {resource.downloads.toLocaleString()} downloads
          </span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-300">★</span>
            {resource.rating}
          </span>
        </div>
      </div>
      <div className="card-footer pt-0">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center py-2"
        >
          <DownloadIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          Download
        </a>
      </div>
    </Link>
  );
}

function ResourceListItem({ resource }: { resource: any }) {
  const typeIcons: Record<string, any> = {
    template: DocumentTextIcon,
    video: VideoCameraIcon,
    guide: DocumentTextIcon,
    checklist: ClipboardDocumentListIcon,
    presentation: DocumentDuplicateIcon,
    form: DocumentTextIcon,
    guide: DocumentTextIcon,
  };
  const Icon = typeIcons[resource.type] || DocumentTextIcon;

  return (
    <Link
      to={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex items-center gap-4 p-4 hover:shadow-md transition-shadow group"
    >
      <div className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{resource.category}</span>
          <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">{resource.type}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{resource.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{resource.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {resource.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-300">★</span>
            {resource.rating}
          </span>
          <span className="flex items-center gap-1">
            <span>{resource.fileSize}</span>
          </span>
        </div>
      </div>
      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
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

function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    template: '📄',
    video: '🎬',
    guide: '📖',
    checklist: '✅',
    presentation: '📊',
    form: '📝',
    guide: '📖',
  };
  return emojis[type] || '📄';
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    template: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    video: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    guide: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    checklist: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    presentation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    form: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    guide: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}