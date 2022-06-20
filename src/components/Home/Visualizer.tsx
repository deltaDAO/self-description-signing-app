import { getFormattedCodeString } from '../../utils/sign'
import Markdown from '../atoms/Markdown'

export default function Visualizer({ text }: { text: string }) {
  const formattedText = getFormattedCodeString(text)
  return (
    <div>
      <Markdown text={formattedText} />
      <button
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(text, null, 2))
        }}
      >
        Copy
      </button>
    </div>
  )
}
