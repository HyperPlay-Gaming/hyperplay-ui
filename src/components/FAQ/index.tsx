import { useState } from 'react'

import Button from '../Button'
import styles from './FAQ.module.scss'
import FAQItem, { FAQItemProps } from './components/FAQItem'

const MAX_FAQS_DISPLAYED = 3

export interface FAQProps {
  list: Array<FAQItemProps>
  i18n?: {
    title?: string
    seeLessButtonText?: string
    seeMoreButtonText?: string
  }
}

export default function FAQ({
  list = [],
  i18n = {
    title: 'FAQs',
    seeLessButtonText: 'See less',
    seeMoreButtonText: 'See more'
  }
}: FAQProps) {
  const [showAll, setShowAll] = useState(false)
  const displayData = showAll ? list : list.slice(0, MAX_FAQS_DISPLAYED)

  return (
    <div
      className={styles.container}
      {...(showAll
        ? {
            style: {
              overflowY: showAll && 'auto'
            }
          }
        : {})}
    >
      <h1 className={styles.title}>{i18n.title}</h1>
      {displayData.map((props: FAQItemProps, index) => (
        <FAQItem key={index} {...props} />
      ))}
      {list.length > MAX_FAQS_DISPLAYED && (
        <Button
          size="small"
          type="text"
          onClick={() => setShowAll((prevState) => !prevState)}
        >
          {showAll ? i18n.seeLessButtonText : i18n.seeMoreButtonText}
        </Button>
      )}
    </div>
  )
}
