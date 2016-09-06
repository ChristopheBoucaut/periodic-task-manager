var cacheName = 'periodic-task-manager-cache-files-5';

var filesCached = [
    './',
    './index.html',
    './create.html',
    './history.html',
    './homepage.html',
    './translation.fr.json',
    './css/app.css',
    './css/vendor.css',
    './js/app.js',
    './js/vendor.js',
    './img/icons/menu.svg',
    './img/icons/search.svg',
    './img/icons/create.svg',
    './img/icons/check.svg',
    './img/icons/next.svg',
    './img/icons/delete.svg',
    './img/icons/back.svg'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesCached);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});