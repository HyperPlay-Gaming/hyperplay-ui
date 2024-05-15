import { Code } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import type { Meta, StoryObj } from '@storybook/react'
import { IconTrash } from '@tabler/icons-react'
import { z } from 'zod'

import Button from '@/components/Button'
import NoDeployedRewardContract from '@/components/NoDeployedRewardContract'

import {
  RewardCommonInputs,
  RewardCommonInputsProps,
  RewardERC20_721,
  RewardERC1155
} from '../../index'
import RewardFormCard from './index'

const ethContractAddressRegex = /^0x[a-fA-F0-9]{40}$/g

const defaultNetworkInputProps = {
  data: [
    { value: '1', label: 'Ethereum' },
    { value: '0x38', label: 'Binance Smart Chain' },
    { value: '0x89', label: 'Polygon' },
    { value: '0x4', label: 'Rinkeby' }
  ],
  label: 'Network',
  placeholder: 'Select a Network'
}

const defaultTokenContractAddressInputProps = {
  label: 'Token Contract Address',
  placeholder: 'Enter a contract address'
}

const defaultTokenTypeInputProps = {
  label: 'Reward Token Type',
  placeholder: 'Select a Reward Token Type',
  data: ['ERC-20', 'ERC-721', 'ERC-1155']
}

const defaultRewardContractProps = {
  address: '0xC38329b34E939d3C9165D7301e8349Ec3036CB1c',
  url: 'https://etherscan.io/address/0xC38329b34E939d3C9165D7301e8349Ec3036CB1c'
}

const meta: Meta<typeof RewardFormCard> = {
  title: 'Quests/RewardFormCard',
  component: RewardFormCard,
  args: {
    title: 'Reward',
    networkInputProps: defaultNetworkInputProps
  }
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <IconTrash color="var(--color-neutral-400)" />
    </button>
  )
}

export default meta

type Story = StoryObj<typeof RewardFormCard>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <DeleteButton onClick={() => alert('Delete reward clicked')} />
  }
}

export const NoRewardContract: Story = {
  args: {
    children: (
      <NoDeployedRewardContract
        onDeployContract={() => alert('Deploy contract')}
        message="You currently don’t have an existing Reward Contract for ETH Mainnet Network. Please deploy a new Reward Contract."
      />
    )
  }
}

export const Erc20: Story = {
  args: {
    children: (
      <RewardERC20_721
        tokenType="ERC-20"
        rewardContractProps={{ rewardContract: defaultRewardContractProps }}
        tokenTypeInputProps={defaultTokenTypeInputProps}
        tokenContractAddressInputProps={defaultTokenContractAddressInputProps}
      />
    )
  }
}

export const Erc721: Story = {
  args: {
    children: (
      <RewardERC20_721
        tokenType="ERC-721"
        rewardContractProps={{ rewardContract: defaultRewardContractProps }}
        tokenTypeInputProps={defaultTokenTypeInputProps}
        tokenContractAddressInputProps={defaultTokenContractAddressInputProps}
      />
    )
  }
}

export const Erc1155: Story = {
  args: {
    children: (
      <RewardERC1155
        rewardContractProps={{ rewardContract: defaultRewardContractProps }}
        tokenTypeInputProps={defaultTokenTypeInputProps}
        tokenContractAddressInputProps={defaultTokenContractAddressInputProps}
      />
    )
  }
}

const rewardsDetailsSchema = z.object({
  reward_type: z.union([
    z.literal('ERC-721'),
    z.literal('ERC-1155'),
    z.literal('ERC-20')
  ]),
  chain_id: z.string(),
  image: z.string().url(),
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

export const Controlled: Story = {
  render: () => {
    const form = useForm<FormSchema>({
      // @ts-expect-error: token_ids need to be initialized as an empty array
      initialValues: { token_ids: [] },
      validate: zodResolver(rewardsDetailsSchema)
    })

    const formTokenType = form.values.reward_type

    // only for testing purposes
    const networksContracts = new Map(
      defaultNetworkInputProps.data.map(({ value }, index) => [
        value,
        index % 2 === 0 ? '0xC38329b34E939d3C9165D7301e8349Ec3036CB1c' : null
      ])
    )

    const contractAddress = networksContracts.get(form.values.chain_id)

    const onFileChange = (file: File | null) => {
      if (!file) return
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        form.setFieldValue('image', img.src)
        if (img.width < 48 || img.height < 48) {
          form.setFieldError('image', 'Image too small, must be at least 48x48')
        } else if (img.width / img.height !== 1) {
          form.setFieldError('image', 'Image must have a 1:1 aspect ratio')
        } else {
          form.setFieldError('image', '')
        }
      }
    }

    const commonProps: RewardCommonInputsProps = {
      tokenContractAddressInputProps: {
        ...defaultTokenContractAddressInputProps,
        ...form.getInputProps('contract_address')
      },
      rewardImageProps: {
        inputProps: {
          accept: 'image/svg+xml,image/png,image/jpeg'
        },
        ...form.getInputProps('image'),
        url: form.values.image,
        onFileChange: onFileChange
      },
      tokenTypeInputProps: {
        ...defaultTokenTypeInputProps,
        ...form.getInputProps('reward_type'),
        value: formTokenType,
        onChange: (value) => {
          if (!value) return
          form.setFieldValue('reward_type', value as TokenType)
        }
      }
    }

    if (contractAddress) {
      commonProps.rewardContractProps = {
        rewardContract: {
          address: contractAddress,
          url: `https://etherscan.io/address/${contractAddress}`
        }
      }
    }

    let children = null

    if (form.values.chain_id && !contractAddress) {
      children = (
        <NoDeployedRewardContract
          onDeployContract={() => alert('Deploy contract')}
          message={`You currently don’t have an existing Reward Contract for ${
            defaultNetworkInputProps.data.find(
              ({ value }) => value === form.values.chain_id
            )?.label
          } Network. Please deploy a new Reward Contract.`}
        />
      )
    }

    if (form.values.chain_id && contractAddress && !formTokenType) {
      children = <RewardCommonInputs {...commonProps} />
    }

    if (form.values.chain_id && contractAddress && formTokenType) {
      if (formTokenType === 'ERC-1155') {
        children = (
          <RewardERC1155
            {...commonProps}
            addTokenId={() => form.insertListItem('token_ids', {})}
            tokenIdsInputProps={form.values.token_ids?.map((_, index) => ({
              tokenNameInputProps: form.getInputProps(
                `token_ids.${index}.name`
              ),
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
      } else {
        children = (
          <RewardERC20_721
            {...commonProps}
            tokenType={formTokenType}
            tokenNameInputProps={form.getInputProps('name')}
            decimalsInputProps={form.getInputProps('decimals')}
            amountPerUserInputProps={form.getInputProps('amount_per_user')}
            marketplaceUrlInputProps={form.getInputProps('marketplace_url')}
          />
        )
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <RewardFormCard
          title="Reward"
          networkInputProps={{
            ...defaultNetworkInputProps,
            ...form.getInputProps('chain_id')
          }}
        >
          {children}
        </RewardFormCard>
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
