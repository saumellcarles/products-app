import { formatPrice } from '../../utils/format-price.js';
import styles from './ProductDescription.module.scss';

const VALUE_PLACEHOLDER = '—';
const NO_SECONDARY_CAMERA_VALUES = new Set(['no', '']);

function formatCameras(primaryCamera, secondaryCamera) {
  const hasSecondaryCamera = secondaryCamera && !NO_SECONDARY_CAMERA_VALUES.has(secondaryCamera.toLowerCase());
  return hasSecondaryCamera ? `${primaryCamera} / ${secondaryCamera}` : primaryCamera;
}

/**
 * Lista de especificaciones del producto. Requiere al menos: Marca, Modelo,
 * Precio, CPU, RAM, Sistema Operativo, Resolución de pantalla, Batería,
 * Cámaras, Dimensiones y Peso.
 */
export function ProductDescription({ product }) {
  const {
    brand,
    model,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    primaryCamera,
    secondaryCmera: secondaryCamera,
    dimentions: dimensions,
    weight,
  } = product;

  const specs = [
    { label: 'Marca', value: brand },
    { label: 'Modelo', value: model },
    { label: 'Precio', value: formatPrice(price) },
    { label: 'CPU', value: Array.isArray(cpu) ? cpu.join(' ') : cpu },
    { label: 'RAM', value: ram },
    { label: 'Sistema Operativo', value: os },
    { label: 'Resolución de pantalla', value: displayResolution },
    { label: 'Batería', value: battery },
    { label: 'Cámaras', value: formatCameras(primaryCamera, secondaryCamera) },
    { label: 'Dimensiones', value: dimensions },
    { label: 'Peso', value: weight ? `${weight} g` : undefined },
  ];

  return (
    <dl className={styles.list}>
      {specs.map(({ label, value }) => (
        <div className={styles.item} key={label}>
          <dt className={styles.label}>{label}</dt>
          <dd className={styles.value}>{value || VALUE_PLACEHOLDER}</dd>
        </div>
      ))}
    </dl>
  );
}
