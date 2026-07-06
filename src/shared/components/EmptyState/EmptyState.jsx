import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

/**
 * @param {{ message?: string }} props
 */
export function EmptyState({ message = 'No se han encontrado resultados.' }) {
  return (
    <Callout.Root color="gray" size="2">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
}
