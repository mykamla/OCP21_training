import type { Question } from '../types/quiz'
import { CodeBlock } from './CodeBlock'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface QuestionViewProps {
  question: Question
  selectedId: string | null
  revealed: boolean
  onSelect: (choiceId: string) => void
}

export function QuestionView({ question, selectedId, revealed, onSelect }: QuestionViewProps) {
  return (
    <div>
      <p className="stem">{question.stem}</p>
      {question.code ? <CodeBlock code={question.code} /> : null}
      <div role="listbox" aria-label="Choix de réponse">
        {question.choices.map((choice, i) => {
          let cls = 'choice'
          if (revealed) {
            if (choice.id === question.correctChoiceId) cls += ' correct'
            else if (choice.id === selectedId) cls += ' incorrect'
          } else if (choice.id === selectedId) {
            cls += ' selected'
          }
          return (
            <button
              key={choice.id}
              type="button"
              className={cls}
              disabled={revealed}
              onClick={() => onSelect(choice.id)}
              role="option"
              aria-selected={choice.id === selectedId}
            >
              <span className="label">{LETTERS[i]}.</span>
              {choice.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
