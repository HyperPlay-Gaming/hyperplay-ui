import React, { HTMLProps } from 'react'

import { Tooltip } from '@mantine/core'

import Sticker from '@/components/Sticker'

import styles from './index.module.scss'

export interface RewardsRowProps extends HTMLProps<HTMLDivElement> {
  category: string
  tooltip?: string
}

export function RewardsRow({
  category,
  tooltip,
  children,
  ...props
}: RewardsRowProps) {
  let tooltipComponent = null
  if (tooltip) {
    tooltipComponent = (
      <Tooltip
        label={tooltip}
        position="bottom"
        withArrow
        classNames={{ tooltip: styles.tooltip }}
        multiline
      >
        <div className={styles.letterI}>i</div>
      </Tooltip>
    )
  }
  return (
    <div className={styles.rewardsRowContainer} {...props}>
      <Sticker
        styleType="secondary"
        variant="outlined"
        className={styles.sticker}
      >
        {category}
        {tooltipComponent}
      </Sticker>
      <div className={styles.rewardItemsContainer}>{children}</div>
    </div>
  )
}
