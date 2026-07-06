import { Flex, Select as RadixSelect, Text } from '@radix-ui/themes';

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
  return (
    <Flex direction="column" gap="1">
      <Text as="label" size="2" weight="medium" color="gray">
        {label}
      </Text>
      <RadixSelect.Root value={String(value)} onValueChange={onChange} disabled={disabled} size="3">
        <RadixSelect.Trigger aria-label={label} />
        <RadixSelect.Content>
          {options.map((option) => (
            <RadixSelect.Item key={option.value} value={String(option.value)}>
              {option.label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>
    </Flex>
  );
}
