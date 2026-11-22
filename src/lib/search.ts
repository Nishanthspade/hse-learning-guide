/**
 * HSE Learning Guide - Search Engine
 * Full-text search across topics, glossary, frameworks, and content
 */

import { UNIFIED_TOPICS, STANDARD_FRAMEWORKS, UNIFIED_LEARNING_PATHS, UNIFIED_MODULES } from '../data/unified-standards';
import { getADNOCGlossary, ADNOC_GLOSSARY } from '../data/adnoc-content';
import { getADNOCModules, ADNOC_MODULES } from '../data/adnoc-content';
import { buildGlossary, STANDARD_FRAMEWORKS } from '../data/unified-standards';

// Search index interface
export interface SearchResult {
  id: string;
  type: 'topic' | 'framework' | 'path' | 'glossary' | 'module' | 'question' | 'caseStudy' | 'procedure';
  title: string;
  description: string;
  category: string;
  frameworks: string[];
  tags: string[];
  url: string;
  score: number;
  highlights: string[];
  metadata: {
    difficulty?: string;
    estimatedHours?: number;
    certifications?: string[];
    difficulty?: string;
    moduleId?: string;
    pathId?: string;
    questionId?: string;
  };
}

export interface SearchFilters {
  categories?: string[];
  frameworks?: string[];
  difficulties?: string[];
  types?: string[];
  tags?: string[];
  dateRange?: { start: Date; end: Date };
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  fuzzy?: boolean;
  highlight?: boolean;
}

// Search result with highlighting
export interface HighlightedResult extends SearchResult {
  highlightedTitle: string;
  highlightedDescription: string;
  matchedTerms: string[];
}

/**
 * Main search function - searches across all content types
 */
