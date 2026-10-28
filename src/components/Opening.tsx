import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react'
import { photos } from '../content'
import { Bow, NextChapter, Reveal, Star } from './ui'

export function Hero() {
  return <section id="hello" className="hero chapter">
    <div className="hero-topline"><span>THE BIRTHDAY EDITION</span><span>FOR MADHUMITHA, WITH LOVE</span><span className="hero-edition">VOL. 21</span></div>
    <div className="hero-content">
      <div className="hero-copy">
        <Reveal><p className="hero-note handwriting">Psst… this little corner is yours.</p></Reveal>
        <Reveal delay={0.12}><h1>Hi,<br /><span>Pondatii<svg viewBox="0 0 580 27" aria-hidden="true"><path d="M5 18C143 2 386 2 572 12M62 24c137-11 291-14 440-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span><span className="title-period">.</span></h1></Reveal>
        <Reveal delay={0.22}><p className="hero-description">Four years of us.<br />And I would still choose <em>you.</em></p></Reveal>
        <Reveal delay={0.32} className="hero-invitation"><a href="#today" className="button button-primary">I made you something <ArrowUpRight aria-hidden="true" size={18} /></a><p>Take five minutes. Stay a little longer.</p></Reveal>
      </div>
      <div className="hero-scrapbook" aria-label="A little collection of us">
        <Star className="hero-star one" /><Star className="hero-star two" />
        <motion.div className="hero-polaroid main-polaroid" initial={{ opacity: 0, y: 35, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 6 }} transition={{ duration: 1.2, delay: 0.25 }} whileHover={{ rotate: 3, y: -6 }}>
          <div className="tape" /><img src={photos[9].src} alt={photos[9].alt} fetchPriority="high" width="1200" height="1600" /><p className="handwriting">the birthday girl ♡</p>
        </motion.div>
        <motion.div className="hero-polaroid couple-polaroid" initial={{ opacity: 0, y: 45, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -10 }} transition={{ duration: 1.1, delay: 0.45 }} whileHover={{ rotate: -6, y: -6 }}>
          <img src={photos[0].src} alt={photos[0].alt} width="720" height="1280" /><p className="handwriting">my favourite us.</p>
        </motion.div>
        <div className="birthday-stamp"><span>HAPPY</span><strong>21</strong><span>MY LOVE</span></div>
        <Bow className="hero-bow" />
        <p className="scrapbook-caption handwriting">of all the people,<br />I am glad it is you.</p>
      </div>
    </div>
    <div className="hero-bottom"><span><Heart aria-hidden="true" size={13} strokeWidth={1.3} /> MADE FOR ONE PERSON. MY FAVOURITE ONE.</span><a href="#today">a little love, a little scroll <ArrowDown aria-hidden="true" size={15} /></a></div>
  </section>
}

export function BirthdayReveal() {
  const cards = [
    { overline: 'FIRST, A LITTLE REMINDER', top: 'Innaiku romba', bottom: 'specialana day.', foot: 'And I think you know why…', className: 'reminder-card' },
    { overline: 'BECAUSE, TODAY IS', top: 'En alaga chellathuku', bottom: 'birthday.', foot: 'A whole day to celebrate you.', className: 'birthday-card' },
    { overline: 'A NEW CHAPTER BEGINS', top: 'Twenty-one.', bottom: 'Beautifully you.', foot: 'So much life ahead. So much love, right here.', className: 'age-card' },
  ]
  return <section id="today" className="birthday-reveal chapter section-space">
    <Reveal className="center-intro"><span className="eyebrow">01 LITTLE REASON TO CELEBRATE</span><p className="handwriting">Actually, a very big reason.</p><Star /></Reveal>
    <div className="reveal-cards">{cards.map((card, i) => <Reveal key={card.className} className={`reveal-card ${card.className}`} delay={i * 0.08}>
      <span className="card-corner">0{i + 1}</span><span className="eyebrow">{card.overline}</span>
      {i === 1 && <Bow className="card-bow" />}{i === 2 && <span className="card-age" aria-hidden="true">21</span>}
      <h2>{card.top}<br /><em>{card.bottom}</em></h2><p>{card.foot}</p><Heart aria-hidden="true" className="card-heart" size={22} strokeWidth={1} />
    </Reveal>)}</div>
    <Reveal className="centered"><p className="birthday-postscript">Before the candles, before the wishes…<br />let us spend a little time with <em>us.</em></p><NextChapter to="memories">A few moments I kept</NextChapter></Reveal>
  </section>
}
