/**
 * HSE Learning Guide - Service Worker
 * Provides offline support, caching, and background sync
 */

const CACHE_NAME = 'hse-learning-guide-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];

const CACHE_STRATEGIES = {
  // Cache first - for static assets
  static: 'cache-first',
  // Network first - for API calls
  api: 'network-first',
  // Stale while revalidate - for content pages
  content: 'stale-while-revalidate',
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle requests with appropriate caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on request type
  const strategy = getStrategy(request, url);
  
  event.respondWith(handleRequest(request, strategy));
});

// Determine caching strategy based on request
function getStrategy(request, url) {
  // API calls - network first
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/api/')) {
    return CACHE_STRATEGIES.api;
  }

  // Static assets - cache first
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)) {
    return CACHE_STRATEGIES.static;
  }

  // HTML pages - stale while revalidate
  if (request.headers.get('accept')?.includes('text/html')) {
    return CACHE_STRATEGIES.content;
  }

  // Default to network first
  return CACHE_STRATEGIES.api;
}

// Handle request with appropriate strategy
async function handleRequest(request, strategy) {
  switch (strategy) {
    case 'cache-first':
      return cacheFirst(request);
    case 'network-first':
      return networkFirst(request);
    case 'stale-while-revalidate':
      return staleWhileRevalidate(request);
    default:
      return networkFirst(request);
  }
}

// Cache first strategy - for static assets
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Network first strategy - for API calls
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stale while revalidate strategy - for content pages
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Fetch fresh version in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Ignore network errors for background update
  });

  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // No cache, wait for network
  try {
    return await fetch(request);
  } catch (error) {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  } else if (event.tag === 'sync-assessment') {
    event.waitUntil(syncAssessment());
  } else if (event.tag === 'sync-bookmark') {
    event.waitUntil(syncBookmark());
  }
});

// Sync progress data
async function syncProgress() {
  try {
    const db = await openDB();
    const tx = db.transaction('pendingProgress', 'readwrite');
    const store = tx.objectStore('pendingProgress');
    const pending = await store.getAll();

    for (const item of await pending) {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data),
        });
        if (response.ok) {
          await store.delete(item.id);
        }
      } catch (error) {
        console.error('[SW] Sync progress failed:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Sync progress error:', error);
  }
}

// Sync assessment results
async function syncAssessment() {
  try {
    const db = await openDB();
    const tx = db.transaction('pendingAssessments', 'readwrite');
    const store = tx.objectStore('pendingAssessments');
    const pending = await store.getAll();

    for (const item of await pending) {
      try {
        const response = await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data),
        });
        if (response.ok) {
          await store.delete(item.id);
        }
      } catch (error) {
        console.error('[SW] Sync assessment failed:', error);
      }
    } catch (error) {
      console.error('[SW] Sync assessment error:', error);
    }
  } catch (error) {
    console.error('[SW] Sync assessment error:', error);
  }
}

// Sync bookmarks
async function syncBookmark() {
  try {
    const db = await openDB();
    const tx = db.transaction('pendingBookmarks', 'readwrite');
    const store = tx.objectStore('pendingBookmarks');
    const pending = await store.getAll();

    for (const item of await pending) {
      try {
        const response = await fetch('/api/bookmarks', {
          method: item.method || 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data),
        });
        if (response.ok) {
          await store.delete(item.id);
        }
      } catch (error) {
        console.error('[SW] Sync bookmark failed:', error);
      }
    } catch (error) {
      console.error('[SW] Sync bookmark error:', error);
    }
  } catch (error) {
    console.error('[SW] Sync bookmark error:', error);
  }
}

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('HSELearningGuide', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Pending progress sync
      if (!db.objectStoreNames.contains('pendingProgress')) {
        const progressStore = db.createObjectStore('pendingProgress', { keyPath: 'id', autoIncrement: true });
        progressStore.createIndex('topicId', 'topicId', { unique: false });
        progressStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // Pending assessments sync
      if (!db.objectStoreNames.contains('pendingAssessments')) {
        const assessmentStore = db.createObjectStore('pendingAssessments', { keyPath: 'id', autoIncrement: true });
        assessmentStore.createIndex('quizId', 'quizId', { unique: false });
        assessmentStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // Pending bookmarks sync
      if (!db.objectStoreNames.contains('pendingBookmarks')) {
        const bookmarkStore = db.createObjectStore('pendingBookmarks', { keyPath: 'id', autoIncrement: true });
        bookmarkStore.createIndex('moduleId', 'moduleId', { unique: false });
        bookmarkStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // Offline content cache
      if (!db.objectStoreNames.contains('offlineContent')) {
        const contentStore = db.createObjectStore('offlineContent', { keyPath: 'url' });
        contentStore.createIndex('topicId', 'topicId', { unique: false });
        contentStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // Offline assessments
      if (!db.objectStoreNames.contains('offlineAssessments')) {
        const assessmentStore = db.createObjectStore('offlineAssessments', { keyPath: 'id' });
        assessmentStore.createIndex('topicId', 'topicId', { unique: false });
      }
    };
  });
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  } else if (event.action === 'dismiss') {
    // Just close notification
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'periodic-sync-progress') {
    event.waitUntil(syncProgress());
  } else if (event.tag === 'periodic-sync-content') {
    event.waitUntil(updateOfflineContent());
  }
});

// Update offline content cache
async function updateOfflineContent() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch('/api/offline-content');
    if (response.ok) {
      const content = await response.json();
      for (const item of content) {
        await cache.put(item.url, new Response(JSON.stringify(item.data), {
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    }
  } catch (error) {
    console.error('[SW] Update offline content failed:', error);
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  } else if (event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  } else if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(event.data.urls))
    );
  } else if (event.data.type === 'PREFETCH_TOPIC') {
    event.waitUntil(prefetchTopic(event.data.topicId));
  }
});

// Prefetch topic content for offline access
async function prefetchTopic(topicId) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(`/api/topics/${topicId}/prefetch`);
    if (response.ok) {
      const data = await response.json();
      for (const item of data.resources) {
        await cache.put(item.url, new Response(JSON.stringify(item.data), {
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    }
  } catch (error) {
    console.error('[SW] Prefetch topic failed:', error);
  }
}

console.log('[SW] Service Worker loaded');