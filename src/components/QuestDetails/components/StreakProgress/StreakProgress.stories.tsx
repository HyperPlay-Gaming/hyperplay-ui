import type { Meta, StoryObj } from '@storybook/react'

import StreakProgress, { StreakProgressProps } from '.'
import { getNextMidnightTimestamp } from '../../../../../tests/utils/getNextMidnightUTCTimestamp.ts'

const meta: Meta<typeof StreakProgress> = {
  title: 'Quests/QuestDetails/StreakProgress',
  component: StreakProgress
}

export default meta

type Story = StoryObj<typeof StreakProgress>

const props: StreakProgressProps = {
  currentStreakInDays: 7,
  requiredStreakInDays: 7,
  getResetTimeInMsSinceEpoch: getNextMidnightTimestamp,
  getDailySessionPercentCompleted: () => 80
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
          getResetTimeInMsSinceEpoch={getNextMidnightTimestamp}
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
          getResetTimeInMsSinceEpoch={getNextMidnightTimestamp}
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
          getResetTimeInMsSinceEpoch={getNextMidnightTimestamp}
          getDailySessionPercentCompleted={() => 30}
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
          getResetTimeInMsSinceEpoch={getNextMidnightTimestamp}
          getDailySessionPercentCompleted={() => 1}
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
          getResetTimeInMsSinceEpoch={() => Date.now().valueOf() + 2000}
          getDailySessionPercentCompleted={() => 84}
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
          getResetTimeInMsSinceEpoch={() => Date.now().valueOf() + 2000}
          getDailySessionPercentCompleted={() => 100}
        />
      </div>
    )
  }
}
