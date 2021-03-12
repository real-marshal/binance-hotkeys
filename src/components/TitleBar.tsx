import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { remote } from 'electron'
import { VscChromeClose } from 'react-icons/vsc'

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  color: white;
  -webkit-user-select: none;
  -webkit-app-region: drag;
`

const Title = styled.span``

const CloseButton = styled(VscChromeClose)`
  position: absolute;
  right: 8px;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  -webkit-app-region: no-drag;

  &:hover {
    background-color: #333;
  }
`

export default function TitleBar() {
  const onClose = useCallback(() => remote.app.quit(), [])

  return (
    <Bar>
      <Title>Binance Hotkeys</Title>
      <CloseButton onClick={onClose} />
    </Bar>
  )
}
