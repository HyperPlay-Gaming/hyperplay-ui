import { Code } from '@mantine/core'
import { UseFormReturnType, useForm, zodResolver } from '@mantine/form'
import type { Meta, StoryObj } from '@storybook/react'
import { IconTrash } from '@tabler/icons-react'
import { z } from 'zod'

import Button from '@/components/Button'

import { RewardERC20_721, RewardERC1155 } from '../../index'
import RewardFormCard from './index'

const ethContractAddressRegex = /^0x[a-fA-F0-9]{40}$/g

const defaultNetworkInputProps = {
  options: ['Mainnet', 'Polygon', 'Binance Smart Chain'],
  inputProps: {
    label: 'Network',
    placeholder: 'Select a Network'
  }
}

const defaultTokenContractAddressInputProps = {
  label: 'Token Contract Address',
  placeholder: 'Enter a contract address'
}

const defaultTokenTypeInputProps = {
  label: 'Reward Token Type',
  placeholder: 'Select a Reward Token Type',
  data: ['ERC20', 'ERC721', 'ERC1155']
}

const meta: Meta<typeof RewardFormCard> = {
  title: 'Quests/RewardFormCard',
  component: RewardFormCard,
  args: {
    title: 'Reward',
    networkInputProps: defaultNetworkInputProps,
    tokenContractAddressInputProps: defaultTokenContractAddressInputProps,
    tokenTypeInputProps: defaultTokenTypeInputProps
  }
}

const IconButton = (
  <button onClick={() => alert('Deleted clicked')}>
    <IconTrash color="var(--color-neutral-400)" />
  </button>
)

export default meta

type Story = StoryObj<typeof RewardFormCard>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: IconButton
  }
}

export const Erc20: Story = {
  args: {
    children: <RewardERC20_721 tokenType="ERC20" />
  }
}

export const Erc721: Story = {
  args: {
    children: <RewardERC20_721 tokenType="ERC721" />
  }
}

export const Erc1155: Story = {
  args: {
    children: <RewardERC1155 />
  }
}

const rewardsDetailsSchema = z.object({
  reward_type: z.union([
    z.literal('ERC721'),
    z.literal('ERC1155'),
    z.literal('ERC20')
  ]),
  chain_id: z.string(),
  contract_address: z.string().regex(ethContractAddressRegex),
  name: z.string().min(1),
  amount_per_user: z.string(),
  marketplace_url: z.string().url(),
  decimals: z.string(),
  // erc1155 props
  token_ids: z.array(
    z.object({
      amount_per_user: z.string(),
      name: z.string()
    })
  )
})

type FormSchema = z.infer<typeof rewardsDetailsSchema>
type TokenType = FormSchema['reward_type']

function ControlledRewardForm({
  title,
  form
}: {
  title: string
  form: UseFormReturnType<FormSchema>
}) {
  const formTokenType = form.values.reward_type
  let children = null

  if (formTokenType === 'ERC1155') {
    children = (
      <RewardERC1155
        addTokenId={() => form.insertListItem('token_ids', {})}
        tokenIdsInputProps={form.values.token_ids?.map((_, index) => ({
          tokenNameInputProps: form.getInputProps(`token_ids.${index}.name`),
          amountPerUserInputProps: form.getInputProps(
            `token_ids.${index}.amount_per_user`
          ),
          onRemoveClick: () => {
            if (form.values.token_ids?.length === 1) return
            form.removeListItem('token_ids', index)
          }
        }))}
        marketplaceUrlInputProps={form.getInputProps('marketplace_url')}
      />
    )
  } else if (formTokenType) {
    children = (
      <RewardERC20_721
        tokenType={formTokenType}
        tokenNameInputProps={form.getInputProps('name')}
        decimalsInputProps={form.getInputProps('decimals')}
        amountPerUserInputProps={form.getInputProps('amount_per_user')}
        marketplaceUrlInputProps={form.getInputProps('marketplace_url')}
      />
    )
  }

  return (
    <RewardFormCard
      title={title}
      tokenContractAddressInputProps={{
        ...defaultTokenContractAddressInputProps,
        ...form.getInputProps('contract_address')
      }}
      networkInputProps={{
        ...defaultNetworkInputProps,
        ...form.getInputProps('chain_id')
      }}
      tokenTypeInputProps={{
        ...defaultTokenTypeInputProps,
        ...form.getInputProps('reward_type'),
        value: formTokenType,
        onChange: (value) => {
          if (!value) return
          form.setFieldValue('reward_type', value as TokenType)
        }
      }}
    >
      {children}
    </RewardFormCard>
  )
}

export const Controlled: Story = {
  render: () => {
    // @ts-expect-error: token_ids need to be initialized as an empty array
    const form = useForm<FormSchema>({
      // @ts-expect-error: same as above ^^
      initialValues: { token_ids: [] },
      validate: zodResolver(rewardsDetailsSchema)
    }) as UseFormReturnType<FormSchema>;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ControlledRewardForm title="Controlled" form={form} />
        <Button
          onClick={() => form.validate()}
          type="secondary"
          size="small"
          style={{ width: 'fit-content', marginLeft: 'auto' }}
        >
          Submit
        </Button>
        Values:
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </div>
    )
  }
}