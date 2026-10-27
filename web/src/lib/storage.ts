import type { AppProgress, DayProgress } from '../types/quiz'

const STORAGE_KEY = 'ocp21-prep-progress-v1'

const emptyProgress = (): AppProgress => ({
  version: 1,
  days: {},
  lastActiveDay: null,
  updatedAt: Date.now(),
})

export function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw) as AppProgress
    if (parsed?.version !== 1 || typeof parsed.days !== 'object') {
      return emptyProgress()
    }
    return parsed
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(progress: AppProgress): void {
  const next: AppProgress = { ...progress, updatedAt: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function getDayProgress(progress: AppProgress, day: number): DayProgress | undefined {
  return progress.days[String(day)]
}

export function upsertDayProgress(progress: AppProgress, dayProgress: DayProgress): AppProgress {
  return {
    ...progress,
    lastActiveDay: dayProgress.day,
    days: {
      ...progress.days,
      [String(dayProgress.day)]: dayProgress,
    },
    updatedAt: Date.now(),
  }
}

export function resetAllProgress(): AppProgress {
  const fresh = emptyProgress()
  saveProgress(fresh)
  return fresh
}

export function resetDayProgress(progress: AppProgress, day: number): AppProgress {
  const days = { ...progress.days }
  delete days[String(day)]
  const next: AppProgress = {
    ...progress,
    days,
    lastActiveDay: progress.lastActiveDay === day ? null : progress.lastActiveDay,
    updatedAt: Date.now(),
  }
  saveProgress(next)
  return next
}
