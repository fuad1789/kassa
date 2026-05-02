const CACHE = 'kassa-v1';
const FILES = [
  './',
  'index.html',
  'manifest.json',
  'icon.svg',
  'icon-maskable.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const sameOrigin = url.origin === self.location.origin;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) {
        if (sameOrigin) {
          fetch(e.request).then(resp => {
            if (resp && resp.ok) {
              const clone = resp.clone();
              caches.open(CACHE).then(c => c.put(e.request, clone));
            }
          }).catch(() => {});
        }
        return cached;
      }
      return fetch(e.request).then(resp => {
        if (resp && resp.ok && sameOrigin) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => {
        if (e.request.mode === 'navigate') return caches.match('index.html');
      });
    })
  );
});
