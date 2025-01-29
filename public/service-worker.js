// service-worker.js
// キャッシュの名前（バージョン管理のために変更可能）
const CACHE_NAME = 'my-app-cache-v1';

// キャッシュするファイルのリスト
const URLS_TO_CACHE = [
    '/', // ホームページ
    '/index.html',
    '/styles.css',
    '/script.js',
    '/favicon.ico',
];

// サービスワーカーのインストール時にキャッシュを作成
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// 古いキャッシュを削除して新しいものに置き換える
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// リクエストをキャッチし、キャッシュまたはネットワークからレスポンスを返す
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            // キャッシュにヒットした場合はそれを返す
            if (response) {
                return response;
            }
            // キャッシュにない場合はネットワークから取得
            return fetch(event.request);
        })
    );
});
