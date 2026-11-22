/**
 * HSE Learning Guide - Type Definitions
 * Comprehensive type system for all HSE content, progress tracking, and user management
 */

// ============================================
// CORE ENUMS & CONSTANTS
// ============================================

export type UserLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';
export type ContentDifficulty = 'basic' | 'intermediate' | 'advanced' | 'expert';
export type HazardCategory = 
  | 'fall-protection'
  | 'confined-space'
  | 'fire-safety'
  | 'chemical-safety'
  | 'electrical-safety'
  | 'machine-guarding'
  | 'ppe'
  | 'ergonomics'
  | 'hazard-communication'
  | 'lockout-tagout'
  | 'scaffolding'
  | 'excavation'
  | 'crane-rigging'
  | 'welding-cutting'
  | 'working-at-heights'
  | 'respiratory-protection'
  | 'hearing-conservation'
  | 'heat-cold-stress'
  | 'bloodborne-pathogens'
  | 'emergency-response'
  | 'incident-investigation'
  | 'risk-assessment'
  | 'safety-management-systems'
  | 'regulatory-compliance'
  | 'environmental-protection'
  | 'industrial-hygiene'
  | 'behavioral-safety'
  | 'process-safety'
  | 'construction-safety'
  | 'oil-gas-safety'
  | 'transportation-safety';

export type StandardFramework = 'OSHA' | 'ISO45001' | 'NEBOSH' | 'IOSH' | 'ANSI' | 'NFPA' | 'EPA' | 'MSHA';

export type ContentType = 
  | 'lesson'
  | 'video'
  | 'illustration'
  | 'interactive'
  | 'quiz'
  | 'assessment'
  | 'case-study'
  | 'reference'
  | 'checklist'
  | 'procedure'
  | 'regulation';

export type CompletionStatus = 'not-started' | 'in-progress' | 'completed' | 'mastered';
export type QuizQuestionType = 'single-choice' | 'multiple-choice' | 'true-false' | 'drag-drop' | 'scenario' | 'hotspot';

// ============================================
// USER & PROGRESS TYPES
// ============================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: UserLevel;
  role?: string;
  organization?: string;
  certifications: Certification[];
  preferences: UserPreferences;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  highContrast: boolean;
  autoPlayVideos: boolean;
  showProgressIndicators: boolean;
  preferredStandards: StandardFramework[];
  dailyGoalMinutes: number;
  reminderTime?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  verified: boolean;
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  status: CompletionStatus;
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  timeSpentMinutes: number;
  quizScores: QuizAttempt[];
  completedLessons: string[];
  bookmarkedItems: string[];
  notes: UserNote[];
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptedAt: Date;
  answers: QuizAnswer[];
  timeSpentSeconds: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | string[];
  correct: boolean;
  timeSpentSeconds: number;
}

