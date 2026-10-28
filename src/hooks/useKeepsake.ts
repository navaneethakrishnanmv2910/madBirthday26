import { useEffect, useState } from 'react'

export function useKeepsake<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(`madhu-birthday:${key}`)
      return saved ? JSON.parse(saved) as T : initial
    } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(`madhu-birthday:${key}`, JSON.stringify(value)) } catch { /* Private browsing still works. */ }
  }, [key, value])
  return [value, setValue] as const
}
