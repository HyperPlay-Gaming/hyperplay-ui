import styles from './NoDeployedRewardContract.module.scss'

interface i18n {
  title: string
  tooltip: string
  description: string
  buttonText: string
}

interface Props {
  onDeployClick: () => void
  i18n?: i18n
}

export const defaultI18n: i18n = {
  title: 'Reward Contract',
  description:
    'You currently don’t have an existing Reward Contract for ETH Mainnet Network. Please deploy one to be used for Reward disbursement.',
  buttonText: 'Deploy Reward Contract',
  tooltip:
    'Reward Contracts are smart contracts that hold the balance of your Quest Rewards. See more in FAQ’s.'
}

function NoDeployedRewardContract({
  onDeployClick,
  i18n = defaultI18n
}: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{i18n?.title}</span>
      <div className={styles.card}>
        <span className="body-sm color-neutral-400">{i18n?.description}</span>
        <button className={styles.button} onClick={onDeployClick}>
          {i18n?.buttonText}
        </button>
      </div>
    </div>
  )
}

export default NoDeployedRewardContract
