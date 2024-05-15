import { Tooltip } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import cn from 'classnames'

import RewardImageInput, {
  RewardImageInputProps
} from '@/components/RewardImageInput'
import Select, { SelectProps } from '@/components/Select'
import TextInput, { TextInputProps } from '@/components/TextInput'

import styles from './RewardCommonInputs.module.scss'

interface RewardContractProps {
  rewardContract: { address: string; url: string }
  i18n?: {
    rewardContractLabel: string
    tooltip: string
  }
}

function RewardContract({
  i18n = {
    rewardContractLabel: 'Reward Contract',
    tooltip:
      'Reward Contracts are smart contracts that hold the balance of your Quest Rewards. See more in FAQ’s.'
  },
  rewardContract
}: {
  rewardContract: { address: string; url: string }
  i18n?: {
    rewardContractLabel: string
    tooltip: string
  }
}) {
  return (
    <div>
      <div className={cn(styles.title, styles.label)}>
        <span>{i18n.rewardContractLabel}</span>
        <Tooltip
          w={290}
          multiline
          classNames={{ tooltip: styles.tooltip, arrow: styles.arrow }}
          label={i18n.tooltip}
          position="bottom-start"
          withArrow
        >
          <IconInfoCircle
            color="var(--color-neutral-400)"
            width={16}
            height={16}
          />
        </Tooltip>
      </div>
      <a
        href={rewardContract.url}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        {rewardContract.address}
      </a>
    </div>
  )
}

export interface RewardCommonInputsProps {
  networkInputProps?: SelectProps
  tokenContractAddressInputProps?: TextInputProps
  tokenTypeInputProps?: SelectProps
  rewardImageProps?: RewardImageInputProps
  rewardContractProps?: RewardContractProps
  children?: React.ReactNode
}

export function RewardCommonInputs({ ...props }: RewardCommonInputsProps) {
  return (
    <div className={styles.root}>
      {props.rewardContractProps && (
        <RewardContract {...props.rewardContractProps} />
      )}
      <div className={styles.split}>
        <div>
          <RewardImageInput label="Reward Image" {...props.rewardImageProps} />
          <span className="text--sm color-neutral-400 text--semibold">
            Requirements:
          </span>
          <ul className={cn('color-neutral-400', styles.requirementList)}>
            <li>SVG, PNG, JPG</li>
            <li>1:1 Ratio</li>
            <li>Min: 48px</li>
          </ul>
        </div>
        <div className={styles.inputs}>
          <TextInput {...props.tokenContractAddressInputProps} />
          <Select {...props.tokenTypeInputProps} />
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default RewardCommonInputs
