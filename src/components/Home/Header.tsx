import React, { ReactElement } from 'react'
import LogoFont from '../../images/logo_font.svg'
import styles from './Header.module.css'
import Container from '../atoms/Container'
import Button from '../atoms/Button'
import Link from 'next/link'

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <Container className={styles.menu}>
        <Link href="/">
          <LogoFont />
        </Link>

        <Button style="outline" href="https://portal.minimal-gaia-x.eu/">
          Try the demo
        </Button>
      </Container>
    </header>
  )
}
