// Service Worker cho PWA Lịch Học Thêm
const CACHE_NAME = 'lichhoc-pwa-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Luôn ưu tiên mạng để dữ liệu lịch học luôn được đồng bộ trực tiếp từ Google Sheets
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
