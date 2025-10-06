import { COMMON } from '@/config/constants'
import { LoginResponse } from '@/types/auth'
import { BaseResponse } from '@/types/base'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const authorizationCode = searchParams.get('code')
    if (!authorizationCode) {
        return NextResponse.json(
            { error: 'Authorization code is missing' },
            { status: 401 }
        )
    }

    try {
        const tokenResponse = await axios.get(
            `${COMMON.api.baseUrl}/v1/authentication/authorized_sso`,
            {
                params: { code: authorizationCode },
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000,
            }
        )
        const tokenData = tokenResponse.data as BaseResponse<LoginResponse>

        const responseHeaders = new Headers()
        responseHeaders.set(
            'Set-Cookie',
            `access_token=${tokenData.data.accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
        )
        const user_name = tokenData.data.username || ''
        const role_name = tokenData.data.rolename || ''

        return NextResponse.redirect(
            new URL(
                `/home?user_name=${encodeURIComponent(user_name)}&role_name=${encodeURIComponent(role_name)}`,
                request.url
            ),
            { headers: responseHeaders }
        )
    } catch (error) {
        console.error('Error handling SSO callback:', error)
        return NextResponse.json(
            {
                error: 'Failed to process SSO callback. Please try again later.',
            },
            { status: 500 }
        )
    }
}
