import React, { useState } from 'react'

import SearchBar from './index'

export default {
  title: 'SearchBar',
  component: SearchBar
}

export const Default: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const gameList = [
    'Bushi',
    'DarkThrone',
    `Oni's quest`,
    'MegaWeapon',
    'Phantom Galaxies',
    'Legions 2029',
    'Mighty Action Hero',
    'Celeros',
    'Altiros',
    'The Fabled',
    'Uldor Dread Arena',
    'Shutdown',
    'Another World',
    'Ice Poker',
    'The Sandbox',
    'Synergy Land',
    'Voxie Tactics',
    'Last Resort',
    'Defi Kingdoms',
    'Kosium Arctic Eclipse',
    'TroublePunk',
    'Apeiron',
    'Thetan Arena',
    'My Crypto Heroes',
    'Bunny Count 3',
    'CyberPunk 2077',
    'God of War',
    'The Last of Us Part 1',
    'Uncharted',
    'Fortnite',
    'Rocket League',
    'Game with really long name that for some reason might break the lines'
  ]

  const filteredItems = gameList.filter(Boolean).filter((item) => {
    return new RegExp(searchText, 'i').test(item)
  })

  return (
    <SearchBar
      suggestions={filteredItems}
      searchText={searchText}
      setSearchText={setSearchText}
      i18n={{ placeholder: 'Search for games' }}
    />
  )
}
