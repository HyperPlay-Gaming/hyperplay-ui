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

const games = [
  {
    id: '1',
    image: cyberpunkCard,
    title: 'Diablo II'
  },
  {
    id: '2',
    image: cupheadCard,
    title: 'Star Wars: Knights of the Old Republic'
  },
  {
    id: '3',
    image: reCard,
    title: 'Star Wars: Knights of the Old Republic'
  },
  {
    id: '4',
    image: '',
    title: 'Star Wars: Knights of the Old Republic'
  }
] as Data[]

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
  tabs: [],
  messageModalProps: {
    title: 'msg modal title',
    message: 'msg modal msg'
  }
}

export const Default: Story = {
  args: { ...props }
}