export function search(options: SearchOptions): SearchResult[] {
  const { query, filters, limit = 20, offset = 0, fuzzy = true, highlight = true } = options;
  
  if (!query || !query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const terms = normalizedQuery.split(/\s+/).filter(t => t.length > 1);
  
  if (terms.length === 0) return [];

  const allResults: SearchResult[] = [];

  // Search topics
  if (!filters?.types || filters.types.includes('topic')) {
    allResults.push(...searchTopics(terms, filters, highlight));
  }

  // Search frameworks
  if (!filters?.types || filters.types.includes('framework')) {
    allResults.push(...searchFrameworks(terms, filters, highlight));
  }

  // Search learning paths
  if (!filters?.types || filters.types.includes('path')) {
    allResults.push(...searchPaths(terms, filters, highlight));
  }

  // Search glossary
  if (!filters?.types || filters.types.includes('glossary')) {
    allResults.push(...searchGlossary(terms, filters, highlight));
  }

  // Search modules
  if (!filters?.types || filters.types.includes('module')) {
    allResults.push(...searchModules(terms, filters, highlight));
  }

  // Search assessment questions
  if (!filters?.types || filters.types.includes('question')) {
    allResults.push(...searchQuestions(terms, filters, highlight));
  }

  // Search case studies
  if (!filters?.types || filters.types.includes('caseStudy')) {
    allResults.push(...searchCaseStudies(terms, filters, highlight));
  }

  // Search procedures
  if (!filters?.types || filters.types.includes('procedure')) {
    allResults.push(...searchProcedures(terms, filters, highlight));
  }

  // Filter by frameworks
  if (filters?.frameworks?.length) {
    allResults.filter(r => 
      filters.frameworks!.some(f => r.frameworks.includes(f))
    );
  }

  // Filter by categories
  if (filters?.categories?.length) {
    allResults.filter(r => 
      filters.categories!.some(c => r.category === c)
    );
  }

  // Filter by difficulties
  if (filters?.difficulties?.length) {
    allResults.filter(r => 
      filters.difficulties!.includes(r.metadata.difficulty || '')
    );
  }

  // Filter by tags
  if (filters?.tags?.length) {
    allResults.filter(r => 
      filters.tags!.some(t => r.tags.includes(t))
    );
  }

  // Sort by relevance score (descending)
  allResults.sort((a, b) => b.score - a.score);

  // Apply pagination
  return allResults.slice(offset, offset + limit);
}

/**
 * Search topics
 */
function searchTopics(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];

  for (const topic of UNIFIED_TOPICS) {
    let score = 0;
    const highlights: string[] = [];

    // Title matching (highest weight)
    const titleScore = calculateMatchScore(terms, topic.topicName.toLowerCase());
    if (titleScore > 0) {
      score += titleScore * 10;
      if (highlight) highlights.push(...extractHighlights(terms, topic.topicName));
    }

    // Description matching
    const descScore = calculateMatchScore(terms, topic.description.toLowerCase());
    if (descScore > 0) {
      score += descScore * 5;
      if (highlight) highlights.push(...extractHighlights(terms, topic.description));
    }

    // Tags matching
    for (const tag of topic.tags) {
      const tagScore = calculateMatchScore(terms, tag.toLowerCase());
      if (tagScore > 0) {
        score += tagScore * 3;
        if (highlight) highlights.push(...extractHighlights(terms, tag));
      }
    }

    // Category matching
    const catScore = calculateMatchScore(terms, topic.category.toLowerCase());
    if (catScore > 0) {
      score += catScore * 2;
    }

    // Frameworks matching
    for (const fw of Object.keys(topic.frameworks)) {
      const fwScore = calculateMatchScore(terms, fw.toLowerCase());
      if (fwScore > 0) {
        score += fwScore * 2;
        if (highlight) highlights.push(...extractHighlights(terms, fw));
      }
    }

    // Prerequisites matching
    for (const prereq of topic.prerequisites) {
      const prereqScore = calculateMatchScore(terms, prereq.toLowerCase());
      if (prereqScore > 0) {
        score += prereqScore * 1;
      }
    }

    if (score > 0) {
      results.push({
        id: topic.id,
        type: 'topic',
        title: topic.topicName,
        description: topic.description,
        category: topic.category,
        frameworks: Object.keys(topic.frameworks),
        tags: topic.tags,
        url: `/topics/${topic.topicId}`,
        score,
        highlights,
        metadata: {
          difficulty: topic.difficulty,
          estimatedHours: topic.estimatedHours,
          moduleId: topic.id,
        },
      });
    }
  }

  return results;
}

/**
 * Search frameworks
 */
function searchFrameworks(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];

  for (const fw of STANDARD_FRAMEWORKS) {
    let score = 0;
    const highlights: string[] = [];

    // Name matching
    const nameScore = calculateMatchScore(terms, fw.name.toLowerCase());
    if (nameScore > 0) {
      score += nameScore * 10;
      if (highlight) highlights.push(...extractHighlights(terms, fw.name));
    }

    // Full name matching
    const fullNameScore = calculateMatchScore(terms, fw.fullName.toLowerCase());
    if (fullNameScore > 0) {
      score += fullNameScore * 8;
      if (highlight) highlights.push(...extractHighlights(terms, fw.fullName));
    }

    // Description matching
    const descScore = calculateMatchScore(terms, fw.description.toLowerCase());
    if (descScore > 0) {
      score += descScore * 5;
      if (highlight) highlights.push(...extractHighlights(terms, fw.description));
    }

    // Key documents matching
    for (const doc of fw.keyDocuments) {
      const docScore = calculateMatchScore(terms, doc.code.toLowerCase());
      if (docScore > 0) {
        score += docScore * 3;
        if (highlight) highlights.push(...extractHighlights(terms, doc.code));
      }
    }

    // Category matching
    const catScore = calculateMatchScore(terms, fw.category.toLowerCase());
    if (catScore > 0) {
      score += catScore * 2;
    }

    if (score > 0) {
      results.push({
        id: fw.id,
        type: 'framework',
        title: fw.name,
        description: fw.description,
        category: fw.category,
        frameworks: [fw.id],
        tags: [fw.category, ...fw.keyDocuments.map(d => d.code)],
        url: `/frameworks/${fw.id}`,
        score,
        highlights,
        metadata: {
          region: fw.region,
          industry: fw.industry,
          version: fw.version,
          certification: fw.certification,
        },
      });
    }
  }

  return results;
}

