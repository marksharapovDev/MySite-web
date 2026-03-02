import { ArrowUpRight, Code, GithubLogo, PaperPlaneTilt, Phone } from '@phosphor-icons/react'

import markPhoto from '../../assets/images/mark-silhouette.png'

import styles from './CvPage.module.scss'
import { GitHubStats } from './GitHubStats'


const contacts = [
  { Icon: PaperPlaneTilt, text: '@marksharapov', href: 'https://t.me/marksharapov' },
  { Icon: Phone, text: '+7 916 817 76 33', href: 'tel:+79168177633' },
  { Icon: GithubLogo, text: 'github.com/marksharapovDev', short: 'github', href: 'https://github.com/marksharapovDev' },
  { Icon: Code, text: 'codewars.com', short: 'codewars', href: 'https://www.codewars.com/users/marksharapovDev', mobileHide: true },
]

const experience = [
  {
    date: '2022 — 2024',
    company: 'BI.ZONE',
    role: 'Front-end Developer',
    desc: 'Разработка контролируемых веб-сред для анализа фишинга',
    href: 'https://bi.zone/',
  },
  {
    date: '2024 — 2025',
    company: 'Brunello Cucinelli (RU)',
    role: 'Web Developer',
    desc: 'Настройка и сопровождение цифровой инфраструктуры розничной сети',
    href: 'https://shop.brunellocucinelli.com/ru-ru/',
  },
  {
    date: '2023 — сейчас',
    company: 'Фриланс',
    role: 'Full-Stack Developer',
    desc: 'Разработка сайтов и веб-приложений для малого и среднего бизнеса',
    href: '/dev',
  },
]

const education = [
  {
    date: '2024',
    company: 'Академическая гимназия',
    role: 'Профильное среднее',
    desc: 'Business IT',
  },
  {
    date: '2026',
    company: 'МГТУ им. Баумана',
    role: 'Цифровая кафедра',
    desc: 'Front-end разработка',
  },
  {
    date: '2028 (ожид.)',
    company: 'МГТУ им. Баумана',
    role: 'Бакалавриат',
    desc: 'Инженерный менеджмент',
  },
]

const hardSkills = ['React', 'TypeScript', 'Node.js', 'Django', 'Python', 'PostgreSQL', 'Git', 'Figma', 'Docker']

const softSkills = [
  'Системное мышление',
  'Ответственность',
  'Коммуникабельность',
  'Работа в команде',
  'Дисциплина',
]


export function CvPage() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* LEFT */}
        <div className={[styles.col, styles.colLeft].join(' ')}>
          <div className={styles.avatarWrap}>
            <img className={styles.avatar} src={markPhoto} alt="" aria-hidden />
          </div>
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>Марк Шарапов</h1>
            <p className={styles.role}>Full-Stack Developer</p>
          </div>

          <div className={styles.aboutBlock}>
            <p className={styles.aboutText}>
              Full-stack разработчик с 4+ годами опыта.
              <br />
              Строю веб-продукты для реального бизнеса.
            </p>
            <p className={styles.aboutMeta}>Москва · 19 лет · Английский C1</p>
          </div>

          <div className={styles.contactsBlock}>
            {contacts.map(({ Icon, text, short, href, mobileHide }) => (
              <a
                key={href}
                href={href}
                className={[styles.contactLink, mobileHide ? styles.contactLinkHideMobile : ''].filter(Boolean).join(' ')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={13} />
                {short ? (
                  <>
                    <span className={styles.contactTextFull}>{text}</span>
                    <span className={styles.contactTextShort}>{short}</span>
                  </>
                ) : (
                  <span>{text}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className={[styles.col, styles.colCenter].join(' ')}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Опыт</div>
            <div className={styles.entryList}>
              {experience.map((item, i) => (
                <div key={item.company}>
                  <div className={styles.entry}>
                    <span className={styles.entryDate}>{item.date}</span>
                    <div className={styles.entryContent}>
                      <div className={styles.entryHeader}>
                        <a
                          href={item.href}
                          className={styles.entryCompanyLink}
                          target={item.href.startsWith('/') ? undefined : '_blank'}
                          rel={item.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                        >
                          {item.company}
                          <ArrowUpRight size={11} weight="bold" className={styles.entryArrow} aria-hidden="true" />
                        </a>
                        <span className={styles.entryRole}>{item.role}</span>
                      </div>
                      <p className={styles.entryDesc}>{item.desc}</p>
                    </div>
                  </div>
                  {i < experience.length - 1 && <div className={styles.entryDivider} />}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Образование</div>
            <div className={styles.entryList}>
              {education.map((item, i) => (
                <div key={`${item.company}-${item.role}`}>
                  <div className={styles.entry}>
                    <span className={styles.entryDate}>{item.date}</span>
                    <div className={styles.entryContent}>
                      <div className={styles.entryHeader}>
                        <span className={styles.entryCompany}>{item.company}</span>
                        <span className={styles.entryRole}>{item.role}</span>
                      </div>
                      <p className={styles.entryDesc}>{item.desc}</p>
                    </div>
                  </div>
                  {i < education.length - 1 && <div className={styles.entryDivider} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={[styles.col, styles.colRight].join(' ')}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Hard Skills</div>
            <div className={styles.hardSkills}>
              {hardSkills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Soft Skills</div>
            <ul className={styles.softSkills}>
              {softSkills.map((skill) => (
                <li key={skill} className={styles.softSkillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>GitHub</div>
            <GitHubStats />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <a href="/marksharapov-cv.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
          ↓ Скачать PDF
        </a>
      </div>
    </div>
  )
}
