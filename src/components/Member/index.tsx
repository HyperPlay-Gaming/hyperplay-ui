import { Group, Stack } from '@mantine/core'
import classNames from 'classnames'

import Address from '../Address'
import Identicon from '../Identicon'
import styles from './Member.module.scss'

export interface MemberProps {
  member: string
  label?: string
  truncate: boolean
}

export function Member(props: MemberProps) {
  return (
    <Group wrap="nowrap">
      <Identicon value={props.member} />
      <Stack gap={0} style={{ flexGrow: 1 }}>
        <Address
          address={props.member}
          truncate={props.truncate}
          classNames={{ button: classNames('title-sm', styles.addressButton) }}
        />
        <div className={styles.label}>{props.label}</div>
      </Stack>
    </Group>
  )
}

Member.defaultProps = {
  truncate: false
}
