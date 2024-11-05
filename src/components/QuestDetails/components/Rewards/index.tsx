import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export const defaultI18n = {
  rewards: 'Claimable Rewards'
}

export interface RewardsProps extends HTMLProps<HTMLDivElement> {
  numClaimed?: number
  numTotal?: number
    i18n?: typeof defaultI18n
}

export default function Rewards({
  numClaimed,
  numTotal,
  i18n = defaultI18n,
  children,
  className,
  ...props
}: RewardsProps) {
  let numClaimedComponent = null
  if (numClaimed !== undefined && numTotal !== undefined) {
    numClaimedComponent = (
      <div className={classNames('button', styles.claimedContainer)}>
        <div className={styles.numClaimed}>{numClaimed}</div>
        <div className={styles.numTotal}>/</div>
        <div className={styles.numTotal}>{numTotal}</div>
      </div>
    )
  }
  return (
    <div className={classNames(styles.rewardsContainer, className)} {...props}>
      <div className={styles.titleBar}>
        <div className={classNames('body-sm', styles.rewardTitle)}>
          {i18n.rewards}
        </div>
        {numClaimedComponent}
      </div>
      <div className={styles.separator}></div>
      <div>{children}</div>
    </div>
  )
}
