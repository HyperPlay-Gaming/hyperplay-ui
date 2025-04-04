import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import {
  IconCategory,
  IconDeviceGamepad,
  IconDeviceGamepad2,
  IconFlag,
  IconLanguage,
  IconPlus,
  IconX
} from '@tabler/icons-react'

import Button from '../Button'
import Sticker from '../Sticker'
import MetaSection from './index'

/**
 * The `MetaSection` component is designed to display categorized content with a title,
 * automatically handling overflow with a popover. It's ideal for displaying metadata
 * like languages supported, controller compatibility, genres, or any grouped items.
 *
 * This component is highly flexible and can render any React elements, not just text.
 * Common use cases include:
 * - Language support indicators
 * - Feature tags
 * - Game metadata sections
 * - Action buttons
 * - Categorized information
 */
const meta: Meta<typeof MetaSection> = {
  title: 'Components/MetaSection',
  component: MetaSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile component for displaying metadata sections with automatic overflow handling. Ideal for displaying game information like languages, features, and genres with a clean, consistent design.'
      }
    }
  },
  argTypes: {
    title: {
      description: 'Title displayed above the items',
      control: 'text'
    },
    items: {
      description:
        'Array of React nodes to display (e.g., Stickers, Buttons, or custom elements)'
    },
    classNames: {
      description:
        'Optional custom class names for different parts of the component'
    },
    maxVisibleItems: {
      description:
        'Maximum number of items to show before using the "+N" overflow indicator',
      control: { type: 'number', min: 1, max: 20 },
      defaultValue: 5
    },
    moreIndicator: {
      description:
        'Custom React node to use as the "more items" indicator (replaces the default "+N")'
    }
  }
}

export default meta

type Story = StoryObj<typeof MetaSection>

