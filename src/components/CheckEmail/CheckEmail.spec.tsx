import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import CheckEmailModal from '@/components/CheckEmail/index'

describe('CheckEmail', () => {
  it('goes into timeout mode after clicking on resend button', async () => {
    render(
      <CheckEmailModal
        style={{ margin: 'auto' }}
        email="hello@hyperplay.xyz"
        onClose={vi.fn}
        onResend={vi.fn}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /click to resend/i }))
    expect(
      screen.queryByRole('button', { name: /click to resend/i })
    ).not.toBeInTheDocument()
    expect(screen.getByText(/retry in/i)).toBeInTheDocument()
  })

  it('does not render onResend handler if in timeout mode', () => {
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
    fireEvent.click(screen.getByText(/retry in/i))
    fireEvent.click(screen.getByText(/retry in/i))
    expect(onResend).toHaveBeenCalledOnce()
  })
})
