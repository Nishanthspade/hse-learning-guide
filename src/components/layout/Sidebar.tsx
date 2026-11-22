/**
 * HSE Learning Guide - Sidebar Navigation
 * Collapsible sidebar with module categories, learning paths, and user navigation
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';
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
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
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
    roles: ['all'],
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
  {
    id: 'account',
    label: 'Account',
    icon: UserCircleIcon,
    children: [
      { id: 'profile', label: 'Profile', icon: UserCircleIcon, href: '/profile' },
      { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, sidebarOpen } = useApp();
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard', 'learning', 'hazards']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  if (!sidebarOpen && !isOpen) {
    return (
      <aside
        className="fixed top-0 left-0 z-50 h-screen w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0"
        aria-label="Collapsed navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo - Collapsed */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <span className="text-hse-primary text-xl font-bold">HSE</span>
          </div>

          {/* Collapsed Nav Items */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1" aria-label="Main navigation">
            {NAV_SECTIONS.map(section => (
              <NavLink
                key={section.id}
                to={section.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-center px-3 py-2.5 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-hse-primary/10 text-hse-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary'
                  )
                }
                title={section.label}
                onClick={onClose}
              >
                <section.icon className="h-5 w-5" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>

          {/* User Avatar - Collapsed */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-hse-primary/10 flex items-center justify-center">
                  <span className="text-hse-primary font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center justify-center px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary transition-all duration-200"
                onClick={onClose}
                title="Sign In"
              >
                <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
              </NavLink>
            )}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'w-64' : 'w-20'
      )}
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <span className={cn('text-hse-primary text-xl font-bold transition-opacity duration-200', isOpen ? 'opacity-100' : 'opacity-0')}>
            HSE Learning Guide
          </span>
          <span className="text-hse-primary text-xl font-bold">HSE</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-3" aria-label="Main navigation">
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
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                      navActive
                        ? 'bg-hse-primary/10 text-hse-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary'
                    )
                  }
                  onClick={onClose}
                >
                  <section.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {isOpen && <span className="font-medium">{section.label}</span>}
                </NavLink>
              );
            }

            return (
              <div key={section.id} className="group">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    'flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200',
                    active
                      ? 'bg-hse-primary/10 text-hse-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary'
                  )}
                  aria-expanded={isSectionExpanded(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {isOpen && <span className="font-medium">{section.label}</span>}
                  </div>
                  {isOpen && (
                    <ChevronRightIcon
                      className={cn(
                        'h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200',
                        isSectionExpanded(section.id) && 'rotate-90'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {isOpen && isSectionExpanded(section.id) && (
                  <div className="mt-1 ml-8 space-y-1 animate-slide-down">
                    {section.children.map(child => {
                      const childActive = isActive(child.href);
                      return (
                        <NavLink
                          key={child.id}
                          to={child.href}
                          className={({ isActive: navActive }) =>
                            cn(
                              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                              navActive
                                ? 'bg-hse-primary/10 text-hse-primary'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary'
                            )
                          }
                          onClick={onClose}
                        >
                          <child.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
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
            <div className={cn('flex items-center gap-3', isOpen ? '' : 'justify-center')}>
              <div className="h-10 w-10 rounded-full bg-hse-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-hse-primary font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{user.level}</p>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={cn(
                'flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hse-primary transition-all duration-200',
                isOpen ? 'justify-start' : ''
              )}
              onClick={onClose}
            >
              <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
              {isOpen && <span className="font-medium">Sign In</span>}
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
}