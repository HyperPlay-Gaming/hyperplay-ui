import React, { CSSProperties } from 'react'

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from '@mantine/core'
import classNames from 'classnames'

import * as Images from '@/assets/images'

import Button from '../Button'
import CircularButton, { CircularButtonProps } from '../CircularButton'
import styles from './AchievementNav.module.scss'

export interface GameAdded {
  title: string
  onGameRemove: () => void
}

export interface AchievementNavProps {
  /**
   * Amount of free mints the user has
   */
  freeMints: number
  /**
   * Amount in the user's basket
   */
  basketAmount: number
  /**
   * Go to next game
   */
  nextButtonProps?: CircularButtonProps
  /**
   * Go to previous game
   */
  previousButtonProps?: CircularButtonProps
  i18n?: {
    /**
     * text to show how many free mints a user has
     */
    freeMintsLabel?: string
  }
  showPreviousButton?: boolean
  showNextButton?: boolean
  showGameAddButton: boolean
  onGameAdd?: () => void
  gamesAdded: GameAdded[]
  addThisGameText?: string
  gamesToMintLabelText?: string
}

export default function AchievementNav({
  freeMints,
  basketAmount,
  previousButtonProps,
  nextButtonProps,
  i18n = {
    freeMintsLabel: 'Free mints'
  },
  showPreviousButton = false,
  showNextButton = false,
  onGameAdd = () => {
    console.log('game add clicked')
  },
  gamesAdded,
  addThisGameText = 'Add this game',
  showGameAddButton,
  gamesToMintLabelText = 'Games to mint'
}: AchievementNavProps) {
  const xIcon = (
    <div>
      <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
    </div>
  )
  const gameComponents = gamesAdded.map((game) => (
    <Menu.Item
      key={game.title}
      className={styles.gameAddedContainer}
      onClick={game.onGameRemove}
    >
      <div className="body">{game.title}</div>
      {xIcon}
    </Menu.Item>
  ))

  const plusIcon = <Images.PlusCircleOutline />

  const dropdownStyle: CSSProperties = {}
  if (gamesAdded.length === 0) {
    dropdownStyle.cursor = 'default'
  }

  return (
    <div className={styles.row}>
      <div className={styles.left}>
        {showPreviousButton ? (
          <CircularButton
            {...previousButtonProps}
            className={classNames(
              previousButtonProps?.className,
              styles.navItem
            )}
          >
            <Images.ChevronLeft width="16" height="16" />
          </CircularButton>
        ) : null}
        {showNextButton ? (
          <CircularButton
            {...nextButtonProps}
            className={classNames(
              previousButtonProps?.className,
              styles.navItem
            )}
          >
            <Images.ChevronRight width="16" height="16" />
          </CircularButton>
        ) : null}
      </div>

      <div className={styles.right}>
        <div className="text--md">
          {i18n.freeMintsLabel}:{' '}
          <span className="weight--semibold">{freeMints}</span>
        </div>

        <Menu
          position="bottom-end"
          shadow="md"
          trigger="hover"
          classNames={{
            dropdown: styles.dropdown,
            itemLabel: styles.itemLabel,
            item: styles.item
          }}
        >
          <Menu.Target>
            <div className={styles.basket} style={dropdownStyle}>
              <Images.TrophyOutline width="22" height="22" />
              <div className={classNames(styles.badge, 'menu')}>
                {basketAmount}
              </div>
            </div>
          </Menu.Target>
          {gamesAdded.length > 0 ? (
            <Menu.Dropdown className={styles.dropdownContainer}>
              {showGameAddButton ? (
                <Menu.Item className={styles.addThisGameContainer}>
                  <Button
                    type="secondary"
                    leftIcon={plusIcon}
                    onClick={onGameAdd}
                    className={styles.addThisGameButton}
                    id="addThisGameButtonId"
                  >
                    {addThisGameText}
                  </Button>
                </Menu.Item>
              ) : null}
              <Menu.Label className={styles.menuLabel}>
                {gamesToMintLabelText}
              </Menu.Label>
              {gameComponents}
            </Menu.Dropdown>
          ) : null}
        </Menu>
      </div>
    </div>
  )
}
