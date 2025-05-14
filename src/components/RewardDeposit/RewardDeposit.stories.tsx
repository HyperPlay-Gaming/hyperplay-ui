import { useState } from 'react'

import { useForm, zodResolver } from '@mantine/form'
import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'

import RewardDepositActions from './components/RewardDepositActions'
import RewardDepositMessage from './components/RewardDepositMessage'
import RewardDepositTokenList from './components/RewardDepositTokensList'
import RewardERC20Deposit from './components/RewardERC20Deposit'
import RewardERC721Deposit from './components/RewardERC721Deposit'
import { TokenIdRowProps } from './components/RewardERC721Deposit/components/TokenIdRow'
import RewardERC1155Deposit from './components/RewardERC1155Deposit'
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
    amountPerPlayer: 10,
    questType: 'PLAYSTREAK'
  },
  argTypes: {
    questType: {
      control: 'select',
      options: ['PLAYSTREAK', 'LEADERBOARD'],
      description: 'Type of quest'
    }
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
    const isLeaderboard = args.questType === 'LEADERBOARD'
    if (isLeaderboard) args.amountPerPlayer = undefined

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
        message={depositingAmount > 0 && !isLeaderboard ? message : undefined}
        DepositComponent={
          isLeaderboard ? undefined : (
            <RewardERC20Deposit
              totalPlayerReachNumberInputProps={form.getInputProps(
                'playerReach'
              )}
            />
          )
        }
        ActionComponent={
          <RewardDepositActions
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
    const isLeaderboard = args.questType === 'LEADERBOARD'
    if (isLeaderboard) args.amountPerPlayer = undefined

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
        message={!isLeaderboard ? message : undefined}
        DepositComponent={
          isLeaderboard ? undefined : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-neutral-400)' }}>
                Total Player Reach
              </span>
              <span>{playerReach}</span>
            </div>
          )
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
    const isLeaderboard = args.questType === 'LEADERBOARD'
    if (isLeaderboard) args.amountPerPlayer = undefined

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
          tokenIds[i].error = 'Reward token not found in wallet'
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

    const tokenIdsList: TokenIdRowProps[] = tokenIds.map((tokenId) => ({
      tokenId: tokenId.id,
      error: tokenId.error,
      status: 'DRAFT',
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
          <RewardERC721Deposit
            message={
              totalPlayerReach > 0 && args.questType !== 'LEADERBOARD'
                ? message
                : undefined
            }
            defaultTokenIdsListVisibilityState={true}
            onAddTokenTap={onAddToken}
            tokenIdsList={tokenIdsList}
            onManualTokenAdd={onManualTokenAdd}
            onClearTokenIds={() => setTokenIds([])}
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
          <RewardDepositActions
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
    const isLeaderboard = args.questType === 'LEADERBOARD'
    const tokenIdsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const message = `A total of ${tokenIdsList.length} players will each be able to claim 1 ${args.tokenName} for successfully completing this Quest.`

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
            {!isLeaderboard && <RewardDepositMessage message={message} />}
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

const erc1155Schema = z.object({
  tokenIds: z.array(
    z.object({
      name: z.string().optional(),
      playerReach: z.number().min(1)
    })
  )
})

type ERC1155Form = z.infer<typeof erc1155Schema>

type Token = {
  name: string
  amount: number
}

function createQuestMessage(tokens: Token[]): string {
  // Sort tokens by amount in descending order
  const sortedTokens = tokens.sort((a, b) => b.amount - a.amount)

  // Build the message by looping through the sorted tokens
  let message = `The first ${formatAmount(
    sortedTokens[0].amount
  )} players to complete this Quest will each be able to claim`

  // Add all tokens to the claim for the first group
  sortedTokens.forEach((token, index) => {
    if (index === sortedTokens.length - 1) {
      message += ` and 1 ${token.name}`
    } else {
      message += ` 1 ${token.name},`
    }
  })

  message += '.'

  // Handle additional claims for remaining players
  for (let i = 1; i < sortedTokens.length; i++) {
    const remainingPlayers = sortedTokens[i].amount - sortedTokens[i - 1].amount
    if (remainingPlayers > 0) {
      message += ` The next ${remainingPlayers} players will each be able to claim 1 ${sortedTokens[i].name}.`
    }
  }

  return message
}

const mockedErc1155RewardsTokens = [
  {
    id: 1,
    amount_per_user: 1000,
    name: 'Iron',
    token_id: null
  },
  {
    id: 2,
    amount_per_user: 1000,
    name: 'Bronze',
    token_id: null
  },
  {
    id: 3,
    amount_per_user: 1000,
    name: 'Silver',
    token_id: null
  },
  {
    id: 4,
    amount_per_user: 10000,
    name: 'Gold',
    token_id: null
  },
  {
    id: 5,
    amount_per_user: 1000,
    name: 'Platinum',
    token_id: null
  },
  {
    id: 6,
    amount_per_user: 100,
    name: 'Emerald',
    token_id: null
  },
  {
    id: 7,
    amount_per_user: 10,
    name: 'Diamond',
    token_id: null
  },
  {
    id: 8,
    amount_per_user: 1,
    name: 'Master',
    token_id: null
  }
]

export const ERC1155PendingDeposit: Story = {
  args: {
    amountPerPlayer: undefined,
    rewardType: 'erc1155',
    tokenName: mockedErc1155RewardsTokens.map((token) => token.name).join(', '),
    marketplaceUrl: 'https://opensea.io/collection/azuki'
  },
  render: (args) => {
    const isLeaderboard = args.questType === 'LEADERBOARD'
    if (isLeaderboard) args.amountPerPlayer = undefined

    const form = useForm<ERC1155Form>({
      initialValues: {
        tokenIds: mockedErc1155RewardsTokens.map((token) => ({
          playerReach: token.amount_per_user,
          name: token.name
        }))
      },
      validate: zodResolver(erc1155Schema)
    })

    const onDeposit = form.onSubmit(() => {
      alert('Depositing tokens')
    })

    return (
      <RewardDeposit
        {...args}
        extraFields={Object.fromEntries(
          mockedErc1155RewardsTokens.map((token) => [
            `Amount Per Player (${token.name})`,
            '1'
          ])
        )}
        DepositComponent={
          isLeaderboard ? undefined : (
            <RewardERC1155Deposit
              tokenInputsProps={mockedErc1155RewardsTokens.map(
                (token, index) => ({
                  label: `Total Player Reach: ${token.name}`,
                  ...form.getInputProps(`tokenIds.${index}.playerReach`),
                  placeholder: '0',
                  allowNegative: false
                })
              )}
            />
          )
        }
        ActionComponent={
          <RewardDepositActions
            onFormSubmit={onDeposit}
            depositingAmount={null}
          />
        }
      />
    )
  }
}

export const ERC1155Deposited: Story = {
  args: {
    amountPerPlayer: undefined,
    rewardType: 'erc1155',
    tokenName: 'GOLD, SILVER',
    marketplaceUrl: 'https://opensea.io/collection/azuki'
  },
  render: (args) => {
    const isLeaderboard = args.questType === 'LEADERBOARD'
    if (isLeaderboard) args.amountPerPlayer = undefined

    const tokenOneName = 'GOLD'
    const tokenTwoName = 'SILVER'

    const tokenOneReach = 20
    const tokenTwoReach = 80

    const depositMessage = createQuestMessage([
      { name: tokenOneName, amount: tokenOneReach },
      { name: tokenTwoName, amount: tokenTwoReach }
    ])

    return (
      <RewardDeposit
        {...args}
        state="DEPOSITED"
        message={!isLeaderboard ? depositMessage : undefined}
        extraFields={{
          [`Amount Per Play: ${tokenOneName}`]: '1',
          [`Amount Per Play: ${tokenTwoName}`]: '1'
        }}
        DepositComponent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!isLeaderboard && (
              <>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: 'var(--color-neutral-400)' }}>
                    Total Player Reach ({tokenOneName})
                  </span>
                  <span>{tokenOneReach}</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: 'var(--color-neutral-400)' }}>
                    Total Player Reach ({tokenTwoName})
                  </span>
                  <span>{tokenTwoReach}</span>
                </div>
              </>
            )}
          </div>
        }
      />
    )
  }
}
