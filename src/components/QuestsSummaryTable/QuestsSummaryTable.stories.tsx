import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'
import reCard from '@/assets/steamCards/residentEvilCard.jpg?url'

import { QuestsSummaryTable, QuestsSummaryTableProps } from '.'
import Dropdown, { itemType } from '../Dropdowns/Dropdown'
import { QuestCard, QuestCardProps } from '../QuestCard'
import SearchBar from '../SearchBar'
import styles from './QuestsSummaryTable.stories.module.scss'

const meta: Meta<typeof QuestsSummaryTable> = {
  title: 'Quests/QuestsSummaryTable',
  component: QuestsSummaryTable
}

export default meta

type Story = StoryObj<typeof QuestsSummaryTable>

const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)' },
  { text: 'Alphabetically (DES)' }
] as itemType[]

type Data = QuestCardProps & { id: string }

const games: Data[] = [
  {
    id: '1',
    image: cyberpunkCard,
    title: 'Diablo II',
    description: 'Diablo II is an action RPG.'
  },
  {
    id: '2',
    image: cupheadCard,
    selected: true,
    title: 'Star Wars: Knights of the Old Republic',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers. Star Wars: Knights of the Old Republic is a game about lightsabers.'
  },
  {
    id: '3',
    image: reCard,
    title: 'Fortnite',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers. Star Wars: Knights of the Old Republic is a game about lightsabers. Star Wars: Knights of the Old Republic is a game about lightsabers.'
  },
  {
    id: '4',
    image: '',
    title: 'Star Wars: Knights of the Old Republic',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers.'
  },
  {
    id: '5',
    image: '',
    title: 'Star Wars: Knights of the Old Republic',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers.'
  },
  {
    id: '6',
    image: '',
    title: 'ZZZ Game',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers.'
  }
]

const gameElements = games.map(({ id, ...rest }) => (
  <QuestCard key={id} {...rest} />
))

const props: QuestsSummaryTableProps = {
  pageTitle: 'Quests',
  games: gameElements,
  imagesToPreload: [],
  filterProps: {
    activeFilter: 'all',
    setActiveFilter: (val: string) => console.log(val)
  },
  activeTab: 'ACTIVE',
  tabs: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Claim Ready', value: 'CLAIM_READY' },
    { label: 'Completed', value: 'COMPLETED' }
  ],
  messageModalProps: {
    title: 'No Quests Found.',
    message: 'There were no quests found.'
  }
}

export const Default: Story = {
  args: { ...props }
}

export const Overflow: Story = {
  args: { ...props, style: { height: '600px' } }
}

export const NoTabs: Story = {
  args: { ...props, tabs: [] }
}

export const SearchAndSortDemo: Story = {
  args: { ...props, tabs: [] },
  render: (args) => {
    const [searchText, setSearchText] = useState('')
    const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
    const gamesFiltered = games.filter((val) =>
      val.title?.toLowerCase().startsWith(searchText.toLowerCase())
    )
    const gameFilteredAndSorted = gamesFiltered.sort((a, b) => {
      if (!a.title || !b.title) {
        return 0
      }
      const multiplier = selectedSort === achievementsSortOptions[0] ? 1 : -1
      return multiplier * a.title.localeCompare(b.title)
    })
    const gameElementsFiltered = gameFilteredAndSorted.map(
      ({ id, ...rest }) => <QuestCard key={id} {...rest} />
    )
    const searchBar = (
      <>
        <div className={styles.row}>
          <div className={styles.filters}>
            <Dropdown
              targetWidth={300}
              dropdownButtonDivProps={{
                className: `text--lg weight--regular body-sm color-neutral-100`
              }}
              options={achievementsSortOptions}
              selected={selectedSort}
              onItemChange={setSelectedSort}
            />
          </div>
        </div>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          i18n={{ placeholder: 'Search Quest' }}
          styles={{ container: { margin: '0px 0px 0px auto' } }}
          suggestions={gamesFiltered
            .filter((val) => !!val.title)
            .map((val) => val.title!)}
        />
      </>
    )
    return (
      <QuestsSummaryTable
        {...args}
        games={gameElementsFiltered}
        searchBar={searchBar}
      />
    )
  }
}

export const WithCustomClassNames: Story = {
  args: { ...props, classNames: { gamesTable: styles.questSelectedLayout } }
}
