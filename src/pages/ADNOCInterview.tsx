/**
 * ADNOC Interview Preparation Pages
 * Technical questions, behavioral questions, case studies, and practical assessments
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ADNOC_INTERVIEW_QUESTIONS, getADNOCCareerInfo, ADNOC_CAREER_INFO } from '../data/adnoc-content';
import { cn } from '../utils/cn';
import {
  ClipboardDocumentListIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export function ADNOCInterviewTechnical() {
  const [searchParams] = useSearchParams();
  const moduleFilter = searchParams.get('module');
  const { progress } = useApp();

  const questions = useMemo(() => {
    let qs = ADNOC_INTERVIEW_QUESTIONS.technical;
    if (moduleFilter) {
      // Filter by module relevance (would need module mapping)
      qs = qs.filter(q => q.category.toLowerCase().includes(moduleFilter.toLowerCase()));
    }
    return qs;
  }, [moduleFilter]);

  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/adnoc/interview" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Interview Prep
      </Link>

      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <ShieldCheckIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Technical Questions</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {questions.length} ADNOC-specific technical questions with detailed expected answers and standard references.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <TechnicalQuestionCard key={q.id} question={q} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function TechnicalQuestionCard({ question, index }: { question: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              {index}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">{question.question}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{question.category}</span>
                <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400">{question.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={cn('h-5 w-5 text-gray-400 transition-transform flex-shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                Expected Answer
              </h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{question.expectedAnswer}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                ADNOC Reference
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{question.adnocReference}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Key Points to Mention
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">• Reference specific ADNOC HSE Standards by number</li>
                <li className="flex items-start gap-2">• Mention Golden Rules when applicable</li>
                <li className="flex items-start gap-2">• Use ADNOC terminology (PTW, SIMOPS, CHSEP, ERP, etc.)</li>
                <li className="flex items-start gap-2">• Reference UAE Federal Laws when relevant</li>
                <li className="flex items-start gap-2">• Give practical examples from experience</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ADNOCInterviewBehavioral() {
  const questions = ADNOC_INTERVIEW_QUESTIONS.behavioral;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/adnoc/interview" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Interview Prep
      </Link>

      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <SparklesIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Behavioral Questions (STAR Method)</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {questions.length} behavioral questions with STAR method guidance and competency mapping for ADNOC competency framework.
        </p>
      </div>

      {/* STAR Method Guide */}
      <div className="card bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500 mb-8">
        <div className="card-body">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
            STAR Method Framework
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <STARStep letter="S" title="Situation" description="Describe the context and background" color="blue" />
            <STARStep letter="T" title="Task" description="Explain your responsibility" color="green" />
            <STARStep letter="A" title="Action" description="Detail what YOU did specifically" color="purple" />
            <STARStep letter="R" title="Result" description="Share the outcome & lessons learned" color="orange" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {ADNOC_INTERVIEW_QUESTIONS.behavioral.map((q, index) => (
          <BehavioralQuestionCard key={q.id} question={q} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function STARStep({ letter, title, description, color }: { letter: string; title: string; description: string; color: string }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };
  return (
    <div className="text-center p-4">
      <div className={cn('h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl', colors[color as keyof typeof colors] || colors.blue)}>
        {letter}
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

function BehavioralQuestionCard({ question, index }: { question: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
              {index}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">{question.question}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{question.category}</span>
                <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400">{question.competency}</span>
              </div>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={cn('h-5 w-5 text-gray-400 transition-transform flex-shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                STAR Approach
              </h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{question.expectedApproach}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                ADNOC Competencies Assessed
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{question.competency}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Pro Tips
              </h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">• Be specific - use real examples from your experience</li>
                <li className="flex items-start gap-2">• Focus on YOUR actions, not the team's</li>
                <li className="flex items-start gap-2">• Quantify results where possible</li>
                <li className="flex items-start gap-2">• Link to ADNOC Golden Rules & values</li>
                <li className="flex items-start gap-2">• Practice 2-3 stories per competency</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ADNOCInterviewCases() {
  const [searchParams] = useSearchParams();
  const moduleFilter = searchParams.get('module');

  const cases = ADNOC_INTERVIEW_QUESTIONS.caseStudies;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/adnoc/interview" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Interview Prep
      </Link>

      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <MagnifyingGlassIcon className="h-8 w-8 text-purple-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Case Studies</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {cases.length} realistic ADNOC-style case studies with scenarios, questions, and expected answers based on actual industry incidents.
        </p>
      </div>

      <div className="space-y-6">
        {cases.map((cs, index) => (
          <CaseStudyCard key={cs.id} caseStudy={cs} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ caseStudy, index }: { caseStudy: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
              {index}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">{caseStudy.title}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Case Study</span>
              </div>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={cn('h-5 w-5 text-gray-400 transition-transform flex-shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-4 pt-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scenario</h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{caseStudy.scenario}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
                Questions
              </h4>
              <ol className="space-y-2">
                {caseStudy.questions.map((q, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{i + 1}.</span> {q}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                Expected Answers
              </h4>
              <ol className="space-y-2">
                {caseStudy.expectedAnswers.map((a, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{i + 1}.</span> {a}
                  </li>
                ))}
              </ol>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                ADNOC Standards Referenced
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseStudy.adnocStandards.map(s => (
                  <span key={s} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ADNOCInterviewPractical() {
  const assessments = ADNOC_INTERVIEW_QUESTIONS.practicalAssessments;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/adnoc/interview" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to Interview Prep
      </Link>

      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <ClipboardDocumentListIcon className="h-8 w-8 text-orange-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Practical Assessments</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {assessments.length} hands-on assessments simulating ADNOC interview practical exercises.
        </p>
      </div>

      <div className="space-y-6">
        {assessments.map((pa, index) => (
          <PracticalAssessmentCard key={pa.id} assessment={pa} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function PracticalAssessmentCard({ assessment, index }: { assessment: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card group">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
              {index}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">{assessment.title}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{assessment.description}</p>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={cn('h-5 w-5 text-gray-400 transition-transform flex-shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-slide-down">
          <div className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                Tasks
              </h4>
              <ol className="space-y-2">
                {assessment.tasks.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Evaluation Criteria
              </h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                {assessment.evaluationCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">• {c}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
                Preparation Tips
              </h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">• Practice with timer (assessments are timed)</li>
                <li className="flex items-start gap-2">• Use ADNOC templates & terminology</li>
                <li className="flex items-start gap-2">• Reference specific ADNOC HSE Standards</li>
                <li className="flex items-start gap-2">• Practice presenting to peers/mentors</li>
                <li className="flex items-start gap-2">• Prepare for follow-up questions</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ADNOCInterviewHub() {
  const { progress } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/adnoc" className="btn-ghost inline-flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back to ADNOC Dashboard
      </Link>

      <div className="text-center mb-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <TrophyIcon className="h-8 w-8 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ADNOC Interview Mastery</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Complete interview preparation with technical questions, behavioral STAR method, case studies, and practical assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InterviewCategoryCard
          icon={ShieldCheckIcon}
          title="Technical Questions"
          count={ADNOC_INTERVIEW_QUESTIONS.technical.length}
          description="ADNOC-specific technical Q&A with standard references"
          href="/adnoc/interview/technical"
          color="blue"
        />
        <InterviewCategoryCard
          icon={StarIcon}
          title="Behavioral (STAR)"
          count={ADNOC_INTERVIEW_QUESTIONS.behavioral.length}
          description="Behavioral questions with STAR method guidance"
          href="/adnoc/interview/behavioral"
          color="green"
        />
        <InterviewCategoryCard
          icon={MagnifyingGlassIcon}
          title="Case Studies"
          count={ADNOC_INTERVIEW_QUESTIONS.caseStudies.length}
          description="Realistic scenarios with expected answers"
          href="/adnoc/interview/cases"
          color="purple"
        />
        <InterviewCategoryCard
          icon={ClipboardDocumentListIcon}
          title="Practical Assessments"
          count={ADNOC_INTERVIEW_QUESTIONS.practicalAssessments.length}
          description="Hands-on exercises: Risk Assessment, JSA, etc."
          href="/adnoc/interview/practical"
          color="orange"
        />
      </div>

      {/* Career & Salary */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">ADNOC Career & Salary Guide</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-2 font-medium">Grade</th>
                  <th className="pb-2 font-medium">Experience</th>
                  <th className="pb-2 font-medium">Key Certifications</th>
                  <th className="pb-2 font-medium">Salary (AED/month)</th>
                </tr>
              </thead>
              <tbody>
                {ADNOC_CAREER_INFO.grades.map(g => (
                  <tr key={g.grade} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-medium text-gray-900 dark:text-white">{g.grade}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{g.minExp}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{g.certifications.slice(0, 2).join(', ')}</td>
                    <td className="py-2 font-medium text-green-600 dark:text-green-400">{g.salaryRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interview Process */}
      <div className="card">
        <div className="card-header">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardDocumentListIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            ADNOC Interview Process
          </h3>
        </div>
        <div className="card-body">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {ADNOC_CAREER_INFO.interviewProcess.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Key Tips */}
      <div className="card border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
        <div className="card-header">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
            Key Preparation Tips
          </h3>
        </div>
        <div className="card-body">
          <ul className="space-y-2">
            {ADNOC_CAREER_INFO.keyPreparationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InterviewCategoryCard({ icon: Icon, title, count, description, href, color }: { icon: React.ComponentType<{ className?: string }>; title: string; count: number; description: string; href: string; color: string }) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };
  return (
    <Link to={href} className="card group p-6 hover:shadow-xl transition-shadow h-full">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-4', colors[color as keyof typeof colors] || colors.blue)}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{count}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      <span className="btn-primary inline-block w-full text-center">Start</span>
    </Link>
  );
}