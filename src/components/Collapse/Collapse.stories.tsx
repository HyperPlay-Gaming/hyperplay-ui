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
const subtitle = 'Feb, 5th 2023'

export const Default: Story = {
  args: { ...props }
}

export const SubtitleCollapse: Story = {
  args: { ...props },
  render: (props) => (
    <div>
      <Collapse title={props.title} subtitle={subtitle}>
        {textChildren}
      </Collapse>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(subtitle || '')
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(textChildren)).toBeVisible()
  }
}

export const WithoutSubtitleCollapse: Story = {
  args: { ...props },
  render: () => (
    <div>
      <Collapse title="v1.0.5" isOpen={true}>
        {textChildren}
      </Collapse>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const subtitle = canvas.queryByText(args?.subtitle || 'Test')

    expect(subtitle).toBeNull()
  }
}

export const OpenedCollapse: Story = {
  args: { ...props },
  render: () => (
    <div>
      <Collapse title="Advanced Options">{textChildren}</Collapse>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(props.title)
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(textChildren)).toBeVisible()
  }
}

export const ExternalOpen: Story = {
  args: { ...props },
  render: (props) => (
    <div>
      <Collapse {...props} title={props.title} subtitle="April, 4th 2023">
        {textChildren}
      </Collapse>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(props?.title || '')
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(textChildren)).toBeVisible()
  }
}
