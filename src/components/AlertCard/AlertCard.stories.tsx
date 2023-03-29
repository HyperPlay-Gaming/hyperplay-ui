/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import AlertCard from '.'

export default {
  title: 'AlertCard',
  component: AlertCard
}

export const WarningAlertCard = () => (
  <AlertCard
    title="How to report a problem?"
    message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
    actionText="Button CTA"
    onClose={() => {}}
    onActionClick={() => {}}
    variant="warning"
  />
)

export const ErrorAlertCard = () => (
  <AlertCard
    title="How to report a problem?"
    message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
    onClose={() => {}}
    variant="danger"
  />
)
