import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero, BirthdayReveal } from './components/Opening'
import { Album } from './components/Album'
import { Together, LittleNotes } from './components/Together'
import { MemoryGame } from './components/MemoryGame'
import { Letter } from './components/Letter'
import { Finale } from './components/Finale'
import { TinyHeart } from './components/ui'

export default function App() {
  return <MotionConfig reducedMotion="user">
    <Header />
    <main id="main"><Hero /><BirthdayReveal /><Album /><Together /><LittleNotes /><MemoryGame /><Letter /><Finale /></main>
    <footer className="site-footer"><a href="#hello" className="footer-monogram">m.</a><span>MADE WITH LOVE. MEANT ONLY FOR YOU.</span><span>MADHUMITHA <TinyHeart /> TWENTY-ONE</span></footer>
  </MotionConfig>
}
