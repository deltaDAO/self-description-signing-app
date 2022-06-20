import { forwardRef } from 'react'
import LogoFont from '../../images/logo_font.svg'
import styles from './Logo.module.css'

const Logo = forwardRef((props, ref: any) => {
  return (
    <div ref={ref}>
      <LogoFont className={styles.logo} />
    </div>
  )
})

export default Logo
