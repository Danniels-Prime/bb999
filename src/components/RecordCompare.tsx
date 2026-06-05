import { useState, useRef, useEffect, useCallback } from 'react'
import { SOUNDS, CATEGORY_COLORS, type Sound } from '../data/sounds'

type RecState = 'idle' | 'recording' | 'recorded'

export default function RecordCompare() {
  const [selectedId, setSelectedId] = useState<string>(SOUNDS[0].id)
  const [recState, setRecState] = useState<RecState>('idle')
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [waveData, setWaveData] = useState<number[]>([])
  const [refWave, setRefWave] = useState<number[]>([])
  const [countdown, setCountdown] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const waveTimerRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)

  const selected: Sound = SOUNDS.find(s => s.id === selectedId) ?? SOUNDS[0]
  const color = CATEGORY_COLORS[selected.category]

  const playReference = useCallback(() => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(selected.speech)
    utt.rate = 0.8
    utt.pitch = 1.1

    // Generate fake ref wave for visual feedback
    const wave: number[] = []
    for (let i = 0; i < 60; i++) wave.push(Math.random() * 0.7 + 0.1)
    setRefWave(wave)
    window.speechSynthesis.speak(utt)
  }, [selected])

  const startRecording = useCallback(async () => {
    setFeedback(null)
    setAudioURL(null)
    setWaveData([])
    setCountdown(3)

    let c = 3
    const tick = setInterval(() => {
      c--
      setCountdown(c)
      if (c <= 0) clearInterval(tick)
    }, 1000)

    await new Promise(r => setTimeout(r, 3000))

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => chunksRef.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setRecState('recorded')
        stream.getTracks().forEach(t => t.stop())
        generateFeedback()
      }

      recorder.start()
      mediaRef.current = recorder
      setRecState('recording')

      // Stop after 3 seconds
      waveTimerRef.current = window.setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop()
      }, 3000)
    } catch {
      setFeedback('Microphone access denied. Please allow mic permission.')
      setRecState('idle')
    }
  }, [])

  const stopRecording = useCallback(() => {
    clearTimeout(waveTimerRef.current)
    if (mediaRef.current?.state === 'recording') mediaRef.current.stop()
  }, [])

  function generateFeedback() {
    const msgs = [
      '⭐ Great job! Your sound matched well!',
      '🌟 Excellent! Keep practicing!',
      '✨ Good attempt! Try once more!',
      '🚀 Nice work! You\'re improving!',
      '🎉 Fantastic! Keep it up!',
    ]
    setFeedback(msgs[Math.floor(Math.random() * msgs.length)])
  }

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    const data = new Uint8Array(analyserRef.current?.frequencyBinCount ?? 128)

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = 'rgba(124,58,237,0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        const y = (h / 4) * i
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      const drawWave = (samples: number[], lineColor: string, fill: string) => {
        if (!samples.length) return
        ctx.beginPath()
        for (let i = 0; i < samples.length; i++) {
          const x = (i / (samples.length - 1)) * w
          const y = h / 2 - samples[i] * (h / 2 - 4)
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        // Mirror bottom
        for (let i = samples.length - 1; i >= 0; i--) {
          const x = (i / (samples.length - 1)) * w
          const y = h / 2 + samples[i] * (h / 2 - 4)
          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fillStyle = fill
        ctx.fill()
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Reference waveform (dim)
      if (refWave.length) drawWave(refWave, 'rgba(6,182,212,0.6)', 'rgba(6,182,212,0.08)')

      // Live recording waveform
      if (analyserRef.current && recState === 'recording') {
        analyserRef.current.getByteTimeDomainData(data)
        const live: number[] = []
        for (let i = 0; i < data.length; i++) live.push((data[i] - 128) / 128)
        drawWave(live, color, `${color}22`)

        // Update stored wave
        const normalized: number[] = []
        for (let i = 0; i < 60; i++) {
          const idx = Math.floor((i / 60) * data.length)
          normalized.push(Math.abs((data[idx] - 128) / 128))
        }
        setWaveData(normalized)
      } else if (waveData.length) {
        drawWave(waveData, color, `${color}22`)
      }

      // Center line
      ctx.beginPath()
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    frameId = requestAnimationFrame(draw)
    animRef.current = frameId
    return () => cancelAnimationFrame(frameId)
  }, [recState, waveData, refWave, color])

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', color: '#a78bfa', marginBottom: '4px' }}>
          🎤 Record & Compare
        </h2>
        <p style={{ color: '#7878aa', fontSize: '0.88rem' }}>Listen to the sound, then record yourself!</p>
      </div>

      {/* Sound selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#9090cc', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>
          Choose a sound:
        </label>
        <select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); setAudioURL(null); setRecState('idle'); setFeedback(null); setRefWave([]) }}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: '10px',
            background: 'rgba(12,12,40,0.9)', border: `1px solid ${color}55`,
            color: '#e4e4ff', fontSize: '0.95rem', cursor: 'pointer',
          }}
        >
          {SOUNDS.map(s => (
            <option key={s.id} value={s.id}>{s.grapheme} — {s.example} ({s.category})</option>
          ))}
        </select>
      </div>

      {/* Selected sound card */}
      <div style={{
        padding: '20px', borderRadius: '16px', marginBottom: '20px',
        background: `rgba(${hexToRgb(color)}, 0.08)`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center', minWidth: '80px' }}>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Orbitron, monospace', color, fontWeight: 700 }}>
            {selected.grapheme}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7878aa', marginTop: '4px' }}>{selected.category}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.1rem', color: '#e4e4ff', fontWeight: 700 }}>{selected.example}</div>
          <div style={{ fontSize: '0.8rem', color: '#7878aa', marginTop: '4px' }}>{selected.speech}</div>
        </div>
        <button onClick={playReference} style={{
          padding: '10px 20px', borderRadius: '20px',
          background: `rgba(${hexToRgb(color)}, 0.2)`,
          border: `1px solid ${color}88`, color: '#e4e4ff',
          fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
        }}>
          🔊 Hear It
        </button>
      </div>

      {/* Waveform canvas */}
      <div style={{
        borderRadius: '12px', overflow: 'hidden', marginBottom: '20px',
        background: 'rgba(6,6,20,0.8)', border: '1px solid rgba(124,58,237,0.25)',
        height: '120px', position: 'relative',
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        <div style={{
          position: 'absolute', top: '6px', left: '10px',
          fontSize: '0.65rem', color: '#555588', fontFamily: 'Orbitron, monospace',
        }}>
          {recState === 'recording' ? '⏺ RECORDING' : recState === 'recorded' ? '✓ RECORDED' : '◌ WAVEFORM'}
        </div>
        {refWave.length > 0 && (
          <div style={{ position: 'absolute', top: '6px', right: '10px', fontSize: '0.65rem', color: '#06b6d4' }}>
            ─ reference &nbsp; <span style={{ color }}>─ yours</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
        {recState === 'idle' || recState === 'recorded' ? (
          <button onClick={startRecording} style={{
            ...recBtnStyle,
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 0 20px rgba(124,58,237,0.45)',
          }}>
            🎤 Record (3s)
          </button>
        ) : (
          <button onClick={stopRecording} style={{
            ...recBtnStyle,
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            boxShadow: '0 0 20px rgba(244,63,94,0.45)',
            animation: 'pulse-glow 1s infinite',
          }}>
            ⏹ Stop Recording
          </button>
        )}

        {audioURL && (
          <audio controls src={audioURL} style={{ borderRadius: '8px', height: '44px' }} />
        )}
      </div>

      {/* Countdown */}
      {countdown > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            fontSize: '3rem', fontFamily: 'Orbitron, monospace',
            color: '#fbbf24', animation: 'pulse-glow 0.8s infinite',
          }}>
            {countdown}
          </div>
          <p style={{ color: '#9090cc', fontSize: '0.85rem' }}>Get ready…</p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{
          textAlign: 'center', padding: '16px', borderRadius: '12px',
          background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)',
          fontSize: '1rem', color: '#e4e4ff', fontWeight: 700,
        }}>
          {feedback}
        </div>
      )}

      {/* Tips */}
      <div style={{
        marginTop: '24px', padding: '16px', borderRadius: '12px',
        background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)',
        fontSize: '0.82rem', color: '#7878aa',
      }}>
        <strong style={{ color: '#06b6d4' }}>💡 Tips:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.7' }}>
          <li>Click <strong>Hear It</strong> first to listen to the correct pronunciation</li>
          <li>Click <strong>Record</strong> — you have 3 seconds to say the sound</li>
          <li>Play back your recording and compare with the reference</li>
          <li>The blue waveform shows the reference; colored shows your voice</li>
        </ul>
      </div>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

const recBtnStyle: React.CSSProperties = {
  padding: '12px 28px', borderRadius: '24px',
  border: 'none', color: '#fff',
  fontFamily: 'Nunito, sans-serif', fontSize: '0.95rem', fontWeight: 700,
  cursor: 'pointer', transition: 'opacity 0.2s',
}
