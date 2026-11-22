/**
 * Unified Topic Detail Page
 * Comprehensive view of a topic across all frameworks
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UNIFIED_TOPICS, 
  STANDARD_FRAMEWORKS,
  getTopicById,
  getCrossReference 
} from '../data/unified-standards';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  ExpandIcon,
  CompressIcon,
  DownloadIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export function UnifiedTopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const { progress, getTopicProgress, isTopicCompleted, startTopic, completeTopic } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'frameworks' | 'learning' | 'assessments' | 'resources'>('overview');
  const [expandedFrameworks, setExpandedFrameworks] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const topic = useMemo(() => getTopicById(topicId!), [topicId]);
  const topicProgress = useMemo(() => progress[topicId!], [topicId, progress]);
  const isCompleted = isTopicCompleted(topicId!);
  const isInProgress = topicProgress?.status === 'in-progress';
  const completionPercent = 0; // Would calculate from sub-items

  // Start topic if not started
  React.useEffect(() => {
    if (topic && !topicProgress) {
      startTopic(topic.topicId);
    }
  }, [topic, topicProgress, startTopic]);

  if (!topic) {
    return <TopicNotFound />;
  }

  return (
    <div className="space-y-6">
      {/* Topic Header */}
      <div className="card overflow-hidden">
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-end p-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-white/20 text-white text-sm">{topic.category}</span>
                    <span className={cn('badge text-sm', getDifficultyColor(topic.difficulty))}>
                      {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                    </span>
                    <span className="badge bg-white/20 text-white text-sm">{Object.keys(topic.frameworks).length} Frameworks</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{topic.topicName}</h1>
                  <p className="text-white/90 mt-1 max-w-2xl">{topic.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      'bg-white/10 text-white/80 hover:bg-white/20'
                    )}
                    aria-label="Bookmark"
                  >
                    <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {isCompleted ? (
                    <span className="btn-success px-4 py-2">
                      <CheckCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Completed
                    </span>
                  ) : isInProgress ? (
                    <button className="btn-primary px-4 py-2">
                      <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startTopic(topic.topicId)}
                      className="btn-primary px-4 py-2"
                    >
                      <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      Start Learning
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex-1 max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${completionPercent}%` }} />
                </div>
                <span className="font-medium">{completionPercent}% complete</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" aria-hidden="true" />
                  ~{topic.estimatedHours}h
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                  {Object.keys(topic.frameworks).length} Frameworks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STANDARD_FRAMEWORKS.map(fw => (
          <FrameworkBadge key={fw.id} framework={fw} />
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto" role="tablist" aria-label="Topic sections">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpenIcon },
              { id: 'frameworks', label: 'Frameworks', icon: ScaleIcon, count: Object.keys(topic.frameworks).length },
              { id: 'learning', label: 'Learning', icon: BookOpenIcon },
              { id: 'assessments', label: 'Assessments', icon: ShieldCheckIcon },
              { id: 'resources', label: 'Resources', icon: BuildingLibraryIcon },
              { id: 'compare', label: 'Compare', icon: ScaleIcon },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <tab.icon className="h-5 w-5" aria-hidden="true" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={cn('px-2 py-0.5 text-xs rounded-full', activeTab === tab.id ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400')}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="card-body">
          {/* Overview Tab */}
          <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab" hidden={activeTab !== 'overview'}>
            <OverviewTab topic={topic} />
          </div>

          {/* Frameworks Tab */}
          <div role="tabpanel" id="frameworks-panel" aria-labelledby="frameworks-tab" hidden={activeTab !== 'frameworks'}>
            <FrameworksTab topic={topic} expandedFrameworks={expandedFrameworks} setExpandedFrameworks={setExpandedFrameworks} />
          </div>

          {/* Learning Tab */}
          <div role="tabpanel" id="learning-panel" aria-labelledby="learning-tab" hidden={activeTab !== 'learning'}>
            <LearningTab topic={topic} />
          </div>

          {/* Assessments Tab */}
          <div role="tabpanel" id="assessments-panel" aria-labelledby="assessments-tab" hidden={activeTab !== 'assessments'}>
            <AssessmentsTab topic={topic} />
          </div>

          {/* Resources Tab */}
          <div role="tabpanel" id="resources-panel" aria-labelledby="resources-tab" hidden={activeTab !== 'resources'}>
            <ResourcesTab topic={topic} />
          </div>

          {/* Compare Tab */}
          <div role="tabpanel" id="compare-panel" aria-labelledby="compare-tab" hidden={activeTab !== 'compare'}>
            <CompareTab topic={topic} />
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <RelatedTopics currentTopic={topic} />
    </div>
  );
}

// ============================================
// TAB COMPONENTS
// ============================================

function OverviewTab({ topic }: { topic: any }) {
  return (
    <div className="space-y-6">
      {/* Learning Objectives */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {topic.prerequisites.length > 0 ? (
            <>
              <li className="text-sm font-medium text-gray-700 dark:text-gray-300">Prerequisites:</li>
              {topic.prerequisites.map((p: string, i: number) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ml-4">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{p}</span>
                </li>
              ))}
            </>
          ) : (
            topic.learningObjectives?.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            )) || (
              <li className="text-gray-500 dark:text-gray-400">Learning objectives will be added soon.</li>
            )
          )}
        </ul>
      </section>

      {/* Key Topics */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Key Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topic.keyRegulations?.map((reg: string, i: number) => (
            <span key={i} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{reg}</span>
          ))}
          {topic.practicalApplications?.map((app: string, i: number) => (
            <span key={i} className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{app}</span>
          ))}
          {topic.keyRegulations?.length === 0 && topic.practicalApplications?.length === 0 && (
            <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">Tags coming soon</span>
          )}
        </div>
      </section>

      {/* Frameworks Overview */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Frameworks Coverage
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This topic is covered by {Object.keys(topic.frameworks).length} major frameworks. 
          Each framework has specific requirements, terminology, and implementation approaches.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(topic.frameworks).map(([fwId, refs]) => {
            const fw = STANDARD_FRAMEWORKS.find(f => f.id === fwId);
            return fw ? (
              <FrameworkSummaryCard key={fwId} framework={fw} refs={refs} />
            ) : null;
          })}
        </div>
      </section>

      {/* Prerequisites */}
      {topic.prerequisites.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.prerequisites.map((prereqId: string) => {
              const prereq = UNIFIED_TOPICS.find(t => t.topicId === prereqId);
              return prereq ? (
                <Link key={prereqId} to={`/topics/${prereqId}`} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400">
                  {prereq.topicName}
                </Link>
              ) : null;
            })}
          </div>
        </section>
      )}

      {/* Interview Questions */}
      {topic.interviewQuestions?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
            Sample Interview Questions
          </h3>
          <ul className="space-y-2">
            {topic.interviewQuestions.map((q: string, i: number) => (
              <li key={i} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-l-amber-500">
                <p className="text-gray-700 dark:text-gray-300">{q}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Topic Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BuildingLibraryIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Topic Information
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Difficulty</dt>
            <dd className="font-medium text-gray-900 dark:text-white capitalize">{topic.difficulty}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Estimated Time</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{topic.estimatedHours} hours</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Category</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{topic.category}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Frameworks</dt>
            <dd className="font-medium text-gray-900 dark:text-white">{Object.keys(topic.frameworks).length}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function FrameworksTab({ topic, expandedFrameworks, setExpandedFrameworks }: { topic: any; expandedFrameworks: string[]; setExpandedFrameworks: React.Dispatch<React.SetStateAction<string[]>> }) {
  const toggleFramework = (fwId: string) => {
    setExpandedFrameworks(prev =>
      prev.includes(fwId)
        ? prev.filter(id => id !== fwId)
        : [...prev, fwId]
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(topic.frameworks).map(([fwId, refs]) => {
        const fw = STANDARD_FRAMEWORKS.find(f => f.id === fwId);
        const isExpanded = expandedFrameworks.includes(fwId);
        return fw ? (
          <FrameworkDetailCard 
            key={fwId} 
            framework={fw} 
            refs={refs} 
            isExpanded={isExpanded}
            onToggle={() => toggleFramework(fwId)}
          />
        ) : null;
      })}
    </div>
  );
}

function FrameworkDetailCard({ framework, refs, isExpanded, onToggle }: { framework: any; refs: any[]; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="card group">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <FrameworkBadge framework={framework} />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{framework.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{refs.length} reference(s)</p>
          </div>
        </div>
        <ChevronRightIcon className={cn('h-5 w-5 text-gray-400 transition-transform', isExpanded && 'rotate-90')} aria-hidden="true" />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-3 pt-3">
            {refs.map((ref, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{ref.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {ref.documentCode} • Section: {ref.section}
                    </p>
                    {ref.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ref.notes}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn('badge text-xs', ref.mandatory ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400')}>
                        {ref.mandatory ? 'Mandatory' : 'Guidance'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LearningTab({ topic }: { topic: any }) {
  return (
    <div className="space-y-6">
      <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Learning Path Integration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This topic is part of several learning pathways. Choose a path to see where it fits.
        </p>
        <div className="space-y-3">
          {/* Would show learning paths that include this topic */}
          <p className="text-gray-500 dark:text-gray-400 text-sm">Learning path integration coming soon.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResourceCard title="Study Guide" description="Comprehensive study guide with key concepts" icon={BookOpenIcon} color="blue" />
          <ResourceCard title="Video Lessons" description="Animated explanations of key concepts" icon={PlayCircleIcon} color="green" />
          <ResourceCard title="Practice Questions" description="Quiz questions with explanations" icon={ClipboardDocumentListIcon} color="purple" />
        </div>
      </div>
    </div>
  );
}

function AssessmentsTab({ topic }: { topic: any }) {
  return (
    <div className="space-y-4">
      <div className="card p-6 border-l-4 border-l-amber-500">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
          Practice Assessment
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Test your knowledge with practice questions based on all frameworks covering this topic.
        </p>
        <button className="btn-primary" disabled>
          <PlayCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          Start Practice Test (Coming Soon)
        </button>
      </div>

      <div className="card p-6 border-l-4 border-l-purple-500">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <ClipboardDocumentListIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Practical Exercises
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Hands-on exercises to apply knowledge: risk assessments, JSAs, inspections, investigations.
        </p>
        <button className="btn-secondary" disabled>
          View Exercises (Coming Soon)
        </button>
      </div>
    </div>
  );
}

function ResourcesTab({ topic }: { topic: any }) {
  const frameworks = Object.keys(topic.frameworks);
  return (
    <div className="space-y-4">
      {STANDARD_FRAMEWORKS.filter(f => frameworks.includes(f.id)).map(fw => (
        <FrameworkResourcesCard key={fw.id} framework={fw} />
      ))}
    </div>
  );
}

function FrameworkResourcesCard({ framework }: { framework: any }) {
  const keyDocs = framework.keyDocuments.slice(0, 3);
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FrameworkBadge framework={framework} />
          <h3 className="font-semibold text-gray-900 dark:text-white">{framework.name} Resources</h3>
        </div>
      </div>
      <div className="card-body">
        <div className="space-y-2">
          {keyDocs.map(doc => (
            <ResourceItem key={doc.code} doc={doc} framework={framework} />
          ))}
          <Link href={framework.website} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm w-full">
            <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" aria-hidden="true" />
            View All {framework.name} Resources
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourceItem({ doc, framework }: { doc: any; framework: any }) {
  return (
    <Link href={`${framework.website}/standards/${doc.code.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{doc.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{doc.code} • {doc.category}</p>
      </div>
      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </Link>
  );
}

function CompareTab({ topic }: { topic: any }) {
  const frameworks = Object.keys(topic.frameworks);
  const fwDetails = STANDARD_FRAMEWORKS.filter(f => frameworks.includes(f.id));

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-500">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
          Framework Comparison
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Compare how {fwDetails.length} frameworks address this topic side-by-side.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-2 font-medium w-48">Aspect</th>
              {fwDetails.map(fw => (
                <th key={fw.id} className="pb-2 font-medium text-center px-4">
                  <FrameworkBadge framework={fw} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <ComparisonRow label="Mandatory?" values={fwDetails.map(fw => topic.frameworks[fw.id]?.[0]?.mandatory ? 'Yes' : 'Guidance')} />
            <ComparisonRow label="Key Document" values={fwDetails.map(fw => topic.frameworks[fw.id]?.[0]?.documentCode || 'N/A')} />
            <ComparisonRow label="Section/Clause" values={fwDetails.map(fw => topic.frameworks[fw.id]?.[0]?.section || 'N/A')} />
            <ComparisonRow label="Certification" values={fwDetails.map(fw => {
              const fwDetail = STANDARD_FRAMEWORKS.find(f => f.id === fw.id);
              return fwDetail?.certification ? 'Yes' : 'No';
            })} />
            <ComparisonRow label="Region" values={fwDetails.map(fw => {
              const fwDetail = STANDARD_FRAMEWORKS.find(f => f.id === fw.id);
              return fwDetail?.region || 'Global';
            })} />
            <ComparisonRow label="Industry" values={fwDetails.map(fw => {
              const fwDetail = STANDARD_FRAMEWORKS.find(f => f.id === fw.id);
              return fwDetail?.industry?.join(', ') || 'All';
            })} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="p-3 font-medium text-gray-900 dark:text-white">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-3 text-center px-4 text-gray-700 dark:text-gray-300">{v}</td>
      ))}
    </tr>
  );
}

