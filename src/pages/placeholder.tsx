/**
 * HSE Learning Guide - Placeholder Pages
 * Temporary pages for routes not yet fully implemented
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  ClipboardDocumentListIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  TrophyIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features?: string[];
  cta?: { label: string; href: string };
}

export function PlaceholderPage({ title, description, icon: Icon, features, cta }: PlaceholderPageProps) {
  const { user } = useApp();

  if (!user) {
    return <AuthRequired />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-hse-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-hse-primary" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{description}</p>
      </div>

      {features && features.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white">Features</h3>
          </div>
          <div className="card-body">
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-hse-success flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="card border-l-4 border-l-hse-warning">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-hse-warning flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Under Development</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This page is currently being built. Check back soon for full functionality!
              </p>
            </div>
          </div>
        </div>
      </div>

      {cta && (
        <div className="text-center">
          <Link to={cta.href} className="btn-primary inline-flex items-center gap-2">
            {cta.label}
            <SparklesIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

function AuthRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <WrenchScrewdriverIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to access this feature.
        </p>
        <Link to="/login" className="btn-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
}

// Specific placeholder pages
export function AssessmentCenter() {
  return (
    <PlaceholderPage
      title="Assessment Center"
      description="Test your knowledge with quizzes, simulations, and practical assessments"
      icon={ClipboardDocumentListIcon}
      features={[
        'Module quizzes and knowledge checks',
        'Interactive scenario simulations',
        'Practical skill assessments',
        'Timed certification exams',
        'Detailed performance analytics',
        'Retake policies and score tracking',
      ]}
      cta={{ label: 'Browse Modules', href: '/modules' }}
    />
  );
}

export function QuizPlayer() {
  return (
    <PlaceholderPage
      title="Quiz Player"
      description="Take interactive quizzes with immediate feedback"
      icon={ClipboardDocumentListIcon}
      features={[
        'Multiple choice and true/false questions',
        'Scenario-based questions',
        'Drag-and-drop interactions',
        'Hotspot identification',
        'Immediate feedback with explanations',
        'Progress tracking and scoring',
      ]}
    />
  );
}

export function SimulationPlayer() {
  return (
    <PlaceholderPage
      title="Simulation Player"
      description="Practice real-world scenarios in a safe virtual environment"
      icon={WrenchScrewdriverIcon}
      features={[
        '3D interactive simulations',
        'Decision-tree scenarios',
        'Virtual inspections',
        'Emergency response drills',
        'Equipment operation training',
        'Hazard identification exercises',
      ]}
    />
  );
}

export function Resources() {
  return (
    <PlaceholderPage
      title="Resource Library"
      description="Access downloadable guides, templates, checklists, and reference materials"
      icon={BuildingLibraryIcon}
      features={[
        'PDF guides and reference documents',
        'Editable templates and forms',
        'Printable checklists and procedures',
        'Regulatory reference materials',
        'Video tutorials and demonstrations',
        'Multilingual resources',
      ]}
      cta={{ label: 'Browse Modules', href: '/modules' }}
    />
  );
}

export function Glossary() {
  return (
    <PlaceholderPage
      title="HSE Glossary"
      description="Comprehensive dictionary of HSE terms, acronyms, and definitions"
      icon={BookOpenIcon}
      features={[
        '500+ HSE terms and definitions',
        'Acronyms and abbreviations',
        'Regulatory terminology',
        'Cross-references to standards',
        'Search and filter functionality',
        'Bookmark favorite terms',
      ]}
    />
  );
}

export function Checklists() {
  return (
    <PlaceholderPage
      title="Safety Checklists"
      description="Digital checklists for inspections, audits, and daily safety verification"
      icon={ClipboardDocumentListIcon}
      features={[
        'Pre-task safety checklists',
        'Daily/weekly/monthly inspections',
        'Equipment inspection forms',
        'Permit verification checklists',
        'Digital signatures and timestamps',
        'Offline-capable mobile access',
      ]}
    />
  );
}

export function Procedures() {
  return (
    <PlaceholderPage
      title="Standard Procedures"
      description="Documented safety procedures and work instructions"
      icon={DocumentTextIcon}
      features={[
        'Step-by-step work procedures',
        'Lockout/Tagout procedures',
        'Confined space entry procedures',
        'Emergency response procedures',
        'Incident reporting procedures',
        'Version control and approvals',
      ]}
    />
  );
}

export function CaseStudies() {
  return (
    <PlaceholderPage
      title="Case Studies"
      description="Real-world incident analyses and lessons learned"
      icon={MagnifyingGlassIcon}
      features={[
        'Industry-specific incident reports',
        'Root cause analysis examples',
        'Lessons learned summaries',
        'Preventive measure recommendations',
        'Discussion questions for training',
        'Regulatory citation references',
      ]}
    />
  );
}

export function Achievements() {
  return (
    <PlaceholderPage
      title="Achievements"
      description="Track your learning milestones and earn recognition"
      icon={TrophyIcon}
      features={[
        'Module completion badges',
        'Learning streak rewards',
        'Assessment mastery awards',
        'Path certification trophies',
        'Special recognition achievements',
        'Progress sharing and leaderboards',
      ]}
    />
  );
}

export function Certificates() {
  return (
    <PlaceholderPage
      title="Certificates"
      description="View and manage your earned certifications"
      icon={DocumentTextIcon}
      features={[
        'Digital certificate verification',
        'PDF certificate download',
        'Certification expiration tracking',
        'Continuing education credits',
        'Shareable credential links',
        'Print-ready certificate formats',
      ]}
    />
  );
}

export function Analytics() {
  return (
    <PlaceholderPage
      title="Analytics Dashboard"
      description="Comprehensive learning analytics and reporting"
      icon={ChartBarIcon}
      features={[
        'Personal learning analytics',
        'Team/organization reports',
        'Compliance tracking',
        'Risk area identification',
        'Training ROI metrics',
        'Custom report builder',
      ]}
    />
  );
}

export function AdminPanel() {
  return (
    <PlaceholderPage
      title="Admin Panel"
      description="Administrative tools for managing users, content, and organization settings"
      icon={Cog6ToothIcon}
      features={[
        'User management and roles',
        'Content management system',
        'Organization analytics',
        'Compliance reporting',
        'Custom learning paths',
        'Integration settings',
      ]}
    />
  );
}

// Auth pages
export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-hse-primary/10 flex items-center justify-center">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue your HSE learning journey</p>
        </div>

        <div className="card p-6">
          <form className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="••••••••" required />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 text-hse-primary rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-hse-primary hover:text-hse-secondary">Forgot password?</a>
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a href="/register" className="text-hse-primary hover:text-hse-secondary font-medium">
                Sign up free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-hse-primary/10 flex items-center justify-center">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Start your HSE learning journey today</p>
        </div>

        <div className="card p-6">
          <form className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" className="input" placeholder="John Doe" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="••••••••" required minLength={8} />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input type="password" className="input" placeholder="••••••••" required />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="h-4 w-4 text-hse-primary rounded mt-0.5" required />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the <a href="#" className="text-hse-primary hover:text-hse-secondary">Terms of Service</a> and <a href="#" className="text-hse-primary hover:text-hse-secondary">Privacy Policy</a>
              </span>
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-hse-primary hover:text-hse-secondary font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-hse-primary/10 flex items-center justify-center">
            <span className="text-3xl">🔑</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your email to receive a reset link</p>
        </div>

        <div className="card p-6">
          <form className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" required />
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <a href="/login" className="text-hse-primary hover:text-hse-secondary font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}