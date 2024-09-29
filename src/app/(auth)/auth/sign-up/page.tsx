import SignUp from '@/features/auth/SignUp'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page",
};

const SignUpPage = () => {
  return (
    <SignUp />
  )
}

export default SignUpPage