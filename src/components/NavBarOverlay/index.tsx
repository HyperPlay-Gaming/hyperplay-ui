import React from 'react'
import { Link } from 'react-router-dom'

interface NavItem {
  title: string
  route: string
}

export interface NavBarOverlayProps {
  items: NavItem[]
}

export function NavBarOverlay({ items }: NavBarOverlayProps) {
  const linkItems = items.map((val) => (
    <Link to={val.route} key={val.route}>
      {val.title}
    </Link>
  ))
  return <div>{linkItems}</div>
}
