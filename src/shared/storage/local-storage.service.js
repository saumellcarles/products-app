function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Capa de persistencia en cliente sobre `localStorage`. Serializa/deserializa
 * en JSON y degrada de forma segura si el storage no está disponible
 * (modo privado, cuota excedida, SSR, etc.).
 */
export const localStorageService = {
  get(key) {
    if (!isStorageAvailable()) return null;

    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  set(key, value) {
    if (!isStorageAvailable()) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    if (!isStorageAvailable()) return;
    window.localStorage.removeItem(key);
  },
};
