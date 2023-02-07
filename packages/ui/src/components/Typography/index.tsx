import React, { HTMLAttributes, PropsWithChildren } from 'react'
import styles from './Typography.module.css'

export type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export const Heading1 = (props: TypographyProps) => (
  <h1 className={styles.heading1} {...props}>
    {props.children}
  </h1>
)

export const Heading2 = (props: TypographyProps) => (
  <h2 className={styles.heading2} {...props}>
    {props.children}
  </h2>
)

export const Heading3 = (props: TypographyProps) => (
  <h3 className={styles.heading3} {...props}>
    {props.children}
  </h3>
)

export const Heading4 = (props: TypographyProps) => (
  <h4 className={styles.heading4} {...props}>
    {props.children}
  </h4>
)

export const Heading5 = (props: TypographyProps) => (
  <h5 className={styles.heading5} {...props}>
    {props.children}
  </h5>
)

export const Heading6 = (props: TypographyProps) => (
  <h6 className={styles.heading6} {...props}>
    {props.children}
  </h6>
)

export const Menu = (props: TypographyProps) => (
  <div className={styles.menu} {...props}>
    {props.children}
  </div>
)

export const Title = (props: TypographyProps) => (
  <div className={styles.title} {...props}>
    {props.children}
  </div>
)

export const Caption = (props: TypographyProps) => (
  <div className={styles.caption} {...props}>
    {props.children}
  </div>
)

export const CaptionSmall = (props: TypographyProps) => (
  <div className={styles.captionSmall} {...props}>
    {props.children}
  </div>
)

export const Body = (props: TypographyProps) => (
  <div className={styles.body} {...props}>
    {props.children}
  </div>
)

export const BodySmall = (props: TypographyProps) => (
  <div className={styles.bodySmall} {...props}>
    {props.children}
  </div>
)

export const ButtonSmall = (props: TypographyProps) => (
  <div className={styles.buttonSmall} {...props}>
    {props.children}
  </div>
)
