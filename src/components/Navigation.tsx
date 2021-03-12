import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const NavigationLink = styled(NavLink)`
  color: #ccc;
  text-decoration: none;
  margin-right: 30px;
  padding-bottom: 5px;

  &:hover {
    border-bottom: 2px solid #ccc;
  }

  &.active {
    border-bottom: 2px solid #ccc;
  }
`

export default function Navigation() {
  return (
    <Container>
      <NavigationLink to="/main">home</NavigationLink>
      <NavigationLink to="/settings">settings</NavigationLink>
    </Container>
  )
}
