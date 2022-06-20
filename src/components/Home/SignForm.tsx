import { ReactElement, useState } from 'react'
import styles from './SignForm.module.css'

export default function SignForm(): ReactElement {
  const [unsignedSD, setUnsignedSD] = useState('')
  return (
    <form>
      <textarea onChange={(e) => setUnsignedSD(e.target.value)}>
        {unsignedSD}
      </textarea>
      <button type="submit"></button>
    </form>
  )
}
