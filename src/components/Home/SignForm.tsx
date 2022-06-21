import { FormEvent, ReactElement, useState } from 'react'
import { toast } from 'react-toastify'
import { signServiceSelfDescription } from '../../utils/sign'
import Button from '../atoms/Button'
import Loader from '../atoms/Loader'
import Warning from '../atoms/Warning'
import styles from './SignForm.module.css'
import content from '../../../content/sign.json'
import placeholder from '../../../content/signFormPlaceholder.json'

export default function SignForm({
  errorsRef,
  resultsRef,
  setSignedSD,
  setSignatureErrors
}: {
  errorsRef: any
  resultsRef: any
  setSignedSD: (signedSD: string) => void
  setSignatureErrors: (signatureErrors: string) => void
}): ReactElement {
  const { title, subtitle } = content.form
  const [unsignedSD, setUnsignedSD] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAccepted) return
    setSignedSD('')
    setSignatureErrors('')

    setIsLoading(true)
    try {
      const requestBody = JSON.parse(unsignedSD)
      const responseSD = await signServiceSelfDescription(requestBody)
      if (responseSD.signed) {
        setSignedSD(responseSD.signedSD)
        toast.success('Self-description successfully signed!')
        resultsRef.current.scrollIntoView({ behavior: 'smooth' })
        return
      }
      if (responseSD?.errors) {
        setSignatureErrors(responseSD.errors)
        toast.error('The provided self-description is not valid.')
        errorsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
      console.error(String(error))

      toast.error(
        'The provided self-description is not valid. Please make sure it is a valid JSON file and try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className={styles.textarea}
          onChange={(e) => setUnsignedSD(e.target.value)}
          value={unsignedSD}
          placeholder={JSON.stringify(placeholder, null, 2)}
        />
        <Warning />
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isAccepted}
            onChange={() => setIsAccepted(!isAccepted)}
          ></input>
          <span>
            I have read and accepted the Gaia-X Ecosystem{' '}
            <a
              href="https://gaia-x.gitlab.io/policy-rules-committee/trust-framework/participant/#natural-person"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
          </span>
        </label>
        <div className={styles.actions}>
          <Button
            type="submit"
            style="primary"
            disabled={!isAccepted || !unsignedSD || isLoading}
          >
            Validate and sign
          </Button>
          {isLoading && <Loader message="signing..." />}
        </div>
      </form>
    </div>
  )
}
