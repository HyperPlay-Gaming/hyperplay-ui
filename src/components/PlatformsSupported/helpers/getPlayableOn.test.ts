import { describe, expect, it } from 'vitest'

import { getPlatformsPlayableOn } from './getPlayableOn'

describe('Get playable on platforms', () => {
  it('should return all amd64 platforms for only windows amd64 native build', () => {
    expect(getPlatformsPlayableOn(['windows_amd64'])).toStrictEqual([
      'windows',
      'darwin',
      'linux',
      'steamdeck'
    ])
  })
  it('should return all arm platforms for only windows arm64 native build', () => {
    expect(getPlatformsPlayableOn(['windows_arm64'])).toStrictEqual([
      'windows',
      'darwin',
      'linux'
    ])
  })
  it('should return all platforms for only web build', () => {
    expect(getPlatformsPlayableOn(['web'])).toStrictEqual([
      'windows',
      'web',
      'darwin',
      'linux',
      'steamdeck'
    ])
  })
  it('should return only mac for mac amd64 build', () => {
    expect(getPlatformsPlayableOn(['darwin_amd64'])).toStrictEqual(['darwin'])
  })
  it('should return only mac for mac arm64 build', () => {
    expect(getPlatformsPlayableOn(['darwin_arm64'])).toStrictEqual(['darwin'])
  })
  it('should return only linux for linux arm64 build', () => {
    expect(getPlatformsPlayableOn(['linux_arm64'])).toStrictEqual(['linux'])
  })
  it('should return linux and steamdeck for linux amd64 build', () => {
    expect(getPlatformsPlayableOn(['linux_amd64'])).toStrictEqual([
      'linux',
      'steamdeck'
    ])
  })
  it('should return all platforms for all builds', () => {
    expect(
      getPlatformsPlayableOn([
        'web',
        'windows_amd64',
        'linux_amd64',
        'darwin_amd64',
        'windows_arm64',
        'linux_arm64',
        'darwin_arm64'
      ])
    ).toStrictEqual(['windows', 'web', 'darwin', 'linux', 'steamdeck'])
  })
})
