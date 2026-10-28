import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import confetti from 'canvas-confetti'
import { ArrowUp, Check, Download, Heart, RotateCcw, Wind } from 'lucide-react'
import { photos } from '../content'
import { useKeepsake } from '../hooks/useKeepsake'
import { Bow, Button, Reveal, SectionHeading, Star } from './ui'

function Cake({ blown }: { blown: boolean }) {
  return <div className={`cake-scene ${blown ? 'candles-out' : ''}`} aria-label={blown ? 'A birthday cake with the candles blown out' : 'A birthday cake with two glowing number candles, twenty-one'} role="img">
    <div className="cake-glow" /><Star className="cake-star first" /><Star className="cake-star second" />
    <div className="cake"><div className="cake-candles"><div className="number-candle"><span className="flame" /><span className="wick" /><span>2</span></div><div className="number-candle"><span className="flame" /><span className="wick" /><span>1</span></div></div><div className="cake-top"><span /><span /><span /><span /><span /><span /><span /></div><div className="cake-side"><div className="cake-frosting"><i /><i /><i /><i /><i /><i /><i /></div><span className="cake-message handwriting">for Madhu</span><div className="cake-piping" /></div><div className="cake-plate" /></div>
    <span className="cake-caption handwriting">a little cake, a very big wish.</span>
  </div>
}

