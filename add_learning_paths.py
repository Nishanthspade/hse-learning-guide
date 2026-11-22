with open('src/data/modules.ts', 'r') as f:
    content = f.read()

# Add LEARNING_PATHS export at the end of the file
learning_paths_export = '''

// ============================================
// LEARNING PATHS (Enhanced with Gulf Pathways)
// ============================================

export const LEARNING_PATHS = [
  // Gulf Core Pathway
  {
    id: 'gulf-hse-officer-core',
    title: 'Gulf HSE Officer - Core Certification Pathway',
    description: 'Complete pathway to become a certified HSE Officer for Gulf operations (ADNOC, ADOSH, Aramco, UAE)',
    targetLevel: 'intermediate',
    targetRole: 'HSE Officer',
    estimatedHours: 180,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8, milestone: true },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10, milestone: true },
      { moduleId: 'adnoc-100-series', order: 3, required: true, estimatedHours: 20, milestone: true },
      { moduleId: 'adosh-framework', order: 4, required: true, estimatedHours: 30, milestone: true },
      { moduleId: 'uae-federal-laws', order: 5, required: true, estimatedHours: 15, milestone: true },
      { moduleId: 'aramco-gi-sas', order: 6, required: true, estimatedHours: 25, milestone: true },
      { moduleId: 'adnoc-golden-rules', order: 7, required: true, estimatedHours: 8, milestone: true },
      { moduleId: 'gulf-environmental', order: 8, required: true, estimatedHours: 12, milestone: true },
      { moduleId: 'gulf-cultural-welfare', order: 9, required: true, estimatedHours: 10, milestone: true },
      { moduleId: 'gulf-certifications', order: 10, required: true, estimatedHours: 8, milestone: true },
    ],
    prerequisites: [],
    certificationEligible: true,
    certificateTemplate: 'gulf-hse-officer-core',
  },
  // ADNOC Specialist Pathway
  {
    id: 'adnoc-hse-specialist',
    title: 'ADNOC HSE Specialist Pathway',
    description: 'Deep specialization in ADNOC 100/200/300 Series and Golden Rules for ADNOC Group operations',
    targetLevel: 'advanced',
    targetRole: 'ADNOC HSE Specialist',
    estimatedHours: 120,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8 },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10 },
      { moduleId: 'adnoc-100-series', order: 3, required: true, estimatedHours: 20, milestone: true },
      { moduleId: 'adnoc-200-series', order: 4, required: true, estimatedHours: 25, milestone: true },
      { moduleId: 'adnoc-300-series', order: 5, required: true, estimatedHours: 10, milestone: true },
      { moduleId: 'adnoc-golden-rules', order: 6, required: true, estimatedHours: 8, milestone: true },
    ],
    prerequisites: ['gulf-hse-officer-core'],
    certificationEligible: true,
    certificateTemplate: 'adnoc-hse-specialist',
  },
  // ADOSH Competent Person Pathway
  {
    id: 'adosh-competent-person',
    title: 'ADOSH Competent Person Certification Pathway',
    description: 'Pathway to ADOSH Competent Person certification for Abu Dhabi HSE Officers',
    targetLevel: 'intermediate',
    targetRole: 'ADOSH Competent Person',
    estimatedHours: 100,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8 },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10 },
      { moduleId: 'adosh-framework', order: 3, required: true, estimatedHours: 30, milestone: true },
      { moduleId: 'uae-federal-laws', order: 4, required: true, estimatedHours: 15, milestone: true },
      { moduleId: 'gulf-environmental', order: 5, required: true, estimatedHours: 12, milestone: true },
      { moduleId: 'gulf-cultural-welfare', order: 6, required: true, estimatedHours: 10, milestone: true },
    ],
    prerequisites: [],
    certificationEligible: true,
    certificateTemplate: 'adosh-competent-person',
  },
  // Aramco HSE Practitioner Pathway
  {
    id: 'aramco-hse-practitioner',
    title: 'Aramco HSE Practitioner Pathway',
    description: 'Pathway for Aramco site readiness: GI 2.100, SAS Standards, Life Saving Rules',
    targetLevel: 'intermediate',
    targetRole: 'Aramco HSE Practitioner',
    estimatedHours: 90,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8 },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10 },
      { moduleId: 'aramco-gi-sas', order: 3, required: true, estimatedHours: 25, milestone: true },
      { moduleId: 'gulf-environmental', order: 4, required: true, estimatedHours: 12 },
      { moduleId: 'gulf-cultural-welfare', order: 5, required: true, estimatedHours: 10 },
      { moduleId: 'gulf-certifications', order: 6, required: true, estimatedHours: 8 },
    ],
    prerequisites: [],
    certificationEligible: true,
    certificateTemplate: 'aramco-hse-practitioner',
  },
  // Qatar HSE Practitioner Pathway
  {
    id: 'qatar-hse-practitioner',
    title: 'Qatar HSE Practitioner Pathway',
    description: 'Pathway for Qatar operations: Labour Law, QCS, Civil Defence, QP Standards',
    targetLevel: 'intermediate',
    targetRole: 'Qatar HSE Practitioner',
    estimatedHours: 80,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8 },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10 },
      { moduleId: 'qatar-hse', order: 3, required: true, estimatedHours: 20, milestone: true },
      { moduleId: 'gulf-environmental', order: 4, required: true, estimatedHours: 12 },
      { moduleId: 'gulf-cultural-welfare', order: 5, required: true, estimatedHours: 10 },
      { moduleId: 'gulf-certifications', order: 6, required: true, estimatedHours: 8 },
    ],
    prerequisites: [],
    certificationEligible: true,
    certificateTemplate: 'qatar-hse-practitioner',
  },
  // Generic HSE Officer Foundation (original pathway enhanced)
  {
    id: 'hse-officer-foundation',
    title: 'HSE Officer Foundation (Global Standards)',
    description: 'Foundation pathway covering ISO 45001, OSHA, NEBOSH, IOSH core standards',
    targetLevel: 'beginner',
    targetRole: 'Junior HSE Officer',
    estimatedHours: 120,
    modules: [
      { moduleId: 'hse-fundamentals', order: 1, required: true, estimatedHours: 8, milestone: true },
      { moduleId: 'risk-assessment', order: 2, required: true, estimatedHours: 10, milestone: true },
      // Additional generic modules would be added here
    ],
    prerequisites: [],
    certificationEligible: false,
    certificateTemplate: 'hse-officer-foundation',
  },
];

// Helper functions for learning paths
export function getLearningPathById(pathId: string) {
  return LEARNING_PATHS.find(p => p.id === pathId);
}

export function getLearningPathsByLevel(level: string) {
  return LEARNING_PATHS.filter(p => p.targetLevel === level);
}
'''

# Append to the end of the file
with open('src/data/modules.ts', 'w') as f:
    f.write(content + learning_paths_export)

print('Added LEARNING_PATHS export')