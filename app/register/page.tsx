import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/formWrap'
import RegisterForm from './registerForm'
import { GetCurrentUser } from '@/actions/getCurrentUser'

const RegisterPage = async () => {
  const currentUser = await GetCurrentUser()
  return (
    <div>
        <Container>
            <FormWrap>
                <div>
                <RegisterForm currentUser={currentUser}/>
                </div>
            </FormWrap>
        </Container>
    </div>
  )
}

export default RegisterPage