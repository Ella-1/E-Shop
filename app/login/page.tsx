import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/formWrap'
import LoginForm from './loginForm'

const Login = () => {
  return (
    <div>
        <Container>
            <FormWrap>
                <LoginForm />
            </FormWrap>
        </Container>
    </div>
  )
}

export default Login