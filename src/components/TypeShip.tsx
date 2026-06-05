import { useEffect, useRef, useState, useCallback } from 'react'
import { SOUNDS } from '../data/sounds'

const WORDS = [...new Set(SOUNDS.map(s => s.example))].filter(w => w.length >= 3)

interface FallingWord {
  id: number
  word: string
  x: number
  y: number
  speed: number
  color: string
  matched: boolean
  exploding: boolean
  explodeFrame: number
}

const COLORS = ['#a78bfa', '#06b6d4', '#f43f5e', '#fbbf24', '#22c55e', '#f97316', '#ec4899']

let nextId = 0
function mkWord(w: number, level: number): FallingWord {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  return {
    id: nextId++,
    word,
    x: 40 + Math.random() * (w - 80),
    y: -30,
    speed: 0.6 + level * 0.15 + Math.random() * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    matched: false,
    exploding: false,
    explodeFrame: 0,
  }
}

export default function TypeShip() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef({
    words: [] as FallingWord[],
    typed: '',
    score: 0,
    lives: 5,
    level: 1,
    wordsDestroyed: 0,
    running: false,
    shipX: 0,
    spawnTimer: 0,
    spawnInterval: 2200,
    lasers: [] as { x1: number; y1: number; x2: number; y2: number; life: number }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  })
  const [uiState, setUiState] = useState({ score: 0, lives: 5, level: 1, typed: '', running: false, gameOver: false })
  const animRef = useRef(0)

  const updateUI = useCallback(() => {
    const s = stateRef.current
    setUiState({ score: s.score, lives: s.lives, level: s.level, typed: s.typed, running: s.running, gameOver: s.lives <= 0 })
  }, [])

  const startGame = useCallback(() => {
    const s = stateRef.current
    s.words = []
    s.typed = ''
    s.score = 0
    s.lives = 5
    s.level = 1
    s.wordsDestroyed = 0
    s.running = true
    s.spawnTimer = 0
    s.spawnInterval = 2200
    s.lasers = []
    s.particles = []
    const canvas = canvasRef.current
    if (canvas) s.shipX = canvas.width / 2
    updateUI()
    inputRef.current?.focus()
  }, [updateUI])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stateRef.current.shipX = canvas.width / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const shipImg = { w: 32, h: 44 }

    function drawShip(x: number, y: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      // Body
      ctx.fillStyle = '#a78bfa'
      ctx.beginPath()
      ctx.moveTo(0, -shipImg.h / 2)
      ctx.lineTo(shipImg.w / 2, shipImg.h / 2)
      ctx.lineTo(-shipImg.w / 2, shipImg.h / 2)
      ctx.closePath()
      ctx.fill()
      // Cockpit
      ctx.fillStyle = '#06b6d4'
      ctx.beginPath()
      ctx.ellipse(0, -2, 7, 10, 0, 0, Math.PI * 2)
      ctx.fill()
      // Engines
      ctx.fillStyle = '#fbbf24'
      ctx.fillRect(-shipImg.w / 2, shipImg.h / 2 - 6, 10, 8)
      ctx.fillRect(shipImg.w / 2 - 10, shipImg.h / 2 - 6, 10, 8)
      // Thruster glow
      ctx.shadowBlur = 12
      ctx.shadowColor = '#fbbf24'
      ctx.fillStyle = 'rgba(251,191,36,0.5)'
      ctx.fillRect(-shipImg.w / 2 + 2, shipImg.h / 2 + 2, 6, 6 + Math.random() * 6)
      ctx.fillRect(shipImg.w / 2 - 8, shipImg.h / 2 + 2, 6, 6 + Math.random() * 6)
      ctx.shadowBlur = 0
      ctx.restore()
    }

    let last = performance.now()

    const loop = (now: number) => {
      const dt = now - last
      last = now
      const s = stateRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Deep space gradient bg
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, '#05050f')
      grad.addColorStop(1, '#0a0520')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (!s.running) {
        animRef.current = requestAnimationFrame(loop)
        return
      }

      const shipY = canvas.height - 70

      // Spawn words
      s.spawnTimer += dt
      if (s.spawnTimer >= s.spawnInterval) {
        s.spawnTimer = 0
        s.words.push(mkWord(canvas.width, s.level))
      }

      // Move words
      for (let i = s.words.length - 1; i >= 0; i--) {
        const fw = s.words[i]
        if (fw.exploding) {
          fw.explodeFrame++
          if (fw.explodeFrame > 20) s.words.splice(i, 1)
          continue
        }
        fw.y += fw.speed * (dt / 16)
        if (fw.y > canvas.height - 30) {
          s.words.splice(i, 1)
          s.lives = Math.max(0, s.lives - 1)
          if (s.lives <= 0) { s.running = false; updateUI() }
          updateUI()
        }
      }

      // Level up
      if (s.wordsDestroyed > 0 && s.wordsDestroyed % 10 === 0) {
        const newLevel = 1 + Math.floor(s.wordsDestroyed / 10)
        if (newLevel !== s.level) {
          s.level = newLevel
          s.spawnInterval = Math.max(800, 2200 - newLevel * 180)
          updateUI()
        }
      }

      // Draw lasers
      for (let i = s.lasers.length - 1; i >= 0; i--) {
        const l = s.lasers[i]
        l.life--
        const alpha = l.life / 10
        ctx.save()
        ctx.strokeStyle = `rgba(251,191,36,${alpha})`
        ctx.lineWidth = 2
        ctx.shadowBlur = 8
        ctx.shadowColor = '#fbbf24'
        ctx.beginPath()
        ctx.moveTo(l.x1, l.y1)
        ctx.lineTo(l.x2, l.y2)
        ctx.stroke()
        ctx.restore()
        if (l.life <= 0) s.lasers.splice(i, 1)
      }

      // Draw particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life--
        const alpha = p.life / 30
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `,${alpha})`).replace('rgb', 'rgba')
        ctx.fill()
        if (p.life <= 0) s.particles.splice(i, 1)
      }

      // Draw words
      ctx.save()
      for (const fw of s.words) {
        if (fw.exploding) {
          const alpha = 1 - fw.explodeFrame / 20
          const scale = 1 + fw.explodeFrame * 0.08
          ctx.save()
          ctx.translate(fw.x, fw.y)
          ctx.scale(scale, scale)
          ctx.globalAlpha = alpha
          ctx.font = 'bold 16px Nunito, sans-serif'
          ctx.fillStyle = fw.color
          ctx.textAlign = 'center'
          ctx.fillText(fw.word, 0, 0)
          ctx.restore()
          continue
        }
        const isTarget = fw.word.startsWith(s.typed) && s.typed.length > 0
        ctx.font = `bold ${isTarget ? 18 : 15}px Nunito, sans-serif`
        ctx.textAlign = 'center'

        // Glow for target
        if (isTarget) {
          ctx.shadowBlur = 14
          ctx.shadowColor = fw.color
        } else {
          ctx.shadowBlur = 0
        }

        // Draw matched prefix in white, rest in color
        const matched = s.typed.length
        const fullW = ctx.measureText(fw.word).width
        const preW  = ctx.measureText(fw.word.slice(0, matched)).width

        ctx.fillStyle = fw.color
        ctx.fillText(fw.word, fw.x, fw.y)

        if (matched > 0 && isTarget) {
          ctx.fillStyle = '#ffffff'
          ctx.fillText(fw.word.slice(0, matched), fw.x - fullW / 2 + preW / 2, fw.y)
        }
        ctx.shadowBlur = 0
      }
      ctx.restore()

      // Draw ship
      drawShip(s.shipX, shipY)

      // HUD: lives at top
      ctx.font = '18px sans-serif'
      ctx.textAlign = 'left'
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = i < s.lives ? '#f43f5e' : '#333355'
        ctx.fillText('♥', 12 + i * 24, 28)
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [updateUI])

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const s = stateRef.current
    if (!s.running) return

    if (e.key === 'Backspace') {
      s.typed = s.typed.slice(0, -1)
      updateUI()
      return
    }
    if (e.key.length !== 1) return

    const newTyped = s.typed + e.key
    s.typed = newTyped

    // Check for complete match
    const matchIdx = s.words.findIndex(fw => !fw.exploding && fw.word === newTyped)
    if (matchIdx !== -1) {
      const fw = s.words[matchIdx]
      fw.exploding = true
      s.score += fw.word.length * 10 * s.level
      s.wordsDestroyed++
      s.typed = ''

      // Laser
      const canvas = canvasRef.current
      if (canvas) {
        s.lasers.push({ x1: s.shipX, y1: canvas.height - 70, x2: fw.x, y2: fw.y, life: 10 })
      }

      // Particles
      for (let i = 0; i < 20; i++) {
        s.particles.push({
          x: fw.x, y: fw.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 20 + Math.floor(Math.random() * 15),
          color: fw.color,
        })
      }

      // Speak example word
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
        const utt = new SpeechSynthesisUtterance(fw.word)
        utt.rate = 0.9
        window.speechSynthesis.speak(utt)
      }
    }

    updateUI()
  }, [updateUI])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', color: '#a78bfa', marginBottom: '4px' }}>
          🚀 TypeShip
        </h2>
        <p style={{ color: '#7878aa', fontSize: '0.85rem' }}>Type the falling words to blast them!</p>
      </div>

      {/* Scoreboard */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'SCORE', value: uiState.score, color: '#fbbf24' },
          { label: 'LEVEL', value: uiState.level, color: '#a78bfa' },
          { label: 'LIVES', value: '♥'.repeat(Math.max(0, uiState.lives)) + '♡'.repeat(Math.max(0, 5 - uiState.lives)), color: '#f43f5e' },
        ].map(item => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#555588', letterSpacing: '0.1em', fontFamily: 'Orbitron, monospace' }}>{item.label}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: item.color, fontFamily: 'Orbitron, monospace' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Game canvas */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '16px',
            border: '1px solid rgba(124,58,237,0.4)',
            boxShadow: '0 0 30px rgba(124,58,237,0.2)',
            display: 'block',
          }}
        />
        {!uiState.running && !uiState.gameOver && (
          <div style={overlayStyle}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', color: '#a78bfa', marginBottom: '8px' }}>🚀 TypeShip</div>
            <p style={{ color: '#9090cc', marginBottom: '20px', fontSize: '0.9rem' }}>Type falling words before they pass!</p>
            <button onClick={startGame} style={btnStyle}>LAUNCH</button>
          </div>
        )}
        {uiState.gameOver && (
          <div style={overlayStyle}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', color: '#f43f5e', marginBottom: '8px' }}>GAME OVER</div>
            <p style={{ color: '#9090cc', marginBottom: '4px' }}>Score: <strong style={{ color: '#fbbf24' }}>{uiState.score}</strong></p>
            <p style={{ color: '#9090cc', marginBottom: '20px' }}>Level reached: <strong style={{ color: '#a78bfa' }}>{uiState.level}</strong></p>
            <button onClick={startGame} style={btnStyle}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      {/* Hidden input captures typing */}
      {uiState.running && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '400px' }}>
          <div style={{
            flex: 1, padding: '12px 18px', borderRadius: '10px',
            background: 'rgba(12,12,40,0.8)', border: '1px solid rgba(124,58,237,0.5)',
            fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', color: '#fbbf24',
            minHeight: '48px', letterSpacing: '0.1em',
          }}>
            {uiState.typed || <span style={{ color: '#333355' }}>type here…</span>}
          </div>
          <input
            ref={inputRef}
            onKeyDown={handleKey}
            onChange={() => {}}
            value=""
            style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px' }}
            autoFocus
            autoComplete="off"
          />
          <button
            onClick={() => inputRef.current?.focus()}
            style={{ ...btnStyle, padding: '10px 14px', fontSize: '0.8rem' }}
          >
            FOCUS
          </button>
        </div>
      )}
    </div>
  )
}

const overlayStyle: React.CSSProperties = {
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(5,5,16,0.85)', borderRadius: '16px', textAlign: 'center', padding: '20px',
}

const btnStyle: React.CSSProperties = {
  padding: '12px 32px', borderRadius: '24px',
  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
  border: 'none', color: '#fff',
  fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', fontWeight: 700,
  cursor: 'pointer', boxShadow: '0 0 20px rgba(124,58,237,0.5)',
  transition: 'opacity 0.2s',
}