export interface UserNote {
  id: string;
  moduleId: string;
  lessonId?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

// ============================================
// CONTENT STRUCTURE TYPES
// ============================================

export interface HSEModule {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: HazardCategory;
  difficulty: ContentDifficulty;
  estimatedHours: number;
  prerequisites: string[]; // Module IDs
  learningObjectives: string[];
  standards: ModuleStandard[];
  tags: string[];
  thumbnail?: string;
  color: string;
  icon: string;
  lessons: Lesson[];
  assessments: Assessment[];
  resources: Resource[];
  caseStudies: CaseStudy[];
  checklists: Checklist[];
  procedures: Procedure[];
  glossary: GlossaryTerm[];
  faqs: FAQ[];
  version: string;
  lastUpdated: Date;
  contributors: Contributor[];
  reviewStatus: 'draft' | 'review' | 'approved' | 'archived';
}

export interface ModuleStandard {
  framework: StandardFramework;
  standardCode: string;
  title: string;
  url?: string;
  sections: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  difficulty: ContentDifficulty;
  estimatedMinutes: number;
  contentType: ContentType;
  content: LessonContent;
  illustrations: Illustration[];
  interactiveElements: InteractiveElement[];
  keyPoints: string[];
  references: Reference[];
  quizId?: string;
  prerequisites: string[]; // Lesson IDs
  learningObjectives: string[];
  tags: string[];
  accessibility: AccessibilityInfo;
}

export interface LessonContent {
  html: string;
  markdown?: string;
  sections: ContentSection[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'illustration' | 'video' | 'interactive' | 'callout' | 'table' | 'list';
  order: number;
  illustrations?: Illustration[];
  interactiveElement?: InteractiveElement;
}

export interface Illustration {
  id: string;
  title: string;
  description: string;
  altText: string;
  src: string;
  type: 'diagram' | 'photo' | 'infographic' | 'flowchart' | 'schematic' | '3d-model' | 'animation';
  width?: number;
  height?: number;
  caption?: string;
  source?: string;
  license?: string;
  annotations?: Annotation[];
  hotspots?: Hotspot[];
}

export interface Annotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  content: string;
  type: 'label' | 'callout' | 'warning' | 'info';
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  radius: number;
  title: string;
  description: string;
  linkTo?: string; // lesson ID or external URL
}

export interface InteractiveElement {
  id: string;
  type: 'scenario' | 'drag-drop' | 'hotspot' | 'simulation' | 'calculator' | 'inspection' | 'decision-tree';
  title: string;
  description: string;
  config: Record<string, unknown>;
  feedback: InteractiveFeedback;
}

export interface InteractiveFeedback {
  correct: string;
  incorrect: string;
  partial?: string;
  hints: string[];
}

export interface Reference {
  id: string;
  title: string;
  type: 'regulation' | 'standard' | 'guide' | 'article' | 'video' | 'tool';
  source: string;
  url?: string;
  publicationDate?: Date;
  relevance: string;
}

export interface AccessibilityInfo {
  hasTranscript: boolean;
  hasAudioDescription: boolean;
  hasClosedCaptions: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigable: boolean;
  colorBlindSafe: boolean;
}

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'formative' | 'summative' | 'practical' | 'simulation';
  passingScore: number; // percentage
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
  retakePolicy: RetakePolicy;
  certificateEligible: boolean;
}

