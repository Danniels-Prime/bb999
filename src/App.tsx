import { useState } from 'react'
import Starfield from './components/Starfield'
import SoundsPage from './components/SoundsPage'
import TypeShip from './components/TypeShip'
import RecordCompare from './components/RecordCompare'
import BlendPractice from './components/BlendPractice'

type View = 'sounds' | 'typeship' | 'record' | 'blend'

const NAV_ITEMS: { id: View; label: string; icon: string }[] = [
  { id: 'sounds',   label: 'Phonics',      icon: '🌌' },
  { id: 'blend',    label: 'Blend',        icon: '🔤' },
  { id: 'typeship', label: 'TypeShip',     icon: '🚀' },
  { id: 'record',   label: 'Record',       icon: '🎤' },
]

export default function App() {
  const [view, setView] = useState<View>('sounds')

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Starfield />

      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span style={styles.logoText}>PhonicsLand</span>
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{
                ...styles.navBtn,
                ...(view === item.id ? styles.navBtnActive : {}),
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.main}>
        {view === 'sounds'   && <SoundsPage />}
        {view === 'blend'    && <BlendPractice />}
        {view === 'typeship' && <TypeShip />}
        {view === 'record'   && <RecordCompare />}
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky', top: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: '12px', padding: '14px 24px',
    background: 'rgba(5, 5, 16, 0.85)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(110, 70, 240, 0.25)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: {
    fontSize: '24px', color: '#a78bfa',
    animation: 'spin-slow 8s linear infinite', display: 'inline-block',
  },
  logoText: {
    fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', fontWeight: 700,
    background: 'linear-gradient(90deg, #a78bfa, #06b6d4)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  nav: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 16px', borderRadius: '20px',
    border: '1px solid rgba(110, 70, 240, 0.3)',
    background: 'transparent', color: '#8888bb',
    fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer',
  },
  navBtnActive: {
    background: 'rgba(124, 58, 237, 0.25)',
    border: '1px solid rgba(124, 58, 237, 0.7)',
    color: '#e4e4ff', boxShadow: '0 0 16px rgba(124, 58, 237, 0.35)',
  },
  main: {
    position: 'relative', zIndex: 1,
    padding: '24px 16px', maxWidth: '1400px', margin: '0 auto',
  },
}