async function downloadCard() {
  await document.fonts.ready
  const canvas = document.createElement('canvas')
  canvas.width = 1200; canvas.height = 1600
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is unavailable')
  ctx.fillStyle = '#f8f4ed'; ctx.fillRect(0, 0, 1200, 1600)
  ctx.strokeStyle = '#c79b9c'; ctx.lineWidth = 2; ctx.strokeRect(36, 36, 1128, 1528)
  ctx.fillStyle = '#803b4b'; ctx.textAlign = 'center'
  ctx.font = '22px "DM Sans Variable"'; ctx.fillText('TWENTY-ONE, WITH LOVE', 600, 115)
  ctx.font = '90px "Cormorant Garamond"'; ctx.fillText('Happy birthday,', 600, 235)
  ctx.font = 'italic 106px "Cormorant Garamond"'; ctx.fillText('Madhumitha.', 600, 350)
  const photo = new Image(); photo.src = photos[9].src
  await photo.decode()
  ctx.fillStyle = '#fffdfa'; ctx.shadowColor = '#49352c25'; ctx.shadowBlur = 35
  ctx.fillRect(235, 420, 730, 880); ctx.shadowBlur = 0
  const sourceRatio = photo.width / photo.height
  const targetRatio = 670 / 740
  const cropW = sourceRatio > targetRatio ? photo.height * targetRatio : photo.width
  const cropH = sourceRatio > targetRatio ? photo.height : photo.width / targetRatio
  ctx.drawImage(photo, (photo.width - cropW) / 2, (photo.height - cropH) / 2, cropW, cropH, 265, 450, 670, 740)
  ctx.fillStyle = '#803b4b'; ctx.font = '44px "Dancing Script"'; ctx.fillText('my favourite person. always.', 600, 1255)
  ctx.font = '41px "Cormorant Garamond"'; ctx.fillText('Four years of us. And I still choose you.', 600, 1405)
  ctx.font = '24px "DM Sans Variable"'; ctx.fillText('LOVE YOU SO MUCH, PONDATII.', 600, 1485)
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('Could not create card')
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a'); link.href = url; link.download = 'For-Madhumitha-with-love.png'; link.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function Finale() {
  const [blown, setBlown] = useState(false)
  const [hold, setHold] = useState(0)
  const [wish, setWish] = useKeepsake<string>('birthday-wish', '')
  const [draft, setDraft] = useState(wish)
  const [editing, setEditing] = useState(!wish)
  const [saving, setSaving] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const frame = useRef<number | undefined>(undefined)
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const celebrating = useRef(false)
  const reduced = useReducedMotion()
  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); clearTimeout(celebrationTimer.current) }, [])

  function celebrate() {
    if (celebrating.current) return
    celebrating.current = true
    if (frame.current) cancelAnimationFrame(frame.current)
    setHold(0); setBlown(true)
    if (!reduced) {
      const options = { colors: ['#8c4255', '#c89794', '#e5bc7a', '#f5e5d3', '#829084'], disableForReducedMotion: true, zIndex: 120, ticks: 220, gravity: 0.85 }
      void confetti({ ...options, particleCount: 85, spread: 75, origin: { x: 0.2, y: 0.65 }, angle: 60 })
      void confetti({ ...options, particleCount: 85, spread: 75, origin: { x: 0.8, y: 0.65 }, angle: 120 })
      celebrationTimer.current = setTimeout(() => { void confetti({ ...options, particleCount: 60, spread: 100, origin: { y: 0.55 } }) }, 650)
    }
  }
  function startHold() {
    if (blown || frame.current) return
    const start = performance.now()
    const animate = (time: number) => {
      const progress = Math.min(1, (time - start) / 1600)
      setHold(progress)
      if (progress === 1) { frame.current = undefined; celebrate() }
      else frame.current = requestAnimationFrame(animate)
    }
    frame.current = requestAnimationFrame(animate)
  }
  function stopHold() { if (frame.current) cancelAnimationFrame(frame.current); frame.current = undefined; setHold(0) }

  return <section id="wish" className="finale-section chapter section-space">
    <div className="section-shell centered"><SectionHeading number="07" eyebrow="THIS MOMENT IS YOURS" title="Close your eyes." italic="Make a little wish." text="Something for you. Something you really want. You do not have to tell anyone." />
      <Reveal><Cake blown={blown} /></Reveal>
      <AnimatePresence mode="wait">{!blown ? <motion.div key="candles" className="candle-controls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button className="button button-primary hold-button" style={{ '--hold': `${hold * 100}%` } as React.CSSProperties} onPointerDown={e => { if (e.button !== 0) return; e.currentTarget.setPointerCapture(e.pointerId); startHold() }} onPointerUp={stopHold} onPointerCancel={stopHold} onLostPointerCapture={stopHold} onBlur={stopHold} onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) startHold() } }} onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); stopHold() } }}><Wind aria-hidden="true" size={19} /><span>{hold > 0 ? 'A little more…' : 'Hold to blow out the candles'}</span></button>
        <button className="subtle-button candle-alternative" onClick={celebrate}>Or tap here to make your wish</button><p className="handwriting">Ready when you are, birthday girl.</p>
      </motion.div> : <motion.div key="celebration" className="celebration" initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <div className="celebration-title" aria-live="polite"><span className="eyebrow">THE WORLD IS LOVELIER WITH YOU IN IT</span><h2>Happy 21st birthday,<br /><em>Madhumitha.</em></h2><Bow /><p>Love you so much, dear.<br />Innum neraya birthdays, innum neraya namma.</p><span className="handwriting">Today is yours. My love is, too.</span></div>
        <div className="wish-note">{editing ? <form onSubmit={e => { e.preventDefault(); if (!draft.trim()) return; setWish(draft.trim()); setEditing(false) }}><label htmlFor="birthday-wish">A little wish to keep?</label><p>Just for you. Saved only in this browser.</p><textarea id="birthday-wish" value={draft} onChange={e => setDraft(e.target.value)} placeholder="This year, I hope…" maxLength={500} rows={3} /><Button variant="soft" type="submit" disabled={!draft.trim()}><Heart aria-hidden="true" size={14} />Tuck my wish away</Button></form> : <div className="saved-wish" aria-live="polite"><span className="eyebrow"><Check aria-hidden="true" size={14} />YOUR LITTLE WISH, KEPT SAFE HERE</span><blockquote>{wish}</blockquote><button className="subtle-button" onClick={() => { setDraft(wish); setEditing(true) }}>Let me change it</button><button className="subtle-button" onClick={() => { setWish(''); setDraft(''); setEditing(true) }}>Let this wish go</button></div>}</div>
        <div className="keepsake-actions"><Button onClick={() => { setSaving(true); setDownloadError(''); void downloadCard().catch(() => setDownloadError('The card could not be saved. Please try again.')).finally(() => setSaving(false)) }} disabled={saving}><Download aria-hidden="true" size={16} />{saving ? 'Wrapping up your card…' : 'Keep a little birthday card'}</Button><button className="subtle-button" onClick={() => { stopHold(); clearTimeout(celebrationTimer.current); celebrating.current = false; setBlown(false) }}><RotateCcw aria-hidden="true" size={14} />One more wish?</button></div>{downloadError && <p role="alert">{downloadError}</p>}
      </motion.div>}</AnimatePresence>
      <div className="final-dedication"><Heart aria-hidden="true" size={19} strokeWidth={1.2} /><p>Four years. So many moments.<br /><em>Still you.</em></p><a href="#hello" className="next-chapter">Let us do that again <ArrowUp aria-hidden="true" size={15} /></a></div>
    </div>
  </section>
}
