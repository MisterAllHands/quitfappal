const CACHE_VERSION = 'qfp-v1';
const PAGE_CACHE = `qfp-pages-${CACHE_VERSION}`;
const ASSET_CACHE = `qfp-assets-${CACHE_VERSION}`;

const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/privacy.html',
    '/terms.html',
    '/legal.css',
    '/styles.css',
    '/script.js',
    '/assets/favicon.png',
    '/assets/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PAGE_CACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            const staleKeys = keys.filter((key) => key !== PAGE_CACHE && key !== ASSET_CACHE);
            return Promise.all(staleKeys.map((key) => caches.delete(key)));
        }).then(() => self.clients.claim())
    );
});

async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);

    try {
        const response = await fetch(request);
        if (response && response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const networkPromise = fetch(request)
        .then((response) => {
            if (response && response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached);

    return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Keep form posts and other cross-origin network flows untouched.
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request, PAGE_CACHE));
        return;
    }

    const isStaticAsset = url.pathname.startsWith('/assets/')
        || url.pathname.endsWith('.css')
        || url.pathname.endsWith('.js')
        || url.pathname.endsWith('.png')
        || url.pathname.endsWith('.jpg')
        || url.pathname.endsWith('.jpeg')
        || url.pathname.endsWith('.mp4')
        || url.pathname.endsWith('.json');

    if (isStaticAsset) {
        event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
        return;
    }

    event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
});
