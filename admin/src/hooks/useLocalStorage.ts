import { useEffect, useState } from 'react'

type SetValue<T> = T | ((val: T) => T)

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: SetValue<T>) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : initialValue
            }
            return initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue))
            }
        } catch (error) {
            console.log(error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export default useLocalStorage
