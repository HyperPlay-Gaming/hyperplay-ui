import { useState } from 'react'

import { Combobox, ComboboxProps, InputBase, useCombobox } from '@mantine/core'

import styles from './SelectCreatable.module.scss'

export interface SelectCreatableProps extends ComboboxProps {
  options: string[]
  onChange: (option: string) => void
  onCreated: (option: string) => void
}

export function SelectCreatable({
  options,
  onChange,
  onCreated,
  ...props
}: SelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const [data, setData] = useState(options)
  const [value, setValue] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const exactOptionMatch = data.some((item) => item === search)
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )

  const optionsElements = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current) => [...current, search])
          setValue(search)
          onCreated(search)
        } else {
          setValue(val)
          setSearch(val)
          onChange(val)
        }

        combobox.closeDropdown()
      }}
      classNames={{ dropdown: styles.dropdown, option: styles.option }}
      {...props}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown()
            combobox.updateSelectedOptionIndex()
            setSearch(event.currentTarget.value)
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown()
            setSearch(value || '')
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
          classNames={{ input: styles.input }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {optionsElements}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
