import { downloadFile, getFormattedCodeString } from '../../utils/sign'
import Button from '../atoms/Button'
import Markdown from '../atoms/Markdown'
import styles from './Visualizer.module.css'

export default function Visualizer({ text }: { text: string }) {
  const formattedText = getFormattedCodeString(text)
  return (
    <div className={styles.container}>
      <h1>Find the signed Self Description here</h1>
      <Markdown text={formattedText} />
      <div className={styles.actions}>
        <Button
          style="primary"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(text, null, 2))
          }}
        >
          Copy
        </Button>
        <Button style="primary" onClick={() => downloadFile(text)}>
          Download
        </Button>
      </div>
    </div>
  )
}
