import React, { HTMLProps } from 'react'

import { QuestLogInfo } from '../../types'

export interface QuestItemProps extends HTMLProps<HTMLDivElement> {
  info: QuestLogInfo
}

export default function QuestItem({ info, ...props }: QuestItemProps) {
  return <div {...props}>{info.title}</div>
}
