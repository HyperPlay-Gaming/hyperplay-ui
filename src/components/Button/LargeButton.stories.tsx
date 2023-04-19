import React from 'react'

import Button from '.'

export default {
  title: 'Buttons/LargeButton',
  component: Button
}

export const Primary = () => <Button>Test</Button>

export const PrimaryWithIcon = () => (
  <Button leftIcon="DownloadIcon">Play</Button>
)

export const Secondary = () => <Button variant="secondary">Test</Button>

export const SecondaryErrorButton = () => (
  <Button variant="secondary" status="error">
    Test
  </Button>
)

export const SecondarySuccessButton = () => (
  <Button variant="secondary" status="success">
    Test
  </Button>
)

export const Tertiary = () => <Button variant="tertiary">Test</Button>

export const TertiarySuccess = () => (
  <Button variant="tertiary" status="success">
    Test
  </Button>
)

export const TertiaryError = () => (
  <Button variant="tertiary" status="error">
    Test
  </Button>
)

export const Link = () => <Button variant="link">Test</Button>

export const MenuButton = () => <Button variant="menuItem">Test</Button>

export const MenuButtonActive = () => (
  <Button variant="menuItem" active={true}>
    Test
  </Button>
)
