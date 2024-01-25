import { useContext } from 'react'

import { IconCheck } from '@tabler/icons-react'

import Item, { ItemProps } from '../../../Item'
import { AccountSelectContext } from '../../index'
import styles from './Option.module.scss'

export interface OptionProps extends ItemProps {
  value: string
}

export function Option(props: OptionProps) {
  const { value, setValue } = useContext(AccountSelectContext)

  return (
    <button onClick={() => setValue(props.value)}>
      <div className={styles.container}>
        <Item {...props} />
        {value === props.value ? (
          <IconCheck className={styles.checkmark} />
        ) : null}
      </div>
    </button>
  )
}
