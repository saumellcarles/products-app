/**
 * Varios campos de la API (cpu, ram, os, primaryCamera, secondaryCmera, ...)
 * llegan a veces como array y a veces como string para el mismo atributo
 * según el producto. Normaliza cualquiera de las dos formas a texto plano.
 */
export function toDisplayText(value) {
  if (Array.isArray(value)) {
    return value.join(' ');
  }

  return value;
}
