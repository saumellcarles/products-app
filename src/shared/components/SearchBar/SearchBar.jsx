import { useId } from 'react';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

/**
 * @param {{ label: string, value: string, onChange: (value: string) => void, placeholder?: string }} props
 */
export function SearchBar({ label, value, onChange, placeholder }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <TextField.Root
        id={id}
        type="search"
        size="3"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
