import React from 'react'

import * as IconImages from '@/assets/images'

const IconFill: { [key: string]: string } = {
  DownloadIcon: '#FFFFFF',
  PlayIcon: '#FFFFFF',
  PauseIcon: '#FFFFFF',
  Checkmark: '#FFFFFF',
  DownArrow: '#FFFFFF'
}

export default function Icons() {
  function getAllIcons() {
    const icons = []
    const allImages = IconImages as {
      [key: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    }
    for (const key of Object.keys(allImages)) {
      const props: { width: string; height: string; fill?: string } = {
        width: '36px',
        height: '36px'
      }
      if (Object.hasOwn(IconFill, key)) {
        props.fill = IconFill[key]
      }
      icons.push(allImages[key](props))
    }
    return icons
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <>{getAllIcons()}</>
    </div>
  )
}
