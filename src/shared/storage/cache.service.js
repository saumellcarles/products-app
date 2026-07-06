import { localStorageService } from './local-storage.service.js';

export const ONE_HOUR_IN_MS = 60 * 60 * 1000;

function isEntryValid(entry) {
  if (!entry) return false;

  const { timestamp, ttl } = entry;
  return Date.now() - timestamp < ttl;
}

/**
 * Capa de caché reutilizable para cualquier endpoint. Cada entrada persiste
 * `{ data, timestamp, ttl }`; al expirar el TTL la entrada se considera
 * inválida y debe revalidarse contra el origen de datos.
 */
export function setCacheEntry(key, data, ttl = ONE_HOUR_IN_MS) {
  const entry = { data, timestamp: Date.now(), ttl };
  localStorageService.set(key, entry);
  return entry;
}

export function getCacheEntry(key) {
  const entry = localStorageService.get(key);
  return isEntryValid(entry) ? entry : null;
}

export function invalidateCacheEntry(key) {
  localStorageService.remove(key);
}

/**
 * Devuelve los datos cacheados si son válidos; si no, invoca `fetcher`,
 * cachea el resultado con el TTL indicado y lo devuelve.
 */
export async function getOrFetch(key, fetcher, ttl = ONE_HOUR_IN_MS) {
  const cachedEntry = getCacheEntry(key);

  if (cachedEntry) {
    return cachedEntry.data;
  }

  const data = await fetcher();
  setCacheEntry(key, data, ttl);

  return data;
}
