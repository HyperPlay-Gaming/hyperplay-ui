import React, { HTMLProps, ReactNode } from 'react'

import cn from 'classnames'

import * as Images from '@/assets/images'

import AchievementNav, { AchievementNavProps } from '../AchievementNav'
import Button, { ButtonProps } from '../Button'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import Tabs from '../Tabs'
import styles from './AchievementSummaryTable.module.scss'

export type AchievementFilter = 'all' | 'new' | 'minted'

export interface GameAchievementsProps extends HTMLProps<HTMLDivElement> {
  games: ReactNode[]
  sortProps: DropdownProps
  paginationProps: {
    currentPage: number
    totalPages: number
    handleNextPage: () => void
    handlePrevPage: () => void
  }
  filterProps: {
    activeFilter: AchievementFilter
    setActiveFilter: (filter: AchievementFilter) => void
  }
  mintButtonProps?: ButtonProps
  i18n?: {
    allFilterLabel?: string
    newFilterLabel?: string
    mintedFilterLabel?: string
    mintButtonLabel?: string
  }
  achievementNavProps: AchievementNavProps
}

export default function AchievementSummaryTable({
  games,
  sortProps,
  paginationProps,
  filterProps,
  mintButtonProps,
  i18n = {
    allFilterLabel: 'All',
    newFilterLabel: 'New',
    mintedFilterLabel: 'Minted',
    mintButtonLabel: 'Mint'
  },
  achievementNavProps,
  ...rest
}: GameAchievementsProps) {
  const { handleNextPage, handlePrevPage, currentPage, totalPages } =
    paginationProps

  return (
    <div className={styles.container} {...rest}>
      <AchievementNav
        {...achievementNavProps}
        nextButtonProps={{
          onClick: handleNextPage,
          disabled: currentPage === totalPages
        }}
        previousButtonProps={{
          onClick: handlePrevPage,
          disabled: currentPage <= 1
        }}
      />
      <Tabs
        value={filterProps.activeFilter}
        onTabChange={filterProps.setActiveFilter}
      >
        <div className={styles.row}>
          <div className={styles.filters}>
            <Dropdown
              targetWidth="300"
              dropdownButtonDivProps={{
                className: 'text--md weight--regular'
              }}
              {...sortProps}
            />

            <Tabs.List type="outline">
              <Tabs.Tab value="all" className={styles.tab}>
                <div className="menu">{i18n.allFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="new" className={styles.tab}>
                <div className="menu">{i18n.newFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="minted" className={styles.tab}>
                <div className="menu">{i18n.mintedFilterLabel}</div>
              </Tabs.Tab>
            </Tabs.List>
          </div>
          <div>
            <Button
              type="secondary"
              size="medium"
              leftIcon={<Images.PlusCircleOutline width={16} height={16} />}
              spacing="xs"
              {...mintButtonProps}
              className={cn(styles.mintButton, mintButtonProps?.className)}
            >
              {i18n.mintButtonLabel}
            </Button>
          </div>
        </div>

        <div className={styles.games}>{games}</div>
      </Tabs>
    </div>
  )
}
