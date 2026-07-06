import { useState } from 'react';
import { Select } from '../../../../shared/components';
import styles from './ProductActions.module.scss';

const STORAGE_LABEL = 'Almacenamiento';

export function ProductActions({ product }) {
  const { storages } = product.options;
  const [selectedStorageCode, setSelectedStorageCode] = useState(storages[0].code);

  const storageOptions = storages.map(({ code, name }) => ({ value: code, label: name }));

  return (
    <div className={styles.actions}>
      <Select
        label={STORAGE_LABEL}
        options={storageOptions}
        value={selectedStorageCode}
        onChange={(value) => setSelectedStorageCode(Number(value))}
      />
    </div>
  );
}
