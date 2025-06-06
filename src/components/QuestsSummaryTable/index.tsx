import React, { ReactElement } from 'react'

import cn from 'classnames'

import useAllImagesLoaded from '@/utils/useAllImagesLoaded'

import MessageModal, {
  MessageModalProps
} from '../AchievementSummaryTable/components/MessageModal'
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
  filterProps: {
    activeFilter: QuestFilter
    setActiveFilter: (filter: QuestFilter) => void
  }
  isFetching?: boolean
  hasFetchedAll?: boolean
  fetchNextPage?: () => void
  onScrollList?: (env: React.UIEvent<HTMLElement>) => void
  isPageLoading?: boolean
  tabs: GameSummaryTab[]
  messageModalProps: MessageModalProps
  activeTab: string
  pageTitle: string
  listContainerId?: string
  classNames?: {
    title?: string
    list?: string
    gamesTable?: string
  }
  searchBar?: React.JSX.Element
}

export function QuestsSummaryTable({
  games,
  imagesToPreload,
  filterProps,
  isFetching,
  hasFetchedAll,
  fetchNextPage,
  onScrollList,
  className: classNameProp,
  isPageLoading,
  tabs,
  messageModalProps,
  activeTab,
  pageTitle,
  classNames,
  searchBar,
  listContainerId,
  ...rest
}: QuestsSummaryTableProps) {
  const fetchMoreOnBottomReached: React.UIEventHandler<HTMLDivElement> = (
    ev: React.UIEvent<HTMLElement>
  ) => {
    const { scrollHeight, scrollTop, clientHeight } =
      ev.target as HTMLDivElement

    onScrollList?.(ev)

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

  const gamesComponent = (
    <div className={cn(styles.gamesTable, classNames?.gamesTable)}>{games}</div>
  )
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
      <h5 className={cn(styles.title, classNames?.title)}>{pageTitle}</h5>
      <div className={styles.topBar}>
        <Tabs
          value={activeTab}
          onChange={(filter) =>
            filterProps.setActiveFilter(filter as QuestFilter)
          }
          mah={'100%'}
          className={styles.secondTopRowContainer}
          classNames={getTabsClassNames({}, { list: 'outline' })}
        >
          {tabs.length > 0 ? (
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
          ) : null}
          {searchBar}
        </Tabs>
      </div>
      <div
        className={cn(styles.games, classNames?.list)}
        id={listContainerId}
        onScroll={fetchMoreOnBottomReached}
      >
        {content}
      </div>
    </div>
  )
}
