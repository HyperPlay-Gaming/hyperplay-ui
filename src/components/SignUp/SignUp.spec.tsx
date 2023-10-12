import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import SignUp from './index'

const providers = [{ id: 'discord', name: 'Discord', icon: 'discord' }]

describe('SignUp', () => {
  it('executes onAuthSignup handler upon selecting a provider', () => {
    const providerOption = providers[0]
    const onAuthSignup = vi.fn()
    render(
      <SignUp
        onClose={vi.fn}
        providers={providers}
        onWalletSignup={vi.fn}
        onEmailSignup={vi.fn}
        onAuthProviderSignup={onAuthSignup}
      />
    )

    // Find and click on the provider button you want to test (e.g., 'Discord')
    fireEvent.click(screen.getByRole('button', { name: providerOption.name }))

    expect(onAuthSignup).toHaveBeenCalledWith(providerOption)
  })

  it('executes onWalletSignup handler upon selecting wallet provider', () => {
    const onWalletSignup = vi.fn()
    render(
      <SignUp
        onClose={vi.fn}
        providers={providers}
        onWalletSignup={onWalletSignup}
        onEmailSignup={vi.fn}
        onAuthProviderSignup={vi.fn}
      />
    )

    // Find and click on the provider button you want to test (e.g., 'Discord')
    fireEvent.click(screen.getByRole('button', { name: /wallet/i }))

    expect(onWalletSignup).toHaveBeenCalled()
  })

  it('submits the email form and triggers onEmailSignup handler', () => {
    const onEmailSignup = vi.fn()
    render(
      <SignUp
        onClose={vi.fn}
        providers={providers}
        onEmailSignup={onEmailSignup}
        onWalletSignup={vi.fn}
        onAuthProviderSignup={vi.fn}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /email/i }))

    // Fill in the email input
    const emailInput = screen.getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(onEmailSignup).toHaveBeenCalledWith('test@example.com')
  })
})
