import type { Meta, StoryObj } from '@storybook/react'

import MarkdownDescription, { MarkdownDescriptionProps } from '.'

const meta: Meta<typeof MarkdownDescription> = {
  title: 'Utilities/MarkdownDescription',
  component: MarkdownDescription
}

export default meta

type Story = StoryObj<typeof MarkdownDescription>

const props: MarkdownDescriptionProps = {
  children:
    '**Good luck, adventurer!** For more details, visit [hyperplay.xyz](https://hyperplay.xyz)'
}

export const Default: Story = {
  args: { ...props }
}

export const WithLists: Story = {
  args: {
    children: `### Let's Reach Level 200

**Objective:**
- Aim to reach level 200 on your new character.

**Reward:**
- Claim a rare gift upon reaching level 200!

**Details:**
- Embark on your journey and level up your new character.
- Keep progressing until you reach the prestigious level 200.
- Once you achieve this milestone, you'll be rewarded with a rare and exclusive gift to enhance your gameplay.

**Good luck, adventurer!**

For more details, visit [hyperplay](https://www.hyperplay.xyz).`
  }
}

export const WithBlockquotes: Story = {
  args: {
    children: `### Quest Information

**Important Notice:**

> This is a blockquote with colored text! Use blockquotes to highlight important information.

> You can also use blockquotes for multiple paragraphs.
> 
> Just like this one with **bold text** and [links](https://hyperplay.xyz) inside!

**Regular text** continues here in the normal color.

For more details, visit [hyperplay](https://www.hyperplay.xyz).`
  }
}
