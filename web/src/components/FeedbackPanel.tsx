import type { Question } from '../types/quiz'

interface FeedbackPanelProps {
  question: Question
  correct: boolean
}

export function FeedbackPanel({ question, correct }: FeedbackPanelProps) {
  const { explanation } = question
  return (
    <div className={`feedback ${correct ? 'ok' : 'bad'}`} role="status">
      <h3>{correct ? 'Correct' : 'Incorrect'}</h3>
      <p style={{ color: 'inherit' }}>{correct ? explanation.correct : explanation.incorrect ?? explanation.correct}</p>
      {!correct ? (
        <p style={{ color: 'inherit' }}>
          <strong>Bonne réponse : </strong>
          {explanation.correct}
        </p>
      ) : null}
      <div className="rule">
        <strong>Règle Java : </strong>
        {explanation.javaRule}
      </div>
      {explanation.trap ? (
        <div className="rule">
          <strong>Piège fréquent : </strong>
          {explanation.trap}
        </div>
      ) : null}
    </div>
  )
}
