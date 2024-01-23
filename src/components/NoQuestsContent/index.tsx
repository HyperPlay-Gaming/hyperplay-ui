import { Container, Text, Title } from '@mantine/core';
import cn from 'classnames';
import Button, { ButtonProps } from '@/components/Button'
import styles from './index.module.scss';
import {
  QuestIcon
} from '@/assets/images'

interface NoQuestsContentProps {
  onCreateNewQuest: () => void;
  i18n?: i18nNoQuestContentContext;
  className?: string;
  buttonProps?: ButtonProps
}

interface i18nNoQuestContentContext {
  title: string;
  description: string;
  buttonText: string;
}

export default function NoQuestsContent({
  className: classNameProp,
  onCreateNewQuest,
  i18n = {
    title: 'Create your first Quest',
    description: 'Incentivize players with previous Steam Achievements to try out your game.',
    buttonText: 'Create New Quest'
  },
  buttonProps = {}
}: NoQuestsContentProps) {
  return (
      <Container className={cn(styles.container, classNameProp)}>
        <QuestIcon width={240} height={240} />
        <Title className={styles.title}>{i18n.title}</Title>
        <Text className={styles.description}>{i18n.description}</Text>
        <Button onClick={onCreateNewQuest} {...buttonProps}>{i18n.buttonText}</Button>
      </Container>
  );
}
