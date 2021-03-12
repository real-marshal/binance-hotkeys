import React, {
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { StoreContext, StoreData } from '../common/contexts'
import Store from 'electron-store'
import { BinanceEndpointType } from './BinanceAPIProvider'

interface StoreProviderProps {
  password: string
  children: ReactNode
}

enum StoreStateActionType {
  SET_VALUE = 'SET_VALUE',
  SET_VALUES = 'SET_VALUES'
}

interface SetValueAction {
  type: StoreStateActionType.SET_VALUE
  key: string
  value: unknown
}

interface SetValuesAction {
  type: StoreStateActionType.SET_VALUES
  values: Record<string, unknown>
}

type StoreStateAction = SetValueAction | SetValuesAction

const initialStore: StoreData = {
  endpointType: BinanceEndpointType.Test,
  apiKey: '',
  secretKey: ''
}

export default function StoreProvider({
  password,
  children
}: StoreProviderProps) {
  const storeInstance = useMemo(
    () =>
      new Store<StoreData>({
        name: 'store',
        encryptionKey: password,
        defaults: initialStore
      }),
    [password]
  )

  const [storeState, dispatch] = useReducer<
    Reducer<StoreData, StoreStateAction>
  >((state, action) => {
    switch (action.type) {
      case StoreStateActionType.SET_VALUE: {
        return { ...state, [action.key]: action.value }
      }
      case StoreStateActionType.SET_VALUES: {
        return { ...state, ...action.values }
      }
      default: {
        return state
      }
    }
  }, storeInstance.store)

  const setStoreValue = useCallback(
    <K extends keyof StoreData>(key: K, value: StoreData[K]) =>
      dispatch({ type: StoreStateActionType.SET_VALUE, key, value }),
    []
  )

  const setStoreValues = useCallback(
    (values: Partial<StoreData>) =>
      dispatch({ type: StoreStateActionType.SET_VALUES, values }),
    []
  )

  useEffect(() => {
    for (const [key, storeValue] of storeInstance) {
      const stateStoreValue = storeState[key]

      if (stateStoreValue !== storeValue) {
        storeInstance.set(key, stateStoreValue)
      }
    }
  }, [storeState, storeInstance])

  return (
    <StoreContext.Provider
      value={{ store: storeState, setStoreValue, setStoreValues }}
    >
      {children}
    </StoreContext.Provider>
  )
}
