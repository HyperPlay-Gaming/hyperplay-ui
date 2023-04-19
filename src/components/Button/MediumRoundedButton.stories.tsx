import React from 'react'

import Button from '.'

export default {
  title: 'Buttons/MediumRoundedButton',
  component: Button
}

export const RoundedMediumButton = () => (
  <Button borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedMediumButtonWithIcon = () => (
  <Button borderVariant="rounded" size="medium" leftIcon="DownloadIcon">
    Test
  </Button>
)

export const RoundedMediumSecondaryButton = () => (
  <Button variant="secondary" borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedMediumTertiaryButton = () => (
  <Button variant="tertiary" borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedMediumTertiaryErrorButton = () => (
  <Button
    variant="tertiary"
    status="error"
    borderVariant="rounded"
    size="medium"
  >
    Test
  </Button>
)

export const RoundedMediumTertiarySuccessButton = () => (
  <Button
    variant="tertiary"
    status="success"
    borderVariant="rounded"
    size="medium"
  >
    Test
  </Button>
)
