import React, { HTMLAttributes, PropsWithChildren } from 'react'

export type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>
export type HeadingProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>

export const Heading1 = (props: HeadingProps) => (
  <div {...props} className={`h1 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Heading2 = (props: HeadingProps) => (
  <div {...props} className={`h2 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Heading3 = (props: HeadingProps) => (
  <div {...props} className={`h3 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Heading4 = (props: HeadingProps) => (
  <div {...props} className={`h4 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Heading5 = (props: HeadingProps) => (
  <div {...props} className={`h5 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Heading6 = (props: HeadingProps) => (
  <div {...props} className={`h6 ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Menu = (props: TypographyProps) => (
  <div {...props} className={`menu ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Title = (props: TypographyProps) => (
  <div {...props} className={`title ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const TitleSmall = (props: TypographyProps) => (
  <div {...props} className={`title-sm ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Caption = (props: TypographyProps) => (
  <div {...props} className={`caption ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const CaptionSmall = (props: TypographyProps) => (
  <div {...props} className={`caption-sm ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Body = (props: TypographyProps) => (
  <div {...props} className={`body ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const BodySmall = (props: TypographyProps) => (
  <div {...props} className={`body-sm ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const ButtonLarge = (props: TypographyProps) => (
  <div {...props} className={`button-lg ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Button = (props: TypographyProps) => (
  <div {...props} className={`button ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Uppercase = (props: TypographyProps) => (
  <div {...props} className={`uppercase ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const Eyebrow = (props: TypographyProps) => (
  <div {...props} className={`eyebrow ${props.className ?? ''}`}>
    {props.children}
  </div>
)

export const EyebrowSmall = (props: TypographyProps) => (
  <div {...props} className={`eyebrow-sm ${props.className ?? ''}`}>
    {props.children}
  </div>
)
