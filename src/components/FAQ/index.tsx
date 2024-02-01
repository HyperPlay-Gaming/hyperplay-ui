import { useState } from 'react'

import cn from 'classnames'

import Button from '../Button'
import styles from './FAQ.module.scss'
import FAQItem, { FAQItemProps } from './components/FAQItem'

const MAX_FAQS_DISPLAYED = 3

export interface FAQProps {
  className?: string
  faqList: Array<FAQItemProps>
  i18n?: {
    title?: string
    seeLessButtonText?: string
    seeMoreButtonText?: string
  }
}

export default function FAQ({
  className: classNameProp,
  faqList = [],
  i18n = {
    title: 'FAQs',
    seeLessButtonText: 'See less',
    seeMoreButtonText: 'See more'
  }
}: FAQProps) {
  const [showAll, setShowAll] = useState(false)
  const displayData = showAll ? faqList : faqList.slice(0, MAX_FAQS_DISPLAYED)

  return (
    <div
      className={cn(styles.container, classNameProp)}
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
      {faqList.length > MAX_FAQS_DISPLAYED && (
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
