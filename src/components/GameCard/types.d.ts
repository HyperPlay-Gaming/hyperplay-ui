export type GameCardState =
  | 'NOT_SUPPORTED' //grayed out. only title no action bar
  | 'UNINSTALLING' //message
  | 'QUEUED' //action bar with x
  | 'PLAYING' //action bar with cancel/pause buttons
  | 'INSTALLING' //progress bar
  | 'INSTALLED' //action bar with play
  | 'NOT_INSTALLED' //action bar with download
  | 'PAUSED' //progress bar with cancel/play buttons
  | 'SHOW_MESSAGE' //text only
  | 'NEEDS_UPDATE' //action bar with update icon
  | 'EXTRACTING' // show only cancel button
  | 'DOWNLOADING_DISTRIBUTABLES' //message
  | 'PREPARING' ///message

export interface InstallProgress {
  bytes: string
  eta?: string
  folder?: string
  percent?: number
  downSpeed?: number
  diskSpeed?: number
  file?: string
}

export type SettingsButtons = {
  label: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export type Runner = 'legendary' | 'gog' | 'hyperplay' | 'sideload' | 'nile'
