import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { GameCardi18n } from '../..'
import * as Images from '../../../../assets/images'
import styles from '../../GameCard.module.scss'

type StoreLogoProps = {
  store: string
  state: string
  i18n: GameCardi18n
}

const StoreLogo = ({ store, state, i18n }: StoreLogoProps) => {
  const [showPopover, { open, close }] = useDisclosure(false)
  const isInstalled = state === 'INSTALLED'

  switch (store) {
    case 'hyperplay':
      return (
        <Popover
          position="top"
          shadow="md"
          opened={showPopover}
          offset={{ mainAxis: 0 }}
          classNames={{ dropdown: styles.popover }}
          unstyled
        >
          <Popover.Target>
            <button
              onMouseEnter={open}
              onMouseLeave={close}
              className={styles.targetButton}
            >
              <Images.HyperPlayStoreLogo />
            </button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="caption-sm">
              {isInstalled
                ? i18n.logoTextTooltip.hyperplay.installed
                : i18n.logoTextTooltip.hyperplay.notInstalled}
            </div>
          </Popover.Dropdown>
        </Popover>
      )
    case 'gog':
      return (
        <Popover
          position="top"
          shadow="md"
          opened={showPopover}
          offset={{ mainAxis: 0 }}
          classNames={{ dropdown: styles.popover }}
          unstyled
        >
          <Popover.Target>
            <button
              onMouseEnter={open}
              onMouseLeave={close}
              className={styles.targetButton}
            >
              <Images.GogStoreLogo />
            </button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="caption-sm">
              {isInstalled
                ? i18n.logoTextTooltip.gog.installed
                : i18n.logoTextTooltip.gog.notInstalled}
            </div>
          </Popover.Dropdown>
        </Popover>
      )
    case 'legendary':
      return (
        <Popover
          position="top"
          shadow="md"
          opened={showPopover}
          offset={{ mainAxis: 0 }}
          classNames={{ dropdown: styles.popover }}
          unstyled
        >
          <Popover.Target>
            <button
              onMouseEnter={open}
              onMouseLeave={close}
              className={styles.targetButton}
            >
              <Images.EpicStoreLogo className={styles.epicStoreLogo} />
            </button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="caption-sm">
              {isInstalled
                ? i18n.logoTextTooltip.epic.installed
                : i18n.logoTextTooltip.epic.notInstalled}
            </div>{' '}
          </Popover.Dropdown>
        </Popover>
      )
    default:
      return null
  }
}

export default StoreLogo
