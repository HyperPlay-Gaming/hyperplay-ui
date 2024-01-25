import { useRef, useState } from 'react'

import { ActionIcon, Center, Image } from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'

import ImageInput from '../ImageInput'
import styles from './GalleryInput.module.scss'

export interface GalleryInputProps {
  onChange: (files: string[]) => void
  value?: string[]
  disabled?: boolean
}

export default function GalleryInput(props: GalleryInputProps) {
  const openRef = useRef<() => void>()
  const [index, setIndex] = useState(0)

  const files = props.value ?? []
  const value = index < files.length ? files[index] : undefined

  const update = (file?: string) => {
    if (file === undefined) {
      throw 'Updating undefined file!'
    }
    if (index === files.length) {
      props.onChange([...files, file])
    } else {
      props.onChange(
        files.map((_file, _index) => (_index === index ? file : _file))
      )
    }
  }

  const add = () => {
    setIndex(files.length)
    openRef.current?.()
  }

  const remove = (index: number) => {
    setIndex(index)
    props.onChange(files.filter((_file, _index) => _index !== index))
  }

  const src = (file: File | string) => {
    if (typeof file === 'object') {
      return URL.createObjectURL(file)
    } else if (file) {
      return file as string
    }
  }

  return (
    <div className={styles.container}>
      <ImageInput
        value={value}
        onImageDropped={(val) => update(val)}
        openRef={openRef as React.MutableRefObject<() => void>}
        disabled={props.disabled}
        classNames={{ root: styles.imageInputRoot }}
      />
      <div className={styles.actionButtonContainer}>
        {files.map((file: string, index: number) => (
          <div key={index} style={{ position: 'relative' }}>
            <ActionIcon className={styles.remove} onClick={() => remove(index)}>
              <IconTrash size={18} color="#fff" />
            </ActionIcon>
            <button className={styles.preview} onClick={() => setIndex(index)}>
              <Image
                fit="contain"
                width="100%"
                height="100%"
                radius="sm"
                src={src(file)}
              />
            </button>
          </div>
        ))}
        <button
          className={styles.preview}
          onClick={() => add()}
          disabled={props.disabled}
        >
          <Center>
            <IconPlus size={32} color="#9595A8" />
          </Center>
        </button>
      </div>
    </div>
  )
}
