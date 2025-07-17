import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import {
  Card,
  CardProps,
  createPolymorphicComponent,
  Image,
  ImageProps
} from '@mantine/core'
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
  statusIcon?: React.JSX.Element
  showGradientBorderAndShadow?: boolean
  genericClassNames?: {
    root?: string
    body?: string
    image?: string
    label?: string
  }
}

export const CardGeneric = createPolymorphicComponent<'div', CardGenericProps>(
  ({
    image,
    imageProps = {},
    showLabel = false,
    i18n = {
      label: 'Label'
    },
    statusIcon,
    children,
    className,
    genericClassNames,
    showGradientBorderAndShadow = false,
    ...rest
  }: CardGenericProps) => {
    return (
      <Card
        className={cn(
          {
            gradientShadow: !showGradientBorderAndShadow,
            gradientBorderOnHover: !showGradientBorderAndShadow
          },
          styles.card,
          genericClassNames?.root,
          className
        )}
        {...rest}
        unstyled
      >
        <Card.Section
          pos="relative"
          className={cn(
            styles.image,
            styles.mantineOverRide,
            genericClassNames?.image
          )}
        >
          <Image
            src={image}
            fallbackSrc={FallbackImage}
            {...imageProps}
            className={styles.achievementImage}
          />
          {showLabel && (
            <div
              className={cn(styles.label, 'eyebrow', genericClassNames?.label)}
            >
              {i18n.label}
            </div>
          )}
        </Card.Section>

        {statusIcon}

        <div className={cn(styles.cardBody, genericClassNames?.body)}>
          {children}
        </div>
      </Card>
    )
  }
)
