import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/formWrap'
import RegisterForm from './registerForm'

const RegisterPage = () => {
  return (
    <div>
        <Container>
            <FormWrap>
                <div>
                <RegisterForm />
                </div>
            </FormWrap>
        </Container>
    </div>
  )
}

export default RegisterPage