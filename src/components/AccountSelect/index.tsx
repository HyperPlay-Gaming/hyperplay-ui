import React, { useState } from 'react'

import { Divider, Popover } from '@mantine/core'
import classNames from 'classnames'
import * as Icon from 'tabler-icons-react'

import Button from '../Button'
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
  i18n?: {
    myAccounts?: string
    newAccount?: string
  }
}

export const AccountSelectContext = React.createContext({
  value: '',
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function*/
  setValue: (value: string) => {}
})

export interface AccountSelectComponent extends React.FC<AccountSelectProps> {
  Option: typeof Option
}

const AccountSelect: AccountSelectComponent = ({
  i18n = { myAccounts: 'My Accounts', newAccount: 'New Account' },
  ...props
}: AccountSelectProps) => {
  const [opened, setOpened] = useState(false)

  const setValue = (value: string) => {
    setOpened(false)
    props.onChange(value)
  }

  return (
    <Popover
      position="bottom-start"
      opened={opened}
      onClose={() => setOpened(false)}
      classNames={{ dropdown: styles.popoverDropdown }}
      offset={20}
    >
      <Popover.Target>
        <button
          style={props.style}
          onClick={() => setOpened(!opened)}
          className={styles.targetButton}
        >
          <Item name={props.name} image={props.image} />
          <Icon.CaretDown size={16} fill="currentColor" />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={classNames('menu', styles.popoverHeader)}>
          {i18n.myAccounts}
        </div>
        <div className={styles.scrollArea}>
          <AccountSelectContext.Provider
            value={{ value: props.value, setValue }}
          >
            {props.children}
          </AccountSelectContext.Provider>
        </div>
        <Divider style={{ marginBottom: 16 }} />
        <div className={styles.link}>
          <a href={props.href}>
            <Button
              type="link"
              leftIcon={
                <Icon.CirclePlus size={26} className={styles.circleIcon} />
              }
              className={styles.linkButton}
            >
              <div className="caption">{i18n.newAccount}</div>
            </Button>
          </a>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

AccountSelect.Option = Option
export default AccountSelect
