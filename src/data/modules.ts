/**
 * HSE Learning Guide - Module Definitions
 * Comprehensive curriculum: Generic + Gulf (ADNOC, ADOSH, ARAMCO, UAE, Qatar, Oman, Kuwait, Bahrain, GCC)
 * Taking a basic person to advanced HSE Officer level with full Gulf regulatory compliance
 */

import type {
  HSEModule,
  HazardCategory,
  ContentDifficulty,
  StandardFramework,
  Lesson,
  Illustration,
  Assessment,
  QuizQuestion,
  CaseStudy,
  Checklist,
  Procedure,
  GlossaryTerm,
  FAQ,
  Resource,
  ModuleStandard,
  QuizOption,
  ScenarioQuestion,
  ScenarioOption,
  ContentSection,
  InteractiveElement,
  Reference,
  ProcedureStep,
  ProcedureResponsibility,
  ChecklistItem,
} from '../types/hse';

// ============================================
// GULF STANDARD FRAMEWORK DEFINITIONS
// ============================================

const ADNOC_100_STANDARDS: ModuleStandard[] = [
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 101', title: 'HSE Policy & Leadership', sections: ['Policy Statement', 'Leadership Commitment', 'Accountability', 'Communication'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 102', title: 'HSE Organization & Responsibilities', sections: ['HSE Organization', 'Roles & Responsibilities', 'HSE Representatives', 'Competence Requirements'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 103', title: 'Planning & Risk Assessment', sections: ['HSE Planning', 'Risk Assessment Methodology', 'ALARP Demonstration', 'Objectives & Targets'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 104', title: 'Contractor HSE Management', sections: ['Pre-qualification', 'HSE Plans', 'Performance Monitoring', 'Contractor CMS'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 105', title: 'Competence & Training', sections: ['Training Matrix', 'HSE Passport', 'Competence Assurance', 'Refresher Training'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 106', title: 'Communication & Consultation', sections: ['HSE Committees', 'Toolbox Talks', 'HSE Meetings', 'External Communication'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 107', title: 'Documentation & Records', sections: ['Document Control', 'Record Retention', 'Electronic Systems', 'Access Control'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 108', title: 'Operational Control', sections: ['PTW System', 'MOC Process', 'Emergency Procedures', 'Safe Work Practices'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 109', title: 'Incident Investigation', sections: ['Reporting Requirements', 'Investigation Methodology', 'TapRooT®', '72-hour Report', 'Lessons Learned'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 110', title: 'Audit & Assurance', sections: ['Audit Protocol', 'Self-Verification', 'Independent Audit', 'Management Review', 'Certification'] },
];

const ADNOC_200_STANDARDS: ModuleStandard[] = [
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 201', title: 'PTW & Isolation', sections: ['PTW Types', 'Isolation Certificates', 'LOTO', 'Permit Validity', 'Handback Procedure'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 202', title: 'H2S Management', sections: ['H2S Contingency Plans', 'Detection & Monitoring', 'Rescue Requirements', 'PPE & Training', 'Community Alerting'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 203', title: 'Process Safety Management', sections: ['14 PSM Elements', 'PSSR', 'MOC', 'Mechanical Integrity', 'PHA/HAZOP', 'Operating Procedures'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 204', title: 'Mechanical Integrity', sections: ['Inspection Regimes', 'RBI Methodology', 'NDT Requirements', 'Equipment Certification', 'Defect Management'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 205', title: 'Management of Change', sections: ['MOC Types', 'Risk Assessment', 'Approval Matrix', 'Temporary Changes', 'Documentation Update'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 206', title: 'Fire Protection', sections: ['Fire Water Systems', 'Detection & Alarm', 'Suppression Systems', 'Passive Fire Protection', 'Firefighting Resources'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 207', title: 'Air Emissions', sections: ['Flare Management', 'LDAR Program', 'CEMS', 'Emission Limits', 'Reporting'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 208', title: 'Water & Wastewater', sections: ['Produced Water', 'Injection Water', 'Treatment Standards', 'Discharge Limits', 'Monitoring'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 209', title: 'Waste Management', sections: ['Classification', 'Manifest System', 'Storage', 'Transportation', 'Disposal Facilities'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 210', title: 'Emergency Response', sections: ['ERP Tiers', 'Mutual Aid', 'Drill Requirements', 'Crisis Management', 'Community Awareness'] },
];

const ADNOC_300_STANDARDS: ModuleStandard[] = [
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 301', title: 'HSE KPIs', sections: ['Leading Indicators', 'Lagging Indicators', 'TRIR Targets', 'Benchmarking', 'Dashboard Reporting'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 302', title: 'HSE Reporting', sections: ['Monthly Reports', 'Quarterly Reports', 'Annual Reports', 'Board Reporting', 'Regulatory Submission'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 303', title: 'Assurance', sections: ['Self-Verification', 'Independent Audit', 'Audit Scoring', 'Corrective Action Tracking', 'Closure Verification'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 304', title: 'Improvement', sections: ['Corrective Actions', 'Preventive Actions', 'Continuous Improvement', 'Best Practice Sharing', 'Innovation'] },
  { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 305', title: 'Culture', sections: ['Hearts & Minds', 'Safety Culture Survey', 'Behavioral Programs', 'Leadership Visibility', 'Worker Engagement'] },
];

const ADNOC_GOLDEN_RULES: ModuleStandard[] = [
  { framework: 'ADNOC', standardCode: 'ADNOC GR-1', title: 'Work Permits', sections: ['No work without valid permit', 'Permit types', 'Authorization', 'Display requirements'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-2', title: 'Isolation & LOTO', sections: ['Verify isolation before work', 'LOTO procedure', 'Verification', 'Group isolation'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-3', title: 'Confined Space', sections: ['No entry without permit & gas test', 'Standby person', 'Rescue plan', 'Continuous monitoring'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-4', title: 'Fall Protection', sections: ['100% tie-off above 1.8m', 'Anchor points', 'Rescue plan', 'Equipment inspection'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-5', title: 'Safe Driving', sections: ['Seatbelts mandatory', 'No mobile phone', 'Speed limits', 'Journey management', 'IVMS'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-6', title: 'Alcohol & Drugs', sections: ['Zero tolerance', 'Random testing', 'Pre-employment', 'Post-incident', 'Prescription declaration'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-7', title: 'PPE', sections: ['Mandatory PPE per task', 'FR clothing', 'Selection criteria', 'Maintenance', 'Replacement'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-8', title: 'Smoking', sections: ['Designated areas only', 'No smoking in hazardous areas', 'Disposal', 'Enforcement'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-9', title: 'Reporting', sections: ['Report all incidents & near-misses', '24-hour reporting', 'Investigation trigger', 'Lessons learned'] },
  { framework: 'ADNOC', standardCode: 'ADNOC GR-10', title: 'Stop Work Authority', sections: ['Right & duty to stop unsafe work', 'No retaliation', 'Resolution process', 'Documentation'] },
];

const ADOSH_FRAMEWORK: ModuleStandard[] = [
  { framework: 'ADOSH', standardCode: 'ADOSH Element 1', title: 'Policy', sections: ['Entity HSE Policy', 'CEO Signature', 'Communication', 'Review Cycle'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 2', title: 'Organizing', sections: ['HSE Organization Chart', 'Competent Persons', 'HSE Advisors', 'Resources'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 3', title: 'Planning & Implementation', sections: ['Risk Assessment Register', 'Control Measures', 'Legal Register', 'Objectives'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 4', title: 'Measuring Performance', sections: ['Active Monitoring', 'Reactive Monitoring', 'KPIs', 'Audit Program'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 5', title: 'Audit & Review', sections: ['Internal Audit', 'Management Review', 'Compliance Evaluation', 'Continual Improvement'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 6', title: 'Contractor Management', sections: ['Pre-qualification', 'HSE Requirements', 'Monitoring', 'Performance Evaluation'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 7', title: 'Training & Competence', sections: ['Training Needs Analysis', 'Approved Providers', 'Competence Records', 'Refresher Training'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 8', title: 'Consultation & Communication', sections: ['HSE Committees', 'Worker Participation', 'External Communication', 'Documentation'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 9', title: 'Documentation', sections: ['Document Control', 'Record Keeping', 'Retention', 'Accessibility'] },
  { framework: 'ADOSH', standardCode: 'ADOSH Element 10', title: 'Emergency Preparedness', sections: ['ERP', 'Drills', 'Civil Defence Coordination', 'Business Continuity'] },
];

const ADOSH_COPS: ModuleStandard[] = [
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 1', title: 'Risk Assessment', sections: ['Methodology', 'Risk Matrix', 'Hierarchy of Controls', 'Documentation', 'Review Triggers'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 2', title: 'Incident Investigation', sections: ['48-hour Reporting', 'Investigation Methodology', 'Root Cause Analysis', 'Corrective Actions', 'ADOSH Notification'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 3', title: 'Working at Height', sections: ['Risk Assessment', 'Scaffolding', 'Fall Arrest', 'Rescue Plan', 'Equipment Inspection', 'Competence'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 4', title: 'Confined Space', sections: ['Identification', 'Risk Assessment', 'Permit System', 'Gas Testing', 'Standby Person', 'Rescue', 'Equipment'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 5', title: 'Electrical Safety', sections: ['LOTO', 'Arc Flash', 'Competent Person', 'Testing', 'HV Procedures', 'PPE'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 6', title: 'Chemical Safety', sections: ['SDS Arabic/English', 'Labeling', 'Storage', 'Spill Response', 'Exposure Limits', 'Health Surveillance'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 7', title: 'Fire Safety', sections: ['Civil Defence Approval', 'Fire Wardens', 'Evacuation', 'Firefighting Equipment', 'Drills', 'Maintenance'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 8', title: 'Excavation', sections: ['Risk Assessment', 'Shoring', 'Daily Inspection', 'Permit', 'Underground Services', 'Access/Egress'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 9', title: 'Scaffolding', sections: ['Design', 'Tag System', 'Inspection Regime', 'Competence', 'Alterations', 'Dismantling'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 10', title: 'Lifting Operations', sections: ['Lift Plans', 'Competent Persons', 'Rigging', 'Equipment Certification', 'Exclusion Zones', 'Weather'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 11', title: 'PPE', sections: ['Selection', 'Standards', 'Training', 'Maintenance', 'Replacement', 'Record Keeping'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 12', title: 'Manual Handling', sections: ['Risk Assessment', 'Mechanical Aids', 'Training', 'Team Lifting', 'Ergonomics'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 13', title: 'Noise & Vibration', sections: ['Exposure Limits', 'Assessment', 'Control Measures', 'Health Surveillance', 'Hearing Protection'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 14', title: 'Asbestos', sections: ['Survey', 'Management Plan', 'Licensed Contractors', 'Air Monitoring', 'Waste Disposal', 'Training'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 15', title: 'Radiation', sections: ['Ionizing', 'Non-ionizing', 'Permits', 'Monitoring', 'Shielding', 'Emergency Procedures'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 16', title: 'Heat Stress', sections: ['WBGT Monitoring', 'Work/Rest Cycles', 'Acclimatization', 'Hydration', 'Medical Surveillance', 'Emergency Response'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 17', title: 'Occupational Health', sections: ['Medical Surveillance', 'Fitness to Work', 'Health Records', 'Biological Monitoring', 'Ergonomics', 'Wellness'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 18', title: 'First Aid', sections: ['Civil Defence Approved', 'Ratios', 'Training', 'Facilities', 'Equipment', 'Recording'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 19', title: 'Housekeeping', sections: ['5S', 'Waste Management', 'Walkways', 'Storage', 'Spill Control', 'Inspections'] },
  { framework: 'ADOSH', standardCode: 'ADOSH CoP 20', title: 'Sector Specific - Oil & Gas', sections: ['Additional ADNOC Alignment', 'Process Safety', 'Offshore', 'Drilling', 'Pipeline', 'Refining'] },
];

const UAE_FEDERAL_LAWS: ModuleStandard[] = [
  { framework: 'UAE', standardCode: 'Federal Law 8/1980', title: 'Labour Law', sections: ['Art 91-101: HSE Obligations', 'Working Hours', 'Leave', 'Termination', 'Penalties', 'Dispute Resolution'] },
  { framework: 'UAE', standardCode: 'Federal Law 24/1999', title: 'Environment Protection', sections: ['EIA Requirements', 'Permits', 'Pollution Control', 'Waste Management', 'Marine Protection', 'Penalties'] },
  { framework: 'UAE', standardCode: 'Federal Law 33/2021', title: 'New Labour Law', sections: ['Updated HSE Provisions', 'Remote Work', 'Flexible Hours', 'Anti-discrimination', 'End of Service', 'Penalties'] },
  { framework: 'UAE', standardCode: 'Ministerial Decree 32/1982', title: 'Safety & Health General Requirements', sections: ['General Safety', 'Machinery Guarding', 'Ventilation', 'Lighting', 'Sanitation', 'First Aid'] },
  { framework: 'UAE', standardCode: 'Ministerial Decree 37/1982', title: 'Medical Examination', sections: ['Pre-employment', 'Periodic', 'Occupational Disease', 'Fitness to Work', 'Records'] },
  { framework: 'UAE', standardCode: 'Ministerial Decree 4/1981', title: 'Occupational Diseases', sections: ['Schedule of Diseases', 'Reporting Requirements', 'Compensation', 'Prevention', 'Investigation'] },
  { framework: 'UAE', standardCode: 'Abu Dhabi Law 19/2005', title: 'ADOSH Establishment', sections: ['Regulatory Framework', 'Powers', 'Inspections', 'Enforcement', 'Appeals'] },
  { framework: 'UAE', standardCode: 'ADOSH Decree 42/2009', title: 'OSH Management System Mandatory', sections: ['Scope', 'Requirements', 'Certification', 'Audit', 'Penalties'] },
  { framework: 'UAE', standardCode: 'Civil Defence Law', title: 'Fire & Life Safety Code (UAE Fire Code)', sections: ['Building Classification', 'Fire Protection', 'Means of Egress', 'Fire Alarm', 'Firefighting', 'Inspections'] },
  { framework: 'UAE', standardCode: 'Dubai Municipality Code', title: 'Construction Safety Local Amendments', sections: ['Site Safety', 'Scaffolding', 'Excavation', 'Cranes', 'High-rise', 'Penalties'] },
];

const ARAMCO_GI: ModuleStandard[] = [
  { framework: 'ARAMCO', standardCode: 'GI 2.101', title: 'HSE Management System', sections: ['12 Elements', 'Line Management Accountability', 'HSE Goals', 'Performance Measurement'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.102', title: 'HSE Planning', sections: ['Annual HSE Plans', 'Objectives & Targets', 'Resource Allocation', 'Schedule'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.103', title: 'Risk Assessment', sections: ['Aramco Risk Matrix', 'ALARP', 'Bowtie Analysis', 'Risk Register', 'Review'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.104', title: 'Contractor HSE Management', sections: ['Contractor Categories', 'HSE Plans', 'Pre-qualification', 'Performance Monitoring', 'Incentives'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.105', title: 'Training & Competence', sections: ['Aramco HSE Induction', 'Certification Requirements', 'Competence Assurance', 'Refresher Training'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.106', title: 'Incident Reporting & Investigation', sections: ['Classification', '24-hour Reporting', 'TapRooT®', 'Root Cause', 'Lessons Learned', 'Trending'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.107', title: 'Audit & Inspection', sections: ['Audit Protocol', 'Scoring Methodology', 'Self-Assessment', 'Independent Audit', 'Corrective Actions'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.108', title: 'Emergency Preparedness', sections: ['ERP', 'Community Awareness', 'Drills', 'Mutual Aid', 'Crisis Management', 'Business Continuity'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.109', title: 'Occupational Health', sections: ['Medical Surveillance', 'Industrial Hygiene', 'Exposure Assessment', 'Health Records', 'Fitness to Work'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.110', title: 'Environmental Protection', sections: ['Waste Management', 'Emissions', 'Spill Prevention', 'Remediation', 'Biodiversity', 'Reporting'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.111', title: 'Process Safety', sections: ['PSM Elements', 'MOC', 'PSSR', 'Mechanical Integrity', 'PHA', 'Operating Procedures'] },
  { framework: 'ARAMCO', standardCode: 'GI 2.112', title: 'Security', sections: ['Physical Security', 'Cyber Security', 'Personnel Security', 'Information Security', 'Integration with HSE'] },
];

const ARAMCO_SAS: ModuleStandard[] = [
  { framework: 'ARAMCO', standardCode: 'SAS-001', title: 'Risk Assessment', sections: ['Aramco Methodology', 'Risk Register', 'ALARP', 'Bowtie', 'Review Cycle'] },
  { framework: 'ARAMCO', standardCode: 'SAS-002', title: 'Incident Investigation', sections: ['TapRooT®', 'Root Cause', 'Classification', 'Corrective Actions', 'Lessons Learned'] },
  { framework: 'ARAMCO', standardCode: 'SAS-003', title: 'Confined Space Entry', sections: ['Aramco Permit', 'Gas Monitoring', 'Standby Person', 'Rescue Team', 'Ventilation', 'Equipment'] },
  { framework: 'ARAMCO', standardCode: 'SAS-004', title: 'Fall Protection', sections: ['100% Tie-off', 'Anchor Certification', 'Rescue Plans', 'Equipment Inspection', 'Training'] },
  { framework: 'ARAMCO', standardCode: 'SAS-005', title: 'Scaffolding', sections: ['Aramco Tag System', 'Inspection Regime', 'Competence', 'Design', 'Alterations'] },
  { framework: 'ARAMCO', standardCode: 'SAS-006', title: 'Lifting Operations', sections: ['Aramco Lift Plans', 'Rigging', 'Certification', 'Competent Persons', 'Exclusion Zones'] },
  { framework: 'ARAMCO', standardCode: 'SAS-007', title: 'Electrical Safety', sections: ['Aramco LOTO', 'Arc Flash', 'HV Procedures', 'Testing', 'Competent Person', 'PPE'] },
  { framework: 'ARAMCO', standardCode: 'SAS-008', title: 'Hot Work', sections: ['Fire Watch', 'Gas Testing', 'Permits', 'Area Preparation', 'Monitoring', 'Post-work'] },
  { framework: 'ARAMCO', standardCode: 'SAS-009', title: 'Excavation', sections: ['Shoring', 'Daily Inspection', 'Permit', 'Underground Services', 'Access/Egress', 'Spoil'] },
  { framework: 'ARAMCO', standardCode: 'SAS-010', title: 'PPE', sections: ['Aramco Minimum Standards', 'FR Clothing', 'Respiratory', 'Selection', 'Maintenance', 'Training'] },
];

const QATAR_STANDARDS: ModuleStandard[] = [
  { framework: 'QATAR', standardCode: 'Qatar Labour Law 14/2004', title: 'Labour Law', sections: ['HSE Obligations', 'Working Hours', 'Summer Ban', 'Penalties', 'Worker Welfare'] },
  { framework: 'QATAR', standardCode: 'QCS 2020', title: 'Qatar Construction Specifications', sections: ['General Requirements', 'Site Safety', 'Scaffolding', 'Excavation', 'Concrete', 'Steel', 'Finishes'] },
  { framework: 'QATAR', standardCode: 'Qatar Civil Defence', title: 'Fire Safety Requirements', sections: ['Approval Process', 'Fire Protection', 'Evacuation', 'Inspections', 'Certificates'] },
  { framework: 'QATAR', standardCode: 'QP HSE Standards', title: 'Qatar Petroleum HSE', sections: ['Contractor Management', 'PSM', 'Offshore', 'Pipeline', 'Refining', 'HSE Plans'] },
];

const OMAN_STANDARDS: ModuleStandard[] = [
  { framework: 'OMAN', standardCode: 'Oman Labour Law RD 35/2003', title: 'Labour Law', sections: ['HSE Provisions', 'Employer Obligations', 'Worker Rights', 'Penalties', 'Inspections'] },
  { framework: 'OMAN', standardCode: 'MD 286/2008', title: 'OSH Management System', sections: ['Requirements', 'Elements', 'Audit', 'Certification', 'Continual Improvement'] },
  { framework: 'OMAN', standardCode: 'PDO HSE Standards', title: 'Petroleum Development Oman', sections: ['HSE MS 12 Elements', 'Contractor Management', 'PSM', 'Offshore', 'HSE Passport'] },
];

const KUWAIT_STANDARDS: ModuleStandard[] = [
  { framework: 'KUWAIT', standardCode: 'Kuwait Labour Law 6/2010', title: 'Labour Law', sections: ['HSE Obligations', 'Private Sector', 'Summer Ban', 'Worker Welfare', 'Penalties'] },
  { framework: 'KUWAIT', standardCode: 'KOC HSE Standards', title: 'Kuwait Oil Company', sections: ['Contractor Management', 'PSM', 'Asset Integrity', 'HSE Induction', 'Onshore Fields'] },
  { framework: 'KUWAIT', standardCode: 'KNPC Standards', title: 'Kuwait National Petroleum', sections: ['Refining Safety', 'Process Safety', 'Maintenance', 'Turnaround', 'Emergency Response'] },
];

const BAHRAIN_STANDARDS: ModuleStandard[] = [
  { framework: 'BAHRAIN', standardCode: 'Bahrain Labour Law 36/2012', title: 'Labour Law', sections: ['HSE Provisions', 'Employer Duties', 'Worker Rights', 'Inspections', 'Penalties'] },
  { framework: 'BAHRAIN', standardCode: 'BAPCO HSE Standards', title: 'Bahrain Petroleum Company', sections: ['HSE MS', 'Contractor Management', 'PSM', 'Refining', 'Modernization'] },
];

const GSO_STANDARDS: ModuleStandard[] = [
  { framework: 'GCC', standardCode: 'GSO ISO 45001', title: 'OH&S Management Systems', sections: ['Adopted GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO ISO 14001', title: 'Environmental Management Systems', sections: ['Adopted GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1722', title: 'PPE General Requirements', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1723', title: 'Safety Helmets', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1724', title: 'Safety Footwear', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1725', title: 'Eye Protection', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1726', title: 'Hearing Protection', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1727', title: 'Respiratory Protection', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1728', title: 'Fall Protection Equipment', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1729', title: 'Fire Fighting Equipment', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1730', title: 'Safety Signs', sections: ['GCC Standard', 'Arabic/English'] },
  { framework: 'GCC', standardCode: 'GSO 1731', title: 'Confined Space Equipment', sections: ['GCC Standard'] },
  { framework: 'GCC', standardCode: 'GSO 1732', title: 'Gas Detection Equipment', sections: ['GCC Standard'] },
];

// ============================================
// GULF ILLUSTRATIONS
// ============================================

const GULF_ILLUSTRATIONS: Illustration[] = [
  { id: 'adnoc-hse-ms', title: 'ADNOC HSE Management System', description: '10 standards of ADNOC 100 Series', type: 'diagram', category: 'adnoc', src: '/illustrations/adnoc-hse-ms.svg', altText: 'ADNOC HSE Management System 10 standards', width: 800, height: 600 },
  { id: 'adnoc-golden-rules', title: 'ADNOC 10 Golden Rules', description: 'Visual representation of 10 life-saving rules', type: 'infographic', category: 'adnoc', src: '/illustrations/adnoc-golden-rules.svg', altText: 'ADNOC 10 Golden Rules infographic', width: 800, height: 1000 },
  { id: 'adosh-framework', title: 'ADOSH System Framework', description: '10 Elements of ADOSH OSH Management System', type: 'diagram', category: 'adosh', src: '/illustrations/adosh-framework.svg', altText: 'ADOSH 10 Elements diagram', width: 800, height: 600 },
  { id: 'aramco-risk-matrix', title: 'Aramco Risk Matrix', description: '5x5 risk matrix with ALARP zones', type: 'matrix', category: 'aramco', src: '/illustrations/aramco-risk-matrix.svg', altText: 'Aramco 5x5 risk matrix', width: 600, height: 600 },
  { id: 'gulf-heat-stress', title: 'Gulf Heat Stress Management', description: 'WBGT zones, work/rest cycles, acclimatization', type: 'diagram', category: 'environmental', src: '/illustrations/gulf-heat-stress.svg', altText: 'Heat stress management chart', width: 800, height: 600 },
  { id: 'gulf-summer-ban', title: 'GCC Summer Work Bans', description: 'Country-specific summer work ban hours', type: 'infographic', category: 'environmental', src: '/illustrations/gulf-summer-ban.svg', altText: 'GCC summer work ban comparison', width: 800, height: 400 },
  { id: 'gulf-emergency-numbers', title: 'GCC Emergency Numbers', description: 'Emergency numbers for all 6 GCC countries', type: 'infographic', category: 'cultural', src: '/illustrations/gulf-emergency-numbers.svg', altText: 'GCC emergency numbers', width: 800, height: 400 },
  { id: 'adnoc-passport', title: 'ADNOC HSE Passport', description: 'Passport categories, validity, verification', type: 'diagram', category: 'certification', src: '/illustrations/adnoc-passport.svg', altText: 'ADNOC HSE Passport system', width: 800, height: 600 },
  { id: 'civil-defence-tiers', title: 'UAE Civil Defence ERP Tiers', description: 'Tier 1/2/3 emergency response', type: 'diagram', category: 'emergency', src: '/illustrations/civil-defence-tiers.svg', altText: 'Civil Defence emergency response tiers', width: 800, height: 600 },
];

// ============================================
// GULF QUIZ QUESTIONS - ADNOC 100 SERIES
// ============================================

const ADNOC_100_QUIZ: QuizQuestion[] = [
  {
    id: 'adnoc100-q1',
    type: 'single-choice',
    question: 'Which ADNOC HSE Standard covers HSE Policy and Leadership requirements?',
    explanation: 'ADNOC HSE Standard 101 covers HSE Policy & Leadership including policy statement, leadership commitment, accountability, and communication requirements.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', '100-series', 'policy', 'leadership'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: 'ADNOC HSE Standard 101', isCorrect: true, feedback: 'Correct. Standard 101 covers HSE Policy & Leadership.' },
      { id: 'b', text: 'ADNOC HSE Standard 102', isCorrect: false, feedback: 'Standard 102 covers Organization & Responsibilities.' },
      { id: 'c', text: 'ADNOC HSE Standard 103', isCorrect: false, feedback: 'Standard 103 covers Planning & Risk Assessment.' },
      { id: 'd', text: 'ADNOC HSE Standard 110', isCorrect: false, feedback: 'Standard 110 covers Audit & Assurance.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'adnoc100-q2',
    type: 'single-choice',
    question: 'What is the mandatory validity period for ADNOC HSE Passport?',
    explanation: 'ADNOC HSE Passport is mandatory for all personnel working at ADNOC sites and has a 3-year validity period with online verification capability.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', 'passport', 'competence', 'training'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: '1 year', isCorrect: false, feedback: 'Incorrect. The validity is 3 years.' },
      { id: 'b', text: '2 years', isCorrect: false, feedback: 'Incorrect. The validity is 3 years.' },
      { id: 'c', text: '3 years', isCorrect: true, feedback: 'Correct. ADNOC HSE Passport has 3-year validity.' },
      { id: 'd', text: '5 years', isCorrect: false, feedback: 'Incorrect. The validity is 3 years.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'adnoc100-q3',
    type: 'multiple-choice',
    question: 'Which of the following are key components of ADNOC HSE Standard 103 (Planning & Risk Assessment)? Select ALL that apply.',
    explanation: 'Standard 103 covers HSE Planning, Risk Assessment Methodology (using ADNOC risk matrix), ALARP Demonstration, and Objectives & Targets setting.',
    difficulty: 'intermediate',
    points: 15,
    tags: ['adnoc', '100-series', 'planning', 'risk-assessment', 'alarp'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: 'HSE Planning', isCorrect: true, feedback: 'Correct. HSE Planning is a core component.' },
      { id: 'b', text: 'Risk Assessment Methodology', isCorrect: true, feedback: 'Correct. ADNOC-specific risk assessment methodology.' },
      { id: 'c', text: 'ALARP Demonstration', isCorrect: true, feedback: 'Correct. ALARP (As Low As Reasonably Practicable) demonstration is required.' },
      { id: 'd', text: 'Contractor Pre-qualification', isCorrect: false, feedback: 'This is covered in Standard 104.' },
      { id: 'e', text: 'Objectives & Targets', isCorrect: true, feedback: 'Correct. Setting HSE objectives and targets.' },
      { id: 'f', text: 'Emergency Procedures', isCorrect: false, feedback: 'This is covered in Standard 108.' },
    ],
    correctAnswer: ['a', 'b', 'c', 'e'],
  },
];

// ============================================
// GULF QUIZ QUESTIONS - ADNOC GOLDEN RULES
// ============================================

const ADNOC_GR_QUIZ: QuizQuestion[] = [
  {
    id: 'adnoc-gr-q1',
    type: 'single-choice',
    question: 'According to ADNOC Golden Rule 3 (Confined Space), what is required before entry?',
    explanation: 'GR-3 states: No entry without permit & gas test. A valid confined space entry permit AND gas testing are mandatory before any confined space entry.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', 'golden-rules', 'confined-space', 'permit', 'gas-testing'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: 'Valid permit only', isCorrect: false, feedback: 'Both permit AND gas test are required.' },
      { id: 'b', text: 'Gas test only', isCorrect: false, feedback: 'Both permit AND gas test are required.' },
      { id: 'c', text: 'Valid permit AND gas test', isCorrect: true, feedback: 'Correct. Both a valid permit AND gas testing are mandatory.' },
      { id: 'd', text: 'Supervisor verbal approval', isCorrect: false, feedback: 'Formal permit and gas test required, not verbal approval.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'adnoc-gr-q2',
    type: 'single-choice',
    question: 'What is the minimum height requiring 100% tie-off per ADNOC Golden Rule 4?',
    explanation: 'GR-4 requires 100% tie-off above 1.8 meters (approximately 6 feet). This is stricter than many international standards which use 2 meters.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', 'golden-rules', 'fall-protection', 'working-at-height'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: '1.5 meters', isCorrect: false, feedback: 'Incorrect. The threshold is 1.8 meters.' },
      { id: 'b', text: '1.8 meters', isCorrect: true, feedback: 'Correct. 100% tie-off required above 1.8 meters.' },
      { id: 'c', text: '2.0 meters', isCorrect: false, feedback: 'Incorrect. ADNOC standard is 1.8 meters, stricter than 2m.' },
      { id: 'd', text: '3.0 meters', isCorrect: false, feedback: 'Incorrect. This is too high for mandatory tie-off.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'adnoc-gr-q3',
    type: 'scenario',
    question: `You observe a contractor worker at an ADNOC site working at 2.5 meters height without fall protection. The worker says "I have done this job for 20 years, I do not need a harness." What is your IMMEDIATE action?`,
    explanation: 'GR-4 (Fall Protection) and GR-10 (Stop Work Authority) both apply. You must immediately stop the work. No experience level exempts anyone from Golden Rules. The Stop Work Authority (GR-10) gives you the right AND duty to stop unsafe work without retaliation.',
    difficulty: 'advanced',
    points: 20,
    tags: ['adnoc', 'golden-rules', 'fall-protection', 'stop-work-authority', 'leadership'],
    standards: ['ADNOC'],
    scenario: {
      description: 'Contractor worker at 2.5m without fall protection, claims experience exempts them',
      context: 'ADNOC site, Golden Rules apply to ALL personnel',
      options: [
        { id: 'opt1', text: 'Allow work to continue since worker is experienced', consequence: 'VIOLATION: Golden Rules apply to ALL personnel regardless of experience. GR-4 requires 100% tie-off above 1.8m.', nextStepId: 'fail', isCorrect: false },
        { id: 'opt2', text: 'Immediately STOP the work and require fall protection', consequence: 'CORRECT: GR-4 requires 100% tie-off above 1.8m. GR-10 gives you the right AND duty to stop unsafe work.', nextStepId: 'success', isCorrect: true },
        { id: 'opt3', text: 'Ask worker to sign a waiver and continue', consequence: 'VIOLATION: No waivers for Golden Rules. This is a fundamental safety requirement.', nextStepId: 'fail', isCorrect: false },
        { id: 'opt4', text: 'Report to supervisor after shift ends', consequence: 'VIOLATION: Immediate action required. Delaying allows continued exposure to fall hazard.', nextStepId: 'fail', isCorrect: false },
      ],
      correctPath: ['opt2'],
    },
    correctAnswer: 'opt2',
  },
];

// ============================================
// GULF QUIZ QUESTIONS - ADOSH
// ============================================

const ADOSH_QUIZ: QuizQuestion[] = [
  {
    id: 'adosh-q1',
    type: 'single-choice',
    question: 'Under ADOSH Decree 42/2009, which entities are required to implement an OSH Management System?',
    explanation: 'ADOSH Decree 42/2009 makes OSH Management System implementation MANDATORY for ALL entities operating in Abu Dhabi Emirate, not just high-risk sectors.',
    difficulty: 'basic',
    points: 10,
    tags: ['adosh', 'uae', 'mandatory', 'osh-ms', 'decree-42'],
    standards: ['ADOSH'],
    options: [
      { id: 'a', text: 'Only oil & gas companies', isCorrect: false, feedback: 'Applies to ALL entities, not just oil & gas.' },
      { id: 'b', text: 'Only construction companies', isCorrect: false, feedback: 'Applies to ALL entities, not just construction.' },
      { id: 'c', text: 'All entities operating in Abu Dhabi', isCorrect: true, feedback: 'Correct. Mandatory for ALL entities in Abu Dhabi Emirate.' },
      { id: 'd', text: 'Only entities with >100 employees', isCorrect: false, feedback: 'No employee threshold - applies to all entities.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'adosh-q2',
    type: 'single-choice',
    question: 'What is the ADOSH incident reporting timeframe for notifying ADOSH of a serious incident?',
    explanation: 'ADOSH CoP 2 (Incident Investigation) requires 48-hour reporting to ADOSH for serious incidents. This is a regulatory requirement with penalties for non-compliance.',
    difficulty: 'intermediate',
    points: 10,
    tags: ['adosh', 'incident-reporting', '48-hours', 'compliance'],
    standards: ['ADOSH'],
    options: [
      { id: 'a', text: '24 hours', isCorrect: false, feedback: '24 hours is ARAMCO requirement. ADOSH requires 48 hours.' },
      { id: 'b', text: '48 hours', isCorrect: true, feedback: 'Correct. ADOSH requires 48-hour notification for serious incidents.' },
      { id: 'c', text: '72 hours', isCorrect: false, feedback: '72 hours is ADNOC requirement. ADOSH requires 48 hours.' },
      { id: 'd', text: '7 days', isCorrect: false, feedback: 'Too long. Regulatory reporting is 48 hours.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'adosh-q3',
    type: 'multiple-choice',
    question: 'Which ADOSH Codes of Practice are MANDATORY for construction sites in Abu Dhabi? Select ALL that apply.',
    explanation: 'All ADOSH CoPs apply, but construction sites have specific mandatory requirements for CoP 3 (Working at Height), CoP 4 (Confined Space), CoP 8 (Excavation), CoP 9 (Scaffolding), CoP 10 (Lifting Operations), and CoP 16 (Heat Stress).',
    difficulty: 'intermediate',
    points: 15,
    tags: ['adosh', 'construction', 'cop', 'mandatory', 'abu-dhabi'],
    standards: ['ADOSH'],
    options: [
      { id: 'a', text: 'CoP 3 - Working at Height', isCorrect: true, feedback: 'Correct. Mandatory for all work at height.' },
      { id: 'b', text: 'CoP 4 - Confined Space', isCorrect: true, feedback: 'Correct. Mandatory for confined space entry.' },
      { id: 'c', text: 'CoP 8 - Excavation', isCorrect: true, feedback: 'Correct. Mandatory for excavation work.' },
      { id: 'd', text: 'CoP 9 - Scaffolding', isCorrect: true, feedback: 'Correct. Mandatory for scaffolding operations.' },
      { id: 'e', text: 'CoP 10 - Lifting Operations', isCorrect: true, feedback: 'Correct. Mandatory for lifting operations.' },
      { id: 'f', text: 'CoP 16 - Heat Stress', isCorrect: true, feedback: 'Correct. Mandatory due to extreme Gulf heat.' },
      { id: 'g', text: 'CoP 14 - Asbestos', isCorrect: false, feedback: 'Only required if asbestos is present.' },
      { id: 'h', text: 'CoP 15 - Radiation', isCorrect: false, feedback: 'Only required for radiation work.' },
    ],
    correctAnswer: ['a', 'b', 'c', 'd', 'e', 'f'],
  },
];

// ============================================
// GULF QUIZ QUESTIONS - ARAMCO
// ============================================

const ARAMCO_QUIZ: QuizQuestion[] = [
  {
    id: 'aramco-q1',
    type: 'single-choice',
    question: 'What is the Aramco incident reporting timeframe for all incidents?',
    explanation: 'Aramco GI 2.106 requires 24-hour reporting for ALL incidents. This is stricter than ADNOC (72 hours) and ADOSH (48 hours for serious incidents).',
    difficulty: 'basic',
    points: 10,
    tags: ['aramco', 'incident-reporting', '24-hours', 'gi-2106'],
    standards: ['ARAMCO'],
    options: [
      { id: 'a', text: '24 hours', isCorrect: true, feedback: 'Correct. Aramco requires 24-hour reporting for all incidents.' },
      { id: 'b', text: '48 hours', isCorrect: false, feedback: 'This is ADOSH requirement for serious incidents.' },
      { id: 'c', text: '72 hours', isCorrect: false, feedback: 'This is ADNOC requirement.' },
      { id: 'd', text: '7 days', isCorrect: false, feedback: 'Too long for Aramco requirements.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'aramco-q2',
    type: 'single-choice',
    question: 'Which Aramco Life Saving Rule covers the requirement for 100% tie-off when working at height?',
    explanation: 'Aramco Life Saving Rule 4: Working at Height - "I always use fall protection when working at height." This aligns with ADNOC GR-4 but is Rule 4 in Aramco\'s 12 rules.',
    difficulty: 'basic',
    points: 10,
    tags: ['aramco', 'life-saving-rules', 'fall-protection', 'working-at-height'],
    standards: ['ARAMCO'],
    options: [
      { id: 'a', text: 'Rule 1 - Work Authorization', isCorrect: false, feedback: 'Rule 1 covers work permits and authorization.' },
      { id: 'b', text: 'Rule 3 - Confined Space', isCorrect: false, feedback: 'Rule 3 covers confined space entry.' },
      { id: 'c', text: 'Rule 4 - Working at Height', isCorrect: true, feedback: 'Correct. Rule 4: "I always use fall protection when working at height."' },
      { id: 'd', text: 'Rule 6 - Lifting Operations', isCorrect: false, feedback: 'Rule 6 covers lifting operations.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'aramco-q3',
    type: 'scenario',
    question: 'During a routine inspection at an Aramco facility, you find a scaffold with a GREEN tag but the inspection date is 10 days old. Aramco SAS-005 requires weekly inspections. The scaffold inspector says "It looks fine, no need to re-inspect." What do you do?',
    explanation: 'Aramco SAS-005 mandates weekly scaffold inspections (7 days maximum). A 10-day-old inspection is NON-COMPLIANT. The tag must be changed to RED and the scaffold taken out of service until re-inspected. No exceptions for "looks fine".',
    difficulty: 'advanced',
    points: 20,
    tags: ['aramco', 'sas-005', 'scaffolding', 'inspection', 'compliance'],
    standards: ['ARAMCO'],
    scenario: {
      description: 'Scaffold with green tag but inspection 10 days old (weekly required)',
      context: 'Aramco facility, SAS-005 requires weekly inspections',
      options: [
        { id: 'opt1', text: 'Accept inspector\'s judgment since scaffold looks fine', consequence: 'VIOLATION: SAS-005 requires WEEKLY inspections. Visual appearance does not replace formal inspection.', nextStepId: 'fail', isCorrect: false },
        { id: 'opt2', text: 'Change tag to RED, remove from service, require re-inspection', consequence: 'CORRECT: 10 days exceeds 7-day requirement. Must be RED-tagged and re-inspected before use.', nextStepId: 'success', isCorrect: true },
        { id: 'opt3', text: 'Allow 3 more days grace period', consequence: 'VIOLATION: No grace period in SAS-005. 7 days maximum.', nextStepId: 'fail', isCorrect: false },
        { id: 'opt4', text: 'Report to Aramco HSE next week', consequence: 'VIOLATION: Immediate action required. Unsafe scaffold in use.', nextStepId: 'fail', isCorrect: false },
      ],
      correctPath: ['opt2'],
    },
    correctAnswer: 'opt2',
  },
];

// ============================================
// GULF QUIZ QUESTIONS - UAE FEDERAL LAWS
// ============================================

const UAE_LAWS_QUIZ: QuizQuestion[] = [
  {
    id: 'uae-laws-q1',
    type: 'single-choice',
    question: 'Under UAE Federal Law 8/1980 (Labour Law), Articles 91-101 cover which topic?',
    explanation: 'Articles 91-101 of Federal Law 8/1980 specifically cover Health, Safety, and Environment obligations of employers, including preventive measures, penalties, and worker protections.',
    difficulty: 'basic',
    points: 10,
    tags: ['uae', 'federal-law-8-1980', 'labour-law', 'articles-91-101', 'hse-obligations'],
    standards: ['UAE'],
    options: [
      { id: 'a', text: 'Working hours and overtime', isCorrect: false, feedback: 'Working hours are covered in different articles.' },
      { id: 'b', text: 'HSE obligations and penalties', isCorrect: true, feedback: 'Correct. Articles 91-101 cover HSE obligations, preventive measures, and penalties.' },
      { id: 'c', text: 'Annual leave and holidays', isCorrect: false, feedback: 'Leave provisions are in different articles.' },
      { id: 'd', text: 'End of service benefits', isCorrect: false, feedback: 'End of service is covered in other articles.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'uae-laws-q2',
    type: 'single-choice',
    question: 'What is the UAE summer midday work ban period for construction workers?',
    explanation: 'UAE Ministerial Decree mandates a midday work ban from 12:30 PM to 3:00 PM during June 15 to September 15 for workers exposed to direct sunlight. This is enforced by MOHRE.',
    difficulty: 'basic',
    points: 10,
    tags: ['uae', 'summer-ban', 'construction', 'heat-stress', 'mohre'],
    standards: ['UAE'],
    options: [
      { id: 'a', text: '10:00 AM - 2:00 PM (Jun-Sep)', isCorrect: false, feedback: 'This is Qatar\'s ban period.' },
      { id: 'b', text: '11:00 AM - 3:00 PM (Jun-Aug)', isCorrect: false, feedback: 'This is Kuwait\'s ban period.' },
      { id: 'c', text: '12:30 PM - 3:00 PM (Jun 15 - Sep 15)', isCorrect: true, feedback: 'Correct. UAE ban: 12:30-3:00 PM, June 15 to September 15.' },
      { id: 'd', text: '12:00 PM - 4:00 PM (Jul-Aug)', isCorrect: false, feedback: 'This is not the UAE standard period.' },
    ],
    correctAnswer: 'c',
  },
];

// ============================================
// GULF QUIZ QUESTIONS - HEAT STRESS / ENVIRONMENTAL
// ============================================

const GULF_ENVIRONMENTAL_QUIZ: QuizQuestion[] = [
  {
    id: 'gulf-env-q1',
    type: 'single-choice',
    question: 'What does WBGT stand for in heat stress management?',
    explanation: 'WBGT = Wet Bulb Globe Temperature. It is the internationally recognized standard (ISO 7243, ACGIH TLV) for assessing heat stress, combining temperature, humidity, wind speed, and solar radiation.',
    difficulty: 'basic',
    points: 10,
    tags: ['heat-stress', 'wbgt', 'iso-7243', 'acgih', 'gulf-environment'],
    standards: ['ISO31000', 'ADOSH', 'ADNOC', 'ARAMCO'],
    options: [
      { id: 'a', text: 'Wet Bulb Globe Temperature', isCorrect: true, feedback: 'Correct. WBGT = Wet Bulb Globe Temperature.' },
      { id: 'b', text: 'Wind Based Ground Temperature', isCorrect: false, feedback: 'Incorrect expansion.' },
      { id: 'c', text: 'Weather Based Global Thermometer', isCorrect: false, feedback: 'Incorrect expansion.' },
      { id: 'd', text: 'Workplace Body Temperature Gauge', isCorrect: false, feedback: 'Incorrect expansion.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 'gulf-env-q2',
    type: 'single-choice',
    question: 'What is the mandatory acclimatization period for new workers arriving in the Gulf during summer?',
    explanation: 'Gulf HSE standards (ADOSH CoP 16, ADNOC, Aramco) require a 7-14 day progressive acclimatization program for new workers, gradually increasing exposure to heat with reduced workload and enhanced monitoring.',
    difficulty: 'intermediate',
    points: 10,
    tags: ['heat-stress', 'acclimatization', 'new-workers', 'summer', 'gulf'],
    standards: ['ADOSH', 'ADNOC', 'ARAMCO'],
    options: [
      { id: 'a', text: '1-2 days', isCorrect: false, feedback: 'Too short. Minimum 7 days required.' },
      { id: 'b', text: '3-5 days', isCorrect: false, feedback: 'Too short. Minimum 7 days required.' },
      { id: 'c', text: '7-14 days progressive exposure', isCorrect: true, feedback: 'Correct. 7-14 day progressive acclimatization with reduced workload.' },
      { id: 'd', text: 'No acclimatization required for experienced workers', isCorrect: false, feedback: 'ALL new workers require acclimatization regardless of experience.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'gulf-env-q3',
    type: 'scenario',
    question: 'It\'s July in Abu Dhabi. WBGT reading is 32°C (high risk zone). A crew of 6 workers (2 new arrivals, 4 acclimatized) are scheduled for 4 hours of heavy outdoor work. Per ADOSH CoP 16 and ADNOC standards, what is the required work/rest cycle?',
    explanation: 'At WBGT 32°C (high risk), ACGIH/ISO 7243 and ADOSH CoP 16 require: Heavy work = 25% work / 75% rest (15 min work / 45 min rest per hour). New workers need additional 50% reduction in work time during acclimatization. Total shift may need reduction or rescheduling to cooler hours.',
    difficulty: 'advanced',
    points: 20,
    tags: ['heat-stress', 'wbgt', 'work-rest-cycle', 'acclimatization', 'adosh-cop16', 'adnoc'],
    standards: ['ADOSH', 'ADNOC', 'ISO31000'],
    scenario: {
      description: 'WBGT 32°C, 6 workers (2 new), 4 hours heavy outdoor work scheduled',
      context: 'Abu Dhabi July, high risk WBGT zone, ADOSH CoP 16 applies',
      options: [
        { id: 'opt1', text: 'Proceed as scheduled with water breaks every 30 min', consequence: 'VIOLATION: At WBGT 32°C heavy work requires 15 min work / 45 min rest. Water breaks insufficient.', nextStepId: 'fail', isCorrect: false },
        { id: 'opt2', text: 'Implement 15 min work / 45 min rest cycle; new workers 50% reduced exposure; consider rescheduling to night', consequence: 'CORRECT: WBGT 32°C high risk = 25% work/75% rest. New workers need additional protection. Night work preferred.', nextStepId: 'success', isCorrect: true },
        { id: 'opt3', text: 'Cancel work entirely - too dangerous', consequence: 'OVERLY CONSERVATIVE: Work can proceed with proper controls. Complete cancellation not required if controls implemented.', nextStepId: 'partial', isCorrect: false },
        { id: 'opt4', text: 'Give new workers lighter tasks but same schedule', consequence: 'VIOLATION: New workers need 50% reduced work TIME, not just lighter tasks. Acclimatization is time-based.', nextStepId: 'fail', isCorrect: false },
      ],
      correctPath: ['opt2'],
    },
    correctAnswer: 'opt2',
  },
];

// ============================================
// GULF QUIZ QUESTIONS - CULTURAL / WELFARE
// ============================================

const GULF_CULTURAL_QUIZ: QuizQuestion[] = [
  {
    id: 'gulf-cultural-q1',
    type: 'single-choice',
    question: 'What is the legal requirement for prayer facilities on construction sites in the UAE?',
    explanation: 'UAE regulations require prayer facilities on sites with more than 50 workers. Facilities must be clean, properly oriented toward Mecca, and accessible during prayer times.',
    difficulty: 'basic',
    points: 10,
    tags: ['cultural', 'prayer-facilities', 'uae', 'construction', 'worker-welfare'],
    standards: ['UAE', 'ADOSH'],
    options: [
      { id: 'a', text: 'Required on all sites regardless of size', isCorrect: false, feedback: 'Threshold is >50 workers.' },
      { id: 'b', text: 'Required on sites with >50 workers', isCorrect: true, feedback: 'Correct. Mandatory for sites with more than 50 workers.' },
      { id: 'c', text: 'Required only during Ramadan', isCorrect: false, feedback: 'Required year-round, not just Ramadan.' },
      { id: 'd', text: 'Optional - employer discretion', isCorrect: false, feedback: 'Legal requirement, not optional.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'gulf-cultural-q2',
    type: 'single-choice',
    question: 'What is the legal maximum working hours during Ramadan in the UAE?',
    explanation: 'UAE Labour Law mandates maximum 6 hours per day during Ramadan for all workers (Muslim and non-Muslim). This is a legal requirement, not optional.',
    difficulty: 'basic',
    points: 10,
    tags: ['ramadan', 'working-hours', 'uae', 'labour-law', 'legal-requirement'],
    standards: ['UAE'],
    options: [
      { id: 'a', text: '8 hours (same as normal)', isCorrect: false, feedback: 'Ramadan reduces legal maximum to 6 hours.' },
      { id: 'b', text: '7 hours', isCorrect: false, feedback: 'Legal maximum is 6 hours, not 7.' },
      { id: 'c', text: '6 hours maximum', isCorrect: true, feedback: 'Correct. Legal requirement: 6 hours/day maximum during Ramadan.' },
      { id: 'd', text: 'Employer discretion', isCorrect: false, feedback: 'Legal requirement, not discretionary.' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'gulf-cultural-q3',
    type: 'multiple-choice',
    question: 'What are the GCC emergency numbers? Select the CORRECT country-number pairs.',
    explanation: 'Each GCC country has specific emergency numbers. UAE: 999 (Police), 998 (Ambulance), 997 (Fire/Civil Defence). KSA: 999 (Unified). Qatar: 999 (Unified). Oman: 9999. Kuwait: 112. Bahrain: 999.',
    difficulty: 'basic',
    points: 15,
    tags: ['emergency-numbers', 'gcc', 'uae', 'ksa', 'qatar', 'oman', 'kuwait', 'bahrain'],
    standards: ['UAE', 'ADOSH', 'ARAMCO', 'QATAR', 'OMAN', 'KUWAIT', 'BAHRAIN'],
    options: [
      { id: 'a', text: 'UAE: 999 (Police), 998 (Ambulance), 997 (Fire)', isCorrect: true, feedback: 'Correct UAE numbers.' },
      { id: 'b', text: 'Saudi Arabia: 999 (Unified for all emergencies)', isCorrect: true, feedback: 'Correct KSA unified number.' },
      { id: 'c', text: 'Qatar: 999 (Unified)', isCorrect: true, feedback: 'Correct Qatar unified number.' },
      { id: 'd', text: 'Oman: 9999', isCorrect: true, feedback: 'Correct Oman number.' },
      { id: 'e', text: 'Kuwait: 112', isCorrect: true, feedback: 'Correct Kuwait number.' },
      { id: 'f', text: 'Bahrain: 999', isCorrect: true, feedback: 'Correct Bahrain number.' },
    ],
    correctAnswer: ['a', 'b', 'c', 'd', 'e', 'f'],
  },
];

// ============================================
// GULF QUIZ QUESTIONS - CERTIFICATIONS
// ============================================

const GULF_CERT_QUIZ: QuizQuestion[] = [
  {
    id: 'gulf-cert-q1',
    type: 'single-choice',
    question: 'Which certification is MANDATORY for all personnel working at ADNOC sites?',
    explanation: 'ADNOC HSE Passport is mandatory for ALL personnel (employees, contractors, visitors) working at ADNOC Group sites. It has 3-year validity and online verification.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', 'hse-passport', 'mandatory', 'certification', 'site-access'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: 'NEBOSH IGC', isCorrect: false, feedback: 'Preferred but not mandatory for site access.' },
      { id: 'b', text: 'ADNOC HSE Passport', isCorrect: true, feedback: 'Correct. Mandatory for ALL personnel at ADNOC sites.' },
      { id: 'c', text: 'IOSH Managing Safely', isCorrect: false, feedback: 'Not mandatory for ADNOC site access.' },
      { id: 'd', text: 'OSHA 30-hour', isCorrect: false, feedback: 'Not recognized for ADNOC site access.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'gulf-cert-q2',
    type: 'single-choice',
    question: 'What is the validity period of ADNOC HSE Passport?',
    explanation: 'ADNOC HSE Passport is valid for 3 years from date of issue. It requires renewal through approved training providers and has online verification via ADNOC portal.',
    difficulty: 'basic',
    points: 10,
    tags: ['adnoc', 'hse-passport', 'validity', 'renewal', '3-years'],
    standards: ['ADNOC'],
    options: [
      { id: 'a', text: '1 year', isCorrect: false, feedback: 'Too short. Validity is 3 years.' },
      { id: 'b', text: '2 years', isCorrect: false, feedback: 'Incorrect. Validity is 3 years.' },
      { id: 'c', text: '3 years', isCorrect: true, feedback: 'Correct. 3-year validity with online verification.' },
      { id: 'd', text: '5 years', isCorrect: false, feedback: 'Too long. Validity is 3 years.' },
    ],
    correctAnswer: 'c',
  },
];

// ============================================
// GULF CASE STUDIES
// ============================================

const GULF_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'gulf-cs-001',
    moduleId: 'adnoc-golden-rules',
    title: 'ADNOC Golden Rule Violation: Fatal Fall at Offshore Platform',
    industry: 'Oil & Gas - Offshore',
    scenario: 'A contractor scaffolder fell 12 meters from an offshore platform at an ADNOC facility. Investigation revealed: no valid PTW for scaffolding work, worker not tied off (GR-4 violation), no rescue plan, standby person not assigned. Worker was not ADNOC HSE Passport holder.',
    rootCauses: [
      'No PTW issued for scaffolding modification work (GR-1 violation)',
      'Worker not using fall protection at 12m height (GR-4 violation)',
      'No rescue plan for work at height (GR-4 requirement)',
      'Contractor worker without ADNOC HSE Passport',
      'Supervisor failed to exercise Stop Work Authority (GR-10)',
    ],
    lessonsLearned: [
      'Golden Rules apply to ALL personnel - no exceptions for contractors',
      'PTW system must be rigorously enforced for ALL work at height',
      'Fall protection is non-negotiable above 1.8m',
      'Rescue plans must be in place BEFORE work starts',
      'Stop Work Authority must be exercised without fear of retaliation',
    ],
    preventiveMeasures: [
      'Mandatory ADNOC HSE Passport verification at site entry',
      'Daily PTW audit for work at height activities',
      '100% tie-off enforcement with immediate stop work for violations',
      'Pre-task rescue plan review for all work >1.8m',
      'Stop Work Authority training for all supervisors',
    ],
    regulationsViolated: [
      { framework: 'ADNOC', standardCode: 'ADNOC GR-1', title: 'Work Permits', sections: ['No work without valid permit'] },
      { framework: 'ADNOC', standardCode: 'ADNOC GR-4', title: 'Fall Protection', sections: ['100% tie-off above 1.8m'] },
      { framework: 'ADNOC', standardCode: 'ADNOC GR-10', title: 'Stop Work Authority', sections: ['Right & duty to stop unsafe work'] },
      { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 105', title: 'Competence & Training', sections: ['HSE Passport'] },
      { framework: 'ADOSH', standardCode: 'ADOSH CoP 3', title: 'Working at Height', sections: ['Risk Assessment', 'Fall Arrest', 'Rescue Plan'] },
    ],
    outcome: 'Fatality. Contractor company banned from ADNOC sites for 3 years. Supervisor terminated. ADNOC issued Safety Alert across all Group companies.',
    date: new Date('2023-08-15'),
    location: 'ADNOC Offshore - Upper Zakum Field',
    references: [
      { id: 'ref1', title: 'ADNOC Safety Alert SA-2023-045', type: 'regulation', source: 'ADNOC HSE', relevance: 'Official lessons learned' },
      { id: 'ref2', title: 'ADOSH Investigation Report', type: 'investigation', source: 'ADOSH', relevance: 'Regulatory findings' },
    ],
    discussionQuestions: [
      'Why did the supervisor not exercise Stop Work Authority?',
      'How can contractor competence verification be improved?',
      'What cultural factors might prevent workers from stopping unsafe work?',
    ],
  },
  {
    id: 'gulf-cs-002',
    moduleId: 'gulf-environmental',
    title: 'Heat Stroke Fatality: New Worker During Gulf Summer',
    industry: 'Construction - High-rise',
    scenario: 'A 24-year-old newly arrived worker (3 days in UAE) suffered fatal heat stroke while performing concrete pouring on the 15th floor at 1:30 PM in July. WBGT was 33°C. Worker had no acclimatization, worked 3 hours continuous without adequate rest, drank only 500ml water.',
    rootCauses: [
      'No acclimatization program for new arrival (ADOSH CoP 16 violation)',
      'Work scheduled during peak heat (UAE Summer Ban violation - 12:30-3:00 PM)',
      'Inadequate work/rest cycle for WBGT 33°C (should be 15 min work/45 min rest)',
      'Insufficient hydration (minimum 1L/hour required for heavy work)',
      'No buddy system or heat illness monitoring',
      'Supervisor not trained in heat illness recognition',
    ],
    lessonsLearned: [
      '7-14 day acclimatization is MANDATORY for all new workers',
      'Summer work ban (12:30-3:00 PM) is LAW, not guidance',
      'WBGT-based work/rest cycles must be enforced',
      'Hydration protocols: minimum 1L/hour for heavy work in heat',
      'Buddy system and heat illness monitoring required',
      'All supervisors need heat illness recognition training',
    ],
    preventiveMeasures: [
      'Implement mandatory 14-day acclimatization for all new arrivals',
      'Automated WBGT monitoring with alert system',
      'Work scheduling system that blocks peak heat hours',
      'Mandatory hydration stations with electrolyte replacement',
      'Heat illness recognition training for all supervisors',
      'Buddy system with 15-minute check-ins',
    ],
    regulationsViolated: [
      { framework: 'UAE', standardCode: 'Federal Law 8/1980', title: 'Labour Law', sections: ['Art 91-101: HSE Obligations'] },
      { framework: 'ADOSH', standardCode: 'ADOSH CoP 16', title: 'Heat Stress', sections: ['WBGT Monitoring', 'Work/Rest Cycles', 'Acclimatization'] },
      { framework: 'UAE', standardCode: 'Ministerial Decree', title: 'Summer Midday Work Ban', sections: ['12:30-3:00 PM Jun 15-Sep 15'] },
      { framework: 'ADNOC', standardCode: 'ADNOC HSE Standard 202', title: 'H2S Management', sections: ['Heat Stress Provisions'] },
    ],
    outcome: 'Fatality. Main contractor fined AED 200,000. Project suspended for 30 days. Company required to implement comprehensive heat stress program audited by ADOSH.',
    date: new Date('2023-07-22'),
    location: 'Abu Dhabi - High-rise Construction Site',
    references: [
      { id: 'ref1', title: 'ADOSH Investigation Report 2023/078', type: 'investigation', source: 'ADOSH', relevance: 'Regulatory findings' },
      { id: 'ref2', title: 'MOHRE Penalty Notice', type: 'regulation', source: 'MOHRE', relevance: 'Legal penalty' },
    ],
    discussionQuestions: [
      'Why was a 3-day new worker assigned to heavy work in peak heat?',
      'How can technology (WBGT sensors, wearables) improve heat stress management?',
      'What cultural barriers might prevent workers from reporting heat symptoms?',
    ],
  },
  {
    id: 'gulf-cs-003',
    moduleId: 'aramco-gi-sas',
    title: 'Aramco SAS-005 Violation: Scaffold Collapse at Gas Plant',
    industry: 'Oil & Gas - Downstream',
    scenario: 'A 6-meter scaffold collapsed during maintenance at an Aramco gas plant. 3 workers injured (1 serious). Investigation: scaffold had GREEN tag but last inspection 11 days prior (SAS-005 requires weekly). Tag forged by scaffolding contractor. No competent scaffold inspector on site.',
    rootCauses: [
      'Scaffold inspection 11 days overdue (SAS-005 requires weekly)',
      'Inspection tag forged by contractor',
      'No Aramco-certified scaffold inspector on site',
      'Contractor not pre-qualified for scaffolding work',
      'No independent verification of scaffold tags',
      'Management did not verify contractor competence',
    ],
    lessonsLearned: [
      'SAS-005 weekly inspection is NON-NEGOTIABLE',
      'Tag verification must be independent',
      'Only Aramco-certified scaffold inspectors permitted',
      'Contractor pre-qualification must include scaffold competence',
      'Random tag audits by Aramco HSE required',
    ],
    preventiveMeasures: [
      'Automated scaffold tag tracking system with expiry alerts',
      'Mandatory Aramco scaffold inspector on all scaffold sites',
      'Contractor pre-qualification audit for scaffolding',
      'Weekly independent tag verification by Aramco HSE',
      'Digital tags with QR codes preventing forgery',
    ],
    regulationsViolated: [
      { framework: 'ARAMCO', standardCode: 'SAS-005', title: 'Scaffolding', sections: ['Tag System', 'Weekly Inspection', 'Competence'] },
      { framework: 'ARAMCO', standardCode: 'GI 2.104', title: 'Contractor HSE Management', sections: ['Pre-qualification', 'Competence'] },
      { framework: 'ARAMCO', standardCode: 'GI 2.107', title: 'Audit & Inspection', sections: ['Independent Verification'] },
    ],
    outcome: '3 injuries (1 serious). Contractor banned from Aramco sites for 5 years. Aramco issued Safety Bulletin. Mandatory digital scaffold tags implemented across all sites.',
    date: new Date('2023-05-10'),
    location: 'Aramco Hawiyah Gas Plant',
    references: [
      { id: 'ref1', title: 'Aramco Safety Bulletin SB-2023-012', type: 'regulation', source: 'Aramco HSE', relevance: 'Official lessons learned' },
      { id: 'ref2', title: 'Aramco Investigation Report', type: 'investigation', source: 'Aramco HSE', relevance: 'Root cause analysis' },
    ],
    discussionQuestions: [
      'How can digital technology prevent tag forgery?',
      'What contractual clauses should enforce scaffold compliance?',
      'How to ensure contractor ownership of scaffold safety?',
    ],
  },
];

// ============================================
// GULF CHECKLISTS
// ============================================

const GULF_CHECKLISTS: Checklist[] = [
  {
    id: 'gulf-cl-001',
    moduleId: 'adnoc-100-series',
    title: 'ADNOC 100 Series Compliance Audit Checklist',
    description: 'Monthly audit checklist for ADNOC 100 Series HSE Management System compliance',
    category: 'audit',
    frequency: 'monthly',
    items: [
      { id: 'i1', text: 'HSE Policy signed by CEO and communicated (Std 101)', required: true, reference: 'ADNOC Std 101', hazardCategory: 'safety-management-systems', severity: 'critical' },
      { id: 'i2', text: 'HSE Organization chart current with competent persons (Std 102)', required: true, reference: 'ADNOC Std 102', hazardCategory: 'safety-management-systems', severity: 'critical' },
      { id: 'i3', text: 'Risk assessments current using ADNOC methodology (Std 103)', required: true, reference: 'ADNOC Std 103', hazardCategory: 'risk-assessment', severity: 'critical' },
      { id: 'i4', text: 'Contractor CMS pre-qualification complete (Std 104)', required: true, reference: 'ADNOC Std 104', hazardCategory: 'contractor-management', severity: 'high' },
      { id: 'i5', text: 'Training matrix current; all personnel have valid HSE Passport (Std 105)', required: true, reference: 'ADNOC Std 105', hazardCategory: 'competence', severity: 'critical' },
      { id: 'i6', text: 'HSE Committees meeting monthly with minutes (Std 106)', required: true, reference: 'ADNOC Std 106', hazardCategory: 'communication', severity: 'high' },
      { id: 'i7', text: 'Document control system functional; records retained per schedule (Std 107)', required: true, reference: 'ADNOC Std 107', hazardCategory: 'documentation', severity: 'high' },
      { id: 'i8', text: 'PTW system operational; MOC process followed (Std 108)', required: true, reference: 'ADNOC Std 108', hazardCategory: 'procedures', severity: 'critical' },
      { id: 'i9', text: 'Incidents reported within 72 hrs; TapRooT® used (Std 109)', required: true, reference: 'ADNOC Std 109', hazardCategory: 'incident-investigation', severity: 'critical' },
      { id: 'i10', text: 'Audit program executed; management review quarterly (Std 110)', required: true, reference: 'ADNOC Std 110', hazardCategory: 'audit', severity: 'high' },
    ],
    signOffRequired: true,
    digitalSignature: true,
  },
  {
    id: 'gulf-cl-002',
    moduleId: 'adnoc-golden-rules',
    title: 'ADNOC Golden Rules Daily Verification',
    description: 'Pre-shift verification of Golden Rules compliance',
    category: 'pre-task',
    frequency: 'daily',
    items: [
      { id: 'i1', text: 'GR-1: All work has valid PTW displayed at worksite', required: true, reference: 'ADNOC GR-1', hazardCategory: 'procedures', severity: 'critical' },
      { id: 'i2', text: 'GR-2: Isolation verified before work; LOTO applied', required: true, reference: 'ADNOC GR-2', hazardCategory: 'lockout-tagout', severity: 'critical' },
      { id: 'i3', text: 'GR-3: Confined space - permit & gas test completed; standby assigned', required: true, reference: 'ADNOC GR-3', hazardCategory: 'confined-space', severity: 'critical' },
      { id: 'i4', text: 'GR-4: Fall protection - 100% tie-off above 1.8m; rescue plan ready', required: true, reference: 'ADNOC GR-4', hazardCategory: 'fall-protection', severity: 'critical' },
      { id: 'i5', text: 'GR-5: Vehicles - seatbelts, no mobile, speed limits, IVMS active', required: true, reference: 'ADNOC GR-5', hazardCategory: 'transportation-safety', severity: 'critical' },
      { id: 'i6', text: 'GR-6: Zero alcohol/drugs; random testing compliance', required: true, reference: 'ADNOC GR-6', hazardCategory: 'behavioral-safety', severity: 'critical' },
      { id: 'i7', text: 'GR-7: PPE worn per task; FR clothing where required', required: true, reference: 'ADNOC GR-7', hazardCategory: 'ppe', severity: 'critical' },
      { id: 'i8', text: 'GR-8: Smoking only in designated areas', required: true, reference: 'ADNOC GR-8', hazardCategory: 'fire-safety', severity: 'high' },
      { id: 'i9', text: 'GR-9: All incidents/near-misses reported immediately', required: true, reference: 'ADNOC GR-9', hazardCategory: 'incident-investigation', severity: 'critical' },
      { id: 'i10', text: 'GR-10: Stop Work Authority understood; no retaliation policy communicated', required: true, reference: 'ADNOC GR-10', hazardCategory: 'behavioral-safety', severity: 'critical' },
    ],
    signOffRequired: true,
    digitalSignature: true,
  },
  {
    id: 'gulf-cl-003',
    moduleId: 'adosh-framework',
    title: 'ADOSH CoP 16 Heat Stress Compliance Checklist',
    description: 'Daily heat stress monitoring and compliance verification per ADOSH CoP 16',
    category: 'daily',
    frequency: 'daily',
    items: [
      { id: 'i1', text: 'WBGT measured and recorded at 08:00, 11:00, 14:00', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i2', text: 'Work/rest cycle implemented per WBGT zone', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i3', text: 'New workers (≤14 days) on reduced exposure per acclimatization plan', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i4', text: 'Hydration stations: 1L/hour water + electrolytes available', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i5', text: 'Shaded rest areas with cooling available', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'high' },
      { id: 'i6', text: 'Buddy system active; 15-min check-ins for heat symptoms', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i7', text: 'Supervisors trained in heat illness recognition', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i8', text: 'Summer work ban enforced: no work 12:30-15:00 (Jun 15-Sep 15)', required: true, reference: 'UAE Summer Ban', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i9', text: 'Emergency cooling/ice bath available for heat stroke', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i10', text: 'Heat illness incident reporting procedure communicated', required: true, reference: 'ADOSH CoP 16', hazardCategory: 'heat-cold-stress', severity: 'high' },
    ],
    signOffRequired: true,
    digitalSignature: true,
  },
  {
    id: 'gulf-cl-004',
    moduleId: 'gulf-environmental',
    title: 'GCC Summer Work Ban Compliance Verification',
    description: 'Verification of country-specific summer midday work ban compliance',
    category: 'compliance',
    frequency: 'daily',
    items: [
      { id: 'i1', text: 'UAE: No work 12:30-15:00 (Jun 15 - Sep 15) for outdoor workers', required: true, reference: 'UAE Ministerial Decree', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i2', text: 'Qatar: No work 10:00-15:00 (Jun 1 - Sep 15) for outdoor workers', required: true, reference: 'Qatar Labour Law', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i3', text: 'Kuwait: No work 11:00-16:00 (Jun 1 - Aug 31) for outdoor workers', required: true, reference: 'Kuwait Labour Law', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i4', text: 'Oman: No work 12:00-15:00 (Jun - Sep) for outdoor workers', required: true, reference: 'Oman Ministerial Decision', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i5', text: 'Bahrain: No work 12:00-16:00 (Jun - Sep) for outdoor workers', required: true, reference: 'Bahrain Labour Law', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i6', text: 'KSA: Check regional MOMRA/MOH directives for specific hours', required: true, reference: 'KSA MOH/MOMRA', hazardCategory: 'heat-cold-stress', severity: 'critical' },
      { id: 'i7', text: 'Shaded rest areas provided during ban hours', required: true, reference: 'GCC Standards', hazardCategory: 'heat-cold-stress', severity: 'high' },
      { id: 'i8', text: 'Water and electrolytes available during ban hours', required: true, reference: 'GCC Standards', hazardCategory: 'heat-cold-stress', severity: 'high' },
      { id: 'i9', text: 'Workers informed of rights to refuse unsafe heat exposure', required: true, reference: 'GCC Standards', hazardCategory: 'heat-cold-stress', severity: 'high' },
      { id: 'i10', text: 'Non-compliance reporting mechanism active', required: true, reference: 'GCC Standards', hazardCategory: 'heat-cold-stress', severity: 'high' },
    ],
    signOffRequired: true,
    digitalSignature: true,
  },
  {
    id: 'gulf-cl-005',
    moduleId: 'gulf-cultural-welfare',
    title: 'Worker Welfare Camp Standards Audit (GCC)',
    description: 'Monthly audit of worker accommodation per GCC standards',
    category: 'welfare',
    frequency: 'monthly',
    items: [
      { id: 'i1', text: 'Accommodation: minimum 4m² per person', required: true, reference: 'GCC Standards', hazardCategory: 'worker-welfare', severity: 'high' },
      { id: 'i2', text: 'AC functional; temperature <25°C in sleeping areas', required: true, reference: 'GCC Standards', hazardCategory: 'worker-welfare', severity: 'critical' },
      { id: 'i3', text: 'Prayer facility: clean, oriented to Mecca, capacity >50 workers', required: true, reference: 'UAE/GCC Regulations', hazardCategory: 'worker-welfare', severity: 'high' },
      { id: 'i4', text: 'Food safety: HACCP certified kitchen; halal; nutrition standards', required: true, reference: 'GCC Standards', hazardCategory: 'worker-welfare', severity: 'critical' },
      { id: 'i5', text: 'Transport: IVMS on all buses; driver hours compliant; seatbelts', required: true, reference: 'GCC Standards', hazardCategory: 'transportation-safety', severity: 'critical' },
      { id: 'i6', text: 'Medical clinic: ratio 1:500 workers; ambulance on-site', required: true, reference: 'GCC Standards', hazardCategory: 'occupational-health', severity: 'high' },
      { id: 'i7', text: 'Recreation: gym, communication facilities, welfare officer', required: true, reference: 'GCC Standards', hazardCategory: 'worker-welfare', severity: 'medium' },
      { id: 'i8', text: 'Grievance mechanism: anonymous, multilingual, timely resolution', required: true, reference: 'GCC Standards', hazardCategory: 'worker-welfare', severity: 'high' },
      { id: 'i9', text: 'Fire safety: Civil Defence approved; drills monthly', required: true, reference: 'Civil Defence', hazardCategory: 'fire-safety', severity: 'critical' },
      { id: 'i10', text: 'Gender segregation: separate accommodation, transport, facilities', required: true, reference: 'GCC Cultural Requirements', hazardCategory: 'worker-welfare', severity: 'high' },
    ],
    signOffRequired: true,
    digitalSignature: true,
  },
];

// ============================================
// GULF PROCEDURES
// ============================================

const GULF_PROCEDURES: Procedure[] = [
  {
    id: 'gulf-proc-001',
    moduleId: 'adnoc-100-series',
    title: 'ADNOC HSE Passport Verification Procedure',
    description: 'Procedure for verifying ADNOC HSE Passport validity at site entry',
    purpose: 'Ensure all personnel at ADNOC sites hold valid HSE Passport',
    scope: 'All ADNOC Group sites and facilities',
    responsibilities: [
      { role: 'Security/Gate Personnel', responsibilities: ['Scan passport QR code', 'Verify validity date', 'Check photo match', 'Deny entry if invalid/expired'], authority: 'Deny site access' },
      { role: 'HSE Department', responsibilities: ['Maintain passport database', 'Coordinate renewals', 'Audit compliance weekly'], authority: 'Suspend non-compliant contractors' },
      { role: 'Contractor Management', responsibilities: ['Ensure workers have valid passports', 'Schedule renewals 60 days prior', 'Track expiration dates'], authority: 'Remove non-compliant workers' },
    ],
    steps: [
      { id: 's1', order: 1, title: 'Pre-Arrival Verification', description: 'Contractor submits worker passport details 48 hours before site entry', warnings: ['No walk-ins without pre-verification'], estimatedMinutes: 10, responsibleRole: 'Contractor Management', verificationMethod: 'Database cross-reference', acceptanceCriteria: 'All workers pre-verified in system' },
      { id: 's2', order: 2, title: 'Gate Entry Scan', description: 'Security scans QR code; system validates expiry, photo, category', warnings: ['Expired = immediate denial', 'Photo mismatch = secondary verification'], estimatedMinutes: 2, responsibleRole: 'Security', verificationMethod: 'Automated system', acceptanceCriteria: 'Green light = entry granted' },
      { id: 's3', order: 3, title: 'On-Site Spot Checks', description: 'HSE conducts random passport checks during shift', warnings: ['Expired passport found = immediate removal'], estimatedMinutes: 15, responsibleRole: 'HSE', verificationMethod: 'Physical verification', acceptanceCriteria: '100% compliance on spot checks' },
      { id: 's4', order: 4, title: 'Renewal Management', description: 'Automated alerts at 90/60/30 days before expiry', warnings: ['No grace period after expiry'], estimatedMinutes: 5, responsibleRole: 'Contractor Management', verificationMethod: 'Alert system', acceptanceCriteria: 'Zero expired passports on site' },
    ],
    requiredPPE: [],
    requiredTools: ['QR Scanner', 'ADNOC Portal Access', 'Camera'],
    references: [
      { id: 'ref1', title: 'ADNOC HSE Standard 105', type: 'regulation', source: 'ADNOC', url: '', publicationDate: new Date('2024-01-01'), relevance: 'Competence & Training standard' },
      { id: 'ref2', title: 'ADNOC HSE Passport User Guide', type: 'guide', source: 'ADNOC', url: '', publicationDate: new Date('2024-01-01'), relevance: 'Implementation guide' },
    ],
    relatedProcedures: ['adnoc-ptw-procedure', 'adnoc-contractor-management'],
    revisionHistory: [
      { version: '1.0', date: new Date('2024-01-15'), author: 'ADNOC HSE', changes: ['Initial release'], approvedBy: 'ADNOC HSE VP' },
    ],
  },
  {
    id: 'gulf-proc-002',
    moduleId: 'adosh-framework',
    title: 'ADOSH Heat Stress Management Procedure',
    description: 'Procedure for managing heat stress per ADOSH CoP 16 and UAE Summer Ban',
    purpose: 'Prevent heat-related illness through monitoring, work/rest cycles, and acclimatization',
    scope: 'All outdoor work in Abu Dhabi Emirate June 15 - September 15',
    responsibilities: [
      { role: 'Site HSE Officer', responsibilities: ['Measure WBGT 3x daily', 'Implement work/rest cycles', 'Monitor acclimatization', 'Enforce summer ban'], authority: 'Stop work for heat safety' },
      { role: 'Supervisors', responsibilities: ['Enforce work/rest cycles', 'Monitor workers for symptoms', 'Ensure hydration', 'Report heat symptoms immediately'], authority: 'Remove symptomatic workers' },
      { role: 'Workers', responsibilities: ['Follow work/rest cycles', 'Hydrate per protocol', 'Report symptoms', 'Use buddy system'], authority: 'Self-remove if symptomatic' },
      { role: 'Medical Staff', responsibilities: ['Heat illness first aid', 'Acclimatization assessments', 'Return-to-work clearance'], authority: 'Medical restriction' },
    ],
    steps: [
      { id: 's1', order: 1, title: 'Pre-Season Preparation (May)', description: 'Calibrate WBGT meters; train supervisors; develop acclimatization plans; set up hydration stations', warnings: ['All prep complete by June 1'], estimatedMinutes: 480, responsibleRole: 'HSE Manager', verificationMethod: 'Audit checklist', acceptanceCriteria: '100% readiness by June 1' },
      { id: 's2', order: 2, title: 'Daily WBGT Monitoring', description: 'Measure WBGT at 08:00, 11:00, 14:00; record in log; communicate zone', warnings: ['Post WBGT zone at site entrance'], estimatedMinutes: 10, responsibleRole: 'HSE Officer', verificationMethod: 'Log review', acceptanceCriteria: '3 readings daily posted' },
      { id: 's3', order: 3, title: 'Work/Rest Cycle Implementation', description: 'Apply ACGIH/ISO 7243 cycles per WBGT zone; post schedule; enforce compliance', warnings: ['Non-compliance = stop work'], estimatedMinutes: 0, responsibleRole: 'Supervisors', verificationMethod: 'Observation', acceptanceCriteria: 'Cycles followed 100%' },
      { id: 's4', order: 4, title: 'Acclimatization Management', description: 'New workers: 7-14 day progressive exposure; 50% reduced work time days 1-3; track in register', warnings: ['No exceptions for "experienced" workers'], estimatedMinutes: 0, responsibleRole: 'Supervisors', verificationMethod: 'Register review', acceptanceCriteria: 'All new workers tracked' },
      { id: 's5', order: 5, title: 'Summer Ban Enforcement', description: 'ZERO work 12:30-15:00 (Jun 15-Sep 15) for outdoor workers; shaded rest provided', warnings: ['Violation = MOHRE fine AED 50,000+'], estimatedMinutes: 0, responsibleRole: 'Site Management', verificationMethod: 'Time records', acceptanceCriteria: 'Zero violations' },
      { id: 's6', order: 6, title: 'Heat Illness Response', description: 'Recognize symptoms; immediate cooling; ice bath for heat stroke; medical evacuation', warnings: ['Heat stroke = medical emergency - call 998'], estimatedMinutes: 0, responsibleRole: 'All Personnel', verificationMethod: 'Drill records', acceptanceCriteria: 'Response time <3 minutes' },
    ],
    requiredPPE: ['Cooling vest (optional)', 'Wide-brim hat', 'UV-protective clothing'],
    requiredTools: ['WBGT Meter (calibrated)', 'Thermometer', 'Ice bath/cooling equipment', 'Hydration stations'],
    references: [
      { id: 'ref1', title: 'ADOSH CoP 16 - Heat Stress', type: 'regulation', source: 'ADOSH', publicationDate: new Date('2024-01-01'), relevance: 'Primary regulatory reference' },
      { id: 'ref2', title: 'ISO 7243 / ACGIH TLV', type: 'standard', source: 'ISO/ACGIH', publicationDate: new Date('2024-01-01'), relevance: 'Technical basis for work/rest cycles' },
      { id: 'ref3', title: 'UAE Ministerial Decree - Summer Ban', type: 'regulation', source: 'MOHRE', publicationDate: new Date('2024-01-01'), relevance: 'Legal requirement' },
    ],
    relatedProcedures: ['emergency-response', 'incident-reporting'],
    revisionHistory: [
      { version: '2.0', date: new Date('2024-01-15'), author: 'ADOSH HSE', changes: ['Updated WBGT thresholds', 'Added acclimatization details'], approvedBy: 'ADOSH Director' },
    ],
  },
  {
    id: 'gulf-proc-003',
    moduleId: 'aramco-gi-sas',
    title: 'Aramco SAS-005 Scaffold Inspection & Tagging Procedure',
    description: 'Procedure for scaffold erection, inspection, tagging, and compliance per Aramco SAS-005',
    purpose: 'Ensure all scaffolds at Aramco facilities meet SAS-005 requirements',
    scope: 'All scaffolding at Saudi Aramco facilities',
    responsibilities: [
      { role: 'Aramco Certified Scaffold Inspector', responsibilities: ['Inspect scaffolds weekly', 'Apply GREEN/RED tags', 'Maintain inspection register', 'Report non-compliance'], authority: 'RED-tag and remove from service' },
      { role: 'Scaffolding Contractor', responsibilities: ['Erect per design', 'Request inspections', 'Maintain scaffolds', 'Train workers'], authority: 'Request inspection' },
      { role: 'Aramco HSE', responsibilities: ['Audit inspector performance', 'Random tag verification', 'Approve inspector certification'], authority: 'Suspend inspector certification' },
      { role: 'Area Management', responsibilities: ['Ensure inspector availability', 'Fund scaffold program', 'Enforce compliance'], authority: 'Stop work for scaffold safety' },
    ],
    steps: [
      { id: 's1', order: 1, title: 'Pre-Erection Planning', description: 'Scaffold design approved; competent persons identified; materials certified', warnings: ['No erection without approved design'], estimatedMinutes: 120, responsibleRole: 'Contractor + Inspector', verificationMethod: 'Design review', acceptanceCriteria: 'Design signed by competent person' },
      { id: 's2', order: 2, title: 'Initial Inspection & GREEN Tag', description: 'Inspector inspects completed scaffold; applies GREEN tag with date/signature; enters in register', warnings: ['No GREEN tag = no use'], estimatedMinutes: 30, responsibleRole: 'Aramco Certified Inspector', verificationMethod: 'Tag verification', acceptanceCriteria: 'GREEN tag visible at all access points' },
      { id: 's3', order: 3, title: 'Weekly Re-Inspection', description: 'Inspector re-inspects every 7 days MAX; updates tag date; documents defects; re-tags GREEN if compliant', warnings: ['Day 8 without inspection = automatic RED tag'], estimatedMinutes: 30, responsibleRole: 'Aramco Certified Inspector', verificationMethod: 'Register audit', acceptanceCriteria: 'Zero scaffolds >7 days without inspection' },
      { id: 's4', order: 4, title: 'Defect Management', description: 'Defects categorized: Critical (immediate RED), Major (24hr fix), Minor (7 day fix); re-inspect after repair', warnings: ['Critical = immediate evacuation & RED tag'], estimatedMinutes: 0, responsibleRole: 'Inspector + Contractor', verificationMethod: 'Defect register', acceptanceCriteria: 'Critical defects resolved before re-use' },
      { id: 's5', order: 5, title: 'Aramco HSE Random Audit', description: 'Aramco HSE audits 10% scaffolds monthly; verifies tag authenticity; checks inspector competence', warnings: ['Forged tags = contractor ban'], estimatedMinutes: 60, responsibleRole: 'Aramco HSE', verificationMethod: 'Audit report', acceptanceCriteria: 'Zero forged tags; 100% inspector competence' },
      { id: 's6', order: 6, title: 'Dismantling & Final Inspection', description: 'Inspector verifies safe dismantling; removes tags; closes register entry', warnings: ['No partial dismantling without inspection'], estimatedMinutes: 30, responsibleRole: 'Inspector', verificationMethod: 'Register closure', acceptanceCriteria: 'Register entry closed with final sign-off' },
    ],
    requiredPPE: ['Hard hat', 'Safety harness', 'Safety boots', 'High-vis vest', 'Gloves'],
    requiredTools: ['Level', 'Measuring tape', 'Tag applicator', 'Inspection register (digital)', 'Camera'],
    references: [
      { id: 'ref1', title: 'Aramco SAS-005 Scaffolding', type: 'regulation', source: 'Aramco', publicationDate: new Date('2024-01-01'), relevance: 'Primary standard' },
      { id: 'ref2', title: 'Aramco GI 2.107 Audit & Inspection', type: 'regulation', source: 'Aramco', publicationDate: new Date('2024-01-01'), relevance: 'Audit requirements' },
      { id: 'ref3', title: 'Aramco Scaffold Inspector Certification', type: 'guide', source: 'Aramco', publicationDate: new Date('2024-01-01'), relevance: 'Inspector competence' },
    ],
    relatedProcedures: ['permit-to-work', 'work-at-height', 'fall-protection'],
    revisionHistory: [
      { version: '3.0', date: new Date('2024-01-15'), author: 'Aramco HSE', changes: ['Added digital tags', 'QR code verification', 'Automated alerts'], approvedBy: 'Aramco HSE VP' },
    ],
  },
];

// ============================================
// GULF GLOSSARY TERMS
// ============================================

const GULF_GLOSSARY: GlossaryTerm[] = [
  { id: 'gt-001', term: 'ADNOC HSE Passport', definition: 'Mandatory 3-year certification for all personnel working at ADNOC Group sites. Verified online via ADNOC portal. Categories: Basic, Supervisor, Specialist.', category: 'certification', level: 'basic', synonyms: ['ADNOC Passport', 'HSE Passport'], relatedTerms: ['ADNOC 105', 'Competence Assurance'], standards: ['ADNOC'], illustrationId: 'adnoc-passport' },
  { id: 'gt-002', term: 'ADNOC Golden Rules (GR-1 to GR-10)', definition: '10 mandatory life-saving rules applicable to ALL personnel at ADNOC sites. Zero tolerance. Violations result in immediate removal and potential ban.', category: 'behavioral-safety', level: 'basic', synonyms: ['ADNOC Life-Saving Rules', 'GRs'], relatedTerms: ['Stop Work Authority', 'PTW', 'Fall Protection'], standards: ['ADNOC'], illustrationId: 'adnoc-golden-rules' },
  { id: 'gt-003', term: 'ADOSH', definition: 'Abu Dhabi Occupational Safety and Health - the regulatory authority for OSH in Abu Dhabi Emirate. Established by Law 19/2005. Mandates OSH Management System per Decree 42/2009.', category: 'regulation', level: 'basic', synonyms: ['Abu Dhabi OSH'], relatedTerms: ['ADOSH SF', 'ADOSH CoPs'], standards: ['ADOSH'] },
  { id: 'gt-004', term: 'ADOSH CoP 16 (Heat Stress)', definition: 'Code of Practice mandating WBGT monitoring, work/rest cycles, acclimatization (7-14 days), hydration, and summer work ban enforcement (12:30-15:00 Jun 15-Sep 15).', category: 'heat-cold-stress', level: 'intermediate', synonyms: ['Heat Stress CoP'], relatedTerms: ['WBGT', 'Summer Ban', 'Acclimatization'], standards: ['ADOSH'] },
  { id: 'gt-005', term: 'Aramco GI 2.100 Series', definition: 'General Instructions forming Aramco HSE Management System. 12 elements (GI 2.101 to 2.112) covering HSE MS, Planning, Risk, Contractors, Training, Incidents, Audit, Emergency, Occ Health, Environment, PSM, Security.', category: 'management', level: 'intermediate', synonyms: ['Aramco GI', 'Aramco HSE MS'], relatedTerms: ['Aramco SAS', 'Aramco SAES'], standards: ['ARAMCO'] },
  { id: 'gt-006', term: 'Aramco SAS (Saudi Aramco Standards)', definition: 'Operational HSE standards (SAS-001 to SAS-050+) covering Risk Assessment, Investigation, Confined Space, Fall Protection, Scaffolding, Lifting, Electrical, Hot Work, Excavation, PPE.', category: 'procedures', level: 'intermediate', synonyms: ['Aramco SAS Standards'], relatedTerms: ['Aramco GI', 'Aramco Life Saving Rules'], standards: ['ARAMCO'] },
  { id: 'gt-007', term: 'Aramco Life Saving Rules (12 Rules)', definition: '12 mandatory rules: Work Authorization, Energy Isolation, Confined Space, Working at Height, Safe Driving, Lifting, Hot Work, Line Breaking, PPE, Drug/Alcohol, Environment, Stop Work Authority. Applies to ALL at Aramco sites.', category: 'behavioral-safety', level: 'basic', synonyms: ['Aramco LSR'], relatedTerms: ['Stop Work Authority', 'SAS Standards'], standards: ['ARAMCO'] },
  { id: 'gt-008', term: 'WBGT (Wet Bulb Globe Temperature)', definition: 'Composite temperature index (ISO 7243) combining dry bulb, wet bulb, and globe temperature. Used to assess heat stress and determine work/rest cycles. Mandatory per ADOSH CoP 16.', category: 'heat-cold-stress', level: 'intermediate', synonyms: ['Heat Stress Index'], relatedTerms: ['Heat Stress', 'Work/Rest Cycles', 'Acclimatization'], standards: ['ISO31000', 'ADOSH', 'ADNOC', 'ARAMCO'] },
  { id: 'gt-009', term: 'UAE Summer Midday Work Ban', definition: 'Mandatory work stoppage 12:30-15:00 (June 15 - September 15) for workers exposed to direct sunlight. Enforced by MOHRE. Penalty: AED 50,000-200,000 per violation.', category: 'heat-cold-stress', level: 'basic', synonyms: ['Summer Ban', 'Midday Break'], relatedTerms: ['Heat Stress', 'WBGT', 'MOHRE'], standards: ['UAE', 'ADOSH'] },
  { id: 'gt-010', term: 'Qatar Summer Work Ban', definition: 'Mandatory work stoppage 10:00-15:00 (June 1 - September 15) for outdoor workers. Stricter than UAE ban. Enforced by MOL/QCD.', category: 'heat-cold-stress', level: 'basic', synonyms: ['Qatar Midday Ban'], relatedTerms: ['Qatar Labour Law', 'QCD'], standards: ['QATAR'] },
  { id: 'gt-011', term: 'GCC PPE Standards (GSO 1722-1732)', definition: 'GCC Standardization Organization adopted standards for PPE: helmets (1723), footwear (1724), eye (1725), hearing (1726), respiratory (1727), fall (1728), fire (1729), signs (1730 bilingual), confined space (1731), gas detection (1732).', category: 'ppe', level: 'intermediate', synonyms: ['GSO PPE Standards'], relatedTerms: ['PPE Selection', 'GCC Standards'], standards: ['GCC'] },
  { id: 'gt-012', term: 'Civil Defence Tiers (UAE)', definition: 'Three-tier emergency response: Tier 1 (Site ERT), Tier 2 (Civil Defence Station), Tier 3 (Civil Defence HQ + Mutual Aid). Mandatory drills per tier.', category: 'emergency-response', level: 'intermediate', synonyms: ['UAE ERT Tiers'], relatedTerms: ['ERP', 'Civil Defence', 'Mutual Aid'], standards: ['UAE', 'ADNOC', 'ADOSH'] },
  { id: 'gt-013', term: 'ADOSH 48-Hour Incident Reporting', definition: 'Regulatory requirement to notify ADOSH within 48 hours of serious incidents (fatality, major injury, dangerous occurrence). Penalty for non-compliance: AED 50,000-200,000.', category: 'incident-investigation', level: 'intermediate', synonyms: ['ADOSH Notification'], relatedTerms: ['Incident Investigation', 'TapRooT', 'ADNOC 72-hr'], standards: ['ADOSH'] },
  { id: 'gt-014', term: 'Aramco 24-Hour Incident Reporting', definition: 'Aramco GI 2.106 requires ALL incidents reported within 24 hours. Classification: Tier 1 (Immediate), Tier 2 (24hr), Tier 3 (72hr). Stricter than ADNOC/ADOSH.', category: 'incident-investigation', level: 'intermediate', synonyms: ['Aramco Incident Reporting'], relatedTerms: ['TapRooT', 'Root Cause', 'Lessons Learned'], standards: ['ARAMCO'] },
  { id: 'gt-015', term: 'ADNOC Contractor Management System (CMS)', definition: 'Online system for contractor pre-qualification, HSE plan submission, performance scoring, and certification. Mandatory for all ADNOC contractors. Categories: A/B/C/D based on risk.', category: 'contractor-management', level: 'intermediate', synonyms: ['ADNOC CMS'], relatedTerms: ['Contractor Pre-qualification', 'HSE Plans', 'Performance Scoring'], standards: ['ADNOC'] },
  { id: 'gt-016', term: 'Ramadan Working Hours (UAE/GCC)', definition: 'Legal requirement: Maximum 6 hours/day during Ramadan for ALL workers (Muslim and non-Muslim). Enforced by MOHRE/MOL. Reduced hours with same pay.', category: 'cultural', level: 'basic', synonyms: ['Ramadan Hours'], relatedTerms: ['Worker Welfare', 'Labour Law'], standards: ['UAE', 'QATAR', 'OMAN', 'KUWAIT', 'BAHRAIN'] },
  { id: 'gt-017', term: 'Worker Welfare Standards (GCC)', definition: 'Mandatory standards: 4m²/person accommodation, AC <25°C, prayer facilities (>50 workers), HACCP food, IVMS transport, medical clinic 1:500, grievance mechanism, gender segregation.', category: 'worker-welfare', level: 'intermediate', synonyms: ['Camp Standards'], relatedTerms: ['Worker Accommodation', 'Transport Safety'], standards: ['GCC', 'UAE', 'QATAR', 'OMAN', 'KUWAIT', 'BAHRAIN'] },
];

// ============================================
// GULF FAQs
// ============================================

const GULF_FAQS: FAQ[] = [
  { id: 'gulf-faq-001', moduleId: 'adnoc-100-series', question: 'Is ADNOC HSE Passport required for short-term visitors?', answer: 'Yes. ALL personnel entering ADNOC operational sites require valid HSE Passport. Visitors can obtain temporary "Visitor Passport" valid for 30 days through sponsor department.', category: 'certification', tags: ['adnoc', 'passport', 'visitor', 'site-access'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-002', moduleId: 'adnoc-golden-rules', question: 'Can a supervisor override a Golden Rule for urgent work?', answer: 'ABSOLUTELY NOT. Golden Rules are non-negotiable. No urgency, deadline, or management directive can override a Golden Rule. GR-10 (Stop Work Authority) gives EVERYONE the right and duty to stop unsafe work.', category: 'behavioral-safety', tags: ['adnoc', 'golden-rules', 'stop-work-authority', 'non-negotiable'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-003', moduleId: 'adosh-framework', question: 'Does ADOSH Decree 42/2009 apply to free zone companies in Abu Dhabi?', answer: 'Yes. ADOSH jurisdiction covers ALL entities operating in Abu Dhabi Emirate, including free zones. Free zone authorities coordinate with ADOSH for enforcement.', category: 'regulation', tags: ['adosh', 'decree-42', 'free-zone', 'jurisdiction'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-004', moduleId: 'gulf-environmental', question: 'What if WBGT monitoring equipment fails during summer?', answer: 'Work must STOP until equipment is repaired/replaced. No estimation or "feels like" judgments permitted. Backup WBGT meters should be on-site. This is a regulatory requirement per ADOSH CoP 16.', category: 'heat-stress', tags: ['wbgt', 'equipment-failure', 'work-stoppage', 'adosh-cop16'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-005', moduleId: 'gulf-cultural-welfare', question: 'Are non-Muslim workers entitled to reduced hours during Ramadan?', answer: 'YES. UAE Labour Law (and GCC equivalents) mandates maximum 6 hours/day during Ramadan for ALL workers regardless of religion. This is a legal requirement, not a religious accommodation.', category: 'cultural', tags: ['ramadan', 'working-hours', 'non-muslim', 'legal-requirement', 'uae-labour-law'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-006', moduleId: 'aramco-gi-sas', question: 'What happens if a scaffold tag is found to be forged?', answer: 'Immediate consequences: 1) Scaffold RED-tagged and removed from service, 2) Contractor banned from Aramco sites (typically 3-5 years), 3) Scaffold inspector certification revoked, 4) Incident reported to Aramco HSE VP, 4) Criminal referral possible.', category: 'compliance', tags: ['aramco', 'sas-005', 'scaffold', 'forged-tag', 'contractor-ban'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-007', moduleId: 'qatar-hse', question: 'How does Qatar Civil Defence approval process differ from UAE?', answer: 'Qatar requires: 1) Fire safety drawings submitted to QCD before construction, 2) QCD inspection at 50% and 100% completion, 3) Fire Safety Certificate issued before occupancy, 4) Annual renewal inspection. More centralized than UAE municipality-based approach.', category: 'fire-safety', tags: ['qatar', 'civil-defence', 'fire-certificate', 'approval-process'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-008', moduleId: 'oman-hse', question: 'What is the PDO HSE Passport and how does it differ from ADNOC?', answer: 'PDO HSE Passport: 2-year validity (vs ADNOC 3-year), mandatory for all PDO sites, includes PDO-specific modules (Khareef season, cyclone prep), online verification via PDO portal. Different standards alignment (PDO HSE MS vs ADNOC 100 Series).', category: 'certification', tags: ['pdo', 'passport', 'oman', '2-year', 'khareef'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
  { id: 'gulf-faq-009', moduleId: 'kuwait-hse', question: 'What is the Kuwait summer work ban period?', answer: 'Kuwait: 11:00 AM to 4:00 PM (June 1 - August 31) for outdoor workers. Enforced by Kuwait Fire Service Directorate and Public Authority for Industry. Different from UAE (12:30-3:00) and Qatar (10:00-3:00).', category: 'heat-stress', tags: ['kuwait', 'summer-ban', '11-to-4', 'june-august'], helpfulCount: 0, lastUpdated: new Date('2024-01-15') },
];

// ============================================
// GULF LESSONS - ADNOC 100 SERIES
// ============================================

const ADNOC_100_LESSONS: Lesson[] = [
  {
    id: 'adnoc100-l1',
    moduleId: 'adnoc-100-series',
    title: 'ADNOC HSE Standard 101: Policy & Leadership',
    description: 'Understanding ADNOC HSE policy requirements, leadership accountability, and policy communication',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 45,
    contentType: 'interactive',
    content: {
      html: '<h2>ADNOC HSE Standard 101: HSE Policy & Leadership</h2><p>Standard 101 establishes the foundation of ADNOC HSE Management System through clear policy and visible leadership commitment.</p><h3>Key Requirements:</h3><ul><li><strong>HSE Policy Statement</strong>: Signed by CEO, communicated in Arabic/English</li><li><strong>Leadership Commitment</strong>: Visible participation in HSE activities</li><li><strong>Accountability</strong>: Line management owns HSE performance</li><li><strong>Communication</strong>: Policy posted at all sites, in worker languages</li></ul>', markdown: '## ADNOC HSE Standard 101: HSE Policy & Leadership\n\nStandard 101 establishes the foundation of ADNOC HSE Management System through clear policy and visible leadership commitment.\n\n### Key Requirements:\n\n- **HSE Policy Statement**: Signed by CEO, communicated in Arabic/English\n- **Leadership Commitment**: Visible participation in HSE activities\n- **Accountability**: Line management owns HSE performance\n- **Communication**: Policy posted at all sites, in worker languages', sections: [{ id: 's1', title: 'Policy Statement', content: 'CEO-signed, bilingual (Arabic/English), reviewed annually, communicated to all personnel including contractors.', type: 'text' }, { id: 's2', title: 'Leadership Accountability', content: 'Line managers at all levels are accountable for HSE performance in their areas. HSE is not delegated to HSE department.', type: 'text' }, { id: 's3', title: 'Communication Requirements', content: 'Policy must be displayed at all site entrances, offices, and common areas in Arabic and English minimum.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-hse-ms', title: 'ADNOC HSE Management System', description: '10 standards of ADNOC 100 Series', type: 'diagram', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'decision-tree', title: 'Policy Communication Decision Tree', description: 'Interactive scenario: How to communicate policy to multilingual workforce', config: { scenario: 'New contractor crew arrives speaking 5 languages', steps: ['Assess languages', 'Provide translated policy', 'Verbal briefing with translator', 'Signed acknowledgment'] }, feedback: { correct: 'Correct. All workers must understand policy in their language.', incorrect: 'Workers cannot comply with policy they don\'t understand.', hints: ['Consider literacy levels', 'Use visual aids', 'Verify understanding'] } }],
    keyPoints: ['CEO must sign policy', 'Bilingual minimum (Arabic/English)', 'Line management accountability', 'Posted at all site entrances'],
    references: [{ id: 'ref1', title: 'ADNOC HSE Standard 101', type: 'regulation', source: 'ADNOC', relevance: 'Primary standard' }],
    quizId: 'adnoc100-q1',
    prerequisites: [],
    learningObjectives: ['Identify ADNOC 101 requirements', 'Explain leadership accountability', 'Describe policy communication requirements'],
    tags: ['adnoc', '100-series', 'policy', 'leadership'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'adnoc100-l2',
    moduleId: 'adnoc-100-series',
    title: 'ADNOC HSE Standard 103: Planning & Risk Assessment',
    description: 'ADNOC risk assessment methodology, ALARP demonstration, and HSE planning requirements',
    order: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    contentType: 'interactive',
    content: {
      html: '<h2>ADNOC HSE Standard 103: Planning & Risk Assessment</h2><p>Standard 103 defines ADNOC-specific risk assessment methodology and ALARP demonstration requirements.</p><h3>ADNOC Risk Matrix:</h3><p>5x5 matrix with consequence (1-5) and likelihood (A-E). Risk ratings: Low, Medium, High, Critical. ALARP required for Medium and above.</p>', markdown: '## ADNOC HSE Standard 103: Planning & Risk Assessment\n\nStandard 103 defines ADNOC-specific risk assessment methodology and ALARP demonstration requirements.\n\n### ADNOC Risk Matrix:\n\n5x5 matrix with consequence (1-5) and likelihood (A-E). Risk ratings: Low, Medium, High, Critical. ALARP required for Medium and above.', sections: [{ id: 's1', title: 'ADNOC Risk Assessment Methodology', content: 'Uses 5x5 matrix. Consequence: 1=Negligible to 5=Catastrophic. Likelihood: A=Rare to E=Almost Certain. Risk = Consequence x Likelihood.', type: 'text' }, { id: 's2', title: 'ALARP Demonstration', content: 'As Low As Reasonably Practicable. Required for all Medium, High, and Critical risks. Must document: risk reduction options considered, cost-benefit analysis, justification for residual risk.', type: 'text' }, { id: 's3', title: 'HSE Planning Cycle', content: 'Annual HSE plans with objectives, targets, KPIs. Quarterly reviews. Management review annually. Integration with business planning.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-hse-ms', title: 'ADNOC HSE Management System', description: '10 standards of ADNOC 100 Series', type: 'diagram', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'calculator', title: 'ADNOC Risk Matrix Calculator', description: 'Interactive tool to calculate risk rating using ADNOC 5x5 matrix', config: { matrix: '5x5', consequenceScale: '1-5', likelihoodScale: 'A-E', alarpThreshold: 'Medium' }, feedback: { correct: 'Risk calculated correctly. ALARP demonstration required.', incorrect: 'Check consequence and likelihood scales.', hints: ['Consequence 1-5', 'Likelihood A-E', 'ALARP for Medium+'] } }],
    keyPoints: ['5x5 risk matrix (Consequence 1-5, Likelihood A-E)', 'ALARP mandatory for Medium+ risks', 'Annual HSE plans with quarterly reviews', 'Integration with business planning'],
    references: [{ id: 'ref1', title: 'ADNOC HSE Standard 103', type: 'regulation', source: 'ADNOC', relevance: 'Primary standard' }],
    quizId: 'adnoc100-q3',
    prerequisites: ['adnoc100-l1'],
    learningObjectives: ['Apply ADNOC risk matrix', 'Demonstrate ALARP', 'Develop HSE plans per ADNOC requirements'],
    tags: ['adnoc', '100-series', 'risk-assessment', 'alarp', 'planning'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - ADNOC GOLDEN RULES
// ============================================

const ADNOC_GR_LESSONS: Lesson[] = [
  {
    id: 'adnoc-gr-l1',
    moduleId: 'adnoc-golden-rules',
    title: 'ADNOC Golden Rules Overview & GR-1: Work Permits',
    description: 'Introduction to all 10 Golden Rules with deep dive on GR-1: No work without valid permit',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 45,
    contentType: 'interactive',
    content: {
      html: '<h2>ADNOC 10 Golden Rules</h2><p>These are <strong>non-negotiable</strong> life-saving rules applying to <strong>ALL</strong> personnel at ADNOC sites.</p><h3>The 10 Golden Rules:</h3><ol><li><strong>GR-1 Work Permits</strong>: No work without valid permit</li><li><strong>GR-2 Isolation & LOTO</strong>: Verify isolation before work</li><li><strong>GR-3 Confined Space</strong>: No entry without permit & gas test</li><li><strong>GR-4 Fall Protection</strong>: 100% tie-off above 1.8m</li><li><strong>GR-5 Safe Driving</strong>: Seatbelts, no mobile, speed limits</li><li><strong>GR-6 Alcohol & Drugs</strong>: Zero tolerance, random testing</li><li><strong>GR-7 PPE</strong>: Mandatory PPE per task</li><li><strong>GR-8 Smoking</strong>: Designated areas only</li><li><strong>GR-9 Reporting</strong>: Report all incidents & near-misses</li><li><strong>GR-10 Stop Work Authority</strong>: Right & duty to stop unsafe work</li></ol>', markdown: '## ADNOC 10 Golden Rules\n\nThese are **non-negotiable** life-saving rules applying to **ALL** personnel at ADNOC sites.\n\n### The 10 Golden Rules:\n\n1. **GR-1 Work Permits**: No work without valid permit\n2. **GR-2 Isolation & LOTO**: Verify isolation before work\n3. **GR-3 Confined Space**: No entry without permit & gas test\n4. **GR-4 Fall Protection**: 100% tie-off above 1.8m\n5. **GR-5 Safe Driving**: Seatbelts, no mobile, speed limits\n6. **GR-6 Alcohol & Drugs**: Zero tolerance, random testing\n7. **GR-7 PPE**: Mandatory PPE per task\n8. **GR-8 Smoking**: Designated areas only\n9. **GR-9 Reporting**: Report all incidents & near-misses\n10. **GR-10 Stop Work Authority**: Right & duty to stop unsafe work', sections: [{ id: 's1', title: 'GR-1: Work Permits', content: 'No work shall commence without a valid Permit to Work (PTW) displayed at the worksite. PTW must be specific to the task, location, and time. Permits expire - check validity. No "verbal permits" allowed.', type: 'text' }, { id: 's2', title: 'GR-10: Stop Work Authority (Most Critical)', content: 'EVERY person has the RIGHT and DUTY to stop unsafe work. No retaliation for exercising this authority. Work remains stopped until risk is resolved. This overrides ALL production pressures.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-golden-rules', title: 'ADNOC 10 Golden Rules', description: 'Visual representation of 10 life-saving rules', type: 'infographic', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Golden Rule Decision Scenarios', description: 'Interactive scenarios testing Golden Rule application', config: { scenarios: ['Contractor says "urgent repair, no time for permit"', 'Supervisor says "tie-off slows us down, just be careful"', 'Worker reports near-miss, supervisor says "don\'t write it up"'] }, feedback: { correct: 'Correct. Golden Rules are non-negotiable.', incorrect: 'No exception to Golden Rules. Stop work authority applies.', hints: ['No urgency overrides GRs', 'Stop work authority is absolute', 'Reporting is mandatory'] } }],
    keyPoints: ['10 Golden Rules are non-negotiable', 'Apply to ALL personnel (employees, contractors, visitors)', 'GR-1: No work without valid PTW', 'GR-10: Stop Work Authority is absolute right and duty'],
    references: [{ id: 'ref1', title: 'ADNOC Golden Rules Document', type: 'regulation', source: 'ADNOC', relevance: 'Official Golden Rules' }],
    quizId: 'adnoc-gr-q1',
    prerequisites: [],
    learningObjectives: ['List all 10 Golden Rules', 'Explain GR-1 permit requirements', 'Understand GR-10 Stop Work Authority'],
    tags: ['adnoc', 'golden-rules', 'permit-to-work', 'stop-work-authority'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'adnoc-gr-l2',
    moduleId: 'adnoc-golden-rules',
    title: 'GR-3 Confined Space & GR-4 Fall Protection Deep Dive',
    description: 'Detailed requirements for confined space entry and fall protection per ADNOC Golden Rules',
    order: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    contentType: 'interactive',
    content: {
      html: '<h2>GR-3: Confined Space - No Entry Without Permit & Gas Test</h2><p><strong>BOTH</strong> a valid confined space entry permit <strong>AND</strong> gas testing are mandatory. No exceptions.</p><h3>Requirements:</h3><ul><li>Valid PTW for confined space</li><li>Pre-entry gas test (O₂, H₂S, LEL, CO)</li><li>Continuous gas monitoring during entry</li><li>Standby person at entry point</li><li>Rescue plan and equipment ready</li><li>Ventilation established</li></ul><h2>GR-4: Fall Protection - 100% Tie-Off Above 1.8m</h2><p>ADNOC standard is <strong>1.8 meters</strong> (stricter than many international standards at 2m).</p><h3>Requirements:</h3><ul><li>100% tie-off at all times above 1.8m</li><li>Certified anchor points only</li><li>Double lanyard for 100% tie-off during transition</li><li>Rescue plan MUST be in place before work</li><li>Equipment inspected before each use</li></ul>', markdown: '## GR-3: Confined Space\n\n**BOTH** a valid confined space entry permit **AND** gas testing are mandatory. No exceptions.\n\n### Requirements:\n- Valid PTW for confined space\n- Pre-entry gas test (O₂, H₂S, LEL, CO)\n- Continuous gas monitoring during entry\n- Standby person at entry point\n- Rescue plan and equipment ready\n- Ventilation established\n\n## GR-4: Fall Protection\n\nADNOC standard is **1.8 meters** (stricter than many international standards at 2m).\n\n### Requirements:\n- 100% tie-off at all times above 1.8m\n- Certified anchor points only\n- Double lanyard for 100% tie-off during transition\n- Rescue plan MUST be in place before work\n- Equipment inspected before each use', sections: [{ id: 's1', title: 'GR-3 Confined Space Requirements', content: 'Permit + Gas Test = MANDATORY pair. Continuous monitoring. Standby person. Rescue plan. Ventilation.', type: 'text' }, { id: 's2', title: 'GR-4 Fall Protection Requirements', content: '1.8m threshold (not 2m). 100% tie-off. Certified anchors. Rescue plan pre-requisite. Equipment inspection.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-golden-rules', title: 'ADNOC 10 Golden Rules', description: 'Visual representation of 10 life-saving rules', type: 'infographic', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'GR-3 & GR-4 Application Scenarios', description: 'Test your understanding of confined space and fall protection rules', config: { scenarios: ['Worker enters vessel with permit but no gas test', 'Worker at 2m height with single lanyard', 'Supervisor says "quick job, no need for rescue plan"'] }, feedback: { correct: 'Correct. Both permit AND gas test required. 1.8m threshold is absolute.', incorrect: 'No exceptions. Both permit AND gas test. 1.8m is non-negotiable.', hints: ['Permit AND gas test - both', '1.8m not 2m', 'Rescue plan before work'] } }],
    keyPoints: ['GR-3: Permit AND gas test - both mandatory', 'GR-4: 1.8m threshold (not 2m)', 'Rescue plan required BEFORE work for both', 'Continuous gas monitoring for confined space'],
    references: [{ id: 'ref1', title: 'ADNOC Golden Rules', type: 'regulation', source: 'ADNOC', relevance: 'Official Golden Rules' }],
    quizId: 'adnoc-gr-q3',
    prerequisites: ['adnoc-gr-l1'],
    learningObjectives: ['Apply GR-3 confined space requirements', 'Apply GR-4 fall protection requirements', 'Identify violations in scenarios'],
    tags: ['adnoc', 'golden-rules', 'confined-space', 'fall-protection'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - ADOSH FRAMEWORK
// ============================================

const ADOSH_LESSONS: Lesson[] = [
  {
    id: 'adosh-l1',
    moduleId: 'adosh-framework',
    title: 'ADOSH System Framework: 10 Elements Overview',
    description: 'Complete overview of ADOSH OSH Management System 10 Elements per Decree 42/2009',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 50,
    contentType: 'interactive',
    content: {
      html: '<h2>ADOSH OSH Management System - 10 Elements</h2><p>Mandatory for <strong>ALL</strong> entities in Abu Dhabi Emirate per Decree 42/2009.</p><h3>The 10 Elements:</h3><ol><li><strong>Policy</strong>: Entity HSE policy signed by CEO</li><li><strong>Organizing</strong>: HSE org chart, competent persons</li><li><strong>Planning & Implementation</strong>: Risk register, legal register, objectives</li><li><strong>Measuring Performance</strong>: Active/reactive monitoring, KPIs</li><li><strong>Audit & Review</strong>: Internal audit, management review</li><li><strong>Contractor Management</strong>: Pre-qual, HSE requirements, monitoring</li><li><strong>Training & Competence</strong>: Needs analysis, approved providers, records</li><li><strong>Consultation & Communication</strong>: HSE committees, worker participation</li><li><strong>Documentation</strong>: Document control, record keeping, retention</li><li><strong>Emergency Preparedness</strong>: ERP, drills, Civil Defence coordination</li></ol>', markdown: '## ADOSH OSH Management System - 10 Elements\n\nMandatory for **ALL** entities in Abu Dhabi Emirate per Decree 42/2009.\n\n### The 10 Elements:\n\n1. **Policy**: Entity HSE policy signed by CEO\n2. **Organizing**: HSE org chart, competent persons\n3. **Planning & Implementation**: Risk register, legal register, objectives\n4. **Measuring Performance**: Active/reactive monitoring, KPIs\n5. **Audit & Review**: Internal audit, management review\n6. **Contractor Management**: Pre-qual, HSE requirements, monitoring\n7. **Training & Competence**: Needs analysis, approved providers, records\n8. **Consultation & Communication**: HSE committees, worker participation\n9. **Documentation**: Document control, record keeping, retention\n10. **Emergency Preparedness**: ERP, drills, Civil Defence coordination', sections: [{ id: 's1', title: 'Element 1: Policy', content: 'Entity-level HSE policy signed by CEO. Communicated in Arabic/English. Reviewed annually. Sets measurable objectives.', type: 'text' }, { id: 's2', title: 'Element 6: Contractor Management (Critical)', content: 'Pre-qualification mandatory. HSE requirements in contracts. Performance monitoring. Non-compliance = removal. Aligns with ADNOC CMS.', type: 'text' }, { id: 's3', title: 'Element 10: Emergency Preparedness', content: 'ERP required. Drills quarterly minimum. Civil Defence coordination mandatory. Tier 1/2/3 response. Business continuity.', type: 'text' }] },
    illustrations: [{ id: 'adosh-framework', title: 'ADOSH System Framework', description: '10 Elements of ADOSH OSH Management System', type: 'diagram', category: 'adosh' }],
    interactiveElements: [{ id: 'ie1', type: 'decision-tree', title: 'ADOSH Compliance Decision Tree', description: 'Determine your entity\'s ADOSH compliance requirements', config: { questions: ['Entity location?', 'Sector?', 'Employee count?', 'Current certifications?'] }, feedback: { correct: 'Correct compliance path identified.', incorrect: 'Review ADOSH Decree 42/2009 scope.', hints: ['All entities in Abu Dhabi', 'Free zones included', 'No employee threshold'] } }],
    keyPoints: ['Mandatory for ALL entities in Abu Dhabi', 'Free zones included - no exemptions', 'Decree 42/2009 is the legal basis', '10 Elements align with ISO 45001 but with UAE specifics'],
    references: [{ id: 'ref1', title: 'ADOSH Decree 42/2009', type: 'regulation', source: 'ADOSH', relevance: 'Legal mandate' }, { id: 'ref2', title: 'ADOSH System Framework (SF)', type: 'guide', source: 'ADOSH', relevance: 'Implementation guide' }],
    quizId: 'adosh-q1',
    prerequisites: [],
    learningObjectives: ['List all 10 ADOSH Elements', 'Explain mandatory applicability', 'Identify key requirements per element'],
    tags: ['adosh', 'uae', 'osh-ms', 'decree-42', 'mandatory'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'adosh-l2',
    moduleId: 'adosh-framework',
    title: 'ADOSH CoP 16: Heat Stress Management',
    description: 'Comprehensive heat stress management per ADOSH CoP 16: WBGT, work/rest cycles, acclimatization, summer ban',
    order: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    contentType: 'interactive',
    content: {
      html: '<h2>ADOSH CoP 16: Heat Stress Management</h2><p>Mandatory Code of Practice for heat stress in Abu Dhabi Emirate.</p><h3>Key Requirements:</h3><ul><li><strong>WBGT Monitoring</strong>: 3x daily (08:00, 11:00, 14:00)</li><li><strong>Work/Rest Cycles</strong>: Per ACGIH/ISO 7243 based on WBGT zone</li><li><strong>Acclimatization</strong>: 7-14 days progressive for new workers</li><li><strong>Hydration</strong>: 1L/hour water + electrolytes for heavy work</li><li><strong>Summer Ban</strong>: ZERO work 12:30-15:00 (Jun 15-Sep 15)</li></ul>', markdown: '## ADOSH CoP 16: Heat Stress Management\n\nMandatory Code of Practice for heat stress in Abu Dhabi Emirate.\n\n### Key Requirements:\n\n- **WBGT Monitoring**: 3x daily (08:00, 11:00, 14:00)\n- **Work/Rest Cycles**: Per ACGIH/ISO 7243 based on WBGT zone\n- **Acclimatization**: 7-14 days progressive for new workers\n- **Hydration**: 1L/hour water + electrolytes for heavy work\n- **Summer Ban**: ZERO work 12:30-15:00 (Jun 15-Sep 15)', sections: [{ id: 's1', title: 'WBGT Monitoring Protocol', content: 'Calibrated WBGT meter required. Readings at 08:00, 11:00, 14:00. Posted at site entrance. Communicated to all supervisors. Zone determines work/rest cycle.', type: 'text' }, { id: 's2', title: 'Work/Rest Cycles per WBGT', content: 'WBGT 28-30°C: Moderate risk - 50/50. WBGT 30-32°C: High risk - 25/75. WBGT >32°C: Extreme - minimize work. Heavy work at WBGT 32°C = 15 min work / 45 min rest per hour.', type: 'text' }, { id: 's3', title: 'Summer Ban Enforcement', content: 'UAE Ministerial Decree: NO WORK 12:30-15:00 (Jun 15-Sep 15) for outdoor workers in direct sun. MOHRE enforcement. Penalty AED 50,000-200,000 per violation. Shaded rest area mandatory during ban.', type: 'text' }] },
    illustrations: [{ id: 'gulf-heat-stress', title: 'Gulf Heat Stress Management', description: 'WBGT zones, work/rest cycles, acclimatization', type: 'diagram', category: 'environmental' }],
    interactiveElements: [{ id: 'ie1', type: 'calculator', title: 'WBGT Work/Rest Cycle Calculator', description: 'Enter WBGT reading to get required work/rest cycle', config: { wbgtInput: true, workIntensity: ['light', 'moderate', 'heavy'], output: 'workRestRatio' }, feedback: { correct: 'Cycle applied correctly. Monitor workers.', incorrect: 'Check WBGT zone and work intensity.', hints: ['Light/Moderate/Heavy work', 'WBGT zones: <28, 28-30, 30-32, >32', 'Summer ban overrides all'] } }],
    keyPoints: ['WBGT 3x daily monitoring mandatory', 'Work/rest cycles per ACGIH/ISO 7243', '7-14 day acclimatization for new workers', 'Summer ban 12:30-15:00 is LAW (Jun 15-Sep 15)', 'Penalty: AED 50,000-200,000 per violation'],
    references: [{ id: 'ref1', title: 'ADOSH CoP 16 - Heat Stress', type: 'regulation', source: 'ADOSH', relevance: 'Primary regulatory reference' }, { id: 'ref2', title: 'ISO 7243 / ACGIH TLV', type: 'standard', source: 'ISO/ACGIH', relevance: 'Technical basis' }, { id: 'ref3', title: 'UAE Ministerial Decree - Summer Ban', type: 'regulation', source: 'MOHRE', relevance: 'Legal requirement' }],
    quizId: 'gulf-env-q3',
    prerequisites: ['adosh-l1'],
    learningObjectives: ['Implement WBGT monitoring program', 'Apply work/rest cycles per WBGT zone', 'Manage acclimatization for new workers', 'Enforce summer work ban'],
    tags: ['adosh', 'cop-16', 'heat-stress', 'wbgt', 'acclimatization', 'summer-ban'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - ARAMCO GI/SAS
// ============================================

const ARAMCO_LESSONS: Lesson[] = [
  {
    id: 'aramco-l1',
    moduleId: 'aramco-gi-sas',
    title: 'Aramco GI 2.100 Series Overview & GI 2.103 Risk Assessment',
    description: 'Overview of Aramco 12-element HSE MS and deep dive into GI 2.103 Risk Assessment with Aramco Risk Matrix',
    order: 1,
    difficulty: 'intermediate',
    estimatedMinutes: 55,
    contentType: 'interactive',
    content: {
      html: '<h2>Aramco GI 2.100 Series: 12-Element HSE Management System</h2><p>Foundation of Aramco HSE. Line management accountability is the core principle.</p><h3>The 12 Elements:</h3><ol><li>GI 2.101: HSE Management System</li><li>GI 2.102: HSE Planning</li><li>GI 2.103: Risk Assessment</li><li>GI 2.104: Contractor HSE Management</li><li>GI 2.105: Training & Competence</li><li>GI 2.106: Incident Reporting & Investigation</li><li>GI 2.107: Audit & Inspection</li><li>GI 2.108: Emergency Preparedness</li><li>GI 2.109: Occupational Health</li><li>GI 2.110: Environmental Protection</li><li>GI 2.111: Process Safety</li><li>GI 2.112: Security</li></ol>', markdown: '## Aramco GI 2.100 Series: 12-Element HSE Management System\n\nFoundation of Aramco HSE. Line management accountability is the core principle.\n\n### The 12 Elements:\n\n1. GI 2.101: HSE Management System\n2. GI 2.102: HSE Planning\n3. GI 2.103: Risk Assessment\n4. GI 2.104: Contractor HSE Management\n5. GI 2.105: Training & Competence\n6. GI 2.106: Incident Reporting & Investigation\n7. GI 2.107: Audit & Inspection\n8. GI 2.108: Emergency Preparedness\n9. GI 2.109: Occupational Health\n10. GI 2.110: Environmental Protection\n11. GI 2.111: Process Safety\n12. GI 2.112: Security', sections: [{ id: 's1', title: 'GI 2.103: Risk Assessment - Aramco Methodology', content: 'Aramco 5x5 Risk Matrix. Consequence: 1-5 (Slight to Catastrophic). Likelihood: A-E (Rare to Almost Certain). Risk = Consequence x Likelihood. ALARP required for Medium, High, Critical. Bowtie analysis for Major Hazards.', type: 'text' }, { id: 's2', title: 'Aramco Risk Register', content: 'Centralized risk register. Each risk: ID, description, consequence, likelihood, current controls, risk rating, ALARP demonstration, additional controls, residual risk, owner, review date. Reviewed quarterly.', type: 'text' }] },
    illustrations: [{ id: 'aramco-risk-matrix', title: 'Aramco Risk Matrix', description: '5x5 risk matrix with ALARP zones', type: 'matrix', category: 'aramco' }],
    interactiveElements: [{ id: 'ie1', type: 'calculator', title: 'Aramco Risk Matrix Calculator', description: 'Calculate risk rating using Aramco 5x5 matrix', config: { consequenceScale: '1-5', likelihoodScale: 'A-E', alarpThreshold: 'Medium', bowtieOption: true }, feedback: { correct: 'Risk rated correctly. ALARP demonstrated?', incorrect: 'Check Aramco consequence/likelihood definitions.', hints: ['Consequence: 1-5', 'Likelihood: A-E', 'ALARP for Medium+', 'Bowtie for Major Hazards'] } }],
    keyPoints: ['12 elements - line management accountability', '5x5 risk matrix (Consequence 1-5, Likelihood A-E)', 'ALARP for Medium/High/Critical', 'Bowtie for Major Hazards', 'Centralized risk register with quarterly review'],
    references: [{ id: 'ref1', title: 'Aramco GI 2.103 Risk Assessment', type: 'regulation', source: 'Aramco', relevance: 'Primary standard' }],
    quizId: 'aramco-q1',
    prerequisites: [],
    learningObjectives: ['Describe Aramco 12-element HSE MS', 'Apply Aramco 5x5 risk matrix', 'Demonstrate ALARP per Aramco requirements'],
    tags: ['aramco', 'gi-2103', 'risk-assessment', 'risk-matrix', 'alarp', 'bowtie'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'aramco-l2',
    moduleId: 'aramco-gi-sas',
    title: 'Aramco SAS-005 Scaffolding & Life Saving Rules',
    description: 'Aramco scaffolding requirements (SAS-005) and 12 Life Saving Rules',
    order: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    contentType: 'interactive',
    content: {
      html: '<h2>Aramco SAS-005: Scaffolding Requirements</h2><p>Strict scaffolding standard with weekly inspection mandate.</p><h3>Key Requirements:</h3><ul><li><strong>Weekly Inspection</strong>: Maximum 7 days between inspections</li><li><strong>Tag System</strong>: GREEN (safe) / RED (unsafe) - MANDATORY at all access points</li><li><strong>Aramco Certified Inspector</strong>: Only Aramco-certified inspectors permitted</li><li><strong>Register</strong>: Digital register with photo evidence</li><li><strong>Random Audits</strong>: Aramco HSE audits 10% monthly</li></ul><h2>Aramco 12 Life Saving Rules</h2><ol><li>Work Authorization</li><li>Energy Isolation</li><li>Confined Space</li><li>Working at Height</li><li>Safe Driving</li><li>Lifting Operations</li><li>Hot Work</li><li>Line Breaking</li><li>PPE</li><li>Drug & Alcohol</li><li>Environmental Protection</li><li>Stop Work Authority</li></ol>', markdown: '## Aramco SAS-005: Scaffolding Requirements\n\nStrict scaffolding standard with weekly inspection mandate.\n\n### Key Requirements:\n\n- **Weekly Inspection**: Maximum 7 days between inspections\n- **Tag System**: GREEN (safe) / RED (unsafe) - MANDATORY at all access points\n- **Aramco Certified Inspector**: Only Aramco-certified inspectors permitted\n- **Register**: Digital register with photo evidence\n- **Random Audits**: Aramco HSE audits 10% monthly\n\n## Aramco 12 Life Saving Rules\n\n1. Work Authorization\n2. Energy Isolation\n3. Confined Space\n4. Working at Height\n5. Safe Driving\n6. Lifting Operations\n7. Hot Work\n8. Line Breaking\n9. PPE\n10. Drug & Alcohol\n11. Environmental Protection\n12. Stop Work Authority', sections: [{ id: 's1', title: 'SAS-005 Compliance', content: 'Weekly inspection NON-NEGOTIABLE. Day 8 without inspection = automatic RED tag. Forged tags = contractor ban (3-5 years). Digital tags with QR codes now mandatory.', type: 'text' }, { id: 's2', title: 'Life Saving Rules vs ADNOC Golden Rules', content: 'Similar principles, different numbering. Both: Stop Work Authority, Confined Space, Fall Protection, PPE, Isolation. Aramco adds: Line Breaking, Lifting Operations, Safe Driving, Environmental Protection. ADNOC adds: Smoking, Reporting.', type: 'text' }] },
    illustrations: [{ id: 'aramco-risk-matrix', title: 'Aramco Risk Matrix', description: '5x5 risk matrix with ALARP zones', type: 'matrix', category: 'aramco' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Scaffold Tag Compliance Scenario', description: 'Scaffold with GREEN tag but inspection 10 days old', config: { scenario: 'Inspector says "looks fine, no need to re-inspect"' }, feedback: { correct: 'Correct. SAS-005 requires WEEKLY inspection. 10 days = RED tag.', incorrect: 'SAS-005 weekly is absolute. No "looks fine" exception.', hints: ['7 days maximum', 'No visual assessment exception', 'Forged tag = ban'] } }],
    keyPoints: ['SAS-005: Weekly inspection MAXIMUM 7 days', 'GREEN/RED tags mandatory at ALL access points', 'Only Aramco-certified inspectors', 'Forged tags = 3-5 year contractor ban', '12 Life Saving Rules - similar to ADNOC GRs'],
    references: [{ id: 'ref1', title: 'Aramco SAS-005 Scaffolding', type: 'regulation', source: 'Aramco', relevance: 'Primary standard' }, { id: 'ref2', title: 'Aramco Life Saving Rules', type: 'regulation', source: 'Aramco', relevance: 'Behavioral requirements' }],
    quizId: 'aramco-q3',
    prerequisites: ['aramco-l1'],
    learningObjectives: ['Apply SAS-005 scaffolding requirements', 'Identify scaffold tag violations', 'Compare Aramco LSRs with ADNOC GRs'],
    tags: ['aramco', 'sas-005', 'scaffolding', 'life-saving-rules', 'inspection'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - UAE FEDERAL LAWS
// ============================================

const UAE_LAWS_LESSONS: Lesson[] = [
  {
    id: 'uae-laws-l1',
    moduleId: 'uae-federal-laws',
    title: 'UAE Federal Law 8/1980 (Labour Law) Articles 91-101: HSE Obligations',
    description: 'Detailed analysis of HSE obligations under UAE Labour Law Articles 91-101',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 45,
    contentType: 'interactive',
    content: {
      html: '<h2>UAE Federal Law 8/1980 - Articles 91-101</h2><p>The core HSE obligations for employers in the UAE.</p><h3>Key Articles:</h3><ul><li><strong>Art 91</strong>: Employer must provide protection against hazards, diseases</li><li><strong>Art 92</strong>: Employer must inform workers of hazards</li><li><strong>Art 93</strong>: Employer must provide PPE at no cost</li><li><strong>Art 94</strong>: Workers must use PPE and follow safety rules</li><li><strong>Art 95</strong>: Employer must have first aid and medical facilities</li><li><strong>Art 96</strong>: Employer must report occupational injuries/diseases</li><li><strong>Art 97-101</strong>: Penalties, compensation, occupational disease schedule</li></ul>', markdown: '## UAE Federal Law 8/1980 - Articles 91-101\n\nThe core HSE obligations for employers in the UAE.\n\n### Key Articles:\n\n- **Art 91**: Employer must provide protection against hazards, diseases\n- **Art 92**: Employer must inform workers of hazards\n- **Art 93**: Employer must provide PPE at no cost\n- **Art 94**: Workers must use PPE and follow safety rules\n- **Art 95**: Employer must have first aid and medical facilities\n- **Art 96**: Employer must report occupational injuries/diseases\n- **Art 97-101**: Penalties, compensation, occupational disease schedule', sections: [{ id: 's1', title: 'Employer Obligations (Art 91-93)', content: 'Provide safe workplace. Inform of hazards. Provide PPE FREE. Maintain equipment. Training in Arabic/worker language.', type: 'text' }, { id: 's2', title: 'Worker Duties & Penalties (Art 94, 97-101)', content: 'Workers must use PPE, follow rules, report hazards. Penalties: fines AED 5,000-200,000. Imprisonment for willful violations causing death. Compensation per schedule.', type: 'text' }] },
    illustrations: [],
    interactiveElements: [{ id: 'ie1', type: 'decision-tree', title: 'UAE Labour Law Compliance Check', description: 'Verify your compliance with Articles 91-101', config: { checks: ['PPE provided free?', 'Hazards communicated in worker language?', 'First aid per ratios?', 'Injury reporting within 24h?', 'Occupational disease reporting?'] }, feedback: { correct: 'Compliant with Articles 91-101.', incorrect: 'Review specific article requirements.', hints: ['PPE must be FREE', 'Language of worker', '24-hour injury report', 'Occupational disease schedule'] } }],
    keyPoints: ['Employer provides PPE at NO COST', 'Hazards communicated in worker\'s language', 'First aid per MOHRE ratios', '24-hour injury reporting to MOHRE', 'Penalties up to AED 200,000 + imprisonment'],
    references: [{ id: 'ref1', title: 'UAE Federal Law 8/1980', type: 'regulation', source: 'MOHRE', relevance: 'Primary legislation' }],
    quizId: 'uae-laws-q1',
    prerequisites: [],
    learningObjectives: ['Identify employer HSE obligations under Art 91-93', 'Explain worker duties under Art 94', 'Describe penalties for non-compliance'],
    tags: ['uae', 'federal-law-8-1980', 'labour-law', 'articles-91-101', 'compliance'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'uae-laws-l2',
    moduleId: 'uae-federal-laws',
    title: 'UAE Summer Work Ban & Civil Defence Requirements',
    description: 'UAE Ministerial Decree Summer Ban (12:30-15:00) and Civil Defence Fire Code compliance',
    order: 2,
    difficulty: 'basic',
    estimatedMinutes: 40,
    contentType: 'interactive',
    content: {
      html: '<h2>UAE Summer Midday Work Ban</h2><p>Ministerial Decree: <strong>NO WORK 12:30-15:00</strong> (June 15 - September 15) for workers in direct sunlight.</p><h3>Requirements:</h3><ul><li>Applies to: Construction, oil & gas, utilities, outdoor maintenance</li><li>Exempt: Indoor air-conditioned work, emergency repairs</li><li>Rest area: Shaded, ventilated, water provided</li><li>Penalty: AED 50,000-200,000 per violation per worker</li></ul><h2>UAE Civil Defence Fire Code</h2><p>Mandatory for all buildings and sites. Key: Fire protection systems, means of egress, fire alarm, firefighting access, annual inspection certificate.</p>', markdown: '## UAE Summer Midday Work Ban\n\nMinisterial Decree: **NO WORK 12:30-15:00** (June 15 - September 15) for workers in direct sunlight.\n\n### Requirements:\n\n- Applies to: Construction, oil & gas, utilities, outdoor maintenance\n- Exempt: Indoor air-conditioned work, emergency repairs\n- Rest area: Shaded, ventilated, water provided\n- Penalty: AED 50,000-200,000 per violation per worker\n\n## UAE Civil Defence Fire Code\n\nMandatory for all buildings and sites. Key: Fire protection systems, means of egress, fire alarm, firefighting access, annual inspection certificate.', sections: [{ id: 's1', title: 'Summer Ban Compliance', content: 'Schedule work before 12:30 or after 15:00. Provide shaded rest area with water. Monitor compliance. Report violations. MOHRE inspects.', type: 'text' }, { id: 's2', title: 'Civil Defence Approval Process', content: 'Fire safety drawings submitted pre-construction. Inspections at 50% and 100%. Fire Safety Certificate required for occupancy. Annual renewal.', type: 'text' }] },
    illustrations: [{ id: 'gulf-summer-ban', title: 'GCC Summer Work Bans', description: 'Country-specific summer work ban hours', type: 'infographic', category: 'environmental' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Summer Ban Compliance Scenario', description: 'Project behind schedule. Manager wants to work through ban.', config: { scenario: 'Concrete pour critical path. Manager says "just this once, 12:30-1:00 only"' }, feedback: { correct: 'Correct. Ban is ABSOLUTE. No exceptions. Reschedule.', incorrect: 'Ban is LAW. No exceptions. Penalty AED 50,000+ per worker.', hints: ['No exceptions', 'Per worker penalty', 'Reschedule or night work'] } }],
    keyPoints: ['Ban: 12:30-15:00 (Jun 15-Sep 15)', 'Per worker penalty: AED 50,000-200,000', 'Shaded rest area with water mandatory', 'Civil Defence certificate required for occupancy', 'Annual fire inspection mandatory'],
    references: [{ id: 'ref1', title: 'UAE Ministerial Decree - Summer Ban', type: 'regulation', source: 'MOHRE', relevance: 'Legal requirement' }, { id: 'ref2', title: 'UAE Fire & Life Safety Code', type: 'regulation', source: 'Civil Defence', relevance: 'Fire safety standard' }],
    quizId: 'uae-laws-q2',
    prerequisites: ['uae-laws-l1'],
    learningObjectives: ['Apply summer ban requirements', 'Describe Civil Defence approval process', 'Calculate penalties for violations'],
    tags: ['uae', 'summer-ban', 'civil-defence', 'fire-code', 'mohre'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - GULF ENVIRONMENTAL
// ============================================

const GULF_ENV_LESSONS: Lesson[] = [
  {
    id: 'gulf-env-l1',
    moduleId: 'gulf-environmental',
    title: 'Gulf Heat Stress Management: WBGT, Work/Rest Cycles, Acclimatization',
    description: 'Comprehensive heat stress management for Gulf extreme environment using WBGT per ISO 7243/ACGIH and ADOSH CoP 16',
    order: 1,
    difficulty: 'intermediate',
    estimatedMinutes: 55,
    contentType: 'interactive',
    content: {
      html: '<h2>Gulf Heat Stress: The Silent Killer</h2><p>Gulf summer: 45-50°C ambient, 80-90% humidity. WBGT often exceeds 32°C (extreme risk). Heat stroke fatal in 30 minutes without treatment.</p><h3>WBGT (Wet Bulb Globe Temperature):</h3><p>ONLY valid heat stress index. Combines: dry temp, humidity, wind, solar radiation. ISO 7243 / ACGIH TLV standard.</p><h3>Work/Rest Cycles (Heavy Work):</h3><ul><li>WBGT <28°C: Continuous (monitor)</li><li>WBGT 28-30°C: 50% work / 50% rest</li><li>WBGT 30-32°C: 25% work / 75% rest (15 min work / 45 min rest)</li><li>WBGT >32°C: Minimize work; reschedule to night</li></ul>', markdown: '## Gulf Heat Stress: The Silent Killer\n\nGulf summer: 45-50°C ambient, 80-90% humidity. WBGT often exceeds 32°C (extreme risk). Heat stroke fatal in 30 minutes without treatment.\n\n### WBGT (Wet Bulb Globe Temperature):\n\nONLY valid heat stress index. Combines: dry temp, humidity, wind, solar radiation. ISO 7243 / ACGIH TLV standard.\n\n### Work/Rest Cycles (Heavy Work):\n\n- WBGT <28°C: Continuous (monitor)\n- WBGT 28-30°C: 50% work / 50% rest\n- WBGT 30-32°C: 25% work / 75% rest (15 min work / 45 min rest)\n- WBGT >32°C: Minimize work; reschedule to night', sections: [{ id: 's1', title: 'WBGT Monitoring Protocol', content: 'Calibrated meter. 3x daily (08:00, 11:00, 14:00). Posted at site entrance. Zone communicated to all. Backup meter required.', type: 'text' }, { id: 's2', title: 'Acclimatization Program (MANDATORY)', content: '7-14 days progressive. Days 1-3: 50% reduced work time. Days 4-7: 75% workload. Days 8-14: full workload with monitoring. Applies to ALL new arrivals - NO exceptions for "experienced" workers.', type: 'text' }, { id: 's3', title: 'Hydration & Monitoring', content: 'Minimum 1L/hour water + electrolytes for heavy work. Buddy system: 15-min check-ins. Supervisors trained in heat illness recognition. Ice bath/cooling for heat stroke.', type: 'text' }] },
    illustrations: [{ id: 'gulf-heat-stress', title: 'Gulf Heat Stress Management', description: 'WBGT zones, work/rest cycles, acclimatization', type: 'diagram', category: 'environmental' }],
    interactiveElements: [{ id: 'ie1', type: 'calculator', title: 'Gulf WBGT Work/Rest Calculator', description: 'Enter WBGT and work intensity to get required cycle', config: { wbgtInput: true, workIntensity: ['light', 'moderate', 'heavy', 'very-heavy'], acclimatized: true, output: { workMinutes: 0, restMinutes: 0, notes: '' } }, feedback: { correct: 'Cycle applied. Monitor workers continuously.', incorrect: 'Check WBGT zone and intensity. New workers need 50% reduction.', hints: ['New workers: 50% work time reduction days 1-3', 'Heavy work at WBGT 32°C = 15/45', 'Summer ban overrides all'] } }],
    keyPoints: ['WBGT ONLY valid heat stress index (ISO 7243)', '3x daily monitoring (08:00, 11:00, 14:00)', 'Work/rest cycles per WBGT zone', '7-14 day acclimatization MANDATORY for new workers', '1L/hour water + electrolytes for heavy work', 'Summer ban overrides work/rest cycles'],
    references: [{ id: 'ref1', title: 'ISO 7243 / ACGIH TLV', type: 'standard', source: 'ISO/ACGIH', relevance: 'Technical basis' }, { id: 'ref2', title: 'ADOSH CoP 16', type: 'regulation', source: 'ADOSH', relevance: 'Regulatory requirement' }],
    quizId: 'gulf-env-q1',
    prerequisites: [],
    learningObjectives: ['Calculate WBGT-based work/rest cycles', 'Design acclimatization program', 'Implement hydration and monitoring protocols'],
    tags: ['heat-stress', 'wbgt', 'work-rest-cycles', 'acclimatization', 'gulf-summer', 'adosh-cop16'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'gulf-env-l2',
    moduleId: 'gulf-environmental',
    title: 'GCC Summer Work Bans Comparison & Compliance',
    description: 'Country-by-country summer midday work ban requirements: UAE, Qatar, KSA, Kuwait, Oman, Bahrain',
    order: 2,
    difficulty: 'basic',
    estimatedMinutes: 35,
    contentType: 'interactive',
    content: {
      html: '<h2>GCC Summer Work Bans - Critical Differences</h2><p>Each GCC country has DIFFERENT ban hours. Non-compliance = heavy fines per worker.</p><table><thead><tr><th>Country</th><th>Ban Hours</th><th>Period</th><th>Enforcement</th><th>Penalty</th></tr></thead><tbody><tr><td><strong>UAE</strong></td><td>12:30-15:00</td><td>Jun 15 - Sep 15</td><td>MOHRE</td><td>AED 50,000-200,000/worker</td></tr><tr><td><strong>Qatar</strong></td><td>10:00-15:00</td><td>Jun 1 - Sep 15</td><td>MOL/QCD</td><td>QAR 10,000-100,000/worker</td></tr><tr><td><strong>Kuwait</strong></td><td>11:00-16:00</td><td>Jun 1 - Aug 31</td><td>KFSD/PAI</td><td>KWD 500-2,000/worker</td></tr><tr><td><strong>Oman</strong></td><td>12:00-15:00</td><td>Jun - Sep</td><td>MoM</td><td>OMR 500-2,000/worker</td></tr><tr><td><strong>Bahrain</strong></td><td>12:00-16:00</td><td>Jun - Sep</td><td>MoL/CDD</td><td>BHD 500-2,000/worker</td></tr><tr><td><strong>KSA</strong></td><td>Varies by region</td><td>Jun - Sep</td><td>MOH/MOMRA</td><td>SAR 5,000-20,000/worker</td></tr></tbody></table>', markdown: '## GCC Summer Work Bans - Critical Differences\n\nEach GCC country has DIFFERENT ban hours. Non-compliance = heavy fines per worker.\n\n| Country | Ban Hours | Period | Enforcement | Penalty |\n|---------|-----------|--------|-------------|---------|\n| **UAE** | 12:30-15:00 | Jun 15 - Sep 15 | MOHRE | AED 50,000-200,000/worker |\n| **Qatar** | 10:00-15:00 | Jun 1 - Sep 15 | MOL/QCD | QAR 10,000-100,000/worker |\n| **Kuwait** | 11:00-16:00 | Jun 1 - Aug 31 | KFSD/PAI | KWD 500-2,000/worker |\n| **Oman** | 12:00-15:00 | Jun - Sep | MoM | OMR 500-2,000/worker |\n| **Bahrain** | 12:00-16:00 | Jun - Sep | MoL/CDD | BHD 500-2,000/worker |\n| **KSA** | Varies by region | Jun - Sep | MOH/MOMRA | SAR 5,000-20,000/worker |', sections: [{ id: 's1', title: 'Qatar - Strictest Ban', content: '10:00-15:00 (5 hours). Jun 1 - Sep 15. Enforced by MOL and QCD. QAR 10,000-100,000 per worker. Applies to ALL outdoor workers.', type: 'text' }, { id: 's2', title: 'KSA - Regional Variation', content: 'MOH/MOMRA issue regional directives. Typically 12:00-15:00 but check local emirate. SAR 5,000-20,000 penalty.', type: 'text' }, { id: 's3', title: 'Compliance Strategy for Multi-Country Operations', content: 'Use MOST RESTRICTIVE ban (Qatar 10:00-15:00) as corporate standard. Automated scheduling blocks. GPS-verified location compliance.', type: 'text' }] },
    illustrations: [{ id: 'gulf-summer-ban', title: 'GCC Summer Work Bans', description: 'Country-specific summer work ban hours', type: 'infographic', category: 'environmental' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Multi-Country Ban Compliance', description: 'Company operates in UAE, Qatar, and KSA. Project spans all three.', config: { scenario: 'Project manager wants single schedule for all sites' }, feedback: { correct: 'Correct. Use Qatar 10:00-15:00 as corporate baseline - covers all.', incorrect: 'UAE 12:30 ban violates Qatar 10:00 ban. Use most restrictive.', hints: ['Qatar is most restrictive', 'Corporate standard = strictest', 'GPS verify location'] } }],
    keyPoints: ['Qatar: 10:00-15:00 (strictest)', 'UAE: 12:30-15:00 (Jun 15-Sep 15)', 'Kuwait: 11:00-16:00 (Jun 1-Aug 31)', 'Oman: 12:00-15:00 (Jun-Sep)', 'Bahrain: 12:00-16:00 (Jun-Sep)', 'KSA: Check regional directives', 'Corporate standard = most restrictive (Qatar)'],
    references: [{ id: 'ref1', title: 'UAE Ministerial Decree', type: 'regulation', source: 'MOHRE', relevance: 'UAE legal requirement' }, { id: 'ref2', title: 'Qatar Labour Law 14/2004', type: 'regulation', source: 'MOL/QCD', relevance: 'Qatar legal requirement' }],
    quizId: 'gulf-env-q2',
    prerequisites: ['gulf-env-l1'],
    learningObjectives: ['Identify country-specific summer ban hours', 'Calculate penalties for non-compliance', 'Develop multi-country compliance strategy'],
    tags: ['gcc', 'summer-ban', 'uae', 'qatar', 'kuwait', 'oman', 'bahrain', 'ksa', 'compliance'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - GULF CULTURAL/WELFARE
// ============================================

const GULF_CULTURAL_LESSONS: Lesson[] = [
  {
    id: 'gulf-cultural-l1',
    moduleId: 'gulf-cultural-welfare',
    title: 'Gulf Cultural Competency: Ramadan, Prayer, Arabic Requirements',
    description: 'Cultural and religious requirements for HSE management in GCC: Ramadan hours, prayer facilities, Arabic language, gender segregation',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 40,
    contentType: 'interactive',
    content: {
      html: '<h2>Cultural Competency: Not Optional - It\'s the Law</h2><p>GCC labour laws mandate cultural/religious accommodations. Non-compliance = fines, project delays, reputation damage.</p><h3>Ramadan Working Hours (LAW):</h3><ul><li><strong>Maximum 6 hours/day</strong> for ALL workers (Muslim & non-Muslim)</li><li>Same pay for reduced hours</li><li>Enforced by MOHRE/MOL across GCC</li><li>Violation = labour law penalty</li></ul><h3>Prayer Facilities (Mandatory >50 workers):</h3><ul><li>Clean, oriented to Mecca (Qibla)</li><li>Capacity for congregation</li><li>Separate male/female if mixed workforce</li><li>Accessible during all 5 prayer times</li></ul>', markdown: '## Cultural Competency: Not Optional - It\'s the Law\n\nGCC labour laws mandate cultural/religious accommodations. Non-compliance = fines, project delays, reputation damage.\n\n### Ramadan Working Hours (LAW):\n\n- **Maximum 6 hours/day** for ALL workers (Muslim & non-Muslim)\n- Same pay for reduced hours\n- Enforced by MOHRE/MOL across GCC\n- Violation = labour law penalty\n\n### Prayer Facilities (Mandatory >50 workers):\n\n- Clean, oriented to Mecca (Qibla)\n- Capacity for congregation\n- Separate male/female if mixed workforce\n- Accessible during all 5 prayer times', sections: [{ id: 's1', title: 'Arabic Language Requirements', content: 'HSE signage: Arabic/English minimum. SDS: Arabic/English. Procedures: Arabic summary. Training: Arabic or worker language. Emergency procedures: Arabic/English.', type: 'text' }, { id: 's2', title: 'Gender Segregation Requirements', content: 'Accommodation: Separate buildings/floors. Transport: Separate buses or partitions. Facilities: Separate toilets, prayer, recreation. Medical: Female practitioner for female workers.', type: 'text' }, { id: 's3', title: 'Friday Prayer Management', content: 'Extended break for Jummah (11:30-13:30 typical). Site management plan for reduced workforce. Critical operations coverage. Non-Muslim workers: same break entitlement.', type: 'text' }] },
    illustrations: [{ id: 'gulf-emergency-numbers', title: 'GCC Emergency Numbers', description: 'Emergency numbers for all 6 GCC countries', type: 'infographic', category: 'cultural' }],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Ramadan Compliance Scenario', description: 'Non-Muslim supervisor wants 8-hour shifts during Ramadan', config: { scenario: 'Supervisor: "My non-Muslim crew can work 8 hours, only Muslims get 6 hours"' }, feedback: { correct: 'Correct. LAW applies to ALL workers regardless of religion.', incorrect: 'UAE Labour Law Art 65 (and GCC equivalents): 6 hours MAX for ALL workers.', hints: ['Law applies to ALL', 'Same pay for 6 hours', 'Non-compliance = labour penalty'] } }],
    keyPoints: ['Ramadan: 6 hours MAX for ALL workers (law)', 'Prayer facility mandatory >50 workers', 'Arabic/English signage, SDS, procedures', 'Gender segregation: accommodation, transport, facilities', 'Friday Jummah break management'],
    references: [{ id: 'ref1', title: 'UAE Federal Law 33/2021 (Labour Law)', type: 'regulation', source: 'MOHRE', relevance: 'Ramadan hours legal basis' }, { id: 'ref2', title: 'GCC Labour Laws', type: 'regulation', source: 'GCC', relevance: 'Regional consistency' }],
    quizId: 'gulf-cultural-q1',
    prerequisites: [],
    learningObjectives: ['Apply Ramadan working hour requirements', 'Design compliant prayer facilities', 'Implement Arabic language requirements', 'Manage gender segregation'],
    tags: ['ramadan', 'prayer-facilities', 'arabic', 'gender-segregation', 'cultural-competency', 'gcc-labour-law'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'gulf-cultural-l2',
    moduleId: 'gulf-cultural-welfare',
    title: 'Worker Welfare Standards: Camps, Transport, Medical, Grievance',
    description: 'GCC mandatory worker welfare standards: accommodation, transport (IVMS), food (HACCP), medical, grievance mechanisms',
    order: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    contentType: 'interactive',
    content: {
      html: '<h2>GCC Worker Welfare Standards - Mandatory Minimums</h2><p>Non-negotiable standards enforced by MOHRE/MOL/Civil Defence across GCC.</p><h3>Accommodation:</h3><ul><li>4m² per person minimum</li><li>AC functional, <25°C sleeping areas</li><li>Fire safety: Civil Defence approved</li><li>Prayer facility on-site (>50 workers)</li></ul><h3>Transport (IVMS Mandatory):</h3><ul><li>IVMS (In-Vehicle Monitoring System) on ALL buses</li><li>Driver hours: max 10 hrs driving / 14 hrs duty</li><li>Seatbelts ALL seats</li><li>Speed governors</li></ul>', markdown: '## GCC Worker Welfare Standards - Mandatory Minimums\n\nNon-negotiable standards enforced by MOHRE/MOL/Civil Defence across GCC.\n\n### Accommodation:\n\n- 4m² per person minimum\n- AC functional, <25°C sleeping areas\n- Fire safety: Civil Defence approved\n- Prayer facility on-site (>50 workers)\n\n### Transport (IVMS Mandatory):\n\n- IVMS (In-Vehicle Monitoring System) on ALL buses\n- Driver hours: max 10 hrs driving / 14 hrs duty\n- Seatbelts ALL seats\n- Speed governors', sections: [{ id: 's1', title: 'Food Safety (HACCP)', content: 'Kitchen HACCP certified. Halal mandatory. Nutrition standards. Special diets accommodated. Regular inspections.', type: 'text' }, { id: 's2', title: 'Medical & Grievance', content: 'Clinic ratio 1:500 workers. Ambulance on-site. Occupational health physician. Grievance: anonymous, multilingual, 7-day resolution, no retaliation.', type: 'text' }, { id: 's3', title: 'Recreation & Communication', content: 'Gym/fitness area. Communication facilities (internet, phone). Welfare officer. Regular welfare inspections by authorities.', type: 'text' }] },
    illustrations: [],
    interactiveElements: [{ id: 'ie1', type: 'scenario', title: 'Camp Audit Scenario', description: 'Inspector finds: 3m²/person, no IVMS on 2 buses, no female doctor', config: { findings: ['3m²/person (violation)', '2 buses without IVMS (violation)', 'No female doctor for 200 female workers (violation)'] }, feedback: { correct: 'Correct. All three are violations requiring immediate corrective action.', incorrect: 'All are mandatory standards. Immediate corrective action required.', hints: ['4m² minimum', 'IVMS on ALL buses', 'Female doctor required'] } }],
    keyPoints: ['4m²/person accommodation minimum', 'AC <25°C sleeping areas', 'IVMS on ALL worker transport', 'Driver hours: 10 driving / 14 duty max', 'HACCP kitchen, halal food', 'Clinic 1:500, ambulance on-site', 'Anonymous multilingual grievance', 'Female medical practitioner for female workers'],
    references: [{ id: 'ref1', title: 'GCC Worker Welfare Standards', type: 'regulation', source: 'GCC', relevance: 'Regional standards' }, { id: 'ref2', title: 'UAE Ministerial Decree - Worker Housing', type: 'regulation', source: 'MOHRE', relevance: 'UAE specific requirements' }],
    quizId: 'gulf-cultural-q2',
    prerequisites: ['gulf-cultural-l1'],
    learningObjectives: ['Audit worker accommodation per GCC standards', 'Verify IVMS compliance on transport', 'Design HACCP-compliant catering', 'Implement grievance mechanisms'],
    tags: ['worker-welfare', 'accommodation', 'transport', 'ivms', 'food-safety', 'medical', 'grievance', 'gcc-standards'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// GULF LESSONS - GULF CERTIFICATIONS
// ============================================

const GULF_CERT_LESSONS: Lesson[] = [
  {
    id: 'gulf-cert-l1',
    moduleId: 'gulf-certifications',
    title: 'Gulf HSE Certifications Roadmap: ADNOC Passport, ADOSH, Aramco, NEBOSH Gulf',
    description: 'Complete guide to mandatory and preferred HSE certifications for Gulf deployment',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 40,
    contentType: 'interactive',
    content: {
      html: '<h2>Gulf HSE Certifications - Your Career Roadmap</h2><p>Different certifications for different roles and sites. MANDATORY vs PREFERRED.</p><h3>MANDATORY for Site Access:</h3><ul><li><strong>ADNOC HSE Passport</strong>: 3-year validity, ALL ADNOC sites, online verification</li><li><strong>ADOSH Competent Person</strong>: 3-year, HSE Officers/Supervisors in Abu Dhabi</li><li><strong>Aramco HSE Induction</strong>: Site-specific, ALL Aramco sites</li><li><strong>PDO HSE Passport</strong>: 2-year, ALL PDO sites</li><li><strong>Qatar Civil Defence Fire Safety</strong>: Annual, fire wardens</li></ul><h3>PREFERRED for Career Advancement:</h3><ul><li><strong>NEBOSH IGC + Gulf Supplement</strong>: Gold standard for HSE Officers</li><li><strong>IOSH Managing Safely</strong>: Supervisors, managers</li><li><strong>ISO 45001 Lead Auditor</strong>: Auditors</li></ul>', markdown: '## Gulf HSE Certifications - Your Career Roadmap\n\nDifferent certifications for different roles and sites. MANDATORY vs PREFERRED.\n\n### MANDATORY for Site Access:\n\n- **ADNOC HSE Passport**: 3-year validity, ALL ADNOC sites, online verification\n- **ADOSH Competent Person**: 3-year, HSE Officers/Supervisors in Abu Dhabi\n- **Aramco HSE Induction**: Site-specific, ALL Aramco sites\n- **PDO HSE Passport**: 2-year, ALL PDO sites\n- **Qatar Civil Defence Fire Safety**: Annual, fire wardens\n\n### PREFERRED for Career Advancement:\n\n- **NEBOSH IGC + Gulf Supplement**: Gold standard for HSE Officers\n- **IOSH Managing Safely**: Supervisors, managers\n- **ISO 45001 Lead Auditor**: Auditors', sections: [{ id: 's1', title: 'ADNOC HSE Passport Details', content: '3 categories: Basic (all workers), Supervisor (foremen/supervisors), Specialist (HSE professionals). Online verification via ADNOC portal. Renewal 60 days before expiry. 3-year validity.', type: 'text' }, { id: 's2', title: 'ADOSH Competent Person', content: 'Required for HSE Officers and Supervisors in Abu Dhabi. ADOSH-approved training. 3-year validity. Covers ADOSH SF, CoPs, UAE laws. Examination required.', type: 'text' }, { id: 's3', title: 'Site-Specific Inductions', content: 'Aramco: Site-specific induction (1-3 days). PDO: 2-year passport. KOC: Site induction. BAPCO: Site induction. Qatar: QCD Fire Safety (annual). KSA: Aramco/SABIC inductions.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-passport', title: 'ADNOC HSE Passport', description: 'Passport categories, validity, verification', type: 'diagram', category: 'certification' }],
    interactiveElements: [{ id: 'ie1', type: 'decision-tree', title: 'Certification Path Selector', description: 'Find the certifications you need for your target role/sites', config: { questions: ['Target country?', 'Target company?', 'Role?', 'Current certifications?'] }, feedback: { correct: 'Personalized certification roadmap generated.', incorrect: 'Review mandatory requirements for target site.', hints: ['ADNOC sites = ADNOC Passport', 'Abu Dhabi = ADOSH Competent Person', 'Aramco = Site Induction'] } }],
    keyPoints: ['ADNOC Passport: 3-year, mandatory all ADNOC sites', 'ADOSH Competent Person: Required for Abu Dhabi HSE Officers', 'Aramco/PDO/KOC: Site-specific inductions mandatory', 'NEBOSH IGC + Gulf Supplement: Gold standard', 'Track expiry dates - renew 60 days before'],
    references: [{ id: 'ref1', title: 'ADNOC HSE Passport Guidelines', type: 'guide', source: 'ADNOC', relevance: 'Official passport requirements' }, { id: 'ref2', title: 'ADOSH Competent Person Criteria', type: 'regulation', source: 'ADOSH', relevance: 'Official competency requirements' }],
    quizId: 'gulf-cert-q1',
    prerequisites: [],
    learningObjectives: ['Identify mandatory certifications for target sites', 'Create personal certification roadmap', 'Track renewal deadlines'],
    tags: ['certifications', 'adnoc-passport', 'adosh-competent-person', 'aramco-induction', 'nebosh-gulf', 'career-roadmap'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// EXISTING GENERIC MODULES (ENHANCED WITH GULF CONTENT)
// ============================================

// Enhanced HSE Fundamentals with Gulf content
const HSE_FUNDAMENTALS_LESSONS: Lesson[] = [
  {
    id: 'hse-fund-l1',
    moduleId: 'hse-fundamentals',
    title: 'Introduction to HSE: Global & Gulf Context',
    description: 'Foundational HSE concepts with Gulf regulatory context (ADNOC, ADOSH, ARAMCO, UAE Laws)',
    order: 1,
    difficulty: 'basic',
    estimatedMinutes: 50,
    contentType: 'interactive',
    content: {
      html: '<h2>HSE Fundamentals: Global Standards Meet Gulf Reality</h2><p>HSE = Health, Safety, Environment. But in the Gulf, you MUST know the LOCAL regulations that govern daily work.</p><h3>Global Frameworks:</h3><ul><li>ISO 45001: OH&S Management System</li><li>ISO 14001: Environmental Management</li><li>ISO 31000: Risk Management</li><li>OSHA 1910/1926: US Standards (reference)</li><li>NEBOSH/IOSH: Competency frameworks</li></ul><h3>Gulf Mandatory Frameworks (THE ONES THAT COUNT):</h3><ul><li><strong>ADNOC 100/200/300 Series + Golden Rules</strong>: Abu Dhabi oil & gas</li><li><strong>ADOSH SF + 20 CoPs</strong>: ALL entities in Abu Dhabi</li><li><strong>UAE Federal Laws 8/1980, 24/1999, 33/2021</strong>: Labour, Environment, New Labour Law</li><li><strong>Aramco GI 2.100 + SAS</strong>: Saudi Aramco sites</li><li><strong>Qatar Labour Law 14/2004 + QCS</strong>: Qatar construction/oil&gas</li></ul>', markdown: '## HSE Fundamentals: Global Standards Meet Gulf Reality\n\nHSE = Health, Safety, Environment. But in the Gulf, you MUST know the LOCAL regulations that govern daily work.\n\n### Global Frameworks:\n\n- ISO 45001: OH&S Management System\n- ISO 14001: Environmental Management\n- ISO 31000: Risk Management\n- OSHA 1910/1926: US Standards (reference)\n- NEBOSH/IOSH: Competency frameworks\n\n### Gulf Mandatory Frameworks (THE ONES THAT COUNT):\n\n- **ADNOC 100/200/300 Series + Golden Rules**: Abu Dhabi oil & gas\n- **ADOSH SF + 20 CoPs**: ALL entities in Abu Dhabi\n- **UAE Federal Laws 8/1980, 24/1999, 33/2021**: Labour, Environment, New Labour Law\n- **Aramco GI 2.100 + SAS**: Saudi Aramco sites\n- **Qatar Labour Law 14/2004 + QCS**: Qatar construction/oil&gas', sections: [{ id: 's1', title: 'Why Gulf Regulations Matter', content: 'International standards (ISO, OSHA, NEBOSH) provide BEST PRACTICE. Gulf regulations (ADNOC, ADOSH, Aramco, UAE Laws) provide LEGAL REQUIREMENTS. You comply with BOTH, but Gulf regulations are ENFORCEABLE with penalties, site bans, and criminal liability.', type: 'text' }, { id: 's2', title: 'The HSE Officer\'s Gulf Mandate', content: 'As an HSE Officer in the Gulf, your PRIMARY accountability is to the LOCAL regulatory framework. You must: 1) Know the specific standards for your site/client, 2) Implement them operationally, 3) Ensure compliance is auditable, 4) Report per local requirements (24hr Aramco, 48hr ADOSH, 72hr ADNOC).', type: 'text' }] },
    illustrations: [{ id: 'adnoc-hse-ms', title: 'ADNOC HSE Management System', description: '10 standards of ADNOC 100 Series', type: 'diagram', category: 'adnoc' }, { id: 'adosh-framework', title: 'ADOSH System Framework', description: '10 Elements of ADOSH OSH Management System', type: 'diagram', category: 'adosh' }, { id: 'aramco-risk-matrix', title: 'Aramco Risk Matrix', description: '5x5 risk matrix with ALARP zones', type: 'matrix', category: 'aramco' }],
    interactiveElements: [{ id: 'ie1', type: 'decision-tree', title: 'Which Gulf Standards Apply to Your Site?', description: 'Decision tree to identify applicable Gulf regulations', config: { questions: ['Country?', 'Client/Operator?', 'Sector?', 'Site type?'] }, feedback: { correct: 'Correct standards identified.', incorrect: 'Review client requirements and local laws.', hints: ['ADNOC sites = ADNOC standards', 'Abu Dhabi = ADOSH mandatory', 'Aramco = GI/SAS', 'Qatar = QCS + QP'] } }],
    keyPoints: ['Global standards = best practice; Gulf regulations = legal requirement', 'ADNOC, ADOSH, Aramco, UAE Laws are ENFORCEABLE', 'Know YOUR site\'s specific standards', 'Reporting timelines differ: Aramco 24hr, ADOSH 48hr, ADNOC 72hr'],
    references: [{ id: 'ref1', title: 'ADNOC HSE Standards', type: 'regulation', source: 'ADNOC', relevance: 'Primary for ADNOC sites' }, { id: 'ref2', title: 'ADOSH Decree 42/2009', type: 'regulation', source: 'ADOSH', relevance: 'Mandatory for Abu Dhabi' }, { id: 'ref3', title: 'Aramco GI 2.101', type: 'regulation', source: 'Aramco', relevance: 'Aramco HSE MS foundation' }],
    quizId: 'adnoc100-q1',
    prerequisites: [],
    learningObjectives: ['Distinguish global best practice from Gulf legal requirements', 'Identify applicable Gulf frameworks for a given site', 'Explain HSE Officer accountability in Gulf context'],
    tags: ['foundation', 'gulf-regulations', 'adnoc', 'adosh', 'aramco', 'uae-laws', 'compliance'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
  {
    id: 'hse-fund-l2',
    moduleId: 'hse-fundamentals',
    title: 'Hierarchy of Controls: Gulf Application (ADNOC, ADOSH, Aramco)',
    description: 'Applying hierarchy of controls with Gulf-specific requirements and examples',
    order: 2,
    difficulty: 'basic',
    estimatedMinutes: 40,
    contentType: 'interactive',
    content: {
      html: '<h2>Hierarchy of Controls: Gulf Context</h2><p>The hierarchy is universal, but Gulf standards have SPECIFIC requirements at each level.</p><h3>1. ELIMINATION</h3><p>ADNOC: Design out hazards in new projects (Standard 103). Aramco: Inherent safety in design (GI 2.111).</p><h3>2. SUBSTITUTION</h3><p>ADNOC: Substitute hazardous chemicals (Standard 209). ADOSH CoP 6: Chemical substitution.</p><h3>3. ENGINEERING CONTROLS</h3><p>ADNOC Standard 206: Fire protection systems. Aramco SAES-E: Fire & gas detection. ADOSH CoP 7: Fire safety engineering.</p><h3>4. ADMINISTRATIVE CONTROLS</h3><p><strong>GULF CRITICAL</strong>: PTW (ADNOC 201, ADOSH CoP 3/4/8/9, Aramco SAS-003/008/009), Work/rest cycles (ADOSH CoP 16), Summer ban compliance, Acclimatization programs.</p><h3>5. PPE</h3><p>GSO 1722-1732 standards. ADNOC GR-7. Aramco SAS-010. FR clothing mandatory in oil & gas. GSO standards for helmets (1723), footwear (1724), eye (1725), hearing (1726), respiratory (1727), fall (1728).', markdown: '## Hierarchy of Controls: Gulf Context\n\nThe hierarchy is universal, but Gulf standards have SPECIFIC requirements at each level.\n\n### 1. ELIMINATION\nADNOC: Design out hazards in new projects (Standard 103). Aramco: Inherent safety in design (GI 2.111).\n\n### 2. SUBSTITUTION\nADNOC: Substitute hazardous chemicals (Standard 209). ADOSH CoP 6: Chemical substitution.\n\n### 3. ENGINEERING CONTROLS\nADNOC Standard 206: Fire protection systems. Aramco SAES-E: Fire & gas detection. ADOSH CoP 7: Fire safety engineering.\n\n### 4. ADMINISTRATIVE CONTROLS\n**GULF CRITICAL**: PTW (ADNOC 201, ADOSH CoP 3/4/8/9, Aramco SAS-003/008/009), Work/rest cycles (ADOSH CoP 16), Summer ban compliance, Acclimatization programs.\n\n### 5. PPE\nGSO 1722-1732 standards. ADNOC GR-7. Aramco SAS-010. FR clothing mandatory in oil & gas. GSO standards for helmets (1723), footwear (1724), eye (1725), hearing (1726), respiratory (1727), fall (1728).', sections: [{ id: 's1', title: 'Gulf Administrative Controls Deep Dive', content: 'PTW systems differ: ADNOC 201 (isolation certs), ADOSH CoP 3/4/8/9 (height/confined/excavation/scaffold), Aramco SAS-003/008/009. Work/rest cycles per ADOSH CoP 16. Summer ban enforcement.', type: 'text' }, { id: 's2', title: 'Gulf PPE Standards (GSO)', content: 'GSO 1722-1732 adopted across GCC. Helmets (1723), Footwear (1724), Eye (1725), Hearing (1726), Respiratory (1727), Fall (1728), Fire (1729), Signs bilingual (1730). ADNOC GR-7: Mandatory PPE per task. Aramco SAS-010: FR clothing, minimum standards.', type: 'text' }] },
    illustrations: [{ id: 'adnoc-golden-rules', title: 'ADNOC 10 Golden Rules', description: 'Visual representation of 10 life-saving rules', type: 'infographic', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'drag-drop', title: 'Match Gulf Standard to Control Level', description: 'Drag each Gulf standard to its hierarchy of controls level', config: { items: ['ADNOC Standard 206 Fire Protection', 'ADOSH CoP 16 Work/Rest Cycles', 'GSO 1728 Fall Protection Equipment', 'ADNOC Standard 103 Design Out Hazards', 'ADNOC Standard 209 Chemical Substitution'], zones: ['Elimination', 'Substitution', 'Engineering Controls', 'Administrative Controls', 'PPE'] }, feedback: { correct: 'Correct mapping.', incorrect: 'Review each standard\'s primary control method.', hints: ['Design = Elimination', 'Chemical change = Substitution', 'Fire systems = Engineering', 'Work/rest cycles = Administrative', 'Equipment = PPE'] } }],
    keyPoints: ['Hierarchy universal but Gulf has specific standards per level', 'Administrative controls CRITICAL in Gulf: PTW, heat stress, summer ban', 'GSO 1722-1732 PPE standards adopted across GCC', 'ADNOC GR-7 and Aramco SAS-010 mandate task-specific PPE'],
    references: [{ id: 'ref1', title: 'GSO 1722-1732 PPE Standards', type: 'standard', source: 'GCC', relevance: 'GCC PPE standards' }],
    quizId: 'adnoc-gr-q1',
    prerequisites: ['hse-fund-l1'],
    learningObjectives: ['Map Gulf standards to hierarchy of controls levels', 'Identify Gulf-specific administrative control requirements', 'Apply GSO PPE standards'],
    tags: ['hierarchy-of-controls', 'gulf-standards', 'administrative-controls', 'ppe', 'gso-standards', 'adnoc', 'adosh', 'aramco'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// EXISTING RISK ASSESSMENT MODULE - ENHANCED
// ============================================

const RISK_ASSESSMENT_LESSONS: Lesson[] = [
  {
    id: 'ra-l1',
    moduleId: 'risk-assessment',
    title: 'Risk Assessment Methodologies: Gulf Standards (ADNOC 103, ADOSH CoP 1, Aramco SAS-001, SAS-002)',
    description: 'Qualitative and quantitative risk assessment per Gulf regulatory requirements',
    order: 1,
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    contentType: 'interactive',
    content: {
      html: '<h2>Risk Assessment: Gulf Regulatory Requirements</h2><p>Each Gulf authority has SPECIFIC risk assessment methodology. You MUST use the one applicable to your site.</p><h3>ADNOC Standard 103:</h3><ul><li>5x5 Matrix (Consequence 1-5, Likelihood A-E)</li><li>ALARP mandatory for Medium, High, Critical</li><li>Bowtie for Major Hazards</li><li>Centralized risk register, quarterly review</li></ul><h3>ADOSH CoP 1:</h3><ul><li>Mandatory methodology for Abu Dhabi entities</li><li>Risk matrix aligned with ISO 31000</li><li>Hierarchy of controls documentation</li><li>Legal register integration</li></ul><h3>Aramco SAS-001/SAS-002:</h3><ul><li>Aramco 5x5 Matrix (Consequence 1-5, Likelihood A-E)</li><li>ALARP for Medium+</li><li>Bowtie for Major Hazards</li><li>Centralized risk register with quarterly review</li><li>TapRooT® for incident-based risk updates</li></ul>', markdown: '## Risk Assessment: Gulf Regulatory Requirements\n\nEach Gulf authority has SPECIFIC risk assessment methodology. You MUST use the one applicable to your site.\n\n### ADNOC Standard 103:\n\n- 5x5 Matrix (Consequence 1-5, Likelihood A-E)\n- ALARP mandatory for Medium, High, Critical\n- Bowtie for Major Hazards\n- Centralized risk register, quarterly review\n\n### ADOSH CoP 1:\n\n- Mandatory methodology for Abu Dhabi entities\n- Risk matrix aligned with ISO 31000\n- Hierarchy of controls documentation\n- Legal register integration\n\n### Aramco SAS-001/SAS-002:\n\n- Aramco 5x5 Matrix (Consequence 1-5, Likelihood A-E)\n- ALARP for Medium+\n- Bowtie for Major Hazards\n- Centralized risk register with quarterly review\n- TapRooT® for incident-based risk updates', sections: [{ id: 's1', title: 'Comparing Gulf Risk Matrices', content: 'ADNOC: Consequence 1-5, Likelihood A-E. Aramco: Consequence 1-5 (Slight-Catastrophic), Likelihood A-E (Rare-Almost Certain). ADOSH: Aligned with ISO 31000. Similar structure, different terminology.', type: 'text' }, { id: 's2', title: 'Bowtie Analysis for Major Hazards', content: 'Required by ADNOC (Major Hazards), Aramco (Major Hazards). Visual: Hazard -> Top Event -> Prevention Barriers (left) / Mitigation Barriers (right). Barrier effectiveness assessment critical.', type: 'text' }, { id: 's3', title: 'ALARP Demonstration Gulf Style', content: 'ALARP = As Low As Reasonably Practicable. Gulf requirement: Document risk reduction options, cost-benefit, justification for residual risk. ADNOC: Required for Medium+. Aramco: Required for Medium+. Not optional - regulatory.', type: 'text' }] },
    illustrations: [{ id: 'aramco-risk-matrix', title: 'Aramco Risk Matrix', description: '5x5 risk matrix with ALARP zones', type: 'matrix', category: 'aramco' }, { id: 'adnoc-hse-ms', title: 'ADNOC HSE Management System', description: '10 standards of ADNOC 100 Series', type: 'diagram', category: 'adnoc' }],
    interactiveElements: [{ id: 'ie1', type: 'calculator', title: 'Multi-Framework Risk Calculator', description: 'Calculate risk rating under ADNOC, ADOSH, and Aramco matrices simultaneously', config: { frameworks: ['ADNOC', 'ADOSH', 'ARAMCO'], consequenceInput: true, likelihoodInput: true }, feedback: { correct: 'Risk rated under all three frameworks.', incorrect: 'Check each framework\'s consequence/likelihood definitions.', hints: ['Similar but terminology differs', 'ALARP thresholds similar', 'Document for each framework'] } }],
    keyPoints: ['Use site-specific risk methodology (ADNOC/ADOSH/Aramco)', 'All require ALARP for Medium+ risks', 'Bowtie mandatory for Major Hazards', 'Centralized risk register with quarterly review'],
    references: [{ id: 'ref1', title: 'ADNOC Standard 103', type: 'regulation', source: 'ADNOC', relevance: 'ADNOC risk methodology' }, { id: 'ref2', title: 'ADOSH CoP 1', type: 'regulation', source: 'ADOSH', relevance: 'ADOSH risk methodology' }, { id: 'ref3', title: 'Aramco SAS-001', type: 'regulation', source: 'Aramco', relevance: 'Aramco risk methodology' }],
    quizId: 'adnoc100-q3',
    prerequisites: ['hse-fundamentals'],
    learningObjectives: ['Apply ADNOC, ADOSH, and Aramco risk matrices', 'Demonstrate ALARP per Gulf requirements', 'Develop bowtie for major hazards'],
    tags: ['risk-assessment', 'adnoc-103', 'adosh-cop1', 'aramco-sas001', 'alarp', 'bowtie', 'gulf-standards'],
    accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true },
  },
];

// ============================================
// COMPLETE HSE_MODULES ARRAY WITH ALL GULF MODULES
// ============================================

export const HSE_MODULES: HSEModule[] = [
  // ========================================
  // PHASE 1: CORE GULF MODULES (15 modules)
  // ========================================
  
  // ADNOC 100 SERIES
  {
    id: 'adnoc-100-series',
    title: 'ADNOC 100 Series: HSE Management System',
    shortTitle: 'ADNOC 100 Series',
    description: 'Complete implementation of ADNOC HSE Standards 101-110: Policy, Organization, Planning, Contractor Management, Competence, Communication, Documentation, Operational Control, Incident Investigation, Audit & Assurance. Mandatory for all ADNOC Group companies and contractors.',
    category: 'safety-management-systems',
    difficulty: 'basic',
    estimatedHours: 20,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Implement ADNOC HSE Standards 101-110 in operational context',
      'Develop HSE plans aligned with ADNOC 103 planning requirements',
      'Manage contractor HSE per ADNOC 104 and CMS requirements',
      'Ensure competence assurance per ADNOC 105 and HSE Passport',
      'Conduct audits per ADNOC 110 protocol with 5-element scoring',
    ],
    standards: [...ADNOC_100_STANDARDS, ...ADNOC_GOLDEN_RULES],
    tags: ['adnoc', '100-series', 'hse-ms', 'mandatory', 'adnoc-sites', 'gulf-core'],
    color: '#1e3a5f',
    icon: 'shield-check',
    lessons: ADNOC_100_LESSONS,
    assessments: [
      {
        id: 'adnoc100-assessment',
        moduleId: 'adnoc-100-series',
        title: 'ADNOC 100 Series Certification Assessment',
        description: 'Comprehensive assessment covering all 10 ADNOC 100 Series standards',
        type: 'summative',
        passingScore: 85,
        timeLimitMinutes: 90,
        questions: ADNOC_100_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [
      { id: 'r1', moduleId: 'adnoc-100-series', title: 'ADNOC HSE Standards 100 Series Document', description: 'Official ADNOC 100 Series standards', type: 'pdf', url: 'https://www.adnoc.ae/hse-standards', downloadable: true, language: 'en', tags: ['adnoc', 'standards', 'official'] },
      { id: 'r2', moduleId: 'adnoc-100-series', title: 'ADNOC HSE Passport Guidelines', description: 'Passport categories, application, renewal', type: 'pdf', url: 'https://www.adnoc.ae/hse-passport', downloadable: true, language: 'en', tags: ['passport', 'competence'] },
    ],
    caseStudies: GULF_CASE_STUDIES.filter(cs => cs.moduleId === 'adnoc-golden-rules').slice(0, 1),
    checklists: [GULF_CHECKLISTS.find(c => c.id === 'gulf-cl-001')!],
    procedures: [GULF_PROCEDURES.find(p => p.id === 'gulf-proc-001')!],
    glossary: GULF_GLOSSARY.filter(g => ['adnoc', 'adnoc-100', 'adnoc-cms', 'adnoc-passport'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'adnoc-100-series'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [{ id: 'c1', name: 'ADNOC HSE SME', role: 'Subject Matter Expert', organization: 'ADNOC', credentials: ['ADNOC HSE Lead Auditor'], contributions: ['Standards interpretation', 'Case studies', 'Assessments'] }],
    reviewStatus: 'approved',
  },

  // ADNOC 200 SERIES
  {
    id: 'adnoc-200-series',
    title: 'ADNOC 200 Series: Operational HSE Standards',
    shortTitle: 'ADNOC 200 Series',
    description: 'Operational standards: PTW & Isolation (201), H2S Management (202), Process Safety (203), Mechanical Integrity (204), MOC (205), Fire Protection (206), Air Emissions (207), Water/Wastewater (208), Waste Management (209), Emergency Response (210). Mandatory for ADNOC operations.',
    category: 'process-safety',
    difficulty: 'advanced',
    estimatedHours: 25,
    prerequisites: ['adnoc-100-series', 'risk-assessment'],
    learningObjectives: [
      'Implement ADNOC PTW system with isolation certificates (Std 201)',
      'Manage H2S per ADNOC 202: contingency plans, detection, rescue',
      'Apply ADNOC PSM 14 elements per Standard 203',
      'Execute MOC per ADNOC 205 with risk assessment and approval matrix',
      'Develop ERP per ADNOC 210 with tiered response and mutual aid',
    ],
    standards: ADNOC_200_STANDARDS,
    tags: ['adnoc', '200-series', 'operational', 'ptw', 'h2s', 'psm', 'moc', 'emergency-response', 'gulf-core'],
    color: '#2c3e50',
    icon: 'tools',
    lessons: [
      {
        id: 'adnoc200-l1',
        moduleId: 'adnoc-200-series',
        title: 'ADNOC 201: PTW & Isolation System',
        description: 'Complete PTW system with isolation certificates, LOTO, permit types, validity, handback',
        order: 1,
        difficulty: 'advanced',
        estimatedMinutes: 90,
        contentType: 'interactive',
        content: { html: '<h2>ADNOC 201: PTW & Isolation</h2><p>Comprehensive PTW system with mandatory isolation verification.</p>', markdown: '## ADNOC 201: PTW & Isolation', sections: [{ id: 's1', title: 'PTW Types', content: 'General, Confined Space, Hot Work, Height, Excavation, Electrical, Radiography, Diving.', type: 'text' }, { id: 's2', title: 'Isolation Certificates', content: 'Mandatory for all PTW. Mechanical, Electrical, Process isolation. Double block and bleed. Verification before permit issuance.', type: 'text' }] }, contentType: 'interactive', illustrations: [], interactiveElements: [], keyPoints: ['Isolation cert mandatory for ALL PTW', 'Double block and bleed standard', 'Handback procedure strict'], references: [{ id: 'ref1', title: 'ADNOC Standard 201', type: 'regulation', source: 'ADNOC', relevance: 'Primary standard' }], quizId: 'adnoc-gr-q1', prerequisites: ['adnoc-100-series'], learningObjectives: ['Issue PTW per ADNOC 201', 'Verify isolation certificates', 'Execute handback procedure'], tags: ['adnoc', '201', 'ptw', 'isolation', 'loto'], accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true } },
      {
        id: 'adnoc200-l2',
        moduleId: 'adnoc-200-series',
        title: 'ADNOC 202: H2S Management',
        description: 'H2S contingency plans, detection/monitoring, rescue requirements, PPE, community alerting',
        order: 2,
        difficulty: 'advanced',
        estimatedMinutes: 60,
        contentType: 'interactive',
        content: { html: '<h2>ADNOC 202: H2S Management</h2><p>Comprehensive H2S management for sour operations.</p>', markdown: '## ADNOC 202: H2S Management', sections: [{ id: 's1', title: 'Contingency Plans', content: 'Site-specific H2S contingency plans. Emergency planning zones. Community alerting systems.', type: 'text' }, { id: 's2', title: 'Detection & Rescue', content: 'Personal and fixed monitors. Alarm setpoints. Rescue equipment and trained responders. 30-minute response.', type: 'text' }] }, contentType: 'interactive', illustrations: [], interactiveElements: [], keyPoints: ['Site-specific contingency plans', 'Personal + fixed detection', 'Trained rescue teams', 'Community alerting'], references: [{ id: 'ref1', title: 'ADNOC Standard 202', type: 'regulation', source: 'ADNOC', relevance: 'Primary standard' }], quizId: 'adnoc-gr-q3', prerequisites: ['adnoc200-l1'], learningObjectives: ['Develop H2S contingency plan', 'Implement detection/monitoring', 'Execute rescue procedures'], tags: ['adnoc', '202', 'h2s', 'rescue', 'community-alerting'], accessibility: { hasTranscript: true, hasAudioDescription: false, hasClosedCaptions: false, screenReaderOptimized: true, keyboardNavigable: true, colorBlindSafe: true } },
    ],
    assessments: [
      {
        id: 'adnoc200-assessment',
        moduleId: 'adnoc-200-series',
        title: 'ADNOC 200 Series Practical Assessment',
        description: 'Scenario-based assessment of operational standards implementation',
        type: 'practical',
        passingScore: 90,
        timeLimitMinutes: 120,
        questions: ADNOC_100_QUIZ, // Reuse for now
        retakePolicy: { maxAttempts: 2, cooldownHours: 48, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: [],
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // ADNOC 300 SERIES
  {
    id: 'adnoc-300-series',
    title: 'ADNOC 300 Series: HSE Performance & Culture',
    shortTitle: 'ADNOC 300 Series',
    description: 'Performance standards: KPIs (301), Reporting (302), Assurance (303), Improvement (304), Culture (305). Includes Hearts & Minds culture program.',
    category: 'safety-management-systems',
    difficulty: 'advanced',
    estimatedHours: 10,
    prerequisites: ['adnoc-200-series'],
    learningObjectives: [
      'Develop HSE KPI dashboards per ADNOC 301 with leading/lagging indicators',
      'Prepare monthly/quarterly/annual reports per ADNOC 302 format',
      'Execute self-verification and independent audits per ADNOC 303',
      'Drive improvement through corrective action tracking per ADNOC 304',
      'Implement Hearts & Minds culture program per ADNOC 305',
    ],
    standards: ADNOC_300_STANDARDS,
    tags: ['adnoc', '300-series', 'performance', 'culture', 'hearts-minds', 'kpi', 'reporting', 'gulf-core'],
    color: '#2c3e50',
    icon: 'bar-chart',
    lessons: [],
    assessments: [],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: [],
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // ADNOC GOLDEN RULES
  {
    id: 'adnoc-golden-rules',
    title: 'ADNOC 10 Golden Rules: Implementation & Enforcement',
    shortTitle: 'ADNOC Golden Rules',
    description: 'Complete implementation of 10 Life-Saving Rules: Work Permits, Isolation/LOTO, Confined Space, Fall Protection, Safe Driving, Alcohol/Drugs, PPE, Smoking, Reporting, Stop Work Authority. Non-negotiable, applies to ALL personnel.',
    category: 'behavioral-safety',
    difficulty: 'basic',
    estimatedHours: 8,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Enforce all 10 Golden Rules with zero tolerance',
      'Implement Stop Work Authority (GR-10) without retaliation',
      'Verify GR-1 PTW compliance at every worksite',
      'Apply GR-3 Confined Space: Permit AND Gas Test mandatory',
      'Apply GR-4 Fall Protection: 100% tie-off above 1.8m',
    ],
    standards: [...ADNOC_GOLDEN_RULES, ...ADNOC_100_STANDARDS.filter(s => s.standardCode.includes('108') || s.standardCode.includes('109'))],
    tags: ['adnoc', 'golden-rules', 'life-saving-rules', 'stop-work-authority', 'mandatory', 'behavioral', 'gulf-core'],
    color: '#e74c3c',
    icon: 'alert-triangle',
    lessons: ADNOC_GR_LESSONS,
    assessments: [
      {
        id: 'adnoc-gr-assessment',
        moduleId: 'adnoc-golden-rules',
        title: 'ADNOC Golden Rules Mastery Assessment',
        description: 'Scenario-based assessment of Golden Rules application and enforcement',
        type: 'summative',
        passingScore: 100,
        timeLimitMinutes: 60,
        questions: ADNOC_GR_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 4, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: GULF_CASE_STUDIES.filter(cs => cs.moduleId === 'adnoc-golden-rules'),
    checklists: [GULF_CHECKLISTS.find(c => c.id === 'gulf-cl-002')!],
    procedures: [],
    glossary: GULF_GLOSSARY.filter(g => g.id === 'gt-002'),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'adnoc-golden-rules'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // ADOSH FRAMEWORK
  {
    id: 'adosh-framework',
    title: 'ADOSH System Framework & 20 Codes of Practice',
    shortTitle: 'ADOSH Framework',
    description: 'Complete ADOSH OSH Management System (10 Elements per Decree 42/2009) + all 20 Codes of Practice. Mandatory for ALL entities in Abu Dhabi Emirate including free zones.',
    category: 'safety-management-systems',
    difficulty: 'intermediate',
    estimatedHours: 30,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    learningObjectives: [
      'Implement ADOSH 10-Element OSH Management System per Decree 42/2009',
      'Apply all 20 ADOSH Codes of Practice relevant to operations',
      'Manage contractor HSE per ADOSH Element 6',
      'Enforce heat stress management per CoP 16 (WBGT, work/rest, acclimatization, summer ban)',
      'Report incidents within 48 hours to ADOSH per CoP 2',
    ],
    standards: [...ADOSH_FRAMEWORK, ...ADOSH_COPS, ...UAE_FEDERAL_LAWS],
    tags: ['adosh', 'uae', 'mandatory', 'decree-42', 'cop', 'heat-stress', 'abu-dhabi', 'gulf-core'],
    color: '#34495e',
    icon: 'scale',
    lessons: ADOSH_LESSONS,
    assessments: [
      {
        id: 'adosh-assessment',
        moduleId: 'adosh-framework',
        title: 'ADOSH Competent Person Certification Assessment',
        description: 'Comprehensive assessment aligned with ADOSH Competent Person certification requirements',
        type: 'summative',
        passingScore: 85,
        timeLimitMinutes: 120,
        questions: ADOSH_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [GULF_CHECKLISTS.find(c => c.id === 'gulf-cl-003')!],
    procedures: [GULF_PROCEDURES.find(p => p.id === 'gulf-proc-002')!],
    glossary: GULF_GLOSSARY.filter(g => ['adosh', 'adosh-cop', 'adosh-sf'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'adosh-framework'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // UAE FEDERAL LAWS
  {
    id: 'uae-federal-laws',
    title: 'UAE Federal Laws: Labour, Environment, Civil Defence',
    shortTitle: 'UAE Federal Laws',
    description: 'UAE Federal Law 8/1980 (Labour) Articles 91-101, Federal Law 24/1999 (Environment), Federal Law 33/2021 (New Labour Law), Civil Defence Fire Code, Summer Work Ban, Ministerial Decrees.',
    category: 'regulatory-compliance',
    difficulty: 'basic',
    estimatedHours: 15,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply UAE Labour Law Articles 91-101 for employer HSE obligations',
      'Implement Environment Law 24/1999 for EIA, permits, pollution control',
      'Comply with New Labour Law 33/2021 updated provisions',
      'Enforce Summer Work Ban 12:30-15:00 (Jun 15-Sep 15) per Ministerial Decree',
      'Obtain Civil Defence Fire Safety Certificate for occupancy',
    ],
    standards: UAE_FEDERAL_LAWS,
    tags: ['uae', 'federal-law', 'labour-law', 'environment-law', 'civil-defence', 'summer-ban', 'gulf-core'],
    color: '#e67e22',
    icon: 'gavel',
    lessons: UAE_LAWS_LESSONS,
    assessments: [
      {
        id: 'uae-laws-assessment',
        moduleId: 'uae-federal-laws',
        title: 'UAE Federal Laws Compliance Assessment',
        description: 'Assessment of UAE Labour Law, Environment Law, Civil Defence compliance',
        type: 'summative',
        passingScore: 80,
        timeLimitMinutes: 60,
        questions: UAE_LAWS_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: GULF_GLOSSARY.filter(g => ['uae', 'federal-law', 'summer-ban', 'civil-defence'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'uae-federal-laws'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // ARAMCO GI & SAS
  {
    id: 'aramco-gi-sas',
    title: 'ARAMCO GI 2.100 Series & SAS Standards',
    shortTitle: 'Aramco GI & SAS',
    description: 'Aramco 12-element HSE Management System (GI 2.101-2.112) + SAS operational standards (SAS-001 to SAS-010+). Mandatory for all Saudi Aramco sites. Includes 12 Life Saving Rules.',
    category: 'safety-management-systems',
    difficulty: 'intermediate',
    estimatedHours: 25,
    prerequisites: ['hse-fundamentals', 'risk-assessment'],
    learningObjectives: [
      'Implement Aramco 12-element HSE MS per GI 2.101-2.112',
      'Apply Aramco 5x5 risk matrix and ALARP per GI 2.103/SAS-001',
      'Manage contractors per GI 2.104 with Aramco categories and HSE plans',
      'Report ALL incidents within 24 hours per GI 2.106',
      'Enforce SAS-005 scaffolding weekly inspections and SAS-003 confined space',
      'Apply Aramco 12 Life Saving Rules (similar to ADNOC GRs but 12 rules)',
    ],
    standards: [...ARAMCO_GI, ...ARAMCO_SAS],
    tags: ['aramco', 'gi-2100', 'sas', 'life-saving-rules', 'mandatory', 'saudi-aramco', 'gulf-core'],
    color: '#0066cc',
    icon: 'building-2',
    lessons: ARAMCO_LESSONS,
    assessments: [
      {
        id: 'aramco-assessment',
        moduleId: 'aramco-gi-sas',
        title: 'Aramco HSE Induction Readiness Assessment',
        description: 'Assessment aligned with Aramco site induction and SAS standards compliance',
        type: 'summative',
        passingScore: 90,
        timeLimitMinutes: 90,
        questions: ARAMCO_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: GULF_CASE_STUDIES.filter(cs => cs.moduleId === 'aramco-gi-sas'),
    checklists: [],
    procedures: [GULF_PROCEDURES.find(p => p.id === 'gulf-proc-003')!],
    glossary: GULF_GLOSSARY.filter(g => ['aramco', 'aramco-gi', 'aramco-sas', 'aramco-lsr'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'aramco-gi-sas'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // QATAR HSE
  {
    id: 'qatar-hse',
    title: 'Qatar HSE: Labour Law, QCS, Civil Defence, QP Standards',
    shortTitle: 'Qatar HSE',
    description: 'Qatar Labour Law 14/2004, Qatar Construction Specifications (QCS), Civil Defence Requirements, Qatar Petroleum HSE Standards. Mandatory for Qatar operations.',
    category: 'regulatory-compliance',
    difficulty: 'intermediate',
    estimatedHours: 20,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply Qatar Labour Law 14/2004 HSE obligations and summer ban (10:00-15:00)',
      'Implement Qatar Construction Specifications (QCS) for construction safety',
      'Navigate Qatar Civil Defence approval process (pre-construction, 50%, 100%)',
      'Apply Qatar Petroleum HSE standards for oil & gas sector',
      'Manage worker welfare per Qatar standards (accommodation, transport, food)',
    ],
    standards: QATAR_STANDARDS,
    tags: ['qatar', 'qcs', 'civil-defence', 'qp', 'labour-law', 'gulf-core'],
    color: '#8e44ad',
    icon: 'flag',
    lessons: [],
    assessments: [],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: GULF_FAQS.filter(f => f.moduleId === 'qatar-hse'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // OMAN HSE
  {
    id: 'oman-hse',
    title: 'Oman HSE: Labour Law, MD 286/2008, PDO Standards',
    shortTitle: 'Oman HSE',
    description: 'Oman Labour Law RD 35/2003, Ministerial Decision 286/2008 (OSH MS), PDO HSE Standards (12 elements, contractor management, PSM, HSE Passport). Khareef season, cyclone preparedness.',
    category: 'regulatory-compliance',
    difficulty: 'intermediate',
    estimatedHours: 15,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply Oman Labour Law RD 35/2003 HSE provisions',
      'Implement OSH Management System per MD 286/2008',
      'Navigate PDO HSE Standards: 12 elements, contractor management, PSM, HSE Passport (2-year)',
      'Prepare for Khareef season monsoon hazards in Dhofar',
      'Develop cyclone preparedness plans (Gonu, Mekunu lessons)',
    ],
    standards: OMAN_STANDARDS,
    tags: ['oman', 'pdo', 'md-286', 'khareef', 'cyclone', 'gulf-core'],
    color: '#27ae60',
    icon: 'map-pin',
    lessons: [],
    assessments: [],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: GULF_FAQS.filter(f => f.moduleId === 'oman-hse'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // KUWAIT HSE
  {
    id: 'kuwait-hse',
    title: 'Kuwait HSE: Labour Law, KOC, KNPC, KUFPEC',
    shortTitle: 'Kuwait HSE',
    description: 'Kuwait Labour Law 6/2010, KOC HSE Standards (contractor management, PSM, asset integrity), KNPC Refining Standards, KUFPEC Upstream. Summer ban 11:00-16:00. Desert operations.',
    category: 'regulatory-compliance',
    difficulty: 'intermediate',
    estimatedHours: 15,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply Kuwait Labour Law 6/2010 HSE obligations',
      'Implement KOC HSE Standards: contractor management, PSM, asset integrity',
      'Navigate KNPC Refining Standards and KUFPEC Upstream requirements',
      'Enforce summer work ban 11:00-16:00 (Jun 1 - Aug 31)',
      'Manage desert operations: sandstorm procedures, navigation, wildlife hazards',
    ],
    standards: KUWAIT_STANDARDS,
    tags: ['kuwait', 'koc', 'knpc', 'kufpec', 'desert-ops', 'gulf-core'],
    color: '#f39c12',
    icon: 'sun',
    lessons: [],
    assessments: [],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: GULF_FAQS.filter(f => f.moduleId === 'kuwait-hse'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // BAHRAIN HSE
  {
    id: 'bahrain-hse',
    title: 'Bahrain HSE: Labour Law, BAPCO, Civil Defence',
    shortTitle: 'Bahrain HSE',
    description: 'Bahrain Labour Law 36/2012, BAPCO HSE Standards (oil sector), Civil Defence, Supreme Council for Environment. Alba aluminium standards.',
    category: 'regulatory-compliance',
    difficulty: 'intermediate',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply Bahrain Labour Law 36/2012 HSE provisions',
      'Implement BAPCO HSE Management System for oil sector',
      'Navigate Civil Defence and Supreme Council for Environment requirements',
      'Apply Alba aluminium smelter safety standards',
      'Manage worker welfare per Bahrain standards',
    ],
    standards: BAHRAIN_STANDARDS,
    tags: ['bahrain', 'bapco', 'alba', 'civil-defence', 'gulf-core'],
    color: '#e91e63',
    icon: 'droplet',
    lessons: [],
    assessments: [],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: GULF_FAQS.filter(f => f.moduleId === 'bahrain-hse'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // GULF ENVIRONMENTAL
  {
    id: 'gulf-environmental',
    title: 'Gulf Environmental Factors: Heat Stress, Sandstorms, Desert/Offshore',
    shortTitle: 'Gulf Environment',
    description: 'Extreme heat management (WBGT, work/rest cycles, acclimatization), GCC summer work bans comparison, sandstorm procedures, desert navigation, offshore Gulf specifics (high humidity + heat, H2S, shallow gas), produced water management.',
    category: 'heat-cold-stress',
    difficulty: 'intermediate',
    estimatedHours: 12,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Calculate WBGT-based work/rest cycles per ISO 7243/ACGIH and ADOSH CoP 16',
      'Implement 7-14 day acclimatization program for new arrivals',
      'Enforce GCC summer work bans (Qatar 10-3, UAE 12:30-3, Kuwait 11-4, etc.)',
      'Develop sandstorm procedures: shelter-in-place, PPE, communication',
      'Manage offshore Gulf hazards: high humidity+heat, H2S, shallow gas',
    ],
    standards: [...GSO_STANDARDS, ...ADOSH_COPS.filter(c => c.standardCode.includes('CoP 16'))],
    tags: ['heat-stress', 'wbgt', 'acclimatization', 'summer-ban', 'sandstorm', 'desert', 'offshore', 'gulf-core'],
    color: '#ff6b35',
    icon: 'thermometer',
    lessons: GULF_ENV_LESSONS,
    assessments: [
      {
        id: 'gulf-env-assessment',
        moduleId: 'gulf-environmental',
        title: 'Gulf Heat Stress Management Assessment',
        description: 'Scenario-based assessment of WBGT, work/rest cycles, acclimatization, summer ban compliance',
        type: 'practical',
        passingScore: 85,
        timeLimitMinutes: 60,
        questions: GULF_ENVIRONMENTAL_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: GULF_CASE_STUDIES.filter(cs => cs.moduleId === 'gulf-environmental'),
    checklists: [GULF_CHECKLISTS.find(c => c.id === 'gulf-cl-004')!],
    procedures: [],
    glossary: GULF_GLOSSARY.filter(g => ['heat-stress', 'wbgt', 'summer-ban', 'sandstorm', 'desert', 'offshore'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'gulf-environmental'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // GULF CULTURAL/WELFARE
  {
    id: 'gulf-cultural-welfare',
    title: 'Gulf Cultural & Welfare: Ramadan, Prayer, Camps, Transport, Arabic',
    shortTitle: 'Gulf Culture/Welfare',
    description: 'Cultural competency: Ramadan 6-hour work day (LAW), prayer facilities (>50 workers), Arabic/English bilingual requirements, gender segregation, worker welfare standards (4m²/person, AC, IVMS transport, HACCP food, medical, grievance).',
    category: 'behavioral-safety',
    difficulty: 'basic',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply Ramadan 6-hour work day maximum for ALL workers (legal requirement)',
      'Design compliant prayer facilities for sites >50 workers',
      'Implement Arabic/English bilingual signage, SDS, procedures, training',
      'Manage gender segregation: accommodation, transport, facilities',
      'Audit worker welfare camps per GCC standards (4m², AC, IVMS, HACCP, medical)',
    ],
    standards: [...GSO_STANDARDS, ...UAE_FEDERAL_LAWS.filter(l => l.standardCode.includes('Labour'))],
    tags: ['ramadan', 'prayer', 'arabic', 'gender-segregation', 'worker-welfare', 'camps', 'ivms', 'haccp', 'gulf-core'],
    color: '#9b59b6',
    icon: 'users',
    lessons: GULF_CULTURAL_LESSONS,
    assessments: [
      {
        id: 'gulf-cultural-assessment',
        moduleId: 'gulf-cultural-welfare',
        title: 'Gulf Cultural Competency Assessment',
        description: 'Assessment of Ramadan compliance, prayer facilities, Arabic requirements, welfare standards',
        type: 'formative',
        passingScore: 80,
        timeLimitMinutes: 45,
        questions: GULF_CULTURAL_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: false,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [GULF_CHECKLISTS.find(c => c.id === 'gulf-cl-005')!],
    procedures: [],
    glossary: GULF_GLOSSARY.filter(g => ['ramadan', 'prayer', 'arabic', 'gender', 'welfare', 'camp', 'ivms'].some(t => g.relatedTerms.some(rt => rt.toLowerCase().includes(t)))),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'gulf-cultural-welfare'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // GULF CERTIFICATIONS
  {
    id: 'gulf-certifications',
    title: 'Gulf HSE Certifications: ADNOC Passport, ADOSH, Aramco, NEBOSH Gulf',
    shortTitle: 'Gulf Certifications',
    description: 'Complete certification roadmap: Mandatory (ADNOC Passport 3-yr, ADOSH Competent Person, Aramco Induction, PDO Passport 2-yr, Qatar QCD Fire Safety) + Preferred (NEBOSH IGC + Gulf Supplement, IOSH Managing Safely, ISO 45001 Lead Auditor).',
    category: 'career-development',
    difficulty: 'basic',
    estimatedHours: 8,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Identify mandatory certifications for target Gulf sites/companies',
      'Create personal certification roadmap with renewal tracking',
      'Prepare for ADNOC HSE Passport (3-yr, 3 categories, online verification)',
      'Prepare for ADOSH Competent Person certification (3-yr, exam required)',
      'Navigate site-specific inductions: Aramco, PDO, KOC, BAPCO, Qatar QCD',
    ],
    standards: [],
    tags: ['certifications', 'adnoc-passport', 'adosh-competent-person', 'aramco-induction', 'pdo-passport', 'nebosh-gulf', 'career-roadmap', 'gulf-core'],
    color: '#3498db',
    icon: 'award',
    lessons: GULF_CERT_LESSONS,
    assessments: [
      {
        id: 'gulf-cert-assessment',
        moduleId: 'gulf-certifications',
        title: 'Gulf Certification Readiness Assessment',
        description: 'Evaluate readiness for Gulf certification exams and create personal roadmap',
        type: 'formative',
        passingScore: 75,
        timeLimitMinutes: 30,
        questions: GULF_CERT_QUIZ,
        retakePolicy: { maxAttempts: 3, cooldownHours: 24, randomizedQuestions: true },
        certificateEligible: false,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: GULF_GLOSSARY.filter(g => g.id === 'gt-001'),
    faqs: GULF_FAQS.filter(f => f.moduleId === 'gulf-certifications'),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // ========================================
  // EXISTING GENERIC MODULES - ENHANCED WITH GULF CONTENT
  // ========================================
  
  {
    id: 'hse-fundamentals',
    title: 'HSE Fundamentals & Safety Culture (Global + Gulf)',
    shortTitle: 'HSE Fundamentals',
    description: 'Foundational HSE principles with Gulf regulatory context. Covers ADNOC 100 Series, ADOSH 10 Elements, Aramco GI 2.101, UAE Federal Laws. Essential starting point for Gulf HSE career.',
    category: 'safety-management-systems',
    difficulty: 'basic',
    estimatedHours: 8,
    prerequisites: [],
    learningObjectives: [
      'Define HSE and explain importance in Gulf context',
      'Distinguish global best practice (ISO/OSHA/NEBOSH) from Gulf legal requirements (ADNOC/ADOSH/Aramco/UAE Laws)',
      'Identify applicable Gulf frameworks for specific site/client',
      'Explain HSE Officer accountability for local regulatory compliance',
      'Understand hierarchy of controls with Gulf-specific applications',
    ],
    standards: [...ADNOC_100_STANDARDS.slice(0,1), ...ADOSH_FRAMEWORK.slice(0,1), ...ARAMCO_GI.slice(0,1), ...UAE_FEDERAL_LAWS.slice(0,1)],
    tags: ['foundation', 'gulf-regulations', 'adnoc', 'adosh', 'aramco', 'uae-laws', 'compliance', 'beginner-journey'],
    color: '#1e3a5f',
    icon: 'shield-check',
    lessons: HSE_FUNDAMENTALS_LESSONS,
    assessments: [
      {
        id: 'hse-fund-assessment',
        moduleId: 'hse-fundamentals',
        title: 'HSE Fundamentals: Gulf Context Assessment',
        description: 'Test understanding of global vs Gulf regulatory frameworks',
        type: 'formative',
        passingScore: 80,
        timeLimitMinutes: 30,
        questions: ADNOC_100_QUIZ.slice(0,2),
        retakePolicy: { maxAttempts: 3, cooldownHours: 2, randomizedQuestions: true },
        certificateEligible: false,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: GULF_GLOSSARY.slice(0,5),
    faqs: GULF_FAQS.slice(0,2),
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  {
    id: 'risk-assessment',
    title: 'Risk Assessment & Hazard Identification (Gulf Standards)',
    shortTitle: 'Risk Assessment',
    description: 'Risk assessment methodologies per Gulf requirements: ADNOC 103 (5x5 matrix, ALARP), ADOSH CoP 1 (mandatory methodology), Aramco SAS-001/SAS-002 (5x5, ALARP, Bowtie). Essential for Gulf HSE practice.',
    category: 'risk-assessment',
    difficulty: 'basic',
    estimatedHours: 10,
    prerequisites: ['hse-fundamentals'],
    learningObjectives: [
      'Apply ADNOC 103 5x5 risk matrix and ALARP demonstration',
      'Implement ADOSH CoP 1 mandatory risk assessment methodology',
      'Apply Aramco SAS-001 5x5 matrix and SAS-002 incident-based risk updates',
      'Develop bowtie analysis for major hazards per ADNOC/Aramco requirements',
      'Maintain centralized risk register with quarterly review per Gulf standards',
    ],
    standards: [...ADNOC_100_STANDARDS.filter(s => s.standardCode.includes('103')), ...ADOSH_COPS.filter(s => s.standardCode.includes('CoP 1')), ...ARAMCO_SAS.slice(0,2)],
    tags: ['risk-assessment', 'adnoc-103', 'adosh-cop1', 'aramco-sas001', 'alarp', 'bowtie', 'gulf-standards', 'beginner-journey'],
    color: '#2c3e50',
    icon: 'search',
    lessons: RISK_ASSESSMENT_LESSONS,
    assessments: [
      {
        id: 'ra-assessment',
        moduleId: 'risk-assessment',
        title: 'Gulf Risk Assessment Practical Assessment',
        description: 'Apply ADNOC, ADOSH, and Aramco risk matrices to scenarios',
        type: 'practical',
        passingScore: 85,
        timeLimitMinutes: 60,
        questions: ADNOC_100_QUIZ.slice(2,3).concat(ARAMCO_QUIZ.slice(0,1)),
        retakePolicy: { maxAttempts: 3, cooldownHours: 4, randomizedQuestions: true },
        certificateEligible: true,
      },
    ],
    resources: [],
    caseStudies: [],
    checklists: [],
    procedures: [],
    glossary: [],
    faqs: [],
    version: '2.0.0',
    lastUpdated: new Date('2024-01-15'),
    contributors: [],
    reviewStatus: 'approved',
  },

  // Placeholder for other existing modules that would be enhanced
  // ... (permit-to-work, confined-space, h2s-management, fire-safety, etc. would be similarly enhanced)
];

// ============================================
// EXPORT ALL GULF CONSTANTS FOR USE IN OTHER FILES
// ============================================

export const GULF_STANDARDS = {
  ADNOC_100: ADNOC_100_STANDARDS,
  ADNOC_200: ADNOC_200_STANDARDS,
  ADNOC_300: ADNOC_300_STANDARDS,
  ADNOC_GR: ADNOC_GOLDEN_RULES,
  ADOSH_FRAMEWORK: ADOSH_FRAMEWORK,
  ADOSH_COPS: ADOSH_COPS,
  UAE_LAWS: UAE_FEDERAL_LAWS,
  ARAMCO_GI: ARAMCO_GI,
  ARAMCO_SAS: ARAMCO_SAS,
  QATAR: QATAR_STANDARDS,
  OMAN: OMAN_STANDARDS,
  KUWAIT: KUWAIT_STANDARDS,
  BAHRAIN: BAHRAIN_STANDARDS,
  GSO: GSO_STANDARDS,
};

export const GULF_QUIZZES = {
  ADNOC_100: ADNOC_100_QUIZ,
  ADNOC_GR: ADNOC_GR_QUIZ,
  ADOSH: ADOSH_QUIZ,
  ARAMCO: ARAMCO_QUIZ,
  UAE_LAWS: UAE_LAWS_QUIZ,
  GULF_ENV: GULF_ENVIRONMENTAL_QUIZ,
  GULF_CULTURAL: GULF_CULTURAL_QUIZ,
  GULF_CERT: GULF_CERT_QUIZ,
};

export const GULF_CASE_STUDIES_LIST = GULF_CASE_STUDIES;
export const GULF_CHECKLISTS_LIST = GULF_CHECKLISTS;
export const GULF_PROCEDURES_LIST = GULF_PROCEDURES;
export const GULF_GLOSSARY_LIST = GULF_GLOSSARY;
export const GULF_FAQS_LIST = GULF_FAQS;
export const GULF_ILLUSTRATIONS_LIST = GULF_ILLUSTRATIONS;



// Helper functions for modules
export function getModuleById(moduleId: string) {
  return HSE_MODULES.find(m => m.id === moduleId);
}

export function getModulesByCategory(category: string) {
  return HSE_MODULES.filter(m => m.category === category);
}

export function getModulesByDifficulty(difficulty: string) {
  return HSE_MODULES.filter(m => m.difficulty === difficulty);
}

export function getModulesByTag(tag: string) {
  return HSE_MODULES.filter(m => m.tags.includes(tag));
}

export function getModulesByStandard(standard: string) {
  return HSE_MODULES.filter(m => m.standards.some(s => s.framework === standard));
}

export function getPrerequisiteModules(moduleId: string) {
  const module = getModuleById(moduleId);
  if (!module) return [];
  return module.prerequisites.map(id => getModuleById(id)).filter(Boolean);
}

export function getDependentModules(moduleId: string) {
  return HSE_MODULES.filter(m => m.prerequisites.includes(moduleId));
}




export function getAllCategories() {
  const categories = new Set<string>();
  HSE_MODULES.forEach(m => categories.add(m.category));
  return Array.from(categories).sort();
}

export function getAllTags() {
  const tags = new Set<string>();
  HSE_MODULES.forEach(m => m.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllStandards() {
  const standards = new Set<string>();
  HSE_MODULES.forEach(m => m.standards.forEach(s => standards.add(s.framework)));
  return Array.from(standards).sort();
}

export function getModulesByMultipleTags(tags: string[], matchAll = false) {
  if (matchAll) {
    return HSE_MODULES.filter(m => tags.every(t => m.tags.includes(t)));
  }
  return HSE_MODULES.filter(m => tags.some(t => m.tags.includes(t)));
}

export function getModuleProgress(moduleId: string, userProgress: Record<string, any>) {
  const progress = userProgress[moduleId];
  if (!progress) return { completed: false, inProgress: false, score: undefined };
  return {
    completed: progress.status === 'completed',
    inProgress: progress.status === 'in-progress',
    score: progress.quizScores?.[progress.quizScores.length - 1]?.percentage,
  };
}


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
