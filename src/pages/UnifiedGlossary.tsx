/**
 * Unified HSE Glossary
 * Comprehensive dictionary of HSE terminology across all frameworks
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UNIFIED_TOPICS, STANDARD_FRAMEWORKS, UNIFIED_LEARNING_PATHS } from '../data/unified-standards';
import { cn } from '../utils/cn';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  TagIcon,
  FunnelIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

// Build comprehensive glossary from all sources
function buildGlossary() {
  const terms: any[] = [];

  // Add framework-specific terms
  STANDARD_FRAMEWORKS.forEach(fw => {
    fw.keyDocuments.forEach(doc => {
      terms.push({
        term: doc.code,
        definition: doc.title,
        category: 'Framework',
        frameworks: [fw.id],
        synonyms: [],
        relatedTerms: fw.keyDocuments.filter(d => d.code !== doc.code).map(d => d.code),
      });
    });

    // Add framework acronyms
    terms.push({
      term: fw.id,
      definition: fw.fullName,
      category: 'Framework',
      frameworks: [fw.id],
      synonyms: [fw.name],
      relatedTerms: fw.keyDocuments.map(d => d.code),
    });
  });

  // Add topic-based terms
  UNIFIED_TOPICS.forEach(topic => {
    terms.push({
      term: topic.topicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      definition: topic.description,
      category: topic.category,
      frameworks: Object.keys(topic.frameworks),
      synonyms: topic.keyRegulations || [],
      relatedTerms: topic.prerequisites,
    });

    // Add key regulations as terms
    topic.keyRegulations?.forEach(reg => {
      terms.push({
        term: reg,
        definition: `Regulatory requirement related to ${topic.topicId}`,
        category: topic.category,
        frameworks: Object.keys(topic.frameworks),
        synonyms: [],
        relatedTerms: [topic.topicId],
      });
    });
  });

  // Add learning path terms
  UNIFIED_LEARNING_PATHS.forEach(path => {
    terms.push({
      term: path.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      definition: path.description,
      category: 'Learning Path',
      frameworks: [],
      synonyms: path.certifications || [],
      relatedTerms: path.modules.map(m => m.topicId),
    });
  });

  // Add common HSE acronyms
  const commonAcronyms = [
    { term: 'HSE', definition: 'Health, Safety, and Environment', category: 'General', frameworks: ['All'], synonyms: ['EHS', 'SHE'], relatedTerms: [] },
    { term: 'EHS', definition: 'Environment, Health, and Safety', category: 'General', frameworks: ['All'], synonyms: ['HSE', 'SHE'], relatedTerms: [] },
    { term: 'SHE', definition: 'Safety, Health, and Environment', category: 'General', frameworks: ['All'], synonyms: ['HSE', 'EHS'], relatedTerms: [] },
    { term: 'OHS', definition: 'Occupational Health and Safety', category: 'General', frameworks: ['All'], synonyms: ['OH&S'], relatedTerms: [] },
    { term: 'OH&S', definition: 'Occupational Health and Safety', category: 'General', frameworks: ['All'], synonyms: ['OHS'], relatedTerms: [] },
    { term: 'PSM', definition: 'Process Safety Management', category: 'Process Safety', frameworks: ['OSHA', 'ADNOC', 'API', 'CCPS'], synonyms: [], relatedTerms: ['PSM Elements', 'PHA', 'LOPA'] },
    { term: 'PHA', definition: 'Process Hazard Analysis', category: 'Process Safety', frameworks: ['OSHA', 'API', 'CCPS'], synonyms: ['HAZOP', 'What-If', 'FMEA'], relatedTerms: ['LOPA', 'PSM'] },
    { term: 'HAZOP', definition: 'Hazard and Operability Study', category: 'Process Safety', frameworks: ['OSHA', 'API', 'CCPS'], synonyms: [], relatedTerms: ['PHA', 'LOPA', 'Risk Assessment'] },
    { term: 'LOPA', definition: 'Layer of Protection Analysis', category: 'Process Safety', frameworks: ['API', 'CCPS', 'IEC'], synonyms: [], relatedTerms: ['PHA', 'SIL', 'IPL'] },
    { term: 'SIL', definition: 'Safety Integrity Level', category: 'Process Safety', frameworks: ['IEC', 'API', 'CCPS'], synonyms: [], relatedTerms: ['LOPA', 'SIS', 'IEC 61511'] },
    { term: 'SIS', definition: 'Safety Instrumented System', category: 'Process Safety', frameworks: ['IEC', 'API', 'CCPS'], synonyms: [], relatedTerms: ['SIL', 'IEC 61511', 'BPCS'] },
    { term: 'PTW', definition: 'Permit to Work', category: 'Operational Control', frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO'], synonyms: ['Work Permit'], relatedTerms: ['LOTO', 'Gas Testing', 'Fire Watch'] },
    { term: 'LOTO', definition: 'Lockout/Tagout', category: 'Operational Control', frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI'], synonyms: ['Lockout Tagout'], relatedTerms: ['Energy Isolation', 'PTW'] },
    { term: 'JSA', definition: 'Job Safety Analysis', category: 'Risk Management', frameworks: ['OSHA', 'ADNOC', 'ADOSH'], synonyms: ['JHA', 'Job Hazard Analysis'], relatedTerms: ['Risk Assessment', 'HIRA'] },
    { term: 'JHA', definition: 'Job Hazard Analysis', category: 'Risk Management', frameworks: ['OSHA', 'ADNOC', 'ADOSH'], synonyms: ['JSA', 'Job Safety Analysis'], relatedTerms: ['Risk Assessment', 'HIRA'] },
    { term: 'HIRA', definition: 'Hazard Identification and Risk Assessment', category: 'Risk Management', frameworks: ['ISO45001', 'ADNOC', 'ADOSH'], synonyms: [], relatedTerms: ['JSA', 'JHA', 'Risk Matrix'] },
    { term: 'ALARP', definition: 'As Low As Reasonably Practicable', category: 'Risk Management', frameworks: ['ISO45001', 'OSHA', 'ADNOC'], synonyms: [], relatedTerms: ['Risk Tolerability', 'Cost-Benefit'] },
    { term: 'SIMOPS', definition: 'Simultaneous Operations', category: 'Operational Control', frameworks: ['ADNOC', 'ADOSH', 'IOGP', 'ARAMCO'], synonyms: ['Simultaneous Operations'], relatedTerms: ['PTW', 'Risk Assessment', 'Bridge Document'] },
    { term: 'ERP', definition: 'Emergency Response Plan', category: 'Emergency Management', frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ISO22301'], synonyms: ['Emergency Response Plan'], relatedTerms: ['ICS', 'Crisis Management', 'BCP'] },
    { term: 'ICS', definition: 'Incident Command System', category: 'Emergency Management', frameworks: ['OSHA', 'NFPA', 'FEMA', 'NCEMA'], synonyms: [], relatedTerms: ['ERP', 'Crisis Management', 'BCP'] },
    { term: 'BCP', definition: 'Business Continuity Plan', category: 'Emergency Management', frameworks: ['ISO22301', 'NFPA1600'], synonyms: [], relatedTerms: ['DRP', 'ERP', 'BCM'] },
    { term: 'BCM', definition: 'Business Continuity Management', category: 'Emergency Management', frameworks: ['ISO22301'], synonyms: [], relatedTerms: ['BCP', 'DRP'] },
    { term: 'SDS', definition: 'Safety Data Sheet', category: 'Chemical Hazards', frameworks: ['OSHA', 'GHS', 'ADNOC', 'ADOSH'], synonyms: ['MSDS'], relatedTerms: ['GHS', 'HazCom', 'Chemical Inventory'] },
    { term: 'GHS', definition: 'Globally Harmonized System', category: 'Chemical Hazards', frameworks: ['OSHA', 'UN', 'ADNOC', 'ADOSH'], synonyms: [], relatedTerms: ['SDS', 'HazCom', 'Pictograms'] },
    { term: 'HazCom', definition: 'Hazard Communication', category: 'Chemical Hazards', frameworks: ['OSHA', 'GHS', 'ADNOC'], synonyms: ['Right-to-Know'], relatedTerms: ['GHS', 'SDS', 'Labels'] },
    { term: 'TLV', definition: 'Threshold Limit Value', category: 'Health Hazards', frameworks: ['ACGIH', 'OSHA', 'NIOSH'], synonyms: ['TLV-TWA', 'TLV-STEL', 'TLV-C'], relatedTerms: ['PEL', 'BEI', 'OEL'] },
    { term: 'PEL', definition: 'Permissible Exposure Limit', category: 'Health Hazards', frameworks: ['OSHA'], synonyms: [], relatedTerms: ['TLV', 'REL', 'OEL'] },
    { term: 'BEI', definition: 'Biological Exposure Index', category: 'Health Hazards', frameworks: ['ACGIH'], synonyms: [], relatedTerms: ['TLV', 'Biological Monitoring'] },
    { term: 'PPE', definition: 'Personal Protective Equipment', category: 'General', frameworks: ['OSHA', 'ADNOC', 'ADOSH', 'ISO45001'], synonyms: [], relatedTerms: ['Hierarchy of Controls', 'Respiratory Protection'] },
    { term: 'SCBA', definition: 'Self-Contained Breathing Apparatus', category: 'Physical Hazards', frameworks: ['OSHA', 'ADNOC', 'NFPA'], synonyms: [], relatedTerms: ['Respiratory Protection', 'APF', 'IDLH'] },
    { term: 'APF', definition: 'Assigned Protection Factor', category: 'Physical Hazards', frameworks: ['OSHA', 'NIOSH'], synonyms: [], relatedTerms: ['Respirator Selection', 'MUC'] },
    { term: 'MUC', definition: 'Maximum Use Concentration', category: 'Physical Hazards', frameworks: ['OSHA', 'NIOSH'], synonyms: [], relatedTerms: ['APF', 'Respirator Selection'] },
    { term: 'IDLH', definition: 'Immediately Dangerous to Life or Health', category: 'Physical Hazards', frameworks: ['OSHA', 'NIOSH'], synonyms: [], relatedTerms: ['SCBA', 'Emergency Escape'] },
    { term: 'WBGT', definition: 'Wet Bulb Globe Temperature', category: 'Health Hazards', frameworks: ['OSHA', 'ACGIH', 'ISO7243'], synonyms: [], relatedTerms: ['Heat Stress', 'Work-Rest Cycles'] },
    { term: 'REBA', definition: 'Rapid Entire Body Assessment', category: 'Health Hazards', frameworks: ['ISO11226', 'ISO11228'], synonyms: [], relatedTerms: ['RULA', 'Ergonomics', 'MSD'] },
    { term: 'RULA', definition: 'Rapid Upper Limb Assessment', category: 'Health Hazards', frameworks: ['ISO11226', 'ISO11228'], synonyms: [], relatedTerms: ['REBA', 'Ergonomics', 'MSD'] },
    { term: 'MSD', definition: 'Musculoskeletal Disorder', category: 'Health Hazards', frameworks: ['OSHA', 'ISO11228', 'ISO11226'], synonyms: ['RSI', 'CTD'], relatedTerms: ['Ergonomics', 'REBA', 'RULA'] },
    { term: 'TRIR', definition: 'Total Recordable Injury Rate', category: 'Management System', frameworks: ['OSHA', 'ADNOC', 'API', 'IOGP'], synonyms: [], relatedTerms: ['LTIF', 'KPI', 'Lagging Indicator'] },
    { term: 'LTIF', definition: 'Lost Time Injury Frequency', category: 'Management System', frameworks: ['OSHA', 'ADNOC', 'API', 'IOGP'], synonyms: [], relatedTerms: ['TRIR', 'KPI', 'Lagging Indicator'] },
    { term: 'KPI', definition: 'Key Performance Indicator', category: 'Management System', frameworks: ['ISO45001', 'ADNOC', 'API', 'IOGP'], synonyms: ['Leading Indicator', 'Lagging Indicator'], relatedTerms: ['TRIR', 'LTIF', 'Leading/Lagging'] },
    { term: 'MOC', definition: 'Management of Change', category: 'Process Safety', frameworks: ['OSHA', 'ADNOC', 'API', 'CCPS'], synonyms: ['Change Management'], relatedTerms: ['PSM', 'PSSR', 'Risk Assessment'] },
    { term: 'PSSR', definition: 'Pre-Startup Safety Review', category: 'Process Safety', frameworks: ['OSHA', 'ADNOC', 'API', 'CCPS'], synonyms: ['Pre-Startup Safety Review'], relatedTerms: ['MOC', 'Commissioning', 'PSM'] },
    { term: 'BOP', definition: 'Blowout Preventer', category: 'Sector Specific', frameworks: ['API', 'IADC', 'BSEE', 'ADNOC'], synonyms: ['Blowout Preventer'], relatedTerms: ['Well Control', 'Well Control Equipment'] },
    { term: 'H2S', definition: 'Hydrogen Sulfide', category: 'Chemical Hazards', frameworks: ['ADNOC', 'ADOSH', 'API', 'OPITO'], synonyms: ['Sour Gas'], relatedTerms: ['H2S Zones', 'SCBA', 'Gas Detection'] },
    { term: 'NORM', definition: 'Naturally Occurring Radioactive Material', category: 'Environmental', frameworks: ['ADNOC', 'ADOSH', 'IAEA', 'EPA'], synonyms: ['TENORM'], relatedTerms: ['Radiation Protection', 'Waste Management'] },
    { term: 'EIA', definition: 'Environmental Impact Assessment', category: 'Environmental', frameworks: ['EPA', 'ADNOC', 'ADOSH', 'UAE Federal Law'], synonyms: ['Environmental Impact Assessment'], relatedTerms: ['EMP', 'Screening', 'Scoping'] },
    { term: 'SPCC', definition: 'Spill Prevention, Control, and Countermeasure', category: 'Environmental', frameworks: ['EPA', 'ADNOC', 'ADOSH'], synonyms: [], relatedTerms: ['Oil Spill', 'FRP', 'Secondary Containment'] },
    { term: 'SWPPP', definition: 'Stormwater Pollution Prevention Plan', category: 'Environmental', frameworks: ['EPA', 'ADNOC', 'ADOSH'], synonyms: [], relatedTerms: ['NPDES', 'BMP', 'Erosion Control'] },
    { term: 'NCEMA', definition: 'National Emergency Crisis Management Authority', category: 'Emergency Management', frameworks: ['UAE Federal Law', 'ADNOC'], synonyms: [], relatedTerms: ['ERP', 'Crisis Management', 'ICS'] },
    { term: 'EAD', definition: 'Environment Agency Abu Dhabi', category: 'Environmental', frameworks: ['UAE Federal Law', 'ADNOC', 'ADOSH'], synonyms: [], relatedTerms: ['Environmental Permit', 'Compliance'] },
    { term: 'FMCSA', definition: 'Federal Motor Carrier Safety Administration', category: 'Transportation', frameworks: ['DOT', 'OSHA'], synonyms: [], relatedTerms: ['HOS', 'ELD', 'Driver Qualification'] },
    { term: 'HOS', definition: 'Hours of Service', category: 'Transportation', frameworks: ['DOT', 'FMCSA'], synonyms: [], relatedTerms: ['ELD', 'Driver Fatigue', 'Logbook'] },
    { term: 'ELD', definition: 'Electronic Logging Device', category: 'Transportation', frameworks: ['DOT', 'FMCSA'], synonyms: [], relatedTerms: ['HOS', 'Driver Fatigue', 'Logbook'] },
    { term: 'MVR', definition: 'Motor Vehicle Record', category: 'Transportation', frameworks: ['DOT', 'FMCSA'], synonyms: [], relatedTerms: ['Driver Qualification', 'Background Check'] },
    { term: 'CSP', definition: 'Certified Safety Professional', category: 'Certification', frameworks: ['BCSP', 'OSHA', 'ADNOC'], synonyms: [], relatedTerms: ['ASP', 'OHST', 'CHST'] },
    { term: 'ASP', definition: 'Associate Safety Professional', category: 'Certification', frameworks: ['BCSP'], synonyms: [], relatedTerms: ['CSP', 'OHST'] },
    { term: 'OHST', definition: 'Occupational Health and Safety Technologist', category: 'Certification', frameworks: ['BCSP'], synonyms: [], relatedTerms: ['CSP', 'ASP', 'CHST'] },
    { term: 'CHST', definition: 'Construction Health and Safety Technician', category: 'Certification', frameworks: ['BCSP'], synonyms: [], relatedTerms: ['CSP', 'OHST', 'STSC'] },
    { term: 'STSC', definition: 'Safety Trained Supervisor Construction', category: 'Certification', frameworks: ['BCSP'], synonyms: [], relatedTerms: ['CHST', 'STS'] },
    { term: 'CIH', definition: 'Certified Industrial Hygienist', category: 'Certification', frameworks: ['ABIH', 'ACGIH'], synonyms: [], relatedTerms: ['CIH', 'Industrial Hygiene'] },
    { term: 'CMIOSH', definition: 'Chartered Member of IOSH', category: 'Certification', frameworks: ['IOSH'], synonyms: ['Chartered Member'], relatedTerms: ['GradIOSH', 'TechIOSH'] },
    { term: 'GradIOSH', definition: 'Graduate Member of IOSH', category: 'Certification', frameworks: ['IOSH'], synonyms: ['Graduate Member'], relatedTerms: ['CMIOSH', 'TechIOSH'] },
  ];

  commonAcronyms.forEach(acronym => {
    terms.push({
      term: acronym.term,
      definition: acronym.definition,
      category: acronym.category,
      frameworks: acronym.frameworks,
      synonyms: acronym.synonyms,
      relatedTerms: acronym.relatedTerms,
    });
  });

  // Deduplicate by term
  const unique = new Map();
  terms.forEach(t => {
    if (!unique.has(t.term.toLowerCase())) {
      unique.set(t.term.toLowerCase(), t);
    }
  });

  return Array.from(unique.values()).sort((a, b) => a.term.localeCompare(b.term));
}

export function UnifiedGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'term' | 'category'>('term');
  const [expandedTerms, setExpandedTerms] = useState<string[]>([]);

  // Build comprehensive glossary from all sources
  const glossary = useMemo(() => buildGlossary(), []);

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
        t.synonyms.some(s => s.toLowerCase().includes(query)) ||
        t.frameworks.some(f => f.toLowerCase().includes(query))
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
            Unified HSE Glossary
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive dictionary of HSE terminology across {Object.keys(STANDARD_FRAMEWORKS).length} frameworks
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
              placeholder="Search terms, definitions, acronyms, frameworks..."
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
              {['Framework', 'Risk Management', 'Incident Management', 'Physical Hazards', 'Chemical Hazards', 'Process Safety', 'Operational Control', 'Fire Safety', 'Environmental', 'Health Hazards', 'Emergency Management', 'Sector Specific', 'Supply Chain', 'Transportation', 'Management System', 'Certification', 'Regulatory'].filter(c => glossary.some(t => t.category === c)).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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

      {/* Framework Quick Links */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Framework</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {STANDARD_FRAMEWORKS.map(fw => (
            <FrameworkGlossaryCard key={fw.id} framework={fw} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GlossaryTermCard({ term, isExpanded, onToggle }: { term: any; isExpanded: boolean; onToggle: () => void }) {
  const categoryColors: Record<string, string> = {
    'Framework': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Risk Management': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Incident Management': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Physical Hazards': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Chemical Hazards': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Process Safety': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Operational Control': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Fire Safety': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Environmental': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Health Hazards': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'Emergency Management': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Sector Specific': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    'Supply Chain': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Transportation': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Management System': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Certification': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Regulatory': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
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
            <span className={cn('badge text-xs', categoryColors[term.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400')}>
              {term.category}
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
            {term.frameworks.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <ScaleIcon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.frameworks.map((f, i) => (
                    <span key={i} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{f}</span>
                  ))}
                </div>
              </div>
            )}

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

function FrameworkGlossaryCard({ framework }: { framework: any }) {
  return (
    <Link href={`/glossary?framework=${framework.id}`} className="card group hover:shadow-md transition-shadow p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <BuildingLibraryIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{framework.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{framework.fullName}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{framework.description.substring(0, 100)}...</p>
      <div className="flex flex-wrap gap-1">
        {framework.keyDocuments.slice(0, 3).map(doc => (
          <span key={doc.code} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">{doc.code}</span>
        ))}
        {framework.keyDocuments.length > 3 && (
          <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500 text-xs">
            +{framework.keyDocuments.length - 3} more
          </span>
        )}
      </div>
    </Link>
  );
}