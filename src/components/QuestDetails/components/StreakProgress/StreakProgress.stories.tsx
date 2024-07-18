import type { Meta, StoryObj } from '@storybook/react'

import StreakProgress, { StreakProgressProps } from '.'

const meta: Meta<typeof StreakProgress> = {
  title: 'Quests/QuestDetails/StreakProgress',
  component: StreakProgress
}

export default meta

type Story = StoryObj<typeof StreakProgress>

const props: StreakProgressProps = {
  currentStreakInDays: 7,
  requiredStreakInDays: 7,
  resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600,
  dailySessionPercentCompleted: 80
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
          resetTimeInMsSinceEpoch={Date.now().valueOf() + 1000 * 3600}
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
          resetTimeInMsSinceEpoch={Date.now().valueOf() + 1000 * 3600}
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
          resetTimeInMsSinceEpoch={Date.now().valueOf() + 1000 * 3600}
          dailySessionPercentCompleted={30}
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
          resetTimeInMsSinceEpoch={Date.now().valueOf() + 1000 * 3600}
          dailySessionPercentCompleted={1}
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
          resetTimeInMsSinceEpoch={Date.now().valueOf() + 2000}
          dailySessionPercentCompleted={84}
        />
      </div>
    )
  }
}
