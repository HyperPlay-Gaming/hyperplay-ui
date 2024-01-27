import React from 'react'

import {
  Breadcrumbs as MantineBreadcrumbs,
  BreadcrumbsProps as MantineBreadcrumbsProps
} from '@mantine/core'
import { IconChevronRight, IconHome } from '@tabler/icons-react'

import styles from './Breadcrumbs.module.scss'

export interface Breadcrumb {
  title: string
  href: string
}

export interface BreadcrumbsProps
  extends Omit<MantineBreadcrumbsProps, 'children'> {
  items: Breadcrumb[]
  homeHref?: string
}

export default function Breadcrumbs({
  items,
  homeHref = '/-/dashboard',
  ...props
}: BreadcrumbsProps) {
  return (
    <MantineBreadcrumbs
      separator={<IconChevronRight />}
      classNames={{
        root: styles.root,
        breadcrumb: styles.breadcrumb,
        separator: styles.separator
      }}
      {...props}
    >
      <a href={homeHref}>
        <IconHome className={styles.home} />
      </a>
      {items.map((item, index) => (
        <a key={index} href={item.href}>
          <div className="title">{item.title}</div>
        </a>
      ))}
    </MantineBreadcrumbs>
  )
}
