const CACHE_NAME = "offline-cache-v1";
const OFFLINE_PAGE = "./offline.html";

const FILE_TO_CACHE = [OFFLINE_PAGE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache offline file successful");
        return cache.addAll(FILE_TO_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch((error) =>
        console.error(`Failed to catch offline files: ${error}`)
      )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .them((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_PAGE);
      })
    );
  }
});
