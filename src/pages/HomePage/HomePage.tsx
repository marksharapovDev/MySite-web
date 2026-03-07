import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import markPhoto from '../../assets/images/mark-silhouette.png'
import { Container } from '../../shared/ui/Container'

import styles from './HomePage.module.scss'

const NAME = 'Марк Шарапов'

type StatBlock = {
  value: number
  prefix: string
  suffix?: string
  label: string
  to: string
  accentClass: string
}

const stats: StatBlock[] = [
  { value: 4, prefix: '', suffix: '+', label: 'года в разработке', to: '/cv', accentClass: styles.accentHome },
  { value: 15, prefix: '~', label: 'проектов реализовано', to: '/dev', accentClass: styles.accentDev },
  { value: 50, prefix: '~', label: 'учеников подготовлено', to: '/tutor', accentClass: styles.accentTutor },
]

type Tag = {
  label: string
  accent?: 'dev' | 'tutor' | 'work'
}

const TAGS: Tag[] = [
  { label: 'bi.zone', accent: 'work' },
  { label: 'brunello cucinelli', accent: 'work' },
  { label: 'React', accent: 'dev' },
  { label: 'TypeScript', accent: 'dev' },
  { label: 'Next.js', accent: 'dev' },
  { label: 'Prisma', accent: 'dev' },
  { label: 'Python', accent: 'tutor' },
  { label: 'ОГЭ', accent: 'tutor' },
  { label: 'ЕГЭ', accent: 'tutor' },
  { label: 'Олимпиады', accent: 'tutor' },
]

function useCountUp(ref: React.RefObject<HTMLSpanElement | null>, target: number, prefix: string, suffix = '') {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.textContent = `${prefix}${target}${suffix}`
      return
    }

    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      el!.textContent = `${prefix}${current}${suffix}`

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [ref, target, prefix, suffix])
}

function StatCard({ stat, index }: { stat: StatBlock; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const navigate = useNavigate()
  useCountUp(numRef, stat.value, stat.prefix, stat.suffix)

  return (
    <button
      type="button"
      className={[styles.statCard, stat.accentClass].join(' ')}
      style={{ animationDelay: `${600 + index * 80}ms` }}
      onClick={() => navigate(stat.to)}
    >
      <span className={styles.statValue} ref={numRef}>
        {stat.prefix}0
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
      <span className={styles.statArrow} aria-hidden>
        →
      </span>
    </button>
  )
}

export function HomePage() {
  return (
    <section className={styles.page}>
      <Container className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.left}>
            <h1 className={styles.name}>
              {NAME.split('').map((char, i) => (
                <span
                  key={i}
                  className={styles.letter}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <p className={styles.subtitle} style={{ animationDelay: '150ms' }}>
              Разработчик · Репетитор · Москва
            </p>

            <p className={styles.desc} style={{ animationDelay: '300ms' }}>
              Создаю веб-продукты и готовлю к экзаменам.
              <br />
              Серьёзно отношусь к результату — своему и чужому.
            </p>

            <div className={styles.tags} style={{ animationDelay: '380ms' }}>
              {TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className={[
                    styles.tag,
                    tag.accent === 'dev' ? styles.tagDev : '',
                    tag.accent === 'tutor' ? styles.tagTutor : '',
                    tag.accent === 'work' ? styles.tagWork : '',
                  ].filter(Boolean).join(' ')}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.right} style={{ animationDelay: '450ms' }}>
            <div className={styles.photoWrap}>
              
              <img className={styles.photo} src={markPhoto} alt="" aria-hidden />
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.lower}>
          {stats.map((stat, i) => (
            <StatCard key={stat.to} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
