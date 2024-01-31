import classNames from 'classnames'

import Address from '../Address'
import Identicon from '../Identicon'
import styles from './Member.module.scss'

export interface MemberProps {
  member: string
  label?: string
  truncate?: boolean
}

export function Member({ member, label, truncate = false }: MemberProps) {
  return (
    <div className={styles.container}>
      <Identicon value={member} />
      <div className={styles.textContainer}>
        <Address
          address={member}
          truncate={truncate}
          classNames={{ button: classNames('title-sm', styles.addressButton) }}
        />
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}