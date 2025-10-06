import { useState, useEffect } from 'react'

const useTheme = (className: string) => {
    const [hasClassName, setHasClassName] = useState(() => {
        return document.body.classList.contains(className)
    })

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setHasClassName(document.body.classList.contains(className))
        })

        observer.observe(document.body, { attributes: true })

        return () => observer.disconnect()
    }, [className])

    return hasClassName
}

export default useTheme
