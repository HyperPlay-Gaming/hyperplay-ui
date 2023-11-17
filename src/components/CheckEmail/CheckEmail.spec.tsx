import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import CheckEmailModal from '@/components/CheckEmail/index'

describe('CheckEmail', () => {
  it('goes into timeout mode after clicking on resend button', () => {
    render(
      <CheckEmailModal
        style={{ margin: 'auto' }}
        email="hello@hyperplay.xyz"
        onClose={vi.fn}
        onResend={vi.fn}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /click to resend/i }))
    const retryButton = screen.getByRole('button', { name: /retry in/i })
    expect(retryButton).toBeDisabled()
  })

  it('does not trigger onResend handler if in timeout mode', () => {
    const onResend = vi.fn()
    render(
      <CheckEmailModal
        style={{ margin: 'auto' }}
        email="hello@hyperplay.xyz"
        onClose={vi.fn}
        onResend={onResend}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /click to resend/i }))
    fireEvent.click(screen.getByRole('button', { name: /retry in/i }))
    fireEvent.click(screen.getByRole('button', { name: /retry in/i }))
    expect(onResend).toHaveBeenCalledOnce()
  })
})
