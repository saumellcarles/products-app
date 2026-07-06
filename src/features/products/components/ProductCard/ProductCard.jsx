import { Link } from 'react-router-dom';
import { Badge, Card, Flex, Heading, Inset, Text } from '@radix-ui/themes';
import { ImageWithFallback } from '../../../../shared/components';
import { buildProductDetailsPath } from '../../../../shared/constants/routes.js';
import { formatPrice } from '../../utils/format-price.js';
import styles from './ProductCard.module.scss';

export function ProductCard({ product }) {
  const { id, brand, model, price, imgUrl } = product;

  return (
    <Card asChild size="2">
      <Link to={buildProductDetailsPath(id)}>
        <Inset side="top" pb="current">
          <div className={styles.imageWrapper}>
            <ImageWithFallback src={imgUrl} alt={`${brand} ${model}`} className={styles.image} />
          </div>
        </Inset>

        <Flex direction="column" gap="1" pt="3">
          <Text size="1" color="gray" truncate>
            {brand}
          </Text>
          <Heading as="h3" size="3" truncate>
            {model}
          </Heading>
          <Badge color="indigo" size="2" mt="1">
            {formatPrice(price)}
          </Badge>
        </Flex>
      </Link>
    </Card>
  );
}
