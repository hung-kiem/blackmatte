import axiosInstance from './axiosConfig'

export const fetcher = async <TResponse, TRequest = unknown>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: TRequest,
    config?: Record<string, unknown>
): Promise<TResponse> => {
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
            ...config,
        })
        return response.data as TResponse
    } catch (error) {
        console.error(`Error in fetcher: ${error}`)
        throw error
    }
}
