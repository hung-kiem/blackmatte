'use client'

import React from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
    const router = useRouter()

    const goHome = () => {
        router.push('/home')
    }

    return (
        <div className="bg-gray-100 flex h-screen flex-col items-center justify-center p-5 text-center">
            <h1 className="mb-4 text-4xl font-bold">
                404 - Không tìm thấy trang
            </h1>
            <p className="mb-6 text-lg">
                Rất tiếc, trang bạn đang tìm kiếm không tồn tại.
            </p>
            <button
                className="rounded bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
                onClick={goHome}
            >
                Về trang chủ
            </button>
        </div>
    )
}

export default NotFound
