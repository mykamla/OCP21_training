import { useCallback, useSyncExternalStore } from 'react'
import type { AnswerRecord, AppProgress, DayProgress, Question } from '../types/quiz'
import {
  getDayProgress,
  loadProgress,
  resetAllProgress,
  resetDayProgress,
  saveProgress,
  upsertDayProgress,
} from '../lib/storage'

let cached: AppProgress = loadProgress()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function setProgress(next: AppProgress) {
  cached = next
  saveProgress(next)
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return cached
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const startOrResumeDay = useCallback((day: number): DayProgress => {
    const existing = getDayProgress(cached, day)
    if (existing) return existing
    const fresh: DayProgress = {
      day,
      currentIndex: 0,
      answers: [],
      completed: false,
      startedAt: Date.now(),
    }
    setProgress(upsertDayProgress(cached, fresh))
    return fresh
  }, [])

  const recordAnswer = useCallback((question: Question, choiceId: string, _questionCount: number) => {
    const day = question.day
    const current = getDayProgress(cached, day) ?? {
      day,
      currentIndex: 0,
      answers: [],
      completed: false,
      startedAt: Date.now(),
    }

    const already = current.answers.find((a) => a.questionId === question.id)
    if (already) return current

    const record: AnswerRecord = {
      questionId: question.id,
      choiceId,
      correct: choiceId === question.correctChoiceId,
      topic: question.topic,
      answeredAt: Date.now(),
    }

    const answers = [...current.answers, record]
    const next: DayProgress = {
      ...current,
      answers,
      currentIndex: current.currentIndex,
    }
    setProgress(upsertDayProgress(cached, next))
    return next
  }, [])

  const advanceQuestion = useCallback((day: number, questionCount: number) => {
    const current = getDayProgress(cached, day)
    if (!current) return
    const nextIndex = current.currentIndex + 1
    const completed = nextIndex >= questionCount
    const next: DayProgress = {
      ...current,
      currentIndex: completed ? questionCount - 1 : nextIndex,
      completed,
      completedAt: completed ? Date.now() : current.completedAt,
    }
    setProgress(upsertDayProgress(cached, next))
    return next
  }, [])

  const goToQuestion = useCallback((day: number, index: number) => {
    const current = getDayProgress(cached, day)
    if (!current) return
    const next: DayProgress = { ...current, currentIndex: index }
    setProgress(upsertDayProgress(cached, next))
  }, [])

  const resetDay = useCallback((day: number) => {
    setProgress(resetDayProgress(cached, day))
  }, [])

  const resetAll = useCallback(() => {
    setProgress(resetAllProgress())
  }, [])

  return {
    progress,
    startOrResumeDay,
    recordAnswer,
    advanceQuestion,
    goToQuestion,
    resetDay,
    resetAll,
    getDay: (day: number) => getDayProgress(progress, day),
  }
}
