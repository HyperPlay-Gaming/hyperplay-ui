import React from 'react'
import Button from '.'

export default {
  title: 'Button'
}

export const Primary = () => <Button>Test</Button>

export const Secondary = () => <Button type="secondary">Test</Button>

export const Tertiary = () => <Button type="tertiary">Test</Button>

export const Link = () => <Button type="link">Test</Button>

export const Danger = () => <Button type="danger">Test</Button>

export const MenuButton = () => <Button type="menuItem">Test</Button>

export const MenuButtonActive = () => (
  <Button type="menuItem" active={true}>
    Test
  </Button>
)

export const SmallPrimary = () => <Button size="small">Test</Button>

export const SmallSecondary = () => (
  <Button type="secondary" size="small">
    Test
  </Button>
)

export const SmallTertiary = () => (
  <Button type="tertiary" size="small">
    Test
  </Button>
)

export const SmallLink = () => (
  <Button type="link" size="small">
    Test
  </Button>
)

export const SmallDanger = () => (
  <Button type="danger" size="small">
    Test
  </Button>
)
