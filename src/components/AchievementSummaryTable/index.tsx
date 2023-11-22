import React, { ReactElement } from 'react'

import cn from 'classnames'

import * as Images from '@/assets/images'
import useAllImagesLoaded from '@/utils/useAllImagesLoaded'

import AchievementNav, { AchievementNavProps } from '../AchievementNav'
import Button, { ButtonProps } from '../Button'
import { Dropdown } from '../Dropdowns'
import { DropdownProps } from '../Dropdowns/Dropdown'
import Loading from '../Loading'
import Tabs from '../Tabs'
import styles from './AchievementSummaryTable.module.scss'
import MessageModal, { MessageModalProps } from './components/MessageModal'

export type AchievementFilter = 'all' | 'new' | 'minted'

export interface GameSummaryTab {
  label: string
  value: string
}

export interface AchievementSummaryTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  games: ReactElement[]
  imagesToPreload: string[]
  sortProps: DropdownProps
  paginationProps: {
    handleNextPage: () => void
    handlePrevPage: () => void
  }
  filterProps: {
    activeFilter: AchievementFilter
    setActiveFilter: (filter: AchievementFilter) => void
  }
  mintButtonProps?: ButtonProps & { totalToMint: number }
  updateButtonProps?: ButtonProps & { totalToUpdate: number }
  i18n?: {
    mintButtonLabel?: string
    updateButtonLabel?: string
  }
  achievementNavProps: AchievementNavProps
  isFetching?: boolean
  hasFetchedAll?: boolean
  fetchNextPage?: () => void
  isPageLoading?: boolean
  tabs: GameSummaryTab[]
  messageModalProps: MessageModalProps
}

/**
 * The main achievement summary card page
 * TODO: Refactor into smaller components
 */
export default function AchievementSummaryTable({
  games,
  imagesToPreload,
  sortProps,
  paginationProps,
  filterProps,
  mintButtonProps,
  updateButtonProps,
  i18n = {
    mintButtonLabel: 'Mint',
    updateButtonLabel: 'Update'
  },
  achievementNavProps,
  isFetching,
  hasFetchedAll,
  fetchNextPage,
  className: classNameProp,
  isPageLoading,
  tabs,
  messageModalProps,
  ...rest
}: AchievementSummaryTableProps) {
  const { handleNextPage, handlePrevPage } = paginationProps
  const { totalToMint, ...mintProps } = mintButtonProps ?? {}
  const { totalToUpdate, ...updateProps } = updateButtonProps ?? {}

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
        <AchievementNav
          {...achievementNavProps}
          nextButtonProps={{
            onClick: handleNextPage
          }}
          previousButtonProps={{
            onClick: handlePrevPage
          }}
          showGameAddButton={false}
        />
        <Tabs
          value={filterProps.activeFilter}
          onChange={(filter) => filterProps.setActiveFilter(filter as AchievementFilter)}
          mah={'100%'}
          className={styles.secondTopRowContainer}
        >
          <div className={styles.row}>
            <div className={styles.filters}>
              <Dropdown
                targetWidth="300"
                dropdownButtonDivProps={{
                  className: `text--lg weight--regular`
                }}
                dropdownButtonProps={{ className: styles.dropdownSort }}
                {...sortProps}
              />

              <Tabs.List type="outline">
                {tabs.map((tab) => (
                  <Tabs.Tab
                    value={tab.value}
                    key={tab.value}
                    className={styles.tab}
                  >
                    <div className="menu">{tab.label}</div>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </div>
            <div className={styles.ctas}>
              <Button
                type="secondary"
                size="medium"
                leftIcon={<Images.PlusCircleOutline width={16} height={16} />}
                spacing="xs"
                rightIcon={
                  <div className={cn(styles.rightIcon, styles.mint)}>
                    {totalToMint ?? 0}
                  </div>
                }
                {...mintProps}
              >
                {i18n.mintButtonLabel}
              </Button>
              <Button
                type="alert"
                size="medium"
                leftIcon={<Images.Update width={16} height={16} />}
                spacing="xs"
                rightIcon={
                  <div className={cn(styles.rightIcon, styles.update)}>
                    {totalToUpdate ?? 0}
                  </div>
                }
                {...updateProps}
              >
                {i18n.updateButtonLabel}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
      <div className={styles.games} onScroll={fetchMoreOnBottomReached}>
        {content}
      </div>
    </div>
  )
}
