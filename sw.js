const CACHE = "emi-calculator-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "privacy.html", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon-180.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => { if (e.request.method !== "GET") return; e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request))); });
