export type CaseCategory = 'SaaS' | 'Web App' | 'Landing Page' | 'Internal Tool' | 'Education Platform'
export type CaseStatus = 'done' | 'wip'

export type CaseStack = {
  frontend?: string
  backend?: string
  auth?: string
  database?: string
  infrastructure?: string
  other?: string
}

export type CaseItem = {
  id: string
  title: string
  subtitle: string
  category: CaseCategory
  status: CaseStatus
  tags: string[]
  metric: string
  images?: string[]
  // Detail: business view
  overview: string
  audience: string
  businessGoal: string
  problem: string
  solution: string
  features: string[]
  results: string[]
  // Detail: architecture view
  stack: CaseStack
  architectureNotes: string[]
  // Optional links
  github?: string
  demo?: string
}

export const FILTERS: readonly { label: string; value: 'all' | CaseStatus }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Реализованные', value: 'done' },
  { label: 'В разработке', value: 'wip' },
]

export const cases: CaseItem[] = [
  {
    id: 'jagervpn',
    title: 'JagerVPN',
    subtitle: 'VPN сервис, с большим кол-вом локаций и способов обхода блокировок, а также удобным интерфейсом для управления подпиской',
    category: 'SaaS',
    status: 'done',
    tags: ['SaaS', 'React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    metric: '1 000+ клиентов в месяц',

    overview:
      'TaskFlow — инструмент для командной работы с задачами. Все участники видят, кто что делает прямо сейчас — без лишних совещаний и пересылки сообщений.',
    audience: 'Небольшие и средние продуктовые команды (5–40 человек)',
    businessGoal:
      'Снизить издержки на координацию проектов и устранить статус-митинги через shared state в режиме реального времени.',

    problem:
      'Клиент работал одновременно в Trello, Notion и Slack: информация была разбросана по трём местам, статусы постоянно опаздывали, а новому участнику уходило несколько дней, чтобы разобраться, кто за что отвечает.',
    solution:
      'Собрал единую платформу, где задачи обновляются у всех участников одновременно. Добавил разграничение ролей (кто может редактировать, а кто только смотреть) и историю всех изменений — кто, что и когда сделал.',

    features: [
      'Real-time обновление задач через WebSocket — без polling',
      'Role-based access control: admin / member / viewer',
      'Sprint board + бэклог с drag-and-drop сортировкой',
      'Audit log для каждого изменения состояния (кто, что, когда)',
      'Email + in-app уведомления при назначении задачи и приближении дедлайна',
    ],
    results: [
      'Задачи стали закрываться на 35% быстрее',
      '12 команд подключились в первый месяц после запуска',
      'Количество статус-встреч сократилось с трёх до одной в неделю',
      'За полгода работы — ни одного серьёзного сбоя',
    ],

    stack: {
      frontend: 'React 18 + TypeScript + Vite',
      backend: 'Node.js + Express + Socket.IO',
      auth: 'JWT with refresh token rotation (httpOnly cookies)',
      database: 'PostgreSQL 15 — normalized schema, indexed on team_id + updated_at',
      infrastructure: 'Docker Compose + Railway + Cloudflare (DNS + DDoS)',
    },
    architectureNotes: [
      'WebSocket-комнаты изолированы по team_id — исключается утечка событий между командами',
      'Refresh token хранится в httpOnly cookie; access token — только в памяти — XSS не достанет',
      'Все write-операции проходят через command layer, который пишет в audit_log до возврата ответа',
      'PostgreSQL advisory locks используются для drag-and-drop сортировки — исключаются race conditions при обновлении позиций',
      'API stateless — любой инстанс обрабатывает любой запрос; состояние socket-соединений управляется через Redis pub/sub',
    ],
  },

  {
    id: 'ligroup',
    title: 'LiGroup',
    subtitle: 'Платформа для VR обучения различным проффесим, интегрированная в школьное образование и поддерживающая дистанционный формат',
    category: 'Education Platform',
    status: 'done',
    tags: ['LMS', 'React', 'Django', 'PostgreSQL', 'Celery'],
    metric: '150+ учеников',

    overview:
      'LearnBridge — платформа для репетиторов, которая заменяет разрозненные чаты и таблицы: расписание, домашние задания и прогресс каждого ученика собраны в одном месте.',
    audience: 'Независимые репетиторы и небольшие репетиторские практики',
    businessGoal:
      'Сократить административную нагрузку, автоматизировав рутинную координацию, чтобы репетитор тратил время на обучение, а не на операционку.',

    problem:
      'Репетитор с 60+ учениками вёл всё через Telegram и таблицы Google: домашние задания терялись в переписке, пропуски не фиксировались, оплата велась хаотично. На организационные задачи уходило три часа каждую неделю.',
    solution:
      'Создал личный кабинет, где репетитор видит всех своих учеников, а ученики — своё расписание и задания. Автоматические напоминания убрали ручной контроль. Все 150+ учеников перенесены без потери данных.',

    features: [
      'Отслеживание прогресса ученика: история оценок и графики динамики',
      'Расписание занятий с определением конфликтов и учётом часовых поясов',
      'Цикл домашних заданий: сдача, проверка, обратная связь',
      'Аналитика репетитора: процент выполнения, динамика оценок, прогноз выручки',
      'Автоматические email-напоминания через Celery — ручные follow-up не нужны',
    ],
    results: [
      'Административное время репетитора сократилось с 3 до 1.2 часа в неделю',
      'Ни одно домашнее задание не потерялось после первого месяца работы',
      'Удержание учеников выросло на 28%',
      '150+ учеников перенесены без потери данных',
    ],

    stack: {
      frontend: 'React 18 + TypeScript + Recharts',
      backend: 'Django 4.2 + Django REST Framework',
      auth: 'JWT (SimpleJWT) + server-side session for student portal',
      database: 'PostgreSQL 15 + Redis (Celery broker + cache)',
      infrastructure: 'VPS (Ubuntu) + Nginx + Gunicorn + Certbot (SSL)',
    },
    architectureNotes: [
      'Модель Enrollment — pivot между учениками и курсами: поддерживает многокурсных учеников без дублирования данных',
      'Celery-задачи идемпотентны: безопасно повторять при сбое — напоминания не отправятся дважды',
      'PostgreSQL row-level security для портала ученика — ученик видит только свои строки',
      'Данные для графиков прогресса pre-aggregated ночной Celery-задачей в отдельную analytics-таблицу — dashboard-запросы остаются быстрыми',
      'Файлы домашних заданий хранятся в object storage (S3-compatible); в БД — только метаданные и TTL signed URL',
    ],
  },

  {
    id: 'stories',
    title: 'Stories',
    subtitle: 'Сеть салонов красоты в пригороде Санкт-Петербурга — с удобной онлайн-записью, программой лояльности и CRM для управления клиентами',
    category: 'Internal Tool',
    status: 'done',
    tags: ['Internal Tool', 'Next.js', 'tRPC', 'PostgreSQL', 'Analytics'],
    metric: '6 ч/аналитик/нед сэкономлено',

    overview:
      'OpsCenter — аналитический дашборд для операционной команды. Данные из трёх разных рабочих систем автоматически собираются в один понятный экран с разграничением доступа по ролям.',
    audience: 'Аналитики операций и руководство в mid-size логистической компании',
    businessGoal:
      'Устранить ручную компиляцию отчётов, сократить задержку данных с 48 часов до реального времени и дать руководству единый достоверный источник правды.',

    problem:
      'Аналитики каждую неделю вручную скачивали файлы из трёх разных систем, сводили их в Excel и рассылали отчёты. Это занимало 6 часов в неделю, данные к моменту получения уже устаревали на двое суток, а одни и те же показатели разные люди считали по-разному.',
    solution:
      'Настроил автоматический сбор данных из всех трёх систем в единую базу с обновлением каждые 5 минут. Теперь каждый видит свой уровень детализации: руководство — ключевые показатели, аналитики — полную картину.',

    features: [
      'Агрегация данных из 3 live операционных систем',
      'Интерактивные графики с drill-down (Recharts)',
      'Автоматическая генерация PDF-отчётов и рассылка по расписанию',
      'Role-based представления: сводка для руководства / drill-down для аналитиков / read-only',
      'CSV-экспорт с настраиваемым диапазоном дат и выбором метрик',
      'Threshold alerting — Slack-уведомление при выходе KPI за заданные пределы',
    ],
    results: [
      'Ручная сборка отчётов полностью устранена — 6 часов в неделю возвращено команде',
      'Данные обновляются каждые 5 минут вместо двух суток',
      '18 сотрудников перешли на платформу за первые две недели',
      'PDF-отчёт, на который уходило 45 минут, теперь генерируется за 8 секунд',
    ],

    stack: {
      frontend: 'Next.js 14 + TypeScript + Recharts + Tailwind',
      backend: 'tRPC v11 + Node.js ETL workers',
      auth: 'NextAuth.js v5 (LDAP adapter for corporate SSO)',
      database: 'PostgreSQL 15 — source DBs + central reporting schema + materialized views',
      infrastructure: 'Vercel (app) + Supabase (reporting DB) + GitHub Actions (ETL cron)',
    },
    architectureNotes: [
      'ETL работает в режиме append-only: исходные события никогда не изменяются, только добавляются новые строки — полный replay истории возможен в любой момент',
      'Materialized views обновляются каждые 5 минут; запросы идут в view, а не в live-таблицы — OLTP-нагрузка не затрагивается',
      'tRPC-процедуры зеркалят DB views 1-к-1: type safety распространяется от Postgres-схемы до React-компонентов через Zod inference',
      'Генерация PDF запускается в serverless function (Playwright headless) — изолирована от основного app server',
      'Пороги для алертов хранятся в БД; любой аналитик может настроить без деплоя',
    ],
  },

  {
    id: 'launchkit',
    title: 'LaunchKit',
    subtitle: 'Система лендингов, где скорость загрузки — главный приоритет',
    category: 'Landing Page',
    status: 'wip',
    tags: ['Landing Page', 'Performance', 'React', 'Vite', 'GSAP'],
    metric: 'LCP 3.8с → 0.9с · +18% конверсия',

    overview:
      'LaunchKit — система для создания быстрых лендингов под рекламные кампании. Скорость загрузки здесь — главный приоритет: чем быстрее открывается страница, тем дешевле обходится реклама.',
    audience: 'Продуктовые команды, запускающие маркетинговые кампании с платным трафиком',
    businessGoal:
      'Максимизировать эффективность рекламных конверсий, устранив performance-штрафы, которые раздувают CPA и снижают Quality Score.',

    problem:
      'Сайты клиента грузились медленно: посетители уходили, не дождавшись загрузки, а Google оценивал качество страниц на 4 из 10 — это автоматически делало каждый рекламный клик дороже.',
    solution:
      'Пересобрал страницы с нуля, добившись открытия меньше чем за секунду. Добавил систему A/B-тестов, чтобы автоматически определять лучшую версию страницы и не терять трафик в процессе.',

    features: [
      'Critical CSS инлайнится на этапе сборки — ноль render-blocking стилей',
      'Image pipeline: WebP + AVIF output, responsive srcset, lazy loading',
      'GSAP scroll-анимации с поддержкой prefers-reduced-motion',
      'A/B-тест система через URL params с серверным трекингом аналитики',
      'Automated Lighthouse CI на каждый деплой — блокирует merge при падении score ниже 90',
      'Google Analytics 4 + Plausible dual-track (privacy-first + full funnel)',
    ],
    results: [
      'Скорость загрузки выросла с 3.8 до 0.9 секунды',
      'Оценка качества Google Ads выросла с 4 до 8 из 10',
      'Стоимость рекламного клика снизилась на 22%',
      'Конверсия выросла на 18% по сравнению с прежней страницей',
    ],

    stack: {
      frontend: 'React 18 + TypeScript + Vite',
      backend: 'Cloudflare Worker (A/B variant routing + edge analytics)',
      auth: 'N/A — публичная маркетинговая страница',
      database: 'Cloudflare KV (variant assignment storage)',
      infrastructure: 'Cloudflare Pages + GSAP + Rollup (custom chunk strategy)',
      other: 'sharp (image pipeline) · Playwright (Lighthouse CI) · Plausible Analytics',
    },
    architectureNotes: [
      'Vite manifest используется для детерминированного инлайна только critical CSS для above-the-fold viewport',
      'GSAP загружается через dynamic import, запускаемый при первом scroll-событии — не попадает в initial bundle',
      'A/B вариант назначается на уровне Cloudflare Worker, сохраняется в KV — React-приложение получает variant как prop, не принимает client-side решений, способных вызвать flicker',
      'Все сторонние скрипты (analytics, chat) загружаются с strategy="lazyOnload" после TTI',
      'Image pipeline запускается на этапе сборки через Vite plugin — runtime image processing на CDN edge отсутствует',
    ],
  },
]
