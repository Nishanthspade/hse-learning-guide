/**
 * Unified HSE Standards Knowledge Base
 * Comprehensive cross-referenced database of all major HSE standards
 * ADNOC | ADOSH | ISO | OSHA | ARAMCO | NEBOSH | IOSH | NFPA | API | IOGP
 */

import type { HazardCategory, StandardFramework } from '../types/hse';

// ============================================
// STANDARD FRAMEWORK DEFINITIONS
// ============================================

export interface StandardFrameworkDetail {
  id: StandardFramework;
  name: string;
  fullName: string;
  description: string;
  scope: string[];
  region: string;
  industry: string[];
  version: string;
  mandatory: boolean;
  certification: boolean;
  website: string;
  keyDocuments: StandardDocument[];
}

export interface StandardDocument {
  code: string;
  title: string;
  description: string;
  category: string;
  clauses?: string[];
  relatedStandards?: string[];
}

export const STANDARD_FRAMEWORKS: StandardFrameworkDetail[] = [
  {
    id: 'ADNOC',
    name: 'ADNOC',
    fullName: 'Abu Dhabi National Oil Company HSE Standards',
    description: 'Mandatory HSE standards for all ADNOC Group companies and contractors operating in Abu Dhabi oil & gas sector',
    scope: ['Upstream', 'Downstream', 'Midstream', 'Offshore', 'Onshore', 'Refining', 'Petrochemicals'],
    region: 'UAE (Abu Dhabi)',
    industry: ['Oil & Gas', 'Petrochemicals', 'Energy'],
    version: '2024',
    mandatory: true,
    certification: false,
    website: 'https://www.adnoc.ae',
    keyDocuments: [
      { code: 'ADNOC HSE Standards 100 Series', title: 'HSE Management System', description: 'Policy, Organization, Planning, Implementation, Contractor Management, Competence, Communication, Documentation, Monitoring, Audit', category: 'Management System', clauses: ['101-110'] },
      { code: 'ADNOC HSE Standards 200 Series', title: 'Operational HSE Standards', description: 'PTW, H2S, PSM, Mechanical Integrity, MOC, Fire Protection, Air Emissions, Water/Wastewater, Waste Management, Emergency Response', category: 'Operational', clauses: ['201-210'] },
      { code: 'ADNOC HSE Standards 300 Series', title: 'HSE Performance', description: 'KPIs, Reporting, Assurance, Improvement, Culture', category: 'Performance', clauses: ['301-305'] },
      { code: 'ADNOC Golden Rules', title: '10 Life-Saving Rules', description: 'Mandatory rules for all personnel: Permits, Isolation, Confined Space, Fall Protection, Driving, Alcohol/Drugs, PPE, Smoking, Reporting, Stop Work', category: 'Behavioral', clauses: ['GR1-GR10'] },
    ],
  },
  {
    id: 'ADOSH',
    name: 'ADOSH',
    fullName: 'Abu Dhabi Occupational Safety and Health System Framework',
    description: 'Regulatory framework by Abu Dhabi Department of Energy for occupational safety and health across all sectors in Abu Dhabi Emirate',
    scope: ['All Sectors', 'Construction', 'Manufacturing', 'Services', 'Government', 'Private Sector'],
    region: 'UAE (Abu Dhabi Emirate)',
    industry: ['All Industries'],
    version: '2023',
    mandatory: true,
    certification: true,
    website: 'https://www.doe.gov.ae',
    keyDocuments: [
      { code: 'ADOSH-SF', title: 'ADOSH System Framework', description: 'Core framework document defining requirements for OSH management systems in Abu Dhabi', category: 'Framework', clauses: ['Element 1-10'] },
      { code: 'ADOSH-Entity', title: 'Entity Level Requirements', description: 'Requirements for individual entities to implement OSH management systems', category: 'Implementation', clauses: [] },
      { code: 'ADOSH-Sector', title: 'Sector Specific Requirements', description: 'Additional requirements for high-risk sectors (construction, oil & gas, manufacturing)', category: 'Sector Specific', clauses: [] },
      { code: 'ADOSH-CoP', title: 'Codes of Practice', description: 'Detailed guidance for specific hazards (working at height, confined space, electrical, chemical, etc.)', category: 'Guidance', clauses: ['CoP 1-20'] },
    ],
  },
  {
    id: 'ISO45001',
    name: 'ISO45001',
    fullName: 'ISO 45001:2018 Occupational Health and Safety Management Systems',
    description: 'International standard for OH&S management systems, providing framework to improve employee safety, reduce workplace risks, and create better working conditions',
    scope: ['All Organizations', 'All Sizes', 'All Sectors', 'Global'],
    region: 'Global',
    industry: ['All Industries'],
    version: '2018',
    mandatory: false,
    certification: true,
    website: 'https://www.iso.org/standard/63787.html',
    keyDocuments: [
      { code: 'ISO 45001:2018', title: 'OH&S Management Systems - Requirements with guidance for use', description: 'Main standard document with 10 clauses following Annex SL structure', category: 'Standard', clauses: ['4-10'] },
      { code: 'ISO 45002', title: 'General guidelines for implementation', description: 'Guidance on implementing ISO 45001', category: 'Guidance', clauses: [] },
      { code: 'ISO 45003', title: 'Psychological health and safety at work', description: 'Guidelines for managing psychosocial risks', category: 'Guidance', clauses: [] },
      { code: 'ISO 45004', title: 'Performance evaluation', description: 'Guidance on performance evaluation of OH&S management systems', category: 'Guidance', clauses: [] },
    ],
  },
  {
    id: 'ISO14001',
    name: 'ISO14001',
    fullName: 'ISO 14001:2015 Environmental Management Systems',
    description: 'International standard for environmental management systems, helping organizations improve environmental performance through more efficient use of resources and reduction of waste',
    scope: ['All Organizations', 'All Sizes', 'All Sectors', 'Global'],
    region: 'Global',
    industry: ['All Industries'],
    version: '2015',
    mandatory: false,
    certification: true,
    website: 'https://www.iso.org/standard/60857.html',
    keyDocuments: [
      { code: 'ISO 14001:2015', title: 'Environmental Management Systems - Requirements with guidance for use', description: 'Main standard with 10 clauses following Annex SL', category: 'Standard', clauses: ['4-10'] },
      { code: 'ISO 14004', title: 'General guidelines for implementation', description: 'Guidance on implementing ISO 14001', category: 'Guidance', clauses: [] },
      { code: 'ISO 14031', title: 'Environmental performance evaluation', description: 'Guidelines for environmental performance evaluation', category: 'Guidance', clauses: [] },
      { code: 'ISO 14064', title: 'Greenhouse gases - Quantification and reporting', description: 'Standards for GHG accounting and verification', category: 'Standard', clauses: [] },
    ],
  },
  {
    id: 'ISO31000',
    name: 'ISO31000',
    fullName: 'ISO 31000:2018 Risk Management - Guidelines',
    description: 'International standard providing principles, framework, and process for managing risk across all types of organizations',
    scope: ['All Organizations', 'All Types of Risk', 'All Levels', 'Global'],
    region: 'Global',
    industry: ['All Industries'],
    version: '2018',
    mandatory: false,
    certification: false,
    website: 'https://www.iso.org/standard/65694.html',
    keyDocuments: [
      { code: 'ISO 31000:2018', title: 'Risk Management - Guidelines', description: 'Principles, framework, and process for risk management', category: 'Standard', clauses: ['4-6'] },
      { code: 'ISO 31010', title: 'Risk assessment techniques', description: 'Guidance on selection and application of risk assessment techniques', category: 'Guidance', clauses: [] },
      { code: 'ISO 31004', title: 'Guidance for implementation', description: 'Guidance for implementing ISO 31000', category: 'Guidance', clauses: [] },
    ],
  },
  {
    id: 'OSHA',
    name: 'OSHA',
    fullName: 'Occupational Safety and Health Administration Standards (USA)',
    description: 'US federal regulatory standards for workplace safety and health, legally enforceable in United States and widely referenced globally',
    scope: ['General Industry', 'Construction', 'Maritime', 'Agriculture', 'Federal Agencies'],
    region: 'United States (Global Reference)',
    industry: ['All Industries'],
    version: 'Current',
    mandatory: true,
    certification: false,
    website: 'https://www.osha.gov',
    keyDocuments: [
      { code: '29 CFR 1910', title: 'General Industry Standards', description: 'Comprehensive standards for general industry workplaces', category: 'Regulation', clauses: ['Subparts A-Z'] },
      { code: '29 CFR 1926', title: 'Construction Standards', description: 'Safety and health regulations for construction industry', category: 'Regulation', clauses: ['Subparts A-CC'] },
      { code: '29 CFR 1915', title: 'Maritime Standards - Shipyard Employment', description: 'Standards for shipyard employment', category: 'Regulation', clauses: ['Subparts A-G'] },
      { code: '29 CFR 1917', title: 'Marine Terminals', description: 'Safety standards for marine terminal operations', category: 'Regulation', clauses: ['Subparts A-H'] },
      { code: '29 CFR 1918', title: 'Longshoring', description: 'Safety standards for longshoring operations', category: 'Regulation', clauses: ['Subparts A-G'] },
      { code: '29 CFR 1904', title: 'Recordkeeping & Reporting', description: 'Recording and reporting occupational injuries and illnesses', category: 'Regulation', clauses: [] },
      { code: '29 CFR 1903', title: 'Inspections, Citations, Penalties', description: 'OSHA inspection and enforcement procedures', category: 'Regulation', clauses: [] },
    ],
  },
  {
    id: 'ARAMCO',
    name: 'ARAMCO',
    fullName: 'Saudi Aramco Safety Standards and Procedures',
    description: 'Comprehensive safety standards for Saudi Aramco operations, contractors, and facilities in Saudi Arabia',
    scope: ['Upstream', 'Downstream', 'Midstream', 'Offshore', 'Onshore', 'Refining', 'Chemicals', 'Power'],
    region: 'Saudi Arabia',
    industry: ['Oil & Gas', 'Petrochemicals', 'Power Generation'],
    version: '2024',
    mandatory: true,
    certification: false,
    website: 'https://www.aramco.com',
    keyDocuments: [
      { code: 'SAES', title: 'Saudi Aramco Engineering Standards', description: 'Engineering standards covering all disciplines (civil, mechanical, electrical, instrumentation, etc.)', category: 'Engineering Standard', clauses: ['SAES-A to SAES-Z'] },
      { code: 'SAS', title: 'Saudi Aramco Safety Standards', description: 'Safety standards covering PPE, PTW, Confined Space, H2S, Fall Protection, etc.', category: 'Safety Standard', clauses: ['SAS-001 to SAS-200'] },
      { code: 'SAM', title: 'Saudi Aramco Materials Standards', description: 'Material specifications and requirements', category: 'Material Standard', clauses: [] },
      { code: 'SAP', title: 'Saudi Aramco Procedures', description: 'Operational and safety procedures', category: 'Procedure', clauses: [] },
      { code: 'GI', title: 'General Instructions', description: 'Corporate general instructions including HSE', category: 'Corporate Instruction', clauses: ['GI 2.100 series (HSE)'] },
      { code: 'Contractor HSE', title: 'Contractor HSE Management Framework', description: 'Requirements for contractor HSE management, pre-qualification, and performance monitoring', category: 'Contractor Management', clauses: [] },
    ],
  },
  {
    id: 'NEBOSH',
    name: 'NEBOSH',
    fullName: 'National Examination Board in Occupational Safety and Health',
    description: 'UK-based examination board providing globally recognized HSE qualifications',
    scope: ['Training & Certification', 'All Levels', 'Global Recognition'],
    region: 'Global (UK Origin)',
    industry: ['All Industries'],
    version: 'Current',
    mandatory: false,
    certification: true,
    website: 'https://www.nebosh.org.uk',
    keyDocuments: [
      { code: 'IGC', title: 'International General Certificate', description: 'Level 3 qualification covering IGC1 (Management), IGC2 (Workplace Hazards), IGC3 (Practical)', category: 'Qualification', clauses: ['IGC1', 'IGC2', 'IGC3'] },
      { code: 'IDip', title: 'International Diploma', description: 'Level 6 qualification: Unit A (Management), Unit B (Hazardous Agents), Unit C (Workplace/Work Equipment), Unit D (Application)', category: 'Qualification', clauses: ['Unit A', 'Unit B', 'Unit C', 'Unit D'] },
      { code: 'IOGC', title: 'International Oil & Gas Certificate', description: 'Specialized certificate for oil & gas industry', category: 'Qualification', clauses: ['IOGC1', 'IOGC2'] },
      { code: 'PSE', title: 'Process Safety Management', description: 'Specialized qualification for process safety', category: 'Qualification', clauses: [] },
      { code: 'EnvDip', title: 'Environmental Diploma', description: 'Specialized environmental management qualification', category: 'Qualification', clauses: [] },
    ],
  },
  {
    id: 'IOSH',
    name: 'IOSH',
    fullName: 'Institution of Occupational Safety and Health',
    description: 'Chartered body for HSE professionals, providing training, membership, and professional development',
    scope: ['Professional Membership', 'Training', 'Chartered Status', 'Global'],
    region: 'Global (UK Origin)',
    industry: ['All Industries'],
    version: 'Current',
    mandatory: false,
    certification: true,
    website: 'https://www.iosh.com',
    keyDocuments: [
      { code: 'Managing Safely', title: 'IOSH Managing Safely', description: '3-day course for managers/supervisors covering risk assessment, hazard identification, investigation, performance measurement', category: 'Training', clauses: ['Module 1-7'] },
      { code: 'Working Safely', title: 'IOSH Working Safely', description: '1-day course for all workers covering basic HSE awareness', category: 'Training', clauses: [] },
      { code: 'Leading Safely', title: 'IOSH Leading Safely', description: 'Course for senior leaders on strategic HSE leadership', category: 'Training', clauses: [] },
      { code: 'Competency Framework', title: 'IOSH Competency Framework', description: 'Framework defining competencies for HSE professionals at different levels', category: 'Framework', clauses: [] },
      { code: 'Code of Conduct', title: 'IOSH Code of Conduct', description: 'Professional conduct requirements for members', category: 'Ethics', clauses: [] },
    ],
  },
  {
    id: 'NFPA',
    name: 'NFPA',
    fullName: 'National Fire Protection Association',
    description: 'Global nonprofit organization developing fire, electrical, and building safety codes and standards',
    scope: ['Fire Safety', 'Electrical Safety', 'Building Safety', 'Life Safety', 'Global'],
    region: 'Global (US Origin)',
    industry: ['All Industries', 'Construction', 'Oil & Gas', 'Manufacturing'],
    version: 'Current',
    mandatory: false,
    certification: false,
    website: 'https://www.nfpa.org',
    keyDocuments: [
      { code: 'NFPA 70', title: 'National Electrical Code (NEC)', description: 'Electrical installation requirements', category: 'Code', clauses: ['Chapters 1-9'] },
      { code: 'NFPA 70E', title: 'Electrical Safety in the Workplace', description: 'Electrical safety work practices, arc flash, PPE', category: 'Standard', clauses: [] },
      { code: 'NFPA 10', title: 'Portable Fire Extinguishers', description: 'Selection, installation, maintenance of fire extinguishers', category: 'Standard', clauses: [] },
      { code: 'NFPA 13', title: 'Sprinkler Systems', description: 'Installation of sprinkler systems', category: 'Standard', clauses: [] },
      { code: 'NFPA 25', title: 'Inspection, Testing, Maintenance of Water-Based Fire Protection Systems', description: 'ITM for fire protection systems', category: 'Standard', clauses: [] },
      { code: 'NFPA 30', title: 'Flammable and Combustible Liquids Code', description: 'Storage, handling, use of flammable liquids', category: 'Code', clauses: [] },
      { code: 'NFPA 72', title: 'Fire Alarm and Signaling Code', description: 'Fire alarm systems requirements', category: 'Code', clauses: [] },
      { code: 'NFPA 101', title: 'Life Safety Code', description: 'Building life safety requirements', category: 'Code', clauses: [] },
      { code: 'NFPA 472', title: 'Hazardous Materials Response', description: 'Competence of responders to hazmat incidents', category: 'Standard', clauses: [] },
      { code: 'NFPA 652', title: 'Fundamentals of Combustible Dust', description: 'Managing combustible dust hazards', category: 'Standard', clauses: [] },
    ],
  },
  {
    id: 'API',
    name: 'API',
    fullName: 'American Petroleum Institute Standards',
    description: 'Standards for oil and gas industry covering equipment, operations, safety, and environmental protection',
    scope: ['Oil & Gas Equipment', 'Operations', 'Safety', 'Environment', 'Global'],
    region: 'Global (US Origin)',
    industry: ['Oil & Gas', 'Petrochemicals'],
    version: 'Current',
    mandatory: false,
    certification: false,
    website: 'https://www.api.org',
    keyDocuments: [
      { code: 'API RP 750', title: 'Management of Process Hazards', description: 'PSM for petroleum refineries', category: 'Recommended Practice', clauses: [] },
      { code: 'API RP 754', title: 'Process Safety Performance Indicators', description: 'Tier 1, 2, 3 process safety event classification', category: 'Recommended Practice', clauses: [] },
      { code: 'API RP 756', title: 'Process Safety Management', description: 'PSM implementation guidance', category: 'Recommended Practice', clauses: [] },
      { code: 'API RP 54', title: 'Occupational Safety for Oil & Gas Well Drilling', description: 'Drilling safety practices', category: 'Recommended Practice', clauses: [] },
      { code: 'API RP 53', title: 'Blowout Prevention Equipment Systems', description: 'BOP requirements for drilling', category: 'Recommended Practice', clauses: [] },
      { code: 'API RP 510', title: 'Pressure Vessel Inspection Code', description: 'In-service inspection of pressure vessels', category: 'Standard', clauses: [] },
      { code: 'API RP 570', title: 'Piping Inspection Code', description: 'In-service inspection of piping systems', category: 'Standard', clauses: [] },
      { code: 'API RP 653', title: 'Tank Inspection, Repair, Alteration, Reconstruction', description: 'Atmospheric storage tank inspection', category: 'Standard', clauses: [] },
      { code: 'API RP 1169', title: 'Pipeline Construction Inspection', description: 'Pipeline construction inspector qualification', category: 'Standard', clauses: [] },
      { code: 'API RP 1173', title: 'Pipeline Safety Management Systems', description: 'PSMS for pipeline operations', category: 'Recommended Practice', clauses: [] },
    ],
  },
  {
    id: 'IOGP',
    name: 'IOGP',
    fullName: 'International Association of Oil & Gas Producers',
    description: 'Global industry association developing good practice guidelines for oil & gas industry safety',
    scope: ['Oil & Gas Operations', 'Global Good Practices', 'Incident Learning'],
    region: 'Global',
    industry: ['Oil & Gas'],
    version: 'Current',
    mandatory: false,
    certification: false,
    website: 'https://www.iogp.org',
    keyDocuments: [
      { code: 'IOGP Report 456', title: 'Process Safety Fundamentals', description: '10 fundamental principles for process safety', category: 'Guideline', clauses: ['PSF 1-10'] },
      { code: 'IOGP Report 459', title: 'Land Transportation Safety', description: 'Recommended practices for land transportation', category: 'Guideline', clauses: [] },
      { code: 'IOGP Report 365', title: 'Health Management in Oil & Gas', description: 'Occupational health management guidelines', category: 'Guideline', clauses: [] },
      { code: 'IOGP Report 510', title: 'Contractor HSE Management', description: 'Guidelines for managing contractor HSE', category: 'Guideline', clauses: [] },
      { code: 'IOGP Report 575', title: 'Human Factors in Process Safety', description: 'Human factors integration in process safety', category: 'Guideline', clauses: [] },
      { code: 'IOGP Report 434', title: 'Lifting Operations', description: 'Recommended practices for lifting operations', category: 'Guideline', clauses: [] },
      { code: 'IOGP Report 476', title: 'Well Operations', description: 'Recommended practices for well operations', category: 'Guideline', clauses: [] },
    ],
  },
  {
    id: 'CCPS',
    name: 'CCPS',
    fullName: 'Center for Chemical Process Safety (AIChE)',
    description: 'Global nonprofit providing technical guidance for process safety in chemical and petroleum industries',
    scope: ['Process Safety', 'Chemical Industry', 'Petroleum Industry', 'Risk Analysis'],
    region: 'Global (US Origin)',
    industry: ['Chemical', 'Petroleum', 'Pharmaceutical'],
    version: 'Current',
    mandatory: false,
    certification: false,
    website: 'https://www.aiche.org/ccps',
    keyDocuments: [
      { code: 'CCPS RBPS', title: 'Risk Based Process Safety (RBPS)', description: '20-element framework for process safety management', category: 'Guideline', clauses: ['Element 1-20'] },
      { code: 'CCPS LOPA', title: 'Layer of Protection Analysis', description: 'Simplified risk assessment methodology', category: 'Methodology', clauses: [] },
      { code: 'CCPS HAZOP', title: 'HAZOP Studies', description: 'Guidelines for conducting HAZOP studies', category: 'Methodology', clauses: [] },
      { code: 'CCPS MOC', title: 'Management of Change', description: 'Guidelines for MOC in process industries', category: 'Guideline', clauses: [] },
      { code: 'CCPS QRAs', title: 'Quantitative Risk Assessment', description: 'Guidelines for QRA in process industries', category: 'Methodology', clauses: [] },
    ],
  },
];

