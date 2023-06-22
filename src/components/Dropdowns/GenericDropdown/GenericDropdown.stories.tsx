import React from 'react'

import { Menu } from '@mantine/core'

import GenericDropdown from '.'
import Toggle from '../../Toggle'

export default {
  title: 'Dropdowns/Generic Dropdown',
  component: GenericDropdown
}

const data = [
  { text: 'Token required' },
  { text: 'Installed' },
  { text: 'Show hidden' },
  { text: 'Show non-available' }
]
export const Default = () => {
  return (
    <GenericDropdown
      target={
        <GenericDropdown.GenericButton
          text={'test'}
          style={{ width: '300px' }}
        ></GenericDropdown.GenericButton>
      }
    >
      {data.map((val, index) => (
        <Menu.Item closeMenuOnClick={false} key={`toggleItem${index}`}>
          <Toggle labelPosition="right">
            <div
              className="body"
              style={{ paddingLeft: 'var(--space-sm)', margin: 'auto 0px' }}
            >
              {val.text}
            </div>
          </Toggle>
        </Menu.Item>
      ))}
    </GenericDropdown>
  )
}
