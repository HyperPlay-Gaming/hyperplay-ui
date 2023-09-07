import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import SignupModal from './index'

describe('SignupModal', () => {
  it('renders headline', () => {
    render(
      <SignupModal
        opened={true}
        onEmailSignup={vi.fn}
        onClose={vi.fn}
        onAuthSignup={vi.fn}
      />
    )
    screen.debug()
    // check if App components renders headline
  })
})
