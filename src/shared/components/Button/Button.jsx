import { Button as RadixButton } from '@radix-ui/themes';

const VARIANT_TO_RADIX_VARIANT = {
  primary: 'solid',
  secondary: 'soft',
};

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
    <RadixButton
      type={type}
      variant={VARIANT_TO_RADIX_VARIANT[variant]}
      disabled={disabled}
      onClick={onClick}
      size="3"
      {...rest}
    >
      {children}
    </RadixButton>
  );
}
