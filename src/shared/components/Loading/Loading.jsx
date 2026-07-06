import { Flex, Spinner, Text } from '@radix-ui/themes';

export function Loading({ label = 'Cargando…' }) {
  return (
    <Flex direction="column" align="center" gap="3" p="8" role="status" aria-live="polite">
      <Spinner size="3" />
      <Text color="gray">{label}</Text>
    </Flex>
  );
}
