import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { signServiceSelfDescription } from '../../utils/sign'
import Button from '../atoms/Button'
import Loader from '../atoms/Loader'
import Warning from '../atoms/Warning'
import styles from './SignForm.module.css'
import content from '../../../content/sign.json'
import placeholderText from '../../../content/signFormPlaceholder.json'
import Markdown from '../atoms/Markdown'
import CopyIcon from '../../../public/images/copy.svg'

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
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const placeholderRef = useRef<HTMLTextAreaElement>(null)
  const placeholder = JSON.stringify(placeholderText, null, 2)
  const { title, subtitle } = content.form
  const [unsignedSD, setUnsignedSD] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  useEffect(() => {
    if (!textareaRef.current || !placeholderRef.current) return

    textareaRef.current.style.height = 'inherit'
    textareaRef.current.style.height = !unsignedSD
      ? `${placeholderRef.current.scrollHeight}px`
      : `${textareaRef.current.scrollHeight}px`
  }, [unsignedSD])

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
      <Markdown text={subtitle} />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          onChange={(e) => setUnsignedSD(e.target.value)}
          value={unsignedSD}
          placeholder={placeholder}
        />
        <textarea
          ref={placeholderRef}
          className={styles.placeholderSpacer}
          defaultValue={placeholder}
        />
        {!unsignedSD && (
          <Button
            style="primary"
            className={styles.copyExampleButton}
            onClick={() => {
              navigator.clipboard.writeText(placeholder)
              toast.success('Copied to clipboard')
            }}
          >
            <CopyIcon />
            <span className={styles.copyButtonText}> Copy example</span>
          </Button>
        )}
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
