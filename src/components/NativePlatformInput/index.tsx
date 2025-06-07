'use client'

import React from 'react'

import { Flex } from '@mantine/core'
import { GetInputPropsReturnType } from '@mantine/form/lib/types'

import { Arch, Platforms, platformLabels } from '@/common/types'

import { PlatformContainer } from '../PlatformContainer'
import styles from './NativePlatformInput.module.scss'
import PlatformUpload, { PlatformUploadI18n } from './components/PlatformUpload'

export interface PlatformInputProps {
  platformName: Platforms
  fileNameAmd64?: string
  fileNameArm64?: string
  clearFile: (arch: Arch) => void
  updateFile: (file: File, arch: Arch) => void
  exeInputProps: Record<Arch, GetInputPropsReturnType>
  i18n?: {
    upload?: PlatformUploadI18n
  }
  exeListAmd64?: string[]
  exeListArm64?: string[]
}

export function NativePlatformInput({
  platformName,
  fileNameAmd64,
  fileNameArm64,
  clearFile,
  updateFile,
  exeInputProps,
  i18n,
  exeListAmd64,
  exeListArm64
}: PlatformInputProps): React.JSX.Element {
  const platformDisplayName = platformLabels[platformName]
  const amdLabel = `${platformDisplayName} (Intel / amd64)`
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
      exeList={exeListAmd64}
      i18n={i18n?.upload}
    />
  )

  let arm64PlatformUpload = null
  if (platformName !== 'windows') {
    const arm64Label = `${platformDisplayName} ${
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
        i18n={i18n?.upload}
        exeList={exeListArm64}
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

  return (
    <PlatformContainer platformName={platformName}>
      <div className={styles.uploadActionsContainer}>
        {amdPlatformUpload}
        {arm64PlatformUpload ? arm64PlatformUpload : emptyDiv}
      </div>
    </PlatformContainer>
  )
}
