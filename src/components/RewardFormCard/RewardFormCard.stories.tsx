import { Code } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import type { Meta, StoryObj } from '@storybook/react'
import { IconTrash } from '@tabler/icons-react'
import { z } from 'zod'

import Button from '@/components/Button'

import { RewardERC20_721, RewardERC1155 } from '../../index'
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
  data: ['ERC20', 'ERC721', 'ERC1155']
}

const RewardContract = (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <span
      className="caption"
      style={{
        color: 'var(--color-neutral-400)'
      }}
    >
      Reward Contract
    </span>
    <a href="#" style={{ color: 'var(--color-primary-300)' }}>
      0xC38329b34E939d3C9165D7301e8349Ec3036CB1c
    </a>
  </div>
)

const meta: Meta<typeof RewardFormCard> = {
  title: 'Quests/RewardFormCard',
  component: RewardFormCard,
  args: {
    title: 'Reward',
    networkInputProps: defaultNetworkInputProps,
    tokenContractAddressInputProps: defaultTokenContractAddressInputProps,
    tokenTypeInputProps: defaultTokenTypeInputProps,
    RewardContract
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

const zodBigIntValidate = z.string().transform((val, ctx) => {
  try {
    const parsed = BigInt(val)
    return parsed.toString() // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid bigint'
    })

    // Return early with z.NEVER if the transformation fails
    return z.NEVER
  }
})

const rewardsDetailsSchema = z.object({
  reward_type: z.union([
    z.literal('ERC721'),
    z.literal('ERC1155'),
    z.literal('ERC20')
  ]),
  chain_id: z.string(),
  image: z.string().url(),
  contract_address: z.string().regex(ethContractAddressRegex),
  name: z.string().min(1),
  amount_per_user: zodBigIntValidate,
  marketplace_url: z.string().url(),
  decimals: z.string(),
  // erc1155 props
  token_ids: z.array(
    z.object({
      amount_per_user: zodBigIntValidate,
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
      validate: zodResolver(rewardsDetailsSchema),
      validateInputOnChange: true
    })

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <RewardFormCard
          title="Reward"
          tokenContractAddressInputProps={{
            ...defaultTokenContractAddressInputProps,
            ...form.getInputProps('contract_address')
          }}
          rewardImageProps={{
            inputProps: {
              accept: 'image/svg+xml,image/png,image/jpeg'
            },
            ...form.getInputProps('image'),
            url: form.values.image,
            onFileChange: (file) => {
              if (!file) return
              const img = new Image()
              img.src = URL.createObjectURL(file)
              img.onload = () => {
                form.setFieldValue('image', img.src)
                if (img.width < 48 || img.height < 48) {
                  form.setFieldError(
                    'image',
                    'Image too small, must be at least 48x48'
                  )
                } else if (img.width / img.height !== 1) {
                  form.setFieldError(
                    'image',
                    'Image must have a 1:1 aspect ratio'
                  )
                } else {
                  form.setFieldError('image', '')
                }
              }
            }
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

const multipleRewardsSchema = z.object({
  rewards: z.array(rewardsDetailsSchema)
})

type MultipleRewardsFormSchema = z.infer<typeof multipleRewardsSchema>

export const DynamicForm: Story = {
  render: () => {
    const form = useForm<MultipleRewardsFormSchema>({
      initialValues: {
        rewards: [
          // @ts-expect-error: token_ids need to be initialized as an empty array
          {
            token_ids: []
          }
        ]
      },
      validate: zodResolver(multipleRewardsSchema)
    })

    const rewardsForms = form.values.rewards.map((_, index) => {
      const formValues = form.values.rewards[index]
      const formTokenType = formValues.reward_type
      let children = null

      if (formTokenType === 'ERC1155') {
        children = (
          <RewardERC1155
            addTokenId={() =>
              form.insertListItem(`rewards.${index}.token_ids`, {})
            }
            tokenIdsInputProps={formValues.token_ids?.map((_, tokenIndex) => ({
              tokenNameInputProps: form.getInputProps(
                `rewards.${index}.token_ids.${tokenIndex}.name`
              ),
              amountPerUserInputProps: form.getInputProps(
                `rewards.${index}.token_ids.${index}.amount_per_user`
              ),
              onRemoveClick: () => {
                if (formValues.token_ids?.length === 1) return
                form.removeListItem(`rewards.${index}.token_ids`, index)
              }
            }))}
            marketplaceUrlInputProps={form.getInputProps('marketplace_url')}
          />
        )
      } else if (formTokenType) {
        children = (
          <RewardERC20_721
            tokenType={formTokenType}
            tokenNameInputProps={form.getInputProps(`rewards.${index}.name`)}
            decimalsInputProps={form.getInputProps(`rewards.${index}.decimals`)}
            amountPerUserInputProps={form.getInputProps(
              `rewards.${index}.amount_per_user`
            )}
            marketplaceUrlInputProps={form.getInputProps(
              `rewards.${index}.marketplace_url`
            )}
          />
        )
      }

      return (
        <div
          key={index}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <RewardFormCard
            title={`Reward ${index + 1}`}
            RewardContract={RewardContract}
            icon={
              index > 0 ? (
                <DeleteButton
                  onClick={() => form.removeListItem('rewards', index)}
                />
              ) : undefined
            }
            rewardImageProps={{
              ...form.getInputProps(`rewards.${index}.image`),
              inputProps: {
                accept: 'image/svg+xml,image/png,image/jpeg'
              },
              url: formValues.image,
              onFileChange: (file) => {
                if (!file) return
                const img = new Image()
                img.src = URL.createObjectURL(file)
                img.onload = () => {
                  const fieldName = `rewards.${index}.image`
                  form.setFieldValue(fieldName, img.src)
                  if (img.width < 48 || img.height < 48) {
                    form.setFieldError(
                      fieldName,
                      'Image too small, must be at least 48x48'
                    )
                  } else if (img.width / img.height !== 1) {
                    form.setFieldError(
                      fieldName,
                      'Image must have a 1:1 aspect ratio'
                    )
                  } else {
                    form.setFieldError(fieldName, '')
                  }
                }
              }
            }}
            tokenContractAddressInputProps={{
              ...defaultTokenContractAddressInputProps,
              ...form.getInputProps(`rewards.${index}.contract_address`)
            }}
            networkInputProps={{
              ...defaultNetworkInputProps,
              ...form.getInputProps(`rewards.${index}.chain_id`)
            }}
            tokenTypeInputProps={{
              ...defaultTokenTypeInputProps,
              ...form.getInputProps(`rewards.${index}.reward_type`),
              value: formTokenType,
              onChange: (value) => {
                if (!value) return
                form.setFieldValue(
                  `rewards.${index}.reward_type`,
                  value as TokenType
                )
              }
            }}
          >
            {children}
          </RewardFormCard>
        </div>
      )
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button
          onClick={() =>
            form.insertListItem('rewards', {
              token_ids: []
            })
          }
          type="secondary"
          size="small"
          style={{ width: 'fit-content', marginLeft: 'auto' }}
        >
          Add reward
        </Button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {rewardsForms}
        </div>
        Form Value:
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        <Button
          onClick={() => form.validate()}
          type="secondary"
          size="small"
          style={{ width: 'fit-content', marginLeft: 'auto' }}
        >
          Submit
        </Button>
      </div>
    )
  }
}
