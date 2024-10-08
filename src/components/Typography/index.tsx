import React, { HTMLAttributes, PropsWithChildren } from 'react'

export type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export const Heading1 = (props: TypographyProps) => (
  <h1 {...props}>{props.children}</h1>
)

export const Heading2 = (props: TypographyProps) => (
  <h2 {...props}>{props.children}</h2>
)

export const Heading3 = (props: TypographyProps) => (
  <h3 {...props}>{props.children}</h3>
)

export const Heading4 = (props: TypographyProps) => (
  <h4 {...props}>{props.children}</h4>
)

export const Heading5 = (props: TypographyProps) => (
  <h5 {...props}>{props.children}</h5>
)

export const Heading6 = (props: TypographyProps) => (
  <h6 {...props}>{props.children}</h6>
)

export const Menu = (props: TypographyProps) => (
  <div {...props} className={`menu ${props.className}`}>
    {props.children}
  </div>
)

export const Title = (props: TypographyProps) => (
  <div {...props} className={`title ${props.className}`}>
    {props.children}
  </div>
)

export const Caption = (props: TypographyProps) => (
  <div {...props} className={`caption ${props.className}`}>
    {props.children}
  </div>
)

export const CaptionSmall = (props: TypographyProps) => (
  <div {...props} className={`captionSm ${props.className}`}>
    {props.children}
  </div>
)

export const Body = (props: TypographyProps) => (
  <div {...props} className={`body ${props.className}`}>
    {props.children}
  </div>
)

export const BodySmall = (props: TypographyProps) => (
  <div {...props} className={`bodySm ${props.className}`}>
    {props.children}
  </div>
)

export const ButtonSmallText = (props: TypographyProps) => (
  <div {...props} className={`buttonSm ${props.className}`}>
    {props.children}
  </div>
)

export const ButtonText = (props: TypographyProps) => (
  <div {...props} className={`button ${props.className}`}>
    {props.children}
  </div>
)
