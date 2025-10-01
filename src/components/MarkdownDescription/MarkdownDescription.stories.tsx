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

export const WithHighlighting: Story = {
  args: {
    children: `**You:** send 100 eth on mainnet to 0x59faeaDA8E6eacFdb6c84E2b95cC1Dc193c88F6d

**Hyp3r:** It looks like your wallet doesn't have enough ETH to cover sending 100 ETH plus gas on mainnet. Please top up your account with at least 100 ETH (plus a bit extra to cover transaction fees) and let me know when you're ready to proceed.`
  }
}

export const WithCustomHighlighting: Story = {
  args: {
    children: `**Custom Explorer Test:** Click this address to go to PolygonScan: 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6

**Numbers:** 1000000, 123.45, and 5 should also be highlighted.`,
    highlightOptions: {
      addressUrl: (addr: string) => `https://polygonscan.com/address/${addr}`,
      linkEthAddresses: true
    }
  }
}

export const WithoutHighlighting: Story = {
  args: {
    children: `### No Auto-Highlighting

This example shows the component with highlighting disabled:

- ETH address: 0x59faeaDA8E6eacFdb6c84E2b95cC1Dc193c88F6d
- Numbers: 100, 50, 25, 1, 1000

All text appears as normal markdown without special highlighting.`,
    enableHighlighting: false
  }
}
