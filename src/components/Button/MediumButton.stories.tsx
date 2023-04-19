import React from 'react'

import Button from '.'

export default {
  title: 'Buttons/MediumButton',
  component: Button
}

export const MediumPrimary = () => <Button size="medium">Test</Button>

export const MediumSecondary = () => (
  <Button variant="secondary" size="medium">
    Test
  </Button>
)

export const MediumSecondarySuccess = () => (
  <Button variant="secondary" status="success" size="medium">
    Test
  </Button>
)

export const MediumSecondaryError = () => (
  <Button variant="secondary" status="error" size="medium">
    Test
  </Button>
)

export const MediumTertiary = () => (
  <Button variant="tertiary" size="medium">
    Test
  </Button>
)

export const MediumTertiarySuccess = () => (
  <Button variant="tertiary" status="success" size="medium">
    Test
  </Button>
)

export const MediumTertiaryError = () => (
  <Button variant="tertiary" status="error" size="medium">
    Test
  </Button>
)

export const MediumLink = () => (
  <Button variant="link" size="medium">
    Test
  </Button>
)
