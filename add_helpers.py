with open('src/data/modules.ts', 'r') as f:
    content = f.read()

# Add helper functions before the LEARNING_PATHS export
helpers = '''

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

'''

# Insert helpers before the LEARNING_PATHS section
content = content.replace('// ============================================\n// LEARNING PATHS', helpers + '\n// ============================================\n// LEARNING PATHS')

with open('src/data/modules.ts', 'w') as f:
    f.write(content)

print('Added helper functions')