import { ChangeEvent, HTMLProps, useRef } from 'react'

import { IconCamera } from '@tabler/icons-react'
import cn from 'classnames'

import Button from '@/components/Button'

import styles from './RewardImage.module.scss'

export interface RewardImageInputProps {
  label?: string
  url?: string
  onFileChange?: (file: File | null) => void
  error?: string
  inputProps?: HTMLProps<HTMLInputElement>
  classNames?: {
    root?: string
    box?: string
    innerBox?: string
    errorText?: string
    label?: string
    changeButton?: string
  }
  i18n?: {
    changeImage: string
  }
}

function RewardImageInput({
  label,
  inputProps,
  url,
  classNames,
  onFileChange,
  error,
  i18n = {
    changeImage: 'Change image'
  }
}: RewardImageInputProps) {
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
          className={cn(styles.changeButton, classNames?.changeButton)}
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
        {...inputProps}
      />
      {label && (
        <label className={cn(styles.label, classNames?.label)}>{label}</label>
      )}
      {content}
      <span className={cn(styles.errorText, 'caption', classNames?.errorText)}>
        {error}
      </span>
    </div>
  )
}

export default RewardImageInput
