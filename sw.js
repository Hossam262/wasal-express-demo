self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||e.request.url.includes('supabase.co'))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
