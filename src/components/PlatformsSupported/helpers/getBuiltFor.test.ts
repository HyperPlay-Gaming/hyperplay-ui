import { describe, expect, it } from 'vitest'

import { getPlatformsBuiltFor } from './getBuiltFor'

describe('Get playable on platforms', () => {
  it('should return windows for windows builds', () => {
    expect(
      getPlatformsBuiltFor(['windows_amd64', 'windows_arm64'])
    ).toStrictEqual(['windows'])
  })
  it('should return mac for mac builds', () => {
    expect(
      getPlatformsBuiltFor(['darwin_amd64', 'darwin_arm64'])
    ).toStrictEqual(['darwin'])
  })
  it('should return linux and steamdeck for both linux builds', () => {
    expect(getPlatformsBuiltFor(['linux_amd64', 'linux_arm64'])).toStrictEqual([
      'linux',
      'steamdeck'
    ])
  })
})
