import React from 'react'

import { fireEvent, screen } from '@testing-library/react'
import { renderWithMantine } from 'tests/utils/providers'
import { describe, expect, it, vi } from 'vitest'

import LinkExternalAccountsModal from '@/components/LinkExternalAccounts/index'

const providers = [{ id: 'discord', name: 'Discord', icon: 'discord' }]

describe('LinkExternalAccounts', () => {
  it('executes onAuthSignup handler upon selecting a provider', () => {
    const providerOption = providers[0]
    const onAuthSignup = vi.fn()
    renderWithMantine(
      <LinkExternalAccountsModal
        onClose={vi.fn}
        providers={providers}
        onWalletClick={vi.fn}
        onAuthProviderClick={onAuthSignup}
      />
    )

    // Find and click on the provider button you want to test (e.g., 'Discord')
    fireEvent.click(screen.getByRole('button', { name: providerOption.name }))

    expect(onAuthSignup).toHaveBeenCalledWith(providerOption)
  })

  it('executes onWalletSignup handler upon selecting wallet provider', () => {
    const onWalletClick = vi.fn()
    renderWithMantine(
      <LinkExternalAccountsModal
        onClose={vi.fn}
        providers={providers}
        onWalletClick={onWalletClick}
        onAuthProviderClick={vi.fn}
      />
    )

    // Find and click on the provider button you want to test (e.g., 'Discord')
    fireEvent.click(screen.getByRole('button', { name: /wallet/i }))

    expect(onWalletClick).toHaveBeenCalled()
  })
})
