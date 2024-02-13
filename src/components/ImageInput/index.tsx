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

const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/gif'] // Corrected MIME type array

export interface ImageInputProps extends Omit<DropzoneProps, 'onDrop'> {
  onImageDropped: (value?: File | string) => void // Now can accept File or string
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
    if (files.length > 0) {
      onImageDropped(files[0]) // Directly pass the File object
    }
  }

  let imageSrc: string | undefined
  if (typeof value === 'string') {
    imageSrc = value
  } else if (value instanceof File) {
    imageSrc = URL.createObjectURL(value)
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
      {imageSrc ? (
        <Image src={imageSrc} className={styles.image} alt="" />
      ) : (
        <div className={styles.imageDropContainer}>
          <IconPhoto color="#9595A8" size={64} />
          <div className="body">{i18n.hint}</div>
        </div>
      )}
    </Dropzone>
  )
}
