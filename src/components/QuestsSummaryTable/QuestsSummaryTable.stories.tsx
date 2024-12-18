import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'
import reCard from '@/assets/steamCards/residentEvilCard.jpg?url'

import { QuestsSummaryTable, QuestsSummaryTableProps } from '.'
import { itemType } from '../Dropdowns/Dropdown'
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
const selectedSort = achievementsSortOptions[0]

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
    title: 'Star Wars: Knights of the Old Republic',
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
    title: 'Star Wars: Knights of the Old Republic',
    description:
      'Star Wars: Knights of the Old Republic is a game about lightsabers.'
  }
]

const gameElements = games.map(({ id, ...rest }) => (
  <QuestCard key={id} {...rest} />
))

const props: QuestsSummaryTableProps = {
  pageTitle: 'Quests',
  sortProps: {
    options: achievementsSortOptions,
    selected: selectedSort,
    onItemChange: (val) => console.log(`Sort item changed to ${val}`)
  },
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

export const SearchDemo: Story = {
  args: { ...props, tabs: [] },
  render: (args) => {
    const [searchText, setSearchText] = useState('')
    const gamesFiltered = games.filter((val) =>
      val.title?.toLowerCase().startsWith(searchText.toLowerCase())
    )
    const gameElementsFiltered = gamesFiltered.map(({ id, ...rest }) => (
      <QuestCard key={id} {...rest} />
    ))
    const searchBar = (
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        i18n={{ placeholder: 'Search Quest' }}
        styles={{ container: { margin: '0px 0px 0px auto' } }}
        suggestions={gamesFiltered
          .filter((val) => !!val.title)
          .map((val) => val.title!)}
      />
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
