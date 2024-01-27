import React from 'react'

import classNames from 'classnames'

import Identicon from '../Identicon'
import styles from './Activity.module.scss'

export interface ActivityProps {
  sender: string
  href: string
  children?: React.ReactNode
  i18n?: {
    viewTransaction?: string
  }
}

export default function Activity({
  i18n = { viewTransaction: 'view transaction' },
  ...props
}: ActivityProps) {
  return (
    <div className={styles.container}>
      <Identicon value={props.sender} />
      <div className={styles.contentContainer}>
        <div className={classNames('menu', styles.text)}>{props.children}</div>
        <a
          className={classNames('caption-sm', styles.link)}
          href={props.href}
          target="_blank"
          rel="noreferrer"
        >
          {i18n.viewTransaction}
        </a>
      </div>
    </div>
  )
}
