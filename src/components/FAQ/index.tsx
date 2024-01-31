import { useState } from 'react';
import { Collapse, Text, Title, Group, Box } from '@mantine/core';
import styles from './FAQ.module.scss'
import Button from '../Button'
import { MinusCircle, PlusCircle } from '@/assets/images';

const MAX_FAQS_DISPLAYED = 3;

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setOpened] = useState(false);

  return (
    <Box className={styles.item}>
      <Group className={styles.questionContainer} onClick={() => setOpened((prevState) => !prevState)}>
        <Text className={styles.question}>{question}</Text>
        <span>
          {isOpen ? <MinusCircle /> : <PlusCircle />}
        </span>
      </Group>
      <Collapse in={isOpen}>
        <Text className={styles.answer}>{answer}</Text>
      </Collapse>
    </Box>
  );
}

export interface FAQProps {
  list: Array<FAQItemProps>;
  i18n?: {
    title?: string;
    seeLessButtonText?: string;
    seeMoreButtonText?: string;
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
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? list : list.slice(0, MAX_FAQS_DISPLAYED);

  return (
    <Box className={styles.container} {
      ...(showAll ? {
        style: {
          overflowY: showAll && 'auto'
        }
      } : {})
    }
    >
      <Title className={styles.title}>{i18n.title}</Title>
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
    </ Box>
  );
}