import type { Question, TopicId } from '../../types/quiz'

type Draft = {
  n: number
  day: number
  topic: TopicId
  stem: string
  code?: string
  choices: [string, string, string, string] | [string, string, string] | [string, string, string, string, string]
  correct: 0 | 1 | 2 | 3 | 4
  correctWhy: string
  wrongWhy?: string
  javaRule: string
  trap?: string
}

/** Helper pour construire une Question avec ids stables a/b/c/d/e. */
export function q(d: Draft): Question {
  const letters = ['a', 'b', 'c', 'd', 'e'] as const
  const pad = String(d.n).padStart(2, '0')
  const dayPad = String(d.day).padStart(2, '0')
  return {
    id: `d${dayPad}-q${pad}`,
    day: d.day,
    topic: d.topic,
    stem: d.stem,
    code: d.code,
    choices: d.choices.map((text, i) => ({ id: letters[i], text })),
    correctChoiceId: letters[d.correct],
    explanation: {
      correct: d.correctWhy,
      incorrect: d.wrongWhy,
      javaRule: d.javaRule,
      trap: d.trap,
    },
  }
}
