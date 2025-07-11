import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'

import questCardV2Image from '@/assets/banners/QuestCardV2Image.png?url'
import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'

import { QuestCard } from '.'
import styles from './QuestCardStory.module.scss'

const meta: Meta<typeof QuestCard> = {
  title: 'Quests/QuestCard',
  component: QuestCard,
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof meta>

type PropsType = React.ComponentProps<typeof QuestCard>
const props: PropsType = {
  image: questCardV2Image,
  description:
    'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  questType: 'Quest Type',
  gameTitle: 'Game Title'
}

export const Default: Story = {
  args: { ...props }
}

export const Detailed: Story = {
  args: {
    ...props,
    currencyAmount: '+200',
    currencyName: 'The Eternal Symbol of the Luminant Realms',
    rewardImage: cupheadCard,
    classNames: {
      root: styles.root,
      image: styles.oddSizedImage
    }
  }
}

export const QuestTitle: Story = {
  args: {
    ...props,
    currencyAmount: '+200',
    currencyName: 'The Eternal Symbol of the Luminant Realms',
    questName:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: '',
    rewardImage: cupheadCard,
    classNames: {
      root: styles.root,
      image: styles.oddSizedImage
    }
  }
}

export const WithoutCredits: Story = {
  args: {
    ...props,
    currencyAmount: undefined,
    currencyName: 'The Eternal Symbol of the Luminant Realms',
    rewardImage: cupheadCard,
    classNames: {
      root: styles.root
    }
  }
}

export const WithoutCurrencySection: Story = {
  args: {
    ...props,
    currencyAmount: undefined,
    currencyName: undefined,
    rewardImage: undefined,
    classNames: {
      root: styles.root
    }
  }
}

export const WithoutQuestType: Story = {
  args: {
    ...props,
    questType: undefined,
    classNames: {
      root: styles.root,
      image: styles.oddSizedImage
    }
  }
}

export const WithoutGameTitleAndDescriptipn: Story = {
  args: {
    ...props,
    gameTitle: undefined,
    description: undefined,
    rewardImage: cupheadCard,
    currencyAmount: '+200',
    currencyName: 'The Eternal Symbol of the Luminant Realms',
    classNames: {
      root: styles.root
    }
  }
}

export const OddSize: Story = {
  args: {
    ...props,
    classNames: {
      root: styles.root
    }
  }
}

export const CardWithDivProps: Story = {
  args: {
    ...props,
    classNames: {
      root: styles.root
    },
    id: 'quest-id-554'
  },
  play: async ({ canvasElement, args }) => {
    const firstDiv = canvasElement.querySelector('.gradientShadow')

    expect(firstDiv).toHaveAttribute('id', args.id)
  }
}

export const LinkCard: Story = {
  args: {
    ...props,
    component: 'a',
    classNames: {
      root: styles.root
    }
  }
}
