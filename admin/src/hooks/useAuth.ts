import useSWR from 'swr'
import { useState } from 'react'
import {
    getMenuItems,
    getUserInfo,
    signOut as signOutService,
} from '@/services/authService'

const useAuth = () => {
    const [loading, setLoading] = useState(false)

    const { data: menuItems } = useSWR('/api/getMenuItems', getMenuItems)

    const {
        data: userInfo,
        error,
        mutate,
    } = useSWR('/api/getUserInfo', getUserInfo, {
        revalidateOnFocus: false,
        dedupingInterval: 15000, // Cache 15 phút
    })

    const signOut = async () => {
        try {
            setLoading(true)
            await signOutService()
        } catch (error) {
            console.error('Sign out failed:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        userInfo,
        loading,
        isError: error,
        signOut,
        mutateUserInfo: mutate,
        menuItems: menuItems?.menuItems,
    }
}

export default useAuth
