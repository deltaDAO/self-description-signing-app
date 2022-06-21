import React, { ReactElement, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './Container.module.css'

const cx = classNames.bind(styles)

export default function Container({
  children,
  narrow,
  className
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
}): ReactElement {
  const styleClasses = className
    ? cx({
        container: true,
        narrow: narrow,
        [className]: className
      })
    : cx({
        container: true,
        narrow: narrow
      })

  return <div className={styleClasses}>{children}</div>
}
