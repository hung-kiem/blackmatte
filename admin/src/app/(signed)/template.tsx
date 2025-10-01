'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import classNames from 'classnames'
import useSidebar from '@/hooks/useSidebar'

export default function Template({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true)
    const { collapsed } = useSidebar()

    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, [])

    return (
        <div
            className={classNames(
                'relative z-9999 flex flex-1 flex-col duration-300 ease-linear',
                {
                    'ml-0': collapsed,
                    'ml-70': !collapsed,
                }
            )}
        >
            <main>
                <div className="mx-auto p-4">
                    {loading && <Loader partial />}
                    {!loading && children}
                </div>
            </main>
        </div>
    )
}
