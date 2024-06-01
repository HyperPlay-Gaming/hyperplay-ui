import React, { ReactElement } from 'react'

import cn from 'classnames'

import useAllImagesLoaded from '@/utils/useAllImagesLoaded'

import MessageModal, {
  MessageModalProps
} from '../AchievementSummaryTable/components/MessageModal'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import Loading from '../Loading'
import { Tabs, getTabsClassNames } from '../Tabs'
import styles from './index.module.scss'

export type QuestFilter = 'all' | 'new' | 'minted'

export interface GameSummaryTab {
  label: string
  value: string
}

export interface QuestsSummaryTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  games: ReactElement[]
  imagesToPreload: string[]
  sortProps: DropdownProps
  filterProps: {
    activeFilter: QuestFilter
    setActiveFilter: (filter: QuestFilter) => void
  }
  //   i18n?: {
  //     active?: string
  //     claimReady?: string
  //     completed?: string
  //   }
  isFetching?: boolean
  hasFetchedAll?: boolean
  fetchNextPage?: () => void
  isPageLoading?: boolean
  tabs: GameSummaryTab[]
  messageModalProps: MessageModalProps
  activeTab: string
}

/**
 * The main achievement summary card page
 * TODO: Refactor into smaller components
 */
export function QuestsSummaryTable({
  games,
  imagesToPreload,
  sortProps,
  filterProps,
  //   i18n = {
  //     active: 'Active',
  //     claimReady: 'Claim Ready',
  //     completed: 'Completed'
  //   },
  isFetching,
  hasFetchedAll,
  fetchNextPage,
  className: classNameProp,
  isPageLoading,
  tabs,
  messageModalProps,
  activeTab,
  ...rest
}: QuestsSummaryTableProps) {
  const fetchMoreOnBottomReached: React.UIEventHandler<HTMLDivElement> = (
    ev: React.UIEvent<HTMLElement>
  ) => {
    const { scrollHeight, scrollTop, clientHeight } =
      ev.target as HTMLDivElement

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    if (
      distanceFromBottom < 5000 &&
      !isFetching &&
      !hasFetchedAll &&
      fetchNextPage !== undefined
    ) {
      fetchNextPage()
    }
  }

  const cardsLoaded = useAllImagesLoaded(imagesToPreload)

  const gamesComponent = <div className={styles.gamesTable}>{games}</div>
  let content = null
  if (isPageLoading || !cardsLoaded) {
    content = <Loading />
  } else if (isFetching) {
    content = (
      <>
        {gamesComponent}
        <Loading />
      </>
    )
  } else if (games === undefined || games === null || games.length === 0) {
    content = (
      <MessageModal
        title={messageModalProps.title}
        message={messageModalProps.message}
        className={styles.messageModal}
      />
    )
  } else {
    content = gamesComponent
  }

  return (
    <div className={cn(styles.container, classNameProp)} {...rest}>
      <div className={styles.topBar}>
        <Tabs
          value={activeTab}
          onChange={(filter) =>
            filterProps.setActiveFilter(filter as QuestFilter)
          }
          mah={'100%'}
          className={styles.secondTopRowContainer}
          classNames={getTabsClassNames({}, { tab: 'secondary' })}
        >
          <div className={styles.row}>
            <div className={styles.filters}>
              <Dropdown
                targetWidth={300}
                dropdownButtonDivProps={{
                  className: `text--lg weight--regular body-sm color-neutral-100`
                }}
                {...sortProps}
              />
            </div>
          </div>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab
                value={tab.value}
                key={tab.value}
                className={styles.tab}
              >
                <div className="menu-item">{tab.label}</div>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>
      <div className={styles.games} onScroll={fetchMoreOnBottomReached}>
        {content}
      </div>
    </div>
  )
}
