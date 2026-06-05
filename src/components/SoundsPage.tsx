import { useState, useCallback } from 'react'
import { SOUNDS, CATEGORIES, CATEGORY_COLORS, CATEGORY_EMOJIS, type Category, type Sound } from '../data/sounds'

function speak(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.85
  utt.pitch = 1.1
  window.speechSynthesis.speak(utt)
}

function SoundCard({ sound, isPlaying, onPlay }: { sound: Sound; isPlaying: boolean; onPlay: (id: string) => void }) {
  const color = CATEGORY_COLORS[sound.category]

  return (
    <button
      onClick={() => onPlay(sound.id)}
      style={{
        background: isPlaying
          ? `rgba(${hexToRgb(color)}, 0.22)`
          : 'rgba(12, 12, 40, 0.7)',
        border: `1px solid ${isPlaying ? color : 'rgba(110, 70, 240, 0.25)'}`,
        borderRadius: '14px',
        padding: '16px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s',
        backdropFilter: 'blur(8px)',
        boxShadow: isPlaying ? `0 0 20px rgba(${hexToRgb(color)}, 0.45)` : 'none',
        transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
        minWidth: '90px',
      }}
      onMouseEnter={e => {
        if (!isPlaying) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = color
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 14px rgba(${hexToRgb(color)}, 0.3)`
        }
      }}
      onMouseLeave={e => {
        if (!isPlaying) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(110, 70, 240, 0.25)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
        }
      }}
    >
      <span style={{ fontSize: '1.7rem', fontFamily: 'Orbitron, monospace', color, fontWeight: 700, lineHeight: 1 }}>
        {sound.grapheme}
      </span>
      <span style={{ fontSize: '0.75rem', color: '#9090cc', fontWeight: 600 }}>
        {sound.example}
      </span>
      <span style={{ fontSize: '1rem' }}>{isPlaying ? '🔊' : '🔈'}</span>
    </button>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export default function SoundsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Short Vowels')
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handlePlay = useCallback((id: string) => {
    const sound = SOUNDS.find(s => s.id === id)
    if (!sound) return
    setPlayingId(id)
    speak(sound.speech)
    setTimeout(() => setPlayingId(prev => prev === id ? null : prev), 1800)
  }, [])

  const filtered = SOUNDS.filter(s => s.category === activeCategory)
  const color = CATEGORY_COLORS[activeCategory]

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          🌌 Phonics Galaxy
        </h1>
        <p style={{ color: '#7878aa', fontSize: '0.95rem' }}>
          Tap any card to hear the sound · 106 phonics sounds
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
        {CATEGORIES.map(cat => {
          const c = CATEGORY_COLORS[cat]
          const active = cat === activeCategory
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: `1px solid ${active ? c : 'rgba(110,70,240,0.25)'}`,
                background: active ? `rgba(${hexToRgb(c)}, 0.2)` : 'rgba(12,12,40,0.6)',
                color: active ? '#e4e4ff' : '#7878aa',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.18s',
                boxShadow: active ? `0 0 14px rgba(${hexToRgb(c)}, 0.35)` : 'none',
              }}
            >
              {CATEGORY_EMOJIS[cat]} {cat}
            </button>
          )
        })}
      </div>

      {/* Category header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        padding: '12px 20px',
        borderRadius: '12px',
        background: `rgba(${hexToRgb(color)}, 0.1)`,
        border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
      }}>
        <span style={{ fontSize: '1.5rem' }}>{CATEGORY_EMOJIS[activeCategory]}</span>
        <div>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.1rem', color }}>{activeCategory}</h2>
          <p style={{ fontSize: '0.78rem', color: '#7878aa', marginTop: '2px' }}>{filtered.length} sounds</p>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '12px',
      }}>
        {filtered.map(sound => (
          <SoundCard
            key={sound.id}
            sound={sound}
            isPlaying={playingId === sound.id}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {/* Category count bar */}
      <div style={{ marginTop: '40px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {CATEGORIES.map(cat => {
          const count = SOUNDS.filter(s => s.category === cat).length
          const c = CATEGORY_COLORS[cat]
          return (
            <div key={cat} style={{ textAlign: 'center', fontSize: '0.7rem', color: '#7878aa' }}>
              <div style={{
                width: '8px',
                height: `${count * 2.5}px`,
                background: c,
                borderRadius: '4px',
                margin: '0 auto 4px',
                opacity: 0.7,
              }} />
              {count}
            </div>
          )
        })}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '4px', fontSize: '0.75rem', color: '#555588' }}>
          Total: {SOUNDS.length} sounds
        </div>
      </div>
    </div>
  )
}
