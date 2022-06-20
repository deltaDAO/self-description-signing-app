import { FormEvent, ReactElement, useState } from 'react'
import { signServiceSelfDescription } from '../../utils/sign'
import Button from '../atoms/Button'
import Loader from '../atoms/Loader'
import styles from './SignForm.module.css'

export default function SignForm({
  setSignedSD,
  setSignatureErrors
}: {
  setSignedSD: (signedSD: string) => void
  setSignatureErrors: (signatureErrors: string) => void
}): ReactElement {
  const [unsignedSD, setUnsignedSD] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const requestBody = JSON.parse(unsignedSD)
      const responseSD = await signServiceSelfDescription(requestBody)
      if (responseSD.signed) {
        setSignedSD(responseSD.signedSD)
        return
      }
      if (responseSD?.errors) setSignatureErrors(responseSD.errors)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
      console.error(String(error))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.container}>
      <h1>Sign your Self Description</h1>
      <p>
        Input your self description in a valid JSON-LD format and we will sign
        it with a deltaDAO test-key.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className={styles.textarea}
          onChange={(e) => setUnsignedSD(e.target.value)}
          value={unsignedSD}
        />
        <p>
          Note: This is ONLY meant for testing purpose in the context of the
          Gaia-X hackathon
        </p>
        <Button type="submit" style="primary" disabled={isLoading}>
          {isLoading ? <Loader message="signing..." /> : 'Validate and sign'}
        </Button>
      </form>
    </div>
  )
}
