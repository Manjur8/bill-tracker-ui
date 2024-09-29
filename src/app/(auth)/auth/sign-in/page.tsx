import SignIn from '@/features/auth/SignIn'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in page",
};

const SignInPage = () => {
  return (
    <SignIn />
  )
}

export default SignInPage