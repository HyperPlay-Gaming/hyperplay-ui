import React from 'react'

import Button from '.'

export default {
  title: 'Button',
  component: Button
}

const largeButtonText = 'Large Button'

export const LargePrimary = () => (
  <Button size="large">{largeButtonText}</Button>
)

export const LargeSecondary = () => (
  <Button type="secondary" size="large">
    {largeButtonText}
  </Button>
)

export const LargeTertiary = () => (
  <Button type="tertiary" size="large">
    {largeButtonText}
  </Button>
)

export const LargeLink = () => (
  <Button type="link" size="large">
    {largeButtonText}
  </Button>
)

export const LargeDanger = () => (
  <Button type="danger" size="large">
    {largeButtonText}
  </Button>
)

const medButtonText = 'Medium Button'

export const MediumPrimary = () => <Button>{medButtonText}</Button>

export const MediumSecondary = () => (
  <Button type="secondary">{medButtonText}</Button>
)

export const MediumTertiary = () => (
  <Button type="tertiary">{medButtonText}</Button>
)

export const MediumLink = () => <Button type="link">{medButtonText}</Button>

export const MediumDanger = () => <Button type="danger">{medButtonText}</Button>

export const MediumMenuButton = () => (
  <Button type="menuItem">{medButtonText}</Button>
)

export const MediumMenuButtonActive = () => (
  <Button type="menuItem" active={true}>
    {medButtonText}
  </Button>
)

const smallButtonText = 'Small Button'

export const SmallPrimary = () => (
  <Button size="small">{smallButtonText}</Button>
)

export const SmallSecondary = () => (
  <Button type="secondary" size="small">
    {smallButtonText}
  </Button>
)

export const SmallTertiary = () => (
  <Button type="tertiary" size="small">
    {smallButtonText}
  </Button>
)

export const SmallLink = () => (
  <Button type="link" size="small">
    {smallButtonText}
  </Button>
)

export const SmallDanger = () => (
  <Button type="danger" size="small">
    {smallButtonText}
  </Button>
)

export const IconSecondary = () => (
  <Button type="secondary" size="icon">
    S
  </Button>
)
