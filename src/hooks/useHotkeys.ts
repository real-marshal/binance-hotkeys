import { useCallback, useEffect, useState } from 'react'
import { Optional } from '../common/utils'
import { v4 as uuidv4 } from 'uuid'

export interface HotkeyData {
  id: string
  key: string
  handler: () => unknown
}

export default function useHotkeys(
  node?: HTMLElement,
  defaultHotkeys: HotkeyData[] = []
) {
  const [hotkeys, setHotkeys] = useState(defaultHotkeys)

  const eventListener = useCallback(
    (e: KeyboardEvent) => {
      hotkeys.forEach(({ key, handler }) => e.key === key && handler())
    },
    [hotkeys]
  )

  const set = useCallback(
    (hotkeyData: Optional<HotkeyData, 'id'>) => {
      const { id = uuidv4() } = hotkeyData

      setHotkeys([...hotkeys, { ...hotkeyData, id }])
    },
    [setHotkeys, hotkeys]
  )

  const unset = useCallback(
    (id: string) => {
      setHotkeys(hotkeys.filter((hotkey) => hotkey.id !== id))
    },
    [setHotkeys, hotkeys]
  )

  useEffect(() => {
    node?.addEventListener('keypress', eventListener)

    return node?.removeEventListener('keypress', eventListener)
  }, [node, eventListener])

  return { set, unset, hotkeys }
}
