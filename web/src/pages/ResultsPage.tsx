import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getDayMeta, TOPIC_LABELS } from '../data/curriculum'
import { getQuestionsForDay } from '../data/questions'
import { useProgress } from '../hooks/useProgress'
import { dayScore } from '../lib/scoring'
import type { TopicId } from '../types/quiz'

export function ResultsPage() {
  const { dayId } = useParams()
  const day = Number(dayId)
  const navigate = useNavigate()
  const meta = getDayMeta(day)
  const questions = getQuestionsForDay(day)
  const { getDay, resetDay, startOrResumeDay } = useProgress()
  const dayProgress = getDay(day)

  if (!meta || Number.isNaN(day)) return <Navigate to="/" replace />
  if (!dayProgress || questions.length === 0) return <Navigate to={`/day/${day}`} replace />

  const score = dayScore(dayProgress)
  const byTopic = new Map<TopicId, { correct: number; total: number }>()
  for (const a of dayProgress.answers) {
    const cur = byTopic.get(a.topic) ?? { correct: 0, total: 0 }
    cur.total += 1
    if (a.correct) cur.correct += 1
    byTopic.set(a.topic, cur)
  }

  const nextDay = day < 30 ? day + 1 : null

  return (
    <div className="stack">
      <Link to="/" className="btn btn-ghost" style={{ justifyContent: 'flex-start', paddingLeft: 0 }}>
        ← Accueil
      </Link>
      <section className="card-panel" style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: 0 }}>
          Jour {day}/30 · {meta.title}
        </p>
        <div className="results-score">{score.pct}%</div>
        <p>
          {score.correct} bonnes réponses sur {score.total}
        </p>
      </section>

      {byTopic.size > 0 ? (
        <section className="card-panel">
          <h2 style={{ fontSize: '1.15rem' }}>Par thème</h2>
          <div className="stack">
            {[...byTopic.entries()].map(([topic, s]) => (
              <div key={topic} className="meta-row" style={{ marginBottom: 0 }}>
                <span>{TOPIC_LABELS[topic]}</span>
                <span className="pill">
                  {s.correct}/{s.total} · {Math.round((s.correct / s.total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="actions">
        {nextDay ? (
          <Link className="btn btn-primary" to={`/day/${nextDay}`}>
            Jour suivant
          </Link>
        ) : (
          <Link className="btn btn-primary" to="/">
            Retour à l’accueil
          </Link>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            resetDay(day)
            startOrResumeDay(day)
            navigate(`/day/${day}`)
          }}
        >
          Refaire ce jour
        </button>
      </div>
    </div>
  )
}
