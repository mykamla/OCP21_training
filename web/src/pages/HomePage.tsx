import { Link } from 'react-router-dom'
import { DayList } from '../components/DayList'
import { ProgressBar } from '../components/ProgressBar'
import { getQuestionCounts } from '../data/questions'
import { useProgress } from '../hooks/useProgress'
import { overallStats, weakTopics } from '../lib/scoring'

export function HomePage() {
  const { progress, resetAll } = useProgress()
  const counts = getQuestionCounts()
  const stats = overallStats(progress, counts)
  const weak = weakTopics(progress)
  const continueDay = progress.lastActiveDay

  return (
    <div className="stack">
      <header className="hero-home">
        <div className="brand-mark" style={{ marginBottom: '1rem' }}>
          <span className="logo">21</span>
          <span className="brand" style={{ fontSize: '1.35rem' }}>
            OCP21 Prep
          </span>
        </div>
        <h1 className="brand">OCP21 Prep</h1>
        <p className="tagline">
          Plan de 30 jours pour l’examen Java SE 21 (1Z0-830) — fondations et pièges d’examen, une
          question à la fois.
        </p>
        <div className="actions">
          {continueDay ? (
            <Link className="btn btn-primary" to={`/day/${continueDay}`}>
              Continuer · Jour {continueDay}
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/day/1">
              Commencer le jour 1
            </Link>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (confirm('Réinitialiser toute la progression locale ?')) resetAll()
            }}
          >
            Réinitialiser
          </button>
        </div>
      </header>

      <section className="card-panel">
        <h2 style={{ fontSize: '1.15rem' }}>Progression globale</h2>
        <ProgressBar
          value={stats.answered}
          max={stats.totalAvailable}
          label={`${stats.answered}/${stats.totalAvailable} questions`}
        />
        <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          {stats.daysCompleted}/30 jours terminés · précision {stats.accuracy}%
        </p>
      </section>

      {weak.length > 0 ? (
        <section className="card-panel">
          <h2 style={{ fontSize: '1.15rem' }}>Points faibles</h2>
          <p>D’après vos réponses, renforcez :</p>
          <div className="weak-list">
            {weak.slice(0, 5).map((w) => (
              <span key={w.topic} className="weak-chip">
                {w.label} · {w.accuracy}%
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 style={{ fontSize: '1.25rem' }}>Parcours 30 jours</h2>
        <p>Environ 20 questions par jour. Les jours 29–30 sont des examens blancs mixtes.</p>
        <DayList progress={progress} questionCounts={counts} />
      </section>
    </div>
  )
}
