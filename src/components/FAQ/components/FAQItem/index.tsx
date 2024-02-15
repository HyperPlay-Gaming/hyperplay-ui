import { useState } from 'react'

import { MinusCircle, PlusCircle } from '@/assets/images'

import styles from './index.module.scss'

export interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setOpened] = useState(false)

  return (
    <div className={styles.item}>
      <div
        className={styles.questionContainer}
        onClick={() => setOpened((prevState) => !prevState)}
      >
        <p className={styles.question}>{question}</p>
        <span className={styles.toggleIcon}>
          {isOpen ? <MinusCircle /> : <PlusCircle />}
        </span>
      </div>
      {isOpen && <p className={styles.answer}>{answer}</p>}
    </div>
  )
}
