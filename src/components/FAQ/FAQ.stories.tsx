import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import FAQ, { FAQProps } from '.'

type Component = typeof FAQ
type Story = StoryObj<Component>

const meta: Meta<typeof FAQ> = {
  title: 'DevPortal/FAQ',
  component: FAQ
}

export default meta

const DESCRIPTION_MOCK =
  'Here to answer any questions you have, if there are some missing reach out to'
const props: FAQProps = {
  faqList: [
    {
      question: 'What is a Reward Contract?',
      answer:
        'Reward Contracts are smart contracts that hold the balance of your Quest Rewards. This is where you’ll deposit assets (ERC-20, ERC-721, ERC-1155) that will be issued as rewards to eligible players who complete your Quest.'
    },
    {
      question: 'What if I have assets across multiple networks?',
      answer:
        'A single Quest can support multiple networks. Click on, “Add Reward Contract”, to specify Rewards across networks.'
    },
    {
      question: 'Can I deposit more rewards once the Quest is active?',
      answer:
        'Absolutely. You can always deposit more rewards into an active Quest from your Quest Details page.'
    },
    {
      question:
        'What happens if I disable a Quest before all Rewards have been claimed?',
      answer:
        'Similar to depositing additional Rewards, you can withdraw remaining Rewards from the Quest Details page.'
    },
    {
      question:
        'What if I withdraw my Quest Rewards before all the Rewards have been claimed?',
      answer:
        'If the Rewards pool is depleted prior to all rewards being claimed, the Quest will be deactivated.'
    },
    {
      question:
        'Can I issue different number of Rewards across multiple Reward types?',
      answer:
        'Absolutely. A single Quest can support multiple networks (Mainnet, Polygon, etc.) and multiple Reward types (ERC-20, ERC-721, ERC-1155).'
    },
    {
      question:
        'Why is there a gas fee associated with deploying Reward Contracts?',
      answer:
        'Gas fees incentivize blockchain validators to accurately process transactions and uphold the security of the blockchain ledger. HyperPlay does not take any portion of the gas fee associated with deploying Reward Contracts.'
    },
    {
      question: 'What are Quest Types?',
      answer:
        "A Quest's type defines how the Quest functions. Reputation Airdrops is our first Quest type, based upon the player's web2 gaming reputation. Other types are planned, including Leaderboard based Quests."
    },
    {
      question: 'Where can I find my Token ID(s)?',
      answer: 'MAYBE: Link out to an existing explanation video.'
    }
  ]
}

export const Default: Story = {
  args: { ...props },
  render: (args: FAQProps) => (
    <div>
      <FAQ {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggleFirstItem = canvas.getByText(props.faqList[0].question)
    await userEvent.click(toggleFirstItem)

    expect(canvas.getByText(props.faqList[0].answer)).toBeVisible()

    const seeMoreButton = canvas.getByRole('button', { name: /See more/i })
    await userEvent.click(seeMoreButton)

    const toggleInsideSeeMore = canvas.getByText(props.faqList[4].question)
    await userEvent.click(toggleInsideSeeMore)

    expect(canvas.getByText(props.faqList[4].answer)).toBeVisible()

    const seeLessButton = canvas.getByRole('button', { name: /See less/i })
    await userEvent.click(seeLessButton)
  }
}

export const WithDescription: Story = {
  args: {
    ...props,
    description: (
      <>
        {DESCRIPTION_MOCK}{' '}
        <span
          style={{
            color: 'var(--color-primary)',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >
          support@hyperplay.xyz
        </span>
      </>
    ),
    faqList: props.faqList.slice(0, 1)
  },
  render: (args: FAQProps) => (
    <div>
      <FAQ {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByText(DESCRIPTION_MOCK)).toBeVisible()
  }
}

export const OneItem: Story = {
  args: { ...props, faqList: props.faqList.slice(0, 1) },
  render: (args: FAQProps) => (
    <div>
      <FAQ {...args} />
    </div>
  )
}

export const SeeMore: Story = {
  args: { ...props, faqList: props.faqList.slice(0, 4) },
  render: (args: FAQProps) => (
    <div>
      <FAQ {...args} />
    </div>
  )
}
