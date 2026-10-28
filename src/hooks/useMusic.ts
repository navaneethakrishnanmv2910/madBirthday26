import { useEffect, useRef, useState } from 'react'

// An original, quiet music-box pattern. No remote audio or autoplay.
export function useMusic() {
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const context = useRef<AudioContext | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const step = useRef(0)

  async function toggle() {
    try {
      if (!context.current) context.current = new AudioContext()
      if (playing) {
        await context.current.suspend()
        setPlaying(false)
      } else {
        await context.current.resume()
        setPlaying(true)
      }
    } catch { setUnavailable(true); setPlaying(false) }
  }

  useEffect(() => {
    if (!playing) return
    const melody = [523.25, 659.25, 783.99, 659.25, 440, 523.25, 659.25, 523.25, 349.23, 440, 523.25, 659.25, 392, 493.88, 587.33, 493.88]
    function note() {
      const ctx = context.current
      if (!ctx || ctx.state !== 'running') return
      const frequency = melody[step.current++ % melody.length]
      ;[1, 2].forEach((harmonic) => {
        const oscillator = ctx.createOscillator()
        const envelope = ctx.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.value = frequency * harmonic
        envelope.gain.setValueAtTime(0, ctx.currentTime)
        envelope.gain.linearRampToValueAtTime(0.045 / harmonic, ctx.currentTime + 0.025)
        envelope.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.6)
        oscillator.connect(envelope)
        envelope.connect(ctx.destination)
        oscillator.start()
        oscillator.stop(ctx.currentTime + 2.7)
        oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect() }
      })
    }
    note()
    timer.current = setInterval(note, 800)
    return () => clearInterval(timer.current)
  }, [playing])

  useEffect(() => {
    function pauseWhenHidden() {
      if (document.hidden) { void context.current?.suspend(); setPlaying(false) }
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      clearInterval(timer.current)
      void context.current?.close()
    }
  }, [])
  return { playing, toggle, unavailable }
}
