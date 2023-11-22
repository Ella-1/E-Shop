import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/formWrap'
import LoginForm from './loginForm'
import { GetCurrentUser } from '@/actions/getCurrentUser'

const Login = async () => {

  const currentUser = await GetCurrentUser()

  return (
    <div>
        <Container>
            <FormWrap>
                <LoginForm  currentUser={currentUser}/> 
            </FormWrap>
        </Container>
    </div>
  )
}

export default Login