import { Callout, Flex } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '../Button/Button.jsx';

/**
 * @param {{ message?: string, onRetry?: () => void }} props
 */
export function ErrorState({ message = 'Ha ocurrido un error inesperado.', onRetry }) {
  return (
    <Flex direction="column" align="start" gap="3" p="6" role="alert">
      <Callout.Root color="red" size="2">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>{message}</Callout.Text>
      </Callout.Root>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </Flex>
  );
}
