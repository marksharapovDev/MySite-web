export type DevProject = {
  id: string
  title: string
  eyebrow: string
  summary: string
  role: string
  year: string
  accent: string
  accentSoft: string
  video: string
  poster: string
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
    video: '/dev-showcase/videos/repka.mp4',
    poster: '/dev-showcase/posters/repka.png',
    bullets: [
      'Личный кабинет для двух ролей: репетитор и ученик',
      'Интерактивные сценарии урока с материалами и доской',
      'Продуктовая логика вокруг реального процесса обучения',
    ],
    stack: ['React', 'TypeScript', 'AI tools'],
  },
  {
    id: 'ligroup',
    title: 'LiGroup',
    eyebrow: 'VR learning platform',
    summary:
      'VR-платформа для школ с дистанционным обучением, учебными сценариями и прогрессом учеников.',
    role: 'Frontend architecture, product interface',
    year: '2025',
    accent: '#ef4444',
    accentSoft: 'rgba(239, 68, 68, 0.18)',
    video: '/dev-showcase/videos/ligroup.mp4',
    poster: '/dev-showcase/posters/ligroup.png',
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
    video: '/dev-showcase/videos/jagervps.mp4',
    poster: '/dev-showcase/posters/jagervps.png',
    bullets: [
      'Кабинет для управления подпиской и доступами',
      'Интерфейс поверх инфраструктурной логики',
      'Фокус на стабильность, ясные статусы и быстрые действия',
    ],
    stack: ['React', 'Node.js', 'Express', 'Linux VPS'],
  },
]