function RelatedTopics({ currentTopic }: { currentTopic: any }) {
  // Find related topics by shared frameworks or categories
  const related = UNIFIED_TOPICS
    .filter(t => t.topicId !== currentTopic.topicId &&
      (t.category === currentTopic.category ||
        Object.keys(t.frameworks).some(fw => currentTopic.frameworks[fw])))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <BuildingLibraryIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
        Related Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map(topic => (
          <Link key={topic.topicId} to={`/topics/${topic.topicId}`} className="card group hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-3xl">{getCategoryEmoji(topic.category)}</span>
            </div>
            <div className="card-body">
              <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs mb-2">{topic.category}</span>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{topic.topicName}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {topic.estimatedHours}h
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FrameworkSummaryCard({ framework, refs }: { framework: any; refs: any[] }) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <FrameworkBadge framework={framework} />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{framework.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{refs.length} reference(s)</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{framework.description.substring(0, 120)}...</p>
      <div className="flex flex-wrap gap-2">
        {refs.slice(0, 3).map((ref, i) => (
          <span key={i} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">
            {ref.documentCode}
          </span>
        ))}
        {refs.length > 3 && (
          <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500 text-xs">
            +{refs.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}

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

function FrameworkBadgeText({ framework }: { framework: any }) {
  return FrameworkBadge({ framework });
}

function TopicNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Topic Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The topic you're looking for doesn't exist.
        </p>
        <Link to="/topics" className="btn-primary">
          Browse All Topics
        </Link>
      </div>
    </div>
  );
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