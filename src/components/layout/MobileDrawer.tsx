/**
 * HSE Learning Guide - Mobile Navigation Drawer
 * Full-screen navigation drawer for mobile devices
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  HomeModernIcon,
  TruckIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  CpuChipIcon,
  StarIcon,
  BugAntIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const NAV_SECTIONS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    href: '/dashboard',
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: BookOpenIcon,
    children: [
      { id: 'modules', label: 'All Modules', icon: BuildingLibraryIcon, href: '/modules' },
      { id: 'paths', label: 'Learning Paths', icon: AcademicCapIcon, href: '/paths' },
      { id: 'assessments', label: 'Assessments', icon: ClipboardDocumentListIcon, href: '/assessments' },
    ],
  },
  {
    id: 'hazards',
    label: 'Major Hazards',
    icon: ShieldCheckIcon,
    children: [
      { id: 'fall-protection', label: 'Fall Protection', icon: SparklesIcon, href: '/modules/fall-protection' },
      { id: 'confined-space', label: 'Confined Space', icon: BuildingLibraryIcon, href: '/modules/confined-space' },
      { id: 'fire-safety', label: 'Fire Safety', icon: ExclamationTriangleIcon, href: '/modules/fire-safety' },
      { id: 'chemical-safety', label: 'Chemical Safety', icon: BeakerIcon, href: '/modules/chemical-safety' },
      { id: 'electrical-safety', label: 'Electrical Safety', icon: SparklesIcon, href: '/modules/electrical-safety' },
      { id: 'lockout-tagout', label: 'Lockout/Tagout', icon: WrenchScrewdriverIcon, href: '/modules/lockout-tagout' },
      { id: 'machine-guarding', label: 'Machine Guarding', icon: Cog6ToothIcon, href: '/modules/machine-guarding' },
      { id: 'ppe', label: 'PPE', icon: HomeModernIcon, href: '/modules/ppe' },
      { id: 'respiratory-protection', label: 'Respiratory Protection', icon: BeakerIcon, href: '/modules/respiratory-protection' },
      { id: 'hazard-communication', label: 'HazCom/GHS', icon: DocumentTextIcon, href: '/modules/hazard-communication' },
      { id: 'scaffolding', label: 'Scaffolding', icon: BuildingLibraryIcon, href: '/modules/scaffolding' },
      { id: 'excavation', label: 'Excavation/Trenching', icon: TruckIcon, href: '/modules/excavation' },
      { id: 'crane-rigging', label: 'Crane & Rigging', icon: TruckIcon, href: '/modules/crane-rigging' },
      { id: 'welding-cutting', label: 'Welding & Hot Work', icon: WrenchScrewdriverIcon, href: '/modules/welding-cutting' },
      { id: 'ergonomics', label: 'Ergonomics', icon: BrainIcon, href: '/modules/ergonomics' },
      { id: 'hearing-conservation', label: 'Hearing Conservation', icon: SparklesIcon, href: '/modules/hearing-conservation' },
      { id: 'heat-cold-stress', label: 'Heat/Cold Stress', icon: SparklesIcon, href: '/modules/heat-cold-stress' },
      { id: 'bloodborne-pathogens', label: 'Bloodborne Pathogens', icon: BeakerIcon, href: '/modules/bloodborne-pathogens' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced Topics',
    icon: AcademicCapIcon,
    children: [
      { id: 'safety-management-systems', label: 'Safety Management Systems', icon: BuildingLibraryIcon, href: '/modules/safety-management-systems' },
      { id: 'process-safety', label: 'Process Safety (PSM)', icon: BuildingOfficeIcon, href: '/modules/process-safety' },
      { id: 'industrial-hygiene', label: 'Industrial Hygiene', icon: MicroscopeIcon, href: '/modules/industrial-hygiene' },
      { id: 'behavioral-safety', label: 'Behavioral Safety', icon: BrainIcon, href: '/modules/behavioral-safety' },
      { id: 'regulatory-compliance', label: 'Regulatory Compliance', icon: GavelIcon, href: '/modules/regulatory-compliance' },
      { id: 'environmental-protection', label: 'Environmental Protection', icon: LeafIcon, href: '/modules/environmental-protection' },
      { id: 'incident-investigation', label: 'Incident Investigation', icon: MagnifyingGlassIcon, href: '/modules/incident-investigation' },
      { id: 'risk-assessment', label: 'Risk Assessment', icon: ClipboardDocumentListIcon, href: '/modules/risk-assessment' },
      { id: 'emergency-response', label: 'Emergency Response', icon: ExclamationTriangleIcon, href: '/modules/emergency-response' },
    ],
  },
  {
    id: 'industry',
    label: 'Industry Specializations',
    icon: BuildingOffice2Icon,
    children: [
      { id: 'construction-safety', label: 'Construction Safety', icon: HomeModernIcon, href: '/modules/construction-safety' },
      { id: 'oil-gas-safety', label: 'Oil & Gas Safety', icon: BuildingOfficeIcon, href: '/modules/oil-gas-safety' },
      { id: 'transportation-safety', label: 'Transportation Safety', icon: TruckIcon, href: '/modules/transportation-safety' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources & Tools',
    icon: DocumentTextIcon,
    children: [
      { id: 'resources', label: 'Resource Library', icon: BuildingLibraryIcon, href: '/resources' },
      { id: 'glossary', label: 'Glossary', icon: BookOpenIcon, href: '/glossary' },
      { id: 'checklists', label: 'Checklists', icon: ClipboardDocumentListIcon, href: '/checklists' },
      { id: 'procedures', label: 'Procedures', icon: DocumentTextIcon, href: '/procedures' },
      { id: 'case-studies', label: 'Case Studies', icon: MagnifyingGlassIcon, href: '/case-studies' },
    ],
  },
  {
    id: 'progress',
    label: 'My Progress',
    icon: ChartBarIcon,
    children: [
      { id: 'progress', label: 'Progress Tracker', icon: ChartBarIcon, href: '/progress' },
      { id: 'achievements', label: 'Achievements', icon: TrophyIcon, href: '/achievements' },
      { id: 'certificates', label: 'Certificates', icon: DocumentTextIcon, href: '/certificates' },
    ],
  },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const location = useLocation();
  const { user, isAuthenticated } = useApp();
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard', 'learning', 'hazards']);

  if (!isOpen) return null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm lg:hidden bg-white dark:bg-gray-900 shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-hse-primary text-xl font-bold">HSE Learning Guide</span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4" aria-label="Mobile navigation">
            {NAV_SECTIONS.map(section => {
              const hasChildren = 'children' in section;
              const active = hasChildren
                ? section.children.some(child => isActive(child.href))
                : isActive(section.href);

              if (!hasChildren) {
                return (
                  <NavLink
                    key={section.id}
                    to={section.href}
                    className={({ isActive: navActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                        navActive
                          ? 'bg-hse-primary/10 text-hse-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )
                    }
                    onClick={onClose}
                  >
                    <section.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium text-base">{section.label}</span>
                  </NavLink>
                );
              }

              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all duration-200',
                      active
                        ? 'bg-hse-primary/10 text-hse-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                    aria-expanded={isSectionExpanded(section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium text-base">{section.label}</span>
                    </div>
                    <ChevronRightIcon
                      className={cn(
                        'h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200',
                        isSectionExpanded(section.id) && 'rotate-90'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {isSectionExpanded(section.id) && (
                    <div className="mt-2 ml-6 space-y-1 animate-slide-down">
                      {section.children.map(child => {
                        const childActive = isActive(child.href);
                        return (
                          <NavLink
                            key={child.id}
                            to={child.href}
                            className={({ isActive: navActive }) =>
                              cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                                navActive
                                  ? 'bg-hse-primary/10 text-hse-primary'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                              )
                            }
                            onClick={onClose}
                          >
                            <child.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span>{child.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-hse-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hse-primary font-medium text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  <span className="inline-flex mt-1 px-2 py-0.5 text-xs font-medium bg-hse-primary/10 text-hse-primary rounded-full capitalize">
                    {user.level}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  onClick={onClose}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-hse-primary text-white hover:bg-hse-secondary font-medium"
                  onClick={onClose}
                >
                  <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
                  Get Started
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// Need to import this icon
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';