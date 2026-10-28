import { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import { photos } from '../content'
import { NextChapter, Reveal, SectionHeading } from './ui'

export function Album() {
  const [selected, setSelected] = useState<number | null>(null)
  const [position, setPosition] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const photo = selected === null ? null : photos[selected]

  function moveTrack(direction: number) {
    const item = track.current?.querySelector('button')
    const width = item?.offsetWidth ?? 300
    const gap = track.current ? parseFloat(getComputedStyle(track.current).gap) : 32
    track.current?.scrollBy({ left: (width + gap) * direction, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return <section id="memories" className="album-section chapter section-space">
    <div className="section-shell album-heading"><SectionHeading number="02" eyebrow="THE THINGS I KEEP" title="Some photos." italic="A lot of feeling." text="Not every picture is perfect. Every one of these is ours. Tap a photograph; I left a little thought behind it." /><Reveal className="album-side-note"><span className="handwriting">a tiny album of<br />my favourite person</span><span className="album-arrow" aria-hidden="true">⤵</span></Reveal></div>
    <div className="album-track" ref={track} onScroll={() => {
      if (!track.current) return
      const width = track.current.querySelector('button')?.offsetWidth ?? 300
      const gap = parseFloat(getComputedStyle(track.current).gap)
      setPosition(Math.min(photos.length - 1, Math.round(track.current.scrollLeft / (width + gap))))
      setAtEnd(track.current.scrollLeft + track.current.clientWidth >= track.current.scrollWidth - 3)
    }}>{photos.map((photo, i) => <button className="album-photo" key={photo.id} onClick={event => { opener.current = event.currentTarget; setSelected(i) }} style={{ '--tilt': `${i % 2 === 0 ? -3 : 3}deg` } as React.CSSProperties} aria-label={`Open photo ${i + 1}: ${photo.title}`}>
      <span className="album-image"><img src={photo.src} alt={photo.alt} loading="lazy" width="400" height="500" /><span className="photo-open"><Plus aria-hidden="true" size={19} /></span></span><span className="photo-number">NO. {String(i + 1).padStart(2, '0')}</span><span className="photo-caption handwriting">{photo.title}</span>
    </button>)}</div>
    <div className="album-controls section-shell"><span className="eyebrow">{String(position + 1).padStart(2, '0')} <span className="muted">/ 12 LITTLE KEEPSAKES</span></span><div className="flex items-center gap-3"><span className="swipe-hint">Swipe to wander</span><button className="icon-button" aria-label="Scroll to previous photos" onClick={() => moveTrack(-1)} disabled={position === 0}><ArrowLeft aria-hidden="true" size={19} /></button><button className="icon-button" aria-label="Scroll to next photos" onClick={() => moveTrack(1)} disabled={atEnd}><ArrowRight aria-hidden="true" size={19} /></button></div></div>
    <div className="centered"><NextChapter to="us">And then, there is us</NextChapter></div>
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null) }}><Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className="photo-dialog" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }) }} onKeyDown={e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); setSelected(i => ((i ?? 0) + 1) % photos.length) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setSelected(i => ((i ?? 0) + photos.length - 1) % photos.length) }
    }}>
      <Dialog.Close className="icon-button modal-close" aria-label="Close photo"><X aria-hidden="true" size={21} /></Dialog.Close>
      {photo && <><AnimatePresence mode="wait"><motion.div key={photo.id} className="lightbox-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}><img src={photo.src} alt={photo.alt} /></motion.div></AnimatePresence><div className="photo-story"><span className="eyebrow">{photo.tag}</span><Dialog.Title>{photo.title}</Dialog.Title><Dialog.Description>{photo.note}</Dialog.Description><div className="lightbox-controls"><button className="icon-button" aria-label="Previous photo" onClick={() => setSelected(i => ((i ?? 0) + photos.length - 1) % photos.length)}><ArrowLeft aria-hidden="true" size={18} /></button><span>{String((selected ?? 0) + 1).padStart(2, '0')} / 12</span><button className="icon-button" aria-label="Next photo" onClick={() => setSelected(i => ((i ?? 0) + 1) % photos.length)}><ArrowRight aria-hidden="true" size={18} /></button></div></div></>}
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </section>
}
