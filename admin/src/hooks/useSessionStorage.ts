'use client'

import { useDeferredValue, useSyncExternalStore } from 'react'

type SetValue<T> = T | ((val: T) => T)

export default function useSessionStorage<T>(
    key: string,
    initialValue: T
): [T, (value: SetValue<T>) => void] {
    const item = useSyncExternalStore(
        storageSubscribe,
        () => storageSnapshot(key),
        () => JSON.stringify(initialValue)
    )
    const storedItem = useDeferredValue(
        !item ? initialValue : item.startsWith('"') ? JSON.parse(item) : item
    )
    const setItem = (value: SetValue<T>) => {
        const newValue = value instanceof Function ? value(storedItem) : value
        sessionStorage.setItem(key, JSON.stringify(newValue))
        window.dispatchEvent(new StorageEvent('storage'))
    }
    return [storedItem, setItem]
}

function storageSubscribe(callback: () => void) {
    window.addEventListener('storage', callback)
    return () => {
        window.removeEventListener('storage', callback)
    }
}

function storageSnapshot(key: string) {
    return sessionStorage.getItem(key)
}
