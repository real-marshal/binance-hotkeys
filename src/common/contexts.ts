import { AxiosResponse } from 'axios'
import { createContext } from 'react'
import { HotkeyData } from '../hooks/useHotkeys'
import {
  BinanceEndpointType,
  BinanceRequest
} from '../providers/BinanceAPIProvider'

export interface BinanceHotkeyData extends Pick<HotkeyData, 'id' | 'key'> {
  requestData: BinanceRequest
}

export interface StoreData {
  apiKey: string
  secretKey: string
  endpointType: BinanceEndpointType
  symbol: string
  hotkeys: BinanceHotkeyData[]
}

export interface StoreContext {
  store: StoreData
  setStoreValue: <K extends keyof StoreData>(
    key: K,
    value: StoreData[K]
  ) => void
  setStoreValues: (values: Partial<StoreData>) => void
}

export interface BinanceAPIContext {
  ping: () => Promise<AxiosResponse>
}

export const StoreContext = createContext<StoreContext | null>(null)
export const BinanceAPIContext = createContext<BinanceAPIContext | null>(null)
