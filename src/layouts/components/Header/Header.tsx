import {
  BookOpen,
  Briefcase,
  ChatCircle,
  Code,
  CurrencyDollar,
  Envelope,
  FileText,
  FolderSimple,
  GraduationCap,
  House,
  Plus,
  Question,
  Star,
} from '@phosphor-icons/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/ui/Button'
import { Container } from '../../../shared/ui/Container'

import styles from './Header.module.scss'

type Mode = 'home' | 'tutor' | 'dev' | 'cv' | null

type MenuItem = {
  label: string
  href: string
}

const tutorMenu: MenuItem[] = [
  { label: 'Направления', href: '#directions' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Оставить заявку', href: '#apply' },
]

const devMenu: MenuItem[] = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Связаться со мной', href: '#contacts' },
]

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isHome = pathname === '/'

  const mode: Mode = pathname.startsWith('/tutor')
    ? 'tutor'
    : pathname.startsWith('/dev')
      ? 'dev'
      : pathname.startsWith('/cv')
        ? 'cv'
        : pathname === '/'
          ? 'home'
          : null

  const menu = mode === 'tutor' ? tutorMenu : mode === 'dev' ? devMenu : []

  const modeTabs = [
    { to: '/', mode: 'home' as const, icon: <House size={22} weight="bold" />, label: 'Home' },
    { to: '/tutor', mode: 'tutor' as const, icon: <GraduationCap size={22} weight="bold" />, label: 'Tutor' },
    { to: '/dev', mode: 'dev' as const, icon: <Code size={22} weight="bold" />, label: 'Dev' },
    { to: '/cv', mode: 'cv' as const, icon: <FileText size={22} weight="bold" />, label: 'CV' },
  ]

  const hrefToId = useCallback((href: string) => {
    if (!href.startsWith('#')) return ''
    return href.slice(1)
  }, [])

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  const [activeMenuState, setActiveMenuState] = useState<{ mode: Mode; label: string }>({
    mode: null,
    label: '',
  })

  const activeMenu = activeMenuState.mode === mode ? activeMenuState.label : ''

  // Cycle order for mobile mode button: home → tutor → dev → cv → home
  const modeOrder: Mode[] = ['home', 'tutor', 'dev', 'cv']
  const currentIdx = modeOrder.indexOf(mode)
  const nextIdx = (currentIdx + 1) % modeOrder.length
  const nextTab = modeTabs[nextIdx]

  const idToLabel = useMemo(() => {
    return new Map(
      menu
        .filter((i) => i.href.startsWith('#'))
        .map((i) => [i.href.slice(1), i.label] as const),
    )
  }, [menu])

  // Auto-highlight the current section while scrolling
  useEffect(() => {
    if (isHome || !mode) return
    if (idToLabel.size === 0) return

    const sectionIds = Array.from(idToLabel.keys())
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        const top = visible[0]
        if (!top) return

        const id = (top.target as HTMLElement).id
        const label = idToLabel.get(id)
        if (!label) return

        setActiveMenuState({ mode, label })
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.4, 0.6],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [idToLabel, isHome, mode])

  const renderIcon = (label: string) => {
    const size = 22
    const weight = 'bold' as const

    switch (label) {
      case 'MODE_TUTOR':
        return <GraduationCap size={size} weight={weight} />
      case 'MODE_DEV':
        return <Code size={size} weight={weight} />
      case 'Directions':
      case 'Направления':
        return <BookOpen size={size} weight={weight} />
      case 'About':
      case 'Обо мне':
        return <House size={size} weight={weight} />
      case 'Pricing':
      case 'Стоимость':
        return <CurrencyDollar size={size} weight={weight} />
      case 'Services':
      case 'Услуги':
        return <Briefcase size={size} weight={weight} />
      case 'Reviews':
      case 'Отзывы':
        return <Star size={size} weight={weight} />
      case 'Cases':
      case 'Кейсы':
        return <FolderSimple size={size} weight={weight} />
      case 'FAQ':
        return <Question size={size} weight={weight} />
      case 'Apply':
      case 'Оставить заявку':
        return <ChatCircle size={size} weight={weight} />
      case 'Contacts':
      case 'Контакты':
      case 'Связаться со мной':
        return <Envelope size={size} weight={weight} />
      default:
        return <Plus size={size} weight={weight} />
    }
  }


  if (isHome) {
    return (
      <div className={styles.mobileBar}>
        <div className={styles.mobileModeWrap}>
          <button
            type="button"
            className={styles.mobileModeButton}
            aria-label={`Switch to ${nextTab.label}`}
            onClick={() => navigate(nextTab.to)}
          >
            <span className={styles.mobileModeIcon}>{nextTab.icon}</span>
          </button>
        </div>
      </div>
    )
  }

  const hasMenu = menu.length > 0

  return (
    <>
      <header className={[styles.header, styles.isExpanded].join(' ')}>
        <Container>
          <div className={styles.row}>
            <div className={styles.pillsRow}>
              <div className={styles.modePill}>
                <div className={styles.segmentWrap}>
                  {modeTabs.map((tab) => (
                    <NavLink
                      key={tab.mode}
                      to={tab.to}
                      className={({ isActive }) =>
                        [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
                      }
                      title={tab.label}
                    >
                      <Button variant="ghost" type="button">
                        {tab.icon}
                      </Button>
                    </NavLink>
                  ))}
                </div>
              </div>

              {hasMenu && (
                <div className={styles.sectionsPill}>
                  <nav className={styles.menu} aria-label={`${mode} sections`}>
                    {menu.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={[styles.menuLink, activeMenu === item.label ? styles.menuLinkActive : '']
                          .filter(Boolean)
                          .join(' ')}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveMenuState({ mode, label: item.label })

                          const id = hrefToId(item.href)
                          if (id) scrollToId(id)
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      <div className={styles.mobileBar}>
        {mode === 'cv' && (
          <a href="/marksharapov-cv.pdf" target="_blank" rel="noopener noreferrer" className={styles.cvDownloadPill}>
            ↓ Скачать PDF
          </a>
        )}

        {mode === 'tutor' || mode === 'dev' ? (
          <nav className={styles.mobileNav} aria-label={`${mode} mobile navigation`}>
            {menu.map((item) => {
              const isActive = activeMenu === item.label
              const id = hrefToId(item.href)

              return (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  className={[styles.mobileItem, isActive ? styles.mobileItemActive : ''].filter(Boolean).join(' ')}
                  onClick={() => {
                    setActiveMenuState({ mode, label: item.label })
                    if (id) scrollToId(id)
                  }}
                >
                  <span className={styles.mobileIcon}>{renderIcon(item.label)}</span>
                </button>
              )
            })}
          </nav>
        ) : null}

        <div className={styles.mobileModeWrap}>
          <button
            type="button"
            className={styles.mobileModeButton}
            aria-label={`Switch to ${nextTab.label}`}
            onClick={() => navigate(nextTab.to)}
          >
            <span className={styles.mobileModeIcon}>{nextTab.icon}</span>
          </button>
        </div>
      </div>
    </>
  )
}