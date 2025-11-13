
import { setCookie, getCookie } from './cookies';

const BOT_UA_PATTERNS = [
  /Googlebot/i, /bingbot/i, /Baiduspider/i, /YandexBot/i,
  /DuckDuckBot/i, /Slurp/i, /facebot/i, /facebookexternalhit/i,
  /twitterbot/i, /WhatsApp/i, /TelegramBot/i, /AdsBot-Google/i
];

function isBotUserAgent(ua?: string | null): boolean {
  if (!ua) return false;
  return BOT_UA_PATTERNS.some((re) => re.test(ua));
}

export function detectAndSetBotCookie(): void {
  if (typeof window !== 'undefined') {
    const ua = window.navigator.userAgent;
    if (isBotUserAgent(ua)) {
      setCookie("ads_disabled", "1", 1);
    }
  }
}

export function areAdsDisabled(): boolean {
    if (typeof window !== 'undefined') {
        return getCookie("ads_disabled") === "1";
    }
    return false;
}
