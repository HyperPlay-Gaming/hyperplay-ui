import type { Meta, StoryObj } from '@storybook/react'

import gameImage from '@/assets/banners/QuestCardV2Image.png?url'

import MasonryLayout from '.'

const meta: Meta<typeof MasonryLayout> = {
  title: 'Components/MasonryLayout',
  component: MasonryLayout,
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof MasonryLayout>

export const Default: Story = {
  args: {
    images: [
      <img key="0" src={gameImage} alt="game image" />,
      <img key="1" src={gameImage} alt="game image" />,
      <img key="2" src={gameImage} alt="game image" />,
      <img key="3" src={gameImage} alt="game image" />,
      <img key="4" src={gameImage} alt="game image" />
    ]
  }
}

export const fiveImages: Story = {
  args: {
    images: [
      <img key="0" src={gameImage} alt="game image" />,
      <img key="1" src={gameImage} alt="game image" />,
      <img key="2" src={gameImage} alt="game image" />,
      <img key="3" src={gameImage} alt="game image" />,
      <img key="4" src={gameImage} alt="game image" />
    ]
  }
}

export const fourImages: Story = {
  args: {
    images: [
      <img key="0" src={gameImage} alt="game image" />,
      <img key="1" src={gameImage} alt="game image" />,
      <img key="2" src={gameImage} alt="game image" />,
      <img key="3" src={gameImage} alt="game image" />
    ]
  }
}

export const threeImages: Story = {
  args: {
    images: [
      <img key="0" src={gameImage} alt="game image" />,
      <img key="1" src={gameImage} alt="game image" />,
      <img key="2" src={gameImage} alt="game image" />
    ]
  }
}

export const twoImages: Story = {
  args: {
    images: [
      <img key="0" src={gameImage} alt="game image" />,
      <img key="1" src={gameImage} alt="game image" />
    ]
  }
}

export const oneImage: Story = {
  args: {
    images: [<img key="0" src={gameImage} alt="game image" />]
  }
}
