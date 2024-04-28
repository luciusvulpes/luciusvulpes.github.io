const cacheName = "DefaultCompany-Radiophobia.app-0.1";
const contentToCache = [
    "Build/220ce6a2747878f3ed130c74736122f5.loader.js",
    "Build/e28c5578000e1aa9b7040d0fe262cb91.framework.js",
    "Build/fddaf37ab96b0ef4132a686282fc8d71.data",
    "Build/6126916d15cd1f84e8efada5755bd1cb.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
