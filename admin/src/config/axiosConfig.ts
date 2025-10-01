'use client'

import axios from 'axios'
import { useRouter } from 'next/router'

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (typeof window !== 'undefined') {
            const router = useRouter()

            if (error.response) {
                const { status } = error.response

                switch (status) {
                    case 401:
                        router.push('/signIn')
                        break
                    case 403:
                        router.push('/403')
                        break
                    case 404:
                        router.replace('/not-found')
                        break
                    default:
                        router.push('/signIn')
                        break
                }
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
