import React from 'react'

import GameCard from '.'

export default {
  title: 'GameCard'
}

const onClickHandlers = {
  onDownloadClick: () => console.log('download clicked'),
  onFavoriteClick: () => console.log('favorite clicked'),
  onPlayClick: () => console.log('play clicked'),
  onRemoveFromQueueClick: () => console.log('remove from queue clicked'),
  onStopPlayingClick: () => console.log('stop playing clicked'),
  onPauseClick: () => console.log('pause download clicked'),
  onStopDownloadClick: () => console.log('stop download clicked')
}

export const DefaultUninstalled = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="NOT_INSTALLED"
  ></GameCard>
)

export const LongTitleUninstalled = () => (
  <GameCard
    title="Test Game with a Really Long Title"
    {...onClickHandlers}
    state="NOT_INSTALLED"
  ></GameCard>
)

export const Queued = () => (
  <GameCard title="Test Game" {...onClickHandlers} state="QUEUED"></GameCard>
)

export const Playing = () => (
  <GameCard title="Test Game" {...onClickHandlers} state="PLAYING"></GameCard>
)

export const Installed = () => (
  <GameCard title="Test Game" {...onClickHandlers} state="INSTALLED"></GameCard>
)

export const ShowMessage = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="SHOW_MESSAGE"
    message="Test message..."
  ></GameCard>
)

export const NotSupported = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="NOT_SUPPORTED"
    message="Test message..."
  ></GameCard>
)

export const Uninstalling = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="UNINSTALLING"
    message="Test message..."
  ></GameCard>
)

export const Installing = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="INSTALLING"
    progress={{ bytes: '0', percent: 50 }}
  ></GameCard>
)
