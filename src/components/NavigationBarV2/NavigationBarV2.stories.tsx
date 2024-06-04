import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { default as NavigationBarV2, defaultI18n } from '.'
import { NavigationBarV2Props } from './types'

const meta: Meta<typeof NavigationBarV2> = {
  title: 'Website/NavigationBarV2',
  component: NavigationBarV2
}

export default meta

type Story = StoryObj<typeof NavigationBarV2>

const props: NavigationBarV2Props = {
  className: '',
  i18n: defaultI18n,
  links: {
    x: '#',
    discord: '#',
    store: '#',
    quests: '#',
    developers: '#',
    docs: '#',
    faq: '#'
  },
  onMenuTap: () => {
    console.log('Menu tap')
  }
}

export const Default: Story = {
  args: { ...props },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  }
}

export const Desktop: Story = {
  args: { ...props },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  }
}

export const ClosedMobileMenu: Story = {
  args: { ...props, isMobileMenuOpen: false },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const OpenMobileMenu: Story = {
  args: { ...props, isMobileMenuOpen: true },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const ClosedTabletMenu: Story = {
  args: { ...props, isMobileMenuOpen: false },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const OpenedTabletMenu: Story = {
  args: { ...props, isMobileMenuOpen: true },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const MobileOpenAndCloseMenu: Story = {
  args: { ...props },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  render(args) {
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
      <NavigationBarV2
        {...args}
        isMobileMenuOpen={isOpen}
        onMenuTap={() => setOpen((prev) => !prev)}
      />
    )
  }
}
