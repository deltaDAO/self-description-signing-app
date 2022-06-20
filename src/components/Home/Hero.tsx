import classNames from 'classnames/bind'
import content from '../../../content/hero.json'
import React, { ReactElement } from 'react'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import styles from './Hero.module.css'

const cx = classNames.bind(styles)

interface SectionParams {
  title: string
  subtitle: string
  content: string
  image: string
  cta: {
    label: string
    target: string
    type: 'primary' | 'ghost' | 'text'
  }
}

export default function Hero(): ReactElement {
  const { sections } = content as { sections: SectionParams[] }

  return (
    <Container className={styles.container}>
      {sections.map((section: SectionParams, i: number) => (
        <div
          key={i}
          className={
            i % 2 === 0 ? cx({ section: true, mirror: true }) : styles.section
          }
          style={{
            backgroundImage: `url(/images/${section.image}.png)`
          }}
        >
          <div className={styles.content}>
            <p className={styles.subtitle}>{section.subtitle}</p>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            <Button style={section.cta.type} href={section.cta.target}>
              {section.cta.label}
            </Button>
          </div>
        </div>
      ))}
    </Container>
  )
}
