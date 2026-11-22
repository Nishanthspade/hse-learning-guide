/**
 * ADNOC HSE Interview Preparation Dashboard
 * Specialized dashboard for ADNOC HSE interview preparation
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ADNOC_MODULES, ADNOC_LEARNING_PATH, ADNOC_CAREER_INFO, getADNOCInterviewQuestions } from '../data/adnoc-content';
import { cn } from '../utils/cn';
import {
  AcademicCapIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export function ADNOCDashboard() {
  const { user, progress, getPathProgress, startPath, startModule } = useApp();

  const pathProgress = useMemo(() => getPathProgress(ADNOC_LEARNING_PATH.id), [getPathProgress]);

  const interviewQuestions = ADNOC_INTERVIEW_QUESTIONS;

  const completedModules = ADNOC_MODULES.filter(m => {
    const prog = progress[m.id];
    return prog?.status === 'completed' || prog?.status === 'mastered';
  }).length;

  const inProgressModules = ADNOC_MODULES.filter(m => {
    const prog = progress[m.id];
    return prog?.status === 'in-progress';
  }).length;

  return (
    <div className="space-y-6">
      {/* ADNOC Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d%3D%22M30 0L60 30L30 60L0 30Z%22 fill%3D%22%23ffffff%22 fill-opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                  ADNOC HSE Interview Preparation
                </span>
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {ADNOC_MODULES.length} Specialized Modules
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Master ADNOC HSE Interview
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Complete ADNOC-specific HSE knowledge base with interview questions, practical assessments, and career guidance to ace your ADNOC interview on the first attempt.
              </p>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 min-w-[180px]">
                <div className="text-4xl font-bold">{pathProgress.percentage}%</div>
                <div className="text-blue-200 text-sm">Path Progress</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${pathProgress.percentage}%` }}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={CheckCircleIcon} value={completedModules} label="Completed" subtitle={`of ${ADNOC_MODULES.length} modules`} />
            <StatCard icon={SparklesIcon} value={inProgressModules} label="In Progress" subtitle="Active learning" />
            <StatCard icon={TrophyIcon} value={interviewQuestions.technical.length + interviewQuestions.behavioral.length} label="Questions" subtitle="Technical + Behavioral" />
            <StatCard icon={ClipboardDocumentListIcon} value={interviewQuestions.caseStudies.length + interviewQuestions.practicalAssessments.length} label="Assessments" subtitle="Cases + Practical" />
          </div>
        </div>
      </div>

      {/* ADNOC Learning Path */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <RocketLaunchIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              ADNOC Mastery Pathway
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{ADNOC_LEARNING_PATH.description}</p>
          </div>
          <Link to={`/adnoc/path/${ADNOC_LEARNING_PATH.id}`} className="btn-primary flex items-center gap-2">
            View Full Path <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-3">
          {ADNOC_LEARNING_PATH.modules.map((pathModule, index) => {
            const module = ADNOC_MODULES.find(m => m.id === pathModule.moduleId);
            const prog = progress[pathModule.moduleId];
            const isCompleted = prog?.status === 'completed' || prog?.status === 'mastered';
            const isInProgress = prog?.status === 'in-progress';
            const isLocked = index > 0 && ADNOC_LEARNING_PATH.modules.slice(0, index).some(m => {
              const p = progress[m.moduleId];
              return !p || (p.status !== 'completed' && p.status !== 'mastered');
            });

            return module && (
              <Link
                key={module.id}
                to={`/adnoc/modules/${module.id}`}
                className={cn(
                  'card group flex items-center gap-4 p-4 transition-all duration-200 hover:shadow-lg',
                  isCompleted && 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/10',
                  isInProgress && 'border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/10',
                  isLocked && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className={cn('flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center', isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-600' : isLocked ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900/30')}>
                  {isCompleted ? (
                    <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : isLocked ? (
                    <span className="text-gray-400 dark:text-gray-500 font-medium">{index + 1}</span>
                  ) : (
                    <span className="text-white font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{module.shortTitle}</h3>
                    {pathModule.milestone && <span className="badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Milestone</span>}
                    {isInProgress && <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">In Progress</span>}
                    {isCompleted && <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completed</span>}
                    {isLocked && <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Locked</span>}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{module.description}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" aria-hidden="true" /> {module.estimatedHours}h</span>
                    <span className="flex items-center gap-1"><ClipboardDocumentListIcon className="h-3.5 w-3.5" aria-hidden="true" /> {module.lessons.length} lessons</span>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interview Prep Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header flex items-center gap-3">
            <ClipboardDocumentListIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Technical Questions</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{interviewQuestions.technical.length} ADNOC-specific technical questions with expected answers and standard references.</p>
            <div className="space-y-2">
              {interviewQuestions.technical.slice(0, 3).map(q => (
                <div key={q.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{q.question}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{q.category}</span>
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">{q.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/adnoc/interview/technical" className="btn-primary w-full mt-4 text-center">
              View All Technical Questions
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header flex items-center gap-3">
            <SparklesIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Behavioral Questions (STAR)</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{interviewQuestions.behavioral.length} behavioral questions with STAR method guidance and competency mapping.</p>
            <div className="space-y-2">
              {interviewQuestions.behavioral.slice(0, 3).map(q => (
                <div key={q.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{q.question}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{q.category}</span>
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">{q.competency}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/adnoc/interview/behavioral" className="btn-primary w-full mt-4 text-center">
              View All Behavioral Questions
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header flex items-center gap-3">
            <ClipboardDocumentListIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Case Studies</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{interviewQuestions.caseStudies.length} ADNOC-style case studies with scenarios, questions, and expected answers.</p>
            <div className="space-y-2">
              {interviewQuestions.caseStudies.map(cs => (
                <div key={cs.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{cs.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cs.scenario.substring(0, 100)}...</p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    {cs.adnocStandards.slice(0, 2).map(s => (
                      <span key={s} className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/adnoc/interview/cases" className="btn-primary w-full mt-4 text-center">
              View All Case Studies
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header flex items-center gap-3">
            <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Practical Assessments</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{interviewQuestions.practicalAssessments.length} hands-on assessments: Risk Assessment, JSA, Site Inspection, Incident Investigation.</p>
            <div className="space-y-2">
              {interviewQuestions.practicalAssessments.map(pa => (
                <div key={pa.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{pa.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pa.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pa.tasks.slice(0, 3).map((t, i) => (
                      <span key={i} className="badge bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs">{t}</span>
                    ))}
                    <span className="badge bg-gray-100 text-gray-500 text-xs">+{pa.tasks.length - 3} more</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/adnoc/interview/practical" className="btn-primary w-full mt-4 text-center">
              View All Practical Assessments
            </Link>
          </div>
        </div>
      </section>

      {/* Career Info */}
      <section className="card">
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BriefcaseIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900 dark:text-white">ADNOC Career Path & Salary Guide</h3>
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
                  <th className="pb-2 font-medium">Salary Range (AED/month)</th>
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
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Interview Process</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700 dark:text-amber-300">
                {ADNOC_CAREER_INFO.interviewProcess.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            <Link to="/adnoc/career" className="btn-primary mt-4 inline-block">
              View Full Career Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickLink icon={ShieldCheckIcon} label="Golden Rules" href="/adnoc/golden-rules" color="blue" description="10 Life-Saving Rules" />
          <QuickLink icon={ClipboardDocumentListIcon} label="Glossary" href="/adnoc/glossary" color="green" description="ADNOC Terminology" />
          <QuickLink icon={AcademicCapIcon} label="STAR Method Guide" href="/adnoc/star-method" color="purple" description="Behavioral Interview Prep" />
          <QuickLink icon={CurrencyDollarIcon} label="Salary Calculator" href="/adnoc/salary" color="amber" description="Grade & Benefits" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, subtitle }: { icon: React.ComponentType<{ className?: string }>; value: number | string; label: string; subtitle: string }) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl p-4 text-center border border-white/20 dark:border-gray-700/50">
      <Icon className="h-6 w-6 text-blue-600 mx-auto mb-2" aria-hidden="true" />
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}

function QuickLink({ icon: Icon, label, href, color, description }: { icon: React.ComponentType<{ className?: string }>; label: string; href: string; color: string; description: string }) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
  };
  return (
    <Link to={href} className="card group p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center mb-3', colors[color as keyof typeof colors])}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </Link>
  );
}