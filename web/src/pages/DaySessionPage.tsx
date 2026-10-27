import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FeedbackPanel } from '../components/FeedbackPanel'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionView } from '../components/QuestionView'
import { getDayMeta } from '../data/curriculum'
import { getQuestionCounts, getQuestionsForDay } from '../data/questions'
import { useProgress } from '../hooks/useProgress'
import { dayScore, overallStats } from '../lib/scoring'

export function DaySessionPage() {
  const { dayId } = useParams()
  const day = Number(dayId)
  const navigate = useNavigate()
  const meta = getDayMeta(day)
  const questions = useMemo(() => getQuestionsForDay(day), [day])
  const { progress, startOrResumeDay, recordAnswer, advanceQuestion, resetDay, getDay } =
    useProgress()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!meta || questions.length === 0) return
    startOrResumeDay(day)
    setSelectedId(null)
    setReady(true)
  }, [day, meta, questions.length, startOrResumeDay])

  if (!meta || Number.isNaN(day) || day < 1 || day > 30) {
    return <Navigate to="/" replace />
  }

  if (questions.length === 0) {
    return (
      <div className="stack">
        <Link to="/" className="btn btn-ghost">
          ← Accueil
        </Link>
        <div className="card-panel">
          <h1>
            Jour {day} — {meta.title}
          </h1>
          <p>Banque de questions pas encore disponible pour ce jour.</p>
        </div>
      </div>
    )
  }

  const dayProgress = getDay(day)
  if (!ready || !dayProgress) {
    return <p className="muted">Chargement…</p>
  }

  if (dayProgress.completed && dayProgress.answers.length >= questions.length) {
    return <Navigate to={`/day/${day}/results`} replace />
  }

  const index = Math.min(dayProgress.currentIndex, questions.length - 1)
  const question = questions[index]
  const existing = dayProgress.answers.find((a) => a.questionId === question.id)
  const revealed = Boolean(existing)
  const activeSelected = existing?.choiceId ?? selectedId
  const score = dayScore(dayProgress)
  const overall = overallStats(progress, getQuestionCounts())

  const onSelect = (choiceId: string) => {
    if (revealed) return
    setSelectedId(choiceId)
    recordAnswer(question, choiceId, questions.length)
  }

  const onNext = () => {
    setSelectedId(null)
    const next = advanceQuestion(day, questions.length)
    if (next?.completed) {
      navigate(`/day/${day}/results`)
    }
  }

  return (
    <div>
      <div className="session-top">
        <div className="meta-row">
          <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            ← Accueil
          </Link>
          <span className="pill">Jour {day}/30</span>
        </div>
        <div className="meta-row">
          <span>
            Question {index + 1}/{questions.length}
          </span>
          <span>
            Score jour {score.correct}/{score.total}
          </span>
          <span className="muted">Global {overall.pctOverall}%</span>
        </div>
        <ProgressBar value={dayProgress.answers.length} max={questions.length} />
      </div>

      <h1 style={{ fontSize: '1.35rem' }}>{meta.title}</h1>
      <p style={{ marginTop: 0 }}>{meta.summary}</p>

      <QuestionView
        question={question}
        selectedId={activeSelected}
        revealed={revealed}
        onSelect={onSelect}
      />

      {revealed && existing ? (
        <>
          <FeedbackPanel question={question} correct={existing.correct} />
          <div className="actions">
            <button type="button" className="btn btn-primary" onClick={onNext}>
              {index + 1 >= questions.length ? 'Voir les résultats' : 'Question suivante'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (confirm('Recommencer ce jour depuis le début ?')) {
                  resetDay(day)
                  setSelectedId(null)
                  startOrResumeDay(day)
                }
              }}
            >
              Recommencer le jour
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}
