import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  blink: number
  blinkSpeed: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars: Star[] = []
    const STAR_COUNT = 200
    let animId = 0
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const init = () => {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 2 + 0.3,
          blink: Math.random(),
          blinkSpeed: Math.random() * 0.02 + 0.005,
        })
      }
    }

    // Shooting stars
    const shoots: { x: number; y: number; vx: number; vy: number; len: number; life: number; maxLife: number }[] = []
    let nextShoot = 3000

    const spawnShoot = () => {
      shoots.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.5),
        vx: 6 + Math.random() * 4,
        vy: 2 + Math.random() * 2,
        len: 80 + Math.random() * 80,
        life: 0,
        maxLife: 40 + Math.random() * 20,
      })
      nextShoot = 3000 + Math.random() * 5000
    }

    let last = performance.now()

    const draw = (now: number) => {
      const dt = now - last
      last = now
      nextShoot -= dt
      if (nextShoot <= 0) spawnShoot()

      ctx.fillStyle = 'rgba(5, 5, 16, 0.18)'
      ctx.fillRect(0, 0, w, h)

      for (const s of stars) {
        s.blink += s.blinkSpeed
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.blink))
        const size = s.z
        ctx.beginPath()
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 200, 255, ${alpha})`
        ctx.fill()
      }

      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i]
        sh.x += sh.vx
        sh.y += sh.vy
        sh.life++
        const alpha = 1 - sh.life / sh.maxLife
        const grad = ctx.createLinearGradient(sh.x - sh.vx * sh.len / sh.vx, sh.y - sh.vy * sh.len / sh.vx, sh.x, sh.y)
        grad.addColorStop(0, `rgba(180, 180, 255, 0)`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8)
        ctx.lineTo(sh.x, sh.y)
        ctx.stroke()
        if (sh.life >= sh.maxLife || sh.x > w + 200 || sh.y > h + 200) shoots.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', () => { resize(); init() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
