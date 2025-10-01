'use client'

import React from 'react'
import Image from 'next/image'
import { COMMON } from '@/config/constants'

const SignInPage = () => {
    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url =
            `${COMMON.signIn.ssoUrl}/auth/realms/${COMMON.signIn.ssoRealm}` +
            `/protocol/openid-connect/auth?client_id=${COMMON.signIn.ssoClientId}&` +
            `redirect_uri=${COMMON.signIn.ssoRedirectUri}&response_type=code`
        window.location.href = url
    }

    return (
        <form
            onSubmit={handleSignIn}
            className="bg-gray-50 flex h-screen flex-wrap items-center justify-center"
        >
            <div className="relative z-10 mx-auto w-full max-w-md rounded-lg bg-white bg-opacity-90 px-6 py-8 shadow-lg">
                <div className="text-center">
                    <div className="mb-6 flex justify-center">
                        <Image
                            src={'/images/logo/logo.svg'}
                            alt="VNPAY Logo"
                            width={210}
                            height={70}
                            priority
                        />
                    </div>
                    <p className="text-gray-700 text-lg font-semibold">
                        {COMMON.signIn.description}
                    </p>
                    <button
                        type="submit"
                        className="mt-8 w-full max-w-xs rounded-lg bg-primary px-6 py-3 text-white hover:bg-opacity-90"
                    >
                        Sign in with SSO
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SignInPage
