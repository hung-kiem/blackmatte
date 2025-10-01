import type { Metadata } from 'next'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'
import '@/styles/global.css'
import '@/styles/inter.css'
import '@/styles/style.css'
import '@/styles/dvtt.css'
import { COMMON } from '@/config/constants'
import DefaultLayout from '@/components/common/Layout/DefaultLayout/DefaultLayout'

export const metadata: Metadata = {
    title: {
        template: COMMON.metaData.title.template,
        default: COMMON.metaData.title.default,
    },
    description: COMMON.metaData.description,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <DefaultLayout>{children}</DefaultLayout>
}
