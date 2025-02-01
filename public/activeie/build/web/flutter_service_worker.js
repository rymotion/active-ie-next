'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "d83fa3dd801636eb29bfd15710a9ae95",
"version.json": "31808c90c15e2e6f93a66d66c0cceeb0",
"index.html": "0e74ff78e9d1136c029e125b8ffb30de",
"/": "0e74ff78e9d1136c029e125b8ffb30de",
"main.dart.js": "0234a9d0175b4f3b7dec186c1000fae8",
"flutter.js": "5de281a37b2308e43846d3a0b545c921",
"network_calls/gb_network_calls.js": "54fc9406dff80859748ee589278c972b",
"index.css": "a54066cca250056b04c34807c3d05a71",
"components/donorbox.html": "90d60151005af71c4aa3fab4a6a46deb",
"components/substackView.html": "a33016d01caf3e2a7d03b129600c310d",
"components/chamberofcommerce-badge.html": "44aa1b5eaaae3bfc3656074e8f4b794e",
"favicon.png": "6f249a445ffa57fc329b2e63b7075a11",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/active-ie-shield.png": "d541572f9a156f7c6bba0a1267bcce67",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "85ce1ef22b123f76eda9e6dd869a667e",
"assets/AssetManifest.json": "c8a1bdbf975ecfe180cd30913492cd81",
"assets/NOTICES": "e902122e6753b5168fcd251c281b06de",
"assets/FontManifest.json": "6dde0a81f59bc6645f79849ccb9d83ee",
"assets/AssetManifest.bin.json": "b9c6d3f1e0f1af6e61dd659479d50e21",
"assets/packages/timezone/data/latest_all.tzf": "a3a6cb5d912b5375926e5b027f91cb00",
"assets/packages/flutter_js/assets/js/fetch.js": "277e0c5ec36810cbe57371a4b7e26be0",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "2071b36ec23bbab84d19166122e02bd0",
"assets/fonts/BebasNeue-Regular.ttf": "b2b293064f557c41411aac04d6f6710d",
"assets/fonts/MaterialIcons-Regular.otf": "1b5f0fcf5240f19e152d76d18b942095",
"assets/assets/images/Connect%2520RC%2520Bicycle%2520Subcommittee%2520(1440%2520x%2520400%2520px).png": "21df5ef8eae4f41cb6327aab9e4feb7c",
"assets/assets/images/banner.jpg": "578326012ae456777593a84187663b1e",
"assets/assets/images/active-ie-shield.png": "d541572f9a156f7c6bba0a1267bcce67",
"assets/assets/gifs/landing.gif": "948bd5a2779dc14e300ddf0299b01cc5",
"assets/assets/scripts/givebutter_script.js": "a540967637d144fc5f851f69d9b993ca",
"canvaskit/skwasm.js": "e95d3c5713624a52bf0509ccb24a6124",
"canvaskit/skwasm.js.symbols": "dc16cade950cfed532b8c29e0044fe42",
"canvaskit/canvaskit.js.symbols": "bb7854ddbcaa2e58e5bdef66b58d4b47",
"canvaskit/skwasm.wasm": "aff2178f40209a9841d8d1b47a6e6ec7",
"canvaskit/chromium/canvaskit.js.symbols": "f23279209989f44e047062055effde63",
"canvaskit/chromium/canvaskit.js": "6a5bd08897043608cb8858ce71bcdd8a",
"canvaskit/chromium/canvaskit.wasm": "ad6f889daae572b3fd08afc483572ecd",
"canvaskit/canvaskit.js": "32cc31c7f950543ad75e035fcaeb2892",
"canvaskit/canvaskit.wasm": "6134e7617dab3bf54500b0a2d94fe17a",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
