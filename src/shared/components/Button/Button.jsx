import styles from './Button.module.scss';

/**
 * @param {{
 *   children: import('react').ReactNode,
 *   variant?: 'primary' | 'secondary',
 *   type?: 'button' | 'submit',
 *   disabled?: boolean,
 *   onClick?: () => void,
 * }} props
 */
export function Button({ children, variant = 'primary', type = 'button', disabled = false, onClick, ...rest }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
