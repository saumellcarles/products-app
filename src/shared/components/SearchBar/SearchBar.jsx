import { useId } from 'react';
import styles from './SearchBar.module.scss';

/**
 * @param {{ label: string, value: string, onChange: (value: string) => void, placeholder?: string }} props
 */
export function SearchBar({ label, value, onChange, placeholder }) {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
