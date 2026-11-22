/**
 * HSE Learning Guide - Case Studies Page
 * Real-world incident analyses and lessons learned
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
  ChevronRightIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TagIcon,
  FunnelIcon,
  BookOpenIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

export function CaseStudies() {
  const { progress } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock case studies data
  const allCaseStudies = useMemo(() => [
    {
      id: 'h2s-release-offshore',
      title: 'H2S Release During Well Testing - Offshore Platform',
      industry: 'Oil & Gas - Offshore',
      scenario: 'During a well test operation on an ADNOC offshore platform, a sudden H2S release occurred at 50 ppm. The well tester was overcome. The standby gas tester activated the alarm. Two workers attempted rescue without SCBA.',
      rootCauses: [
        'H2S detection system calibration drift went undetected',
        'No continuous real-time H2S monitoring at well test area',
        'Rescue plan not rehearsed; workers unaware of SCBA requirement',
        'Gas tester not equipped with SCBA for continuous monitoring',
      ],
      lessonsLearned: [
        'Continuous real-time H2S monitoring mandatory for well test operations',
        'All personnel in H2S zones must have immediate access to SCBA',
        'Rescue plans must be practiced, not just documented',
        'Gas testers must be equipped with SCBA for continuous monitoring',
        'H2S zone classification must be clearly marked and communicated',
      ],
      preventiveMeasures: [
        'Install continuous real-time H2S monitoring with automated alarms',
        'Mandate SCBA for all personnel in Zone 1+ H2S areas',
        'Conduct monthly H2S emergency drills with realistic scenarios',
        'Implement buddy system with SCBA for all well test operations',
        'Monthly calibration verification of all H2S detectors',
      ],
      regulationsViolated: [
        { framework: 'ADNOC', standardCode: 'HSE Standard 202', title: 'Hydrogen Sulfide Management', sections: ['Section 4.2', 'Section 5.3', 'Section 6.1'] },
        { framework: 'API', standardCode: 'API RP 55', title: 'Recommended Practices for H2S Operations', sections: ['Section 6', 'Section 7'] },
        { framework: 'OPITO', standardCode: 'OPITO Standards', title: 'H2S Training Standards', sections: ['Basic H2S', 'Advanced H2S'] },
      ],
      outcome: '1 fatality, 2 injuries. Platform shut down for 14 days. $12M in penalties and lost production.',
      date: '2023-03-15',
      location: 'ADNOC Offshore Platform, Zakum Field',
      severity: 'fatality',
      frameworks: ['ADNOC', 'ADOSH', 'API', 'OPITO'],
      tags: ['h2s', 'offshore', 'well-testing', 'rescue', 'gas-detection'],
    },
    {
      id: 'hot-work-fire-platform',
      title: 'Hot Work Fire on Offshore Platform',
      description: 'During a hot work permit operation on an ADNOC artificial island, welding slag ignited insulation on a nearby pipe. Fire watch attempted to extinguish but fire spread to cable tray. Emergency shutdown initiated.',
      industry: 'Oil & Gas - Offshore',
      scenario: 'During a hot work permit operation on an ADNOC artificial island, welding slag ignited insulation on a nearby pipe. Fire watch attempted to extinguish but fire spread to cable tray. Emergency shutdown initiated.',
      rootCauses: [
        'Fire watch was not dedicated (multi-tasking)',
        'Combustibles not removed/protected within 11m radius',
        'Gas testing not continuous during hot work',
        'Isolation of fuel sources not verified',
      ],
      lessonsLearned: [
        'Fire watch must be dedicated, trained, and equipped',
        'All combustibles within 11m must be removed or protected',
        'Continuous gas monitoring required during hot work',
        'Fuel source isolation must be verified before hot work',
        'Fire watch must have authority to stop work',
      ],
      preventiveMeasures: [
        'Mandate dedicated fire watch with no other duties',
        'Implement 11m combustible clearance verification checklist',
        'Require continuous gas monitoring for all hot work',
        'Verify positive isolation of all fuel sources before permit issuance',
        'Monthly hot work safety audits',
      ],
      regulationsViolated: [
        { framework: 'ADNOC', standardCode: 'HSE Standard 201', title: 'Permit to Work System', sections: ['Section 4.3', 'Section 5.2'] },
        { framework: 'NFPA', standardCode: 'NFPA 51B', title: 'Fire Prevention During Hot Work', sections: ['Section 4', 'Section 5'] },
        { framework: 'ADNOC', standardCode: 'Golden Rule #1', title: 'Work with Valid Permit', sections: [] },
        { framework: 'ADNOC', standardCode: 'Golden Rule #7', title: 'Wear Required PPE', sections: [] },
      ],
      outcome: 'Cable tray fire contained after 45 minutes. No injuries. Platform partial shutdown for 36 hours. $2.3M in damages.',
      date: '2023-07-22',
      location: 'ADNOC Artificial Island, Das Island',
      severity: 'major-injury',
      frameworks: ['ADNOC', 'ADOSH', 'NFPA', 'API'],
      tags: ['hot-work', 'offshore', 'fire-watch', 'permit', 'simoos'],
    },
    {
      id: 'contractor-fatality-lifting',
      title: 'Contractor Fatality During Tandem Lift',
      description: 'A contractor rigger was fatally injured when a load shifted during a tandem lift on an ADNOC onshore facility. Investigation reveals: no lift plan, uncertified riggers, no tag lines, load weight unknown, SIMOPS not coordinated.',
      industry: 'Oil & Gas - Onshore',
      scenario: 'A contractor rigger is fatally injured when a load shifts during a tandem lift on an ADNOC onshore facility. Investigation reveals: no lift plan, uncertified riggers, no tag lines, load weight unknown, SIMOPS not coordinated.',
      rootCauses: [
        'No lift plan developed (mandatory for tandem lifts)',
        'Riggers not certified per ADNOC/OPITO standards',
        'No tag lines used to control load',
        'Load weight not verified before lift',
        'No SIMOPS coordination with adjacent operations',
        'No competent person (Appointed Person) assigned',
      ],
      lessonsLearned: [
        'All lifts >5t or complex lifts require detailed lift plan',
        'Only ADNOC/OPITO certified riggers permitted',
        'Tag lines mandatory for all lifts',
        'Load weight must be verified and documented',
        'SIMOPS requires bridge document and joint risk assessment',
        'Appointed Person required for all complex lifts',
      ],
      preventiveMeasures: [
        'Mandatory ADNOC lifting supervisor for all contractor lifts',
        'ADNOC lifting equipment register with certification tracking',
        'ADNOC rigging certification program mandatory for all riggers',
        'Lift plan template mandatory for all lifts >5t',
        'ADNOC lifting audit program for all contractor lifting operations',
        'Contractor KPI includes lifting safety metrics',
      ],
      regulationsViolated: [
        { framework: 'ADNOC', standardCode: 'HSE Standard 105', title: 'Contractor HSE Management', sections: ['Section 4.2', 'Section 5.1'] },
        { framework: 'ADNOC', standardCode: 'HSE Standard 201', title: 'Permit to Work', sections: ['Section 4.3', 'Section 5.4'] },
        { framework: 'ADNOC', standardCode: 'Lifting Standards', title: 'Lifting Operations', sections: ['Section 4', 'Section 5'] },
        { framework: 'ADNOC', standardCode: 'Golden Rule #1', title: 'Work with Valid Permit', sections: [] },
        { framework: 'ADNOC', standardCode: 'Golden Rule #10', title: 'Stop Unsafe Work', sections: [] },
      ],
      outcome: '1 fatality. Contractor suspended pending investigation. ADNOC lifting audit program initiated.',
      date: '2023-11-08',
      location: 'ADNOC Onshore Facility, Bu Hasa Field',
      severity: 'fatality',
      frameworks: ['ADNOC', 'ADOSH', 'API', 'IOGP'],
      tags: ['lifting', 'tandem-lift', 'contractor', 'rigging', 'simoos'],
    },
    {
      id: 'confined-space-fatality',
      title: 'Confined Space Fatality - Sewer Maintenance',
      description: 'Two workers died during sewer maintenance when they entered a manhole without atmospheric testing. First worker collapsed, second attempted rescue without SCBA and also succumbed.',
      industry: 'Utilities - Municipal',
      scenario: 'Two workers died during sewer maintenance when they entered a manhole without atmospheric testing. First worker collapsed, second attempted rescue without SCBA and also succumbed.',
      rootCauses: [
        'No confined space permit obtained',
        'No atmospheric testing conducted before entry',
        'No attendant stationed outside',
        'Rescuers entered without SCBA',
        'No confined space rescue plan',
      ],
      lessonsLearned: [
        'Confined space permit mandatory for all entries',
        'Atmospheric testing mandatory before every entry',
        'Trained attendant required outside confined space',
        'Rescue team with SCBA must be on standby',
        'Confined space rescue plan must be practiced',
      ],
      preventiveMeasures: [
        'Implement confined space inventory and labeling',
        'Mandatory confined space entry training for all workers',
        'Confined space entry permit system with dual authorization',
        'Confined space rescue team with SCBA on standby',
        'Monthly confined space entry drills',
      ],
      regulationsViolated: [
        { framework: 'OSHA', standardCode: '29 CFR 1910.146', title: 'Permit-Required Confined Spaces', sections: ['(c)', '(d)', '(e)', '(f)', '(g)', '(h)', '(i)', '(j)', '(k)'] },
        { framework: 'ADNOC', standardCode: 'HSE Standard 201', title: 'Permit to Work', sections: ['Section 4.3', 'Section 5.3'] },
        { framework: 'ADOSH', standardCode: 'ADOSH-CoP Confined Space', title: 'Confined Space Code of Practice', sections: ['All Sections'] },
        { framework: 'ANSI', standardCode: 'ANSI/ASSE Z117.1', title: 'Safety Requirements for Confined Spaces', sections: ['All Sections'] },
      ],
      outcome: '2 fatalities. Company fined $500,000. Criminal charges filed against supervisor.',
      date: '2023-05-12',
      location: 'Municipal Sewer System, Abu Dhabi',
      severity: 'fatality',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI'],
      tags: ['confined-space', 'sewer', 'rescue', 'atmospheric-testing', 'permit'],
    },
    {
      id: 'process-safety-explosion',
      title: 'Reactor Vessel Explosion - Petrochemical Plant',
      description: 'A runaway reaction in a batch reactor caused overpressure and vessel rupture. Inadequate cooling, failed temperature control, and bypassed safety interlocks.',
      industry: 'Petrochemical',
      scenario: 'A runaway reaction in a batch reactor caused overpressure and vessel rupture. Inadequate cooling, failed temperature control, and bypassed safety interlocks.',
      rootCauses: [
        'Cooling water supply valve inadvertently closed',
        'Temperature controller failed high',
        'High temperature trip bypassed for "troubleshooting"',
        'No independent high-temperature trip',
        'Emergency quench system not tested in 18 months',
      ],
      lessonsLearned: [
        'Critical safety systems must never be bypassed',
        'Independent protection layers required for high-hazard processes',
        'Regular testing of safety instrumented systems (SIS) mandatory',
        'Management of Change (MOC) required for all interlock changes',
        'Process Hazard Analysis (PHA) must address loss of cooling scenarios',
      ],
      preventiveMeasures: [
        'Install independent high-temperature trip (SIL 2)',
        'Implement MOC for all interlock changes with PSSR',
        'Quarterly SIS proof testing per IEC 61511',
        'PHA revalidation every 5 years',
        'Operator training on runaway reaction scenarios',
      ],
      regulationsViolated: [
        { framework: 'OSHA', standardCode: '29 CFR 1910.119', title: 'Process Safety Management', sections: ['(d)', '(e)', '(f)', '(g)', '(h)', '(i)', '(j)', '(k)', '(l)', '(m)', '(n)', '(o)'] },
        { framework: 'EPA', standardCode: '40 CFR 68', title: 'Risk Management Program', sections: ['All Sections'] },
        { framework: 'API', standardCode: 'API RP 750', title: 'Management of Process Hazards', sections: ['All Sections'] },
        { framework: 'CCPS', standardCode: 'CCPS RBPS', title: 'Risk Based Process Safety', sections: ['Elements 4, 6, 7, 9, 10'] },
        { framework: 'IEC', standardCode: 'IEC 61511', title: 'Functional Safety - SIS', sections: ['All Parts'] },
      ],
      outcome: '2 fatalities, 5 injuries. $45M property damage. EPA enforcement action. Plant shut down 8 months.',
      date: '2022-11-03',
      location: 'Petrochemical Plant, Gulf Coast',
      severity: 'fatality',
      frameworks: ['OSHA', 'EPA', 'API', 'CCPS', 'IEC'],
      tags: ['process-safety', 'reactor', 'runaway-reaction', 'sis', 'moc'],
    },
    {
      id: 'excavation-collapse',
      title: 'Trench Collapse - Utility Installation',
      description: 'Worker buried in 3m deep trench collapse. No shoring, no competent person inspection, spoil pile too close to edge.',
      industry: 'Construction - Utilities',
      scenario: 'Worker buried in 3m deep trench collapse. No shoring, no competent person inspection, spoil pile too close to edge.',
      rootCauses: [
        'No protective system (shoring/shielding/sloping) installed',
        'No competent person daily inspection',
        'Spoil pile placed <0.6m from trench edge',
        'No means of egress within 7.5m',
        'No competent person designated',
      ],
      lessonsLearned: [
        'Protective system mandatory for trenches >1.5m',
        'Competent person must inspect daily and after rain',
        'Spoil pile minimum 0.6m from edge',
        'Means of egress every 7.5m',
        'Competent person must be designated and trained',
      ],
      preventiveMeasures: [
        'Excavation permit system with competent person sign-off',
        'Daily trench inspection checklist',
        'Shoring/shielding equipment readily available',
        'Competent person training program',
        'Emergency rescue plan for trench collapse',
      ],
      regulationsViolated: [
        { framework: 'OSHA', standardCode: '29 CFR 1926 Subpart P', title: 'Excavations', sections: ['1926.651', '1926.652'] },
        { framework: 'ADNOC', standardCode: 'HSE Standard 201', title: 'Permit to Work', sections: ['Section 4.3', 'Section 5.5'] },
        { framework: 'ADOSH', standardCode: 'ADOSH-CoP Excavation', title: 'Excavation Code of Practice', sections: ['All Sections'] },
        { framework: 'ANSI', standardCode: 'ANSI/ASSP A10.12', title: 'Safety Requirements for Excavation', sections: ['All Sections'] },
      ],
      outcome: '1 fatality. Contractor fined $250,000. OSHA citation.',
      date: '2023-08-14',
      location: 'Utility Installation, Abu Dhabi',
      severity: 'fatality',
      frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI'],
      tags: ['excavation', 'trench', 'collapse', 'shoring', 'competent-person'],
    },
    {
      id: 'chemical-spill-environmental',
      title: 'Major Chemical Spill - River Contamination',
      description: 'Tank overfill released 50,000L of solvent into river. No secondary containment, overfill alarm failed, delayed notification.',
      industry: 'Chemical Manufacturing',
      scenario: 'Tank overfill released 50,000L of solvent into river. No secondary containment, overfill alarm failed, delayed notification.',
      rootCauses: [
        'No secondary containment for bulk storage tank',
        'High-level alarm failed (not tested in 2 years)',
        'No automatic shutoff on high level',
        'Delayed notification to authorities (4 hours)',
        'No spill response plan for river contamination',
      ],
      lessonsLearned: [
        'Secondary containment mandatory for all bulk storage',
        'Regular testing of level alarms and automatic shutoffs',
        'Immediate notification protocol for environmental releases',
        'Spill response plan must address waterway contamination',
        'Regular spill drills with environmental agencies',
      ],
      preventiveMeasures: [
        'Install secondary containment for all bulk tanks',
        'Quarterly testing of level alarms and auto-shutoff',
        'Immediate notification protocol (<15 min)',
        'River spill response equipment staged nearby',
        'Annual joint drill with environmental agency',
      ],
      regulationsViolated: [
        { framework: 'EPA', standardCode: '40 CFR 112', title: 'SPCC Rule', sections: ['112.7', '112.8', '112.20'] },
        { framework: 'ADNOC', standardCode: 'HSE Standard 209', title: 'Waste Management', sections: ['Section 4', 'Section 5'] },
        { framework: 'EPA', standardCode: 'CERCLA', title: 'Superfund', sections: ['Section 103'] },
        { framework: 'EPA', standardCode: 'EPCRA', title: 'Emergency Planning', sections: ['Section 304'] },
        { framework: 'ADNOC', standardCode: 'HSE Standard 208', title: 'Water & Wastewater Management', sections: ['Section 4'] },
      ],
      outcome: 'River contaminated 15km downstream. $2.5M cleanup. $500K fines. 6-month remediation.',
      date: '2023-09-28',
      location: 'Chemical Plant, Industrial Zone',
      severity: 'environmental',
      frameworks: ['EPA', 'ADNOC', 'ADOSH', 'IPIECA'],
      tags: ['chemical-spill', 'environmental', 'river', 'spcc', 'notification'],
    },
  ];
  return caseStudies;
}, []);

  const categories = useMemo(() => {
    const cats = [...new Set(allCaseStudies.map(c => c.industry))];
    return ['all', ...cats.sort()];
  }, [allCaseStudies]);

  const severities = useMemo(() => {
    const sevs = [...new Set(allCaseStudies.map(c => c.severity))];
    return ['all', ...sevs.sort()];
  }, [allCaseStudies]);

  const filteredCaseStudies = useMemo(() => {
    let result = allCaseStudies;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.scenario.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.industry === selectedCategory);
    }

    if (selectedSeverity !== 'all') {
      result = result.filter(c => c.severity === selectedSeverity);
    }

    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [allCaseStudies, searchQuery, selectedCategory, selectedSeverity]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedSeverity !== 'all' || searchQuery.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Case Studies</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-world incident analyses and lessons learned from ADNOC, ARAMCO, OSHA, and global incidents
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
            {((selectedCategory !== 'all' ? 1 : 0) + (selectedSeverity !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)) > 0 && (
              <span className="badge bg-white/20 text-white text-xs">
                {(selectedCategory !== 'all' ? 1 : 0) + (selectedSeverity !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search case studies..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search case studies"
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
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by industry"
          >
            <option value="all">All Industries</option>
            {getCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by severity"
          >
            <option value="all">All Severities</option>
            <option value="fatality">Fatality</option>
            <option value="major-injury">Major Injury</option>
            <option value="minor-injury">Minor Injury</option>
            <option value="environmental">Environmental</option>
            <option value="near-miss">Near Miss</option>
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
                onClick={() => { setSelectedCategory('all'); setSelectedSeverity('all'); }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Category Filter */}
              <FilterSection
                title="Industry"
                options={getCategories().map(c => ({ value: c, label: c }))}
                selected={selectedCategory === 'all' ? [] : [selectedCategory]}
                onChange={values => setSelectedCategory(values.length ? values[0] : 'all')}
                multiple={false}
              />

              {/* Severity Filter */}
              <FilterSection
                title="Severity"
                options={[
                  { value: 'fatality', label: 'Fatality' },
                  { value: 'major-injury', label: 'Major Injury' },
                  { value: 'minor-injury', label: 'Minor Injury' },
                  { value: 'environmental', label: 'Environmental' },
                  { value: 'near-miss', label: 'Near Miss' },
                ]}
                selected={selectedSeverity === 'all' ? [] : [selectedSeverity]}
                onChange={values => setSelectedSeverity(values.length ? values[0] : 'all')}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredCaseStudies.length} of {allCaseStudies.length} case studies
        </p>
      </div>

      <div className="space-y-6">
        {filteredCaseStudies.map(caseStudy => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No case studies found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSeverity('all'); }}
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
function CaseStudyCard({ caseStudy }: { caseStudy: any }) {
  const severityColors: Record<string, string> = {
    fatality: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-l-red-500',
    'major-injury': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-l-orange-500',
    'minor-injury': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-l-yellow-500',
    environmental: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-l-green-500',
    'near-miss': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-l-blue-500',
  };

  const severityLabels: Record<string, string> = {
    fatality: 'Fatality',
    'major-injury': 'Major Injury',
    'minor-injury': 'Minor Injury',
    environmental: 'Environmental',
    'near-miss': 'Near Miss',
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn('card overflow-hidden', severityColors[caseStudy.severity] || 'border-l-gray-300')}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">{caseStudy.industry}</span>
              <span className={cn('badge text-xs', getSeverityColor(caseStudy.severity))}>
                {severityLabels[caseStudy.severity] || caseStudy.severity}
              </span>
              <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">
                {caseStudy.date}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{caseStudy.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{caseStudy.scenario?.substring(0, 200)}...</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {caseStudy.tags?.slice(0, 4).map((tag: string) => (
                <span key={tag} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">{tag}</span>
              ))}
              {caseStudy.tags?.length > 4 && (
                <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500 text-xs">
                  +{caseStudy.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className={cn('badge text-sm', getSeverityColor(caseStudy.severity))}>
              {severityLabels[caseStudy.severity] || caseStudy.severity}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{caseStudy.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{caseStudy.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frameworks</p>
              <p className="font-medium text-gray-900 dark:text-white text-sm">{caseStudy.frameworks.length} frameworks</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            {expanded ? (
              <>
                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                Read Full Analysis
              </>
            )}
          </button>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-slide-down space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Root Causes</h4>
              <ul className="space-y-2">
                {caseStudy.rootCauses?.map((cause: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-medium">{i + 1}</span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lessons Learned</h4>
              <ul className="space-y-2">
                {caseStudy.lessonsLearned?.map((lesson: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-medium">{i + 1}</span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Preventive Measures</h4>
              <ul className="space-y-2">
                {caseStudy.preventiveMeasures?.map((measure: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-medium">{i + 1}</span>
                    {measure}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Regulations Violated</h4>
              <div className="space-y-2">
                {caseStudy.regulationsViolated?.map((reg: any, i: number) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{reg.framework}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{reg.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sections: {reg.sections.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Outcome</h4>
              <p className="text-gray-700 dark:text-gray-300">{caseStudy.outcome}</p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link to={`/case-studies/${caseStudy.id}`} className="btn-primary">
                View Full Report <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button className="btn-secondary flex-1">
                <DownloadIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Download PDF
              </button>
              <button className="btn-ghost">
                <ShareIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Share
              </button>
            </div>
          </div>
        )}
      </div>
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

function getCategories(): string[] {
  return [...new Set(allCaseStudies.map(c => c.industry))].sort();
}

function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    fatality: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'major-injury': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'minor-injury': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    environmental: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'near-miss': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return colors[severity] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

const severityLabels: Record<string, string> = {
  fatality: 'Fatality',
  'major-injury': 'Major Injury',
  'minor-injury': 'Minor Injury',
  environmental: 'Environmental',
  'near-miss': 'Near Miss',
};

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'Oil & Gas - Offshore': '🏗️',
    'Oil & Gas - Onshore': '🛢️',
    'Petrochemical': '🏭',
    'Construction - Utilities': '🏗️',
    'Chemical Manufacturing': '🏭',
    'Utilities - Municipal': '🏙️',
  };
  return emojis[category] || '🏭';
}