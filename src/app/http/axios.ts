import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

interface AxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const baseurl = process.env.NEXT_PUBLIC_LOCAL_API_URL

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true

            try {
                console.log("URL: ", process.env.NEXT_PUBLIC_LOCAL_API_URL, "/auth/refresh")
                const res = await api.post(`${baseurl}/auth/refresh`, {}, { withCredentials: true })
                const newToken = res.data.accessToken

                localStorage.setItem('token', newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError) {
                const axiosError  = refreshError as AxiosError<{ message?: string }>
                const status = axiosError.response?.status;
                const message = axiosError.response?.data?.message;

                if (status === 403 && message === 'Invalid or expired refresh token') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('logedUser');
                    window.dispatchEvent(new Event('userLoggedOut'));
                } else {
                    console.error('Error inesperado al refrescar token:', refreshError);
                }
            }
        }

        return Promise.reject(error)
    }
)

export default api