/**
 * HSE Learning Guide - Category Utilities
 * Shared functions for category formatting and icons
 */

export function formatCategory(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'fall-protection': '🛡️',
    'confined-space': '📦',
    'fire-safety': '🔥',
    'chemical-safety': '⚗️',
    'electrical-safety': '⚡',
    'lockout-tagout': '🔒',
    'machine-guarding': '⚙️',
    'ppe': '🪖',
    'respiratory-protection': '🫁',
    'hazard-communication': '🏷️',
    'scaffolding': '🏗️',
    'excavation': '🕳️',
    'crane-rigging': '🏗️',
    'welding-cutting': '🔥',
    'ergonomics': '🧍',
    'hearing-conservation': '👂',
    'heat-cold-stress': '🌡️',
    'bloodborne-pathogens': '🩸',
    'emergency-response': '🚨',
    'incident-investigation': '🔍',
    'risk-assessment': '📋',
    'safety-management-systems': '📋',
    'regulatory-compliance': '⚖️',
    'environmental-protection': '🌿',
    'industrial-hygiene': '🔬',
    'behavioral-safety': '🧠',
    'process-safety': '🏭',
    'construction-safety': '🏗️',
    'oil-gas-safety': '🛢️',
    'transportation-safety': '🚛',
    'hse-fundamentals': '📚',
  };
  return icons[category] || '📖';
}