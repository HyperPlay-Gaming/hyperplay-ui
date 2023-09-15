import React, { useState } from 'react'

// import AchievementPageNav from '../AchievementPageNav'
import Button from '../Button'
import { Dropdown } from '../Dropdowns'
import { itemType } from '../Dropdowns/Dropdown'
import Tabs from '../Tabs'
import styles from './AchievementSummaryTable.module.scss'

export interface GameAchievementsProps {
  /**
   * list of options for the dropdown to sort your achievements
   */
  sortOptions?: itemType[]
  allFilterLabel?: string
  newFilterLabel?: string
  mintedFilterLabel?: string
  mintButtonLabel?: string
  games?: { id: string; image: string; title: string; state: string }[]
}

export default function AchievementSummaryTable({
  sortOptions = [
    { text: 'Alphabetically' },
    { text: 'Favorites' },
    { text: 'Sort by Status' }
  ],
  allFilterLabel = 'All',
  newFilterLabel = 'New',
  mintedFilterLabel = 'Minted',
  mintButtonLabel = 'Mint',
  games = [
    {
      id: '1',
      image: 'https://i.imgur.com/Cij5vdL.png',
      title: 'Game 1',
      state: 'minted'
    },
    {
      id: '2',
      image: 'https://i.imgur.com/Cij5vdL.png',
      title: 'Game 1',
      state: 'minted'
    },
    {
      id: '3',
      image: 'https://i.imgur.com/Cij5vdL.png',
      title: 'Game 1',
      state: 'minted'
    },
    {
      id: '4',
      image: 'https://i.imgur.com/Cij5vdL.png',
      title: 'Game 1',
      state: 'minted'
    },
    {
      id: '5',
      image: 'https://i.imgur.com/Cij5vdL.png',
      title: 'Game 1',
      state: 'minted'
    }
  ]
}: GameAchievementsProps) {
  const [selected, setSelected] = useState(sortOptions[0])

  return (
    <div className={styles.container}>
      {/* <AchievementPageNav
        freeMints={10}
        basketAmount={0}
        handleNext={() => console.log('next')}
        handlePrevious={() => console.log('previous')}
      /> */}
      <Tabs defaultValue="all">
        <div className={styles.row}>
          <div className={styles.filters}>
            <Dropdown
              options={sortOptions}
              onItemChange={setSelected}
              selected={selected}
              targetWidth="300"
              dropdownButtonDivProps={{
                className: 'title-sm'
              }}
            />

            <Tabs.List type="outline">
              <Tabs.Tab value="all">
                <div className="menu">{allFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="new">
                <div className="menu">{newFilterLabel}</div>
              </Tabs.Tab>
              <Tabs.Tab value="minted">
                <div className="menu">{mintedFilterLabel}</div>
              </Tabs.Tab>
            </Tabs.List>
          </div>
          <div>
            <Button type="secondary" size="medium">
              {mintButtonLabel}
            </Button>
          </div>
        </div>

        <Tabs.Panel value="all" className={styles.games}>
          {games.map((game) => (
            <div key={game.id} className={styles.game}>
              {game.title}
            </div>
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="new">
          <div>Tab 2</div>
        </Tabs.Panel>
        <Tabs.Panel value="minted">
          <div>Tab 3</div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
