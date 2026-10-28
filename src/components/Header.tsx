import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, Menu, Volume2, VolumeX, X } from 'lucide-react'
import { chapters } from '../content'
import { useMusic } from '../hooks/useMusic'
import { TinyHeart } from './ui'

export function Header() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const { playing, toggle, unavailable } = useMusic()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(chapters.findIndex(c => c.id === entry.target.id))
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    chapters.forEach(chapter => {
      const element = document.getElementById(chapter.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return <>
    <a href="#main" className="skip-link">Skip to the birthday story</a>
    <header className="site-header">
      <a href="#hello" className="wordmark" aria-label="For Madhumitha, back to the beginning">m<span>.</span><TinyHeart /></a>
      <span className="header-dedication">a little world, just for you</span>
      <div className="header-actions">
        <button className="sound-button" onClick={() => void toggle()} aria-pressed={playing} disabled={unavailable} title={unavailable ? 'Sound is not supported by this browser' : 'A little music-box melody'}>
          {playing ? <Volume2 aria-hidden="true" size={16} /> : <VolumeX aria-hidden="true" size={16} />}<span>{unavailable ? 'Sound unavailable' : playing ? 'Sound on' : 'Sound off'}</span>
          {playing && <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>}
        </button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild><button className="chapter-toggle" aria-label="Open chapters"><span>{String(active + 1).padStart(2, '0')} <span className="muted">/ 08</span></span><Menu aria-hidden="true" size={18} /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="modal-overlay" />
            <Dialog.Content className="chapter-drawer">
              <div className="flex items-center justify-between"><span className="eyebrow">YOUR LITTLE BIRTHDAY BOOK</span><Dialog.Close className="icon-button" aria-label="Close chapters"><X aria-hidden="true" size={22} /></Dialog.Close></div>
              <Dialog.Title>A few pages.<br /><em>All for you.</em></Dialog.Title>
              <Dialog.Description className="drawer-description">Wander at your own pace. You can always come back.</Dialog.Description>
              <nav aria-label="Birthday chapters">{chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => setOpen(false)} aria-current={i === active ? 'location' : undefined}>
                <span className="chapter-index">0{i + 1}</span><span><strong>{chapter.name}</strong><small>{chapter.hint}</small></span><ArrowUpRight aria-hidden="true" size={18} />
              </a>)}</nav>
              <p className="handwriting drawer-footer">Take your time, Pondatii. ♡</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
    </header>
    <nav className="chapter-rail" aria-label="Quick chapter navigation">{chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id} aria-label={chapter.name} aria-current={active === index ? 'location' : undefined}><span>{chapter.name}</span><i /></a>)}</nav>
  </>
}
