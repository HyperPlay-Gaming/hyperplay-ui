import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'
import reCard from '@/assets/steamCards/residentEvilCard.jpg?url'

import { QuestsSummaryTable, QuestsSummaryTableProps } from '.'
import { itemType } from '../Dropdowns/Dropdown'
import { QuestCard, QuestCardProps } from '../QuestCard'

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
    description: 'Diablo II is an action RPG about hoarding gear.'
  },
  {
    id: '2',
    image: cupheadCard,
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
  }
]

const gameElements = games.map(({ id, ...rest }) => (
  <QuestCard key={id} {...rest} />
))

const props: QuestsSummaryTableProps = {
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
    title: 'msg modal title',
    message: 'msg modal msg'
  }
}

export const Default: Story = {
  args: { ...props }
}