// ============================================
// UNIFIED TOPIC MAPPING
// ============================================

export interface TopicMapping {
  topicId: string;
  topicName: string;
  category: string;
  description: string;
  frameworks: Record<StandardFramework, TopicReference[]>;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
  prerequisites: string[];
  keyRegulations: string[];
  practicalApplications: string[];
  interviewQuestions: string[];
}

export interface TopicReference {
  framework: StandardFramework;
  documentCode: string;
  section: string;
  title: string;
  mandatory: boolean;
  notes?: string;
}

export const UNIFIED_TOPICS: TopicMapping[] = [
  // ========================================
  // FOUNDATIONAL TOPICS
  // ========================================
  {
    topicId: 'hse-fundamentals',
    topicName: 'HSE Fundamentals & Management Systems',
    category: 'Management System',
    description: 'Core HSE principles, management system frameworks, and organizational HSE culture',
    difficulty: 'beginner',
    estimatedHours: 8,
    prerequisites: [],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standards 100 Series', section: '101-110', title: 'HSE Management System', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-SF', section: 'Element 1-10', title: 'ADOSH System Framework', mandatory: true }],
      ISO45001: [{ framework: 'ISO45001', documentCode: 'ISO 45001:2018', section: 'Clauses 4-10', title: 'OH&S Management System', mandatory: true }],
      ISO14001: [{ framework: 'ISO14001', documentCode: 'ISO 14001:2015', section: 'Clauses 4-10', title: 'Environmental Management System', mandatory: false }],
      OSHA: [{ framework: 'OSHA', documentCode: '29 CFR 1903/1904', section: 'General Provisions', title: 'OSHA General Provisions', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'GI 2.100 Series', section: 'HSE Management', title: 'General Instructions HSE', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC1 Elements 1-5', title: 'Management of Health & Safety', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Modules 1-3', title: 'Introducing Managing Safely', mandatory: false }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 456', section: 'PSF 1-3', title: 'Leadership, Culture, Competence', mandatory: false }],
    },
    keyRegulations: ['UAE Federal Law 8/1980', 'ADOSH Decree', 'OSHA General Duty Clause'],
    practicalApplications: ['Develop HSE Policy', 'Create HSE Organization Chart', 'Set HSE Objectives & KPIs', 'Management Review'],
    interviewQuestions: [
      'Explain the PDCA cycle in ISO 45001',
      'Compare ADNOC 100 Series vs ISO 45001 clauses',
      'What are the ADNOC Golden Rules?',
      'How do you integrate ISO 45001 and ISO 14001?'
    ],
  },
  {
    topicId: 'risk-assessment',
    topicName: 'Risk Assessment & Management',
    category: 'Risk Management',
    description: 'Systematic approaches to identifying hazards, assessing risks, and implementing controls using various methodologies',
    difficulty: 'beginner',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 103', section: 'Planning', title: 'Risk Assessment in Planning', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Risk Assessment', section: 'Risk Assessment CoP', title: 'Risk Assessment Code of Practice', mandatory: true }],
      ISO45001: [{ framework: 'ISO45001', documentCode: 'ISO 45001:2018', section: 'Clause 6.1.2', title: 'Hazard Identification and Risk Assessment', mandatory: true }],
      ISO31000: [{ framework: 'ISO31000', documentCode: 'ISO 31000:2018', section: 'Clause 6', title: 'Risk Assessment Process', mandatory: false },
       { framework: 'ISO31000', documentCode: 'ISO 31010', section: 'Risk Assessment Techniques', title: 'Risk Assessment Techniques', mandatory: false }],
      OSHA: [{ framework: 'OSHA', documentCode: 'OSHA JHA', section: 'Job Hazard Analysis', title: 'Job Hazard Analysis', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-001', section: 'Risk Assessment', title: 'Saudi Aramco Risk Assessment Standard', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC1 Element 3', title: 'Risk Assessment', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 3', title: 'Assessing Risks', mandatory: false }],
      CCPS: [{ framework: 'CCPS', documentCode: 'CCPS RBPS', section: 'Element 3', title: 'Process Hazard Analysis', mandatory: false }],
    },
    keyRegulations: ['ADOSH Risk Assessment CoP', 'OSHA JHA Requirements', 'UAE Federal Law 8/1980 Art 91-101'],
    practicalApplications: ['Job Safety Analysis (JSA)', 'HIRA', 'HAZOP', 'LOPA', 'FMEA', 'Bowtie Analysis', 'Risk Matrix Development'],
    interviewQuestions: [
      'Explain the 5 steps of risk assessment',
      'Difference between HAZOP and LOPA',
      'How to develop a risk matrix?',
      'What is ALARP principle?'
    ],
  },
  {
    topicId: 'incident-investigation',
    topicName: 'Incident Investigation & Root Cause Analysis',
    category: 'Incident Management',
    description: 'Systematic approaches to investigating incidents, determining root causes, and implementing corrective actions',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 109', section: 'Incident Investigation', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Incident Investigation', section: 'Incident Investigation CoP', mandatory: true }],
      ISO45001: [{ framework: 'ISO45001', documentCode: 'ISO 45001:2018', section: 'Clause 10.2', title: 'Incident Investigation', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: 'OSHA Incident Investigation', section: 'Incident Investigation Procedures', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'GI 2.106', section: 'Incident Reporting & Investigation', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC1 Element 4', title: 'Incident Investigation', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 6', title: 'Investigating Accidents', mandatory: false }],
      CCPS: [{ framework: 'CCPS', documentCode: 'CCPS Guidelines', section: 'Incident Investigation', mandatory: false }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 456', section: 'PSF 9', title: 'Learning from Incidents', mandatory: false }],
    },
    keyRegulations: ['OSHA 1904 Recording', 'UAE Federal Law 8/1980', 'ADOSH Reporting Requirements'],
    practicalApplications: ['5 Whys', 'Fishbone Diagram', 'Fault Tree Analysis', 'Bowtie', 'ICAM', 'Tripod Beta', 'TapRooT'],
    interviewQuestions: [
      'Explain 5 Whys vs Fishbone vs Fault Tree',
      'Difference between immediate, underlying, root causes',
      'How to conduct effective witness interviews?',
      'What makes a good corrective action (SMART)?'
    ],
  },

  // ========================================
  // MAJOR HAZARD TOPICS
  // ========================================
  {
    topicId: 'fall-protection',
    topicName: 'Fall Protection & Working at Heights',
    category: 'Physical Hazards',
    description: 'Comprehensive fall protection including systems, equipment, rescue planning, and regulatory compliance',
    difficulty: 'intermediate',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 201', section: 'Working at Heights', title: 'Working at Heights in PTW', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Working at Height', section: 'Working at Height CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1926 Subpart M', section: '1926.500-503', title: 'Fall Protection (Construction)', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910 Subpart D', section: '1910.28-30', title: 'Walking-Working Surfaces (General Industry)', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-004', section: 'Fall Protection', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC2 Element 4', title: 'Working at Height', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 4', title: 'Common Hazards - Work at Height', mandatory: false }],
      ANSI: [{ framework: 'ANSI', documentCode: 'ANSI/ASSP Z359', section: 'Z359.1-Z359.14', title: 'Fall Protection Code', mandatory: false }],
    },
    keyRegulations: ['OSHA 1926.501', 'OSHA 1910.28', 'ADOSH Working at Height CoP', 'UAE Federal Law'],
    practicalApplications: ['Fall Protection Plan', 'PFAS Inspection', 'Anchor Certification', 'Rescue Plan', 'Swing Fall Calculation', 'Clearance Calculation'],
    interviewQuestions: [
      'Calculate fall clearance for 6ft lanyard with 3ft deceleration',
      'Difference between fall restraint and fall arrest',
      'When is 100% tie-off required?',
      'Rescue plan requirements per ADNOC/OSHA'
    ],
  },
  {
    topicId: 'confined-space',
    topicName: 'Confined Space Entry & Rescue',
    category: 'Physical Hazards',
    description: 'Permit-required confined space entry, atmospheric monitoring, ventilation, and rescue procedures',
    difficulty: 'advanced',
    estimatedHours: 14,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'respiratory-protection'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 201', section: 'Confined Space Entry', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Confined Space', section: 'Confined Space CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910.146', section: 'Permit-Required Confined Spaces', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1926 Subpart AA', section: '1926.1200-1213', title: 'Confined Spaces in Construction', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-003', section: 'Confined Space Entry', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC2 Element 5', title: 'Confined Spaces', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 4', title: 'Confined Spaces', mandatory: false }],
      ANSI: [{ framework: 'ANSI', documentCode: 'ANSI/ASSE Z117.1', section: 'Safety Requirements for Confined Spaces', mandatory: false }],
      NFPA: [{ framework: 'NFPA', documentCode: 'NFPA 350', section: 'Guide for Safe Confined Space Entry', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.146', 'OSHA 1926.1200', 'ADOSH Confined Space CoP'],
    practicalApplications: ['Permit Development', 'Atmospheric Testing', 'Ventilation Calculation', 'Rescue Plan', 'Attendant Duties', 'Entry Supervisor Role'],
    interviewQuestions: [
      'Define permit-required vs non-permit confined space',
      'Atmospheric testing sequence: O2, LEL, H2S',
      'Ventilation: 20 air changes/hour minimum',
      'Rescue: non-entry vs entry rescue'
    ],
  },
  {
    topicId: 'h2s-management',
    topicName: 'Hydrogen Sulfide (H2S) Management',
    category: 'Chemical Hazards',
    description: 'Comprehensive H2S management including detection, zoning, PPE, emergency response, and training',
    difficulty: 'advanced',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals', 'confined-space', 'respiratory-protection'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 202', section: 'Hydrogen Sulfide Management', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP H2S', section: 'H2S Code of Practice', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: '29 CFR 1910.1000', section: 'H2S PEL 20 ppm Ceiling', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-002', section: 'H2S Management', mandatory: true }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC2 Element 7', title: 'Hazardous Substances - H2S', mandatory: false }],
      API: [{ framework: 'API', documentCode: 'API RP 49/55', section: 'H2S Operations', mandatory: false }],
      OPITO: [{ framework: 'OPITO', documentCode: 'OPITO H2S Training', section: 'H2S Awareness & Emergency Response', mandatory: false }],
      ACGIH: [{ framework: 'ACGIH', documentCode: 'ACGIH TLV', section: 'H2S TLV-TWA 1 ppm, STEL 5 ppm', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.1000 Z-Table', 'ACGIH TLV', 'ADOSH H2S CoP', 'API RP 55'],
    practicalApplications: ['H2S Zoning (0-3)', 'Fixed/Portable Detection', 'SCBA vs Airline vs Escape Set', '10/15/20/30 ppm Action Levels', 'ERP Development'],
    interviewQuestions: [
      'H2S Zone definitions and PPE requirements',
      '10/15/20/30 ppm action levels',
      'SCBA vs Airline vs 10-min escape set',
      'Rescue in H2S environment - never enter without SCBA'
    ],
  },
  {
    topicId: 'process-safety',
    topicName: 'Process Safety Management (PSM)',
    category: 'Process Safety',
    description: 'Comprehensive PSM including 14 elements, PHA/HAZOP/LOPA, mechanical integrity, MOC, PSSR',
    difficulty: 'expert',
    estimatedHours: 24,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'chemical-safety', 'incident-investigation', 'lockout-tagout', 'emergency-response'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 203', section: 'Process Safety Management', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP PSM', section: 'Process Safety CoP', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: '29 CFR 1910.119', section: '14 PSM Elements', mandatory: true }],
      EPA: [{ framework: 'EPA', documentCode: '40 CFR 68', section: 'Risk Management Program (RMP)', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-PSM', section: 'Process Safety Management', mandatory: true }],
      API: [
        { framework: 'API', documentCode: 'API RP 750', section: 'PSM for Refineries', mandatory: false },
        { framework: 'API', documentCode: 'API RP 754', section: 'Tier 1/2/3 Indicators', mandatory: false },
        { framework: 'API', documentCode: 'API RP 756', section: 'PSM Implementation', mandatory: false }
      ],
      CCPS: [
        { framework: 'CCPS', documentCode: 'CCPS RBPS', section: '20 Elements', mandatory: false },
        { framework: 'CCPS', documentCode: 'CCPS HAZOP/LOPA/MOC', section: 'Methodologies', mandatory: false }
      ],
      IEC: [{ framework: 'IEC', documentCode: 'IEC 61511', section: 'Functional Safety - SIS', mandatory: false }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 456', section: 'PSF 4-8', title: 'Process Safety Fundamentals', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.119', 'EPA 40 CFR 68', 'ADNOC Standard 203', 'Seveso III Directive (EU)'],
    practicalApplications: ['PHA/HAZOP Facilitation', 'LOPA/SIL Determination', 'Mechanical Integrity Program', 'MOC Process', 'PSSR', 'API 754 Tier 1/2/3 Reporting'],
    interviewQuestions: [
      'List 14 PSM elements per OSHA 1910.119',
      'HAZOP vs LOPA vs FMEA - when to use each',
      'SIL determination process',
      'MOC for temporary vs permanent changes',
      'PSSR checklist key items'
    ],
  },
  {
    topicId: 'permit-to-work',
    topicName: 'Permit to Work (PTW) System',
    category: 'Operational Control',
    description: 'Comprehensive PTW system including permit types, authorization, isolation, gas testing, SIMOPS',
    difficulty: 'intermediate',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'lockout-tagout', 'confined-space', 'hot-work'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 201', section: 'Permit to Work System', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP PTW', section: 'PTW Code of Practice', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: 'OSHA PTW', section: '1910.147/1910.252/1926.350', title: 'PTW Related Standards', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-001', section: 'Permit to Work System', mandatory: true }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 343', section: 'PTW Systems', mandatory: false }],
      UKHSE: [{ framework: 'UKHSE', documentCode: 'HSG 250', section: 'Guidance on PTW Systems', mandatory: false }],
      NFPA: [{ framework: 'NFPA', documentCode: 'NFPA 51B', section: 'Fire Prevention During Hot Work', mandatory: false }],
    },
    keyRegulations: ['ADOSH PTW CoP', 'OSHA 1910.147', 'NFPA 51B'],
    practicalApplications: ['Permit Types (Hot, Cold, Confined, Height, Excavation, Electrical, Radiation)', 'Authorization Levels', 'Gas Testing', 'Isolation/LOTO', 'SIMOPS Coordination', 'Digital PTW'],
    interviewQuestions: [
      'PTW authorization levels: Area Authority, Issuing Authority, Performing Authority',
      'Gas testing: pre-entry, continuous, periodic',
      'SIMOPS: coordination, communication, hazard ID',
      'Permit suspension vs close-out'
    ],
  },
  {
    topicId: 'lockout-tagout',
    topicName: 'Lockout/Tagout (LOTO) & Energy Isolation',
    category: 'Operational Control',
    description: 'Energy control procedures for hazardous energy isolation including electrical, mechanical, hydraulic, pneumatic, chemical, thermal',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'electrical-safety'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 201', section: 'Isolation & LOTO in PTW', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP LOTO', section: 'LOTO Code of Practice', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: '29 CFR 1910.147', section: 'Control of Hazardous Energy', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-005', section: 'Lockout/Tagout', mandatory: true }],
      ANSI: [{ framework: 'ANSI', documentCode: 'ANSI/ASSE Z244.1', section: 'Control of Hazardous Energy', mandatory: false }],
      NFPA: [{ framework: 'NFPA', documentCode: 'NFPA 70E', section: 'Electrical Safety - LOTO', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.147', 'OSHA 1910.333', 'ANSI Z244.1'],
    practicalApplications: ['Energy Control Procedures', 'Lock/Tag Devices', 'Group LOTO', 'Shift Change', 'Contractor Coordination', 'Verification'],
    interviewQuestions: [
      '8 steps of LOTO procedure',
      'Group LOTO vs individual LOTO',
      'Verification methods: try, test, observe',
      'Contractor LOTO coordination'
    ],
  },
  {
    topicId: 'hot-work',
    topicName: 'Hot Work Safety & Fire Prevention',
    category: 'Fire Safety',
    description: 'Hot work permitting, fire watch, fire prevention, and fire protection systems',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals', 'fire-safety', 'permit-to-work'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 201', section: 'Hot Work Permit', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Hot Work', section: 'Hot Work CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910.252', section: 'Welding/Cutting General Industry', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1926.352', section: 'Fire Prevention - Welding/Cutting', mandatory: true }
      ],
      NFPA: [
        { framework: 'NFPA', documentCode: 'NFPA 51B', section: 'Fire Prevention During Hot Work', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 30', section: 'Flammable/Combustible Liquids', mandatory: false }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-006', section: 'Hot Work Safety', mandatory: true }],
      API: [{ framework: 'API', documentCode: 'API RP 2009', section: 'Safe Welding/Cutting Practices', mandatory: false }],
    },
    keyRegulations: ['NFPA 51B', 'OSHA 1910.252', 'OSHA 1926.352'],
    practicalApplications: ['Hot Work Permit', 'Fire Watch (30/60 min)', 'Combustible Removal (11m)', 'Fire Protection', 'PPE for Welding', 'Gas Cylinder Safety'],
    interviewQuestions: [
      'Fire watch duties and duration (30/60 min)',
      'Combustible removal radius: 11m/35ft',
      'Fire extinguisher within 15m/50ft',
      'Hot work on lined vessels/confined spaces'
    ],
  },

  // ========================================
  // CHEMICAL & ENVIRONMENTAL
  // ========================================
  {
    topicId: 'chemical-safety',
    topicName: 'Chemical Safety & Hazard Communication (HazCom/GHS)',
    category: 'Chemical Hazards',
    description: 'Chemical classification, SDS, labeling, storage, handling, spill response, and hazard communication',
    difficulty: 'intermediate',
    estimatedHours: 14,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 207/209', section: 'Air Emissions/Waste Management', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Chemical Safety', section: 'Chemical Safety CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910.1200', section: 'HazCom 2012 (GHS)', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.119', section: 'PSM - Chemical Inventory', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.1000', section: 'Air Contaminants (Z-Tables)', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-007', section: 'Chemical Safety', mandatory: true }],
      GHS: [{ framework: 'GHS', documentCode: 'UN GHS Rev. 10', section: 'Classification & Labeling', mandatory: false }],
      EPA: [
        { framework: 'EPA', documentCode: 'EPCRA', section: 'Emergency Planning & Community Right-to-Know', mandatory: true },
        { framework: 'EPA', documentCode: 'RMP', section: 'Risk Management Program', mandatory: true }
      ],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC2 Element 7', title: 'Hazardous Substances', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 4', title: 'Hazardous Substances', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.1200 (HazCom)', 'GHS Rev. 10', 'EPA EPCRA', 'EPA RMP'],
    practicalApplications: ['SDS Management (16 sections)', 'GHS Labeling (Pictograms, Signal Words, H/P Statements)', 'Chemical Inventory', 'Storage Segregation', 'Spill Response', 'Exposure Assessment'],
    interviewQuestions: [
      'GHS pictograms: 9 pictograms and meanings',
      'SDS 16 sections - which are mandatory?',
      'Signal words: Danger vs Warning',
      'H/P statements: H315 vs P280'
    ],
  },
  {
    topicId: 'environmental-management',
    topicName: 'Environmental Management & Compliance',
    category: 'Environmental',
    description: 'Air emissions, water discharge, waste management, spill response, EIA, and regulatory compliance',
    difficulty: 'advanced',
    estimatedHours: 16,
    prerequisites: ['hse-fundamentals', 'chemical-safety', 'incident-investigation'],
    frameworks: {
      ADNOC: [
        { framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 207', section: 'Air Emissions Management', mandatory: true },
        { framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 208', section: 'Water & Wastewater Management', mandatory: true },
        { framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 209', section: 'Waste Management', mandatory: true }
      ],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Environment', section: 'Environmental Protection CoP', mandatory: true }],
      ISO14001: [{ framework: 'ISO14001', documentCode: 'ISO 14001:2015', section: 'Clauses 4-10', title: 'Environmental Management System', mandatory: true }],
      EPA: [
        { framework: 'EPA', documentCode: 'Clean Air Act', section: 'Title V, NSPS, NESHAP', mandatory: true },
        { framework: 'EPA', documentCode: 'Clean Water Act', section: 'NPDES, SPCC, SWPPP', mandatory: true },
        { framework: 'EPA', documentCode: 'RCRA', section: 'Hazardous Waste Management', mandatory: true },
        { framework: 'EPA', documentCode: 'CERCLA/EPCRA', section: 'Superfund & Emergency Planning', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-008', section: 'Environmental Protection', mandatory: true }],
      IPIECA: [{ framework: 'IPIECA', documentCode: 'IPIECA Guidelines', section: 'Oil Spill Preparedness & Response', mandatory: false }],
      MARPOL: [{ framework: 'MARPOL', documentCode: 'MARPOL 73/78', section: 'Annexes I-VI', mandatory: false }],
    },
    keyRegulations: ['UAE Federal Law 24/1999', 'EAD Regulations', 'EPA CAA/CWA/RCRA', 'MARPOL'],
    practicalApplications: ['Stack Monitoring', 'Produced Water Management', 'Hazardous Waste Manifest', 'SPCC Plan', 'EIA Process', 'Flare Management', 'NORM Management'],
    interviewQuestions: [
      'Stack monitoring parameters: NOx, SOx, CO, PM',
      'Produced water discharge limits',
      'Hazardous waste manifest: generator/transporter/TSDF',
      'SPCC plan requirements: 1,320 gal aboveground'
    ],
  },

  // ========================================
  // OCCUPATIONAL HEALTH
  // ========================================
  {
    topicId: 'occupational-health',
    topicName: 'Occupational Health & Industrial Hygiene',
    category: 'Health Hazards',
    description: 'Exposure assessment, air sampling, noise, vibration, ergonomics, biological monitoring, and health surveillance',
    difficulty: 'advanced',
    estimatedHours: 18,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'chemical-safety'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 207/208', section: 'Occupational Health Monitoring', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Occ Health', section: 'Occupational Health CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910.1000', section: 'Air Contaminants', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.95', section: 'Occupational Noise Exposure', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.134', section: 'Respiratory Protection', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.1020', section: 'Access to Medical Records', mandatory: true }
      ],
      ACGIH: [{ framework: 'ACGIH', documentCode: 'TLVs and BEIs', section: 'Threshold Limit Values & Biological Exposure Indices', mandatory: false }],
      NIOSH: [{ framework: 'NIOSH', documentCode: 'NMAM', section: 'Manual of Analytical Methods', mandatory: false }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'IGC', section: 'IGC2 Element 8', title: 'Physical Agents', mandatory: false }],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 4', title: 'Health Hazards', mandatory: false }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 365', section: 'Health Management', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.1000', 'OSHA 1910.95', 'OSHA 1910.134', 'ACGIH TLVs'],
    practicalApplications: ['Air Sampling (NIOSH/OSHA Methods)', 'Noise Dosimetry', 'Heat Stress (WBGT)', 'Ergonomic Assessment (REBA/RULA)', 'Health Surveillance', 'Biological Monitoring'],
    interviewQuestions: [
      'TLV-TWA vs TLV-STEL vs TLV-C',
      'Noise dose calculation: 85 dBA = 100% dose',
      'Respirator APF: half-face=10, full-face=50, SCBA=10,000',
      'Heat stress: WBGT work/rest cycles'
    ],
  },

  // ========================================
  // EMERGENCY & CRISIS MANAGEMENT
  // ========================================
  {
    topicId: 'emergency-response',
    topicName: 'Emergency Response & Crisis Management',
    category: 'Emergency Management',
    description: 'ERP development, ICS, crisis communication, business continuity, and regulatory notification',
    difficulty: 'advanced',
    estimatedHours: 14,
    prerequisites: ['hse-fundamentals', 'fire-safety', 'incident-investigation', 'risk-assessment'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 210', section: 'Emergency Response & Crisis Management', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Emergency', section: 'Emergency Preparedness CoP', mandatory: true }],
      ISO22301: [{ framework: 'ISO22301', documentCode: 'ISO 22301:2019', section: 'Business Continuity Management', mandatory: false }],
      NFPA: [
        { framework: 'NFPA', documentCode: 'NFPA 1600', section: 'Continuity/Emergency/Crisis Management', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 101', section: 'Life Safety Code', mandatory: false }
      ],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910.38', section: 'Emergency Action Plans', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1910.120(q)', section: 'HAZWOPER Emergency Response', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'GI 2.107', section: 'Emergency Response', mandatory: true }],
      IPIECA: [{ framework: 'IPIECA', documentCode: 'Crisis Management Guide', section: 'Crisis Management', mandatory: false }],
      NCEMA: [{ framework: 'NCEMA', documentCode: 'NCEMA Standards', section: 'National Emergency Management', mandatory: true }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 456', section: 'PSF 10', title: 'Emergency Preparedness', mandatory: false }],
    },
    keyRegulations: ['OSHA 1910.38/39', 'NFPA 1600', 'NCEMA Requirements', 'UAE Federal Law'],
    practicalApplications: ['ERP Development', 'ICS Organization', 'Tabletop/Functional/Full-Scale Exercises', 'Crisis Communication', 'Business Continuity', 'Mutual Aid Agreements'],
    interviewQuestions: [
      'ICS roles: IC, Operations, Planning, Logistics, Finance, Safety, Liaison, PIO',
      'ERP vs Business Continuity Plan',
      'Crisis communication: golden hour',
      'Regulatory notification timelines'
    ],
  },
  {
    topicId: 'fire-safety',
    topicName: 'Fire Safety & Prevention',
    category: 'Fire Safety',
    description: 'Fire prevention, detection, suppression, evacuation, and fire protection systems',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 206', section: 'Fire Protection & Prevention', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Fire', section: 'Fire Safety CoP', mandatory: true }],
      OSHA: [
        { framework: 'OSHA', documentCode: '29 CFR 1910 Subpart L', section: 'Fire Protection (1910.155-165)', mandatory: true },
        { framework: 'OSHA', documentCode: '29 CFR 1926 Subpart F', section: 'Fire Protection (Construction)', mandatory: true }
      ],
      NFPA: [
        { framework: 'NFPA', documentCode: 'NFPA 10', section: 'Portable Fire Extinguishers', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 13', section: 'Sprinkler Systems', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 72', section: 'Fire Alarm Code', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 101', section: 'Life Safety Code', mandatory: false },
        { framework: 'NFPA', documentCode: 'NFPA 30', section: 'Flammable/Combustible Liquids', mandatory: false }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-009', section: 'Fire Protection', mandatory: true }],
    },
    keyRegulations: ['NFPA 10/13/72/101', 'OSHA 1910.157-165', 'NFPA 30'],
    practicalApplications: ['Fire Risk Assessment', 'Extinguisher Selection (PASS)', 'Sprinkler Design', 'Fire Alarm Zoning', 'Evacuation Planning', 'Fire Drills'],
    interviewQuestions: [
      'Fire classes: A, B, C, D, K and extinguisher types',
      'Sprinkler: wet vs dry vs pre-action vs deluge',
      'Fire alarm: conventional vs addressable',
      'Evacuation: RACE vs PASS'
    ],
  },

  // ========================================
  // CONSTRUCTION & OFFSHORE SPECIFIC
  // ========================================
  {
    topicId: 'construction-safety',
    topicName: 'Construction Safety Management',
    category: 'Sector Specific',
    description: 'Construction-specific hazards: excavation, scaffolding, cranes, steel erection, demolition, electrical, fall protection',
    difficulty: 'advanced',
    estimatedHours: 16,
    prerequisites: ['hse-fundamentals', 'fall-protection', 'excavation', 'scaffolding', 'crane-rigging', 'electrical-safety'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC Construction HSE', section: 'Construction Safety Requirements', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Construction', section: 'Construction Safety CoP', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: '29 CFR 1926', section: 'Construction Standards (All Subparts)', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-Construction', section: 'Construction Safety', mandatory: true }],
      ANSI: [{ framework: 'ANSI', documentCode: 'ANSI/ASSP A10 Series', section: 'Construction & Demolition Standards', mandatory: false }],
      NEBOSH: [{ framework: 'NEBOSH', documentCode: 'Construction Certificate', section: 'NCC1/NCC2', mandatory: false }],
    },
    keyRegulations: ['OSHA 1926 (All Subparts)', 'ADOSH Construction CoP', 'UAE Federal Law'],
    practicalApplications: ['Site Safety Plan (SSSP)', 'Competent Person Program', 'Focus Four Hazards', 'Steel Erection (Subpart R)', 'Demolition (Subpart T)', 'Underground Construction (Subpart S)'],
    interviewQuestions: [
      'OSHA Focus Four: Falls, Struck-by, Caught-in, Electrocution',
      'Competent person vs qualified person',
      'Steel erection: Subpart R requirements',
      'Excavation: competent person daily inspection'
    ],
  },
  {
    topicId: 'offshore-safety',
    topicName: 'Offshore HSE Operations',
    category: 'Sector Specific',
    description: 'Offshore-specific HSE: platforms, drilling rigs, marine operations, helicopter ops, SIMOPS, BSEE/SEMS compliance',
    difficulty: 'advanced',
    estimatedHours: 20,
    prerequisites: ['hse-fundamentals', 'process-safety', 'confined-space', 'h2s-management', 'fire-safety', 'emergency-response'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC Offshore HSE Standards', section: 'Offshore HSE', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Offshore', section: 'Offshore Safety CoP', mandatory: true }],
      BSEE: [{ framework: 'BSEE', documentCode: '30 CFR 250 (SEMS)', section: 'Safety & Environmental Management Systems', mandatory: true }],
      IOGP: [
        { framework: 'IOGP', documentCode: 'Report 456', section: 'PSF', mandatory: false },
        { framework: 'IOGP', documentCode: 'Report 459', section: 'Land Transportation Safety', mandatory: false }
      ],
      OPITO: [{ framework: 'OPITO', documentCode: 'OPITO Standards', section: 'Offshore Training (BOSIET/HUET/FOET)', mandatory: false }],
      IADC: [{ framework: 'IADC', documentCode: 'IADC HSE Guidelines', section: 'Drilling Contractor HSE', mandatory: false }],
      API: [{ framework: 'API', documentCode: 'API RP 75/75D/75H', section: 'Offshore Platform Safety', mandatory: false }],
      BSEE_SEMS: [{ framework: 'BSEE', documentCode: 'SEMS II/III', section: 'Safety & Environmental Management Systems', mandatory: true }],
    },
    keyRegulations: ['BSEE SEMS (30 CFR 250)', 'IOGP Guidelines', 'OPITO Training Standards'],
    practicalApplications: ['SEMS Implementation', 'BOP Testing', 'H2S Offshore', 'Helideck Operations (CAP 437)', 'Muster/Evacuation', 'SIMOPS Offshore', 'Marine Operations'],
    interviewQuestions: [
      'SEMS 4 pillars: Safety, Environment, Training, Audit',
      'BOP testing: weekly function, 14-day pressure, 21-day BSR',
      'SIMOPS: bridge document, joint risk assessment',
      'Helicopter: HUET/BOSIET, weight manifest, dangerous goods'
    ],
  },

  // ========================================
  // CONTRACTOR & SUPPLY CHAIN
  // ========================================
  {
    topicId: 'contractor-management',
    topicName: 'Contractor HSE Management',
    category: 'Supply Chain',
    description: 'Contractor pre-qualification, HSE plans, mobilization, performance monitoring, and demobilization',
    difficulty: 'advanced',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'incident-investigation', 'permit-to-work'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC HSE Standard 105', section: 'Contractor HSE Management', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Contractor', section: 'Contractor Management CoP', mandatory: true }],
      ISO45001: [{ framework: 'ISO45001', documentCode: 'ISO 45001 Clause 8.1.4', section: 'Procurement & Contractors', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: 'OSHA Multi-Employer', section: 'Multi-Employer Worksite Policy', mandatory: true }],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'Contractor HSE Framework', section: 'Contractor HSE Requirements', mandatory: true }],
      IOGP: [
        { framework: 'IOGP', documentCode: 'Report 423', section: 'Contractor HSE Management', mandatory: false },
        { framework: 'IOGP', documentCode: 'Report 510', section: 'Contractor HSE Management', mandatory: false }
      ],
      IOSH: [{ framework: 'IOSH', documentCode: 'Managing Safely', section: 'Module 5', title: 'Contractors', mandatory: false }],
    },
    keyRegulations: ['OSHA Multi-Employer Policy', 'ISO 45001 8.1.4', 'ADOSH Contractor CoP'],
    practicalApplications: ['Pre-qualification Questionnaire', 'CHSEP Review', 'Mobilization Audit', 'Monthly HSE Report', 'KPI Tracking (TRIR, LTIF)', 'Incentive/Penalty', 'Demobilization Review'],
    interviewQuestions: [
      'Contractor pre-qual: TRIR, LTIF, EMR, certifications',
      'CHSEP contents: risk assessments, org chart, emergency procedures',
      'SIMOPS with contractors: bridge document',
      'Contractor KPI: leading vs lagging indicators'
    ],
  },

  // ========================================
  // TRANSPORTATION & LOGISTICS
  // ========================================
  {
    topicId: 'transportation-safety',
    topicName: 'Transportation & Fleet Safety',
    category: 'Transportation',
    description: 'Fleet safety, driver management, vehicle maintenance, journey management, DOT compliance',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals', 'risk-assessment', 'incident-investigation'],
    frameworks: {
      ADNOC: [{ framework: 'ADNOC', documentCode: 'ADNOC Land Transport Safety', section: 'Transportation Safety', mandatory: true }],
      ADOSH: [{ framework: 'ADOSH', documentCode: 'ADOSH-CoP Transport', section: 'Transport Safety CoP', mandatory: true }],
      OSHA: [{ framework: 'OSHA', documentCode: 'OSHA General Duty', section: 'Vehicle Safety', mandatory: true }],
      DOT: [
        { framework: 'DOT', documentCode: '49 CFR 350-399', section: 'FMCSR', mandatory: true },
        { framework: 'DOT', documentCode: '49 CFR 40', section: 'Drug/Alcohol Testing', mandatory: true }
      ],
      ARAMCO: [{ framework: 'ARAMCO', documentCode: 'SAS-Transport', section: 'Transportation Safety', mandatory: true }],
      IOGP: [{ framework: 'IOGP', documentCode: 'Report 459', section: 'Land Transportation Safety', mandatory: false }],
      ANSI: [{ framework: 'ANSI', documentCode: 'ANSI/ASSE Z15.1', section: 'Motor Vehicle Operations', mandatory: false }],
      NSC: [{ framework: 'NSC', documentCode: 'NSC Defensive Driving', section: 'Driver Training', mandatory: false }],
    },
    keyRegulations: ['DOT FMCSR (49 CFR 350-399)', 'Drug/Alcohol (49 CFR 40)', 'ADOSH Transport CoP'],
    practicalApplications: ['Driver Qualification', 'HOS/ELD', 'Vehicle Inspection (DVIR)', 'Journey Management', 'Defensive Driving', 'Telematics', 'Drug/Alcohol Program'],
    interviewQuestions: [
      'HOS: 11hr driving, 14hr duty, 10hr off, 70hr/8days',
      'ELD mandate and exemptions',
      'Vehicle inspection: pre-trip, en-route, post-trip',
      'Journey management: risk assessment, check-in/out'
    ],
  },
];

