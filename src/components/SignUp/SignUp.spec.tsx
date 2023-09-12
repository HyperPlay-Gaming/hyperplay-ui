import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import SignupModal from './index'

describe('SignupModal', () => {
  it('executes onAuthSignup handler upon selecting a provider', () => {
    const onAuthSignup = vi.fn()
    render(
      <SignupModal
        opened={true}
        onEmailSignup={vi.fn}
        onClose={vi.fn}
        onAuthSignup={onAuthSignup}
      />
    )

    // Find and click on the provider button you want to test (e.g., 'Discord')
    fireEvent.click(screen.getByRole('button', { name: /discord/i }))

    expect(onAuthSignup).toHaveBeenCalledWith('discord')
  })

  it('submits the email form and triggers onEmailSignup handler', () => {
    const onEmailSignup = vi.fn()
    render(
      <SignupModal
        opened={true}
        onEmailSignup={onEmailSignup}
        onClose={vi.fn}
        onAuthSignup={vi.fn}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /email/i }))

    // Fill in the email input
    const emailInput = screen.getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(onEmailSignup).toHaveBeenCalledWith('test@example.com')
  })
})
