import { CircularButton, Images } from '@hyperplay/ui'
import { useRouter } from 'next/router'

import styles from './BackButton.module.scss'

const ArrowLeft = Images.ArrowLeft

const BackButton = () => {
  const router = useRouter()

  return (
    <div className={styles.root}>
      <CircularButton onClick={() => router.back()}>
        <ArrowLeft />
      </CircularButton>
    </div>
  )
}

export default BackButton
