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
    <div className={styles.container}>
      <Identicon value={props.member} />
      <div className={styles.textContainer}>
        <Address
          address={props.member}
          truncate={props.truncate}
          classNames={{ button: classNames('title-sm', styles.addressButton) }}
        />
        <div className={styles.label}>{props.label}</div>
      </div>
    </div>
  )
}

Member.defaultProps = {
  truncate: false
}
