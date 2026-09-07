// ─── Meta SDK Loader ────────────────────────────────────────────────────────
// Loads the Facebook JavaScript SDK for Embedded Signup flow.
// Never exposes App Secret — only App ID is used here (public).

declare global {
  interface Window {
    FB: {
      init: (opts: object) => void;
      login: (
        callback: (response: { authResponse?: { code: string } }) => void,
        opts: object
      ) => void;
    };
    fbAsyncInit: () => void;
  }
}

let sdkLoaded = false;
let sdkLoadPromise: Promise<void> | null = null;

export function loadFacebookSDK(appId: string): Promise<void> {
  if (sdkLoaded) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: import.meta.env.VITE_WHATSAPP_API_VERSION || 'v21.0',
      });
      sdkLoaded = true;
      resolve();
    };

    const existing = document.getElementById('facebook-jssdk');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => reject(new Error('Failed to load Facebook SDK'));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

// Required permissions for WhatsApp Business integration
const WA_PERMISSIONS = [
  'whatsapp_business_management',
  'whatsapp_business_messaging',
  'business_management',
].join(',');

export function launchMetaEmbeddedSignup(appId: string): Promise<string> {
  return loadFacebookSDK(appId).then(
    () =>
      new Promise((resolve, reject) => {
        window.FB.login(
          (response) => {
            if (response.authResponse?.code) {
              resolve(response.authResponse.code);
            } else {
              reject(new Error('Meta authorization was cancelled or failed.'));
            }
          },
          {
            config_id: import.meta.env.VITE_META_CONFIG_ID || '',
            response_type: 'code',
            override_default_response_type: true,
            extras: {
              setup: {},
              featureType: '',
              sessionInfoVersion: '3',
            },
            scope: WA_PERMISSIONS,
          }
        );
      })
  );
}
