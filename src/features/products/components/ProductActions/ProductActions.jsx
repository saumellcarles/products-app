import { useEffect, useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { Button, Select, Toast } from '../../../../shared/components';
import { REQUEST_STATUS } from '../../../../shared/constants/request-status.js';
import { useAddToCart } from '../../../cart';

const STORAGE_LABEL = 'Almacenamiento';
const COLOR_LABEL = 'Color';
const TOAST_DURATION_MS = 3000;

export function ProductActions({ product }) {
  const { storages, colors } = product.options;
  const [selectedStorageCode, setSelectedStorageCode] = useState(storages[0].code);
  const [selectedColorCode, setSelectedColorCode] = useState(colors[0].code);
  const { addToCart, status } = useAddToCart();
  const [isToastVisible, setIsToastVisible] = useState(false);

  const storageOptions = storages.map(({ code, name }) => ({ value: code, label: name }));
  const colorOptions = colors.map(({ code, name }) => ({ value: code, label: name }));
  const isAdding = status === REQUEST_STATUS.LOADING;

  useEffect(() => {
    if (status !== REQUEST_STATUS.SUCCESS && status !== REQUEST_STATUS.ERROR) return undefined;

    setIsToastVisible(true);
    const timeoutId = setTimeout(() => setIsToastVisible(false), TOAST_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [status]);

  function handleAddToCart() {
    addToCart({ id: product.id, colorCode: selectedColorCode, storageCode: selectedStorageCode });
  }

  return (
    <Flex direction="column" align="stretch" gap="3">
      <Select
        label={STORAGE_LABEL}
        options={storageOptions}
        value={selectedStorageCode}
        onChange={(value) => setSelectedStorageCode(Number(value))}
      />
      <Select
        label={COLOR_LABEL}
        options={colorOptions}
        value={selectedColorCode}
        onChange={(value) => setSelectedColorCode(Number(value))}
      />

      <Button onClick={handleAddToCart} disabled={isAdding}>
        {isAdding ? 'Añadiendo…' : 'Añadir'}
      </Button>

      {isToastVisible && status === REQUEST_STATUS.SUCCESS && <Toast variant="success" message="Producto añadido a la cesta." />}
      {isToastVisible && status === REQUEST_STATUS.ERROR && (
        <Toast variant="error" message="No se ha podido añadir el producto. Inténtalo de nuevo." />
      )}
    </Flex>
  );
}
