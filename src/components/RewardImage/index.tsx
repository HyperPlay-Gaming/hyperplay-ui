import { ChangeEvent, useRef, useState } from 'react'

import { IconCamera } from '@tabler/icons-react'
import cn from 'classnames'

import Button from '@/components/Button'

import styles from './RewardImage.module.scss'

export interface FileInputProps {
  url?: string
  onFileChange?: (file: File | null) => void
  error?: string
  classNames?: {
    root?: string
    box?: string
    innerBox?: string
    errorText?: string
  }
  i18n?: {
    changeImage: string
  }
}

function RewardImage({
  url,
  classNames,
  onFileChange,
  error,
  i18n = {
    changeImage: 'Change image'
  }
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInputClick = () => fileInputRef.current?.click()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null
    onFileChange?.(selectedFile)
  }

  let content

  if (url) {
    content = (
      <>
        <img src={url} alt="Reward image" className={styles.image} />
        <Button
          htmlType="button"
          type="secondaryGradient"
          onClick={triggerFileInputClick}
        >
          {i18n.changeImage}
        </Button>
      </>
    )
  } else {
    content = (
      <button
        type="button"
        className={cn(styles.box, error && styles.error, classNames?.box)}
        onClick={triggerFileInputClick}
      >
        <div className={cn(styles.innerBox, classNames?.innerBox)}>
          <IconCamera size={24} color="var(--color-neutral-100)" />
        </div>
      </button>
    )
  }

  return (
    <div className={cn(styles.root, classNames?.root)}>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleInputChange}
        ref={fileInputRef}
      />
      {content}
      <span className={cn(styles.errorText, 'caption', classNames?.errorText)}>
        {error}
      </span>
    </div>
  )
}

export default RewardImage
