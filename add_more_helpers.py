with open('src/data/modules.ts', 'r') as f:
    content = f.read()

# Add more helper functions
more_helpers = '''

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

'''

# Insert before LEARNING_PATHS
content = content.replace('// ============================================\n// LEARNING PATHS', more_helpers + '\n// ============================================\n// LEARNING PATHS')

with open('src/data/modules.ts', 'w') as f:
    f.write(content)

print('Added more helper functions')