import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { FormDepositRewards, FormDepositRewardsProps, defaultI18n as defaultFormDepositI18n } from './index'

type Story = StoryObj<typeof FormDepositRewards>

const meta: Meta<typeof FormDepositRewards> = {
  title: 'Quests/RewardDeposit/FormDepositRewards',
  component: FormDepositRewards,
  excludeStories: ['formDepositRewardsProps', 'genericInputProp']
}

export const genericInputProp = (value?: unknown) => {
  const props: GetInputPropsReturnType = {
    value: value,
    /* eslint-disable-next-line */
    onChange: (val: any) => console.log('on change ', val)
  }

  return props
}

export default meta

export const formDepositRewardsProps: FormDepositRewardsProps = {
  tokenFromNumberInputProps: genericInputProp(),
  tokenToNumberInputProps: genericInputProp(),
  amountPerUserTextInputProps: genericInputProp(),
  totalPlayerReachNumberInputProps: genericInputProp(),
  tokenIdGoldNumberInputProps: genericInputProp(),
  tokenIdSilverNumberInputProps: genericInputProp(),
  totalPlayerReachGoldNumberInputProps: genericInputProp(),
  totalPlayerReachSilverNumberInputProps: genericInputProp(),
  defaultTokenIdsListVisibilityState: true,
  tokenIdsList: [
    {
      tokenId: 55,
      onClick: fn()
    },
    {
      tokenId: 54,
      onClick()
    },
    {
      tokenId: 65,
      onClick: fn()
    }
  ],
  onAddTokenTap: fn(),
  i18n: defaultFormDepositI18n
}

export const Default: Story = {
  args: { ...formDepositRewardsProps }
}

export const ERC20: Story = {
  args: { ...formDepositRewardsProps, defaultSelected: 'ERC20' },
  play: async ({ step }) => {
    await step('Expect Total Player Reach Input to have value', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const totalPlayerReachInput = canvas.getByPlaceholderText(args.i18n?.placeholder.totalPlayerReach || '0')
      await userEvent.type(totalPlayerReachInput, '100')

      await expect(totalPlayerReachInput).toHaveValue('100')
    })
  }
}

export const ERC721: Story = {
  args: {
    defaultSelected: 'ERC721',
    i18n: {
      ...defaultFormDepositI18n,
      placeholder: {
        ...defaultFormDepositI18n.placeholder,
        tokenFrom: 'Amount A',
        tokenTo: 'Amount B',
        tokenId: 'Amount C',
      }
    },
    ...formDepositRewardsProps,
  },
  play: async ({ step }) => {
    await step('Expect From Input to have value', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const fromInput = canvas.getByPlaceholderText(args.i18n?.placeholder.tokenFrom || '0')
      await userEvent.type(fromInput, '1')

      await expect(fromInput).toHaveValue('1')
    })

    await step('Expect From Input to have value', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const toInput = canvas.getByPlaceholderText(args.i18n?.placeholder.tokenTo || '0')
      await userEvent.type(toInput, '88')

      await expect(toInput).toHaveValue('88')
    })

    await step('Expect Token Id Input to have value', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const tokenIdInput = canvas.getByPlaceholderText(args.i18n?.placeholder.tokenId || '0')
      await userEvent.type(tokenIdInput, '100')

      await expect(tokenIdInput).toHaveValue('100')
    })

    await step('Form submit should be called', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const button = canvas.getByRole('button', { name: args.i18n?.callToActionAddToken });
      await expect(button).not.toBeDisabled()

      await userEvent.click(button)
      await expect(args.onAddTokenTap).toHaveBeenCalled()
    })

    await step('Should have total current Token Ids', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const counterText = canvas.getByText(`${args.i18n?.addedTokenCounterText} ${args.tokenIdsList.length}`)

      expect(counterText).toBeVisible()
    })

    await step('Should have collapse Ids from `tokenIdsList`', async ({ args, canvasElement }) => {
      const canvas = within(canvasElement)
      const counterText = canvas.getByText(args.i18n?.collapseAllIds || '')

      expect(counterText).toBeVisible()
      await userEvent.click(counterText)

      args.tokenIdsList.map(({ tokenId }) => {
        const tokenIdText = canvas.getByText(tokenId.toString())
        expect(tokenIdText).toBeVisible()
      })
    })
  }
}

export const ERC721DisabledAddTokenId: Story = {
  args: {
    ...formDepositRewardsProps,
    defaultSelected: 'ERC721',
    isAddTokenButtonDisabled: true,
  },
  play: async ({ step }) => {
    await step('Form submit should not be called', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const button = canvas.getByRole('button', { name: args.i18n?.callToActionAddToken });
      await expect(button).toBeDisabled()

      await userEvent.click(button)
      await expect(args.onAddTokenTap).not.toHaveBeenCalled()
    })
  }
}

export const ERC1155: Story = {
  args: { 
    ...formDepositRewardsProps,
    defaultSelected: 'ERC1155',
    i18n: {
      ...defaultFormDepositI18n,
      placeholder: {
        ...defaultFormDepositI18n.placeholder,
        tokenIdGold: 'Paste Token Id Gold',
        tokenIdSilver: 'Paste Token Id Silver',
        totalPlayerReachGold: 'Paste Total Player Reach Gold',
        totalPlayerReachSilver: 'Paste Total Player Reach Silver',
      }
    },
  },
  play: async ({ step }) => {
    await step('Expect Token Id: Gold Input to have value', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const tokenIdGoldInput = canvas.getByPlaceholderText(args.i18n?.placeholder.tokenIdGold || '0')
      await userEvent.type(tokenIdGoldInput, '1')

      await expect(tokenIdGoldInput).toHaveValue('1')
    })

    await step('Expect Token Id: Silver Input to have value', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const tokenIdSilverInput = canvas.getByPlaceholderText(args.i18n?.placeholder.tokenIdSilver || '0')
      await userEvent.type(tokenIdSilverInput, '88')

      await expect(tokenIdSilverInput).toHaveValue('88')
    })

    await step('Expect Total Player Reach: Gold Input to have value', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const totalPlayerReachGoldInput = canvas.getByPlaceholderText(args.i18n?.placeholder.totalPlayerReachGold || '0')
      await userEvent.type(totalPlayerReachGoldInput, '100')

      await expect(totalPlayerReachGoldInput).toHaveValue('100')
    })

    await step('Expect Total Player Reach: Silver Input to have value', async ({ canvasElement, args }) => {
      const canvas = within(canvasElement)
      const totalPlayerReachSilverInput = canvas.getByPlaceholderText(args.i18n?.placeholder.totalPlayerReachSilver || '0')
      await userEvent.type(totalPlayerReachSilverInput, '50')

      await expect(totalPlayerReachSilverInput).toHaveValue('50')
    })
  }
}