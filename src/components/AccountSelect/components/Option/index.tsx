import { useContext } from 'react'

import { Group, UnstyledButton } from '@mantine/core'
import * as Icon from 'tabler-icons-react'

import Item from '../../../Item'
import { AccountSelectContext } from '../../index'

export interface OptionProps {
  name: string
  value: string
  image?: string
  label?: string
}

export function Option(props: OptionProps) {
  const { value, setValue } = useContext(AccountSelectContext)

  return (
    <UnstyledButton onClick={() => setValue(props.value)}>
      <Group justify="apart">
        <Item {...props} />
        {value === props.value && <Icon.Check color="#669F2A" />}
      </Group>
    </UnstyledButton>
  )
}
