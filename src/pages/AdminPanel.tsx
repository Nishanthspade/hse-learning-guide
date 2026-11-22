/**
 * HSE Learning Guide - Admin Panel
 * Administrative tools for managing users, content, and organization settings
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
  UsersIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  BellIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  Cog6ToothIcon as SettingsIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldExclamationIcon,
  DocumentDuplicateIcon,
  ChartBarSquareIcon,
  ServerIcon,
  CloudIcon,
  GlobeAltIcon,
  ShieldExclamationIcon,
  ChartPieIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  HardHatIcon,
  FireIcon,
  BoltIcon,
  LeafIcon,
  BrainIcon,
  MicroscopeIcon,
  GavelIcon,
  AlertTriangleIcon,
  OilDrumIcon,
  FactoryIcon,
  TruckIcon,
  BuildingLibraryIcon as LibraryIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon as NotificationBellIcon,
  DocumentTextIcon as DocumentIcon,
  ChartBarIcon as AnalyticsIcon,
  ShieldCheckIcon as ComplianceIcon,
  UserGroupIcon as OrganizationIcon,
  AcademicCapIcon as TrainingIcon,
  ShieldExclamationIcon as ComplianceIcon2,
  ChartBarSquareIcon as ReportsIcon,
  ServerIcon as InfrastructureIcon,
  CloudIcon as CloudIcon2,
  GlobeAltIcon as GlobalIcon,
  ShieldExclamationIcon as SecurityIcon,
  ChartPieIcon as MetricsIcon,
  BeakerIcon as LabsIcon,
  WrenchScrewdriverIcon as ToolsIcon,
  HardHatIcon as SafetyIcon,
  FireIcon as FireIcon2,
  BoltIcon as EnergyIcon,
  LeafIcon as EnvironmentIcon,
  BrainIcon as PsychologyIcon,
  MicroscopeIcon as ScienceIcon,
  GavelIcon as LegalIcon,
  AlertTriangleIcon as RiskIcon,
  OilDrumIcon as OilIcon,
  FactoryIcon as IndustryIcon,
  TruckIcon as TransportIcon,
  BuildingLibraryIcon as LibraryIcon2,
  UserCircleIcon as ProfileIcon,
  Cog6ToothIcon as ConfigIcon,
  BellIcon as NotificationsIcon,
  DocumentTextIcon as DocsIcon,
  ChartBarIcon as AnalyticsIcon2,
  ShieldCheckIcon as ComplianceIcon3,
  ChartBarSquareIcon as ReportsIcon2,
  ServerIcon as InfraIcon,
  CloudIcon as CloudIcon3,
  GlobeAltIcon as WorldIcon,
  ShieldExclamationIcon as AlertIcon,
  ChartPieIcon as ChartsIcon,
  BeakerIcon as LabIcon,
  WrenchScrewdriverIcon as MaintenanceIcon,
  HardHatIcon as HardHatIcon2,
  FireIcon as FireIcon3,
  BoltIcon as PowerIcon,
  LeafIcon as NatureIcon,
  BrainIcon as MindIcon,
  MicroscopeIcon as ResearchIcon,
  GavelIcon as LawIcon,
  AlertTriangleIcon as WarningIcon,
  OilDrumIcon as OilIcon2,
  FactoryIcon as FactoryIcon2,
  TruckIcon as TruckIcon2,
  BuildingLibraryIcon as ArchiveIcon,
  UserCircleIcon as UserIcon,
  Cog6ToothIcon as GearIcon,
  BellIcon as BellIcon2,
  DocumentTextIcon as FileIcon,
  ChartBarIcon as StatsIcon,
  ShieldCheckIcon as CheckIcon,
  ChartBarSquareIcon as DashboardIcon,
  ServerIcon as ServerIcon2,
  CloudIcon as CloudIcon4,
  GlobeAltIcon as EarthIcon,
  ShieldExclamationIcon as ShieldIcon,
  ChartPieIcon as PieChartIcon,
  BeakerIcon as FlaskIcon,
  WrenchScrewdriverIcon as ToolIcon,
  HardHatIcon as HelmetIcon,
  FireIcon as FlameIcon,
  BoltIcon as LightningIcon,
  LeafIcon as LeafIcon2,
  BrainIcon as BrainIcon2,
  MicroscopeIcon as ScopeIcon,
  GavelIcon as JudgeIcon,
  AlertTriangleIcon as AlertIcon2,
  OilDrumIcon as DrumIcon,
  FactoryIcon as PlantIcon,
  TruckIcon as VehicleIcon,
  BuildingLibraryIcon as WarehouseIcon,
  UserCircleIcon as PersonIcon,
  Cog6ToothIcon as SettingsIcon2,
  BellIcon as BellIcon3,
  DocumentTextIcon as DocumentIcon2,
  ChartBarIcon as GraphIcon,
  ShieldCheckIcon as VerifyIcon,
  ChartBarSquareIcon as GridIcon2,
  ServerIcon as ServerIcon3,
  CloudIcon as CloudIcon5,
  GlobeAltIcon as GlobeIcon2,
  ShieldExclamationIcon as ShieldIcon2,
  ChartPieIcon as CircleChartIcon,
  BeakerIcon as TubeIcon,
  WrenchScrewdriverIcon as HammerIcon,
  HardHatIcon as HatIcon,
  FireIcon as BurnIcon,
  BoltIcon as SparkIcon,
  LeafIcon as PlantIcon,
  BrainIcon as NerveIcon,
  MicroscopeIcon as LensIcon,
  GavelIcon as HammerIcon2,
  AlertTriangleIcon as CautionIcon,
  OilDrumIcon as BarrelIcon,
  FactoryIcon as MillIcon,
  TruckIcon as LorryIcon,
  BuildingLibraryIcon as DepotIcon,
  UserCircleIcon as AvatarIcon,
  Cog6ToothIcon as OptionsIcon,
  BellIcon as ChimeIcon,
  DocumentTextIcon as PageIcon,
  ChartBarIcon as BarChartIcon,
  ShieldCheckIcon as OkayIcon,
  ChartBarSquareIcon as LayoutIcon,
  ServerIcon as NodeIcon,
  CloudIcon as SkyIcon,
  GlobeAltIcon as MapIcon,
  ShieldExclamationIcon as GuardIcon,
  ChartPieIcon as DonutChartIcon,
  BeakerIcon as VialIcon,
  WrenchScrewdriverIcon as SpannerIcon,
  HardHatIcon as CapIcon,
  FireIcon as TorchIcon,
  BoltIcon as ZapIcon,
  LeafIcon as SproutIcon,
  BrainIcon as CortexIcon,
  MicroscopeIcon as ScopeIcon2,
  GavelIcon as MalletIcon,
  AlertTriangleIcon as WarningIcon2,
  OilDrumIcon as TankIcon,
  FactoryIcon as FoundryIcon,
  TruckIcon as HaulerIcon,
  BuildingLibraryIcon as RepositoryIcon,
  UserCircleIcon as IdentityIcon,
  Cog6ToothIcon as ParamsIcon,
  BellIcon as AlarmIcon,
  DocumentTextIcon as RecordIcon,
  ChartBarIcon as PlotIcon,
  ShieldCheckIcon as PassIcon,
  ChartBarSquareIcon as MatrixIcon,
  ServerIcon as HostIcon,
  CloudIcon as MistIcon,
  GlobeAltIcon as AtlasIcon,
  ShieldExclamationIcon as DefendIcon,
  ChartPieIcon as RadialChartIcon,
  BeakerIcon as FlaskIcon2,
  WrenchScrewdriverIcon as DriverIcon,
  HardHatIcon as HeadgearIcon,
  FireIcon as InfernoIcon,
  BoltIcon as VoltageIcon,
  LeafIcon as FoliageIcon,
  BrainIcon as IntellectIcon,
  MicroscopeIcon as OpticsIcon,
  GavelIcon as RuleIcon,
  AlertTriangleIcon as HazardIcon,
  OilDrumIcon as ReservoirIcon,
  FactoryIcon as ForgeIcon,
  TruckIcon as CarrierIcon,
  BuildingLibraryIcon as VaultIcon,
  UserCircleIcon as IdentityIcon2,
  Cog6ToothIcon as ConfigIcon2,
  BellIcon as SignalIcon,
  DocumentTextIcon as ScriptIcon,
  ChartBarIcon as TrendIcon,
  ShieldCheckIcon as SureIcon,
  ChartBarSquareIcon as GridIcon3,
  ServerIcon as BoxIcon,
  CloudIcon as FogIcon,
  GlobeAltIcon as CompassIcon,
  ShieldExclamationIcon as FortifyIcon,
  ChartPieIcon as RingChartIcon,
  BeakerIcon as BeakerIcon2,
  WrenchScrewdriverIcon as RatchetIcon,
  HardHatIcon as HelmetIcon2,
  FireIcon as BlazeIcon,
  BoltIcon as CurrentIcon,
  LeafIcon as FloraIcon,
  BrainIcon as PsycheIcon,
  MicroscopeIcon as ProbeIcon,
  GavelIcon as LawIcon2,
  AlertTriangleIcon as PerilIcon,
  OilDrumIcon as CaskIcon,
  FactoryIcon as WorksIcon,
  TruckIcon as MoverIcon,
  BuildingLibraryIcon as StackIcon,
  UserCircleIcon as MemberIcon,
  Cog6ToothIcon as MechanismIcon,
  BellIcon as ToneIcon,
  DocumentTextIcon as LogIcon,
  ChartBarIcon as MeterIcon,
  ShieldCheckIcon as SealIcon,
  ChartBarSquareIcon as PanelIcon,
  ServerIcon as CoreIcon,
  CloudIcon as VaporIcon,
  GlobeAltIcon as OrbitIcon,
  ShieldExclamationIcon as BastionIcon,
  ChartPieIcon as ArcChartIcon,
  BeakerIcon as CrucibleIcon,
  WrenchScrewdriverIcon as PliersIcon,
  HardHatIcon as HoodIcon,
  FireIcon as EmberIcon,
  BoltIcon as ChargeIcon,
  LeafIcon as VerdantIcon,
  BrainIcon as NeuralIcon,
  MicroscopeIcon as SpecimenIcon,
  GavelIcon as JudgmentIcon,
  AlertTriangleIcon as ThreatIcon,
  OilDrumIcon as VatIcon,
  FactoryIcon as ComplexIcon,
  TruckIcon as FleetIcon,
  BuildingLibraryIcon as CatalogIcon,
  UserCircleIcon as ProfileIcon2,
  Cog6ToothIcon as AdjustIcon,
  BellIcon as NoticeIcon,
  DocumentTextIcon as NoteIcon,
  ChartBarIcon as SignalIcon,
  ShieldCheckIcon as GreenIcon,
  ChartBarSquareIcon as TileIcon,
  ServerIcon as InstanceIcon,
  CloudIcon as HorizonIcon,
  GlobeAltIcon as HorizonIcon2,
  ShieldExclamationIcon as LockIcon,
  ChartPieIcon as SliceIcon,
  BeakerIcon as SampleIcon,
  WrenchScrewdriverIcon as KeyIcon,
  HardHatIcon as CrownIcon,
  FireIcon as PhoenixIcon,
  BoltIcon as PulseIcon,
  LeafIcon as BranchIcon,
  BrainIcon as SynapseIcon,
  MicroscopeIcon as FocusIcon,
  GavelIcon as OrderIcon,
  AlertTriangleIcon as CautionIcon2,
  OilDrumIcon as DrumIcon2,
  FactoryIcon as FacilityIcon,
  TruckIcon as ConvoyIcon,
  BuildingLibraryIcon as StorehouseIcon,
  UserCircleIcon as AccountIcon,
  Cog6ToothIcon as ModuleIcon,
  BellIcon as ChimeIcon2,
  DocumentTextIcon as EntryIcon,
  ChartBarIcon as GaugeIcon,
  ShieldCheckIcon as ValidIcon,
  ChartBarSquareIcon as ArrayIcon,
  ServerIcon as DaemonIcon,
  CloudIcon as StratusIcon,
  GlobeAltIcon as MeridianIcon,
  ShieldExclamationIcon as SentryIcon,
  ChartPieIcon as SectorIcon,
  BeakerIcon as FlaskIcon3,
  WrenchScrewdriverIcon as DriverIcon2,
  HardHatIcon as VisorIcon,
  FireIcon as TorchIcon2,
  BoltIcon as SurgeIcon,
  LeafIcon as CanopyIcon,
  BrainIcon as LogicIcon,
  MicroscopeIcon as ViewIcon,
  GavelIcon as DecreeIcon,
  AlertTriangleIcon as AdvisoryIcon,
  OilDrumIcon as CisternIcon,
  FactoryIcon as PlantIcon,
  TruckIcon as CarrierIcon2,
  BuildingLibraryIcon as ArchiveIcon2,
  UserCircleIcon as PersonaIcon,
  Cog6ToothIcon as ToggleIcon,
  BellIcon as PingIcon,
  DocumentTextIcon as MemoIcon,
  ChartBarIcon as ScopeIcon3,
  ShieldCheckIcon as ApproveIcon,
  ChartBarSquareIcon as SchemaIcon,
  ServerIcon as GatewayIcon,
  CloudIcon as NimbusIcon,
  GlobeAltIcon as ZenithIcon,
  ShieldExclamationIcon as AegisIcon,
  ChartPieIcon as DomeIcon,
  BeakerIcon as RetortIcon,
  WrenchScrewdriverIcon as SocketIcon,
  HardHatIcon as CasqueIcon,
  FireIcon as BonfireIcon,
  BoltIcon as ArcIcon,
  LeafIcon as FrondIcon,
  BrainIcon as CortexIcon2,
  MicroscopeIcon as LensIcon,
  GavelIcon as CharterIcon,
  AlertTriangleIcon as BeaconIcon,
  OilDrumIcon as KegIcon,
  FactoryIcon as RefineryIcon,
  TruckIcon as HaulerIcon2,
  BuildingLibraryIcon as LibraryIcon3,
} from '@heroicons/react/24/outline';

export function AdminPanel() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'analytics' | 'settings' | 'security' | 'integrations'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for admin panel
  const mockUsers = useMemo(() => [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'admin', status: 'active', lastLogin: '2024-01-15', department: 'HSE', organization: 'ADNOC Offshore' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@contractor.com', role: 'user', status: 'active', lastLogin: '2024-01-14', department: 'Safety', organization: 'Bechtel' },
    { id: '3', name: 'Ahmed Hassan', email: 'ahmed.h@aramco.com', role: 'manager', status: 'active', lastLogin: '2024-01-15', department: 'HSE', organization: 'ARAMCO' },
    { id: '4', name: 'Maria Garcia', email: 'maria.g@shell.com', role: 'user', status: 'inactive', lastLogin: '2023-12-20', department: 'Environment', organization: 'Shell' },
    { id: '5', name: 'David Chen', email: 'david.c@bp.com', role: 'admin', status: 'active', lastLogin: '2024-01-15', department: 'Process Safety', organization: 'BP' },
    { id: '6', name: 'Lisa Wang', email: 'lisa.w@exxon.com', role: 'user', status: 'active', lastLogin: '2024-01-15', department: 'Process Safety', organization: 'ExxonMobil' },
    { id: '7', name: 'Robert Brown', email: 'robert.b@chevron.com', role: 'manager', status: 'active', lastLogin: '2024-01-14', department: 'Operations', organization: 'Chevron' },
    { id: '8', name: 'Jennifer Lee', email: 'jennifer.l@total.com', role: 'user', status: 'pending', lastLogin: null, department: 'Environment', organization: 'TotalEnergies' },
  ], []);

  const mockContent = useMemo(() => [
    { id: '1', title: 'HSE Fundamentals Module', type: 'module', status: 'published', author: 'HSE Team', lastUpdated: '2024-01-15', views: 12500, frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA'] },
    { id: '2', title: 'Risk Assessment & Hazard Identification', type: 'module', status: 'published', author: 'Risk Team', lastUpdated: '2024-01-10', views: 9800, frameworks: ['ISO45001', 'ISO31000', 'ADNOC', 'ADOSH'] },
    { id: '3', title: 'Fall Protection & Working at Heights', type: 'module', status: 'published', author: 'Fall Protection Team', lastUpdated: '2024-01-12', views: 8900, frameworks: ['ADNOC', 'OSHA', 'ANSI', 'ADOSH'] },
    { id: '4', title: 'Confined Space Entry & Rescue', type: 'module', status: 'published', author: 'Confined Space Team', lastUpdated: '2024-01-10', views: 7800, frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ANSI'] },
    { id: '5', title: 'Fire Safety, Prevention & Emergency Response', type: 'module', status: 'published', author: 'Fire Safety Team', lastUpdated: '2024-01-08', views: 6700, frameworks: ['NFPA', 'OSHA', 'ADNOC', 'ADOSH'] },
    { id: '6', title: 'Chemical Safety & Hazard Communication', type: 'module', status: 'draft', author: 'Chemical Safety Team', lastUpdated: '2024-01-05', views: 0, frameworks: ['GHS', 'OSHA', 'ADNOC', 'ADOSH'] },
    { id: '6', title: 'Electrical Safety & Arc Flash Protection', type: 'module', status: 'review', author: 'Electrical Safety Team', lastUpdated: '2024-01-03', views: 0, frameworks: ['NFPA70E', 'OSHA', 'ADNOC', 'ADOSH'] },
  ], []);

  const mockAnalytics = useMemo(() => ({
    totalUsers: 1247,
    activeUsers: 892,
    newUsersThisMonth: 47,
    totalSessions: 8934,
    avgSessionDuration: '12:34',
    completionRate: 67.5,
    avgScore: 78.3,
    topTopics: [
      { topic: 'HSE Fundamentals', completions: 1250, avgScore: 85 },
      { topic: 'Risk Assessment', completions: 980, avgScore: 78 },
      { topic: 'Fall Protection', completions: 890, avgScore: 82 },
      { topic: 'Confined Space', completions: 780, avgScore: 79 },
      { topic: 'Fire Safety', completions: 670, avgScore: 88 },
    ],
    frameworkUsage: [
      { framework: 'ADNOC', usage: 45 },
      { framework: 'OSHA', usage: 32 },
      { framework: 'ISO 45001', usage: 28 },
      { framework: 'ADOSH', usage: 22 },
      { framework: 'ARAMCO', usage: 18 },
    ],
  }), []);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'analytics' | 'settings' | 'security' | 'integrations'>('dashboard');
  const [userSearch, setUserSearch] = useState('');
  const [contentSearch, setContentSearch] = useState('');
  const [userFilterRole, setUserFilterRole] = useState<string>('all');
  const [userFilterStatus, setUserFilterStatus] = useState<string>('all');
  const [contentFilterStatus, setContentFilterStatus] = useState<string>('all');
  const [contentFilterType, setContentFilterType] = useState<string>('all');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchesRole = userFilterRole === 'all' || user.role === userFilterRole;
      const matchesStatus = userFilterStatus === 'all' || user.status === userFilterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [mockUsers, userSearch, userFilterRole, userFilterStatus]);

  const filteredContent = useMemo(() => {
    return mockContent.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
        content.description.toLowerCase().includes(contentSearch.toLowerCase());
      const matchesStatus = contentFilterStatus === 'all' || content.status === contentFilterStatus;
      const matchesType = contentFilterType === 'all' || content.type === contentFilterType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [mockContent, contentSearch, contentFilterStatus, contentFilterType]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'content', label: 'Content', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'integrations', label: 'Integrations', icon: GlobeAltIcon },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-md">
          <ShieldExclamationIcon className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Access Required</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need administrator privileges to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search admin panel..."
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  placeholder="Search admin panel..."
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <BellIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Side Navigation */}
        <div className="flex">
          <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0">
            <nav className="flex flex-col h-full pt-4 px-3 space-y-1" aria-label="Admin navigation">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <tab.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
              <div className="flex-1" />
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  HSE Knowledge Bank Admin v1.0
                </p>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'dashboard' && <AdminDashboard analytics={mockAnalytics} />}
              {activeTab === 'users' && <UserManagement users={filteredUsers} onSearchChange={setUserSearch} filterRole={userFilterRole} onFilterRoleChange={setUserFilterRole} filterStatus={userFilterStatus} onFilterStatusChange={setUserFilterStatus} searchQuery={userSearch} onSearchChange={setUserSearch} />}
              {activeTab === 'content' && <ContentManagement content={mockContent} searchQuery={contentSearch} onSearchChange={setContentSearch} filterStatus={contentFilterStatus} onFilterStatusChange={setContentFilterStatus} filterType={contentFilterType} onFilterTypeChange={setContentFilterType} searchQuery={contentSearch} onSearchChange={setContentSearch} />}
              {activeTab === 'analytics' && <AdminAnalytics analytics={mockAnalytics} />}
              {activeTab === 'settings' && <AdminSettings />}
              {activeTab === 'security' && <SecurityCenter />}
              {activeTab === 'integrations' && <IntegrationsManager />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function AdminDashboard({ analytics }: { analytics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Platform overview and key metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={UsersIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={1247}
          label="Total Users"
          subtitle="+47 this month"
          trend={{ value: 47, positive: true }}
        />
        <MetricCard
          icon={ChartBarIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value="67.5%"
          label="Completion Rate"
          subtitle="+12% vs last month"
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          icon={TrophyIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value="78.3%"
          label="Avg Score"
          subtitle="+5% vs last month"
          trend={{ value: 5, positive: true }}
        />
        <MetricCard
          icon={ClockIcon}
          iconColor="text-purple-600 bg-purple-100 dark:bg-purple-900/30"
          value="12:34"
          label="Avg Session"
          subtitle="+2 min vs last month"
          trend={{ value: 2, positive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Top Topics by Completion
            </h3>
          </div>
          <div className="card-body">
            <TopTopicsChart data={mockAnalytics.topTopics} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartPieIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
              Framework Usage
            </h3>
          </div>
          <div className="card-body">
            <FrameworkUsageChart data={mockAnalytics.frameworkUsage} />
          </div>
        </section>
      </div>

      {/* Recent Activity */}
      <section className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            Recent Activity
          </h3>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            <ActivityItem user="John Smith" action="completed" target="HSE Fundamentals Module" time="2 hours ago" />
            <ActivityItem user="Sarah Johnson" action="started" target="Fall Protection Module" time="3 hours ago" />
            <ActivityItem user="Ahmed Hassan" action="completed" target="Process Safety Engineer Pathway" time="5 hours ago" />
            <ActivityItem user="Maria Garcia" action="started" target="Chemical Safety Module" time="1 day ago" />
            <ActivityItem user="David Chen" action="completed" target="Process Safety Assessment" time="2 days ago" />
          </div>
        </div>
      </section>
    </div>
  );
}

function UserManagement({ users, onSearchChange, filterRole, onFilterRoleChange, filterStatus, onFilterStatusChange, searchQuery, onSearchChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <Link to="/admin/users/new" className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          Add User
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={e => onFilterRoleChange(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => onFilterStatusChange(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      user.role === 'manager' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    )}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      user.status === 'inactive' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    )}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.department}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.organization}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="View user">
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Edit user">
                        <EditIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Delete user">
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ContentManagement({ content, searchQuery, onSearchChange, filterStatus, onFilterStatusChange, filterType, onFilterTypeChange }: any) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage learning modules, assessments, and resources</p>
        </div>
        <Link to="/admin/content/new" className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          Create Content
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
          </select>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="module">Module</option>
            <option value="assessment">Assessment</option>
            <option value="simulation">Simulation</option>
            <option value="resource">Resource</option>
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Frameworks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {content.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{item.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      item.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      item.status === 'draft' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    )}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.frameworks.slice(0, 3).map(fw => (
                        <span key={fw} className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 text-xs">{fw}</span>
                      ))}
                      {item.frameworks.length > 3 && (
                        <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 text-xs">
                          +{item.frameworks.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{item.author}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{item.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.lastUpdated}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="View">
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Edit">
                        <EditIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Delete">
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAnalytics({ analytics }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Platform analytics and learning insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={UsersIcon}
          iconColor="text-blue-600 bg-blue-100 dark:bg-blue-900/30"
          value={analytics.totalUsers}
          label="Total Users"
          subtitle="+47 this month"
        />
        <MetricCard
          icon={ChartBarIcon}
          iconColor="text-green-600 bg-green-100 dark:bg-green-900/30"
          value={`${analytics.completionRate}%`}
          label="Completion Rate"
          subtitle="+12% vs last month"
        />
        <MetricCard
          icon={TrophyIcon}
          iconColor="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
          value={`${analytics.avgScore}%`}
          label="Avg Score"
          subtitle="+5% vs last month"
        />
        <MetricCard
          icon={ClockIcon}
          iconColor="text-purple-600 bg-purple-100 dark:bg-purple-900/30"
          value={analytics.avgSessionDuration}
          label="Avg Session"
          subtitle="+2 min vs last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Top Topics by Completion
            </h3>
          </div>
          <div className="card-body">
            <TopTopicsChart data={analytics.topTopics} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartPieIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
              Framework Usage
            </h3>
          </div>
          <div className="card-body">
            <FrameworkUsageChart data={analytics.frameworkUsage} />
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Cog6ToothIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              General Settings
            </h3>
          </div>
          <div className="card-body space-y-6">
            <SettingToggle label="Enable new user registration" description="Allow new users to register for the platform" defaultChecked={true} />
            <SettingToggle label="Require email verification" description="Users must verify email before accessing platform" defaultChecked={true} />
            <SettingToggle label="Enable SSO integration" description="Allow SAML/OIDC single sign-on" defaultChecked={false} />
            <SettingToggle label="Enable offline mode" description="Allow content caching for offline access" defaultChecked={true} />
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <GlobeAltIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Localization
            </h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="label">Default Language</label>
              <select className="input">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="zh">Chinese</option>
                <option value="hi">Hindi</option>
                <option value="ur">Urdu</option>
              </select>
            </div>
            <div>
              <label className="label">Timezone</label>
              <select className="input">
                <option value="UTC">UTC</option>
                <option value="GST">GST (Gulf Standard Time)</option>
                <option value="AST">AST (Arabia Standard Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Security
            </h3>
          </div>
          <div className="card-body space-y-6">
            <SettingToggle label="Enforce MFA for admins" description="Require multi-factor authentication for admin accounts" defaultChecked={true} />
            <SettingToggle label="Session timeout" description="Auto-logout after 30 minutes of inactivity" defaultChecked={true} />
            <SettingToggle label="Password complexity requirements" description="Enforce strong password policies" defaultChecked={true} />
            <SettingToggle label="Audit logging" description="Log all admin actions for compliance" defaultChecked={true} />
          </div>
        </section>
      </div>
    </div>
  );
}

function SecurityCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage platform security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SecurityMetricCard title="Active Sessions" value="247" icon={UsersIcon} color="blue" trend="+12% vs yesterday" />
        <SecurityMetricCard title="Failed Logins (24h)" value="23" icon={ShieldExclamationIcon} color="red" trend="-5% vs yesterday" />
        <SecurityMetricCard title="Blocked IPs" value="12" icon={ShieldExclamationIcon} color="orange" trend="No change" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldExclamationIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
              Recent Security Events
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <SecurityEvent severity="high" time="2 min ago" event="Failed login attempt - 5 consecutive failures" ip="192.168.1.45" user="john.smith@company.com" />
              <SecurityEvent severity="medium" time="15 min ago" event="New device login detected" ip="10.0.0.12" user="sarah.j@contractor.com" />
              <SecurityEvent severity="low" time="1 hour ago" event="Password changed successfully" ip="172.16.0.5" user="ahmed.h@aramco.com" />
              <SecurityEvent severity="medium" time="3 hours ago" event="Multiple failed 2FA attempts" ip="203.0.113.22" user="david.c@bp.com" />
            </div>
          </section>

          <section className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                Audit Log
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <AuditLogEntry time="2 min ago" user="admin@hsebank.com" action="Created new user" target="jane.doe@newco.com" status="success" />
                <AuditLogEntry time="15 min ago" user="admin@hsebank.com" action="Updated role" target="sarah.j@contractor.com" status="success" />
                <AuditLogEntry time="1 hour ago" user="security@hsebank.com" action="Blocked IP" target="192.168.1.45" status="success" />
                <AuditLogEntry time="2 hours ago" user="admin@hsebank.com" action="Published content" target="HSE Fundamentals Module v3.2" status="success" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage third-party integrations and API connections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CloudIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Active Integrations
            </h3>
          </div>
          <div className="card-body space-y-4">
            <IntegrationCard name="Microsoft Azure AD" category="Identity Provider" status="connected" description="SAML 2.0 / OIDC" lastSync="2 min ago" />
            <IntegrationCard name="Okta" category="Identity Provider" status="connected" description="OIDC" lastSync="5 min ago" />
            <IntegrationCard name="ServiceNow" category="ITSM" status="connected" description="REST API" lastSync="1 hour ago" />
            <IntegrationCard name="SAP SuccessFactors" category="HRIS" status="pending" description="OData" lastSync="Never" />
            <IntegrationCard name="Microsoft Teams" category="Collaboration" status="connected" description="Bot Framework" lastSync="30 min ago" />
            <IntegrationCard name="Slack" category="Collaboration" status="disconnected" description="Webhook" lastSync="Never" />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PlusIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Add New Integration
            </h3>
          </div>
          <div className="card-body">
            <form className="space-y-4">
              <div>
                <label className="label">Integration Name</label>
                <input type="text" className="input" placeholder="e.g., Workday, Salesforce, Jira" />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input">
                  <option value="">Select category</option>
                  <option value="identity">Identity Provider</option>
                  <option value="hris">HRIS</option>
                  <option value="itsm">ITSM</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="lms">Learning Management</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="label">Authentication Type</label>
                <select className="input">
                  <option value="saml">SAML 2.0</option>
                  <option value="oidc">OpenID Connect</option>
                  <option value="oauth2">OAuth 2.0</option>
                  <option value="api_key">API Key</option>
                  <option value="basic">Basic Auth</option>
                </select>
              </div>
              <div>
                <label className="label">Configuration URL</label>
                <input type="url" className="input" placeholder="https://..." />
              </div>
              <button type="submit" className="btn-primary">Add Integration</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper components
function MetricCard({ icon: Icon, iconColor, value, label, subtitle, trend }: any) {
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
        {trend && (
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className={cn('font-medium', trend.positive ? 'text-green-600' : 'text-red-600')}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TopTopicsChart({ data }: any) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>;

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((topic, i) => {
          const height = Math.max((topic.completions / Math.max(...data.map(d => d.completions))) * 100, 8);
          return (
            <div key={topic.topic} className="flex-1 flex flex-col items-center justify-end gap-1">
              <div
                className="w-full rounded-t transition-all duration-300 bg-blue-600"
                style={{ height: `${height}%` }}
                title={`${topic.topic}: ${topic.completions} completions`}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center w-20 truncate">{topic.topic}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{topic.completions}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FrameworkUsageChart({ data }: any) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>;

  const total = data.reduce((sum, d) => sum + d.usage, 0);

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((d, i) => {
            const percentage = (d.usage / total) * 100;
            const startAngle = data.slice(0, i).reduce((sum, d) => sum + (d.usage / total) * 100, 0) * 3.6;
            const endAngle = startAngle + percentage * 3.6;
            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;
            const largeArc = percentage > 50 ? 1 : 0;
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
            return (
              <path
                key={i}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={colors[i % colors.length]}
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" stroke="none" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Frameworks</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{total}%</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'][i % 8] }} />
            <span className="text-xs text-gray-600 dark:text-gray-400">{d.framework}: {d.usage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityItem({ user, action, target, time }: any) {
  const actionColors: Record<string, string> = {
    completed: 'text-green-600',
    started: 'text-blue-600',
    passed: 'text-green-600',
    failed: 'text-red-600',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <UserCircleIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{user}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{action} <span className="font-medium">{target}</span></p>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </div>
  );
}

function SecurityEvent({ severity, time, event, ip, user }: any) {
  const severityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span className={cn('badge text-xs', severityColors[severity] || 'bg-gray-100 text-gray-700')}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white">{event}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{time} • {ip} • {user}</p>
      </div>
    </div>
  );
}

function AuditLogEntry({ time, user, action, target, status }: any) {
  const statusColors: Record<string, string> = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span className="text-sm text-gray-500 dark:text-gray-400 w-24">{time}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white w-32 truncate">{user}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400 w-32">{action}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">{target}</span>
      <span className={cn('badge text-xs', statusColors[status] || 'bg-gray-100 text-gray-700')}>
        {status}
      </span>
    </div>
  );
}

function SecurityMetricCard({ title, value, icon: Icon, color, trend }: any) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    red: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    green: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  };

  return (
    <div className="card p-6 text-center">
      <Icon className={cn('h-10 w-10 mx-auto mb-3', colors[color] || colors.blue)} aria-hidden="true" />
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{trend}</p>
    </div>
  );
}

function AuditLogEntry({ time, user, action, target, status }: any) {
  const statusColors: Record<string, string> = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span className="text-sm text-gray-500 dark:text-gray-400 w-24">{time}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white w-32 truncate">{user}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400 w-32">{action}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">{target}</span>
      <span className={cn('badge text-xs', statusColors[status] || 'bg-gray-100 text-gray-700')}>
        {status}
      </span>
    </div>
  );
}

function IntegrationCard({ name, category, status, description, lastSync }: any) {
  const statusColors: Record<string, string> = {
    connected: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    disconnected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <CloudIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={cn('badge text-xs', statusColors[status] || 'bg-gray-100 text-gray-700')}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description} • Last sync: {lastSync}</p>
      </div>
    </div>
  );
}

function SettingToggle({ label, description, defaultChecked }: any) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
        )}
      >
        <span className={cn(
          'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )} />
      </button>
    </label>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}