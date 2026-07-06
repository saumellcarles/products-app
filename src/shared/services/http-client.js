import { API_BASE_URL } from '../constants/api/products.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, options) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new ApiError(`No se ha podido conectar con la API (${path})`, 0);
  }

  if (!response.ok) {
    throw new ApiError(`La petición a ${path} ha fallado`, response.status);
  }

  return response.json();
}
 
/**
 * Cliente HTTP centralizado sobre Fetch API. Toda comunicación con la API
 * pasa por aquí: los componentes nunca invocan `fetch` directamente.
 */
export const httpClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};
