import type { Meta, StoryObj } from '@storybook/react'

import { XFilled } from '@/assets/images'

import DetailsCard, { DetailsCardProps, defaultI18n } from '.'
import styles from './DetailsCardStory.module.scss'

const props: DetailsCardProps = {
  className: styles.outsideRoot,
  i18n: defaultI18n,
  onActionTap: function (): void {
    throw new Error('Function not implemented.')
  },
  ContentComponent: (
    <div className={styles.outsideDescription}>
      We’d love to stay connected with you. If the feeling’s mutual, follow{' '}
      <span className={styles.outsideHpText}>@hyperplay</span> on Twitter for
      the latest news and updates.
    </div>
  ),
  Icon: <XFilled fill="var(--color-neutral-100)" />
}

const meta: Meta<typeof DetailsCard> = {
  title: 'DetailsCard',
  component: DetailsCard,
  args: props
}

export default meta

type Story = StoryObj<typeof DetailsCard>

export const Desktop: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  }
}

export const Smartphone: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const DesktopWithoutIcon: Story = {
  args: {
    ...props,
    Icon: null
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  }
}

export const SmartphoneWithoutIcon: Story = {
  args: {
    ...props,
    Icon: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const TabletWithoutIcon: Story = {
  args: {
    ...props,
    Icon: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}
