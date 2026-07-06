import { useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { Button, Select } from '../../../../shared/components';
import { REQUEST_STATUS } from '../../../../shared/constants/request-status.js';
import { useAddToCart } from '../../../cart';

const STORAGE_LABEL = 'Almacenamiento';
const COLOR_LABEL = 'Color';

export function ProductActions({ product }) {
  const { storages, colors } = product.options;
  const [selectedStorageCode, setSelectedStorageCode] = useState(storages[0].code);
  const [selectedColorCode, setSelectedColorCode] = useState(colors[0].code);
  const { addToCart, status } = useAddToCart();

  const storageOptions = storages.map(({ code, name }) => ({ value: code, label: name }));
  const colorOptions = colors.map(({ code, name }) => ({ value: code, label: name }));
  const isAdding = status === REQUEST_STATUS.LOADING;

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

      {status === REQUEST_STATUS.SUCCESS && <Text color="green">Producto añadido a la cesta.</Text>}
      {status === REQUEST_STATUS.ERROR && <Text color="red">No se ha podido añadir el producto. Inténtalo de nuevo.</Text>}
    </Flex>
  );
}
