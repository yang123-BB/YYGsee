/**
 * Client-side API key management via localStorage
 * Keys are stored locally in the browser, never sent to our server for storage.
 * They are only sent to the respective AI provider's API endpoint.
 *
 * DEFAULT_KEYS 为内置默认 Key（仅用于本地/个人环境，避免每次手动配置）。
 * 浏览器 localStorage 中保存的 Key 优先级高于此处默认值。
 */

const STORAGE_KEY = 'rebarviz_api_keys';

// 内置默认 API Key（如不需要可清空对应字段）
const DEFAULT_KEYS: ApiKeyStore = {
  agnes: 'sk-wYmpnlrHTOoGxLhSt6pzDUNLeMx1uIRusDiaAGj1TSEUcQ84',
};

export interface ApiKeyStore {
  zhipu?: string;
  deepseek?: string;
  qwen?: string;
  kimi?: string;
  openai?: string;
  mimo?: string;
  'mimo-cn'?: string;
  'mimo-sgp'?: string;
  'mimo-ams'?: string;
  agnes?: string;
}

export function getApiKeys(): ApiKeyStore {
  if (typeof window === 'undefined') return { ...DEFAULT_KEYS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : {};
    // 默认值兜底：localStorage 中未配置的项使用内置默认值
    return { ...DEFAULT_KEYS, ...stored };
  } catch {
    return { ...DEFAULT_KEYS };
  }
}

export function setApiKeys(keys: ApiKeyStore): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export function getApiKey(providerId: string): string | undefined {
  const keys = getApiKeys();
  return keys[providerId as keyof ApiKeyStore];
}export function setApiKey(providerId: string, key: string): void {
  const keys = getApiKeys();
  keys[providerId as keyof ApiKeyStore] = key;
  setApiKeys(keys);
}

export function clearApiKey(providerId: string): void {
  const keys = getApiKeys();
  delete keys[providerId as keyof ApiKeyStore];
  setApiKeys(keys);
}

/** Mask key for display: sk-abc...xyz */
export function maskKey(key: string): string {
  if (!key || key.length < 10) return key ? '••••••••' : '';
  return key.slice(0, 6) + '••••••' + key.slice(-4);
}
