import { useState, useCallback, useEffect, useRef } from 'react'
import { GAME_LEVELS, type GameTile } from '../data/gameWords'

type Screen = 'start' | 'playing' | 'levelEnd' | 'gameOver'
type Flash  = 'correct' | 'wrong' | null

interface PoolTile extends GameTile { id: number }

let _uid = 0
const uid = () => ++_uid

function speak(text: string, rate = 0.85) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = rate
  utt.pitch = 1.0
  window.speechSynthesis.speak(utt)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function Hearts({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ fontSize: '1.2rem', opacity: i < count ? 1 : 0.2 }}>❤️</span>
      ))}
    </div>
  )
}

const tileStyle = (color: string): React.CSSProperties => ({
  padding: '10px 18px',
  borderRadius: '10px',
  background: `rgba(${hexToRgb(color)}, 0.15)`,
  border: `2px solid ${color}88`,
  color: '#e4e4ff',
  fontSize: '1.15rem',
  fontWeight: 800,
  fontFamily: 'Orbitron, monospace',
  minWidth: '48px',
  textAlign: 'center',
  transition: 'all 0.15s',
  userSelect: 'none',
})

const bigBtn = (from: string, to: string): React.CSSProperties => ({
  padding: '14px 36px',
  borderRadius: '28px',
  border: 'none',
  background: `linear-gradient(135deg, ${from}, ${to})`,
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 800,
  fontFamily: 'Nunito, sans-serif',
  cursor: 'pointer',
  boxShadow: `0 0 24px ${from}66`,
})

