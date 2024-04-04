import React, { HTMLProps } from 'react'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './Loading.module.scss'

export default function Loading({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={classNames(styles.loadingSpinnerContainer, className)}
      {...props}
    >
      <FontAwesomeIcon
        size={'2x'}
        fill="var(--color-neutral-100)"
        icon={faSpinner}
        aria-label="Loading"
        className={styles.spinning}
      />
    </div>
  )
}
