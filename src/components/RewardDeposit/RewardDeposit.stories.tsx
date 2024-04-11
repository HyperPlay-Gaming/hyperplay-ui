import { useState } from 'react'

import { useForm, zodResolver } from '@mantine/form'
import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'

import { FormDepositActions } from '@/components/RewardDeposit/components/FormDepositActions'
import { RewardERC721 } from '@/components/RewardDeposit/components/FormDepositRewards/components/RewardERC721'
import RewardDepositMessage from '@/components/RewardDepositMessage'
import RewardDepositTokenList from '@/components/RewardDepositTokensList'

import { RewardERC20 } from './components/FormDepositRewards/components/RewardERC20'
import { RewardDeposit } from './index'

type Story = StoryObj<typeof RewardDeposit>

const meta: Meta<typeof RewardDeposit> = {
  title: 'Quests/RewardDeposit',
  component: RewardDeposit,
  args: {
    title: 'Reward',
    state: 'NOT_DEPOSITED',
    network: 'Polygon',
    tokenContractAddress: '0x216e17c29c175c043CF218a9105Aa1b6fa6dB31A',
    rewardType: 'erc20',
    tokenName: 'USDC',
    amountPerPlayer: 10
  }
}

export default meta

const erc20Schema = z.object({
  playerReach: z.number().min(1)
})

type ERC20Form = z.infer<typeof erc20Schema>

const formatAmount = (amount: number) => amount.toLocaleString('en-US')

export const ERC20PendingDeposit: Story = {
  render: (args) => {
    const form = useForm<ERC20Form>({
      validate: zodResolver(erc20Schema)
    })

    const playerReach = form.values.playerReach ?? 0
    const depositingAmount = playerReach * (args.amountPerPlayer ?? 0)
    const message = `A total of ${formatAmount(playerReach)} player${
      playerReach > 1 ? 's' : ''
    } will each be able to claim ${args.amountPerPlayer} ${
      args.tokenName
    } for successfully completing this Quest.`

    const onDeposit = form.onSubmit(() => {
      alert(`Depositing ${depositingAmount} ${args.tokenName}`)
    })

    return (
      <RewardDeposit
        {...args}
        message={depositingAmount > 0 ? message : undefined}
        DepositComponent={
          <RewardERC20
            totalPlayerReachNumberInputProps={form.getInputProps('playerReach')}
          />
        }
        ActionComponent={
          <FormDepositActions
            depositingAmount={`${formatAmount(depositingAmount)} ${
              args.tokenName
            }`}
            onFormSubmit={onDeposit}
          />
        }
        warning={
          depositingAmount > 0
            ? 'Please ensure the desired Reward token(s) are in your wallet.'
            : undefined
        }
      />
    )
  }
}

export const ERC20Deposited: Story = {
  render: (args) => {
    const playerReach = 100
    const message = `A total of ${formatAmount(playerReach)} player${
      playerReach > 1 ? 's' : ''
    } will each be able to claim ${args.amountPerPlayer} ${
      args.tokenName
    } for successfully completing this Quest.`

    return (
      <RewardDeposit
        {...args}
        state="DEPOSITED"
        message={message}
        DepositComponent={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-neutral-400)' }}>
              Total Player Reach
            </span>
            <span>{playerReach}</span>
          </div>
        }
      />
    )
  }
}

const tokenIdSchema = z
  .object({
    from: z.number(),
    to: z.number()
  })
  .refine((data) => data.from < data.to, {
    message: 'From ID must be smaller than To ID',
    path: ['from'] // specify the path of the field that the error message is associated with
  })

type TokenIdsForm = z.infer<typeof tokenIdSchema>

const manualTokenIdSchema = z.object({
  tokenId: z.number()
})

type ManualTokenIdForm = z.infer<typeof manualTokenIdSchema>

