import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { BinanceAPIContext, StoreContext } from '../common/contexts'
import { BiRefresh } from 'react-icons/bi'

enum StatusConnection {
  Connecting,
  Connected,
  Error
}

const statusConnectionMessage: Record<StatusConnection, string> = {
  [StatusConnection.Connecting]: 'Connecting',
  [StatusConnection.Connected]: 'Connected',
  [StatusConnection.Error]: 'Connection Error'
}

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 20px;
  width: calc(100% - 16px);
  position: absolute;
  bottom: 8px;
  font-size: 13px;
`

const EndpointName = styled.span`
  margin-right: 5px;
`
const ConnectionStatus = styled.span<{ statusConnection: StatusConnection }>`
  color: ${(props) =>
    props.statusConnection === StatusConnection.Connecting
      ? 'yellow'
      : props.statusConnection === StatusConnection.Connected
      ? 'green'
      : 'red'};
  margin-right: 5px;
`

const RefreshConnectionStatus = styled(BiRefresh)`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

export default function StatusBar() {
  const {
    store: { endpointType }
  } = useContext(StoreContext) as StoreContext
  const { ping } = useContext(BinanceAPIContext) as BinanceAPIContext

  const [statusConnection, setStatusConnection] = useState<StatusConnection>(
    StatusConnection.Connecting
  )

  const checkConnection = useCallback(async () => {
    setStatusConnection(StatusConnection.Connecting)
    try {
      await ping()
      setStatusConnection(StatusConnection.Connected)
    } catch (err) {
      setStatusConnection(StatusConnection.Error)
    }
  }, [ping])

  useEffect(() => {
    checkConnection()
    // eslint-disable-next-line
  }, [])

  return (
    <Bar>
      <EndpointName>Endpoint Type: {endpointType}</EndpointName>
      <ConnectionStatus statusConnection={statusConnection}>
        {statusConnectionMessage[statusConnection]}
      </ConnectionStatus>
      <RefreshConnectionStatus onClick={checkConnection} />
    </Bar>
  )
}
