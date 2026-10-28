import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Heart, MessageCircle } from 'lucide-react'
import { conversations, notes } from '../content'
import { useKeepsake } from '../hooks/useKeepsake'
import { Button, NextChapter, Reveal, SectionHeading, Star } from './ui'

export function Together() {
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const conversation = conversations[step]

  return <section id="us" className="together-section chapter section-space">
    <div className="section-shell together-layout">
      <div><SectionHeading number="03" eyebrow="YOU, ME, AND ALL THIS TIME" title="Four years." italic="Still my favourite yes." text="Naalu varusham. So much time together, and there is still so much I want to know about you." />
        <Reveal className="four-years"><span className="big-four">4</span><div><span className="handwriting">years of loving you</span><p>No perfect script.<br />Just you, me, and choosing us.</p></div><Star /></Reveal>
        <Reveal><p className="together-aside">I love what we have. I love the thought of what we still get to become. And today, I really just want to know how you are feeling.</p></Reveal>
      </div>
      <Reveal className="conversation-card" delay={0.12}>
        <div className="conversation-header"><span className="conversation-avatar">m.</span><div><strong>A little you & me time</strong><span>Some words from your person</span></div><MessageCircle aria-hidden="true" size={18} strokeWidth={1.5} /></div>
        <div className="conversation-body"><span className="chat-date">NO DISTRACTIONS. JUST US.</span><AnimatePresence mode="wait"><motion.div key={finished ? 'done' : step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {finished ? <div className="conversation-finished"><Heart aria-hidden="true" size={32} strokeWidth={1.2} /><h3>Okay, birthday girl.</h3><p>Whatever this year holds, I hope it has more of what makes you feel like yourself. I am so glad I get to love you through a little of it.</p><span className="handwriting">Now, I have 21 things for you.</span><a href="#notes" className="button button-primary">Show me <ArrowRight aria-hidden="true" size={16} /></a><button className="subtle-button" onClick={() => { setFinished(false); setStep(0); setChoice(null) }}>Talk again</button></div> : <>
            <div className="chat-bubble"><p>{conversation.question}</p><span>with love ♡</span></div>
            <div className="chat-choices" aria-label="Choose your reply">{conversation.choices.map((item, i) => <button key={item.text} onClick={() => setChoice(i)} aria-pressed={choice === i} className={choice === i ? 'selected' : ''}>{item.text}{choice === i ? <Check aria-hidden="true" size={15} /> : <ArrowRight aria-hidden="true" size={14} />}</button>)}</div>
            <AnimatePresence mode="wait">{choice !== null && <motion.div key={`${step}-${choice}`} className="chat-answer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-live="polite"><p>{conversation.choices[choice].reply}</p><button className="chat-continue" onClick={() => { if (step === conversations.length - 1) setFinished(true); else setStep(s => s + 1); setChoice(null) }}>{step === conversations.length - 1 ? 'That sounds lovely' : 'Keep talking'}<ArrowRight aria-hidden="true" size={15} /></button></motion.div>}</AnimatePresence>
          </>}
        </motion.div></AnimatePresence></div>
        <div className="conversation-progress"><span>Little conversation {finished ? 3 : step + 1} of 3</span><div>{[0, 1, 2].map(i => <i key={i} className={i <= step ? 'complete' : ''} />)}</div></div>
      </Reveal>
    </div>
    <div className="centered"><NextChapter to="notes">A small something for every year of you</NextChapter></div>
  </section>
}

export function LittleNotes() {
  const [seen, setSeen] = useKeepsake<number[]>('opened-notes', [])
  const [active, setActive] = useState<number | null>(null)
  function open(index: number) {
    setActive(index)
    setSeen(previous => previous.includes(index) ? previous : [...previous, index])
  }
  return <section id="notes" className="notes-section chapter section-space">
    <div className="section-shell notes-layout">
      <div><SectionHeading number="04" eyebrow="A POCKETFUL OF LOVE" title="Twenty-one" italic="little things." text="A thought, a wish, or a small reminder. One for every year of you. Pick a number and see what is waiting." light />
        <Reveal className="notes-count"><span>{String(seen.length).padStart(2, '0')}</span><p>of 21 little notes opened<br /><small>{seen.length === 21 ? 'Every one of them meant for you.' : 'Some things are worth opening slowly.'}</small></p></Reveal>
        <Reveal className="notes-handwriting handwriting">There is a little love<br />behind every number. <span aria-hidden="true">↗</span></Reveal>
      </div>
      <Reveal className="notes-interactive"><div className="notes-grid">{notes.map((_, i) => <button className={`note-door ${seen.includes(i) ? 'opened' : ''} ${active === i ? 'active' : ''}`} key={i} onClick={() => open(i)} aria-label={`Open note ${i + 1}${seen.includes(i) ? ', already read' : ''}`} aria-pressed={active === i}><span>{String(i + 1).padStart(2, '0')}</span>{seen.includes(i) ? <Heart aria-hidden="true" size={12} fill="currentColor" /> : <span className="note-dot" />}</button>)}</div>
        <div className="note-paper" aria-live="polite"><AnimatePresence mode="wait">{active === null ? <motion.div key="waiting" className="note-placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Heart aria-hidden="true" size={24} strokeWidth={1} /><p>Your first little note is waiting.</p><span className="handwriting">Pick any number above.</span></motion.div> : <motion.div key={active} className="opened-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><span className="eyebrow">A LITTLE NOTE · {String(active + 1).padStart(2, '0')} / 21</span><h3>{notes[active][0]}</h3><p>{notes[active][1]}</p><div className="note-signoff"><span className="handwriting">with all my love</span><Button variant="text" onClick={() => open((active + 1) % notes.length)}>One more <ArrowRight aria-hidden="true" size={15} /></Button></div></motion.div>}</AnimatePresence></div>
      </Reveal>
    </div>
    <div className="centered"><NextChapter to="play">A playful little detour?</NextChapter></div>
  </section>
}
