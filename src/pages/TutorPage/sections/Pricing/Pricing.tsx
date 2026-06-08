import { useState, useMemo, useCallback } from 'react'
import { CaretDown, CheckCircle } from '@phosphor-icons/react'

import { Button } from '../../../../shared/ui/Button'
import { Container } from '../../../../shared/ui/Container'
import { scrollToSection } from '../../../../shared/lib/scrollToSection'

import {
  calculatePrice,
  formatPrice,
  lessonsPerMonth,
  includesByIntensity,
  formatOptions,
  intensityOptions,
  frequencyOptions,
  goalOptions,
  durationOptions,
  urgencyOptions,
  formatLabels,
  intensityLabels,
  frequencyLabels,
  goalLabels,
  durationLabels,
  urgencyLabels,
  sectionText,
} from './pricing.data'
import type {
  Format,
  Intensity,
  Frequency,
  Goal,
  Duration,
  Urgency,
  PricingConfig,
} from './pricing.data'

import styles from './Pricing.module.scss'

type Lang = 'ru' | 'en'

type Props = {
  lang?: Lang
  onApply?: (config: PricingConfig) => void
  initialGoal?: Goal
  initialIntensity?: Intensity
}

type PillGroupProps<T extends string | number> = {
  label: string
  options: readonly T[]
  value: T
  labels: Record<T, { ru: string; en: string }>
  lang: Lang
  onChange: (v: T) => void
}

function PillGroup<T extends string | number>({
  label,
  options,
  value,
  labels,
  lang,
  onChange,
}: PillGroupProps<T>) {
  return (
    <div className={styles.controlGroup}>
      <p className={styles.controlLabel}>{label}</p>
      <div className={styles.pills}>
        {options.map((opt) => (
          <button
            key={String(opt)}
            type="button"
            className={[
              styles.pill,
              value === opt ? styles.pillActive : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onChange(opt)}
          >
            {labels[opt][lang]}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Pricing({ lang = 'ru', onApply, initialGoal, initialIntensity }: Props) {
  const [format, setFormat] = useState<Format>('individual')
  const [intensity, setIntensity] = useState<Intensity>(
    initialIntensity && intensityOptions.includes(initialIntensity) ? initialIntensity : 'standard',
  )
  const [frequency, setFrequency] = useState<Frequency>('2x')
  const [goal, setGoal] = useState<Goal>(
    initialGoal && goalOptions.includes(initialGoal) ? initialGoal : 'oge',
  )
  const [duration, setDuration] = useState<Duration>(60)
  const [urgency, setUrgency] = useState<Urgency>('later')
  const [howOpen, setHowOpen] = useState(false)

  const config = useMemo(
    () => ({ format, intensity, frequency, goal, duration, urgency }),
    [format, intensity, frequency, goal, duration, urgency],
  )

  const [priceMin, priceMax] = useMemo(() => calculatePrice(config), [config])

  const monthly = useMemo(() => {
    const count = lessonsPerMonth[frequency]
    return [priceMin * count, priceMax * count] as const
  }, [priceMin, priceMax, frequency])

  const showPerPerson = format === 'pair' || format === 'mini-group'

  const includes = includesByIntensity[intensity][lang]

  const handleApply = useCallback(() => {
    const pricingConfig: PricingConfig = {
      ...config,
      estimatedMin: priceMin,
      estimatedMax: priceMax,
    }
    onApply?.(pricingConfig)
    scrollToSection('apply')
  }, [config, priceMin, priceMax, onApply])

  return (
    <section id="pricing" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionText.title[lang]}</h2>
          <p className={styles.subtitle}>{sectionText.subtitle[lang]}</p>
        </div>

        <div className={styles.layout}>
          {/* Configurator */}
          <div className={styles.configurator}>
            <PillGroup
              label={sectionText.formatLabel[lang]}
              options={formatOptions}
              value={format}
              labels={formatLabels}
              lang={lang}
              onChange={setFormat}
            />

            <PillGroup
              label={sectionText.intensityLabel[lang]}
              options={intensityOptions}
              value={intensity}
              labels={intensityLabels}
              lang={lang}
              onChange={setIntensity}
            />

            <PillGroup
              label={sectionText.frequencyLabel[lang]}
              options={frequencyOptions}
              value={frequency}
              labels={frequencyLabels}
              lang={lang}
              onChange={setFrequency}
            />

            <PillGroup
              label={sectionText.goalLabel[lang]}
              options={goalOptions}
              value={goal}
              labels={goalLabels}
              lang={lang}
              onChange={setGoal}
            />

            <PillGroup
              label={sectionText.durationLabel[lang]}
              options={durationOptions}
              value={duration}
              labels={durationLabels}
              lang={lang}
              onChange={setDuration}
            />

            <PillGroup
              label={sectionText.urgencyLabel[lang]}
              options={urgencyOptions}
              value={urgency}
              labels={urgencyLabels}
              lang={lang}
              onChange={setUrgency}
            />

            {/* How pricing is calculated */}
            <div className={styles.howBlock}>
              <button
                type="button"
                className={styles.howToggle}
                aria-expanded={howOpen}
                onClick={() => setHowOpen((prev) => !prev)}
              >
                <span>{sectionText.howCalculated[lang]}</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={[styles.howChevron, howOpen ? styles.howChevronOpen : ''].filter(Boolean).join(' ')}
                />
              </button>
              <div className={[styles.howExpandable, howOpen ? styles.howExpandableOpen : ''].filter(Boolean).join(' ')}>
                <div className={styles.howExpandableInner}>
                  <p className={styles.howBody}>{sectionText.howCalculatedBody[lang]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className={styles.result}>
            <div className={styles.priceBlock}>
              <div className={styles.priceRange}>
                <span className={styles.priceValue}>
                  {formatPrice(priceMin)}–{formatPrice(priceMax)}
                </span>
                <span className={styles.priceUnit}>
                  {sectionText.perLesson[lang]}
                </span>
              </div>

              {showPerPerson && (
                <p className={styles.perPersonNote}>
                  {sectionText.perPerson[lang]}
                </p>
              )}

              <p className={styles.monthlyEstimate}>
                ≈ {formatPrice(monthly[0])}–{formatPrice(monthly[1])} {sectionText.monthlyLabel[lang]}
              </p>

              <p className={styles.rangeHint}>
                {sectionText.rangeExplanation[lang]}
              </p>
            </div>

            <div className={styles.includesBlock}>
              <p className={styles.includesTitle}>{sectionText.includesTitle[lang]}</p>
              <ul className={styles.includesList}>
                {includes.map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <CheckCircle size={16} weight="fill" className={styles.includesIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.ctaBlock}>
              <Button variant="primary" onClick={handleApply}>
                {sectionText.cta[lang]}
              </Button>
              <p className={styles.ctaHint}>{sectionText.ctaHint[lang]}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
