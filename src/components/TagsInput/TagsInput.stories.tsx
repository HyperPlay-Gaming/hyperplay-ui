import type { Meta, StoryObj } from '@storybook/react'

import { TagsInput, TagsInputProps } from '.'

const meta: Meta<typeof TagsInput> = {
  title: 'Forms/TagsInput',
  component: TagsInput
}

export default meta

type Story = StoryObj<typeof TagsInput>

const props: TagsInputProps = {
  data: [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Racing',
    'Sports',
    'Puzzle',
    'Platformer',
    'Fighting',
    'Stealth',
    'Tower Defense',
    'First-Person Shooter',
    'Third-Person Shooter',
    "Shoot 'em up",
    'Battle Royale',
    'Real-Time Strategy',
    'Turn-Based',
    'Turn-Based Strategy',
    'Rogue-Like',
    'Rogue-Lite',
    'Horror',
    'Survival',
    'Survival Horror',
    'Sci-Fi & Cyberpunk',
    'Fantasy',
    'Open World',
    'Space',
    'Space & Flight',
    'Dungeon Crawler',
    'Metroidvania',
    'Retro',
    'Arcade & Rhythm',
    'Anime',
    'Indie',
    'Comedy',
    'Mystery & Detective',
    'Co-Operative',
    'LAN',
    'Local & Party',
    'MMO',
    'Multiplayer',
    'Online Competitive',
    'Singleplayer',
    'MOBA',
    'Party',
    'Party-Based',
    'Team Sports',
    'Life & Immersive',
    'Dating',
    'Farming & Crafting',
    'City Builder',
    'Building & Automation',
    'Fishing & Hunting',
    'Card Game',
    'Card & Board',
    'Trivia',
    'Music',
    'Narration',
    'Visual Novel',
    'Story-Rich',
    'Exploration',
    'Sandbox & Physics',
    'Casual',
    'Hobby & Job',
    'Individual Sports',
    'Fighting & Martial Arts',
    'Hack & Slash',
    'Hidden Object',
    'Grand & 4X',
    'Military',
    'City & Settlement',
    'Dapp',
    'DeFi'
  ]
}

export const Default: Story = {
  args: { ...props }
}
