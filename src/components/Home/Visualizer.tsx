import { getFormattedCodeString } from '../../utils/sign'
import Markdown from '../atoms/Markdown'
import styles from './Visualizer.module.css'

export default function Visualizer({ text }: { text: string }) {
  const formattedText = getFormattedCodeString(text)
  return (
    <div className={styles.container}>
      <Markdown text={formattedText} />
    </div>
  )
}