/**
 * Search learning paths
 */
function searchPaths(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];

  for (const path of UNIFIED_LEARNING_PATHS) {
    let score = 0;
    const highlights: string[] = [];

    // Title matching
    const titleScore = calculateMatchScore(terms, path.title.toLowerCase());
    if (titleScore > 0) {
      score += titleScore * 10;
      if (highlight) highlights.push(...extractHighlights(terms, path.title));
    }

    // Description matching
    const descScore = calculateMatchScore(terms, path.description.toLowerCase());
    if (descScore > 0) {
      score += descScore * 5;
      if (highlight) highlights.push(...extractHighlights(terms, path.description));
    }

    // Target role/level matching
    const roleScore = calculateMatchScore(terms, path.targetLevel.toLowerCase());
    if (roleScore > 0) {
      score += roleScore * 3;
    }

    const roleScore2 = calculateMatchScore(terms, (path.targetRole || '').toLowerCase());
    if (roleScore2 > 0) {
      score += roleScore2 * 3;
    }

    // Target role matching
    const roleScore3 = calculateMatchScore(terms, (path.targetRole || '').toLowerCase());
    if (roleScore3 > 0) {
      score += roleScore3 * 3;
    }

    // Modules matching
    for (const module of path.modules) {
      const moduleTopic = getTopicById(module.moduleId);
      if (moduleTopic) {
        const modScore = calculateMatchScore(terms, moduleTopic.topicName.toLowerCase());
        if (modScore > 0) {
          score += modScore * 2;
        }
      }
    }

    // Prerequisites matching
    for (const prereq of path.prerequisites) {
      const prereqScore = calculateMatchScore(terms, prereq.toLowerCase());
      if (prereqScore > 0) {
        score += prereqScore * 2;
      }
    }

    if (score > 0) {
      results.push({
        id: path.id,
        type: 'path',
        title: path.title,
        description: path.description,
        category: 'Learning Path',
        frameworks: path.modules.flatMap(m => {
          const t = getTopicById(m.moduleId);
          return t ? Object.keys(t.frameworks) : [];
        }),
        tags: [path.targetLevel, path.targetRole || ''],
        url: `/paths/${path.id}`,
        score,
        highlights,
        metadata: {
          targetLevel: path.targetLevel,
          targetRole: path.targetRole,
          estimatedHours: path.estimatedHours,
          certificationEligible: path.certificationEligible,
          pathId: path.id,
        },
      });
    }
  }

  return results;
}

/**
 * Search glossary
 */
function searchGlossary(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const glossary = buildGlossary();
  const results: SearchResult[] = [];

  for (const term of glossary) {
    let score = 0;
    const highlights: string[] = [];

    // Term matching (highest weight)
    const termScore = calculateMatchScore(terms, term.term.toLowerCase());
    if (termScore > 0) {
      score += termScore * 15;
      if (highlight) highlights.push(...extractHighlights(terms, term.term));
    }

    // Definition matching
    const defScore = calculateMatchScore(terms, term.definition.toLowerCase());
    if (defScore > 0) {
      score += defScore * 8;
      if (highlight) highlights.push(...extractHighlights(terms, term.definition));
    }

    // Synonyms matching
    for (const syn of term.synonyms) {
      const synScore = calculateMatchScore(terms, syn.toLowerCase());
      if (synScore > 0) {
        score += synScore * 5;
        if (highlight) highlights.push(...extractHighlights(terms, syn));
      }
    }

    // Related terms matching
    for (const rt of term.relatedTerms) {
      const rtScore = calculateMatchScore(terms, rt.toLowerCase());
      if (rtScore > 0) {
        score += rtScore * 3;
        if (highlight) highlights.push(...extractHighlights(terms, rt));
      }
    }

    // Frameworks matching
    for (const fw of term.frameworks) {
      const fwScore = calculateMatchScore(terms, fw.toLowerCase());
      if (fwScore > 0) {
        score += fwScore * 2;
      }
    }

    // Category matching
    const catScore = calculateMatchScore(terms, term.category.toLowerCase());
    if (catScore > 0) {
      score += catScore * 2;
    }

    if (score > 0) {
      results.push({
        id: term.term.toLowerCase().replace(/\s+/g, '-'),
        type: 'glossary',
        title: term.term,
        definition: term.definition,
        category: term.category,
        frameworks: term.frameworks,
        tags: [term.category, ...term.synonyms],
        url: `/glossary/${term.term.toLowerCase().replace(/\s+/g, '-')}`,
        score,
        highlights,
        metadata: {
          category: term.category,
          synonyms: term.synonyms,
          relatedTerms: term.relatedTerms,
        },
      });
    }
  }

  return results;
}

