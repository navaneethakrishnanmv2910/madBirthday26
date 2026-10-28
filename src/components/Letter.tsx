import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, Heart } from 'lucide-react'
import { letterParagraphs, photos } from '../content'
import { Bow, Button, NextChapter, Reveal, SectionHeading } from './ui'

export function Letter() {
  const [open, setOpen] = useState(false)
  function saveLetter() {
    const text = `For Madhumitha, on your 21st birthday\n\nMy dearest Pondatii,\n\n${letterParagraphs.join('\n\n')}\n\nWith love, always.\nYour person. ♡`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = 'A-letter-for-Madhumitha.txt'; anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <section id="letter" className="letter-section chapter section-space">
    <div className="section-shell"><SectionHeading number="06" eyebrow="FROM MY HEART, IN MY OWN WAY" title="A letter for you." italic="Only you." text="There are things I do not want to leave unsaid. So I put them here, where you can keep them." />
      <AnimatePresence mode="wait">{!open ? <motion.div key="envelope" className="envelope-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.45 }}><Reveal><button className="envelope" onClick={() => setOpen(true)} aria-label="Break the seal and open your letter" aria-expanded={false}>
        <span className="envelope-note handwriting">to my Madhumitha,</span><span className="envelope-fold left" /><span className="envelope-fold right" /><span className="envelope-flap" /><span className="wax-seal"><Heart aria-hidden="true" size={27} strokeWidth={1.2} /></span><span className="envelope-bottom">SOME WORDS I SAVED FOR YOU</span>
      </button><p className="envelope-instruction handwriting">Go on. Break the little seal. ↗</p></Reveal><Bow className="envelope-bow" /></motion.div> : <motion.div key="letter" className="opened-letter-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65 }}>
        <aside className="letter-margin"><div className="letter-portrait"><img src={photos[11].src} alt={photos[11].alt} loading="lazy" /><span className="handwriting">for this girl. always.</span><span className="tape" /></div><p>TWENTY-ONE YEARS OF YOU.<br />FOUR YEARS OF US.</p><Bow /></aside>
        <article className="letter-paper" aria-label="Your birthday letter"><div className="letter-paper-header"><span className="eyebrow">A LITTLE BIRTHDAY LETTER</span><Heart aria-hidden="true" size={16} strokeWidth={1.2} /></div><h3 className="handwriting">My dearest Pondatii,</h3>{letterParagraphs.map((paragraph, i) => <Reveal key={i}><p>{paragraph}</p></Reveal>)}<div className="letter-signature"><p>With love, always.</p><span className="handwriting">Your person. ♡</span></div><div className="letter-download"><Button variant="text" onClick={saveLetter}><Download aria-hidden="true" size={15} />Keep this letter</Button></div></article>
      </motion.div>}</AnimatePresence>
      <div className="centered"><NextChapter to="wish">And now… the birthday part</NextChapter></div>
    </div>
  </section>
}
