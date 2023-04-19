import React from 'react'

import Button from '.'

export default {
  title: 'Buttons/LargeRoundedButton',
  component: Button
}

export const RoundedButton = () => (
  <Button borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedButtonWithIcon = () => (
  <Button borderVariant="rounded" size="medium" leftIcon="DownloadIcon">
    Test
  </Button>
)

export const RoundedSecondaryButton = () => (
  <Button variant="secondary" borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedSecondaryErrorButton = () => (
  <Button
    variant="secondary"
    status="error"
    borderVariant="rounded"
    size="medium"
  >
    Test
  </Button>
)

export const RoundedTertiaryButton = () => (
  <Button variant="tertiary" borderVariant="rounded" size="medium">
    Test
  </Button>
)

export const RoundedTertiaryErrorButton = () => (
  <Button
    variant="tertiary"
    status="error"
    borderVariant="rounded"
    size="medium"
  >
    Test
  </Button>
)

export const RoundedTertiarySuccessButton = () => (
  <Button
    variant="tertiary"
    status="success"
    borderVariant="rounded"
    size="medium"
  >
    Test
  </Button>
)