/**
 * Search modules
 */
function searchModules(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];

  for (const topic of UNIFIED_TOPICS) {
    for (const lesson of topic.lessons) {
      let score = 0;
      const highlights: string[] = [];

      // Title matching
      const titleScore = calculateMatchScore(terms, lesson.title.toLowerCase());
      if (titleScore > 0) {
        score += titleScore * 10;
        if (highlight) highlights.push(...extractHighlights(terms, lesson.title));
      }

      // Description matching
      const descScore = calculateMatchScore(terms, lesson.description.toLowerCase());
      if (descScore > 0) {
        score += descScore * 5;
        if (highlight) highlights.push(...extractHighlights(terms, lesson.description));
      }

      // Learning objectives matching
      for (const obj of lesson.learningObjectives) {
        const objScore = calculateMatchScore(terms, obj.toLowerCase());
        if (objScore > 0) {
          score += objScore * 3;
          if (highlight) highlights.push(...extractHighlights(terms, obj));
        }
      }

      // Key points matching
      for (const kp of lesson.keyPoints) {
        const kpScore = calculateMatchScore(terms, kp.toLowerCase());
        if (kpScore > 0) {
          score += kpScore * 3;
          if (highlight) highlights.push(...extractHighlights(terms, kp));
        }
      }

      // Keywords/tags matching
      for (const tag of lesson.tags) {
        const tagScore = calculateMatchScore(terms, tag.toLowerCase());
        if (tagScore > 0) {
          score += tagScore * 2;
        }
      }

      if (score > 0) {
        results.push({
          id: `${topic.id}-${lesson.id}`,
          type: 'module',
          title: lesson.title,
          description: lesson.description,
          category: topic.category,
          frameworks: Object.keys(topic.frameworks),
          tags: [...lesson.tags, ...lesson.learningObjectives.slice(0, 3)],
          url: `/topics/${topic.id}/lessons/${lesson.id}`,
          score,
          highlights,
          metadata: {
            difficulty: lesson.difficulty,
            estimatedHours: lesson.estimatedMinutes / 60,
            moduleId: topic.id,
            lessonId: lesson.id,
            contentType: lesson.contentType,
          },
        });
      }
    }
  }

  return results;
}

/**
 * Search assessment questions
 */
