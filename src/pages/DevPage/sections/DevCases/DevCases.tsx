import {
  CaretLeft,
  CaretRight,
  Play,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { Container } from '../../../../shared/ui/Container'
import { devProjects } from './devCases.data'

import styles from './DevCases.module.scss'

const SEEK_SPEED = 0.008
const EDGE_EPSILON = 0.12

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function DevCases() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const touchStartY = useRef(0)
  const pendingStartRef = useRef<'start' | 'end'>('start')
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const activeProject = devProjects[activeIndex]

  const projectStyle = {
    '--project-accent': activeProject.accent,
    '--project-accent-soft': activeProject.accentSoft,
  } as CSSProperties

  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty('--accent', activeProject.accent)
    root.style.setProperty('--accent-soft', activeProject.accentSoft)
    root.style.setProperty('--accent-glow', hexToRgba(activeProject.accent, 0.24))
    root.style.setProperty('--accent-bg-glow', hexToRgba(activeProject.accent, 0.14))

    return () => {
      root.style.removeProperty('--accent')
      root.style.removeProperty('--accent-soft')
      root.style.removeProperty('--accent-glow')
      root.style.removeProperty('--accent-bg-glow')
    }
  }, [activeProject])

  const selectProject = (index: number, startAt: 'start' | 'end' = 'start') => {
    const nextIndex = clamp(index, 0, devProjects.length - 1)
    const video = videoRef.current

    pendingStartRef.current = startAt

    if (video) {
      video.pause()
      video.currentTime = startAt === 'end' && Number.isFinite(video.duration) ? video.duration : 0
    }

    setActiveIndex(nextIndex)
    setProgress(startAt === 'end' ? 1 : 0)
    setIsPlaying(false)
  }

  const updateProgress = (video: HTMLVideoElement) => {
    setProgress(video.duration ? video.currentTime / video.duration : 0)
  }

  const seekActiveVideo = (deltaY: number) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

    const nextTime = clamp(video.currentTime + deltaY * SEEK_SPEED, 0, video.duration)
    video.currentTime = nextTime
    setProgress(video.duration ? nextTime / video.duration : 0)

    if (deltaY > 0 && nextTime >= video.duration - EDGE_EPSILON) {
      selectProject((activeIndex + 1) % devProjects.length)
      return
    }

    if (deltaY < 0 && nextTime <= EDGE_EPSILON) {
      selectProject((activeIndex - 1 + devProjects.length) % devProjects.length, 'end')
    }
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => undefined)
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    seekActiveVideo(event.deltaY)
  }

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? 0
  }

  const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0]
    if (!touch) return

    const deltaY = touchStartY.current - touch.clientY
    if (Math.abs(deltaY) < 18) return

    event.preventDefault()
    event.stopPropagation()
    seekActiveVideo(deltaY * 3)
  }

  return (
    <section
      id="cases"
      className={styles.section}
      style={projectStyle}
      aria-label="Проекты"
      onWheelCapture={onWheel}
      onTouchStartCapture={onTouchStart}
      onTouchEndCapture={onTouchEnd}
    >
      <Container className={styles.container}>
        <div className={styles.showcase}>
          <div className={styles.body}>
            <div className={styles.stage}>
              <div className={styles.stageGlow} aria-hidden="true" />
              <div className={styles.videoShell}>
                <video
                  key={activeProject.video}
                  ref={videoRef}
                  className={styles.video}
                  src={activeProject.video}
                  poster={activeProject.poster}
                  muted
                  playsInline
                  preload="auto"
                  onTimeUpdate={(event) => updateProgress(event.currentTarget)}
                  onLoadedMetadata={(event) => {
                    const video = event.currentTarget

                    if (pendingStartRef.current === 'end' && Number.isFinite(video.duration)) {
                      video.currentTime = video.duration
                      setProgress(1)
                      pendingStartRef.current = 'start'
                      return
                    }

                    updateProgress(video)
                  }}
                  onEnded={() => {
                    setProgress(1)
                    setIsPlaying(false)
                  }}
                  aria-label={`${activeProject.title}: видео проекта`}
                />

                <button
                  className={[styles.playButton, isPlaying ? styles.playButtonActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? 'Поставить видео на паузу' : 'Воспроизвести видео'}
                >
                  <Play size={18} weight="fill" aria-hidden="true" />
                </button>

                <div className={styles.projectOverlay}>
                  <p className={styles.overlayEyebrow}>{activeProject.eyebrow}</p>
                  <h1 className={styles.overlayTitle}>{activeProject.title}</h1>
                  <p className={styles.overlaySummary}>{activeProject.summary}</p>
                </div>
              </div>

              <div className={styles.metaRow}>
                <span>{activeProject.year}</span>
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(devProjects.length).padStart(2, '0')}</span>
                {activeProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className={styles.controls}>
                <button
                  className={styles.arrowButton}
                  type="button"
                  onClick={() => selectProject((activeIndex - 1 + devProjects.length) % devProjects.length, 'end')}
                  aria-label="Предыдущий проект"
                >
                  <CaretLeft size={20} weight="bold" aria-hidden="true" />
                </button>

                <div className={styles.progressGrid} aria-label="Прогресс проектов">
                  {devProjects.map((project, index) => {
                    const fill = index < activeIndex ? 1 : index === activeIndex ? progress : 0

                    return (
                      <button
                        key={project.id}
                        className={styles.progressItem}
                        type="button"
                        onClick={() => selectProject(index)}
                        aria-label={`Открыть проект ${project.title}`}
                      >
                        <span
                          className={styles.progressFill}
                          style={{ transform: `scaleX(${fill})` }}
                        />
                      </button>
                    )
                  })}
                </div>

                <button
                  className={styles.arrowButton}
                  type="button"
                  onClick={() => selectProject((activeIndex + 1) % devProjects.length)}
                  aria-label="Следующий проект"
                >
                  <CaretRight size={20} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