export default function BlendPractice() {
  const [screen, setScreen]         = useState<Screen>('start')
  const [levelIdx, setLevelIdx]     = useState(0)
  const [wordIdx, setWordIdx]       = useState(0)
  const [hearts, setHearts]         = useState(3)
  const [score, setScore]           = useState(0)
  const [pool, setPool]             = useState<PoolTile[]>([])
  const [placed, setPlaced]         = useState<PoolTile[]>([])
  const [flash, setFlash]           = useState<Flash>(null)
  const [wordDone, setWordDone]     = useState(false)
  const [levelBonus, setLevelBonus] = useState(0)
  const flashTimer = useRef<number>(0)

  const currentLevel = GAME_LEVELS[levelIdx]
  const currentWord  = currentLevel?.words[wordIdx]

  const initWord = useCallback((lIdx: number, wIdx: number) => {
    const word = GAME_LEVELS[lIdx].words[wIdx]
    const tiles: PoolTile[] = word.tiles.map(t => ({ ...t, id: uid() }))
    setPool(shuffle(tiles))
    setPlaced([])
    setFlash(null)
    setWordDone(false)
  }, [])

  const triggerFlash = useCallback((type: Flash, duration = 600) => {
    clearTimeout(flashTimer.current)
    setFlash(type)
    flashTimer.current = window.setTimeout(() => setFlash(null), duration)
  }, [])

  const startGame = useCallback(() => {
    _uid = 0
    setLevelIdx(0)
    setWordIdx(0)
    setHearts(3)
    setScore(0)
    initWord(0, 0)
    setScreen('playing')
  }, [initWord])

  const tapTile = useCallback((tile: PoolTile) => {
    if (wordDone || flash === 'wrong') return
    const correctTiles = currentWord.tiles
    const expectedSeg = correctTiles[placed.length]?.seg

    if (tile.seg === expectedSeg) {
      speak(tile.say)
      const newPlaced = [...placed, tile]
      setPool(prev => prev.filter(p => p.id !== tile.id))
      setPlaced(newPlaced)
      setScore(prev => prev + 10)

      if (newPlaced.length === correctTiles.length) {
        setWordDone(true)
        triggerFlash('correct', 1200)
        setScore(prev => prev + 100)
        setTimeout(() => speak(currentWord.word, 0.8), 300)
        setTimeout(() => {
          const nextWIdx = wordIdx + 1
          if (nextWIdx < currentLevel.words.length) {
            setWordIdx(nextWIdx)
            initWord(levelIdx, nextWIdx)
          } else {
            const bonus = (levelIdx + 1) * 200
            setLevelBonus(bonus)
            setScore(prev => prev + bonus)
            setScreen('levelEnd')
          }
        }, 1700)
      } else {
        triggerFlash('correct', 350)
      }
    } else {
      const newHearts = hearts - 1
      setHearts(newHearts)
      triggerFlash('wrong', 700)
      setTimeout(() => {
        if (newHearts <= 0) {
          setScreen('gameOver')
        } else {
          initWord(levelIdx, wordIdx)
        }
      }, 800)
    }
  }, [wordDone, flash, currentWord, placed, hearts, wordIdx, levelIdx, currentLevel, triggerFlash, initWord])

  const nextLevel = useCallback(() => {
    const nextLIdx = levelIdx + 1
    if (nextLIdx < GAME_LEVELS.length) {
      setLevelIdx(nextLIdx)
      setWordIdx(0)
      setHearts(prev => Math.min(3, prev + 1))
      initWord(nextLIdx, 0)
      setScreen('playing')
    } else {
      setScreen('gameOver')
    }
  }, [levelIdx, initWord])

  useEffect(() => () => { clearTimeout(flashTimer.current) }, [])

  // ── Start Screen ─────────────────────────────────────────────────────────────
  if (screen === 'start') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎯</div>
        <h1 style={{ fontFamily: 'Orbitron, monospace', color: '#a78bfa', fontWeight: 900, fontSize: '2.2rem', marginBottom: '8px' }}>
          Blend Quest
        </h1>
        <p style={{ color: '#7878aa', fontSize: '0.9rem', maxWidth: '340px', marginBottom: '28px' }}>
          Tap the phoneme tiles in the correct order to blend each word. Get it wrong and you lose a heart!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px', marginBottom: '28px' }}>
          {GAME_LEVELS.map((lv, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 16px', borderRadius: '10px',
              background: `rgba(${hexToRgb(lv.color)}, 0.1)`,
              border: `1px solid ${lv.color}44`,
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: lv.color, minWidth: '20px' }}>{i + 1}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#e4e4ff', fontWeight: 700, fontSize: '0.88rem' }}>{lv.name}</div>
                <div style={{ color: '#7878aa', fontSize: '0.73rem' }}>{lv.words.length} words</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={startGame} style={bigBtn('#7c3aed', '#a855f7')}>
          🚀 Start Game
        </button>
      </div>
    )
  }

  // ── Level End Screen ─────────────────────────────────────────────────────────
  if (screen === 'levelEnd') {
    const isLast = levelIdx >= GAME_LEVELS.length - 1
    const color = currentLevel.color
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
        <h2 style={{ fontFamily: 'Orbitron, monospace', color, fontWeight: 900, marginBottom: '4px' }}>
          Level {levelIdx + 1} Complete!
        </h2>
        <p style={{ color: '#9090cc', marginBottom: '20px' }}>{currentLevel.name}</p>
        <div style={{ padding: '20px 36px', borderRadius: '16px', background: 'rgba(12,12,40,0.8)', border: '1px solid rgba(110,70,240,0.3)', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#7878aa' }}>Level Bonus</div>
          <div style={{ fontSize: '1.8rem', color: '#fbbf24', fontWeight: 800 }}>+{levelBonus}</div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
          <div style={{ fontSize: '0.78rem', color: '#7878aa' }}>Total Score</div>
          <div style={{ fontSize: '2.2rem', color: '#e4e4ff', fontWeight: 800 }}>{score}</div>
        </div>
        <Hearts count={hearts} />
        <div style={{ marginTop: '24px' }}>
          {isLast ? (
            <button onClick={() => setScreen('gameOver')} style={bigBtn('#f59e0b', '#fbbf24')}>
              🏆 Finish!
            </button>
          ) : (
            <button onClick={nextLevel} style={bigBtn(color, '#a855f7')}>
              Next Level →
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── Game Over Screen ─────────────────────────────────────────────────────────
  if (screen === 'gameOver') {
    const won = levelIdx >= GAME_LEVELS.length - 1
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{won ? '🏆' : '💔'}</div>
        <h2 style={{ fontFamily: 'Orbitron, monospace', color: '#a78bfa', fontWeight: 900, marginBottom: '8px' }}>
          {won ? 'You Win!' : 'Game Over'}
        </h2>
        <p style={{ color: '#9090cc', marginBottom: '20px' }}>
          {won ? 'You blended all 4 levels!' : `Reached Level ${levelIdx + 1}`}
        </p>
        <div style={{ padding: '20px 40px', borderRadius: '16px', background: 'rgba(12,12,40,0.8)', border: '1px solid rgba(110,70,240,0.3)' }}>
          <div style={{ fontSize: '0.82rem', color: '#7878aa' }}>Final Score</div>
          <div style={{ fontSize: '3.2rem', color: '#fbbf24', fontWeight: 800 }}>{score}</div>
        </div>
        <button onClick={startGame} style={{ ...bigBtn('#7c3aed', '#a855f7'), marginTop: '28px' }}>
          🔄 Play Again
        </button>
      </div>
    )
  }

  // ── Playing Screen ───────────────────────────────────────────────────────────
  const color = currentLevel.color
  const totalWords = currentLevel.words.length
  const correctTiles = currentWord.tiles
  const placeholderCount = correctTiles.length - placed.length

  const panelBg   = flash === 'correct' ? `rgba(${hexToRgb(color)}, 0.2)`
                  : flash === 'wrong'   ? 'rgba(244,63,94,0.2)'
                  : 'rgba(12,12,40,0.7)'
  const panelBorder = flash === 'correct' ? color
                    : flash === 'wrong'   ? '#f43f5e'
                    : 'rgba(110,70,240,0.25)'

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderRadius: '10px',
        background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(110,70,240,0.2)',
        marginBottom: '10px',
      }}>
        <div style={{ fontSize: '0.78rem', color, fontWeight: 700 }}>
          LV {levelIdx + 1}: {currentLevel.name}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 800 }}>{score} pts</div>
        <Hearts count={hearts} />
      </div>

      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginBottom: '20px' }}>
        <div style={{ height: '100%', borderRadius: '2px', background: color, width: `${(wordIdx / totalWords) * 100}%`, transition: 'width 0.4s' }} />
      </div>

      {/* Word panel */}
      <div style={{
        textAlign: 'center', marginBottom: '24px', padding: '20px 16px',
        borderRadius: '16px', background: panelBg, border: `2px solid ${panelBorder}`,
        transition: 'all 0.15s',
      }}>
        <div style={{ fontSize: '0.7rem', color: '#555588', marginBottom: '6px', fontFamily: 'Orbitron, monospace' }}>
          WORD {wordIdx + 1} / {totalWords}
        </div>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#e4e4ff', letterSpacing: '0.04em' }}>
          {currentWord.word}
        </div>
        <button
          onClick={() => speak(currentWord.word, 0.75)}
          style={{
            marginTop: '10px', padding: '6px 18px', borderRadius: '16px',
            background: `rgba(${hexToRgb(color)}, 0.2)`,
            border: `1px solid ${color}66`, color: '#e4e4ff',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
          }}
        >
          🔊 Hear it
        </button>
      </div>

      {/* Placed tiles */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.7rem', color: '#555588', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Your answer:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', minHeight: '52px', alignItems: 'center' }}>
          {placed.map(tile => (
            <div key={tile.id} style={tileStyle(color)}>
              {tile.seg}
            </div>
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div key={`ph-${i}`} style={{
              padding: '10px 18px', borderRadius: '10px', minWidth: '48px', minHeight: '44px',
              background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(110,70,240,0.25)',
            }} />
          ))}
        </div>
      </div>

      {/* Pool tiles */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '0.7rem', color: '#555588', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Tap the next tile:
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {pool.map(tile => (
            <button
              key={tile.id}
              onClick={() => tapTile(tile)}
              disabled={!!flash || wordDone}
              style={{
                ...tileStyle(color),
                cursor: flash || wordDone ? 'not-allowed' : 'pointer',
                opacity: flash || wordDone ? 0.55 : 1,
                boxShadow: `0 0 14px rgba(${hexToRgb(color)}, 0.3)`,
                animation: flash === 'wrong' ? 'shake 0.45s' : undefined,
              }}
            >
              {tile.seg}
            </button>
          ))}
        </div>
      </div>

      {/* Tip bar */}
      <div style={{
        padding: '10px 14px', borderRadius: '10px',
        background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.18)',
        fontSize: '0.76rem', color: '#7878aa',
      }}>
        <strong style={{ color: '#06b6d4' }}>💡</strong> Tap tiles in order · Wrong = −1 ❤️ · +10 per tile · +100 per word
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-7px); }
          40%      { transform: translateX(7px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
