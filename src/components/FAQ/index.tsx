import { useState } from 'react'

import cn from 'classnames'

import Button from '../Button'
import styles from './FAQ.module.scss'
import FAQItem, { FAQItemProps } from './components/FAQItem'

const MAX_FAQS_DISPLAYED = 3

export interface FAQProps {
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  faqList: Array<FAQItemProps>
  description?: React.ReactNode | string
  i18n?: {
    title?: string
    seeLessButtonText?: string
    seeMoreButtonText?: string
  }
}

export default function FAQ({
  className: classNameProp,
  titleClassName,
  descriptionClassName,
  faqList = [],
  description = '',
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
      <h1 className={cn(styles.title, titleClassName)}>{i18n.title}</h1>
      {description ? (
        <div className={cn(styles.description, descriptionClassName)}>
          {description}
        </div>
      ) : null}
      {displayData.map((props: FAQItemProps, index) => (
        <FAQItem key={index} {...props} />
      ))}
      {faqList.length > MAX_FAQS_DISPLAYED && (
        <Button
          className={styles.seeMoreButton}
          type="link"
          onClick={() => setShowAll((prevState) => !prevState)}
          htmlType="button"
        >
          {showAll ? i18n.seeLessButtonText : i18n.seeMoreButtonText}
        </Button>
      )}
    </div>
  )
}
