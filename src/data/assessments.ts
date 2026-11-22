/**
 * HSE Learning Guide - Assessment Data
 * Comprehensive assessment questions, simulations, and practical exercises
 * Aligned with ADNOC, ADOSH, ISO, OSHA, ARAMCO, NEBOSH, IOSH, NFPA, API, IOGP, CCPS
 */

import type { 
  Assessment, 
  QuizQuestion, 
  QuizQuestionType, 
  ScenarioQuestion, 
  ScenarioOption,
  DragDropConfig,
  HotspotConfig,
  InteractiveElement,
  InteractiveFeedback,
  ContentDifficulty,
  StandardFramework 
} from '../types/hse';

// ============================================
// ASSESSMENT QUESTIONS BY TOPIC
// ============================================

export const ASSESSMENT_QUESTIONS: Record<string, QuizQuestion[]> = {
  'hse-fundamentals': [
    {
      id: 'hse-fund-001',
      type: 'single-choice',
      question: 'What is the correct order of the Hierarchy of Controls from most effective to least effective?',
      explanation: 'The Hierarchy of Controls prioritizes controls that eliminate hazards at the source over those that rely on human behavior. Elimination is most effective; PPE is least effective as it relies on proper use and maintenance.',
      difficulty: 'basic',
      points: 10,
      tags: ['hierarchy-of-controls', 'fundamentals'],
      standards: ['OSHA', 'ISO45001', 'ADNOC', 'ADOSH', 'ARAMCO'],
      options: [
        { id: 'a', text: 'Elimination → Substitution → Engineering Controls → Administrative Controls → PPE', isCorrect: true },
        { id: 'b', text: 'PPE → Administrative Controls → Engineering Controls → Substitution → Elimination', isCorrect: false },
        { id: 'c', text: 'Engineering Controls → PPE → Elimination → Substitution → Administrative Controls', isCorrect: false },
        { id: 'd', text: 'Substitution → Elimination → PPE → Engineering Controls → Administrative Controls', isCorrect: false },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'hse-fund-002',
      type: 'single-choice',
      question: 'Which ADNOC HSE Golden Rule states "Obtain authorization before entering a confined space"?',
      explanation: 'ADNOC Golden Rule #3: Obtain authorization before entering a confined space. This rule emphasizes the permit-required confined space entry process.',
      difficulty: 'basic',
      points: 10,
      tags: ['adnoc', 'golden-rules', 'confined-space'],
      standards: ['ADNOC'],
      options: [
        { id: 'a', text: 'Rule 1: Work with a valid permit', isCorrect: false },
        { id: 'b', text: 'Rule 2: Verify isolation before work', isCorrect: false },
        { id: 'c', text: 'Rule 3: Obtain authorization before entering a confined space', isCorrect: true },
        { id: 'd', text: 'Rule 4: Use fall protection when working at height', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'hse-fund-003',
      type: 'multiple-choice',
      question: 'Which of the following are part of the ISO 45001:2018 Plan-Do-Check-Act (PDCA) cycle? (Select all that apply)',
      explanation: 'ISO 45001 follows the PDCA cycle: Plan (clauses 4, 6), Do (clauses 7, 8), Check (clause 9), Act (clause 10).',
      difficulty: 'intermediate',
      points: 15,
      tags: ['iso45001', 'pdca', 'management-system'],
      standards: ['ISO45001'],
      options: [
        { id: 'a', text: 'Plan: Establish OH&S objectives and processes', isCorrect: true },
        { id: 'b', text: 'Do: Implement the processes', isCorrect: true },
        { id: 'c', text: 'Check: Monitor and measure processes against policy', isCorrect: true },
        { id: 'd', text: 'Act: Take action to improve performance', isCorrect: true },
        { id: 'e', text: 'Review: Annual management review only', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'c', 'd'],
    },
    {
      id: 'hse-fund-004',
      type: 'true-false',
      question: 'The OSHA General Duty Clause (Section 5(a)(1)) requires employers to provide a workplace free from recognized hazards that are causing or likely to cause death or serious physical harm.',
      explanation: 'This is the exact wording of OSHA Section 5(a)(1), commonly known as the General Duty Clause. It applies when no specific standard addresses a recognized hazard.',
      difficulty: 'basic',
      points: 10,
      tags: ['osha', 'general-duty-clause', 'regulations'],
      standards: ['OSHA'],
      correctAnswer: 'true',
    },
    {
      id: 'hse-fund-005',
      type: 'scenario',
      question: 'A new employee observes a senior colleague not wearing required PPE in a designated area. The new employee is unsure whether to speak up due to the seniority difference.',
      explanation: 'This scenario tests the application of ADNOC Golden Rule #10: Stop unsafe work. All personnel, regardless of position, have the authority and obligation to stop unsafe work.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['adnoc', 'golden-rules', 'stop-work-authority', 'culture'],
      standards: ['ADNOC', 'ISO45001'],
      scenario: {
        description: 'A new employee observes a senior colleague not wearing required PPE in a designated area. The new employee is unsure whether to speak up due to the seniority difference.',
        context: 'New employee, first week on site. Senior colleague has 20 years experience.',
        options: [
          { id: 'a', text: 'Stay silent - the senior colleague knows better', isCorrect: false, consequence: 'Violates stop-work authority and ADNOC Golden Rule #10' },
          { id: 'b', text: 'Report to supervisor after shift ends', isCorrect: false, consequence: 'Delay allows unsafe condition to persist' },
          { id: 'c', text: 'Politely remind the colleague of PPE requirements and offer spare PPE', isCorrect: true, consequence: 'Correct application of stop-work authority and peer-to-peer safety culture' },
          { id: 'd', text: 'Take a photo and post on social media', isCorrect: false, consequence: 'Unprofessional, violates privacy, does not resolve immediate hazard' },
        ],
        correctPath: ['c'],
      },
    },
  ],

  'risk-assessment': [
    {
      id: 'risk-001',
      type: 'single-choice',
      question: 'What is the correct formula for calculating a Risk Rating using a 5×5 Risk Matrix?',
      explanation: 'Risk Rating = Likelihood × Severity. Both are typically rated 1-5, giving a maximum risk score of 25.',
      difficulty: 'basic',
      points: 10,
      tags: ['risk-matrix', 'risk-assessment', 'methodology'],
      standards: ['ISO31000', 'ISO45001', 'ADNOC', 'ADOSH', 'OSHA'],
      options: [
        { id: 'a', text: 'Risk = Likelihood × Severity', isCorrect: true },
        { id: 'b', text: 'Risk = Likelihood + Severity', isCorrect: false },
        { id: 'c', text: 'Risk = (Likelihood + Severity) / 2', isCorrect: false },
        { id: 'd', text: 'Risk = Severity - Likelihood', isCorrect: false },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'risk-002',
      type: 'single-choice',
      question: 'In a HAZOP study, what does the guide word "NO" applied to the parameter "FLOW" indicate?',
      explanation: 'HAZOP uses guide words applied to process parameters. "NO FLOW" means the complete absence of flow where flow is expected.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['hazop', 'process-safety', 'methodology'],
      standards: ['API', 'CCPS', 'ADNOC', 'OSHA', 'ADOSH'],
      options: [
        { id: 'a', text: 'Flow is less than normal', isCorrect: false },
        { id: 'b', text: 'Flow is greater than normal', isCorrect: false },
        { id: 'c', text: 'No flow when flow is expected', isCorrect: true },
        { id: 'd', text: 'Flow in reverse direction', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'risk-003',
      type: 'drag-drop',
      question: 'Arrange the 5 steps of the Risk Assessment process in the correct order:',
      explanation: 'The standard 5-step risk assessment process: 1) Identify hazards, 2) Assess risks, 3) Control risks, 4) Record findings, 5) Review and update.',
      difficulty: 'intermediate',
      points: 20,
      tags: ['risk-assessment', 'process', 'methodology'],
      standards: ['ISO45001', 'ISO31000', 'ADNOC', 'ADOSH', 'OSHA'],
      dragDropConfig: {
        items: [
          { id: '1', content: 'Identify Hazards', type: 'text' },
          { id: '2', content: 'Assess Risks (Likelihood × Severity)', type: 'text' },
          { id: '3', content: 'Control Risks (Hierarchy of Controls)', type: 'text' },
          { id: '4', content: 'Record Findings', type: 'text' },
          { id: '5', content: 'Review and Update', type: 'text' },
        ],
        zones: [
          { id: 'zone1', label: 'Step 1', acceptedItemIds: ['1'], maxItems: 1 },
          { id: 'zone2', label: 'Step 2', acceptedItemIds: ['2'], maxItems: 1 },
          { id: 'zone3', label: 'Step 3', acceptedItemIds: ['3'], maxItems: 1 },
          { id: 'zone4', label: 'Step 4', acceptedItemIds: ['4'], maxItems: 1 },
          { id: 'zone5', label: 'Step 5', acceptedItemIds: ['5'], maxItems: 1 },
        ],
      },
      correctAnswer: '1,2,3,4,5',
    },
    {
      id: 'risk-004',
      type: 'scenario',
      question: 'During a risk assessment for a new chemical storage facility, you identify that a tank containing flammable liquid is located near an ignition source. The likelihood is rated "Possible" (3) and severity "Major" (4).',
      explanation: 'Risk = Likelihood (3) × Severity (4) = 12. On a 5×5 matrix, this is typically "High" risk requiring immediate action and additional controls.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['risk-matrix', 'chemical-safety', 'flammable-liquids'],
      standards: ['ADNOC', 'ADOSH', 'OSHA', 'NFPA', 'API'],
      scenario: {
        description: 'A tank containing flammable liquid is located near an ignition source. Likelihood: "Possible" (3), Severity: "Major" (4).',
        context: 'New chemical storage facility risk assessment',
        options: [
          { id: 'a', text: 'Risk Rating = 7 (Medium), accept with monitoring', isCorrect: false, consequence: 'Incorrect calculation: 3×4=12, not 7' },
          { id: 'b', text: 'Risk Rating = 12 (High), implement additional controls immediately', isCorrect: true, consequence: 'Correct: 3×4=12, High risk requires immediate action' },
          { id: 'c', text: 'Risk Rating = 12 (Low), no action needed', isCorrect: false, consequence: 'Incorrect risk classification' },
          { id: 'd', text: 'Risk Rating = 7 (High), implement additional controls', isCorrect: false, consequence: 'Incorrect calculation' },
        ],
        correctPath: ['b'],
      },
    },
  ],

  'fall-protection': [
    {
      id: 'fall-001',
      type: 'single-choice',
      question: 'What is the minimum required clearance distance for a 6-foot lanyard with a deceleration device, assuming a 6-foot worker, when calculating fall clearance?',
      explanation: 'Fall clearance = Free fall distance (6 ft) + Deceleration distance (3.5 ft) + Worker height (6 ft) + Safety factor (3 ft) = 18.5 ft minimum. The 6 ft lanyard allows 6 ft free fall, deceleration device adds 3.5 ft, worker is 6 ft tall, plus 3 ft safety factor.',
      difficulty: 'advanced',
      points: 15,
      tags: ['fall-protection', 'clearance-calculation', 'lanyard'],
      standards: ['OSHA', 'ANSI', 'ADNOC', 'ADOSH', 'ARAMCO'],
      options: [
        { id: 'a', text: '12.5 feet', isCorrect: false },
        { id: 'b', text: '15.5 feet', isCorrect: false },
        { id: 'c', text: '18.5 feet', isCorrect: true },
        { id: 'd', text: '21.5 feet', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'fall-002',
      type: 'single-choice',
      question: 'Which ADNOC Golden Rule addresses fall protection?',
      explanation: 'ADNOC Golden Rule #4: Use fall protection when working at height.',
      difficulty: 'basic',
      points: 10,
      tags: ['adnoc', 'golden-rules', 'fall-protection'],
      standards: ['ADNOC'],
      options: [
        { id: 'a', text: 'Rule 1: Work with a valid permit', isCorrect: false },
        { id: 'b', text: 'Rule 3: Obtain authorization before entering a confined space', isCorrect: false },
        { id: 'c', text: 'Rule 4: Use fall protection when working at height', isCorrect: true },
        { id: 'd', text: 'Rule 5: Follow safe driving rules', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'fall-003',
      type: 'hotspot',
      question: 'Identify the fall hazards in this scaffold image:',
      explanation: 'Key fall hazards: 1) Missing guardrails on working platform, 2) Missing toe boards, 3) Improper access (ladder not secured), 4) Overloaded platform, 5) Missing fall protection tie-off points.',
      difficulty: 'intermediate',
      points: 20,
      tags: ['fall-protection', 'scaffolding', 'hazard-identification'],
      standards: ['OSHA', 'ADNOC', 'ANSI', 'ADOSH'],
      hotspotConfig: {
        imageSrc: '/images/scaffold-hazards.jpg',
        hotspots: [
          { id: 'h1', x: 25, y: 30, radius: 15, title: 'Missing Guardrails', description: 'Top rail and mid-rail missing on working platform', linkTo: '/topics/fall-protection' },
          { id: 'h2', x: 60, y: 45, radius: 12, title: 'Missing Toe Boards', description: 'Toe boards missing - tools/materials can fall', linkTo: '/topics/scaffolding' },
          { id: 'h3', x: 80, y: 60, radius: 10, title: 'Unsecured Ladder', description: 'Ladder not secured at top', linkTo: '/topics/fall-protection' },
        ],
        question: 'Click on all fall hazards you can identify',
      },
    },
  ],

  'confined-space': [
    {
      id: 'cs-001',
      type: 'single-choice',
      question: 'What is the acceptable oxygen concentration range for safe entry into a confined space?',
      explanation: 'OSHA and ADNOC require oxygen concentration between 19.5% and 23.5% for safe confined space entry. Below 19.5% is oxygen-deficient; above 23.5% increases fire risk.',
      difficulty: 'basic',
      points: 10,
      tags: ['confined-space', 'atmospheric-testing', 'oxygen'],
      standards: ['OSHA', 'ADNOC', 'ADOSH', 'ARAMCO', 'ANSI'],
      options: [
        { id: 'a', text: '18.0% - 22.0%', isCorrect: false },
        { id: 'b', text: '19.5% - 23.5%', isCorrect: true },
        { id: 'c', text: '18.5% - 24.0%', isCorrect: false },
        { id: 'd', text: '20.0% - 25.0%', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'cs-002',
      type: 'multiple-choice',
      question: 'Which of the following are required roles for a permit-required confined space entry? (Select all that apply)',
      explanation: 'OSHA 1910.146 and ADNOC require three distinct roles: Entrant (person entering), Attendant (monitoring from outside), and Entry Supervisor (authorizes entry and ensures safety).',
      difficulty: 'intermediate',
      points: 15,
      tags: ['confined-space', 'roles', 'permit-required'],
      standards: ['OSHA', 'ADNOC', 'ADOSH', 'ARAMCO', 'ANSI'],
      options: [
        { id: 'a', text: 'Entrant', isCorrect: true },
        { id: 'b', text: 'Attendant', isCorrect: true },
        { id: 'c', text: 'Entry Supervisor', isCorrect: true },
        { id: 'd', text: 'Gas Tester', isCorrect: true },
        { id: 'e', text: 'Fire Watch', isCorrect: false },
        { id: 'f', text: 'Safety Officer', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'c', 'd'],
    },
    {
      id: 'cs-003',
      type: 'scenario',
      question: 'During a confined space entry, the gas monitor alarms at 10 ppm H2S. The entrant is 15 meters inside the vessel. The attendant has an escape set (10-minute SCBA) but not a full SCBA.',
      explanation: 'At 10 ppm H2S, this exceeds the 10 ppm alarm threshold. The attendant must NOT enter - they only have an escape set (10 min), not a full SCBA. Rescue requires trained rescue team with full SCBA.',
      difficulty: 'advanced',
      points: 20,
      tags: ['confined-space', 'h2s', 'rescue', 'emergency-response'],
      standards: ['ADNOC', 'ADOSH', 'OSHA', 'API', 'ANSI'],
      scenario: {
        description: 'Gas monitor alarms at 10 ppm H2S. Entrant 15m inside. Attendant has 10-min escape set only.',
        context: 'Confined space entry, H2S alarm at 10 ppm',
        options: [
          { id: 'a', text: 'Attendant enters immediately with escape set to rescue entrant', isCorrect: false, consequence: 'FATAL: Escape set only 10 min, attendant becomes second victim' },
          { id: 'b', text: 'Attendant calls emergency rescue team, monitors from outside, maintains communication', isCorrect: true, consequence: 'Correct: Only trained rescue team with full SCBA should enter' },
          { id: 'c', text: 'Attendant uses escape set to go in, then calls for help', isCorrect: false, consequence: 'Escape set only provides 10 min air - insufficient for rescue' },
          { id: 'd', text: 'Attendant waits to see if alarm clears', isCorrect: false, consequence: 'Delay increases risk to entrant' },
        ],
        correctPath: ['b'],
      },
    },
  ],

  'h2s-management': [
    {
      id: 'h2s-001',
      type: 'single-choice',
      question: 'What is the ADNOC H2S Zone 2 concentration range?',
      explanation: 'ADNOC H2S Zones: Zone 0 (<10 ppm), Zone 1 (10-30 ppm), Zone 2 (30-100 ppm), Zone 3 (>100 ppm).',
      difficulty: 'intermediate',
      points: 10,
      tags: ['h2s', 'adnoc', 'zones'],
      standards: ['ADNOC', 'ADOSH', 'API', 'OPITO'],
      options: [
        { id: 'a', text: '<10 ppm', isCorrect: false },
        { id: 'b', text: '10-30 ppm', isCorrect: false },
        { id: 'c', text: '30-100 ppm', isCorrect: true },
        { id: 'd', text: '>100 ppm', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'h2s-002',
      type: 'single-choice',
      question: 'What PPE is required for ADNOC H2S Zone 2 (30-100 ppm)?',
      explanation: 'Zone 2 (30-100 ppm) requires Supplied Air Breathing Apparatus (SABA) or SCBA. Escape sets only for <10 ppm egress. Zone 2 requires positive pressure supplied air.',
      difficulty: 'advanced',
      points: 15,
      tags: ['h2s', 'adnoc', 'ppe', 'zone-2'],
      standards: ['ADNOC', 'ADOSH', 'API', 'OPITO'],
      options: [
        { id: 'a', text: 'Escape set (10 min)', isCorrect: false },
        { id: 'b', text: 'Escape set (15 min)', isCorrect: false },
        { id: 'c', text: 'Supplied Air (SABA) or SCBA', isCorrect: true },
        { id: 'd', text: 'N95 respirator', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'h2s-003',
      type: 'hotspot',
      question: 'Identify the correct action levels for H2S monitoring:',
      explanation: 'ADNOC H2S Action Levels: 10 ppm = Alert/Investigate, 15 ppm = Muster, 20 ppm = Evacuate, 30 ppm = Zone 2 entry requires SABA/SCBA.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['h2s', 'action-levels', 'monitoring', 'adnoc'],
      standards: ['ADNOC', 'ADOSH', 'API'],
      hotspotConfig: {
        imageSrc: '/images/h2s-action-levels.jpg',
        hotspots: [
          { id: 'h1', x: 20, y: 30, radius: 15, title: '10 ppm', description: 'Alert level - investigate source' },
          { id: 'h2', x: 40, y: 50, radius: 15, title: '15 ppm', description: 'Muster level - proceed to muster point' },
          { id: 'h3', x: 60, y: 70, radius: 15, title: '20 ppm', description: 'Evacuate level - evacuate crosswind' },
          { id: 'h4', x: 80, y: 90, radius: 15, title: '30 ppm', description: 'Zone 2 boundary - SABA/SCBA required' },
        ],
        question: 'Click on each action level to see the required response',
      },
    },
  ],

  'process-safety': [
    {
      id: 'psm-001',
      type: 'single-choice',
      question: 'How many elements are in the OSHA 1910.119 Process Safety Management (PSM) standard?',
      explanation: 'OSHA 1910.119 PSM has 14 elements. ADNOC Standard 203 aligns with these 14 elements plus adds Asset Integrity requirements.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['psm', 'process-safety', 'osha', 'adnoc'],
      standards: ['OSHA', 'ADNOC', 'API', 'CCPS', 'EPA'],
      options: [
        { id: 'a', text: '12', isCorrect: false },
        { id: 'b', text: '14', isCorrect: true },
        { id: 'c', text: '16', isCorrect: false },
        { id: 'd', text: '10', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'psm-002',
      type: 'multiple-choice',
      question: 'Which of the following are elements of the OSHA 1910.119 PSM standard? (Select all that apply)',
      explanation: 'The 14 PSM elements: 1) Process Safety Information, 2) Process Hazard Analysis, 3) Operating Procedures, 4) Training, 5) Contractor Management, 6) Pre-Startup Safety Review, 7) Mechanical Integrity, 8) Hot Work Permit, 9) Management of Change, 10) Incident Investigation, 11) Emergency Response, 12) Compliance Audits, 13) Trade Secrets, 14) Employee Participation.',
      difficulty: 'advanced',
      points: 20,
      tags: ['psm', 'elements', 'osha', 'adnoc'],
      standards: ['OSHA', 'ADNOC', 'API', 'CCPS', 'EPA'],
      options: [
        { id: 'a', text: 'Process Safety Information', isCorrect: true },
        { id: 'b', text: 'Process Hazard Analysis (PHA)', isCorrect: true },
        { id: 'c', text: 'Operating Procedures', isCorrect: true },
        { id: 'd', text: 'Employee Training', isCorrect: true },
        { id: 'e', text: 'Contractor Management', isCorrect: true },
        { id: 'f', text: 'Pre-Startup Safety Review (PSSR)', isCorrect: true },
        { id: 'g', text: 'Mechanical Integrity', isCorrect: true },
        { id: 'h', text: 'Hot Work Permit', isCorrect: true },
        { id: 'i', text: 'Management of Change (MOC)', isCorrect: true },
        { id: 'j', text: 'Incident Investigation', isCorrect: true },
        { id: 'k', text: 'Emergency Response', isCorrect: true },
        { id: 'k', text: 'Compliance Audits', isCorrect: true },
        { id: 'm', text: 'Trade Secrets', isCorrect: true },
        { id: 'n', text: 'Employee Participation', isCorrect: true },
        { id: 'o', text: 'Environmental Impact Assessment', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'k', 'm', 'n'],
    },
    {
      id: 'psm-003',
      type: 'single-choice',
      question: 'In LOPA (Layer of Protection Analysis), what does a Safety Integrity Level (SIL) of 2 represent?',
      explanation: 'SIL 2 corresponds to a Risk Reduction Factor (RRF) of 100 to 1,000. It means the safety instrumented function (SIF) must reduce the risk by a factor of 100 to 1,000.',
      difficulty: 'expert',
      points: 15,
      tags: ['lopa', 'sil', 'safety-instrumented-systems', 'process-safety'],
      standards: ['IEC', 'API', 'CCPS', 'ADNOC', 'OSHA'],
      options: [
        { id: 'a', text: 'RRF 10-100', isCorrect: false },
        { id: 'b', text: 'RRF 100-1,000', isCorrect: true },
        { id: 'c', text: 'RRF 1,000-10,000', isCorrect: false },
        { id: 'd', text: 'RRF 10,000-100,000', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'psm-004',
      type: 'scenario',
      question: 'A change is proposed to increase the operating pressure of a reactor vessel by 15% above design pressure. The change is considered "temporary" for a 2-week production run.',
      explanation: 'Any change above design pressure requires a full Management of Change (MOC) review per ADNOC Standard 205 and OSHA 1910.119(l). "Temporary" does not exempt from MOC. PSSR required before restart.',
      difficulty: 'advanced',
      points: 20,
      tags: ['moc', 'process-safety', 'change-management', 'pssr'],
      standards: ['ADNOC', 'OSHA', 'API', 'CCPS', 'CCPS'],
      scenario: {
        description: 'Proposed 15% pressure increase above design for 2-week "temporary" run.',
        context: 'Process engineer proposes temporary pressure increase for production',
        options: [
          { id: 'a', text: 'Proceed - it\'s only temporary for 2 weeks', isCorrect: false, consequence: 'VIOLATION: All changes above design basis require full MOC regardless of duration' },
          { id: 'b', text: 'Submit MOC request, conduct PHA, complete PSSR before startup', isCorrect: true, consequence: 'CORRECT: Full MOC required regardless of duration; PSSR mandatory before startup' },
          { id: 'c', text: 'Get verbal approval from shift supervisor and proceed', isCorrect: false, consequence: 'VIOLATION: Requires documented MOC with PHA and PSSR' },
          { id: 'd', text: 'Document in logbook and monitor pressure closely', isCorrect: false, consequence: 'VIOLATION: Inadequate - requires formal MOC process' },
        ],
        correctPath: ['b'],
      },
    },
  ],

  'permit-to-work': [
    {
      id: 'ptw-001',
      type: 'single-choice',
      question: 'Who is the "Issuing Authority" in the ADNOC Permit to Work system?',
      explanation: 'The Issuing Authority is the person authorized to issue the permit after verifying all safety measures are in place. They are typically the Area Authority or delegate.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['ptw', 'adnoc', 'authorization'],
      standards: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'IOGP'],
      options: [
        { id: 'a', text: 'The person performing the work', isCorrect: false },
        { id: 'b', text: 'The person authorizing the permit after verification', isCorrect: true },
        { id: 'c', text: 'The safety officer', isCorrect: false },
        { id: 'd', text: 'The fire watch', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'ptw-002',
      type: 'multiple-choice',
      question: 'Which permit types are included in the ADNOC PTW system? (Select all that apply)',
      explanation: 'ADNOC PTW system includes: Hot Work, Cold Work, Confined Space Entry, Working at Height, Excavation, Electrical Isolation, Radiography, and others as required.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['ptw', 'adnoc', 'permit-types'],
      standards: ['ADNOC', 'ADOSH', 'OSHA', 'ARAMCO', 'IOGP'],
      options: [
        { id: 'a', text: 'Hot Work', isCorrect: true },
        { id: 'b', text: 'Cold Work', isCorrect: true },
        { id: 'c', text: 'Confined Space Entry', isCorrect: true },
        { id: 'd', text: 'Working at Height', isCorrect: true },
        { id: 'e', text: 'Excavation', isCorrect: true },
        { id: 'f', text: 'Electrical Isolation', isCorrect: true },
        { id: 'g', text: 'Radiography', isCorrect: true },
        { id: 'h', text: 'Vehicle Entry', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    },
    {
      id: 'ptw-003',
      type: 'scenario',
      question: 'A hot work permit is issued for welding on a pipe. The fire watch leaves the area for a 15-minute break. During this time, a spark ignites nearby insulation.',
      explanation: 'Fire watch must be continuous during hot work and for 30-60 minutes after completion (NFPA 51B, ADNOC 206). Leaving the area, even briefly, violates the permit conditions.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['ptw', 'hot-work', 'fire-watch', 'adnoc'],
      standards: ['ADNOC', 'NFPA', 'OSHA', 'ADOSH', 'ARAMCO'],
      scenario: {
        description: 'Fire watch leaves hot work area for 15-minute break; spark ignites insulation',
        context: 'Hot work permit active, fire watch on break',
        options: [
          { id: 'a', text: 'Acceptable - break was only 15 minutes', isCorrect: false, consequence: 'VIOLATION: Fire watch must be continuous per NFPA 51B and ADNOC 206' },
          { id: 'b', text: 'Fire watch violated permit conditions; work must stop immediately', isCorrect: true, consequence: 'CORRECT: Fire watch must be continuous; work stops until fire watch returns' },
          { id: 'c', text: 'Acceptable if another worker watches briefly', isCorrect: false, consequence: 'VIOLATION: Fire watch must be designated, trained, and continuous' },
          { id: 'd', text: 'Only a violation if fire actually starts', isCorrect: false, consequence: 'VIOLATION: Permit violation occurs when fire watch leaves, regardless of outcome' },
        ],
        correctPath: ['b'],
      },
    },
  ],

  'lockout-tagout': [
    {
      id: 'loto-001',
      type: 'single-choice',
      question: 'What is the first step in the LOTO procedure sequence?',
      explanation: 'The standard LOTO sequence: 1) Notify affected employees, 2) Shutdown equipment, 3) Isolate energy sources, 4) Apply locks/tags, 5) Verify isolation (zero energy check), 6) Perform work, 7) Remove locks/tags, 8) Restore energy, 9) Notify affected employees.',
      difficulty: 'basic',
      points: 10,
      tags: ['loto', 'energy-isolation', 'procedure'],
      standards: ['OSHA', 'ADNOC', 'ADOSH', 'ARAMCO', 'ANSI'],
      options: [
        { id: 'a', text: 'Apply locks and tags', isCorrect: false },
        { id: 'b', text: 'Notify affected employees', isCorrect: true },
        { id: 'c', text: 'Isolate energy sources', isCorrect: false },
        { id: 'd', text: 'Verify isolation', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'loto-002',
      type: 'single-choice',
      question: 'What is the purpose of the "Zero Energy Check" in LOTO?',
      explanation: 'The Zero Energy Check (verification) confirms that all energy sources are isolated and the equipment cannot be energized or started. It is performed after locks/tags are applied but before work begins.',
      difficulty: 'intermediate',
      points: 15,
      tags: ['loto', 'verification', 'zero-energy-check'],
      standards: ['OSHA', 'ADNOC', 'ADOSH', 'ANSI', 'ARAMCO'],
      options: [
        { id: 'a', text: 'To verify all energy sources are isolated before work begins', isCorrect: true },
        { id: 'b', text: 'To test if the lock is strong enough', isCorrect: false },
        { id: 'c', text: 'To check if the tag is readable', isCorrect: false },
        { id: 'd', text: 'To measure residual voltage', isCorrect: false },
      ],
      correctAnswer: 'a',
    },
  ],

  'chemical-safety': [
    {
      id: 'chem-001',
      type: 'single-choice',
      question: 'Which GHS pictogram represents "Acute Toxicity" (Category 1-3)?',
      explanation: 'The skull and crossbones pictogram represents acute toxicity (Categories 1, 2, 3). The exclamation mark is for Category 4 acute toxicity and other hazards.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['ghs', 'chemical-safety', 'pictograms', 'hazcom'],
      standards: ['OSHA', 'GHS', 'ADNOC', 'ADOSH', 'ARAMCO'],
      options: [
        { id: 'a', text: 'Skull and Crossbones', isCorrect: true },
        { id: 'b', text: 'Exclamation Mark', isCorrect: false },
        { id: 'c', text: 'Health Hazard (Silhouette)', isCorrect: false },
        { id: 'd', text: 'Corrosion', isCorrect: false },
      ],
      correctAnswer: 'a',
    },
    {
      id: 'chem-002',
      type: 'single-choice',
      question: 'Which section of the SDS contains information on "Exposure Controls/Personal Protection"?',
      explanation: 'SDS Section 8: Exposure Controls/Personal Protection contains exposure limits, engineering controls, and PPE recommendations.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['sds', 'safety-data-sheet', 'hazcom', 'ppe'],
      standards: ['OSHA', 'GHS', 'ADNOC', 'ADOSH', 'ARAMCO'],
      options: [
        { id: 'a', text: 'Section 4: First-Aid Measures', isCorrect: false },
        { id: 'b', text: 'Section 7: Handling and Storage', isCorrect: false },
        { id: 'c', text: 'Section 8: Exposure Controls/Personal Protection', isCorrect: true },
        { id: 'd', text: 'Section 11: Toxicological Information', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
  ],

  'environmental-management': [
    {
      id: 'env-001',
      type: 'single-choice',
      question: 'What is the primary purpose of an SPCC (Spill Prevention, Control, and Countermeasure) Plan?',
      explanation: 'SPCC Plans are required by EPA (40 CFR 112) for facilities that store oil above threshold quantities. The plan describes procedures to prevent oil spills and control/cleanup measures if a spill occurs.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['spcc', 'spill-prevention', 'environmental', 'epa'],
      standards: ['EPA', 'ADNOC', 'ADOSH', 'API', 'IMO'],
      options: [
        { id: 'a', text: 'To respond to chemical spills', isCorrect: false },
        { id: 'b', text: 'To prevent oil spills and describe response procedures', isCorrect: true },
        { id: 'c', text: 'To manage hazardous waste', isCorrect: false },
        { id: 'd', text: 'To monitor air emissions', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
  ],

  'emergency-response': [
    {
      id: 'er-001',
      type: 'single-choice',
      question: 'In the Incident Command System (ICS), who is responsible for overall management of the incident?',
      explanation: 'The Incident Commander (IC) has overall responsibility for managing the incident. They may be a single IC or Unified Command for multi-jurisdictional incidents.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['ics', 'incident-command', 'emergency-response'],
      standards: ['OSHA', 'NFPA', 'FEMA', 'NCEMA', 'ADNOC', 'ADOSH'],
      options: [
        { id: 'a', text: 'Operations Section Chief', isCorrect: false },
        { id: 'b', text: 'Incident Commander', isCorrect: true },
        { id: 'c', text: 'Planning Section Chief', isCorrect: false },
        { id: 'd', text: 'Safety Officer', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
    {
      id: 'er-002',
      type: 'single-choice',
      question: 'What is the primary purpose of a Tier 1 Process Safety Event per API RP 754?',
      explanation: 'API RP 754 Tier 1: Loss of primary containment (LOPC) with greater consequence - unplanned release with significant consequences (injury, fatality, significant release, etc.). Tier 2 is lesser consequence. Tier 3 is near miss/near miss with potential.',
      difficulty: 'advanced',
      points: 15,
      tags: ['api-754', 'process-safety', 'tier-1', 'process-safety-events'],
      standards: ['API', 'ADNOC', 'CCPS', 'IOGP', 'OSHA'],
      options: [
        { id: 'a', text: 'Near miss with no consequence', isCorrect: false },
        { id: 'b', text: 'Loss of primary containment with greater consequence', isCorrect: true },
        { id: 'c', text: 'Minor release with no injury', isCorrect: false },
        { id: 'd', text: 'Any emergency response activation', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
  ],

  'contractor-management': [
    {
      id: 'cm-001',
      type: 'single-choice',
      question: 'What is a CHSEP in ADNOC contractor management?',
      explanation: 'CHSEP = Contractor HSE Plan. Contractors must submit a site-specific HSE plan for ADNOC approval before mobilization.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['contractor-management', 'adnoc', 'chsep'],
      standards: ['ADNOC', 'ADOSH', 'ISO45001', 'IOGP'],
      options: [
        { id: 'a', text: 'Contractor Health and Safety Execution Plan', isCorrect: false },
        { id: 'b', text: 'Contractor Health, Safety and Environment Plan', isCorrect: true },
        { id: 'c', text: 'Contractor HSE Performance', isCorrect: false },
        { id: 'd', text: 'Contractor HSE Procedure', isCorrect: false },
      ],
      correctAnswer: 'b',
    },
  ],

  'occupational-health': [
    {
      id: 'oh-001',
      type: 'single-choice',
      question: 'What is the OSHA Permissible Exposure Limit (PEL) for noise exposure (8-hour TWA)?',
      explanation: 'OSHA 1910.95 sets the PEL for noise at 90 dBA as an 8-hour Time-Weighted Average (TWA). The Action Level is 85 dBA.',
      difficulty: 'intermediate',
      points: 10,
      tags: ['noise', 'osha', 'exposure-limits', 'occupational-health'],
      standards: ['OSHA', 'ADNOC', 'ACGIH', 'NIOSH'],
      options: [
        { id: 'a', text: '85 dBA', isCorrect: false },
        { id: 'b', text: '90 dBA', isCorrect: true },
        { id: 'c', text: '85 dBA (Action Level), 90 dBA (PEL)', isCorrect: true },
        { id: 'd', text: '80 dBA', isCorrect: false },
      ],
      correctAnswer: 'c',
    },
    {
      id: 'oh-002',
      type: 'single-choice',
      question: 'What is the ACGIH TLV-TWA for Hydrogen Sulfide (H2S)?',
      explanation: 'ACGIH TLV-TWA for H2S is 1 ppm, with a TLV-STEL of 5 ppm. This is more stringent than OSHA PEL (20 ppm ceiling).',
      difficulty: 'advanced',
      points: 15,
      tags: ['h2s', 'acgih', 'tlv', 'exposure-limits'],
      standards: ['ACGIH', 'OSHA', 'NIOSH', 'ADNOC', 'ADOSH'],
      options: [
        { id: 'a', text: '1 ppm TWA, 5 ppm STEL', isCorrect: true },
        { id: 'b', text: '5 ppm TWA, 10 ppm STEL', isCorrect: false },
        { id: 'c', text: '10 ppm TWA, 15 ppm STEL', isCorrect: false },
        { id: 'd', text: '20 ppm ceiling', isCorrect: false },
      ],
      correctAnswer: 'a',
    },
  ],
};

// ============================================
// SIMULATIONS
// ============================================

export const SIMULATIONS: Record<string, any> = {
  'confined-space-entry': {
    id: 'confined-space-entry',
    title: 'Confined Space Entry Simulation',
    description: 'Practice the complete confined space entry procedure from permit issuance to close-out',
    topicId: 'confined-space',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    steps: [
      {
        id: 'step1',
        title: 'Review Permit',
        description: 'Verify permit is complete, authorized, and matches the space',
        type: 'decision',
        options: [
          { id: 'a', text: 'Permit complete and authorized - proceed', correct: true, feedback: 'Correct: Permit must be complete and authorized before entry' },
          { id: 'b', text: 'Permit missing gas test results - proceed anyway', correct: false, feedback: 'Incorrect: Gas test results required before entry' },
          { id: 'c', text: 'Permit expired - proceed anyway', correct: false, feedback: 'Incorrect: Expired permit invalidates entry authorization' },
        ],
      },
      {
        id: 'step2',
        title: 'Atmospheric Testing',
        description: 'Conduct pre-entry atmospheric tests in correct sequence',
        type: 'sequence',
        correctOrder: ['Oxygen', 'LEL', 'H2S', 'CO'],
        feedback: 'Correct sequence: O2 first (19.5-23.5%), then LEL (<10%), H2S (<10 ppm), CO (<25 ppm)',
      },
      {
        id: 'step3',
        title: 'Equipment Check',
        description: 'Verify all required equipment is available and functional',
        type: 'checklist',
        items: ['SCBA/SABA', 'Escape sets', 'Communication equipment', 'Rescue equipment', 'Lighting', 'PPE'],
      },
      {
        id: 'step4',
        title: 'Entry and Monitoring',
        description: 'Enter space and maintain continuous atmospheric monitoring',
        type: 'decision',
        options: [
          { id: 'a', text: 'Continuous monitoring - correct', correct: true, feedback: 'Correct: Continuous monitoring required for permit spaces' },
          { id: 'b', text: 'Periodic checks every 30 minutes', correct: false, feedback: 'Incorrect: Continuous monitoring required for permit-required confined spaces' },
          { id: 'c', text: 'Test only at entry', correct: false, feedback: 'Incorrect: Continuous monitoring required throughout entry' },
        ],
      },
    ],
    scoring: { passThreshold: 80, maxScore: 100 },
  },

  'hazop-workshop': {
    id: 'hazop-workshop',
    title: 'HAZOP Workshop Facilitation',
    description: 'Practice facilitating a HAZOP study on a simple process node',
    topicId: 'process-safety',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    steps: [
      {
        id: 'step1',
        title: 'Define Node and Parameters',
        description: 'Select a process node and identify operating parameters',
        type: 'input',
        expectedAnswer: 'Node: Reactor feed line. Parameters: Flow, Pressure, Temperature, Level, Composition',
        feedback: 'Correct parameters: Flow, Pressure, Temperature, Level, Composition',
      },
      {
        id: 'step2',
        title: 'Apply Guide Words',
        description: 'Apply HAZOP guide words to each parameter',
        type: 'multiple-choice',
        question: 'For parameter "Flow", which guide word indicates "more than design intent"?',
        options: [
          { id: 'a', text: 'NO', correct: false },
          { id: 'b', text: 'MORE', correct: true },
          { id: 'c', text: 'LESS', correct: false },
          { id: 'd', text: 'REVERSE', correct: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'step3',
        title: 'Identify Causes and Consequences',
        description: 'For deviation "MORE FLOW", identify credible causes and consequences',
        type: 'input',
        expectedCauses: ['Control valve failure open', 'Pump overspeed', 'Bypass valve open', 'Instrument failure'],
        expectedConsequences: ['Overpressure downstream', 'Runaway reaction', 'Relief valve lift', 'Product off-spec'],
        feedback: 'Good causes: valve failure, pump overspeed, bypass open. Consequences: overpressure, runaway reaction, relief lift, off-spec product.',
      },
      {
        id: 'step4',
        title: 'Identify Safeguards and Recommendations',
        description: 'Identify existing safeguards and recommend additional measures',
        type: 'input',
        expectedSafeguards: ['High flow alarm', 'Flow control valve', 'Pressure relief valve', 'High flow trip'],
        expectedRecommendations: ['Add independent high flow trip', 'Install flow restriction orifice', 'Improve operator training'],
        feedback: 'Good safeguards identified. Recommendations should follow hierarchy of controls.',
      },
    ],
    scoring: { passThreshold: 75, maxScore: 100 },
  },

  'loto-procedure': {
    id: 'loto-procedure',
    title: 'LOTO Procedure Execution',
    description: 'Practice the complete LOTO sequence on a virtual pump system',
    topicId: 'lockout-tagout',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    steps: [
      {
        id: 'step1',
        title: 'Notification',
        description: 'Notify all affected employees of LOTO',
        type: 'decision',
        options: [
          { id: 'a', text: 'Notify all affected employees before shutdown', correct: true },
          { id: 'b', text: 'Start shutdown immediately', correct: false },
        ],
      },
      {
        id: 'step2',
        title: 'Shutdown',
        description: 'Shut down equipment using normal stopping procedure',
        type: 'action',
        action: 'Click "Emergency Stop" button',
      },
      {
        id: 'step3',
        title: 'Isolation',
        description: 'Isolate all energy sources',
        type: 'checklist',
        items: ['Electrical - Main breaker', 'Electrical - Control panel', 'Hydraulic - Block valve', 'Pneumatic - Block valve', 'Mechanical - Blind flange'],
      },
      {
        id: 'step4',
        title: 'Lock/Tag Application',
        description: 'Apply personal locks and tags to each isolation point',
        type: 'action',
        action: 'Drag locks to each isolation point',
      },
      {
        id: 'step5',
        title: 'Verification (Zero Energy Check)',
        description: 'Verify zero energy state before work',
        type: 'action',
        action: 'Click "Test Start" - equipment must not start',
      },
    ],
    scoring: { passThreshold: 100, maxScore: 100 },
  },

  'risk-assessment-workshop': {
    id: 'risk-assessment-workshop',
    title: 'Risk Assessment Workshop',
    description: 'Complete a full risk assessment for a flange replacement job',
    topicId: 'risk-assessment',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    steps: [
      {
        id: 'step1',
        title: 'Job Steps Identification',
        description: 'Break down the job into sequential steps',
        type: 'input',
        expectedSteps: ['Isolate and depressurize line', 'Remove bolts and old gasket', 'Clean flange faces', 'Install new gasket', 'Install and torque bolts', 'Pressurize and leak test', 'Remove LOTO and restore'],
      },
      {
        id: 'step2',
        title: 'Hazard Identification per Step',
        description: 'Identify hazards for each step',
        type: 'input',
        expectedHazards: ['Residual pressure', 'Chemical exposure', 'Ergonomic strain', 'Pinch points', 'Falling objects', 'Chemical splash', 'Over-torquing', 'Leak', 'Chemical release'],
      },
      {
        id: 'step3',
        title: 'Risk Rating',
        description: 'Rate each hazard using 5x5 matrix',
        type: 'input',
        expectedRisks: ['High: Chemical exposure', 'High: Pressure release', 'Medium: Ergonomic', 'Medium: Pinch points', 'Low: Housekeeping'],
      },
      {
        id: 'step4',
        title: 'Control Selection',
        description: 'Apply hierarchy of controls',
        type: 'input',
        expectedControls: ['Elimination: N/A', 'Substitution: Use non-hazardous fluid if possible', 'Engineering: Double block & bleed', 'Administrative: JSA, permits', 'PPE: Face shield, chem gloves, coveralls'],
      },
    ],
    scoring: { passThreshold: 75, maxScore: 100 },
  },
};

// ============================================
// PRACTICAL EXERCISES
// ============================================

export const PRACTICAL_EXERCISES = [
  {
    id: 'practical-ra-workshop',
    title: 'Risk Assessment Workshop',
    description: 'Given a scenario (e.g., "Replace a 6-inch flange on a live hydrocarbon line at 50 barg"), perform a complete risk assessment.',
    topicIds: ['risk-assessment', 'permit-to-work', 'lockout-tagout'],
    difficulty: 'advanced',
    estimatedMinutes: 45,
    tasks: [
      'Identify all hazards (pressure, hydrocarbon, fire, toxic, ergonomic, etc.)',
      'Apply Hierarchy of Controls',
      'Determine risk level (Risk Matrix)',
      'Specify controls (Engineering, Administrative, PPE)',
      'Identify required permits (PTW, LOTO, Confined Space, Gas Test)',
      'Define emergency procedures',
      'Present to panel',
    ],
    evaluationCriteria: [
      'Hazard identification completeness',
      'Correct risk ranking',
      'Appropriate controls (hierarchy)',
      'Permit requirements accuracy',
      'Emergency preparedness',
      'Communication clarity',
    ],
    frameworks: ['ADNOC', 'ADOSH', 'ISO45001', 'OSHA', 'ARAMCO', 'API', 'IOGP'],
  },
  {
    id: 'practical-jsa',
    title: 'JSA (Job Safety Analysis) Development',
    description: 'Develop a JSA for "Confined space entry into a crude oil storage tank for inspection".',
    topicIds: ['confined-space', 'permit-to-work', 'h2s-management', 'lockout-tagout', 'gas-testing'],
    difficulty: 'advanced',
    estimatedMinutes: 40,
    tasks: [
      'Break job into steps',
      'Identify hazards per step',
      'Assess risk per step',
      'Specify controls per step',
      'Define responsible person per step',
      'Include permits: Confined Space, Gas Test, LOTO, Hot Work (if cutting)',
      'Define rescue plan',
    ],
    evaluationCriteria: [
      'Step completeness',
      'Hazard identification per step',
      'Control appropriateness',
      'Permit requirements',
      'Rescue plan viability',
      'Regulatory compliance',
    ],
    frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'API', 'ANSI', 'ANSI'],
  },
  {
    id: 'practical-site-inspection',
    title: 'Site Inspection & Hazard Identification',
    description: 'Review photos/videos of a worksite (scaffolding, welding, excavation, chemical storage) and identify violations.',
    topicIds: ['scaffolding', 'fall-protection', 'excavation', 'welding-cutting', 'chemical-safety', 'fire-safety'],
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tasks: [
      'Identify 10+ hazards/violations',
      'Reference ADNOC Golden Rules',
      'Reference ADNOC HSE Standards',
      'Prioritize by risk (Immediate, High, Medium, Low)',
      'Recommend corrective actions',
      'Draft inspection report',
    ],
    evaluationCriteria: [
      'Number and accuracy of findings',
      'Correct standard references',
      'Risk prioritization accuracy',
      'Action practicality',
      'Report quality',
    ],
    frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ANSI', 'NFPA'],
  },
  {
    id: 'practical-incident-investigation',
    title: 'Incident Investigation Role Play',
    description: 'Investigate a near-miss: "Worker fell 2m from unguarded platform edge during maintenance. Harness worn but not tied off."',
    topicIds: ['incident-investigation', 'fall-protection', 'root-cause-analysis'],
    difficulty: 'advanced',
    estimatedMinutes: 45,
    tasks: [
      'Secure scene & preserve evidence',
      'Interview witnesses (role play)',
      'Apply 5 Whys / Fishbone / ICAM',
      'Identify immediate, underlying, root causes',
      'Develop corrective actions (SMART)',
      'Present investigation report',
    ],
    evaluationCriteria: [
      'Investigation methodology',
      'Root cause depth',
      'Action SMARTness',
      'Systemic vs individual focus',
      'Communication skill',
    ],
    frameworks: ['ADNOC', 'ADOSH', 'OSHA', 'ICAM', 'Tripod Beta', 'TapRooT'],
  },
  {
    id: 'practical-hazop',
    title: 'HAZOP Facilitation Exercise',
    description: 'Facilitate a mini-HAZOP on "Pump discharge line to reactor" with parameters: Flow, Pressure, Temperature.',
    topicIds: ['process-safety', 'hazop', 'lopa', 'risk-assessment'],
    difficulty: 'expert',
    estimatedMinutes: 60,
    tasks: [
      'Define node and parameters',
      'Apply guide words (NO, MORE, LESS, REVERSE, AS WELL AS, PART OF)',
      'Identify causes and consequences for each deviation',
      'Evaluate existing safeguards',
      'Determine if risk is ALARP',
      'Recommend additional safeguards',
      'Document HAZOP worksheet',
    ],
    evaluationCriteria: [
      'Node definition accuracy',
      'Guide word application completeness',
      'Cause/consequence credibility',
      'Safeguard evaluation depth',
      'Recommendation quality (hierarchy of controls)',
      'Documentation quality',
    ],
    frameworks: ['ADNOC', 'API', 'CCPS', 'IEC', 'IOGP', 'CCPS'],
  },
  {
    id: 'practical-loto',
    title: 'LOTO Procedure Development',
    description: 'Develop a machine-specific LOTO procedure for "Centrifugal Pump P-101" with electrical, hydraulic, and process energy sources.',
    topicIds: ['lockout-tagout', 'permit-to-work', 'permit-to-work', 'mechanical-integrity'],
    difficulty: 'advanced',
    estimatedMinutes: 40,
    tasks: [
      'Identify all energy sources (electrical, hydraulic, process, kinetic)',
      'Locate isolation points (breakers, valves, blinds)',
      'Determine lock/tag requirements per isolation point',
      'Write step-by-step LOTO procedure',
      'Define verification (zero energy check) steps',
      'Define lock removal and restart procedure',
      'Include group LOTO and shift change procedures',
    ],
    evaluationCriteria: [
      'Energy source completeness',
      'Isolation point accuracy',
      'Procedure clarity and sequence',
      'Verification method adequacy',
      'Group/shift change handling',
      'Regulatory compliance (OSHA 1910.147, ADNOC)',
    ],
    frameworks: ['ADNOC', 'OSHA', 'ANSI', 'ADOSH', 'ARAMCO'],
  },
  {
    id: 'practical-emergency-drill',
    title: 'Emergency Response Drill Design',
    description: 'Design a tabletop exercise for "H2S Release at Well Site" including ICS organization, communication, evacuation, and regulatory notification.',
    topicIds: ['emergency-response', 'h2s-management', 'incident-command-system', 'crisis-management'],
    difficulty: 'advanced',
    estimatedMinutes: 60,
    tasks: [
      'Define scenario (H2S release at 50 ppm, 2 workers down)',
      'Define ICS organization (IC, Operations, Planning, Logistics, Safety, Liaison)',
      'Define communication plan (internal, external, regulatory)',
      'Define evacuation routes and muster points',
      'Define medical response and decontamination',
      'Define regulatory notification timeline (ADNOC, ADOSH, NCEMA, EAD)',
      'Define termination and recovery criteria',
      'Prepare exercise injects (3-5)',
      'Prepare debrief structure',
    ],
    evaluationCriteria: [
      'Scenario realism',
      'ICS structure correctness',
      'Communication plan completeness',
      'Regulatory notification accuracy',
      'Inject quality',
      'Debrief structure',
    ],
    frameworks: ['ADNOC', 'ADOSH', 'NCEMA', 'IPIECA', 'ISO22301', 'ICS'],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getQuestionsByTopic(topicId: string): QuizQuestion[] {
  return ASSESSMENT_QUESTIONS[topicId] || [];
}

export function getSimulationById(simulationId: string) {
  return SIMULATIONS[simulationId];
}

export function getSimulationsByTopic(topicId: string) {
  return Object.values(SIMULATIONS).filter(s => s.topicId === topicId);
}

export function getPracticalExercisesByTopic(topicId: string) {
  return PRACTICAL_EXERCISES.filter(e => e.topicIds.includes(topicId));
}

export function getQuestionsByFramework(framework: string) {
  const questions: QuizQuestion[] = [];
  Object.values(ASSESSMENT_QUESTIONS).forEach(qs => {
    qs.forEach(q => {
      if (q.standards.includes(framework as any)) {
        questions.push(q);
      }
    });
    return questions;
  }
}

export function getQuestionsByDifficulty(difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert') {
  const questions: QuizQuestion[] = [];
  Object.values(ASSESSMENT_QUESTIONS).forEach(qs => {
    qs.forEach(q => {
      if (q.difficulty === difficulty) {
        questions.push(q);
      }
    });
    return questions;
  }
}

export function getTotalQuestionCount(): number {
  let count = 0;
  Object.values(ASSESSMENT_QUESTIONS).forEach(qs => { count += qs.length; });
  return count;
}

export function getTotalSimulationCount(): number {
  return Object.keys(SIMULATIONS).length;
}

export function getTotalPracticalExerciseCount(): number {
  return PRACTICAL_EXERCISES.length;
}