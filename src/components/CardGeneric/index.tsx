import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import { Card, CardProps, Image, ImageProps } from '@mantine/core'
import cn from 'classnames'

import FallbackImage from '@/assets/fallback_achievement.svg?url'

import styles from './index.module.scss'

export interface CardGenericProps extends CardProps {
  image: string
  /**
   * Props to pass to the image component
   */
  imageProps?: ImageProps &
    Omit<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      'ref'
    >
  /**
   * If true, the card will show label toward the bottom of the image
   */
  showLabel?: boolean
  i18n?: {
    /**
     * The label to display
     */
    label?: string
  }
  statusIcon?: JSX.Element
}

export function CardGeneric({
  image,
  imageProps = {},
  showLabel = false,
  i18n = {
    label: 'Label'
  },
  statusIcon,
  children,
  className,
  ...rest
}: CardGenericProps &
  ImageProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof CardGenericProps>) {
  return (
    <Card
      radius="md"
      pos="relative"
      display={'inline-block'}
      padding={0}
      bg="transparent"
      className={cn(
        styles.card,
        className,
        'gradientShadow',
        'gradientBorderOnHover'
      )}
      {...rest}
      unstyled
    >
      <Card.Section
        pos="relative"
        className={cn(styles.image, styles.mantineOverRide)}
      >
        <Image
          src={image}
          fallbackSrc={FallbackImage}
          {...imageProps}
          className={styles.achievementImage}
        />
        {showLabel && (
          <div className={cn(styles.label, 'eyebrow')}>{i18n.label}</div>
        )}
      </Card.Section>

      {statusIcon}

      <div className={styles.cardBody}>{children}</div>
    </Card>
  )
}
