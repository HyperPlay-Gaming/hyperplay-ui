import React, { ReactNode, useState } from 'react'

import cn from 'classnames'

import { ArrowTop, DownArrow } from '@/assets/images'

import styles from './RewardDepositTokensList.module.scss'

function Row({
  children,
  className
}: {
  children?: ReactNode
  className?: string
}) {
  return <div className={cn(styles.rowBase, className)}>{children}</div>
}

interface Props {
  children?: ReactNode
  tokenCount: number
  visibleByDefault?: boolean
  i18n?: {
    addedTokenCounterText: string
    collapseAllIds: string
  }
}

function RewardDepositTokenList({
  children,
  visibleByDefault = false,
  tokenCount,
  i18n = {
    addedTokenCounterText: 'IDs added:',
    collapseAllIds: 'Collapse all IDs'
  }
}: Props) {
  const [showTokenIds, setShowTokenIds] = useState(visibleByDefault)

  const onShowToken = () => {
    setShowTokenIds((prev) => !prev)
  }

  return (
    <div className={styles.tokensAddedContainer}>
      <div className={styles.tokensAddedActionsContainer}>
        <span>
          {i18n.addedTokenCounterText} {tokenCount}
        </span>

        <button onClick={onShowToken} className={styles.tokensAddedActions}>
          <span>{i18n.collapseAllIds}</span>
          {showTokenIds ? (
            <DownArrow className={styles.arrowDownIcon} />
          ) : (
            <ArrowTop className={styles.arrowTopIcon} />
          )}
        </button>
      </div>
      {showTokenIds && <div className={styles.tokensAddedList}>{children}</div>}
    </div>
  )
}

RewardDepositTokenList.Row = Row

export default RewardDepositTokenList