export const ERC721PendingDeposit: Story = {
  args: {
    tokenName: 'AZUKI',
    amountPerPlayer: undefined
  },
  render: (args) => {
    const mockedOwnedTokenIds = new Map<number, boolean>(
      [1, 2, 3, 4, 5].map((id) => [id, true])
    )
    const [tokenIds, setTokenIds] = useState<{ id: number; error?: string }[]>(
      []
    )

    const addTokenForm = useForm<TokenIdsForm>({
      validate: zodResolver(tokenIdSchema)
    })

    const manualTokenForm = useForm<ManualTokenIdForm>({
      validate: zodResolver(manualTokenIdSchema)
    })

    const onDeposit = () => {
      addTokenForm.validate()
      if (tokenIds.length === 0) return

      for (let i = 0; i < tokenIds.length; i++) {
        const hasToken = mockedOwnedTokenIds.get(tokenIds[i].id) ?? false
        if (!hasToken) {
          tokenIds[i].error = 'Reward token not owned'
        }
      }

      const valid = tokenIds.every((token) => !token.error)

      if (valid) {
        alert('Depositing tokens')
      }
    }

    const onAddToken = addTokenForm.onSubmit(() => {
      const { from, to } = addTokenForm.values
      const newTokenIds: number[] = []
      for (let i = from; i <= to; i++) {
        newTokenIds.push(i)
      }
      const tokenIdsSet = new Set(tokenIds.map((token) => token.id))
      const nonDuplicateTokenIds = newTokenIds.filter(
        (id) => !tokenIdsSet.has(id)
      )
      setTokenIds([...tokenIds, ...nonDuplicateTokenIds.map((id) => ({ id }))])
    })

    const onManualTokenAdd = () => {
      manualTokenForm.validate()

      if (!manualTokenForm.isValid()) {
        return
      }

      const alreadyInList = tokenIds.find(
        ({ id }) => id === manualTokenForm.values.tokenId
      )

      if (!alreadyInList) {
        setTokenIds([...tokenIds, { id: manualTokenForm.values.tokenId }])
      }
    }

    const tokenIdsList = tokenIds.map((tokenId) => ({
      tokenId: tokenId.id,
      error: tokenId.error,
      onRemoveTap: () => {
        setTokenIds(tokenIds.filter((id) => id !== tokenId))
      }
    }))

    const totalPlayerReach = tokenIds.length

    const message = `A total of ${totalPlayerReach} players be each able to claim 1 ${args.tokenName} for successfully completing this Quest.`

    return (
      <RewardDeposit
        {...args}
        playerReach={totalPlayerReach ? totalPlayerReach.toString() : '-'}
        DepositComponent={
          <RewardERC721
            message={totalPlayerReach > 0 ? message : undefined}
            defaultTokenIdsListVisibilityState={true}
            onAddTokenTap={onAddToken}
            tokenIdsList={tokenIdsList}
            onManualTokenAdd={onManualTokenAdd}
            manualTokenIdProps={{
              allowNegative: false,
              ...manualTokenForm.getInputProps('tokenId')
            }}
            tokenFromNumberInputProps={{
              ...addTokenForm.getInputProps('from'),
              allowNegative: false
            }}
            tokenToNumberInputProps={{
              ...addTokenForm.getInputProps('to'),
              allowNegative: false
            }}
          />
        }
        ActionComponent={
          <FormDepositActions
            onFormSubmit={onDeposit}
            depositingAmount={null}
          />
        }
      />
    )
  }
}

export const ERC721Deposited: Story = {
  args: {
    tokenName: 'AZUKI',
    amountPerPlayer: undefined
  },
  render: (args) => {
    const tokenIdsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
      <RewardDeposit
        {...args}
        state="DEPOSITED"
        playerReach={tokenIdsList.length.toString()}
        DepositComponent={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 12,
              border: `1px solid var(--color-neutral-700)`,
              borderRadius: 'var(--space-md)',
              gap: 16
            }}
          >
            <RewardDepositMessage
              message={`A total of ${tokenIdsList.length} players will each be able to claim 1 ${args.tokenName} for successfully completing this Quest.`}
            />
            <RewardDepositTokenList
              tokenCount={tokenIdsList.length}
              visibleByDefault={true}
            >
              {tokenIdsList.map((tokenId, index) => (
                <RewardDepositTokenList.Row key={`token-${tokenId}-${index}`}>
                  {tokenId}
                </RewardDepositTokenList.Row>
              ))}
            </RewardDepositTokenList>
          </div>
        }
      />
    )
  }
}
