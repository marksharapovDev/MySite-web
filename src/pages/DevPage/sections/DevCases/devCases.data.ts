export type DevProject = {
  id: string
  title: string
  eyebrow: string
  summary: string
  role: string
  year: string
  accent: string
  accentSoft: string
  videoDesktop: string
  videoMobile: string
  posterDesktop: string
  posterMobile: string
  siteHref?: string
  bullets: string[]
  stack: string[]
  links?: {
    label: string
    href: string
  }[]
}

export const devProjects: DevProject[] = [
  {
    id: 'repka',
    title: 'Repka',
    eyebrow: 'Education platform',
    summary:
      'Платформа для репетиторов и учеников: расписание, материалы, доска и прогресс в одном рабочем пространстве.',
    role: 'Product engineering, frontend, UX flows',
    year: '2026',
    accent: '#3b82f6',
    accentSoft: 'rgba(59, 130, 246, 0.18)',
    videoDesktop: '/dev-showcase/videos/repka-desktop.mp4',
    videoMobile: '/dev-showcase/videos/repka-mobile.mp4',
    posterDesktop: '/dev-showcase/posters/repka-desktop.png',
    posterMobile: '/dev-showcase/posters/repka-mobile.png',
    siteHref: 'https://tryrepka.ru',
    bullets: [
      'Личный кабинет для двух ролей: репетитор и ученик',
      'Интерактивные сценарии урока с материалами и доской',
      'Продуктовая логика вокруг реального процесса обучения',
    ],
    stack: ['React', 'TypeScript', 'AI tools'],
  },
  {
    id: 'siriona',
    title: 'Сириона',
    eyebrow: 'VR learning platform',
    summary:
      'VR-платформа для школ с дистанционным обучением, учебными сценариями и прогрессом учеников.',
    role: 'Frontend architecture, product interface',
    year: '2025',
    accent: '#ef4444',
    accentSoft: 'rgba(239, 68, 68, 0.18)',
    videoDesktop: '/dev-showcase/videos/siriona-desktop.mp4',
    videoMobile: '/dev-showcase/videos/siriona-mobile.mp4',
    posterDesktop: '/dev-showcase/posters/siriona-desktop.png',
    posterMobile: '/dev-showcase/posters/siriona-mobile.png',
    siteHref: 'https://vrtracking.ru',
    bullets: [
      'Интерфейс для сложного образовательного продукта',
      'Акцент на понятную навигацию для школ и преподавателей',
      'Подготовка UI под реальные учебные сценарии',
    ],
    stack: ['React', 'TypeScript', 'Django', 'PostgreSQL'],
  },
  {
    id: 'jagervps',
    title: 'JagerVPS',
    eyebrow: 'Infrastructure service',
    summary:
      'Сервис для управления VPN/VPS-инфраструктурой: подписки, доступы, статусы и простой пользовательский кабинет.',
    role: 'Full-stack development, service UI',
    year: '2025',
    accent: '#22c55e',
    accentSoft: 'rgba(34, 197, 94, 0.18)',
    videoDesktop: '/dev-showcase/videos/jager-desktop.mp4',
    videoMobile: '/dev-showcase/videos/jager-mobile.mp4',
    posterDesktop: '/dev-showcase/posters/jager-desktop.png',
    posterMobile: '/dev-showcase/posters/jager-mobile.png',
    siteHref: 'https://jager-vps.ru',
    bullets: [
      'Кабинет для управления подпиской и доступами',
      'Интерфейс поверх инфраструктурной логики',
      'Фокус на стабильность, ясные статусы и быстрые действия',
    ],
    stack: ['React', 'Node.js', 'Express', 'Linux VPS'],
  },
]
