/**
 * HSE Learning Guide - Route Configuration
 * Defines all application routes with lazy loading for code splitting
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { PageLayout } from './components/layout/PageLayout';

// ============================================
// LAZY LOADED PAGES
// ============================================

// Core Pages
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const ModuleCatalog = lazy(() => import('./pages/ModuleCatalog').then(m => ({ default: m.ModuleCatalog })));
const ModuleDetail = lazy(() => import('./pages/ModuleDetail').then(m => ({ default: m.ModuleDetail })));
const LessonViewer = lazy(() => import('./pages/LessonViewer').then(m => ({ default: m.LessonViewer })));
const LearningPaths = lazy(() => import('./pages/LearningPaths').then(m => ({ default: m.LearningPaths })));
const PathDetail = lazy(() => import('./pages/PathDetail').then(m => ({ default: m.PathDetail })));

// User Pages
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Progress = lazy(() => import('./pages/Progress').then(m => ({ default: m.Progress })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));

// User Pages (Achievements, Certificates using placeholder)
const Achievements = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Achievements })));
const Certificates = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Certificates })));

// Assessment Pages (using placeholder implementations)
const AssessmentCenter = lazy(() => import('./pages/placeholder').then(m => ({ default: m.AssessmentCenter })));
const QuizPlayer = lazy(() => import('./pages/placeholder').then(m => ({ default: m.QuizPlayer })));
const SimulationPlayer = lazy(() => import('./pages/placeholder').then(m => ({ default: m.SimulationPlayer })));

// Resource Pages (using placeholder implementations)
const Resources = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Resources })));
const Glossary = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Glossary })));
const Checklists = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Checklists })));
const Procedures = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Procedures })));
const CaseStudies = lazy(() => import('./pages/placeholder').then(m => ({ default: m.CaseStudies })));

// Admin/Analytics (for future - using placeholder)
const Analytics = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Analytics })));
const AdminPanel = lazy(() => import('./pages/placeholder').then(m => ({ default: m.AdminPanel })));

// Unified Standards Pages
const UnifiedDashboard = lazy(() => import('./pages/UnifiedDashboard').then(m => ({ default: m.UnifiedDashboard })));
const UnifiedTopics = lazy(() => import('./pages/UnifiedTopics').then(m => ({ default: m.UnifiedTopics })));
const UnifiedTopicDetail = lazy(() => import('./pages/UnifiedTopicDetail').then(m => ({ default: m.UnifiedTopicDetail })));
const UnifiedLearningPaths = lazy(() => import('./pages/UnifiedLearningPaths').then(m => ({ default: m.UnifiedLearningPaths })));
const UnifiedPathDetail = lazy(() => import('./pages/UnifiedPathDetail').then(m => ({ default: m.UnifiedPathDetail })));
const UnifiedGlossary = lazy(() => import('./pages/UnifiedGlossary').then(m => ({ default: m.UnifiedGlossary })));
const UnifiedCompare = lazy(() => import('./pages/UnifiedCompare').then(m => ({ default: m.UnifiedCompare })));

// ADNOC Pages (kept for backward compatibility)
const ADNOCDashboard = lazy(() => import('./pages/ADNOCDashboard').then(m => ({ default: m.ADNOCDashboard })));
const ADNOCModuleDetail = lazy(() => import('./pages/ADNOCModuleDetail').then(m => ({ default: m.ADNOCModuleDetail })));
const ADNOCPathDetail = lazy(() => import('./pages/ADNOCPathDetail').then(m => ({ default: m.ADNOCPathDetail })));
const ADNOCInterviewHub = lazy(() => import('./pages/ADNOCInterview').then(m => ({ default: m.ADNOCInterviewHub })));
const ADNOCInterviewTechnical = lazy(() => import('./pages/ADNOCInterview').then(m => ({ default: m.ADNOCInterviewTechnical })));
const ADNOCInterviewBehavioral = lazy(() => import('./pages/ADNOCInterview').then(m => ({ default: m.ADNOCInterviewBehavioral })));
const ADNOCInterviewCases = lazy(() => import('./pages/ADNOCInterview').then(m => ({ default: m.ADNOCInterviewCases })));
const ADNOCInterviewPractical = lazy(() => import('./pages/ADNOCInterview').then(m => ({ default: m.ADNOCInterviewPractical })));
const ADNOCGlossary = lazy(() => import('./pages/ADNOCGlossary').then(m => ({ default: m.ADNOCGlossary })));

// Auth Pages
const Login = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/placeholder').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/placeholder').then(m => ({ default: m.ForgotPassword })));

// ============================================
// SUSPENSE WRAPPER
// ============================================

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" />}>
      {children}
    </Suspense>
  );
}

// ============================================
// ROUTE CONFIGURATION
// ============================================

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PageSuspense><Login /></PageSuspense>} />
      <Route path="/register" element={<PageSuspense><Register /></PageSuspense>} />
      <Route path="/forgot-password" element={<PageSuspense><ForgotPassword /></PageSuspense>} />

      {/* Protected Routes - wrapped in PageLayout */}
      <Route element={<PageLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PageSuspense><Dashboard /></PageSuspense>} />

        {/* Module Catalog & Learning */}
        <Route path="/modules" element={<PageSuspense><ModuleCatalog /></PageSuspense>} />
        <Route path="/modules/:moduleId" element={<PageSuspense><ModuleDetail /></PageSuspense>} />
        <Route path="/modules/:moduleId/lessons/:lessonId" element={<PageSuspense><LessonViewer /></PageSuspense>} />

        {/* Learning Paths */}
        <Route path="/paths" element={<PageSuspense><LearningPaths /></PageSuspense>} />
        <Route path="/paths/:pathId" element={<PageSuspense><PathDetail /></PageSuspense>} />

        {/* Assessments */}
        <Route path="/assessments" element={<PageSuspense><AssessmentCenter /></PageSuspense>} />
        <Route path="/assessments/quiz/:quizId" element={<PageSuspense><QuizPlayer /></PageSuspense>} />
        <Route path="/assessments/simulation/:simulationId" element={<PageSuspense><SimulationPlayer /></PageSuspense>} />

        {/* Resources */}
        <Route path="/resources" element={<PageSuspense><Resources /></PageSuspense>} />
        <Route path="/glossary" element={<PageSuspense><Glossary /></PageSuspense>} />
        <Route path="/checklists" element={<PageSuspense><Checklists /></PageSuspense>} />
        <Route path="/procedures" element={<PageSuspense><Procedures /></PageSuspense>} />
        <Route path="/case-studies" element={<PageSuspense><CaseStudies /></PageSuspense>} />

        {/* User Profile & Progress */}
        <Route path="/profile" element={<PageSuspense><Profile /></PageSuspense>} />
        <Route path="/progress" element={<PageSuspense><Progress /></PageSuspense>} />
        <Route path="/achievements" element={<PageSuspense><Achievements /></PageSuspense>} />
        <Route path="/certificates" element={<PageSuspense><Certificates /></PageSuspense>} />
        <Route path="/settings" element={<PageSuspense><Settings /></PageSuspense>} />

        {/* Analytics & Admin */}
        <Route path="/analytics" element={<PageSuspense><Analytics /></PageSuspense>} />
        <Route path="/admin" element={<PageSuspense><AdminPanel /></PageSuspense>} />

        {/* Unified Standards Knowledge Bank */}
        <Route path="/topics" element={<PageSuspense><UnifiedTopics /></PageSuspense>} />
        <Route path="/topics/:topicId" element={<PageSuspense><UnifiedTopicDetail /></PageSuspense>} />
        <Route path="/paths" element={<PageSuspense><UnifiedLearningPaths /></PageSuspense>} />
        <Route path="/paths/:pathId" element={<PageSuspense><UnifiedPathDetail /></PageSuspense>} />
        <Route path="/compare" element={<PageSuspense><UnifiedCompare /></PageSuspense>} />
        <Route path="/glossary" element={<PageSuspense><UnifiedGlossary /></PageSuspense>} />

        {/* ADNOC HSE Interview Preparation (Legacy) */}
        <Route path="/adnoc" element={<PageSuspense><ADNOCDashboard /></PageSuspense>} />
        <Route path="/adnoc/modules/:moduleId" element={<PageSuspense><ADNOCModuleDetail /></PageSuspense>} />
        <Route path="/adnoc/path/:pathId" element={<PageSuspense><ADNOCPathDetail /></PageSuspense>} />
        <Route path="/adnoc/interview" element={<PageSuspense><ADNOCInterviewHub /></PageSuspense>} />
        <Route path="/adnoc/interview/technical" element={<PageSuspense><ADNOCInterviewTechnical /></PageSuspense>} />
        <Route path="/adnoc/interview/behavioral" element={<PageSuspense><ADNOCInterviewBehavioral /></PageSuspense>} />
        <Route path="/adnoc/interview/cases" element={<PageSuspense><ADNOCInterviewCases /></PageSuspense>} />
        <Route path="/adnoc/interview/practical" element={<PageSuspense><ADNOCInterviewPractical /></PageSuspense>} />
        <Route path="/adnoc/glossary" element={<PageSuspense><ADNOCGlossary /></PageSuspense>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageSuspense><NotFound /></PageSuspense>} />
    </Routes>
  );
}

// ============================================
// NOT FOUND PAGE
// ============================================

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <a href="/dashboard" className="btn-primary">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}