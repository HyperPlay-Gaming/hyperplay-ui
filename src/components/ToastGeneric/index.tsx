import React, { ReactElement } from 'react'

import classNames from 'classnames'

import { CloseButton } from '@/assets/images'

import styles from './ToastGeneric.module.scss'

export interface ToastGenericPropsAbstract {
  title: string
  subtext: string
  onClick: () => void
  showCloseButton?: boolean
  classNames?: {
    image?: string
  }
}

export interface ToastGenericProps extends ToastGenericPropsAbstract {
  image: ReactElement | null
}

export function ToastGeneric(props: ToastGenericProps) {
  return (
    <div className={styles.txnPending}>
      <div
        className={classNames(styles.imageContainer, props.classNames?.image)}
      >
        {props.image}
      </div>
      <div className={styles.infoContainer}>
        <div className={classNames('title', styles.txnTitle)}>
          {props.title}
        </div>
        <div className="body color-neutral-100">{props.subtext}</div>
      </div>
      {props.showCloseButton ? (
        <div
          style={{ width: '24px', cursor: 'pointer' }}
          onClick={props.onClick}
        >
          <CloseButton />
        </div>
      ) : null}
    </div>
  )
}
