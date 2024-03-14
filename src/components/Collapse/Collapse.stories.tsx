import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import Collapse, { CollapseProps } from '.'

type Component = CollapseProps
type Story = StoryObj<Component>

const meta: Meta<typeof Collapse> = {
  title: 'Collapse',
  component: Collapse
}

export default meta

const textChildren =
  'This feature is recommended for advanced users and developers. Learn more'

const props: CollapseProps = {
  title: 'Advanced Options',
  children: textChildren
}

export const Default: Story = {
  args: { ...props }
}

export const OpenedCollapse: Story = {
  args: { ...props },
  render: () => (
    <div>
      <Collapse title="Advanced Options">
        This feature is recommended for advanced users and developers. Learn
        more
      </Collapse>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(props.title)
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(textChildren)).toBeVisible()
  }
}
