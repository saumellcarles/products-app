import { Flex, Portal, Text } from '@radix-ui/themes';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import styles from './Toast.module.scss';

const ICON_BY_VARIANT = {
  success: CheckCircledIcon,
  error: ExclamationTriangleIcon,
};

/**
 * Notificación flotante y autocontenida (no requiere un provider global).
 * Se monta en un Portal para no quedar recortada por contenedores con
 * `overflow: hidden` (p.ej. el shell de scroll de Layout).
 * @param {{ message: string, variant?: 'success' | 'error' }} props
 */
export function Toast({ message, variant = 'success' }) {
  const Icon = ICON_BY_VARIANT[variant];

  return (
    <Portal>
      <Flex align="center" gap="2" className={styles.toast} data-variant={variant} role="status">
        <Icon />
        <Text size="2" weight="medium">
          {message}
        </Text>
      </Flex>
    </Portal>
  );
}
