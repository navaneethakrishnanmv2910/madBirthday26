import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react'
import clsx from 'clsx'

export function Reveal({ children, className, delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} style={style} initial={{ opacity: 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function Button({ children, className, variant = 'primary', ...props }: ComponentProps<'button'> & { variant?: 'primary' | 'soft' | 'text' }) {
  return <button className={clsx('button', `button-${variant}`, className)} {...props}>{children}</button>
}

export function NextChapter({ to, children }: { to: string; children: ReactNode }) {
  return <a className="next-chapter" href={`#${to}`}>{children}<ArrowDown size={15} aria-hidden="true" /></a>
}

export function SectionHeading({ number, eyebrow, title, italic, text, light = false }: { number: string; eyebrow: string; title: string; italic?: string; text?: string; light?: boolean }) {
  return <Reveal className={clsx('section-heading', light && 'light')}>
    <p className="eyebrow"><span>{number}</span><span className="eyebrow-line" />{eyebrow}</p>
    <h2>{title}{italic && <><br /><em>{italic}</em></>}</h2>
    {text && <p className="section-description">{text}</p>}
  </Reveal>
}

export function Star({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={`drawn-star ${className}`} style={style}><path d="M20 2c1 12 5 16 18 18-13 1-17 5-18 18C18 25 14 21 2 20 14 18 18 14 20 2Z" stroke="currentColor" strokeWidth="1.3" /><path d="m20 10 1 10-1 10-1-10 1-10Z" fill="currentColor" /></svg>
}

export function Bow({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 140 100" className={`drawn-bow ${className}`} fill="none"><path d="M69 45C48 13 3 4 15 31c7 17 39 21 54 14Zm2 0C90 12 137 4 125 31c-8 18-39 21-54 14ZM67 47c-4 20-17 34-28 43m34-43c6 20 18 32 30 40M62 42c0-7 16-9 16 1 0 11-17 12-16-1Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
}

export function TinyHeart({ filled = false }: { filled?: boolean }) {
  return <Heart aria-hidden="true" size={15} strokeWidth={1.4} fill={filled ? 'currentColor' : 'none'} />
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="text-link">{children}<ArrowUpRight size={17} aria-hidden="true" /></a>
}
