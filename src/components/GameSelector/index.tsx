import React, { useState } from 'react'

import { GenericDropdown } from '../Dropdowns'
import TextInput from '../TextInput'
import GameItem from './components/GameItem'
import styles from './index.module.scss'
import { GameSelectorProps } from './types'
import { useFocusTrap } from '@mantine/hooks'

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
  const focusTrapRef = useFocusTrap(true);

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

  return (
    <div>
      <GenericDropdown
      trapFocus={false}
        target={
          <TextInput
            placeholder={i18n.searchForGames}
            enterKeyHint="search"
            onChange={(ev) => console.log(ev.target.value)}
            label={labelNode}
            data-autofocus='true'
            ref={focusTrapRef}
          />
        }
        opened={opened}
        onChange={setOpened}
      >
        {searchResults}
      </GenericDropdown>
      {selectedGamesElement}
    </div>
  )
}
