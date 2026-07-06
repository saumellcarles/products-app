import { Badge, Flex, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useCart } from '../../../features/cart';
import { Breadcrumb } from '../../../shared/components';
import { ROUTES } from '../../../shared/constants/routes.js';
import { useBreadcrumbItems } from '../hooks/useBreadcrumbItems.js';
import styles from './Header.module.scss';

export function Header() {
  const { itemCount } = useCart();
  const breadcrumbItems = useBreadcrumbItems();

  return (
    <header className={styles.header}>
      <Flex align="center" justify="between" wrap="wrap" gap="3">
        <Link to={ROUTES.PRODUCT_LIST} className={styles.brand} aria-label="Ir a la lista de productos">
          <Flex align="center" gap="2">
            <Text size="5" aria-hidden="true">
              📱
            </Text>
            <Text size="5" weight="bold">
              Products App
            </Text>
          </Flex>
        </Link>

        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <Flex align="center" gap="2" aria-label={`Productos en la cesta: ${itemCount}`}>
          <Text size="5" aria-hidden="true">
            🛒
          </Text>
          <Badge color="indigo" radius="full" size="2">
            {itemCount}
          </Badge>
        </Flex>
      </Flex>
    </header>
  );
}
