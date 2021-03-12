import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input } from '../components/Atoms'

interface LoginPageProps {
  setPassword: (password: string) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
`

const Header = styled.span`
  font-size: 16px;
`

const Description = styled.span`
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
`

const PasswordInput = styled(Input)`
  margin-top: 10px;
`

const SubmitButton = styled(Button)`
  margin-left: 10px;
`

export default function LoginPage({ setPassword }: LoginPageProps) {
  const [passwordInput, setPasswordInput] = useState('')
  const history = useHistory()

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPasswordInput(e.target.value),
    [setPasswordInput]
  )
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      if (!passwordInput) return

      e.preventDefault()
      setPassword(passwordInput)
      history.push('/main')
    },
    [setPassword, passwordInput, history]
  )

  return (
    <Container>
      <LoginForm>
        <Header>Enter the password</Header>
        <Description>
          It is gonna be used to encrypt your API keys. If the password is
          incorrect the storage will be empty.
        </Description>
        <form onSubmit={onSubmit}>
          <PasswordInput
            type="password"
            value={passwordInput}
            onChange={onPasswordChange}
          />
          <SubmitButton type="submit">OK</SubmitButton>
        </form>
      </LoginForm>
    </Container>
  )
}
