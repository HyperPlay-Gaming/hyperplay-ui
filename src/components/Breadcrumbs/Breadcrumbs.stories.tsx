import type { Meta, StoryObj } from '@storybook/react'

import Breadcrumbs, { BreadcrumbsProps } from '.'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'DevPortal/Breadcrumbs',
  component: Breadcrumbs
}

export default meta

type Story = StoryObj<typeof Breadcrumbs>

const props: BreadcrumbsProps = {
  items: [
    { href: '', title: 'section 1' },
    { href: '', title: 'section 2' },
    { href: '', title: 'section 3' }
  ]
}

export const Default: Story = {
  args: { ...props }
}
