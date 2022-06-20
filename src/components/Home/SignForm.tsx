import { FormEvent, ReactElement, useState } from 'react'
import { signServiceSelfDescription } from '../../utils/sign'
import styles from './SignForm.module.css'

export default function SignForm({
  setSignedSD,
  setSignatureErrors
}: {
  setSignedSD: (signedSD: string) => void
  setSignatureErrors: (signatureErrors: string) => void
}): ReactElement {
  const [unsignedSD, setUnsignedSD] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const responseSD = await signServiceSelfDescription(unsignedSD)
      if (responseSD.signed) {
        setSignedSD(responseSD.signedSD)
        return
      }
      if (responseSD?.errors) setSignatureErrors(responseSD.errors)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
      console.error(String(error))
    }
  }
  return (
    <form>
      <textarea
        className={styles.input}
        onChange={(e) => setUnsignedSD(e.target.value)}
      >
        {unsignedSD}
      </textarea>
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={styles.submitButton}
      ></button>
    </form>
  )
}
