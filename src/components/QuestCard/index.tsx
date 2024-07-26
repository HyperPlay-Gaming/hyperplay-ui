import cn from 'classnames'

import { TreasureChest } from '@/assets/images'

import { CardGeneric, CardGenericProps } from '../CardGeneric'
import styles from './index.module.scss'

export interface QuestCardProps extends CardGenericProps {
  title?: string
  description?: string
  questType?: string
  gameTitle?: string
  questName?: string
  currenyAmount?: string
  currencyName?: string
  rewardImage?: string
  selected?: boolean
  classNames?: {
    root?: string
    image?: string
    body?: string
    questType?: string
    title?: string
    description?: string
    subtitle?: string
    questName?: string
    currenyAmount?: string
    currencyName?: string
    questCurrency?: string
    avatarContainer?: string
    questDetails?: string
    avatar?: string
  }
}

export function QuestCard({
  title,
  description,
  questName,
  questType,
  gameTitle,
  rewardImage,
  currenyAmount,
  currencyName,
  className,
  classNames,
  selected,
  ...rest
}: QuestCardProps) {
  const classes: Record<string, boolean> = {}
  classes[styles.selected] = !!selected
  return (
    <CardGeneric
      className={cn(styles.card, className)}
      genericClassNames={{
        body: cn(styles.body, classes),
        image: cn(styles.image, classNames?.image),
        root: cn(styles.root, classNames?.root),
        label: cn(styles.questType, classNames?.questType)
      }}
      i18n={{
        label: questType
      }}
      showLabel={Boolean(questType)}
      {...rest}
    >
      <div className={cn(styles.content)}>
        {title ? (
          <div className={cn(styles.title, 'menu-item', classNames?.title)}>
            {title}
          </div>
        ) : null}
        {gameTitle ? (
          <div
            className={cn(styles.subtitle, 'caption-sm', classNames?.subtitle)}
          >
            {gameTitle}
          </div>
        ) : null}
        {description ? (
          <div
            className={cn(styles.description, 'body', classNames?.description)}
          >
            {description}
          </div>
        ) : null}
        {questName ? (
          <div className={cn(styles.questName, 'title', classNames?.questName)}>
            {questName}
          </div>
        ) : null}
        {currenyAmount || currencyName ? (
          <div className={cn(styles.questsDetails, classNames?.questDetails)}>
            <div
              className={cn(
                styles.avatarContainer,
                classNames?.avatarContainer
              )}
            >
              <img
                src={rewardImage}
                alt={`${questName} Reward Image`}
                className={cn(styles.avatar, classNames?.avatar)}
              />
            </div>
            <div
              className={cn(styles.questCurrency, classNames?.questCurrency)}
            >
              {currenyAmount && (
                <div className={cn(styles.amount, classNames?.currenyAmount)}>
                  {currenyAmount}
                </div>
              )}
              <div
                className={cn(styles.currencyName, classNames?.currencyName)}
              >
                {currencyName}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </CardGeneric>
  )
}
