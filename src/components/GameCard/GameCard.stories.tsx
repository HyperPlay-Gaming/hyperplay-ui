import React, { useState } from 'react'

import MoonBlastersCover from '@/assets/MoonBlastersCover.png?url'
import RocketMonstersCover from '@/assets/RocketMonstersCover.png?url'

import GameCard from '.'
import { Runner } from './types'

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
    {
      label: 'Add to Steam',
      onClick: () => console.log('add to steam clicked')
    },
    { label: 'Move game', onClick: () => console.log('Move game clicked') },
    { label: 'Game page', onClick: () => console.log('Game page clicked') }
  ],
  showSettings: false,
  onSettingsClick: () => console.log('settings button clicked'),
  onUpdateClick: () => console.log('update button clicked'),
  onResumeClick: () => console.log('resume button clicked'),
  store: 'hyperplay' as Runner
}

export const DefaultUninstalled = () => {
  const [favorited, setFavorited] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NOT_INSTALLED"
      favorited={favorited}
      onFavoriteClick={() => setFavorited(!favorited)}
    ></GameCard>
  )
}

export const DefaultUninstalledEpic = () => {
  const [favorited, setFavorited] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NOT_INSTALLED"
      store="legendary"
      favorited={favorited}
      onFavoriteClick={() => setFavorited(!favorited)}
    ></GameCard>
  )
}

export const DefaultUninstalledGOG = () => {
  const [favorited, setFavorited] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NOT_INSTALLED"
      store="gog"
      favorited={favorited}
      onFavoriteClick={() => setFavorited(!favorited)}
    ></GameCard>
  )
}

export const DefaultUninstalledAmazon = () => {
  const [favorited, setFavorited] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NOT_INSTALLED"
      store="nile"
      favorited={favorited}
      onFavoriteClick={() => setFavorited(!favorited)}
    ></GameCard>
  )
}

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
      imageUrl={MoonBlastersCover}
    ></GameCard>
  )
}

export const ShowMessage = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="SHOW_MESSAGE"
    message="Test message..."
    imageUrl={RocketMonstersCover}
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

export const Installing = () => {
  const [showSettings, setShowSettings] = useState(true)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="INSTALLING"
      progress={{ bytes: '0', percent: 50 }}
      message="Installing..."
      onContextMenu={(e) => {
        e.preventDefault()
        setShowSettings(!showSettings)
      }}
      showSettings={showSettings}
      onSettingsClick={() => setShowSettings(!showSettings)}
    ></GameCard>
  )
}

export const Paused = () => (
  <GameCard
    title="Test Game"
    {...onClickHandlers}
    state="PAUSED"
    progress={{ bytes: '0', percent: 50 }}
    message="Paused"
  ></GameCard>
)

export const TwoInstalled = () => {
  return (
    <div style={{ display: 'flex' }}>
      <GameCard
        title="Test Game"
        {...onClickHandlers}
        state="INSTALLED"
        imageUrl={MoonBlastersCover}
      ></GameCard>
      <GameCard
        title="Test Game"
        {...onClickHandlers}
        state="INSTALLED"
        imageUrl={MoonBlastersCover}
      ></GameCard>
    </div>
  )
}

export const InstalledContextMenu = () => {
  const [showSettings, setShowSettings] = useState(true)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="INSTALLED"
      imageUrl={MoonBlastersCover}
      onContextMenu={(e) => {
        e.preventDefault()
        setShowSettings(!showSettings)
      }}
      showSettings={showSettings}
      onSettingsClick={() => setShowSettings(!showSettings)}
    ></GameCard>
  )
}

export const NeedsUpdate = () => {
  const [showSettings, setShowSettings] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NEEDS_UPDATE"
      imageUrl={MoonBlastersCover}
      onContextMenu={(e) => {
        e.preventDefault()
        setShowSettings(!showSettings)
      }}
      showSettings={showSettings}
      onSettingsClick={() => setShowSettings(!showSettings)}
    ></GameCard>
  )
}

export const Store = () => {
  const [inLibrary, setInLibrary] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NEEDS_UPDATE"
      app="store"
      onAddToLibraryClick={() => setInLibrary(true)}
      onRemoveFromLibraryClick={() => setInLibrary(false)}
      gameIsAddedToLibrary={inLibrary}
    ></GameCard>
  )
}

export const StoreInClient = () => {
  const [inLibrary, setInLibrary] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NEEDS_UPDATE"
      app="storeInClient"
      onAddToLibraryClick={() => setInLibrary(true)}
      onRemoveFromLibraryClick={() => setInLibrary(false)}
      gameIsAddedToLibrary={inLibrary}
      enableRemoveButton={true}
    ></GameCard>
  )
}

export const StoreInClientRemoveDisabled = () => {
  const [inLibrary, setInLibrary] = useState(false)
  return (
    <GameCard
      title="Test Game"
      {...onClickHandlers}
      state="NEEDS_UPDATE"
      app="storeInClient"
      onAddToLibraryClick={() => setInLibrary(true)}
      onRemoveFromLibraryClick={() => setInLibrary(false)}
      gameIsAddedToLibrary={inLibrary}
      enableRemoveButton={false}
      notAddedText={'Add'}
      addedText="In library"
    ></GameCard>
  )
}
