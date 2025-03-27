import { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, within } from '@storybook/test'

import MetaSection from './index'

const meta: Meta<typeof MetaSection> = {
  title: 'Components/MetaSection',
  component: MetaSection
}

export default meta

type Story = StoryObj<typeof MetaSection>

// Language Supported Stories
export const LanguageSupportedOne: Story = {
  args: {
    title: 'Languages Supported',
    items: ['English'],
    stickerProps: {
      styleType: 'tertiary',
      variant: 'outlined'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('English')
    expect(sticker).toBeInTheDocument()
  }
}

export const LanguageSupportedFive: Story = {
  args: {
    title: 'Languages Supported',
    items: ['English', 'Chinese', 'Japanese', 'Korean', 'Spanish'],
    stickerProps: {
      styleType: 'secondary',
      variant: 'filled'
    },
    classNames: {
      title: 'title-color'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('Korean')
    expect(sticker).toBeInTheDocument()
  }
}

export const LanguageSupportedTwenty: Story = {
  args: {
    title: 'Languages Supported',
    items: [
      'English',
      'Chinese',
      'Japanese',
      'Korean',
      'Spanish',
      'French',
      'German',
      'Italian',
      'Portuguese',
      'Russian',
      'Arabic',
      'Hindi',
      'Bengali',
      'Urdu',
      'Punjabi',
      'Tamil',
      'Telugu',
      'Malayalam',
      'Kannada',
      'Gujarati'
    ],
    stickerProps: {
      styleType: 'neutral',
      variant: 'outlined'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the +15 sticker
    const plusSticker = await canvas.findByText('+15')
    expect(plusSticker).toBeInTheDocument()

    fireEvent.mouseOver(plusSticker)

    await new Promise((resolve) => setTimeout(resolve, 200))

    setTimeout(() => {
      fireEvent.mouseOut(plusSticker)
    }, 1000)

    // Find the hidden items list
    const hiddenItemsList = canvas.getAllByText(/Japanese|Punjabi|Tamil|Telugu/)
    expect(hiddenItemsList).not.toHaveLength(0)
  }
}

// Controller Supported Stories
export const ControllerSupportedYes: Story = {
  args: {
    title: 'Controller Supported',
    items: ['YES'],
    stickerProps: {
      styleType: 'success',
      variant: 'filledStrong'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('YES')
    expect(sticker).toBeInTheDocument()
  }
}

export const ControllerSupportedNo: Story = {
  args: {
    title: 'Controller Supported',
    items: ['NO'],
    stickerProps: {
      styleType: 'error',
      variant: 'filledStrong'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('NO')
    expect(sticker).toBeInTheDocument()
  }
}

// Genres Stories
export const GenresTwo: Story = {
  args: {
    title: 'Genres',
    items: ['Third-Person Shooter', 'Action'],
    stickerProps: {
      styleType: 'secondary',
      variant: 'outlined'
    },
    classNames: {
      root: 'custom-meta-section',
      stickersContainer: 'custom-stickers-container'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('Action')
    expect(sticker).toBeInTheDocument()
  }
}

export const GenresSeven: Story = {
  args: {
    title: 'Genres',
    items: [
      'Action',
      'Adventure',
      'RPG',
      'Shooter',
      'Puzzle',
      'Strategy',
      'Simulation'
    ],
    stickerProps: {
      styleType: 'warning',
      variant: 'outlined'
    },
    hiddenStickerProps: {
      styleType: 'warning',
      variant: 'filled',
      dimension: 'small'
    },
    classNames: {
      popover: 'custom-popover',
      hiddenItemsList: 'custom-hidden-items-list'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the +2 sticker
    const plusSticker = await canvas.findByText('+2')
    expect(plusSticker).toBeInTheDocument()

    fireEvent.mouseOver(plusSticker)

    await new Promise((resolve) => setTimeout(resolve, 200))

    setTimeout(() => {
      fireEvent.mouseOut(plusSticker)
    }, 1000)

    // Find the hidden items list
    const hiddenItemsList = canvas.getAllByText(/Puzzle|Strategy|Simulation/)
    expect(hiddenItemsList).not.toHaveLength(0)
  }
}
