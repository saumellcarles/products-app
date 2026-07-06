import { useId } from 'react';
import { IconButton, TextField } from '@radix-ui/themes';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

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
        type="text"
        size="3"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        {value && (
          <TextField.Slot>
            <IconButton size="1" variant="ghost" color="gray" aria-label="Borrar búsqueda" onClick={() => onChange('')}>
              <Cross2Icon height="14" width="14" />
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>
    </div>
  );
}
