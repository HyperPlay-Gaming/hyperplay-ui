import { useState } from 'react'

import cn from 'classnames'

import { MinusCircle, PlusCircle } from '@/assets/images'

import styles from './index.module.scss'

export interface FAQItemProps {
  question: string | React.ReactNode
  answer: string | React.ReactNode
  classNames?: {
    root?: string
    container?: string
    title?: string
    description?: string
  }
}

export default function FAQItem({
  question,
  answer,
  classNames
}: FAQItemProps) {
  const [isOpen, setOpened] = useState(false)

  return (
    <div className={cn(styles.item, classNames?.root)}>
      <div
        className={cn(styles.questionContainer, classNames?.container)}
        onClick={() => setOpened((prevState) => !prevState)}
      >
        <p className={cn(styles.question, classNames?.title)}>{question}</p>
        <span className={styles.toggleIcon}>
          {isOpen ? <MinusCircle /> : <PlusCircle />}
        </span>
      </div>
      {isOpen && (
        <p className={cn(styles.answer, classNames?.description)}>{answer}</p>
      )}
    </div>
  )
}
