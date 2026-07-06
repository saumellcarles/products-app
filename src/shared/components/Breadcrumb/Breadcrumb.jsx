import { Link as RouterLink } from 'react-router-dom';
import { Flex, Link as RadixLink, Text } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';

const SEPARATOR_STYLE = { color: 'var(--gray-8)' };

/**
 * @param {{ items: Array<{ label: string, to?: string }> }} props
 * El último elemento de `items` se renderiza como la página actual (sin enlace).
 */
export function Breadcrumb({ items }) {
  return (
    <Flex asChild align="center" gap="2" wrap="wrap">
      <nav aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <Flex key={item.label} align="center" gap="2">
              {isCurrentPage || !item.to ? (
                <Text size="2" color="gray" aria-current={isCurrentPage ? 'page' : undefined}>
                  {item.label}
                </Text>
              ) : (
                <RadixLink asChild size="2" color="gray">
                  <RouterLink to={item.to}>{item.label}</RouterLink>
                </RadixLink>
              )}
              {!isCurrentPage && <ChevronRightIcon aria-hidden="true" style={SEPARATOR_STYLE} />}
            </Flex>
          );
        })}
      </nav>
    </Flex>
  );
}
