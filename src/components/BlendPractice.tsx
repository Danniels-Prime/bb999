import { useState, useCallback, useRef } from 'react'
import { WORD_BANK, type PatternGroup, type WordEntry } from '../data/wordBank'

function speak(text: string, rate = 0.85) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.rate = rate
  u.pitch = 1.05
  window.speechSynthesis.speak(u)
}

const CATEGORIES = ['Short Vowels', 'Long Vowels', 'Digraphs', 'Blends', 'Vowel Teams', 'R-Controlled']

export default function BlendPractice() {
  const [catFilter, setCatFilter] = useState<string>('Short Vowels')
  const [pattern, setPattern] = useState<PatternGroup>(WORD_BANK[0])
  const [selected, setSelected] = useState<WordEntry | null>(null)
  const [blending, setBlending] = useState(false)
  const [activePhoneme, setActivePhoneme] = useState<number | null>(null)
  const blendRef = useRef(false)

  const patterns = WORD_BANK.filter(p => p.category === catFilter)

  const selectPattern = useCallback((p: PatternGroup) => {
    setPattern(p)
    setSelected(null)
    setActivePhoneme(null)
  }, [])

  const selectWord = useCallback((w: WordEntry) => {
    setSelected(w)
    setActivePhoneme(null)
    speak(w.word, 0.8)
  }, [])

  const tapPhoneme = useCallback((say: string, idx: number) => {
    setActivePhoneme(idx)
    speak(say)
    setTimeout(() => setActivePhoneme(null), 900)
  }, [])

  const blend = useCallback(async (w: WordEntry) => {
    if (blending) return
    setBlending(true)
    blendRef.current = true
    for (let i = 0; i < w.phonemes.length; i++) {
      if (!blendRef.current) break
      setActivePhoneme(i)
      speak(w.phonemes[i].say)
      await new Promise(r => setTimeout(r, 750))
    }
    setActivePhoneme(null)
    setBlending(false)
  }, [blending])

  const color = pattern.color

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '6px',
        }}>🔤 Word Blending Practice</h2>
        <p style={{ color: '#7878aa', fontSize: '0.88rem' }}>
          Tap a word → hear it → blend phoneme by phoneme
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setCatFilter(cat); selectPattern(WORD_BANK.find(p => p.category === cat)!) }}
            style={{
              padding: '6px 14px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              border: `1px solid ${cat === catFilter ? '#a78bfa' : 'rgba(110,70,240,0.25)'}`,
              background: cat === catFilter ? 'rgba(124,58,237,0.2)' : 'rgba(12,12,40,0.6)',
              color: cat === catFilter ? '#e4e4ff' : '#7878aa',
            }}>{cat}</button>
        ))}
      </div>

      {/* Pattern selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {patterns.map(p => (
          <button key={p.id} onClick={() => selectPattern(p)}
            style={{
              padding: '8px 16px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
              border: `1px solid ${p.id === pattern.id ? p.color : 'rgba(110,70,240,0.25)'}`,
              background: p.id === pattern.id ? `${p.color}22` : 'rgba(12,12,40,0.6)',
              color: p.id === pattern.id ? '#e4e4ff' : '#7878aa',
              boxShadow: p.id === pattern.id ? `0 0 12px ${p.color}44` : 'none',
            }}>{p.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '16px' }}>
        {/* Word grid */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#555588', fontFamily: 'Orbitron, monospace', marginBottom: '10px' }}>
            {pattern.words.length} WORDS — {pattern.label}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '8px' }}>
            {pattern.words.map(w => (
              <button key={w.word} onClick={() => selectWord(w)}
                style={{
                  padding: '10px 8px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center',
                  fontWeight: 700, fontSize: '1rem', fontFamily: 'Nunito, sans-serif',
                  background: selected?.word === w.word ? `${color}22` : 'rgba(12,12,40,0.7)',
                  border: `1px solid ${selected?.word === w.word ? color : 'rgba(110,70,240,0.2)'}`,
                  color: selected?.word === w.word ? '#e4e4ff' : '#9090cc',
                  boxShadow: selected?.word === w.word ? `0 0 14px ${color}44` : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {w.word}
              </button>
            ))}
          </div>
        </div>

        {/* Phoneme breakdown panel */}
        {selected && (
          <div style={{
            padding: '20px', borderRadius: '16px',
            background: 'rgba(12,12,40,0.8)',
            border: `1px solid ${color}44`,
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            {/* Word title */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e4e4ff', letterSpacing: '0.05em' }}>
                {selected.word}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#555588', marginTop: '4px' }}>
                {selected.phonemes.length} sound{selected.phonemes.length > 1 ? 's' : ''}
              </div>
            </div>

            {/* Phoneme tiles */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {selected.phonemes.map((ph, i) => (
                <button key={i} onClick={() => tapPhoneme(ph.say, i)}
                  style={{
                    minWidth: '52px', padding: '12px 10px', borderRadius: '10px',
                    fontFamily: 'Orbitron, monospace', fontSize: '1.1rem', fontWeight: 700,
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                    background: activePhoneme === i ? color : `${color}18`,
                    border: `2px solid ${activePhoneme === i ? color : `${color}55`}`,
                    color: activePhoneme === i ? '#fff' : color,
                    boxShadow: activePhoneme === i ? `0 0 18px ${color}88` : 'none',
                    transform: activePhoneme === i ? 'scale(1.12)' : 'scale(1)',
                  }}
                >
                  {ph.seg}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => speak(selected.word, 0.75)}
                style={{
                  padding: '10px 20px', borderRadius: '20px', border: `1px solid ${color}66`,
                  background: `${color}18`, color: '#e4e4ff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                }}
              >🔊 Whole word</button>

              <button
                onClick={() => blend(selected)}
                disabled={blending}
                style={{
                  padding: '10px 24px', borderRadius: '20px', border: 'none',
                  background: blending ? '#333355' : `linear-gradient(135deg, ${color}, #a78bfa)`,
                  color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: blending ? 'default' : 'pointer',
                  boxShadow: blending ? 'none' : `0 0 16px ${color}55`,
                }}
              >{blending ? '⏳ Blending…' : '▶ Blend sounds'}</button>

              <button
                onClick={() => { setSelected(null); setActivePhoneme(null) }}
                style={{
                  padding: '10px 16px', borderRadius: '20px', border: '1px solid rgba(110,70,240,0.25)',
                  background: 'transparent', color: '#555588', fontSize: '0.82rem', cursor: 'pointer',
                }}
              >✕ Close</button>
            </div>

            {/* Phoneme breakdown label */}
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#555588' }}>
              Tap any tile to hear that sound
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
