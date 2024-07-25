import { HTMLProps } from 'react'

import { decimalUnits, formatLargeNumber } from '@hyperplay/utils'
import { HoverCard } from '@mantine/core'
import cn from 'classnames'

import FallbackPoints from '@/assets/FallbackPoints.png'
import G7Credits from '@/assets/G7Credits.png'

import styles from './index.module.scss'

export interface PointsBalanceProps extends HTMLProps<HTMLDivElement> {
  symbol: string
  name: string
  balance: string
  imageUrl?: string
  isGame7Credits?: boolean
  classNames?: {
    root?: string
  }
  i18n?: {
    totalClaimed?: string
  }
}

export function PointsBalance({
  className,
  classNames,
  imageUrl,
  name,
  symbol,
  balance,
  isGame7Credits,
  i18n,
  ...rest
}: PointsBalanceProps) {
  balance = formatLargeNumber(balance, decimalUnits, 2)
  let imgUrl = FallbackPoints
  if (isGame7Credits) {
    imgUrl = G7Credits
    symbol = 'G7C'
    name = 'Game7 Credits'
  }
  if (imageUrl) {
    imgUrl = imageUrl
  }

  let totalClaimedText = `Total ${name} claimed in this game.`
  if (i18n?.totalClaimed) {
    totalClaimedText = i18n.totalClaimed
  }
  return (
    <HoverCard
      withArrow
      arrowPosition="center"
      position="bottom"
      width={344}
      classNames={{ dropdown: styles.dropdown, arrow: styles.arrow }}
    >
      <HoverCard.Target>
        <div className={cn(styles.root, className, classNames?.root)} {...rest}>
          <img className={styles.image} src={imgUrl} />
          <div className={cn(styles.textContainer)}>
            <div
              className={cn('title-sm', styles.title)}
            >{`${balance} ${symbol}`}</div>
            <div className={cn('menu-item', styles.name)}>{name}</div>
          </div>
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <div className="menu-item">{totalClaimedText}</div>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
