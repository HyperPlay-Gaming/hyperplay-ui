import React from 'react'

import * as IconImages from '@/assets/images'

export default function Icons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <IconImages.TxnPending />
      <IconImages.CloseButton />
      <IconImages.TxnAlert />
      <IconImages.TxnSubmitted />
      <IconImages.TxnSuccess />
      <IconImages.TxnError />
      <IconImages.ChevronLeft />
      <IconImages.ChevronRight />
      <IconImages.ArrowLeft />
      <IconImages.HyperplayStoreIcon />
      <IconImages.LinuxIcon />
      <IconImages.MacOSIcon />
      <IconImages.WindowsIcon />
      <IconImages.SteamDeckIcon />
      <IconImages.WebIcon />
      <IconImages.BurgerClosedIcon />
      <IconImages.BurgerOpenIcon />
      <IconImages.MobileHpLogo />
      <IconImages.WarningIcon />
      <IconImages.RightArrow />
      <IconImages.DownloadIcon />
      <IconImages.PlayIcon />
    </div>
  )
}