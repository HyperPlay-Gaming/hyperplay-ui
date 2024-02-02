import React from 'react'

import { fireEvent, screen } from '@testing-library/react'
import { renderWithMantine } from 'tests/utils/providers'
import { describe, expect, it, vi } from 'vitest'

import SignInModal from './index'

describe('SignIn', () => {
  it('submits the email form and triggers onEmailSignup handler', () => {
    const onEmailSubmit = vi.fn()
    renderWithMantine(<SignInModal onClose={vi.fn} onSubmit={onEmailSubmit} />)

    // Fill in the email input
    const emailInput = screen.getByPlaceholderText('Enter your email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(onEmailSubmit).toHaveBeenCalledWith('test@example.com')
  })
})
