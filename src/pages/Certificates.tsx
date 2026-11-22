/**
 * HSE Learning Guide - Certificates Page
 * View and manage earned certificates
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  DownloadIcon,
  ShareIcon,
  AwardIcon,
  ShieldCheckIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  PrinterIcon,
  ShareIcon as ShareIcon2,
} from '@heroicons/react/24/outline';

export function Certificates() {
  const { user, progress } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'earned' | 'in-progress' | 'expired'>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Mock certificates data
  const allCertificates = useMemo(() => [
    {
      id: 'cert-001',
      title: 'HSE Officer Foundation Certificate',
      description: 'Completed the HSE Officer Foundation learning pathway',
      issuedDate: '2024-01-15',
      expiryDate: '2027-01-15',
      credentialId: 'HSE-OFC-2024-001234',
      status: 'earned',
      pathwayId: 'hse-officer-foundation',
      frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA'],
      skills: ['Risk Assessment', 'Incident Investigation', 'Fire Safety', 'Chemical Safety', 'PTW', 'LOTO'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/HSE-OFC-2024-001234',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'standard',
    },
    {
      id: 'cert-002',
      title: 'Construction Safety Specialist',
      description: 'Completed the Construction Safety Specialist learning pathway',
      issuedDate: '2023-11-20',
      expiryDate: '2026-11-20',
      credentialId: 'HSE-CSS-2023-000567',
      status: 'earned',
      pathwayId: 'construction-safety-specialist',
      frameworks: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH'],
      skills: ['Fall Protection', 'Scaffolding', 'Excavation', 'Crane & Rigging', 'Electrical Safety'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/HSE-CSS-2023-000567',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'specialist',
    },
    {
      id: 'cert-003',
      title: 'Process Safety Engineer Certificate',
      description: 'Completed the Process Safety Engineer pathway',
      issuedDate: '2023-08-15',
      expiryDate: '2026-08-15',
      credentialId: 'HSE-PSE-2023-000123',
      status: 'earned',
      pathwayId: 'process-safety-engineer',
      frameworks: ['ADNOC', 'API', 'CCPS', 'IEC', 'OSHA'],
      skills: ['PSM', 'HAZOP', 'LOPA', 'MOC', 'PSSR', 'SIL', 'Mechanical Integrity'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/HSE-PSE-2023-000123',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'specialist',
    },
    {
      id: 'cert-004',
      title: 'Oil & Gas HSE Specialist',
      description: 'Completed the Oil & Gas HSE Specialist pathway',
      issuedDate: '2023-05-20',
      expiryDate: '2026-05-20',
      credentialId: 'HSE-OGS-2023-000456',
      status: 'earned',
      pathwayId: 'oil-gas-hse-specialist',
      frameworks: ['ADNOC', 'ARAMCO', 'IOGP', 'API', 'BSEE'],
      skills: ['Offshore HSE', 'H2S Management', 'Process Safety', 'Emergency Response', 'Contractor Management'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/HSE-OGS-2023-000456',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'specialist',
    },
    {
      id: 'cert-005',
      title: 'NEBOSH IGC Preparation Complete',
      description: 'Completed all modules for NEBOSH International General Certificate preparation',
      issuedDate: '2024-01-20',
      expiryDate: null,
      credentialId: 'HSE-NEB-2024-000789',
      status: 'earned',
      pathwayId: 'nebosh-igc-prep',
      frameworks: ['NEBOSH'],
      skills: ['IGC1', 'IGC2', 'IGC3'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/HSE-NEB-2024-000789',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'preparation',
    },
    {
      id: 'cert-006',
      title: 'ADNOC HSE Standards Compliance',
      description: 'Demonstrated comprehensive knowledge of ADNOC HSE Standards 100-300 Series',
      issuedDate: '2024-01-10',
      expiryDate: '2025-01-10',
      credentialId: 'ADNOC-HSE-2024-000999',
      status: 'earned',
      pathwayId: 'adnoc-compliance',
      frameworks: ['ADNOC'],
      skills: ['ADNOC 100 Series', 'ADNOC 200 Series', 'ADNOC 300 Series', 'Golden Rules'],
      verificationUrl: 'https://verify.adnoc.ae/cert/ADNOC-HSE-2024-000999',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'adnoc',
    },
    {
      id: 'cert-007',
      title: 'Process Safety Management (PSM) Auditor',
      description: 'Completed PSM Auditor training per OSHA 1910.119 and API RP 750',
      issuedDate: '2023-06-15',
      expiryDate: '2026-06-15',
      credentialId: 'PSM-AUD-2023-000234',
      status: 'earned',
      pathwayId: 'psm-auditor',
      frameworks: ['OSHA', 'API', 'CCPS'],
      skills: ['PSM Auditing', 'PHA Review', 'MOC Auditing', 'Mechanical Integrity Auditing'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/PSM-AUD-2023-000234',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'auditor',
    },
    {
      id: 'cert-008',
      title: 'ISO 45001 Lead Auditor',
      description: 'Completed ISO 45001:2018 Lead Auditor training',
      issuedDate: '2023-09-01',
      expiryDate: '2026-09-01',
      credentialId: 'ISO45001-LA-2023-001122',
      status: 'earned',
      pathwayId: 'iso45001-lead-auditor',
      frameworks: ['ISO45001'],
      skills: ['ISO 45001 Auditing', 'Audit Planning', 'Nonconformity Reporting', 'Audit Reporting'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/ISO45001-LA-2023-001122',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'auditor',
    },
    {
      id: 'cert-009',
      title: 'ADNOC Golden Rules Champion',
      description: 'Mastered all 10 ADNOC Golden Rules and demonstrated practical application',
      issuedDate: '2024-01-05',
      expiryDate: null,
      credentialId: 'ADNOC-GRC-2024-000111',
      status: 'earned',
      pathwayId: 'adnoc-golden-rules',
      frameworks: ['ADNOC'],
      skills: ['Golden Rules 1-10', 'Stop Work Authority', 'Permit Systems', 'Safety Culture'],
      verificationUrl: 'https://verify.adnoc.ae/cert/ADNOC-GRC-2024-000111',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'adnoc',
    },
    {
      id: 'cert-010',
      title: 'ISO 45001:2018 Internal Auditor',
      description: 'Completed ISO 45001:2018 Internal Auditor training',
      issuedDate: '2023-11-10',
      expiryDate: '2026-11-10',
      credentialId: 'ISO45001-IA-2023-000333',
      status: 'earned',
      pathwayId: 'iso45001-internal-auditor',
      frameworks: ['ISO45001'],
      skills: ['ISO 45001 Requirements', 'Internal Auditing', 'Audit Planning', 'Report Writing'],
      verificationUrl: 'https://verify.hseknowledge.bank/cert/ISO45001-IA-2023-000333',
      qrCode: 'data:image/svg+xml;base64,...',
      template: 'auditor',
    },
  ];
  return certificates;
}, []);

  const statuses = useMemo(() => {
    const statuses = [...new Set(allCertificates.map(c => c.status))];
    return ['all', ...statuses.sort()];
  }, [allCertificates]);

  const filteredCertificates = useMemo(() => {
    let result = allCertificates;

    if (filterStatus !== 'all') {
      result = result.filter(c => c.status === filterStatus);
    }

    result.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());

    return result;
  }, [allCertificates, filterStatus]);

  const earnedCount = allCertificates.filter(c => c.status === 'earned').length;
  const expiringSoon = allCertificates.filter(c => c.expiryDate && new Date(c.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and share your verified HSE certifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {earnedCount} Earned
          </span>
          {expiringSoon > 0 && (
            <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {expiringSoon} Expiring Soon
            </span>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={DocumentTextIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={earnedCount}
          label="Certificates Earned"
          subtitle="Verified credentials"
        />
        <StatCard
          icon={AwardIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={allCertificates.filter(c => c.template === 'specialist').length}
          label="Specialist"
          subtitle="Advanced certifications"
        />
        <StatCard
          icon={ShieldCheckIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value={allCertificates.filter(c => c.expiryDate && new Date(c.expiryDate) > new Date()).length}
          label="Active"
          subtitle="Currently valid"
        />
        <StatCard
          icon={CalendarIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={expiringSoon}
          label="Expiring Soon"
          subtitle="Within 90 days"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search certificates..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search certificates"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="earned">Earned</option>
            <option value="in-progress">In Progress</option>
            <option value="expired">Expired</option>
          </select>

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
        </div>
      </div>

      {/* Certificates Grid/List */}
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allCertificates.map(cert => (
              <CertificateCard key={cert.id} certificate={cert} onSelect={() => setSelectedCertificate(cert.id)} />
            ))}
        ) : (
          <div className="space-y-3">
            {allCertificates.map(cert => (
              <CertificateListItem key={cert.id} certificate={cert} onSelect={() => setSelectedCertificate(cert.id)} />
            ))}
          </div>
        )}

        {allCertificates.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No certificates yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Complete a learning pathway to earn your first certificate</p>
            <Link to="/paths" className="btn-primary">
              Browse Pathways
            </Link>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={allCertificates.find(c => c.id === selectedCertificate)}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

// Sub-components
function StatCard({ icon: Icon, iconColor, value, label, subtitle }: any) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', iconColor)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ certificate, onSelect }: { certificate: any; onSelect: (id: string) => void }) {
  const statusColors: Record<string, string> = {
    earned: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200',
    expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200',
  };

  const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date();

  return (
    <div className={cn('card relative overflow-hidden group', certificate.status === 'earned' ? 'border-l-4 border-l-green-500' : 'border-l-gray-200')}>
      <div className="absolute top-3 right-3">
        <span className={cn('badge text-xs', certificate.status === 'earned' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>
          {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                {certificate.frameworks[0] || 'HSE'}
              </span>
              {certificate.template === 'specialist' && (
                <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Specialist</span>
              )}
              {certificate.template === 'adnoc' && (
                <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">ADNOC</span>
              )}
              {certificate.template === 'adnoc' && (
                <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">ADNOC</span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{certificate.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{certificate.description}</p>
          </div>
          <div className="flex-shrink-0">
            <AwardIcon className="h-12 w-12 text-amber-500" aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.frameworks.slice(0, 3).map(fw => (
            <span key={fw} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{fw}</span>
          ))}
          {certificate.frameworks.length > 3 && (
            <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 text-xs">
              +{certificate.frameworks.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Issued: {new Date(certificate.issuedDate).toLocaleDateString()}
          </span>
          {certificate.expiryDate && (
            <span className={cn('flex items-center gap-1', new Date(certificate.expiryDate!) < new Date() ? 'text-red-600' : '')}>
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Expires: {new Date(certificate.expiryDate!).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary flex-1 sm:flex-none text-sm" onClick={() => window.open(certificate.verificationUrl, '_blank')}>
              <EyeIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Verify
            </button>
            <button className="btn-secondary flex-1 sm:flex-none text-sm">
              <DownloadIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Download PDF
            </button>
            <button className="btn-ghost flex-1 sm:flex-none">
              <ShareIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateListItem({ certificate, onSelect }: { certificate: any; onSelect: (id: string) => void }) {
  return (
    <div className="card flex items-center gap-4 p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(certificate.id)}>
      <div className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
        <AwardIcon className="h-8 w-8 text-amber-600" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{certificate.title}</h3>
          <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Earned</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{certificate.description}</p>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {new Date(certificate.issuedDate).toLocaleDateString()}
          </span>
          {certificate.expiryDate && (
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Expires: {new Date(certificate.expiryDate!).toLocaleDateString()}
            </span>
          )}
          <span className="flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {certificate.frameworks.slice(0, 2).join(', ')}
            {certificate.frameworks.length > 2 && ` +${certificate.frameworks.length - 2}`}
          </span>
        </div>
      </div>
      <ArrowRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
  );
}

function CertificateModal({ certificate, onClose }: { certificate: any; onClose: () => void }) {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{certificate.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{certificate.description}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <AwardIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{certificate.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{certificate.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {certificate.frameworks.map(fw => (
                  <span key={fw} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{fw}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Credential ID</p>
              <p className="font-mono text-sm text-gray-900 dark:text-white">{certificate.credentialId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Issued</p>
              <p className="font-medium text-gray-900 dark:text-white">{new Date(certificate.issuedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expires</p>
              <p className={cn('font-medium', certificate.expiryDate && new Date(certificate.expiryDate!) < new Date() ? 'text-red-600' : 'text-gray-900 dark:text-white')}>
                {certificate.expiryDate ? new Date(certificate.expiryDate!).toLocaleDateString() : 'No expiry'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{certificate.status}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Skills Verified</h3>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill: string) => (
                <span key={skill} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400">{skill}</span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Verification</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              This certificate can be verified at:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={certificate.verificationUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-mono text-gray-900 dark:text-white"
              />
              <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(certificate.verificationUrl)}>
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              QR code verification available at: <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{certificate.verificationUrl}</a>
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="btn-primary flex-1" onClick={() => window.open(certificate.verificationUrl, '_blank')}>
              <ExternalLinkIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Verify Online
            </button>
            <button className="btn-secondary" onClick={() => {/* PDF generation */}}>
              <DownloadIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Download PDF
            </button>
            <button className="btn-secondary" onClick={() => navigator.share({ title: certificate.title, url: certificate.verificationUrl })}>
              <ShareIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}