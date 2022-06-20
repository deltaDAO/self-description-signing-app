import { downloadFile, getFormattedCodeString } from '../../utils/sign'
import Button from '../atoms/Button'
import Markdown from '../atoms/Markdown'
import styles from './Visualizer.module.css'

export default function Visualizer({ text }: { text: string }) {
  const formattedText = getFormattedCodeString(text)
  return (
    <div className={styles.container}>
      <Markdown text={formattedText} />
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
  )
}
