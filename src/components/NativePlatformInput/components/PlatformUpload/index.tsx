import React, { HTMLProps } from 'react'

import { Collapse, FileButton as FButton, Flex, Text } from '@mantine/core'
import { GetInputPropsReturnType } from '@mantine/form/lib/types'
import { IconFile, IconTrash } from '@tabler/icons-react'
import classNames from 'classnames'

import Button from '@/components/Button'
import HpSelect from '@/components/Select'
import TextInput from '@/components/TextInput'

import styles from './PlatformUpload.module.scss'

export interface PlatformUploadI18n {
  chooseFile?: string
  exePathPlaceholder?: string
}

export interface PlatformUploadProps extends HTMLProps<HTMLDivElement> {
  platformName: string
  uploaded: boolean
  onExePathChanged: (path: File | null) => void
  onRemoveUpload: () => void
  exeInputProps: GetInputPropsReturnType
  uploadZipName?: string
  i18n?: PlatformUploadI18n
  exeList?: string[]
}

export default function PlatformUpload({
  platformName,
  uploaded,
  uploadZipName,
  onExePathChanged,
  onRemoveUpload,
  exeInputProps,
  i18n = {
    chooseFile: 'Choose File',
    exePathPlaceholder: 'Executable path (from build root directory)'
  },
  className,
  exeList,
  ...props
}: PlatformUploadProps) {
  function onTrashClick() {
    onRemoveUpload()
  }

  let uploadActionRow = null
  if (uploaded) {
    uploadActionRow = (
      <>
        <Text color="#94A2B3">{uploadZipName}</Text>
        <button onClick={onTrashClick} className="center" type="button">
          <IconTrash size={20} />
        </button>
      </>
    )
  } else {
    uploadActionRow = (
      <FButton onChange={onExePathChanged} accept="application/zip">
        {(props) => (
          <Button type="secondary" htmlType="button" {...props}>
            {i18n.chooseFile}
          </Button>
        )}
      </FButton>
    )
  }
  return (
    <div className={classNames(className, styles.rootContainer)} {...props}>
      <Flex className={styles.uploadRowContainer}>
        {platformName}
        {uploadActionRow}
      </Flex>
      <Collapse
        in={uploaded}
        transitionDuration={500}
        style={{ width: '100%', display: 'block' }}
      >
        {exeList && exeList.length > 0 ? (
          <HpSelect
            data={exeList}
            placeholder={i18n.exePathPlaceholder}
            {...exeInputProps}
          />
        ) : (
          <TextInput
            leftSection={<IconFile size={48} strokeWidth={2} color={'grey'} />}
            placeholder={i18n.exePathPlaceholder}
            {...exeInputProps}
          />
        )}
      </Collapse>
    </div>
  )
}
