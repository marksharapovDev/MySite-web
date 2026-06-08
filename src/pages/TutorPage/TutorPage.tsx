import { useCallback, useEffect, useState } from 'react'

import { useContactForm } from '../../features/contact-form'
import { scrollToSection } from '../../shared/lib/scrollToSection'
import { Button } from '../../shared/ui/Button'
import { Container } from '../../shared/ui/Container'
import { Directions } from './sections/Directions'
import { FAQ } from './sections/FAQ'
import { Pricing } from './sections/Pricing'
import { Reviews } from './sections/Reviews/Reviews'
import { TutorHero } from './sections/TutorHero/TutorHero'

import type { DirectionId, Intensity } from './sections/Directions/directions.data'
import type { PricingConfig } from './sections/Pricing'

import { formatPricingSummary } from './sections/Pricing/pricing.data'

import styles from './TutorPage.module.scss'

export function TutorPage() {
  const lang = 'ru' as const
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<{ direction: DirectionId; intensity: Intensity } | null>(null)

  const {
    name,
    contact,
    description,
    isLoading,
    isSuccess,
    error,
    setFormat,
    setName,
    setContact,
    setDescription,
    handleSubmit,
  } = useContactForm('tutor')

  const handlePricingApply = useCallback((config: PricingConfig) => {
    setPricingConfig(config)
  }, [])

  const handleDirectionSelect = useCallback((direction: DirectionId, intensity: Intensity) => {
    setSelectedDirection({ direction, intensity })
  }, [])

  useEffect(() => {
    setFormat(pricingConfig ? formatPricingSummary(pricingConfig, lang) : '')
  }, [pricingConfig, lang, setFormat])

  return (
    <section className={styles.page}>
      <TutorHero />

      <Directions lang={lang} onDirectionSelect={handleDirectionSelect} />

      <Pricing
        key={`${selectedDirection?.direction ?? 'default'}-${selectedDirection?.intensity ?? 'default'}`}
        lang={lang}
        onApply={handlePricingApply}
        initialGoal={selectedDirection?.direction}
        initialIntensity={selectedDirection?.intensity}
      />

      <Container>
        <Reviews lang={lang} />
      </Container>

      <FAQ lang={lang} />

      <Container>
        <section id="apply" className={styles.applySection}>
          <div className={styles.applyHeader}>
            <h2 className={styles.applyTitle}>Оставить заявку</h2>
            <p className={styles.applySubtitle}>
              Оставьте заявку — я отвечу с кратким планом и ближайшими доступными временными интервалами.
            </p>
          </div>

          <div className={styles.applyContent}>
            {isSuccess ? (
              <div className={styles.form} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <p style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>
                  Заявка отправлена! Я свяжусь с вами в ближайшее время. 🎉
                </p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                {pricingConfig && (
                  <div className={styles.prefillBanner}>
                    <span>
                      {lang === 'ru' ? 'Параметры: ' : 'Pricing: '}
                      <strong>{formatPricingSummary(pricingConfig, lang)}</strong>
                    </span>
                    <button
                      type="button"
                      className={styles.prefillChange}
                      onClick={() => {
                        setPricingConfig(null)
                        scrollToSection('pricing')
                      }}
                    >
                      {lang === 'ru' ? 'Изменить' : 'Change'}
                    </button>
                  </div>
                )}

                {!pricingConfig && (
                  <a
                    href="#pricing"
                    className={styles.directionsHint}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('pricing')
                    }}
                  >
                    <span className={styles.directionsHintText}>
                      {lang === 'ru' ? 'Выберите формат обучения в разделе Стоимость' : 'Select a format in the Pricing section'}
                    </span>
                    <span className={styles.directionsHintArrow}>→</span>
                  </a>
                )}

                <div className={styles.formGrid}>
                  <input
                    className={styles.input}
                    name="name"
                    type="text"
                    placeholder="Имя"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    className={styles.input}
                    name="contact"
                    type="text"
                    placeholder="Контакт (Telegram / телефон)"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                <textarea
                  className={styles.textarea}
                  name="details"
                  rows={5}
                  placeholder="Информация об ученике / дополнительная информация — текущий уровень, что вызывает трудности, сроки сдачи, предпочтительный формат, что-либо важное…"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className={styles.formActions}>
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Отправка...' : 'Отправить'}
                  </Button>
                </div>

                {error && (
                  <p style={{ color: '#e74c3c', marginTop: '0.5rem', textAlign: 'center' }}>
                    {error}
                  </p>
                )}
              </form>
            )}

            <div className={styles.infoGraphic}>
              <h3 className={styles.infoGraphicTitle}>Как это работает</h3>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>01</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Бесплатная консультация</h4>
                    <p className={styles.stepDescription}>
                      Познакомимся, обсудим цели и текущий уровень
                    </p>
                  </div>
                </div>

                <div className={styles.stepConnector} />

                <div className={styles.step}>
                  <div className={styles.stepNumber}>02</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Учебный план</h4>
                    <p className={styles.stepDescription}>
                      Я разработаю индивидуальный план действий, 
                    </p>
                  </div>
                </div>

                <div className={styles.stepConnector} />

                <div className={styles.step}>
                  <div className={styles.stepNumber}>03</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Начало обучения</h4>
                    <p className={styles.stepDescription}>
                      Согласуем расписание и начнем наш путь вместе
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  )
}
