import React, { ReactNode, FormEvent, ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.css'

const cx = classNames.bind(styles)

export interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: (e: FormEvent) => void
  disabled?: boolean
  name?: string
  size?: 'small'
  style?: 'primary' | 'ghost' | 'outline' | 'text'
  type?: 'submit'
  download?: boolean
  target?: string
  rel?: string
  title?: string
}

export default function Button({
  href,
  children,
  size,
  style,
  className,
  ...props
}: ButtonProps): ReactElement {
  const styleClasses = cx({
    button: true,
    primary: style === 'primary',
    ghost: style === 'ghost',
    outline: style === 'outline',
    text: style === 'text',
    small: size === 'small',
    [className as string]: className
  })

  return href ? (
    <a href={href} className={styleClasses} {...props}>
      {children}
    </a>
  ) : (
    <button className={styleClasses} {...props}>
      {children}
    </button>
  )
}
