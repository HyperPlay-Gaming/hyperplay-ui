import { useRef, useState } from 'react';
import { ActionIcon, Center, Image } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import ImageInput, { ImageInputProps } from '../ImageInput';
import styles from './GalleryInput.module.scss';

export interface GalleryInputProps {
  onChange: (files: Array<File | string>) => void; // Now accepts both File and string types
  value?: Array<File | string>;
  disabled?: boolean;
  imageInputProps?: ImageInputProps;
}

export default function GalleryInput(props: GalleryInputProps) {
  const openRef = useRef<() => void>();
  const [files, setFiles] = useState<Array<File | string>>(props.value ?? []);
  const [index, setIndex] = useState<number>(0);

  const updateFiles = (newFiles: Array<File | string>) => {
    setFiles(newFiles);
    props.onChange(newFiles);
  };

  const update = (file?: File | string) => {
    if (!file) return;
    const updatedFiles = [...files];
    if (index >= files.length) {
      updatedFiles.push(file)
    } else {
      updatedFiles[index] = file
    }
    updateFiles(updatedFiles);
  };

  const add = () => {
    console.log({files})
    setIndex(files.length)
    openRef.current?.()
  }

  const remove = (index: number) => {
    const updatedFiles = files.filter((_file, _index) => _index !== index)
    updateFiles(updatedFiles)
    setIndex(Math.max(0, index - 1))
  }

  return (
    <div className={styles.container}>
      <ImageInput
        value={files[index]}
        onImageDropped={(file) => update(file)}
        openRef={openRef as React.MutableRefObject<() => void>}
        disabled={props.disabled}
        classNames={{ root: styles.imageInputRoot }}
        {...props.imageInputProps}
      />
      <div className={styles.actionButtonContainer}>
        {files.map((file, idx) => (
          <div key={idx} className={styles.thumbnailPreviewContainer}>
            <ActionIcon className={styles.remove} onClick={() => remove(idx)}>
              <IconTrash className={styles.trashIcon} />
            </ActionIcon>
            <button
              className={styles.preview}
              onClick={() => setIndex(idx)}
              type="button"
            >
              <Image className={styles.addedImageThumbnail} src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt="" />
            </button>
          </div>
        ))}
        <button
          className={styles.preview}
          onClick={add}
          disabled={props.disabled}
          type="button"
        >
          <Center>
            <IconPlus className={styles.plusIcon} />
          </Center>
        </button>
      </div>
    </div>
  )
}
