import cn from 'classnames'

import styles from './NoDeployedRewardContract.module.scss'

interface Props {
  onDeployContract: () => void
  message: string
  i18n?: {
    title: string
    button: string
  }
}

export function NoDeployedRewardContract({
  onDeployContract,
  message,
  i18n = {
    title: 'Reward Contract',
    button: 'Deploy Reward Contract'
  }
}: Props) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{i18n?.title}</span>
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
