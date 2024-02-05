import { InputHTMLAttributes, PropsWithChildren, forwardRef } from 'react'

import cn from 'classnames'

import { QuestIcon } from '@/assets/images'
import Button, { ButtonProps } from '@/components/Button'

import styles from './index.module.scss'

interface NoQuestsContentProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLDivElement>> {
  onCreateNewQuest: () => void
  i18n?: i18nNoQuestContentContext
  className?: string
  buttonProps?: ButtonProps
}

interface i18nNoQuestContentContext {
  title: string
  description: string
  buttonText: string
}

export default forwardRef<HTMLDivElement, NoQuestsContentProps>(
  function NoQuestsContent(
    {
      className: classNameProp,
      onCreateNewQuest,
      i18n = {
        title: 'Create your first Quest',
        description:
          'Incentivize players with previous Steam Achievements to try out your game.',
        buttonText: 'Create New Quest'
      },
      buttonProps = {},
      ...props
    }: NoQuestsContentProps,
    ref
  ) {
    return (
      <div className={cn(styles.container, classNameProp)} ref={ref} {...props}>
        <QuestIcon className={styles.questIcon} />
        <h1 className={styles.title}>{i18n.title}</h1>
        <p className={styles.description}>{i18n.description}</p>
        <Button onClick={onCreateNewQuest} {...buttonProps}>
          {i18n.buttonText}
        </Button>
      </div>
    )
  }
)
