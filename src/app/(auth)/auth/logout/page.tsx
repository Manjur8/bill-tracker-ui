"use client";
import { APICall } from '@/utils/ApiCall';
import { deleteCookies } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            APICall('delete', 'USERS_SIGNOUT');
            await deleteCookies('auth-token');
            router.push('/auth/sign-in');
        }
        logout()
    }, [router]);

  return (
    <div>Logging out...</div>
  )
}

export default Logout