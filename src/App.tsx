import React, { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import MainPage from './pages/MainPage'
import styled from '@emotion/styled'
import TitleBar from './components/TitleBar'
import StoreProvider from './providers/StoreProvider'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import StatusBar from './components/StatusBar'
import BinanceAPIProvider from './providers/BinanceAPIProvider'
import Navigation from './components/Navigation'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 16px);
  color: #ccc;
  font-family: 'Roboto', 'Helvetica', 'sans-serif';

  *::selection {
    background: #aaa;
  }
`

export default function App() {
  const [password, setPassword] = useState('')

  return (
    <HashRouter>
      <Container>
        <TitleBar />
        {password ? (
          <StoreProvider password={password}>
            <BinanceAPIProvider>
              <Navigation />
              <Switch>
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/settings" component={SettingsPage} />
              </Switch>
              <StatusBar />
            </BinanceAPIProvider>
          </StoreProvider>
        ) : (
          <LoginPage setPassword={setPassword} />
        )}
      </Container>
    </HashRouter>
  )
}
