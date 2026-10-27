import { Link } from 'react-router-dom'
import { CURRICULUM } from '../data/curriculum'
import type { AppProgress } from '../types/quiz'
import { dayScore } from '../lib/scoring'

interface DayListProps {
  progress: AppProgress
  questionCounts: Map<number, number>
}

export function DayList({ progress, questionCounts }: DayListProps) {
  return (
    <div className="day-list">
      {CURRICULUM.map((day) => {
        const dp = progress.days[String(day.day)]
        const count = questionCounts.get(day.day) ?? 0
        const score = dayScore(dp)
        const done = dp?.completed
        const started = (dp?.answers.length ?? 0) > 0 || (dp?.currentIndex ?? 0) > 0
        return (
          <Link
            key={day.day}
            to={`/day/${day.day}`}
            className={`day-row${done ? ' done' : ''}${day.isMock ? ' mock' : ''}`}
          >
            <span className="day-num">{day.day}</span>
            <span>
              <strong style={{ color: 'var(--ink)' }}>{day.title}</strong>
              <br />
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                {count} Q · {day.summary}
              </span>
            </span>
            <span className="pill">
              {done ? `${score.pct}%` : started ? `${score.correct}/${score.total}` : 'À faire'}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
