import { Badge, DataList } from '@radix-ui/themes';
import { formatPrice } from '../../utils/format-price.js';
import { toDisplayText } from '../../utils/to-display-text.js';

const VALUE_PLACEHOLDER = '—';
const NO_SECONDARY_CAMERA_VALUES = new Set(['no', '']);

function formatCameras(primaryCamera, secondaryCamera) {
  const primary = toDisplayText(primaryCamera);
  const secondary = toDisplayText(secondaryCamera);
  const hasSecondaryCamera = secondary && !NO_SECONDARY_CAMERA_VALUES.has(secondary.toLowerCase());

  return hasSecondaryCamera ? `${primary} / ${secondary}` : primary;
}

/**
 * Lista de especificaciones del producto. Requiere al menos: Marca, Modelo,
 * Precio, CPU, RAM, Sistema Operativo, Resolución de pantalla, Batería,
 * Cámaras, Dimensiones y Peso.
 *
 * Varios de estos campos (cpu, ram, os, primaryCamera, secondaryCmera)
 * llegan de la API como array o como string según el producto, de ahí el
 * paso por `toDisplayText`.
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
    { label: 'Precio', value: <Badge color="indigo">{formatPrice(price)}</Badge> },
    { label: 'CPU', value: toDisplayText(cpu) },
    { label: 'RAM', value: toDisplayText(ram) },
    { label: 'Sistema Operativo', value: toDisplayText(os) },
    { label: 'Resolución de pantalla', value: displayResolution },
    { label: 'Batería', value: battery },
    { label: 'Cámaras', value: formatCameras(primaryCamera, secondaryCamera) },
    { label: 'Dimensiones', value: dimensions },
    { label: 'Peso', value: weight ? `${weight} g` : undefined },
  ];

  return (
    <DataList.Root orientation={{ initial: 'vertical', xs: 'horizontal' }} size="2">
      {specs.map(({ label, value }) => (
        <DataList.Item key={label}>
          <DataList.Label minWidth="160px">{label}</DataList.Label>
          <DataList.Value>{value || VALUE_PLACEHOLDER}</DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}
