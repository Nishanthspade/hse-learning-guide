#!/usr/bin/env node

/**
 * HSE Learning Guide - Sitemap Generator
 * Generates sitemap.xml, sitemap-index.xml, and robots.txt
 */

import { writeFileSync } from 'fs';
import { UNIFIED_TOPICS, UNIFIED_LEARNING_PATHS } from '../src/data/unified-standards';
import { ADNOC_MODULES, LEARNING_PATHS as ADNOC_LEARNING_PATHS } from '../src/data/adnoc-content';

const BASE_URL = 'https://hse-learning-guide.com';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Core routes
const coreRoutes = [
  { url: '/', lastmod: 'TODAY', changefreq: 'daily' as const, priority: 1.0 },
  { url: '/dashboard', lastmod: 'TODAY', changefreq: 'daily', priority: 0.9 },
  { url: '/topics', lastmod: 'TODAY', changefreq: 'daily', priority: 0.9 },
  { url: '/paths', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.9 },
  { url: '/assessments', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.8 },
  { url: '/resources', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
  { url: '/glossary', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
  { url: '/checklists', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
  { url: '/procedures', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
  { url: '/case-studies', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
  { url: '/compare', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.6 },
  { url: '/progress', lastmod: 'TODAY', changefreq: 'daily', priority: 0.8 },
  { url: '/achievements', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.6 },
  { url: '/certificates', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.6 },
  { url: '/settings', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.5 },
  { url: '/profile', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.5 },
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDate(date: Date | string): string {
  if (date === 'TODAY') return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

function generateRoutes(): Array<{url: string; lastmod: string; changefreq: string; priority: number}> {
  const routes = [
    ...coreRoutes.map(r => ({ ...r, lastmod: getToday() })),
  ];

  // Topic pages
  for (const topic of require('../src/data/unified-standards').UNIFIED_TOPICS) {
    routes.push({
      url: `/topics/${topic.id}`,
      lastmod: new Date(topic.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  // ADNOC module pages
  const { ADNOC_MODULES } = require('../src/data/adnoc-content');
  ADNOC_MODULES.forEach((module: any) => {
    routes.push({
      url: `/adnoc/modules/${module.id}`,
      lastmod: new Date(module.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // Learning paths
  const { UNIFIED_LEARNING_PATHS: LP } = require('../src/data/unified-standards');
  LP.forEach((path: any) => {
    routes.push({
      url: `/paths/${path.id}`,
      lastmod: new Date(path.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // ADNOC learning paths
  const { LEARNING_PATHS } = require('../src/data/adnoc-content');
  LEARNING_PATHS.forEach((path: any) => {
    routes.push({
      url: `/adnoc/path/${path.id}`,
      lastmod: new Date(path.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}

const BASE_URL = 'https://hse-learning-guide.com';

function generateSitemap(): string {
  const staticRoutes = [
    { url: '/', lastmod: 'TODAY', changefreq: 'daily', priority: 1.0 },
    { url: '/dashboard', lastmod: 'TODAY', changefreq: 'daily', priority: 0.9 },
    { url: '/topics', lastmod: 'TODAY', changefreq: 'daily', priority: 0.9 },
    { url: '/paths', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.9 },
    { url: '/assessments', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.8 },
    { url: '/resources', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
    { url: '/glossary', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
    { url: '/checklists', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
    { url: '/procedures', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
    { url: '/case-studies', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.7 },
    { url: '/compare', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.6 },
    { url: '/progress', lastmod: 'TODAY', changefreq: 'daily', priority: 0.8 },
    { url: '/achievements', lastmod: 'TODAY', changefreq: 'weekly', priority: 0.6 },
    { url: '/certificates', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.6 },
    { url: '/settings', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.5 },
    { url: '/profile', lastmod: 'TODAY', changefreq: 'monthly', priority: 0.5 },
  ];

  const allRoutes = [
    ...coreRoutes.map(r => ({ ...r, lastmod: new Date().toISOString().split('T')[0] })),
    // Topics from unified-standards
    ...require('../src/data/unified-standards').UNIFIED_TOPICS.map((t: any) => ({
      url: `/topics/${t.id}`,
      lastmod: new Date(t.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    })),
    // ADNOC modules
    ...require('../src/data/adnoc-content').ADNOC_MODULES.map((m: any) => ({
      url: `/adnoc/modules/${m.id}`,
      lastmod: new Date(m.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    })),
    // Learning paths
    ...require('../src/data/unified-standards').UNIFIED_LEARNING_PATHS.map((p: any) => ({
      url: `/paths/${p.id}`,
      lastmod: new Date(p.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    })),
    // ADNOC learning paths
    ...require('../src/data/adnoc-content').LEARNING_PATHS.map((p: any) => ({
      url: `/adnoc/path/${p.id}`,
      lastmod: new Date(p.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    })),
    // Auth pages
    { url: '/login', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.3 },
    { url: '/register', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.3 },
    { url: '/forgot-password', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.2 },
    // Admin pages
    { url: '/admin', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/users', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/content', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/analytics', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/settings', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/security', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/admin/integrations', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.1 },
    { url: '/login', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.3 },
    { url: '/register', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.3 },
    { url: '/forgot-password', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.2 },
  ];

  const urls = allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://hse-learning-guide.com/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function generateRobotsTxt(): string {
  return `# HSE Learning Guide - Robots.txt
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /settings
Disallow: /profile
Disallow: /progress
Disallow: /achievements
Disallow: /certificates

# Sitemap
Sitemap: https://hse-learning-guide.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 10

# Host
Host: https://hse-learning-guide.com`;
}

// Main execution
function main() {
  console.log('🔄 Generating sitemap...');
  
  const sitemap = generateSitemap();
  require('fs').writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated: public/sitemap.xml');

  const sitemapIndex = generateSitemapIndex();
  require('fs').writeFileSync('public/sitemap-index.xml', sitemapIndex);
  console.log('✅ Sitemap index generated: public/sitemap-index.xml');

  const robotsTxt = generateRobotsTxt();
  require('fs').writeFileSync('public/robots.txt', generateRobotsTxt());
  console.log('✅ Robots.txt generated: public/robots.txt');

  // Count total URLs
  const allRoutes = [
    ...[{url:'/',lastmod:'',changefreq:'',priority:0},{url:'/dashboard',lastmod:'',changefreq:'',priority:0}],
    // Just counting for log
  ];
  
  console.log('✅ Sitemap generation complete!');
}

// Run
generateSitemap();