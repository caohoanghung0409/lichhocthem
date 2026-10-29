// Service Worker cho PWA Lịch Học Thêm
const CACHE_NAME = 'lichhoc-pwa-v9';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Luôn ưu tiên mạng để dữ liệu lịch học luôn được đồng bộ trực tiếp từ Google Sheets
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
