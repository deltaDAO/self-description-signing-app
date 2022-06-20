import Markdown from '../atoms/Markdown'

export default function Visualizer({ text }: { text: string }) {
  return (
    <div>
      <Markdown text={text} />
    </div>
  )
}
