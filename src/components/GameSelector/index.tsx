import React, { useState } from 'react'

import { Menu } from '@mantine/core'

import TextInput from '../TextInput'
import GameItem from './components/GameItem'
import styles from './index.module.scss'
import { GameSelectorProps } from './types'

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

  let selectedGamesElement = null
  if (selectedGames.length > 0) {
    selectedGamesElement = selectedGames.map((val) => (
      <GameItem key={val.title} game={val} />
    ))
  }

  const labelNode = (
    <div className={styles.searchLabel}>
      <div className="caption">{i18n.selectGame}</div>
      <div className={styles.selectDetails}>{i18n.selectUpTo}</div>
    </div>
  )

  let searchResults = null
  if (searchResultGames.length > 0) {
    searchResults = searchResultGames.map((val) => (
      <GameItem key={val.title} game={val} />
    ))
  }

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
    <div>
      <Menu
        opened={opened}
        onChange={setOpened}
        trapFocus={false}
        position="bottom-start"
        width={'target'}
        offset={0}
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
