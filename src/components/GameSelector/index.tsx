import React, { useState } from 'react'

import { Menu } from '@mantine/core'
import classNames from 'classnames'

import TextInput from '../TextInput'
import ClickableGameItem from './components/ClickableGameItem'
import GameItem from './components/GameItem'
import styles from './index.module.scss'
import { GameDetails, GameSelectorProps } from './types'

export function GameSelector({
  isLoading,
  selectedGames,
  searchResultGames,
  onSearchInput,
  inputProps,
  menuProps,
  i18n = {
    selectGame: 'Select Game',
    selectUpTo: '(select up to 15 games)',
    searchForGames: 'Search for game(s)',
    loading: 'Loading...',
    emptySearchResults: 'Nothing found...'
  }
}: GameSelectorProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [opened, setOpened] = useState(false)
  const isEmptySearchString = inputRef.current?.value === ''

  const loadingState = (
    <div className={styles.messageContainer}>{i18n.loading}</div>
  )

  const emptySearchState = (
    <div className={styles.messageContainer}>{i18n.emptySearchResults}</div>
  )

  function getGameItems(games: GameDetails[], isClickable?: boolean) {
    // check undefined to satisfy smoke test
    if (games === undefined || games.length === 0) {
      return null
    }

    return games.map((val, index) => {
      const itemClasses: Record<string, boolean> = {}
      itemClasses[styles.underline] = index < games.length - 1
      if (isClickable) {
        const key = `clickable-${val.gameId}`
        return (
          <ClickableGameItem
            key={key}
            game={val}
            className={classNames(itemClasses)}
            data-testid={key}
          />
        )
      }

      return (
        <GameItem
          key={`selected-${val.gameId}`}
          game={val}
          className={classNames(itemClasses)}
        />
      )
    })
  }

  const selectedGamesElement = getGameItems(selectedGames)

  const labelNode = (
    <div className={styles.searchLabel}>
      <div className="caption">{i18n.selectGame}</div>
      <div className={styles.selectDetails}>{i18n.selectUpTo}</div>
    </div>
  )

  const gameItems = getGameItems(searchResultGames, true)
  const areSearchResultsEmpty = gameItems === null
  const isSearchResultsEmpty = areSearchResultsEmpty && !isEmptySearchString
  const searchResults = isSearchResultsEmpty ? emptySearchState : gameItems

  const target = (
    <TextInput
      ref={inputRef}
      placeholder={i18n.searchForGames}
      enterKeyHint="search"
      onChange={(ev) => onSearchInput(ev.target.value)}
      label={labelNode}
      data-autofocus="true"
      data-testid="search-input"
      {...inputProps}
    />
  )

  return (
    <div className={styles.selectorContainer}>
      <Menu
        opened={opened}
        onChange={setOpened}
        trapFocus={false}
        position="bottom-start"
        width={'target'}
        offset={8}
        {...menuProps}
      >
        <Menu.Target>{target}</Menu.Target>
        <Menu.Dropdown className={styles.menuDropdown}>
          {isLoading ? loadingState : searchResults}
        </Menu.Dropdown>
      </Menu>
      <div className={styles.selectedGamesContainer}>
        {selectedGamesElement}
      </div>
    </div>
  )
}
