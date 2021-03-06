import React, { ReactElement } from 'react'
import Head from 'next/head'
import styles from './index.module.css'
import Sign from './Sign'
import Header from './Header'
import Hero from './Hero'
import Container from '../atoms/Container'
import Waves from '../atoms/Waves'
import BlogPosts from './BlogPosts'
import Logo from '../atoms/Logo'
import Footer from './Footer'

export default function HomePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Self-description signing app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Waves />

      <main className={styles.main}>
        <Container>
          <Sign />
          <BlogPosts />
        </Container>
      </main>

      <footer className={styles.footer}>
        <Logo poweredBy />
        <Footer />
      </footer>
    </>
  )
}
