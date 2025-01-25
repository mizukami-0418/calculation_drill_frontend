// このコードはサービスワーカーを登録するためのものです。
// デフォルトでは呼び出されないため、`index.js` で手動で登録する必要があります。

// サービスワーカーが登録される環境がローカルホストかどうかを確認します。
const isLocalhost = Boolean(
  window.location.hostname === "localhost" || // ローカルホスト
    window.location.hostname === "[::1]" || // IPv6形式のローカルホスト
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/ // IPv4形式のローカルホスト
    )
);

// サービスワーカーを登録する関数
export function register(config) {
  // プロダクション環境であり、ブラウザがサービスワーカーをサポートしている場合にのみ実行
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // 公開URLを取得
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // サービスワーカーが異なるオリジンで動作しないようにする
      return;
    }

    // ページがロードされたときにサービスワーカーを登録
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // ローカル環境の場合、サービスワーカーが有効かどうか確認
        checkValidServiceWorker(swUrl, config);

        // ローカルホスト用のログを出力
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "このWebアプリはサービスワーカーによってキャッシュ優先で提供されています。"
          );
        });
      } else {
        // 本番環境の場合は通常のサービスワーカーを登録
        registerValidSW(swUrl, config);
      }
    });
  }
}

// 有効なサービスワーカーを登録する関数
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        // サービスワーカーの状態が変化したときの処理
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // 新しいコンテンツが利用可能になったことを通知
              console.log(
                "新しいコンテンツが利用可能です。ページをリロードしてください。"
              );

              // オプションのコールバックを実行
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // キャッシュが初めて利用可能になったときの処理
              console.log(
                "コンテンツがオフラインでも使用できるようになりました。"
              );

              // オプションのコールバックを実行
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("サービスワーカーの登録中にエラーが発生しました:", error);
    });
}

// サービスワーカーが有効かどうかを確認する関数
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" }, // サービスワーカー用のヘッダーを設定
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 || // サービスワーカーが見つからない場合
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // サービスワーカーが存在しない場合、登録解除してページをリロード
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // サービスワーカーが見つかった場合、登録
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "インターネット接続がありません。アプリはオフラインモードで動作します。"
      );
    });
}

// サービスワーカーを登録解除する関数
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(
          "サービスワーカーの登録解除中にエラーが発生しました:",
          error
        );
      });
  }
}
