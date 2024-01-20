import React, { useState } from 'react'

import { Menu } from '@mantine/core'
import classNames from 'classnames'

import TextInput from '../TextInput'
import ClickableGameItem from './components/ClickableGameItem'
import GameItem from './components/GameItem'
import styles from './index.module.scss'
import { GameDetails, GameSelectorProps } from './types'

export default function GameSelector({
  selectedGames,
  searchResultGames,
  onSearchInput,
  i18n = {
    selectGame: 'Select Game',
    selectUpTo: '(select up to 15 games)',
    searchForGames: 'Search for game(s)'
  }
}: GameSelectorProps) {
  const [opened, setOpened] = useState(false)

  function getGameItems(games: GameDetails[], isClickable?: boolean) {
    if (games.length === 0) {
      return null
    }

    return games.map((val, index) => {
      const itemClasses: Record<string, boolean> = {}
      itemClasses[styles.underline] = index < games.length - 1
      if (isClickable) {
        return (
          <ClickableGameItem
            key={`clickable-${val.gameId}`}
            game={val}
            className={classNames(itemClasses)}
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

  const searchResults = getGameItems(searchResultGames, true)

  const target = (
    <TextInput
      placeholder={i18n.searchForGames}
      enterKeyHint="search"
      onChange={(ev) => onSearchInput(ev.target.value)}
      label={labelNode}
      data-autofocus="true"
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
      >
        <Menu.Target>{target}</Menu.Target>
        <Menu.Dropdown className={styles.menuDropdown}>
          {searchResults}
        </Menu.Dropdown>
      </Menu>
      {selectedGamesElement}
    </div>
  )
}
