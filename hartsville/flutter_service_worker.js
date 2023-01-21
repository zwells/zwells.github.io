'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "c745cf0c9dc84aeadb18afecd9b5a72c",
"assets/assets/AppIcon.png": "c5aae2e0d4a86fafab032af2f6875081",
"assets/assets/Church.jpg": "cb72837435254a808b92731697c37def",
"assets/assets/Church.png": "7cd4f4002ed94bb3bfdf11ef72487fa5",
"assets/assets/City.jpg": "b38de65a79ad7d5d85372c14bfb006ae",
"assets/assets/Clothing.jpg": "ac2185117fedd95ac4f8d49b6733340c",
"assets/assets/Clothing.png": "4ca4f04524bbb5d0f10e04ae4b95d1a1",
"assets/assets/Education.jpg": "efcd40d3405a46f599f315dd1ebf33d2",
"assets/assets/Education.png": "ada1f48e06f156f55a0b0f2739d71951",
"assets/assets/Food.jpg": "021e5ca3ec19df9780e8879ecbea87fd",
"assets/assets/Food.png": "f71f8ee5fc53fb019347777d9cff2f43",
"assets/assets/hartsville.xlsx": "97592b37b8432ce426b8f69b2cc94e47",
"assets/assets/hartsvillestrong-1e527a4909f7.json": "98f377ac225405e784801c48525638cf",
"assets/assets/Housing.jpg": "232c791cae5fee08b983232595eb4f72",
"assets/assets/Housing.png": "4442840420b223122107e12f9ed8cee0",
"assets/assets/LargeLogo.png": "df9acf547a6ae49f8208e0d32ef3e04f",
"assets/assets/Legal_Services.jpg": "e52cab11da9df581c7cb8812cf043a2f",
"assets/assets/Legal_Services.png": "3850b1f1b7f2d2972d7f5292b7e37e55",
"assets/assets/Logo.jpg": "06c2f4397e09b3998fbfc2d2faf56c56",
"assets/assets/Logo.png": "ca63a115d403ae4593c859a11916b61f",
"assets/assets/Men_Women.jpg": "7cd9dbc40f41297b65f44612c5978bbb",
"assets/assets/Men_Women.png": "4aa033ea3a98818f05f231b31799ea7b",
"assets/assets/National.jpg": "67345ee53b9982b8e53247a50c612ec9",
"assets/assets/National.png": "ac632ec8b93ee7bc244b69c085bb2c47",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "43451869fab3bb608e0a8829020eabd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c3a7b453e952ae86620dea7413c0770a",
"/": "c3a7b453e952ae86620dea7413c0770a",
"main.dart.js": "92cfdef66862337848c912fc47a03bec",
"manifest.json": "bd1d2b5a50be0955f69e54b9eede2893",
"splash/img/dark-1x.png": "287dd925274fa8d2e161b61690c36a6e",
"splash/img/dark-2x.png": "b813ba611c0d04a1180290d95bd0863e",
"splash/img/dark-3x.png": "31a97b87bc2165e4ba57d2ca118ffafc",
"splash/img/dark-4x.png": "49647aa0970a0910c2c4144f1c5f6124",
"splash/img/light-1x.png": "287dd925274fa8d2e161b61690c36a6e",
"splash/img/light-2x.png": "b813ba611c0d04a1180290d95bd0863e",
"splash/img/light-3x.png": "31a97b87bc2165e4ba57d2ca118ffafc",
"splash/img/light-4x.png": "49647aa0970a0910c2c4144f1c5f6124",
"splash/splash.js": "f6ee10f0a11f96089a97623ece9a1367",
"splash/style.css": "59d66af6467e267ed2e58873f28cdb24",
"version.json": "7aa7fb033145d15c0623f18e6a6bb4f3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
