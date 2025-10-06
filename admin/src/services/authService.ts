import API_PATHS from '@/config/apiPaths'
import axiosInstance from '@/config/axiosConfig'
import { fetcher } from '@/config/fetcher'
import { GetMenuItemResponse, UserInformation } from '@/types/auth'

export const getUserInfo = async (): Promise<UserInformation> => {
    return fetcher<UserInformation>(API_PATHS.AUTH.GET_USER_INFO, 'GET')
}

export const getMenuItems = async (): Promise<GetMenuItemResponse> => {
    return fetcher<GetMenuItemResponse>(API_PATHS.AUTH.GET_MENU_ITEMS, 'GET')
}

export const signOut = async (): Promise<void> => {
    await axiosInstance.post(API_PATHS.AUTH.SIGN_OUT)
}
