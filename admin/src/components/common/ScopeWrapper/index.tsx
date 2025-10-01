'use client'

import { ReactNode, useState } from 'react'

interface ScopeWrapperProps {
    scopes?: Array<string> | string
    anyScope?: boolean
    fallback?: ReactNode
    children: ReactNode
}

const scopeIgnoreCheck = process.env.NEXT_PUBLIC_SCOPE_IGNORE_CHECK === 'true'

export default function ScopeWrapper({
    scopes,
    anyScope = false,
    fallback = <></>,
    children,
}: ScopeWrapperProps) {
    const [applicationScopes] = useState<Array<string>>([])

    if (scopeIgnoreCheck) return children

    if (scopes) {
        if (typeof scopes === 'string') {
            if (anyScope && applicationScopes.includes(scopes)) {
                return children
            }
            return fallback
        }

        if (anyScope && applicationScopes.some((s) => scopes.includes(s))) {
            return children
        }
        if (!anyScope && applicationScopes.every((s) => scopes.includes(s))) {
            return children
        }
    }
    return fallback
}
