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
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
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
    <form>
      <textarea
        className={styles.input}
        onChange={(e) => setUnsignedSD(e.target.value)}
        value={unsignedSD}
      />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={styles.submitButton}
        >
          Sign
        </button>
      )}
    </form>
  )
}