export interface RetakePolicy {
  maxAttempts: number;
  cooldownHours: number;
  randomizedQuestions: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  explanation: string;
  difficulty: ContentDifficulty;
  points: number;
  tags: string[];
  standards: StandardFramework[];
  options?: QuizOption[];
  correctAnswer: string | string[];
  scenario?: ScenarioQuestion;
  dragDropConfig?: DragDropConfig;
  hotspotConfig?: HotspotConfig;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface ScenarioQuestion {
  description: string;
  context: string;
  options: ScenarioOption[];
  correctPath: string[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  consequence: string;
  nextStepId?: string;
  isCorrect: boolean;
}

export interface DragDropConfig {
  items: DragDropItem[];
  zones: DragDropZone[];
}

export interface DragDropItem {
  id: string;
  content: string;
  type: 'text' | 'image';
  src?: string;
}

export interface DragDropZone {
  id: string;
  label: string;
  acceptedItemIds: string[];
  maxItems?: number;
}

export interface HotspotConfig {
  imageSrc: string;
  hotspots: Hotspot[];
  question: string;
}

export interface Resource {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'tool' | 'template' | 'poster' | 'checklist' | 'procedure';
  url: string;
  fileSize?: string;
  downloadable: boolean;
  language: string;
  tags: string[];
}

export interface CaseStudy {
  id: string;
  moduleId: string;
  title: string;
  industry: string;
  scenario: string;
  rootCauses: string[];
  lessonsLearned: string[];
  preventiveMeasures: string[];
  regulationsViolated: ModuleStandard[];
  outcome: string;
  date?: Date;
  location?: string;
  references: Reference[];
  discussionQuestions: string[];
}

export interface Checklist {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'pre-task' | 'post-incident';
  items: ChecklistItem[];
  signOffRequired: boolean;
  digitalSignature: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
  reference?: string;
  hazardCategory?: HazardCategory;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Procedure {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  purpose: string;
  scope: string;
  responsibilities: ProcedureResponsibility[];
  steps: ProcedureStep[];
  requiredPPE: string[];
  requiredTools: string[];
  references: Reference[];
  relatedProcedures: string[];
  revisionHistory: ProcedureRevision[];
}

export interface ProcedureResponsibility {
  role: string;
  responsibilities: string[];
  authority: string;
}

export interface ProcedureStep {
  id: string;
  order: number;
  title: string;
  description: string;
  warnings: string[];
  illustrations?: Illustration[];
  estimatedMinutes: number;
  responsibleRole: string;
  verificationMethod?: string;
  acceptanceCriteria?: string;
}

export interface ProcedureRevision {
  version: string;
  date: Date;
  author: string;
  changes: string[];
  approvedBy: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: HazardCategory;
  synonyms: string[];
  relatedTerms: string[];
  standards: StandardFramework[];
  illustrationId?: string;
}

export interface FAQ {
  id: string;
  moduleId: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpfulCount: number;
  lastUpdated: Date;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  organization: string;
  credentials: string[];
  contributions: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetLevel: UserLevel;
  targetRole?: string;
  estimatedHours: number;
  modules: LearningPathModule[];
  prerequisites: string[];
  certificationEligible: boolean;
  certificateTemplate?: string;
}

export interface LearningPathModule {
  moduleId: string;
  order: number;
  required: boolean;
  estimatedHours: number;
  milestone?: boolean;
}

// ============================================
// NAVIGATION & UI TYPES
// ============================================

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: NavigationItem[];
  badge?: string;
  badgeColor?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface SearchResult {
  id: string;
  type: 'module' | 'lesson' | 'glossary' | 'procedure' | 'checklist' | 'case-study' | 'faq';
  title: string;
  description: string;
  moduleId: string;
  lessonId?: string;
  relevanceScore: number;
  highlights: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'completion' | 'mastery' | 'streak' | 'assessment' | 'special';
  criteria: AchievementCriteria;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementCriteria {
  type: 'module_complete' | 'path_complete' | 'quiz_score' | 'streak_days' | 'time_spent' | 'custom';
  value: number | string;
  moduleId?: string;
  pathId?: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: Date;
  progress?: number;
}

// ============================================
// ANALYTICS & REPORTING TYPES
// ============================================

export interface ModuleAnalytics {
  moduleId: string;
  totalEnrollments: number;
  completionRate: number;
  averageTimeHours: number;
  averageQuizScore: number;
  dropoutPoints: DropoutPoint[];
  difficultyRating: number;
  usefulnessRating: number;
}

export interface DropoutPoint {
  lessonId: string;
  lessonTitle: string;
  dropoutRate: number;
  commonReasons: string[];
}

export interface UserAnalytics {
  userId: string;
  totalLearningHours: number;
  modulesCompleted: number;
  currentStreakDays: number;
  longestStreakDays: number;
  averageQuizScore: number;
  strongestCategories: HazardCategory[];
  improvementAreas: HazardCategory[];
  certificatesEarned: number;
  achievementsUnlocked: number;
}

export interface OrganizationReport {
  organizationId: string;
  period: { start: Date; end: Date };
  totalUsers: number;
  activeUsers: number;
  completionRates: Record<string, number>;
  complianceStatus: ComplianceStatus[];
  riskAreas: RiskArea[];
}

export interface ComplianceStatus {
  framework: StandardFramework;
  requirement: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable';
  evidence?: string;
  dueDate?: Date;
}

export interface RiskArea {
  category: HazardCategory;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedUsers: number;
  recommendedActions: string[];
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

export interface SearchFilters {
  categories?: HazardCategory[];
  difficulties?: ContentDifficulty[];
  standards?: StandardFramework[];
  contentTypes?: ContentType[];
  tags?: string[];
  completed?: boolean;
  bookmarked?: boolean;
  dateRange?: { start: Date; end: Date };
}

export interface SortOption {
  field: 'title' | 'difficulty' | 'estimatedHours' | 'lastUpdated' | 'completionRate' | 'rating';
  direction: 'asc' | 'desc';
}

// ============================================
// OFFLINE & SYNC TYPES
// ============================================

export interface OfflineData {
  modules: HSEModule[];
  progress: UserProgress[];
  notes: UserNote[];
  lastSyncedAt: Date;
  pendingActions: PendingAction[];
}

export interface PendingAction {
  id: string;
  type: 'progress_update' | 'quiz_attempt' | 'note_create' | 'note_update' | 'bookmark';
  payload: Record<string, unknown>;
  createdAt: Date;
  retries: number;
}

// ============================================
// UTILITY TYPES
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

export type ModuleWithProgress = HSEModule & { progress?: UserProgress };
export type LessonWithProgress = Lesson & { progress?: { status: CompletionStatus; quizScore?: number } };