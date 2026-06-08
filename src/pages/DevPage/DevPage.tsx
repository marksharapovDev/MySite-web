import { DevCases } from './sections/DevCases'

import styles from './DevPage.module.scss'

export function DevPage() {
  return (
    <section className={styles.page}>
      <DevCases />
    </section>
  )
}
