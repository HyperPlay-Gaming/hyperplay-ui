import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'

import CollapseListSection, { CollapseListSectionProps, defaultI81n } from '.'

type Component = CollapseListSectionProps
type Story = StoryObj<Component>

const simpleContentProps: CollapseListSectionProps = {
  title: 'Updates',
  list: [
    {
      title: 'v1.0.2',
      subtitle: 'Feb 8, 2024',
      content: 'The introduction'
    },
    {
      title: 'v1.0.1',
      subtitle: 'Dec 23, 2023',
      content: 'Miscellaneous improvements'
    },
    {
      title: 'v1.0.0',
      subtitle: 'Nov 2, 2023',
      content: 'Matchmaking stability'
    },
    {
      title: 'v0.1.0',
      subtitle: 'Dec 25, 2024',
      content: 'New Features'
    }
  ]
}

const meta: Meta<typeof CollapseListSection> = {
  title: 'CollapseList',
  component: CollapseListSection,
  args: {
    title: 'Updates',
    list: [
      {
        title: 'v1.0.2',
        subtitle: 'Feb 8, 2024',
        content: `
          New Features:
          - The introduction tutorial can now be skipped.

          Updates:
          - Matchmaking stability improvements.
          - Menu loading improvements.
          - Miscellaneous improvements and balancing adjustments.
        `
      },
      {
        title: 'v1.0.1',
        subtitle: 'Dec 23, 2023',
        content: `
          Changes:
          - Items now also use the new tooltip system. Therefore, items that give random status now display their pools.
          - Exotic Brew now has the "Random Buff" keyword button to display the pool of buffs.
          - Rerolling a quest will now give you the new quest in the same slot, instead of reordering the list.
          - Heroes and items locked by ELO now appear greyed out in the collection.
          - Opening the details of a spell in the Treasure Room now indicates which hero it pertains to.
          - Necromancer Wand Spirit Passive Spell now has Focus to guarantee its expected behavior.
          - Added VFX to some item's passives.
          - Improved the description of Spells that apply random status effects.
          - The UIs of the Shop, Player Profile and Progression have been reworked.
          - The UI that appears when clicking on the HUD of a Hero has been fully reworked.
          - Changed the 3D visuals of the heroes.
          - Changed the VFX of the heroes spawning and resurrection.
          - Some internal changes have been made to improve the performance of the game in lower-end devices.
          - Giovanna and her starter Spells are now unlocked at 250 Rating.

          Balance:
          - Reduced healing from Guardian Garments Mech.
          - Increased Healing from Guardian Garments Spirit.
          - Removed Steelskin from the pool of Laurel Crown.
          - Chayna Mana in a Bottle to give 5 mana on death.
          - Added Madness to the pool of Eternal Emblem Spirit.
          - Removed Critical Damage increase from Pouch of Gold Normal and Mech.
          - Meteor Rain's Weak debuff amount has been reduced by half.`
      },
      {
        title: 'v1.0.0',
        subtitle: 'Nov 2, 2023',
        content: `
          New Features:
          - The introduction tutorial can now be skipped.

          Updates:
          - Matchmaking stability improvements.
          - Menu loading improvements.
          - Miscellaneous improvements and balancing adjustments.
        `
      }
    ],
    i18n: defaultI81n
  }
}

export default meta

export const Default: Story = {}

export const WithoutSubtitle: Story = {
  render: (props) => (
    <div>
      <CollapseListSection
        {...props}
        list={props.list.map(({ title, content }) => ({
          title,
          content
        }))}
      />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const subtitle = args.list[0].subtitle || 'Subtitle'

    const item = canvas.queryByText(subtitle)

    expect(item).toBeNull()
  }
}

export const WithoutTitle: Story = {
  render: (props) => (
    <div>
      <CollapseListSection
        {...props}
        title={undefined}
        list={props.list.map(({ title, content }) => ({
          title,
          content
        }))}
      />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const title = args.title || 'Title'

    const item = canvas.queryByText(title)

    expect(item).toBeNull()
  }
}

export const OpenedCollapseList: Story = {
  args: { ...simpleContentProps },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(args.list[0].title)
    await userEvent.click(toggleFirstItem)

    expect(
      canvas.getByText((args.list[0].content as string) || '')
    ).toBeVisible()
  }
}

export const ClosedCollapseList: Story = {
  args: { ...simpleContentProps },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const content = 'New Features'
    const lastItem = canvas.getByText(args.list[3].title)
    await userEvent.click(lastItem)

    expect(canvas.getByText(content)).toBeVisible()

    await userEvent.click(lastItem)

    expect(canvas.queryByText(content)).toBeNull()
  }
}

export const ExpandAll: Story = {
  args: { ...simpleContentProps },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const expandAllButton = canvas.getByRole('button', {
      name: args.i18n?.expandAll
    })
    await userEvent.click(expandAllButton)

    args.list.map((item) => {
      expect(canvas.getByText((item.content as string) || '')).toBeVisible()
    })
  }
}

export const CollapseAll: Story = {
  args: { ...simpleContentProps },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const expandAllButton = canvas.getByRole('button', {
      name: args.i18n?.expandAll
    })
    await userEvent.click(expandAllButton)

    args.list.map((item) => {
      expect(canvas.getByText((item.content as string) || '')).toBeVisible()
    })

    const collapseAllButton = canvas.getByRole('button', {
      name: args.i18n?.collapseAll
    })
    await userEvent.click(collapseAllButton)

    args.list.map((item) => {
      expect(canvas.queryByText((item.content as string) || '')).toBeNull()
    })
  }
}

export const AutomaticallyUpdateExpandOrCollapseButton: Story = {
  args: { ...simpleContentProps },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const firstItem = canvas.getByText(args.list[2].title)
    const expandAllButton = canvas.getByRole('button', {
      name: args.i18n?.expandAll
    })

    await userEvent.click(expandAllButton)

    args.list.map((item) => {
      expect(canvas.getByText((item.content as string) || '')).toBeVisible()
    })

    const collapseAllButton = canvas.getByRole('button', {
      name: args.i18n?.collapseAll
    })

    expect(collapseAllButton).toBeVisible()

    await userEvent.click(firstItem)

    const expandAllButtonAgain = canvas.getByRole('button', {
      name: args.i18n?.expandAll
    })

    expect(expandAllButtonAgain).toBeVisible()
  }
}

export const NoExpandButton: Story = {
  args: { ...simpleContentProps, list: [simpleContentProps.list[0]] },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const expandAllButton = canvas.queryByRole('button', {
      name: args.i18n?.expandAll
    })

    expect(expandAllButton).toBeNull()
  }
}

export const ExpandedExternally: Story = {
  args: { ...simpleContentProps, isExpanded: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await waitFor(() => {
      args.list.map((item) => {
        expect(canvas.getByText((item.content as string) || '')).toBeVisible()
      })
    })
  }
}
