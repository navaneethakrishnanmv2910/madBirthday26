import { useEffect, useRef, useState } from 'react'
import { Check, Heart, RotateCcw, Sparkles } from 'lucide-react'
import { photos } from '../content'
import { Button, NextChapter, Reveal, SectionHeading } from './ui'

type Card = { key: string; photoId: number }
function newDeck(): Card[] {
  const cards = [1, 2, 3, 8, 9, 10].flatMap(photoId => [{ key: `${photoId}-a`, photoId }, { key: `${photoId}-b`, photoId }])
  for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]] }
  return cards
}

export function MemoryGame() {
  const [deck, setDeck] = useState(newDeck)
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [peek, setPeek] = useState(false)
  const [feedback, setFeedback] = useState('Find the photographs that belong together.')
  const mismatchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const peekTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => { clearTimeout(mismatchTimer.current); clearTimeout(peekTimer.current) }, [])

  function flip(card: Card) {
    if (peek || flipped.length === 2 || flipped.includes(card.key) || matched.includes(card.photoId)) return
    const next = [...flipped, card.key]
    setFlipped(next)
    if (next.length === 2) {
      setMoves(n => n + 1)
      const first = deck.find(item => item.key === next[0])!
      if (first.photoId === card.photoId) {
        setMatched(previous => [...previous, card.photoId])
        setFlipped([])
        setFeedback(matched.length === 5 ? 'All six pairs. Some things just belong together.' : 'There we are. Another little match.')
      } else {
        setFeedback('Not quite. Take another little look.')
        mismatchTimer.current = setTimeout(() => setFlipped([]), 1100)
      }
    }
  }
  function reset() {
    clearTimeout(mismatchTimer.current); clearTimeout(peekTimer.current)
    setDeck(newDeck()); setMatched([]); setFlipped([]); setMoves(0); setPeek(false)
    setFeedback('A fresh shuffle. Find our moments again.')
  }

  return <section id="play" className="game-section chapter section-space">
    <div className="section-shell game-layout"><div><SectionHeading number="05" eyebrow="A LITTLE DETOUR" title="Some things just" italic="belong together." text="Like these photographs. And, if you ask me, like us. Turn over two cards at a time and find the six matching pairs." />
      <Reveal className="game-message"><Sparkles aria-hidden="true" size={20} strokeWidth={1.3} /><p>No timer. No pressure.<br />I am quite happy to spend a little longer with you.</p></Reveal>
      <Reveal><Button variant="text" onClick={() => { if (peek) return; setPeek(true); peekTimer.current = setTimeout(() => setPeek(false), 2800) }} disabled={peek || matched.length === 6}>{peek ? 'A little peek…' : 'Can I have a tiny hint?'} <Heart aria-hidden="true" size={14} /></Button></Reveal>
    </div><Reveal className="game-board-wrap"><div className="game-score"><span><strong>{matched.length}</strong> / 6 pairs found</span><span>{moves} {moves === 1 ? 'little try' : 'little tries'}</span></div>
      <div className="memory-grid">{deck.map((card, index) => {
        const revealed = peek || flipped.includes(card.key) || matched.includes(card.photoId)
        const done = matched.includes(card.photoId)
        return <button key={card.key} className={`memory-card ${revealed ? 'flipped' : ''} ${done ? 'matched' : ''}`} data-pair={card.photoId} aria-label={done ? `Matched pair: ${photos[card.photoId - 1].title}` : revealed ? `Revealed card ${index + 1}: ${photos[card.photoId - 1].title}` : `Reveal memory card ${index + 1}`} aria-pressed={revealed} disabled={done || peek || flipped.includes(card.key)} onClick={() => flip(card)}><span className="memory-card-inner"><span className="memory-back"><Heart aria-hidden="true" size={24} strokeWidth={1} /><small>you & me</small></span><span className="memory-front"><img src={photos[card.photoId - 1].src} alt="" loading="lazy" />{done && <span className="match-check"><Check aria-hidden="true" size={13} /></span>}</span></span></button>
      })}</div>
      <p className="game-feedback" role="status">{feedback}</p>
      <div className="game-bottom"><button className="subtle-button" onClick={reset}><RotateCcw aria-hidden="true" size={14} />Mix them again</button>{matched.length === 6 && <a href="#letter" className="text-link">Your letter is waiting →</a>}</div>
    </Reveal></div><div className="centered"><NextChapter to="letter">There is something I want to say</NextChapter></div>
  </section>
}
