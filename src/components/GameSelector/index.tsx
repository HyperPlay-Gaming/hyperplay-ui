import React, { HTMLProps } from 'react'

import { TrashCan } from '@/assets/images'

import TextInput from '../TextInput'
import styles from './index.module.scss'

export interface GameDetails {
  title: string
  img: string
  onClick: () => void
}

export interface GameSelectorProps extends HTMLProps<HTMLDivElement> {
  selectedGames: GameDetails[]
  searchResultGames: GameDetails[]
  onSearchInput: (text: string) => void
  i18n?: {
    selectGame: string
    selectUpTo: string
    searchForGames: string
  }
}

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
  let selectedGamesElement = null
  if (selectedGames.length > 0) {
    selectedGamesElement = selectedGames.map((val) => (
      <div key={val.title} className={styles.selectedGameContainer}>
        <div className={styles.details}>
          <img src={val.img} />
          <div className="title-sm">{val.title}</div>
        </div>
        <button onClick={val.onClick}><TrashCan/></button>
      </div>
    ))
  }

  const labelNode = (
    <div className={styles.searchLabel}>
      <div className="caption">{i18n.selectGame}</div>
      <div className={styles.selectDetails}>{i18n.selectUpTo}</div>
    </div>
  )

  return (
    <div>
      <TextInput
        placeholder={i18n.searchForGames}
        enterKeyHint="search"
        onChange={(ev) => console.log(ev.target.value)}
        label={labelNode}
      />
      {selectedGamesElement}
    </div>
  )
}
