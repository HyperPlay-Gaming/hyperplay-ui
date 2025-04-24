import cn from 'classnames'

import { CardGeneric, CardGenericProps } from '../CardGeneric'
import styles from './index.module.scss'
import { Tooltip } from '@mantine/core'
import { useShowTooltipOnOverflow } from '@/utils/useShowTooltipOnOverflow'

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
  const { elementRef: textRef, showTooltip } = useShowTooltipOnOverflow()
  const { elementRef: currencyNameRef, showTooltip: showCurrencyNameTooltip } =
    useShowTooltipOnOverflow()
  const { elementRef: questNameRef, showTooltip: showQuestName } =
    useShowTooltipOnOverflow()

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
            <Tooltip
              arrowSize={16}
              position="bottom"
              arrowPosition="center"
              withArrow
              label={questName}
              className={cn(styles.tooltip, {
                [styles.show]: showQuestName
              })}
              events={{ hover: true, touch: true, focus: false }}
            >
              <div
                ref={questNameRef}
                className={cn(
                  styles.questName,
                  'title-sm',
                  classNames?.questName
                )}
              >
                {questName}
              </div>
            </Tooltip>
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
                  [styles.show]: showCurrencyNameTooltip
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
