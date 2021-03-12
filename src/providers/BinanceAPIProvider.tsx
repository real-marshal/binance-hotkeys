import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { BinanceAPIContext, StoreContext } from '../common/contexts'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface BinanceAPIProviderProps {
  children: ReactNode
}

export enum BinanceRequestType {
  Req = 'req',
  Res = 'res',
  Err = 'err'
}

export enum BinanceEndpointType {
  Main = 'main',
  Test = 'test'
}

export enum BinanceSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum BinanceOrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP = 'STOP',
  STOP_MARKET = 'STOP_MARKET',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_MARKET = 'TAKE_PROFIT_MARKET',
  TRAILING_STOP_MARKET = 'TRAILING_STOP_MARKET'
}

export interface BinanceRequest {
  type: BinanceRequestType
  symbol: string
  side: BinanceSide
  orderType: BinanceOrderType
  timestamp: number
  price?: number
  quantity?: number
}

const urlsMap: Record<BinanceEndpointType, string> = {
  [BinanceEndpointType.Main]: 'https://fapi.binance.com',
  [BinanceEndpointType.Test]: 'https://testnet.binancefuture.com'
}

export default function BinanceAPIProvider({
  children
}: BinanceAPIProviderProps) {
  const { store, setStoreValue } = useContext(StoreContext) as StoreContext
  const { apiKey, secretKey, endpointType } = store

  const [requests, setRequests] = useState<BinanceRequest[]>([])

  const binanceAxios = useMemo(
    () =>
      axios.create({
        baseURL: urlsMap[endpointType],
        headers: { 'X-MBX-APIKEY': apiKey }
      }),
    [apiKey, endpointType]
  )

  const sendRequest = useCallback(
    async (request: AxiosRequestConfig): Promise<AxiosResponse> => {
      const { symbol, side, orderType, timestamp, price, quantity } =
        request.params || {}

      const requestData = {
        symbol,
        side,
        orderType,
        timestamp,
        price,
        quantity
      }

      setRequests([
        ...requests,
        { type: BinanceRequestType.Req, ...requestData }
      ])

      let response: AxiosResponse
      try {
        response = await binanceAxios.request(request)
        setRequests([
          ...requests,
          { type: BinanceRequestType.Res, ...requestData }
        ])
        return response
      } catch (err) {
        setRequests([
          ...requests,
          { type: BinanceRequestType.Err, ...requestData }
        ])
        throw err
      }
    },
    [binanceAxios, requests]
  )

  const ping = useCallback(
    () => sendRequest({ method: 'GET', url: '/fapi/v1/ping' }),
    [sendRequest]
  )

  return (
    <BinanceAPIContext.Provider value={{ ping }}>
      {children}
    </BinanceAPIContext.Provider>
  )
}