// Language Supported Stories with Stickers
export const LanguageSupportedOne: Story = {
  args: {
    title: 'Language Supported',
    items: [
      <Sticker key="en" styleType="tertiary" variant="outlined">
        English
      </Sticker>
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing a single supported language using a Sticker component.'
      }
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
    title: '5 Languages Supported',
    items: [
      <Sticker key="en" styleType="secondary" variant="filled">
        English
      </Sticker>,
      <Sticker key="cn" styleType="secondary" variant="filled">
        Chinese
      </Sticker>,
      <Sticker key="jp" styleType="secondary" variant="filled">
        Japanese
      </Sticker>,
      <Sticker key="kr" styleType="secondary" variant="filled">
        Korean
      </Sticker>,
      <Sticker key="es" styleType="secondary" variant="filled">
        Spanish
      </Sticker>
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing exactly five languages, which is the default `maxVisibleItems` value.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('Korean')
    expect(sticker).toBeInTheDocument()
  }
}

export const TenLanguages: Story = {
  args: {
    title: '10 Languages Supported',
    items: [
      <Sticker key="en" styleType="neutral" variant="outlined">
        English
      </Sticker>,
      <Sticker key="cn" styleType="neutral" variant="outlined">
        Chinese
      </Sticker>,
      <Sticker key="jp" styleType="neutral" variant="outlined">
        Japanese
      </Sticker>,
      <Sticker key="kr" styleType="neutral" variant="outlined">
        Korean
      </Sticker>,
      <Sticker key="es" styleType="neutral" variant="outlined">
        Spanish
      </Sticker>,
      <Sticker key="fr" styleType="neutral" variant="outlined">
        French
      </Sticker>,
      <Sticker key="de" styleType="neutral" variant="outlined">
        German
      </Sticker>,
      <Sticker key="it" styleType="neutral" variant="outlined">
        Italian
      </Sticker>,
      <Sticker key="pt" styleType="neutral" variant="outlined">
        Portuguese
      </Sticker>,
      <Sticker key="ru" styleType="neutral" variant="outlined">
        Russian
      </Sticker>
    ],
    moreIndicator: (
      <Sticker styleType="neutral" variant="outlined">
        +5
      </Sticker>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing many languages with overflow handling and a custom moreIndicator to match the Sticker style.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const plusSticker = await canvas.findByText('+5')
    expect(plusSticker).toBeInTheDocument()
  }
}

// Controller Supported Stories with Stickers
export const ControllerSupportedYes: Story = {
  args: {
    title: 'Controller Supported',
    items: [
      <Sticker key="yes" styleType="success" variant="filledStrong">
        YES
      </Sticker>
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing controller support status with a success-styled Sticker.'
      }
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
    items: [
      <Sticker key="no" styleType="error" variant="filledStrong">
        NO
      </Sticker>
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing no controller support with an error-styled Sticker.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('NO')
    expect(sticker).toBeInTheDocument()
  }
}

// Genres Stories with Stickers
export const GenresWithStickers: Story = {
  args: {
    title: 'Genres',
    items: [
      <Sticker key="tps" styleType="secondary" variant="outlined">
        Third-Person Shooter
      </Sticker>,
      <Sticker key="action" styleType="secondary" variant="outlined">
        Action
      </Sticker>
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing game genres using standard Stickers.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sticker = await canvas.findByText('Action')
    expect(sticker).toBeInTheDocument()
  }
}

export const GenresWithManyStickers: Story = {
  args: {
    title: 'Genres',
    items: [
      <Sticker key="action" styleType="warning" variant="outlined">
        Action
      </Sticker>,
      <Sticker key="adventure" styleType="warning" variant="outlined">
        Adventure
      </Sticker>,
      <Sticker key="rpg" styleType="warning" variant="outlined">
        RPG
      </Sticker>,
      <Sticker key="shooter" styleType="warning" variant="outlined">
        Shooter
      </Sticker>,
      <Sticker key="puzzle" styleType="warning" variant="outlined">
        Puzzle
      </Sticker>,
      <Sticker key="strategy" styleType="warning" variant="outlined">
        Strategy
      </Sticker>,
      <Sticker key="simulation" styleType="warning" variant="outlined">
        Simulation
      </Sticker>
    ],
    moreIndicator: (
      <Sticker styleType="warning" variant="outlined">
        +2
      </Sticker>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing multiple game genres with overflow handling using warning-styled Stickers.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const plusSticker = await canvas.findByText('+2')
    expect(plusSticker).toBeInTheDocument()
  }
}

// Button examples
export const WithButtons: Story = {
  args: {
    title: 'Actions',
    items: [
      <Button key="play" type="primary" size="small">
        Play Now
      </Button>,
      <Button key="download" type="secondary" size="small">
        Download
      </Button>
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing the MetaSection used with Buttons instead of Stickers, demonstrating its flexibility.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const playButton = await canvas.findByText('Play Now')
    const downloadButton = await canvas.findByText('Download')
    expect(playButton).toBeInTheDocument()
    expect(downloadButton).toBeInTheDocument()
  }
}

// Icon examples
export const WithIcons: Story = {
  args: {
    title: 'Game Features',
    items: [
      <div
        key="multiplayer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconDeviceGamepad size={20} />
        <span>Multiplayer</span>
      </div>,
      <div
        key="controller"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconDeviceGamepad2 size={20} />
        <span>Controller Support</span>
      </div>,
      <div
        key="languages"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconLanguage size={20} />
        <span>10+ Languages</span>
      </div>,
      <div
        key="categories"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconCategory size={20} />
        <span>5 Categories</span>
      </div>,
      <div
        key="regional"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconFlag size={20} />
        <span>Region-free</span>
      </div>,
      <div
        key="nodrm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconX size={20} />
        <span>No DRM</span>
      </div>
    ],
    moreIndicator: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: 'var(--color-primary-800)',
          borderRadius: '6px'
        }}
      >
        <IconPlus size={20} />
        <span>1 More</span>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing custom icon-based elements with a matching overflow indicator.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const multiplayerText = await canvas.findByText('Multiplayer')
    const controllerText = await canvas.findByText('Controller Support')
    expect(multiplayerText).toBeInTheDocument()
    expect(controllerText).toBeInTheDocument()
    const moreText = await canvas.findByText('1 More')
    expect(moreText).toBeInTheDocument()
  }
}
