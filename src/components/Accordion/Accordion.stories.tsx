import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import Accordion, { AccordionProps } from '.'

type Component = AccordionProps
type Story = StoryObj<Component>

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion
}

export default meta

const textChildren =
  'This feature is recommended for advanced users and developers. Learn more'

const props: AccordionProps = {
  title: 'Advanced Options',
  children: textChildren
}

export const Default: Story = {
  args: { ...props }
}

export const OpenedAccordion: Story = {
  args: { ...props },
  render: () => (
    <div>
      <Accordion title="Advanced Options">
        This feature is recommended for advanced users and developers. Learn
        more
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(props.title)
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(textChildren)).toBeVisible()
  }
}
