export type TopicId =
  | 'primitives'
  | 'wrappers'
  | 'math'
  | 'string'
  | 'stringbuilder'
  | 'text-blocks'
  | 'datetime'
  | 'control-flow'
  | 'oop'
  | 'records'
  | 'sealed'
  | 'inheritance'
  | 'interfaces'
  | 'enums'
  | 'immutability'
  | 'pattern-matching'
  | 'exceptions'
  | 'arrays'
  | 'collections'
  | 'streams'
  | 'lambdas'
  | 'modules'
  | 'concurrency'
  | 'virtual-threads'
  | 'io'
  | 'nio'
  | 'serialization'
  | 'localization'
  | 'mixed'

export interface Choice {
  id: string
  text: string
}

export interface Question {
  id: string
  day: number
  topic: TopicId
  /** Énoncé en français ; le code Java reste en anglais. */
  stem: string
  /** Bloc de code optionnel (Java, identifiants EN). */
  code?: string
  choices: Choice[]
  correctChoiceId: string
  explanation: {
    correct: string
    incorrect?: string
    javaRule: string
    trap?: string
  }
}

export interface DayMeta {
  day: number
  title: string
  summary: string
  topics: TopicId[]
  isMock?: boolean
}

export interface AnswerRecord {
  questionId: string
  choiceId: string
  correct: boolean
  topic: TopicId
  answeredAt: number
}

export interface DayProgress {
  day: number
  currentIndex: number
  answers: AnswerRecord[]
  completed: boolean
  startedAt: number
  completedAt?: number
}

export interface AppProgress {
  version: 1
  days: Record<string, DayProgress>
  lastActiveDay: number | null
  updatedAt: number
}
