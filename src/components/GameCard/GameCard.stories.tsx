import React, { useState } from 'react'

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
  onStopDownloadClick: () => console.log('stop download clicked'),
  settingsItems: [
    { label: 'Update', onClick: () => console.log('update clicked') },
    {
      label: 'Add to Steam',
      onClick: () => console.log('add to steam clicked')
    },
    { label: 'Move game', onClick: () => console.log('Move game clicked') },
    { label: 'Game page', onClick: () => console.log('Game page clicked') }
  ]
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

export const Installed = () => {
  /* eslint-disable-next-line */
  const { onFavoriteClick, ...handlers } = onClickHandlers
  const [favorited, setFavorited] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...handlers}
      onFavoriteClick={() => setFavorited(!favorited)}
      state="INSTALLED"
      favorited={favorited}
    ></GameCard>
  )
}

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
    message="Installing..."
  ></GameCard>
)

export const Paused = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="PAUSED"
    progress={{ bytes: '0', percent: 50 }}
    message="Paused"
  ></GameCard>
)
