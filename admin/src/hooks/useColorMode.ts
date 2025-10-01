'use client'

import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

type ColorMode = 'light' | 'dark'

const useColorMode = (): [ColorMode, (value: ColorMode) => void] => {
    const [colorMode, setColorMode] = useLocalStorage<ColorMode>(
        'color-theme',
        'light'
    )

    useEffect(() => {
        const className = 'dark'
        const bodyClass = window.document.body.classList

        if (colorMode === 'dark') {
            bodyClass.add(className)
        } else {
            bodyClass.remove(className)
        }
    }, [colorMode])
    return [colorMode, setColorMode]
}

export default useColorMode
