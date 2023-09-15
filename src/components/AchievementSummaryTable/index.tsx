import React, { HTMLProps } from 'react'

import AchievementCard, { AchievementCardProps } from '../AchievementCard'
// import AchievementPageNav from '../AchievementPageNav'
import Button from '../Button'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import Tabs from '../Tabs'
import styles from './AchievementSummaryTable.module.scss'

interface Game extends AchievementCardProps {
  id: string
}

export interface GameAchievementsProps extends HTMLProps<HTMLDivElement> {
  allFilterLabel?: string
  newFilterLabel?: string
  mintedFilterLabel?: string
  mintButtonLabel?: string
  games: Game[]
  sortProps: DropdownProps
  paginationProps: {
    currentPage: number
    totalPages: number
    handleNextPage: () => void
    handlePrevPage: () => void
  }
}

export default function AchievementSummaryTable({
  allFilterLabel = 'All',
  newFilterLabel = 'New',
  mintedFilterLabel = 'Minted',
  mintButtonLabel = 'Mint',
  games,
  sortProps,
  paginationProps,
  ...rest
}: GameAchievementsProps) {
  return (
    <div className={styles.container} {...rest}>
      {/* <AchievementPageNav
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
      /> */}
      <Tabs defaultValue="all">
        <div className={styles.row}>
          <div className={styles.filters}>
            <Dropdown
              targetWidth="300"
              dropdownButtonDivProps={{
                className: 'title-sm'
              }}
              {...sortProps}
            />

            <Tabs.List type="outline" style={{ height: '50px' }}>
              <Tabs.Tab value="all">
                <div className="menu">{allFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="new">
                <div className="menu">{newFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="minted">
                <div className="menu">{mintedFilterLabel}</div>
              </Tabs.Tab>
            </Tabs.List>
          </div>
          <div>
            <Button type="secondary" size="medium">
              {mintButtonLabel}
            </Button>
          </div>
        </div>

        <Tabs.Panel value="all" className={styles.games}>
          {games.map(({ id, ...rest }) => (
            <AchievementCard key={id} {...rest} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="new">
          <div>Tab 2</div>
        </Tabs.Panel>
        <Tabs.Panel value="minted">
          <div>Tab 3</div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
