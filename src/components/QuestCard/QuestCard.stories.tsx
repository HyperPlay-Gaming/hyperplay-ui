import type { Meta, StoryObj } from '@storybook/react';



import questCardV2Image from '@/assets/banners/QuestCardV2Image.png?url';
import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url';



import { QuestCard, QuestCardProps } from '.';
import stlyes from './QuestCardStory.module.scss';


const meta: Meta<typeof QuestCard> = {
  title: 'Quests/QuestCard',
  component: QuestCard
}

export default meta

type Story = StoryObj<typeof QuestCard>

const props: QuestCardProps = {
  image: cupheadCard,
  title: 'Forgotten Playland',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export const Default: Story = {
  args: { ...props }
}

export const Detailed: Story = {
  args: {
    image: questCardV2Image,
    questType: 'Quest Type',
    gameTitle: 'Game Title',
    questName: 'Quest Name',
    currenyAmount: '+200',
    currencyName: 'G7 Credits',
    classNames: {
      root: stlyes.root,
    }
  }
}


export const WithoutCredits: Story = {
  args: {
    image: questCardV2Image,
    questType: 'Quest Type',
    gameTitle: 'Game Title',
    questName: 'Quest Name',
    currencyName: 'G7 Credits',
    classNames: {
      root: stlyes.root,
    }
  }
}

export const WithoutCurrencySection: Story = {
  args: {
    image: questCardV2Image,
    questType: 'Quest Type',
    gameTitle: 'Game Title',
    questName: 'Quest Name',
    classNames: {
      root: stlyes.root,
    }
  }
}

export const WithoutQuestType: Story = {
  args: {
    image: questCardV2Image,
    gameTitle: 'Game Title',
    questName: 'Quest Name',
    currenyAmount: '+200',
    currencyName: 'G7 Credits',
    classNames: {
      root: stlyes.root
    }
  }
}