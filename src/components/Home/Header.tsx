import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import Container from '../atoms/Container'
import Button from '../atoms/Button'
import Link from 'next/link'
import Logo from '../atoms/Logo'

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <Container className={styles.menu}>
        <Link href="/" passHref>
          <Logo />
        </Link>

        <Button style="outline" href="https://portal.minimal-gaia-x.eu/">
          Try the demo
        </Button>
      </Container>
    </header>
  )
}
