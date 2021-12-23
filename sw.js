const CACHE_NAME = 'tintscope';

self.addEventListener('install', e => {
 e.waitUntil(
   caches.open(CACHE_NAME).then(cache => {
     return cache.addAll([
      '/pwa/index.html',
      '/pwa/bundle.css',
      '/pwa/bundle.js'
    ]);
   })
   );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(resp => {
      if (e.request.url.includes('livereload')) return resp;
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(e.request.url, resp.clone());
        return resp;
      });
    }).catch(err => {
      // Fallback to cache
      return caches.match(e.request).then(cacheResp => {
        // if (resp === undefined) return cacheResp;
        // return resp;
        return cacheResp;
      })
    })
    );
});
