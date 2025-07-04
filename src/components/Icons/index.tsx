import React from 'react'

import * as IconImages from '@/assets/images'

const IconFill: { [key: string]: string } = {
  DownloadIcon: '#FFFFFF',
  PauseIcon: '#FFFFFF',
  Checkmark: '#FFFFFF',
  DownArrow: '#FFFFFF',
  Home: '#FFFFFF',
  Controller: '#FFFFFF',
  Settings: '#FFFFFF',
  Page: '#FFFFFF',
  HyperPlayTextLogo: '#FFFFFF',
  HyperPlayFullTextLogo: '#FFFFFF',
  MagnifyingGlass: '#FFFFFF',
  Twitter: '#FFFFFF',
  Heart: '#FFFFFF',
  Grid: '#FFFFFF',
  List: '#FFFFFF',
  Blockchain: 'white',
  Token: 'white',
  Info: 'white',
  EthereumIcon: 'white',
  PolygonIcon: 'white',
  Resume: 'white',
  Ellipsis: 'white',
  Youtube: 'white',
  DiscordFilled: 'white',
  XFilled: 'white',
  SteamLogo: 'white',
  TwitchLogo: 'white',
  KickLogo: 'white',
  XLogo: 'white',
  XLogoFilled: 'white',
  Email: 'white',
  GoogleLogo: 'white',
  TwitterFilled: 'white',
  WebIcon: '#FFFFFF',
  TrophyOutline: '#FFFFFF',
  CheckmarkCircleOutline: '#FFFFFF',
  TrashCan: '#FFFFFF',
  QuestIcon: '#FFFFFF',
  QuestionMark: '#FFFFFF',
  Wallet: '#FFFFFF',
  ArrowTop: '#FFFFFF',
  AlertBell: '#FFFFFF',
  LightningBolt: '#FFFFFF',
  QuestScroll: '#FFFFFF',
  QuestScrollIcon: '#FFFFFF',
  Diamond: '#FFFFFF',
  LinuxIcon: '#FFFFFF',
  WindowsIcon: '#FFFFFF',
  MacOSIcon: '#FFFFFF',
  SteamDeckIcon: '#FFFFFF',
  Line: '#FFFFFF',
  Windows11Icon: '#FFFFFF'
}

const IconStroke: { [key: string]: string } = {
  Discord: '#FFFFFF',
  GiftBox: '#FFFFFF',
  AlertTriangle: '#FFFFFF',
  PlusCircle: '#FFFFFF',
  MinusCircle: '#FFFFFF',
  LightningBolt: '#FFFFFF',
  Clock: '#FFFFFF',
  ArrowUpRight: '#FFFFFF',
  LinkExternal: '#FFFFFF',
  PlayIcon: '#FFFFFF',
  QuestionMarkRounded: '#FFFFFF'
}

export default function Icons() {
  function getAllIcons() {
    const icons = []
    const allImages = IconImages as {
      [key: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    }
    for (const key of Object.keys(allImages)) {
      const props: {
        width: string
        height: string
        fill?: string
        stroke?: string
      } = {
        width: '36px',
        height: '36px'
      }
      if (Object.hasOwn(IconFill, key)) {
        props.fill = IconFill[key]
      }
      if (Object.hasOwn(IconStroke, key)) {
        props.stroke = IconStroke[key]
      }
      icons.push(<div>{key}</div>)
      icons.push(allImages[key](props))
    }
    return icons
  }

  return (
    <div>
      <>{getAllIcons()}</>
    </div>
  )
}
