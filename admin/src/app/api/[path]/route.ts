import { NextRequest, NextResponse } from 'next/server'
import { COMMON } from '@/config/constants'
import axios, { AxiosError } from 'axios'

function extendTokenExpiry(response: NextResponse, token: string) {
    response.cookies.set('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: process.env.TOKEN_EXPIRATION
            ? parseInt(process.env.TOKEN_EXPIRATION, 10)
            : 15 * 60,
    })
}

export async function GET(request: NextRequest) {
    return handleRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
    return handleRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
    return handleRequest(request, 'PUT')
}

export async function DELETE(request: NextRequest) {
    return handleRequest(request, 'DELETE')
}

async function handleRequest(
    request: NextRequest,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
) {
    try {
        const token = request.cookies.get('access_token')?.value
        if (!token) {
            return NextResponse.json(
                { message: 'Login failed' },
                { status: 401 }
            )
        }

        const headers: { 'Content-Type': string; Authorization?: string } = {
            'Content-Type': 'application/json',
        }
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const urlBase = `${COMMON.api.baseUrl}${request.nextUrl.pathname.replace(`/api`, '')}`
        const searchParams = request.nextUrl.searchParams
        const url = searchParams ? `${urlBase}?${searchParams}` : urlBase

        let data
        if (method === 'POST' || method === 'PUT') {
            try {
                data = await request.json()
            } catch (error) {
                console.error('Error parsing request body:', error)
                return NextResponse.json(
                    { success: false, message: 'Invalid JSON body' },
                    { status: 400 }
                )
            }
        }

        let coreApiResponse
        try {
            coreApiResponse = await axios({
                url,
                method,
                headers,
                data,
                responseType: request.url.includes('/export')
                    ? 'arraybuffer'
                    : 'json',
            })
        } catch (axiosError) {
            console.error('Error with core API request:', axiosError)
            return NextResponse.json(
                { success: false, message: 'Error with core API request' },
                {
                    status:
                        (axiosError instanceof AxiosError &&
                            axiosError.response?.status) ||
                        500,
                }
            )
        }

        let nextResponse
        if (request.url.includes('/export')) {
            nextResponse = new NextResponse(coreApiResponse.data, {
                status: coreApiResponse.status,
                headers: {
                    'Content-Type':
                        coreApiResponse.headers['content-type'] ||
                        'application/octet-stream',
                    'Content-Disposition':
                        coreApiResponse.headers['content-disposition'] || '',
                },
            })
        } else {
            nextResponse = NextResponse.json(coreApiResponse.data, {
                status: coreApiResponse.status,
            })
        }

        if (coreApiResponse.status === 200 && token) {
            extendTokenExpiry(nextResponse, token)
        }

        return nextResponse
    } catch (error) {
        console.error('Error in API route:', error)
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal Server Error',
            },
            { status: 500 }
        )
    }
}
