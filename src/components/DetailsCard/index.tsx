import cn from 'classnames'

import Button, { ButtonProps } from '@/components/Button'

import styles from './DetailsCard.module.scss'

interface DetailsCardI18nProp {
  title: string
  buttonText?: string
}

export const defaultI18n: DetailsCardI18nProp = {
  title: 'Stay up to date',
  buttonText: 'Follow us'
}

export interface DetailsCardProps {
  className?: string
  contentClassName?: string
  Icon?: React.ReactNode
  ContentComponent: React.ReactNode
  onActionTap: () => void
  buttonProps?: ButtonProps
  i18n?: DetailsCardI18nProp
}

const DetailsCard = ({
  className,
  contentClassName,
  Icon,
  ContentComponent,
  onActionTap,
  buttonProps,
  i18n = defaultI18n
}: DetailsCardProps) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.content, contentClassName)}>
        {Icon ?? null}
        <h3 className={cn(styles.cardTitle)}>{i18n.title}</h3>
        <div className={cn(styles.cardDescription)}>{ContentComponent}</div>
      </div>
      <div className={cn(styles.actionsContainer)}>
        <Button
          type="link"
          onClick={onActionTap}
          spacing="xs"
          size="small"
          className={cn(styles.actionButton)}
          {...buttonProps}
        >
          {i18n.buttonText}
        </Button>
      </div>
    </div>
  )
}

export default DetailsCard
