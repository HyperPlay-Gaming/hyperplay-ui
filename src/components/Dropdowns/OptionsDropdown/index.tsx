import React, { ReactElement } from 'react'

import { Menu } from '@mantine/core'

import Button from '../../Button'
import Checkbox from '../../Checkbox'
import GenericDropdown from '../GenericDropdown'
import styles from './OptionsDropdown.module.scss'

type OptionsType = { [key: string]: boolean }

interface OptionsDropdownProps {
  title: string
  options: OptionsType
  setOptions: React.Dispatch<React.SetStateAction<OptionsType>>
}

export default function OptionsDropdown(props: OptionsDropdownProps) {
  function selectOnly(onlyKey: string) {
    const updatedOptions: OptionsType = {}
    for (const opt in props.options) {
      updatedOptions[opt] = false
    }

    updatedOptions[onlyKey] = true

    props.setOptions((currentOptions) => ({
      ...currentOptions,
      ...updatedOptions
    }))
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const x: ReactElement<any>[] = []
  Object.keys(props.options).forEach((val, index) =>
    x.push(
      <Menu.Item
        closeMenuOnClick={false}
        key={`toggleItem${index}`}
        className={styles.menuItem}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Checkbox
            type="secondary"
            checked={props.options[val]}
            onChange={(ev) => {
              const updatedOption: OptionsType = {}
              updatedOption[val] = ev.target.checked
              props.setOptions((currentOptions) => ({
                ...currentOptions,
                ...updatedOption
              }))
            }}
          >
            <div
              className="body"
              style={{ paddingLeft: 'var(--space-2xs)', margin: 'auto 0px' }}
            >
              {val}
            </div>
          </Checkbox>
          <Button type="link" size="small" onClick={() => selectOnly(val)}>
            Only
          </Button>
        </div>
      </Menu.Item>
    )
  )

  function clearOptions() {
    const updatedOptions: OptionsType = {}
    for (const opt in props.options) {
      updatedOptions[opt] = false
    }
    props.setOptions((currentOptions) => ({
      ...currentOptions,
      ...updatedOptions
    }))
  }

  x.push(
    <Button type="tertiary" size="small" onClick={clearOptions}>
      <div className="button-sm">Clear filter</div>
    </Button>
  )

  return (
    <GenericDropdown
      menuItemsGap={'0px'}
      closeOnClickOutside={false}
      styles={{
        itemLabel: { color: 'var(--color-neutral-100)' },
        dropdown: {
          position: 'relative',
          top: '0px !important',
          left: '0px !important',
          transform: 'none'
        }
      }}
      target={
        <GenericDropdown.GenericButton
          text={props.title}
          style={{ width: '300px' }}
        ></GenericDropdown.GenericButton>
      }
    >
      {x}
    </GenericDropdown>
  )
}
