'use client'

import React from 'react'

import { Center, Flex, Stack, Text } from '@mantine/core'
import {
  PlatformsMeta,
  SupportedPlatform,
  supportedPlatforms
} from '@valist/sdk'

import LinuxIcon from '@/assets/platformIcons/linux-icon.png'
import MacIcon from '@/assets/platformIcons/mac-icon.png'
import WindowsIcon from '@/assets/platformIcons/windows-icon.png'
import { Arch, Platforms, platformLabels } from '@/common/types'

import { TextInputProps } from '../TextInput'
import styles from './NativePlatformInput.module.scss'
import PlatformUpload from './components/PlatformUpload'

export type NativePlatformKey = keyof Omit<PlatformsMeta, 'web'>

export const isNativePlatformKey = (key: string): key is NativePlatformKey => {
  return supportedPlatforms.includes(key as SupportedPlatform)
}

export interface PlatformInputProps {
  platformName: Platforms
  fileNameAmd64?: string
  fileNameArm64?: string
  clearFile: (arch: Arch) => void
  updateFile: (file: File, arch: Arch) => void
  exeInputProps: Record<Arch, TextInputProps>
}

export const isSupportedPlatform = (
  platform: string
): platform is SupportedPlatform => {
  return supportedPlatforms.includes(platform as SupportedPlatform)
}

export const platformImages: Record<Platforms, string> = {
  windows: WindowsIcon,
  linux: LinuxIcon,
  darwin: MacIcon
}

export default function PlatformInput({
  platformName,
  fileNameAmd64,
  fileNameArm64,
  clearFile,
  updateFile,
  exeInputProps
}: PlatformInputProps): JSX.Element {
  const amdLabel = `${platformName} (Intel / amd64)`
  const amdPlatformUpload = (
    <PlatformUpload
      platformName={amdLabel}
      uploaded={!!fileNameAmd64}
      onExePathChanged={(file) => {
        if (file) updateFile(file, 'amd64')
      }}
      onRemoveUpload={() => {
        clearFile('amd64')
      }}
      exeInputProps={exeInputProps.amd64}
    />
  )

  let arm64PlatformUpload = null
  if (platformName !== 'windows') {
    const arm64Label = `${platformName} ${
      platformName === 'darwin' ? '(Apple Silicon / arm64)' : '(ARM / arm64)'
    }`
    arm64PlatformUpload = (
      <PlatformUpload
        platformName={arm64Label}
        uploaded={!!fileNameArm64}
        onExePathChanged={(file) => {
          if (file) updateFile(file, 'arm64')
        }}
        onRemoveUpload={() => {
          clearFile('arm64')
        }}
        exeInputProps={exeInputProps.arm64}
      />
    )
  }

  const emptyDiv = (
    <Flex
      justify="space-between"
      align="stretch"
      p="lg"
      style={{ width: '100%', height: 78 }}
    ></Flex>
  )

  const platformIcon = platformImages[platformName]

  return (
    <Flex gap="md" p="md" className={styles.root}>
      <Stack>
        <img src={platformIcon} alt={platformName} className={styles.image} />
        <Center>
          <Text m={0} p={0} color="#94A2B3">
            {platformLabels[platformName]}
          </Text>
        </Center>
      </Stack>
      <div className={styles.uploadActionsContainer}>
        {amdPlatformUpload}
        {arm64PlatformUpload ? arm64PlatformUpload : emptyDiv}
      </div>
    </Flex>
  )
}
