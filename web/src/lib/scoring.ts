import type { AnswerRecord, AppProgress, DayProgress, TopicId } from '../types/quiz'
import { TOPIC_LABELS } from '../data/curriculum'

export function dayScore(day: DayProgress | undefined): { correct: number; total: number; pct: number } {
  if (!day || day.answers.length === 0) return { correct: 0, total: 0, pct: 0 }
  const correct = day.answers.filter((a) => a.correct).length
  const total = day.answers.length
  return { correct, total, pct: Math.round((correct / total) * 100) }
}

export function overallStats(progress: AppProgress, questionsPerDay: Map<number, number>) {
  let answered = 0
  let correct = 0
  let daysStarted = 0
  let daysCompleted = 0
  let totalAvailable = 0

  for (const [day, count] of questionsPerDay) {
    totalAvailable += count
    const dp = progress.days[String(day)]
    if (!dp) continue
    if (dp.answers.length > 0 || dp.currentIndex > 0) daysStarted += 1
    if (dp.completed) daysCompleted += 1
    answered += dp.answers.length
    correct += dp.answers.filter((a) => a.correct).length
  }

  return {
    answered,
    correct,
    daysStarted,
    daysCompleted,
    totalAvailable,
    pctOverall: totalAvailable === 0 ? 0 : Math.round((answered / totalAvailable) * 100),
    accuracy: answered === 0 ? 0 : Math.round((correct / answered) * 100),
  }
}

export interface WeakTopic {
  topic: TopicId
  label: string
  wrong: number
  total: number
  accuracy: number
}

/** Topics with ≥3 answers and accuracy < 60%. */
export function weakTopics(progress: AppProgress, minAnswers = 3, maxAccuracy = 60): WeakTopic[] {
  const map = new Map<TopicId, { wrong: number; total: number }>()

  for (const day of Object.values(progress.days)) {
    for (const a of day.answers as AnswerRecord[]) {
      const cur = map.get(a.topic) ?? { wrong: 0, total: 0 }
      cur.total += 1
      if (!a.correct) cur.wrong += 1
      map.set(a.topic, cur)
    }
  }

  const result: WeakTopic[] = []
  for (const [topic, stats] of map) {
    if (stats.total < minAnswers) continue
    const accuracy = Math.round(((stats.total - stats.wrong) / stats.total) * 100)
    if (accuracy < maxAccuracy) {
      result.push({
        topic,
        label: TOPIC_LABELS[topic],
        wrong: stats.wrong,
        total: stats.total,
        accuracy,
      })
    }
  }

  return result.sort((a, b) => a.accuracy - b.accuracy)
}