function searchQuestions(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];
  
  // Import assessment questions
  const { ASSESSMENT_QUESTIONS } = require('../data/assessments');
  
  for (const [topicId, questions] of Object.entries(ASSESSMENT_QUESTIONS)) {
    for (const question of questions as any[]) {
      let score = 0;
      const highlights: string[] = [];

      // Question text matching
      const qScore = calculateMatchScore(terms, question.question.toLowerCase());
      if (qScore > 0) {
        score += qScore * 10;
        if (highlight) highlights.push(...extractHighlights(terms, question.question));
      }

      // Explanation matching
      const expScore = calculateMatchScore(terms, question.explanation.toLowerCase());
      if (expScore > 0) {
        score += expScore * 5;
        if (highlight) highlights.push(...extractHighlights(terms, question.explanation));
      }

      // Options matching
      if (question.options) {
        for (const opt of question.options) {
          const optScore = calculateMatchScore(terms, opt.text.toLowerCase());
          if (optScore > 0) {
            score += optScore * 3;
            if (highlight) highlights.push(...extractHighlights(terms, opt.text));
          }
        }

        // Type matching
        const typeScore = calculateMatchScore(terms, question.type.toLowerCase());
        if (typeScore > 0) {
          score += typeScore * 2;
        }

        if (score > 0) {
          results.push({
            id: `${topicId}-${question.id}`,
            type: 'question',
            title: question.question,
            description: question.explanation,
            category: 'Assessment',
            frameworks: [], // Would need to map from topic
            tags: [question.type, question.difficulty || ''],
            url: `/assessments/quiz/${topicId}-${question.id}`,
            score,
            highlights,
            metadata: {
              difficulty: question.difficulty,
              questionType: question.type,
              questionId: question.id,
              moduleId: topicId,
            },
          });
        }
      }
    }
  }

  return results;
}

/**
 * Search case studies
 */
function searchCaseStudies(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];
  
  // Import case studies
  const { ADNOC_INTERVIEW_QUESTIONS } = require('../data/adnoc-content');
  const caseStudies = ADNOC_INTERVIEW_QUESTIONS.caseStudies || [];
  
  for (const cs of caseStudies) {
    let score = 0;
    const highlights: string[] = [];

    // Title matching
    const titleScore = calculateMatchScore(terms, cs.title.toLowerCase());
    if (titleScore > 0) {
      score += titleScore * 10;
      if (highlight) highlights.push(...extractHighlights(terms, cs.title));
    }

    // Scenario matching
    const scenarioScore = calculateMatchScore(terms, cs.scenario.toLowerCase());
    if (scenarioScore > 0) {
      score += scenarioScore * 8;
      if (highlight) highlights.push(...extractHighlights(terms, cs.scenario));
    }

    // Questions matching
    for (const q of cs.questions) {
      const qScore = calculateMatchScore(terms, q.toLowerCase());
      if (qScore > 0) {
        score += qScore * 5;
        if (highlight) highlights.push(...extractHighlights(terms, q));
      }
    }

    // Answers matching
    for (const ans of cs.expectedAnswers) {
      const ansScore = calculateMatchScore(terms, ans.toLowerCase());
      if (ansScore > 0) {
        score += ansScore * 5;
        if (highlight) highlights.push(...extractHighlights(terms, ans));
      }
    }

    // Industry matching
    const indScore = calculateMatchScore(terms, cs.industry.toLowerCase());
    if (indScore > 0) {
      score += indScore * 3;
    }

    // Severity matching
    const sevScore = calculateMatchScore(terms, cs.severity.toLowerCase());
    if (sevScore > 0) {
      score += sevScore * 2;
    }

    // Tags matching
    for (const tag of cs.tags) {
      const tagScore = calculateMatchScore(terms, tag.toLowerCase());
      if (tagScore > 0) {
        score += tagScore * 2;
        if (highlight) highlights.push(...extractHighlights(terms, tag));
      }
    }

    if (score > 0) {
      results.push({
        id: cs.id,
        type: 'caseStudy',
        title: cs.title,
        description: cs.scenario,
        category: cs.industry,
        frameworks: cs.frameworks,
        tags: cs.tags,
        url: `/case-studies/${cs.id}`,
        score,
        highlights,
        metadata: {
          severity: cs.severity,
          date: cs.date,
          location: cs.location,
          caseStudyId: cs.id,
        },
      });
    }
  }

  return results;
}

/**
 * Search procedures
 */
