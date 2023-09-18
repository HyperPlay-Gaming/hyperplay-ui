import React, { HTMLProps } from 'react'

import AchievementCard, { AchievementCardProps } from '../AchievementCard'
import AchievementPageNav from '../AchievementPageNav'
import Button, { ButtonProps } from '../Button'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import Tabs from '../Tabs'
import styles from './AchievementSummaryTable.module.scss'

export interface Game extends AchievementCardProps {
  id: string
}

export type AchievementFilter = 'all' | 'new' | 'minted'

export interface GameAchievementsProps extends HTMLProps<HTMLDivElement> {
  games: Game[]
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
  ...rest
}: GameAchievementsProps) {
  const { handleNextPage, handlePrevPage, currentPage, totalPages } =
    paginationProps

  return (
    <div className={styles.container} {...rest}>
      <AchievementPageNav
        freeMints={10}
        basketAmount={0}
        nextButtonProps={{
          onClick: handleNextPage,
          disabled: currentPage === totalPages
        }}
        previousButtonProps={{
          onClick: handlePrevPage,
          disabled: currentPage === 1
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

            <Tabs.List type="outline" style={{ height: '50px' }}>
              <Tabs.Tab value="all">
                <div className="menu">{i18n.allFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="new">
                <div className="menu">{i18n.newFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="minted">
                <div className="menu">{i18n.mintedFilterLabel}</div>
              </Tabs.Tab>
            </Tabs.List>
          </div>
          <div>
            <Button
              type="secondary"
              size="medium"
              className={styles.mintButton}
              {...mintButtonProps}
            >
              {i18n.mintButtonLabel}
            </Button>
          </div>
        </div>

        <div className={styles.games}>
          {games.map(({ id, ...rest }) => (
            <AchievementCard key={id} {...rest} />
          ))}
        </div>
      </Tabs>
    </div>
  )
}
