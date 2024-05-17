import { Tooltip } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import cn from 'classnames'

import styles from './NoDeployedRewardContract.module.scss'

interface Props {
  onDeployContract: () => void
  message: string
  i18n?: {
    title: string
    button: string
    tooltip: string
  }
}

export function NoDeployedRewardContract({
  onDeployContract,
  message,
  i18n = {
    title: 'Reward Contract',
    button: 'Deploy Reward Contract',
    tooltip:
      'Reward Contracts are smart contracts that hold the balance of your Quest Rewards. See more in FAQ’s.'
  }
}: Props) {
  return (
    <div className={styles.root}>
      <div className={cn(styles.title, styles.label)}>
        <span>{i18n?.title}</span>
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
      <div className={styles.card}>
        <p className={cn('body-sm color-neutral-400', styles.text)}>
          {message}
        </p>
        <button onClick={onDeployContract} className={cn(styles.button)}>
          {i18n.button}
        </button>
      </div>
    </div>
  )
}

export default NoDeployedRewardContract
