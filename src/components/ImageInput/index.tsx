import React from 'react'

import { Image } from '@mantine/core'
import {
  Dropzone,
  DropzoneProps,
  DropzoneStylesNames,
  FileWithPath
} from '@mantine/dropzone'
import { IconPhoto } from '@tabler/icons-react'
import cn from 'classnames'

import styles from './ImageInput.module.scss'

const IMAGE_MIME_TYPE = ['image/png' || 'image/gif' || 'image/jpeg']

export interface ImageInputProps extends Omit<DropzoneProps, 'onDrop'> {
  onImageDropped: (value?: string) => void
  value?: File | string
  classNames?: PartialRecord<DropzoneStylesNames, string>
  i18n?: {
    hint?: string
  }
}

export default function ImageInput({
  onImageDropped,
  value,
  classNames,
  i18n = { hint: 'Click or drag and drop to upload' },
  ...props
}: ImageInputProps) {
  const onImageDroppedHandler = (files: FileWithPath[]) => {
    console.log('on drop files ', files)
    if (files.length > 0) {
      onImageDropped(URL.createObjectURL(files[0]))
    } else {
      onImageDropped(undefined)
    }
  }

  let image = null
  if (value) {
    image = <Image src={value} className={styles.image} />
  } else {
    image = (
      <div className={styles.imageDropContainer}>
        <IconPhoto color="#9595A8" size={64} />
        <div className="body">{i18n.hint}</div>
      </div>
    )
  }

  return (
    <Dropzone
      onDrop={onImageDroppedHandler}
      accept={IMAGE_MIME_TYPE}
      classNames={{
        inner: cn(styles.inner, classNames?.inner),
        root: cn(styles.dropzoneRoot, classNames?.root)
      }}
      {...props}
    >
      {image}
    </Dropzone>
  )
}
