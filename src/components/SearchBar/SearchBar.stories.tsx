import React, { useState } from 'react'

import styles from './SearchBarStories.module.scss'
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

export const WithRenderItem: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const options = [
    {
      name: 'XOCIETY',
      image:
        'https://gateway.valist.io/ipfs/bafybeibed64wyfn4t6eh24d3oo3v34zkfkeg62jugyc3xwpy4i5ejjg63e'
    },
    {
      name: 'Metacene',
      image:
        'https://gateway.valist.io/ipfs/bafybeihovafa37hf2ubrh6btizpvxnz5of2r5ovrume6yv2oeoajgrnumi'
    },
    {
      name: 'Craft World',
      image:
        'https://gateway.valist.io/ipfs/bafybeiegvpkdkyqbn25ucgmu4wcs22qpid55pixg64pewiillq2vezim5q'
    },
    {
      name: 'MEGAWEAPON',
      image:
        'https://gateway.valist.io/ipfs/bafybeiegil5boqwftscqc7mf5e3vitxarhrceulfxmdzhe5znmf6glcdeu'
    },
    {
      name: 'Phantom Galaxies',
      image:
        'https://gateway.valist.io/ipfs/bafybeiahpcgi4wm2w62ydgk2dqdzjyqnudsb5sqflcb5arcx5mogold7cm'
    },
    {
      name: 'DeFi Kingdoms',
      image:
        'https://gateway.valist.io/ipfs/bafybeidbbjaueypdxxxwyrsfukfhvlinaafeg6zwri6r6zl7jd7iidy24q'
    }
  ]

  const filteredItems = options.filter(Boolean).filter((item) => {
    return new RegExp(searchText, 'i').test(item.name)
  })

  return (
    <SearchBar
      classNames={{
        container: styles.container,
        dropdown: styles.dropdown,
        dropdownList: styles.searchResult
      }}
      suggestions={filteredItems.map((item) => item.name)}
      searchText={searchText}
      setSearchText={setSearchText}
      i18n={{ placeholder: 'Search for games' }}
      itemComponent={({ suggestion }) => {
        const option = options.find((option) => option.name === suggestion)
        if (!option) return null
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={option.image} alt={option.name} width={24} height={24} />
            <div>{option.name}</div>
          </div>
        )
      }}
    />
  )
}
