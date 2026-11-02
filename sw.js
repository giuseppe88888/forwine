const CACHE_NAME = 'forwine-cache-v2';
const urlsToCache = ['./', './index.html', './style.css', './motore.js', './confronta.js', './database.js'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    Promise.all(urlsToCache.map(url => cache.add(url).catch(() => null)))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first: gli utenti ricevono sempre l'ultima versione; la cache serve solo offline.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req))
  );
});
