import { ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

import List from '../List'
import { Member, MemberProps } from '../Member'
import styles from './MemberList.module.scss'

export interface MemberListProps {
  members: MemberProps[]
  onRemove?: (member: string) => void
  editable?: boolean
  supportAddress?: string
}

export function MemberList(props: MemberListProps) {
  const remove = (member: string) => {
    if (props.onRemove) props.onRemove(member)
  }

  const members = props.members.map((memberProps, index: number) => (
    <div key={index} className={styles.memberContainer}>
      <Member supportAddress={props?.supportAddress} {...memberProps} />
      {props.editable && props.members.length > 1 && (
        <ActionIcon
          variant="transparent"
          onClick={() => remove(memberProps.member)}
        >
          <IconTrash className={styles.trash} />
        </ActionIcon>
      )}
    </div>
  ))

  return <List>{members}</List>
}
