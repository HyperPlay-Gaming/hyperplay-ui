import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  forwardRef
} from 'react'

import cn from 'classnames'

import { QuestIcon } from '@/assets/images'
import Button, { ButtonProps } from '@/components/Button'

import styles from './index.module.scss'

interface NoQuestsContentProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLDivElement>> {
  onCreateNewQuest?: () => void
  i18n?: i18nNoQuestContentContext
  className?: string
  buttonProps?: ButtonProps
  /* eslint-disable-next-line */
  linkComponent?: any
  /* eslint-disable-next-line */
  linkProps?: any
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
        description: 'Recognize your most valuable players with Quest Rewards.',
        buttonText: 'Create Quest'
      },
      buttonProps = {},
      linkProps,
      linkComponent,
      ...props
    }: NoQuestsContentProps,
    ref
  ) {
    const LinkComponent = linkComponent ?? React.Fragment
    return (
      <div className={cn(styles.container, classNameProp)} ref={ref} {...props}>
        <div className={styles.questIconContainer}>
          <QuestIcon className={styles.questIcon} />
        </div>
        <h1 className={styles.title}>{i18n.title}</h1>
        <p className={styles.description}>{i18n.description}</p>
        <LinkComponent {...linkProps}>
          <Button
            className={styles.ctaButton}
            onClick={onCreateNewQuest}
            {...buttonProps}
          >
            {i18n.buttonText}
          </Button>
        </LinkComponent>
      </div>
    )
  }
)
