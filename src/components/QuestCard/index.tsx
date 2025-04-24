import cn from 'classnames'

import { CardGeneric, CardGenericProps } from '../CardGeneric'
import styles from './index.module.scss'
import { Tooltip } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'

export interface QuestCardProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, keyof CardGenericProps> {
  title?: string
  image: string
  description?: string
  questType?: string
  gameTitle?: string
  questName?: string
  currencyAmount?: string
  currencyName?: string
  rewardImage?: string
  selected?: boolean
  className?: string | undefined
  classNames?: {
    root?: string
    image?: string
    body?: string
    questType?: string
    title?: string
    description?: string
    subtitle?: string
    questName?: string
    currencyAmount?: string
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
  currencyAmount,
  currencyName,
  classNames,
  className,
  selected,
  ...rest
}: QuestCardProps) {
  const classes: Record<string, boolean> = {}
  classes[styles.selected] = !!selected
  const textRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const currencyNameRef = useRef<HTMLDivElement>(null)
  const [showCurrencyName, setShowCurrencyName] = useState(false)

  useEffect(() => {
    const el = textRef.current
    if (el) {
      const isOverflowing =
        el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
      setShowTooltip(isOverflowing)
    }
  }, [description])

  useEffect(() => {
    const el = currencyNameRef.current
    if (el) {
      const isOverflowing =
        el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
      setShowCurrencyName(isOverflowing)
    }
  }, [currencyName])

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
        <div className={cn(styles.header)}>
          {title ? (
            <div className={cn(styles.title, 'menu-item', classNames?.title)}>
              {title}
            </div>
          ) : null}
          {gameTitle ? (
            <div
              className={cn(
                styles.subtitle,
                'caption-sm',
                classNames?.subtitle
              )}
            >
              {gameTitle}
            </div>
          ) : null}
          {description ? (
            <Tooltip
              arrowSize={16}
              position="bottom"
              arrowPosition="center"
              withArrow
              label={description}
              className={cn(styles.tooltip, { [styles.show]: showTooltip })}
              events={{ hover: true, touch: true, focus: false }}
            >
              <div
                className={cn(
                  styles.description,
                  'eyebrow',
                  classNames?.description
                )}
                ref={textRef}
              >
                {description}
              </div>
            </Tooltip>
          ) : null}
          {questName ? (
            <div
              className={cn(
                styles.questName,
                'title-sm',
                classNames?.questName
              )}
            >
              {questName}
            </div>
          ) : null}
        </div>
        {currencyAmount || currencyName ? (
          <div className={cn(styles.questsDetails, classNames?.questDetails)}>
            <div className={cn(styles.avatarWithName)}>
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
              <Tooltip
                arrowSize={16}
                position="bottom"
                arrowPosition="center"
                withArrow
                label={currencyName}
                className={cn(styles.tooltip, {
                  [styles.show]: showCurrencyName
                })}
                events={{ hover: true, touch: true, focus: false }}
              >
                <div
                  ref={currencyNameRef}
                  className={cn(
                    styles.currencyName,
                    'body-sm',
                    classNames?.currencyName
                  )}
                >
                  {currencyName}
                </div>
              </Tooltip>
            </div>

            {currencyAmount && (
              <div className={cn(styles.amount, classNames?.currencyAmount)}>
                {currencyAmount}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </CardGeneric>
  )
}
