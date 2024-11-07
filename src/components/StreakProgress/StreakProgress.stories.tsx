import { oneDayInMs } from '@hyperplay/utils'
import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/Button'

import { StreakProgress, type StreakProgressProps } from '.'

const meta: Meta<typeof StreakProgress> = {
  title: 'Quests/QuestDetails/StreakProgress',
  component: StreakProgress
}

export default meta

type Story = StoryObj<typeof StreakProgress>

const props: StreakProgressProps = {
  currentStreakInDays: 7,
  requiredStreakInDays: 7,
  minimumSessionTimeInSeconds: 100,
  accumulatedPlaytimeTodayInSeconds: 80,
  lastPlaySessionCompletedDateTimeUTC: new Date(
    Date.now() - oneDayInMs
  ).toUTCString(),
  dateTimeCurrentSessionStartedInMsSinceEpoch: Date.now()
}

export const Default: Story = {
  args: { ...props }
}

export const PlayStreak: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={2}
          requiredStreakInDays={7}
        />
      </div>
    )
  }
}

export const PlayStreakFinished: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={7}
          requiredStreakInDays={7}
        />
      </div>
    )
  }
}

export const PlayStreakNotStarted: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={0}
          requiredStreakInDays={7}
        />
      </div>
    )
  }
}

export const PlayStreak23Days: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={12}
          requiredStreakInDays={23}
        />
      </div>
    )
  }
}

export const PlayStreak25DaysCompletesIn2Seconds: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={10}
          requiredStreakInDays={25}
          accumulatedPlaytimeTodayInSeconds={98}
        />
      </div>
    )
  }
}

export const PlayStreakDaily100PctButNotCompleted: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={10}
          requiredStreakInDays={25}
          accumulatedPlaytimeTodayInSeconds={10000}
          dateTimeCurrentSessionStartedInMsSinceEpoch={undefined}
        />
      </div>
    )
  }
}

export const NoStreakButSomePlayTime: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          currentStreakInDays={0}
          requiredStreakInDays={4}
        />
      </div>
    )
  }
}

export const WithExternalStreakButton: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <StreakProgress
          {...args}
          rightSection={
            <Button
              type="secondaryGradient"
              onClick={() => alert('Syncing...')}
              size="small"
            >
              Sync progress
            </Button>
          }
        />
      </div>
    )
  }
}