// ============================================
// UNIFIED LEARNING PATHS
// ============================================

export interface UnifiedLearningPath {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  estimatedHours: number;
  modules: LearningPathModule[];
  certifications: string[];
  careerOutcomes: string[];
}

export interface LearningPathModule {
  topicId: string;
  order: number;
  required: boolean;
  milestone: boolean;
  estimatedHours: number;
}

export const UNIFIED_LEARNING_PATHS: UnifiedLearningPath[] = [
  {
    id: 'hse-officer-foundation',
    title: 'HSE Officer Foundation Program',
    description: 'Complete beginner-to-professional pathway covering all core HSE competencies across major standards (ISO, OSHA, ADNOC, ADOSH). Prepares for NEBOSH IGC, IOSH Managing Safely, and entry-level HSE roles.',
    targetAudience: 'New graduates, career changers, entry-level HSE personnel',
    estimatedHours: 120,
    certifications: ['NEBOSH IGC Ready', 'IOSH Managing Safely', 'OSHA 30hr', 'First Aid/CPR'],
    careerOutcomes: ['HSE Officer', 'Safety Coordinator', 'Junior HSE Advisor'],
    modules: [
      { topicId: 'hse-fundamentals', order: 1, required: true, milestone: true, estimatedHours: 8 },
      { topicId: 'risk-assessment', order: 2, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'incident-investigation', order: 3, required: true, milestone: true, estimatedHours: 10 },
      { topicId: 'fire-safety', order: 4, required: true, milestone: false, estimatedHours: 10 },
      { topicId: 'chemical-safety', order: 5, required: true, milestone: false, estimatedHours: 14 },
      { topicId: 'permit-to-work', order: 6, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'lockout-tagout', order: 7, required: true, milestone: true, estimatedHours: 10 },
      { topicId: 'fall-protection', order: 8, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'confined-space', order: 9, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'h2s-management', order: 10, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'hot-work', order: 11, required: false, estimatedHours: 10 },
      { topicId: 'occupational-health', order: 12, required: true, milestone: false, estimatedHours: 18 },
      { topicId: 'environmental-management', order: 13, required: true, milestone: false, estimatedHours: 16 },
      { topicId: 'emergency-response', order: 14, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'contractor-management', order: 15, required: true, milestone: false, estimatedHours: 12 },
      { topicId: 'transportation-safety', order: 16, required: false, estimatedHours: 10 },
    ],
  },
  {
    id: 'construction-hse-specialist',
    title: 'Construction HSE Specialist',
    description: 'Specialized pathway for construction safety professionals covering OSHA 1926, ADOSH Construction, and international best practices.',
    targetAudience: 'Construction safety officers, site supervisors, project HSE advisors',
    estimatedHours: 100,
    certifications: ['OSHA 30hr Construction', 'CHST', 'CSP Prep', 'NEBOSH Construction'],
    careerOutcomes: ['Construction Safety Manager', 'Site HSE Advisor', 'Competent Person'],
    modules: [
      { topicId: 'construction-safety', order: 1, required: true, milestone: true, estimatedHours: 16 },
      { topicId: 'fall-protection', order: 2, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'excavation', order: 3, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'scaffolding', order: 4, required: true, milestone: true, estimatedHours: 10 },
      { topicId: 'crane-rigging', order: 5, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'electrical-safety', order: 6, required: true, milestone: false, estimatedHours: 12 },
      { topicId: 'confined-space', order: 7, required: true, milestone: false, estimatedHours: 14 },
      { topicId: 'falling-objects', order: 8, required: false, estimatedHours: 8 },
      { topicId: 'crane-signaling', order: 9, required: false, estimatedHours: 8 },
      { topicId: 'steel-erection', order: 10, required: false, estimatedHours: 10 },
    ],
  },
  {
    id: 'oil-gas-hse-specialist',
    title: 'Oil & Gas HSE Specialist (ADNOC/ARAMCO/IOGP)',
    description: 'Comprehensive oil & gas HSE specialist pathway covering ADNOC, ARAMCO, IOGP, API, and BSEE standards for upstream, midstream, and downstream operations.',
    targetAudience: 'Oil & gas HSE professionals, offshore advisors, process safety engineers',
    estimatedHours: 140,
    certifications: ['NEBOSH IOGC', 'OPITO BOSIET/HUET', 'API 510/570/653', 'CSP', 'API 1169'],
    careerOutcomes: ['Offshore HSE Advisor', 'Process Safety Engineer', 'HSE Superintendent', 'Drilling HSE Advisor'],
    modules: [
      { topicId: 'adnoc-hse-framework', order: 1, required: true, milestone: true, estimatedHours: 16 },
      { topicId: 'aramco-safety-standards', order: 2, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'process-safety', order: 3, required: true, milestone: true, estimatedHours: 24 },
      { topicId: 'h2s-management', order: 4, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'offshore-safety', order: 5, required: true, milestone: true, estimatedHours: 20 },
      { topicId: 'permit-to-work', order: 6, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'process-safety', order: 7, required: true, milestone: true, estimatedHours: 24 },
      { topicId: 'emergency-response', order: 8, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'contractor-management', order: 9, required: true, milestone: false, estimatedHours: 12 },
      { topicId: 'environmental-management', order: 10, required: false, estimatedHours: 16 },
    ],
  },
  {
    id: 'process-safety-engineer',
    title: 'Process Safety Engineer Pathway',
    description: 'Deep technical pathway for process safety engineers covering PSM, HAZOP/LOPA, mechanical integrity, MOC, PSSR, and functional safety (SIS/SIL).',
    targetAudience: 'Process engineers, PSM coordinators, facility engineers moving to safety',
    estimatedHours: 120,
    certifications: ['CSP', 'CCPSC', 'TÜV Functional Safety Engineer', 'API 510/570/653'],
    careerOutcomes: ['Process Safety Engineer', 'PSM Coordinator', 'Functional Safety Engineer', 'Risk Analyst'],
    modules: [
      { topicId: 'process-safety', order: 1, required: true, milestone: true, estimatedHours: 24 },
      { topicId: 'chemical-safety', order: 2, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'risk-assessment', order: 3, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'occupational-health', order: 4, required: true, milestone: true, estimatedHours: 18 },
      { topicId: 'lockout-tagout', order: 5, required: true, milestone: true, estimatedHours: 10 },
      { topicId: 'fire-safety', order: 6, required: true, milestone: false, estimatedHours: 10 },
      { topicId: 'environmental-management', order: 7, required: false, estimatedHours: 16 },
      { topicId: 'incident-investigation', order: 8, required: true, milestone: true, estimatedHours: 10 },
    ],
  },
  {
    id: 'hse-manager-leadership',
    title: 'HSE Management & Leadership Pathway',
    description: 'Executive pathway for HSE managers and directors focusing on strategy, culture, governance, business integration, and regulatory strategy.',
    targetAudience: 'Senior HSE professionals, HSE managers, aspiring HSE directors',
    estimatedHours: 100,
    certifications: ['CSP', 'Chartered Fellow IOSH', 'MBA (HSE Focus)', 'ISO 45001 Lead Auditor'],
    careerOutcomes: ['HSE Manager', 'HSE Director', 'VP HSE', 'Chief HSE Officer'],
    modules: [
      { topicId: 'hse-fundamentals', order: 1, required: true, milestone: true, estimatedHours: 8 },
      { topicId: 'risk-assessment', order: 2, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'incident-investigation', order: 3, required: true, milestone: true, estimatedHours: 10 },
      { topicId: 'contractor-management', order: 4, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'environmental-management', order: 5, required: true, milestone: false, estimatedHours: 16 },
      { topicId: 'emergency-response', order: 6, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'process-safety', order: 7, required: false, estimatedHours: 24 },
      { topicId: 'construction-safety', order: 8, required: false, estimatedHours: 16 },
    ],
  },
  {
    id: 'aramco-adnoc-specialist',
    title: 'ADNOC & ARAMCO HSE Specialist',
    description: 'Dual-standard specialist pathway for professionals working in UAE and Saudi Arabia oil & gas sectors. Covers both ADNOC and ARAMCO requirements with cross-referencing.',
    targetAudience: 'HSE professionals in GCC oil & gas, contractors working both ADNOC and ARAMCO sites',
    estimatedHours: 100,
    certifications: ['NEBOSH IGC/IOGC', 'OPITO', 'ADNOC/ARAMCO Site Approval', 'CSP'],
    careerOutcomes: ['ADNOC HSE Advisor', 'ARAMCO HSE Coordinator', 'GCC HSE Specialist', 'Cross-border HSE Lead'],
    modules: [
      { topicId: 'adnoc-hse-framework', order: 1, required: true, milestone: true, estimatedHours: 16 },
      { topicId: 'aramco-safety-standards', order: 2, required: true, milestone: true, estimatedHours: 14 },
      { topicId: 'permit-to-work', order: 3, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'h2s-management', order: 4, required: true, milestone: true, estimatedHours: 12 },
      { topicId: 'process-safety', order: 5, required: true, milestone: true, estimatedHours: 24 },
      { topicId: 'offshore-safety', order: 6, required: false, estimatedHours: 20 },
      { topicId: 'contractor-management', order: 7, required: true, milestone: false, estimatedHours: 12 },
      { topicId: 'environmental-management', order: 8, required: false, estimatedHours: 16 },
    ],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTopicById(topicId: string): TopicMapping | undefined {
  return UNIFIED_TOPICS.find(t => t.topicId === topicId);
}

export function getFrameworkById(frameworkId: StandardFramework): StandardFrameworkDetail | undefined {
  return STANDARD_FRAMEWORKS.find(f => f.id === frameworkId);
}

export function getTopicsByCategory(category: string): TopicMapping[] {
  return UNIFIED_TOPICS.filter(t => t.category === category);
}

export function getTopicsByFramework(framework: StandardFramework): TopicMapping[] {
  return UNIFIED_TOPICS.filter(t => t.frameworks[framework] && t.frameworks[framework]!.length > 0);
}

export function getTopicsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'): TopicMapping[] {
  return UNIFIED_TOPICS.filter(t => t.difficulty === difficulty);
}

export function getLearningPathById(pathId: string): UnifiedLearningPath | undefined {
  return UNIFIED_LEARNING_PATHS.find(p => p.id === pathId);
}

export function getTopicsForPath(pathId: string): TopicMapping[] {
  const path = getLearningPathById(pathId);
  if (!path) return [];
  return path.modules
    .map(m => getTopicById(m.topicId))
    .filter((t): t is TopicMapping => t !== undefined);
}

export function getCrossReference(topicId: string, framework: StandardFramework): TopicReference[] {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  return topic.frameworks[framework] || [];
}

export function getAllCategories(): string[] {
  return [...new Set(UNIFIED_TOPICS.map(t => t.category))].sort();
}

export function getAllFrameworks(): StandardFramework[] {
  return STANDARD_FRAMEWORKS.map(f => f.id);
}

export function searchTopics(query: string): TopicMapping[] {
  const lower = query.toLowerCase();
  return UNIFIED_TOPICS.filter(t =>
    t.topicName.toLowerCase().includes(lower) ||
    t.description.toLowerCase().includes(lower) ||
    t.topicId.toLowerCase().includes(lower) ||
    Object.values(t.frameworks).flat().some(r => r.title.toLowerCase().includes(lower))
  );
}

export function getTopicProgress(topicId: string, userProgress: Record<string, any>): { completed: boolean; inProgress: boolean; score?: number } {
  const prog = userProgress[topicId];
  if (!prog) return { completed: false, inProgress: false };
  return {
    completed: prog.status === 'completed' || prog.status === 'mastered',
    inProgress: prog.status === 'in-progress',
    score: prog.quizScores?.[prog.quizScores.length - 1]?.percentage
  };
}