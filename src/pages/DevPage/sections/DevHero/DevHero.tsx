import { CaretDown } from '@phosphor-icons/react'

import { Container } from '../../../../shared/ui/Container'

import styles from './DevHero.module.scss'

export function DevHero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <span className={[styles.anim, styles.anim1, styles.label].join(' ')}>
            Frontend Developer
          </span>

          <h1 className={[styles.anim, styles.anim2, styles.name].join(' ')}>
            Марк Шарапов
          </h1>

          <p className={[styles.anim, styles.anim3, styles.tagline].join(' ')}>
            Создаю сайты и интерфейсы, которые выглядят премиально
          </p>

          <div className={[styles.anim, styles.anim4, styles.actions].join(' ')}>
            <a className={styles.primaryLink} href="#cases">
              Смотреть проекты
            </a>
            <a className={styles.secondaryLink} href="#contacts">
              Связаться
            </a>
          </div>
        </div>
      </Container>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <CaretDown size={20} weight="bold" />
      </div>
    </section>
  )
}