function searchProcedures(terms: string[], filters: SearchFilters | undefined, highlight: boolean): SearchResult[] {
  const results: SearchResult[] = [];
  
  // Import procedures from Procedures page
  const { allProcedures } = require('../pages/Procedures');
  
  for (const proc of allProcedures) {
    let score = 0;
    const highlights: string[] = [];

    // Title matching
    const titleScore = calculateMatchScore(terms, proc.title.toLowerCase());
    if (titleScore > 0) {
      score += titleScore * 10;
      if (highlight) highlights.push(...extractHighlights(terms, proc.title));
    }

    // Description matching
    const descScore = calculateMatchScore(terms, proc.description.toLowerCase());
    if (descScore > 0) {
      score += descScore * 5;
      if (highlight) highlights.push(...extractHighlights(terms, proc.description));
    }

    // Tags matching
    for (const tag of proc.tags) {
      const tagScore = calculateMatchScore(terms, tag.toLowerCase());
      if (tagScore > 0) {
        score += tagScore * 3;
        if (highlight) highlights.push(...extractHighlights(terms, tag));
      }
    }

    // Category matching
    const catScore = calculateMatchScore(terms, proc.category.toLowerCase());
    if (catScore > 0) {
      score += catScore * 2;
    }

    // Frameworks matching
    for (const fw of proc.frameworks) {
      const fwScore = calculateMatchScore(terms, fw.toLowerCase());
      if (fwScore > 0) {
        score += fwScore * 2;
      }
    }

    // Tags matching
    for (const tag of proc.tags) {
      const tagScore = calculateMatchScore(terms, tag.toLowerCase());
      if (tagScore > 0) {
        score += tagScore * 2;
        if (highlight) highlights.push(...extractHighlights(terms, tag));
      }
    }

    if (score > 0) {
      results.push({
        id: proc.id,
        type: 'procedure',
        title: proc.title,
        description: proc.description,
        category: proc.category,
        frameworks: proc.frameworks,
        tags: proc.tags,
        url: `/procedures/${proc.id}`,
        score,
        highlights,
        metadata: {
          version: proc.version,
          lastReviewed: proc.lastReviewed,
          nextReview: proc.nextReview,
          owner: proc.owner,
          status: proc.status,
          steps: proc.steps,
          estimatedMinutes: proc.estimatedMinutes,
          procedureId: proc.id,
        },
      });
    }
  }

  return results;
}

/**
 * Calculate match score between terms and text
 */
function calculateMatchScore(terms: string[], text: string): number {
  let score = 0;
  
  for (const term of terms) {
    if (term.length < 2) continue;
    
    // Exact phrase match (highest weight)
    if (text.includes(term)) {
      score += 10;
    }
    
    // Word boundary match
    const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i');
    if (regex.test(text)) {
      score += 5;
    }
    
    // Fuzzy match (substring)
    if (text.includes(term)) {
      score += 2;
    }
    
    // Fuzzy match with Levenshtein distance for longer terms
    if (term.length > 4) {
      const words = text.split(/\s+/);
      for (const word of words) {
        if (word.length >= term.length - 2 && word.length <= term.length + 2) {
          const distance = levenshteinDistance(term, word.toLowerCase());
          if (distance <= 2) {
            score += Math.max(0, 3 - distance);
          }
        }
      }
    }
  }
  
  return score;
}

/**
 * Extract highlighted terms from text
 */
function extractHighlights(terms: string[], text: string): string[] {
  const highlights: string[] = [];
  
  for (const term of terms) {
    if (term.length < 2) continue;
    
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      highlights.push(...matches);
    }
  }
  
  return [...new Set(highlights)]; // Deduplicate
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
  
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,     // deletion
        matrix[j][i - 1] + 1,     // insertion
        matrix[j - 1][i - 1] + cost  // substitution
      );
    }
  }
  
  return matrix[b.length][a.length];
}

/**
 * Get topic by ID
 */
function getTopicById(topicId: string): any {
  return UNIFIED_TOPICS.find(t => t.id === topicId);
}

/**
 * Search suggestions/autocomplete
 */
