import { useId } from 'react';
import styles from './Select.module.scss';

/**
 * @param {{
 *   label: string,
 *   options: Array<{ value: string | number, label: string }>,
 *   value: string | number,
 *   onChange: (value: string) => void,
 *   disabled?: boolean,
 * }} props
 */
export function Select({ label, options, value, onChange, disabled = false }) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
