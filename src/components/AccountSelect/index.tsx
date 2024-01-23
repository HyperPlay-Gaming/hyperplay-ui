import React, { useState } from 'react'

import {
  Anchor,
  Divider,
  Group,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core'
import * as Icon from 'tabler-icons-react'

import Item from '../Item'
import styles from './AccountSelect.module.scss'
import { Option } from './components/Option'

export interface AccountSelectProps {
  name: string
  value: string
  image?: string
  href: string
  onChange: (name: string) => void
  children: React.ReactNode
  style?: React.CSSProperties
}

export const AccountSelectContext = React.createContext({
  value: '',
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
  setValue: (value: string) => {}
})

export interface AccountSelectComponent extends React.FC<AccountSelectProps> {
  Option: typeof Option
}

const AccountSelect: AccountSelectComponent = (props: AccountSelectProps) => {
  const [opened, setOpened] = useState(false)

  const setValue = (value: string) => {
    setOpened(false)
    props.onChange(value)
  }

  return (
    <Popover
      width={324}
      radius={0}
      shadow="md"
      position="bottom-start"
      opened={opened}
      onClose={() => setOpened(false)}
      classNames={{ dropdown: styles.popoverBody }}
    >
      <Popover.Target>
        <button style={props.style} onClick={() => setOpened(!opened)}>
          <div>
            <Item name={props.name} image={props.image} />
            <Icon.CaretDown size={16} fill="currentColor" />
          </div>
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <div className={styles.popoverHeader}>
            <Title order={5}>My Accounts</Title>
          </div>
          <ScrollArea.Autosize className={styles.scrollArea}>
            <Stack className={styles.popoverList}>
              <AccountSelectContext.Provider
                value={{ value: props.value, setValue }}
              >
                {props.children}
              </AccountSelectContext.Provider>
            </Stack>
          </ScrollArea.Autosize>
          <div className={styles.popoverFooter}>
            <Divider style={{ marginBottom: 16 }} />
            <Anchor href={props.href}>
              <Group gap="sm">
                <Icon.CirclePlus
                  size={26}
                  fill="#5850EC"
                  className={styles.popoverFooterIcon}
                />
                <Text color="#5850EC">New Account</Text>
              </Group>
            </Anchor>
          </div>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

AccountSelect.Option = Option
export default AccountSelect
