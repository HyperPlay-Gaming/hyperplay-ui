import { useState } from 'react'

import cn from 'classnames'

import Button from '../Button'
import styles from './FAQ.module.scss'
import FAQItem, { FAQItemProps } from './components/FAQItem'

const MAX_FAQS_DISPLAYED = 3

export interface FAQProps {
  classNames?: {
    root?: string
    title?: string
    description?: string
    item?: string
    itemContainer?: string
    itemTitle?: string
    itemDescription?: string
    seeMoreButton?: string
  }
  faqList: Array<FAQItemProps>
  description?: React.ReactNode | string
  i18n?: {
    title?: string
    seeLessButtonText?: string
    seeMoreButtonText?: string
  }
}

export default function FAQ({
  classNames,
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
      className={cn(styles.container, classNames?.root)}
      {...(showAll
        ? {
            style: {
              overflowY: showAll && 'auto'
            }
          }
        : {})}
    >
      <h1 className={cn(styles.title, classNames?.title)}>{i18n.title}</h1>
      {description ? (
        <div className={cn(styles.description, classNames?.description)}>
          {description}
        </div>
      ) : null}
      {displayData.map((props: FAQItemProps, index) => (
        <FAQItem
          key={index}
          {...props}
          classNames={{
            root: classNames?.item,
            container: classNames?.itemContainer,
            title: classNames?.itemTitle,
            description: classNames?.itemDescription
          }}
        />
      ))}
      {faqList.length > MAX_FAQS_DISPLAYED && (
        <Button
          className={cn(styles.seeMoreButton, classNames?.seeMoreButton)}
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