export function getSearchSuggestions(query: string, limit: number = 10): string[] {
  if (!query || query.length < 2) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  // Add topic titles
  for (const topic of UNIFIED_TOPICS) {
    if (topic.topicName.toLowerCase().includes(queryLower)) {
      suggestions.add(topic.topicName);
    }
    for (const tag of topic.tags) {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag);
      }
    }
  }
  
  // Add framework names
  for (const fw of STANDARD_FRAMEWORKS) {
    if (fw.name.toLowerCase().includes(queryLower)) {
      suggestions.add(fw.name);
    }
  }
  
  // Add learning path titles
  for (const path of UNIFIED_LEARNING_PATHS) {
    if (path.title.toLowerCase().includes(queryLower)) {
      suggestions.add(path.title);
    }
  }
  
  // Add glossary terms
  const glossary = buildGlossary();
  for (const term of glossary) {
    if (term.term.toLowerCase().includes(queryLower)) {
      suggestions.add(term.term);
    }
  }
  
  // Add framework names
  for (const fw of STANDARD_FRAMEWORKS) {
    if (fw.name.toLowerCase().includes(queryLower)) {
      suggestions.add(fw.name);
    }
  }
  
  return Array.from(suggestions).slice(0, limit);
}

/**
 * Advanced search with boolean operators
 */
export function advancedSearch(query: string, options: SearchOptions = {}): SearchResult[] {
  // Parse boolean operators (AND, OR, NOT)
  const parsed = parseBooleanQuery(query);
  // For now, fall back to basic search
  return search({ ...options, query: parsed.cleanQuery });
}

function parseBooleanQuery(query: string): { cleanQuery: string; operator: 'AND' | 'OR' | 'NOT' } {
  // Simple boolean parser - would be expanded in production
  return { cleanQuery: query, operator: 'AND' };
}

/**
 * Search index builder - for building search index offline
 */
export function buildSearchIndex(): any {
  const index = {
    topics: {},
    frameworks: {},
    paths: {},
    glossary: {},
    modules: {},
    questions: {},
    caseStudies: {},
    procedures: {},
  };
  
  // Index topics
  for (const topic of UNIFIED_TOPICS) {
    index.topics[topic.id] = {
      title: topic.topicName,
      description: topic.description,
      tags: topic.tags,
      category: topic.category,
      frameworks: Object.keys(topic.frameworks),
      prerequisites: topic.prerequisites,
    };
  }
  
  // Index frameworks
  for (const fw of STANDARD_FRAMEWORKS) {
    index.frameworks[fw.id] = {
      name: fw.name,
      fullName: fw.fullName,
      description: fw.description,
      category: fw.category,
      keyDocuments: fw.keyDocuments.map(d => d.code),
      standards: fw.keyDocuments.map(d => d.standardCode),
    };
  }
  
  // Index learning paths
  for (const path of UNIFIED_LEARNING_PATHS) {
    index.paths[path.id] = {
      title: path.title,
      description: path.description,
      targetLevel: path.targetLevel,
      targetRole: path.targetRole,
      estimatedHours: path.estimatedHours,
      modules: path.modules.map(m => m.moduleId),
      prerequisites: path.prerequisites,
      certificationEligible: path.certificationEligible,
    };
  }
  
  // Index glossary
  const glossary = buildGlossary();
  for (const term of glossary) {
    index.glossary[term.term] = {
      definition: term.definition,
      category: term.category,
      frameworks: term.frameworks,
      synonyms: term.synonyms,
      relatedTerms: term.relatedTerms,
    };
  }
  
  // Index modules (lessons)
  for (const topic of UNIFIED_TOPICS) {
    for (const lesson of topic.lessons) {
      index.modules[`${topic.id}-${lesson.id}`] = {
        title: lesson.title,
        description: lesson.description,
        topicId: topic.id,
        difficulty: lesson.difficulty,
        estimatedMinutes: lesson.estimatedMinutes,
        contentType: lesson.contentType,
        learningObjectives: lesson.learningObjectives,
        keyPoints: lesson.keyPoints,
        tags: lesson.tags,
      };
    }
  }
  
  return index;
}

export { buildGlossary, STANDARD_FRAMEWORKS, UNIFIED_TOPICS, UNIFIED_LEARNING_PATHS, UNIFIED_LEARNING_PATHS as LEARNING_PATHS };