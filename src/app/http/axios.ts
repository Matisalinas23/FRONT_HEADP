import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("condition aproved")
            originalRequest._retry = true

            try {
                const res = await api.post('http://localhost:3000/auth/refresh', {}, { withCredentials: true })
                const newToken = res.data.accessToken

                localStorage.setItem('token', newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError: any) {
                const status = refreshError.response?.status;
                const message = refreshError.response?.data?.message;

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