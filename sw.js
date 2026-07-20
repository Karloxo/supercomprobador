const CACHE_NAME = 'comprobador-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://i.ibb.co/5Xmz18B8/Whats-App-Image-2026-07-20-at-12-05-13.jpg'
];

// Instalación: Guarda los archivos en el almacenamiento local del iPhone
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpia cachés antiguas si las hubiera
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercepción: Si no hay internet, sirve el archivo guardado en el iPhone
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
