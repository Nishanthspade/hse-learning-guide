#!/usr/bin/env node
/** 
 * HSE Learning Guide - Sitemap Generator
 * Generates sitemap.xml, sitemap-index.xml, and robots.txt
 */

const fs = require('fs');

// Load data files
const unifiedStandards = require('../src/data/unified-standards');
const adnocContent = require('../src/data/adnoc-content');

const BASE_URL = 'https://hse-learning-guide.com';
const TODAY = new Date().toISOString().split('T')[0];

// Core routes
const coreRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
  { url: '/topics', changefreq: 'daily', priority: 0.9 },
  { url: '/paths', changefreq: 'weekly', priority: 0.9 },
  { url: '/assessments', changefreq: 'weekly', priority: 0.8 },
  { url: '/resources', changefreq: 'weekly', priority: 0.7 },
  { url: '/glossary', changefreq: 'weekly', priority: 0.7 },
  { url: '/checklists', changefreq: 'weekly', priority: 0.7 },
  { url: '/procedures', changefreq: 'weekly', priority: 0.7 },
  { url: '/case-studies', changefreq: 'weekly', priority: 0.7 },
  { url: '/compare', changefreq: 'monthly', priority: 0.6 },
  { url: '/progress', changefreq: 'daily', priority: 0.8 },
  { url: '/achievements', changefreq: 'weekly', priority: 0.6 },
  { url: '/certificates', changefreq: 'monthly', priority: 0.6 },
  { url: '/settings', changefreq: 'monthly', priority: 0.5 },
  { url: '/profile', changefreq: 'monthly', priority: 0.5 },
];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function generateRoutes() {
  const routes = [];

  // Core routes with today's date
  coreRoutes.forEach(r => {
    routes.push({
      url: r.url,
      lastmod: TODAY,
      changefreq: r.changefreq,
      priority: r.priority,
    });
  });

  // Topic pages from unified-standards
  const { UNIFIED_TOPICS } = unifiedStandards;
  UNIFIED_TOPICS.forEach(topic => {
    routes.push({
      url: `/topics/${topic.id}`,
      lastmod: new Date(topic.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // ADNOC module pages
  const { ADNOC_MODULES } = adnocContent;
  ADNOC_MODULES.forEach(module => {
    routes.push({
      url: `/adnoc/modules/${module.id}`,
      lastmod: new Date(module.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // Learning paths from unified-standards
  const { UNIFIED_LEARNING_PATHS } = unifiedStandards;
  UNIFIED_LEARNING_PATHS.forEach(path => {
    routes.push({
      url: `/paths/${path.id}`,
      lastmod: new Date(path.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // ADNOC learning paths
  const { LEARNING_PATHS } = adnocContent;
  LEARNING_PATHS.forEach(path => {
    routes.push({
      url: `/adnoc/path/${path.id}`,
      lastmod: new Date(path.lastUpdated).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    });
  });

  // Auth pages (lower priority)
  routes.push(
    { url: '/login', changefreq: 'monthly', priority: 0.3, lastmod: TODAY },
    { url: '/register', changefreq: 'monthly', priority: 0.3, lastmod: TODAY },
    { url: '/forgot-password', changefreq: 'monthly', priority: 0.2, lastmod: TODAY }
  );

  // Admin pages (low priority)
  routes.push(
    { url: '/admin', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/users', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/content', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/analytics', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/settings', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/security', changefreq: 'monthly', priority: 0.1, lastmod: TODAY },
    { url: '/admin/integrations', changefreq: 'monthly', priority: 0.1, lastmod: TODAY }
  );

  return routes;
}

function generateSitemap() {
  const routes = generateRoutes();
  const urls = routes.map(route => 
    `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

function generateSitemapIndex() {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://hse-learning-guide.com/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function generateRobotsTxt() {
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
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated: public/sitemap.xml');

  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync('public/sitemap-index.xml', sitemapIndex);
  console.log('✅ Sitemap index generated: public/sitemap-index.xml');

  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync('public/robots.txt', robotsTxt);
  console.log('✅ Robots.txt generated: public/robots.txt');

  const allRoutes = generateRoutes();
  console.log(`📊 Total URLs in sitemap: ${allRoutes.length}`);

  console.log('✅ Sitemap generation complete!');
}

main();