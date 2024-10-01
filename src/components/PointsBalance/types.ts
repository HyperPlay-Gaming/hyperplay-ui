import { HTMLProps } from 'react'

import { HoverCardProps } from '@mantine/core'

export interface PointsBalanceTranslations {
  totalClaimed?: string
}

export interface PointsBalanceProps extends HTMLProps<HTMLDivElement> {
  symbol: string
  name: string
  balance: string
  imageUrl?: string
  isGame7Credits?: boolean
  classNames?: {
    root?: string
  }
  i18n?: PointsBalanceTranslations
  cardProps?: HoverCardProps
}
