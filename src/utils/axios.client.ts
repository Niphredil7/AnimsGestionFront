import axios, { type AxiosInstance } from 'axios'
import { authApi } from '../api/auth.api'
import { userStore } from '../features/store/user.store'

const baseURL = "http://localhost:3000"

export function AxiosRefreshClient(){
   const api: AxiosInstance = axios.create({
    baseURL
  })
  api.interceptors.request.use(
    config => {
      const refreshToken = userStore.getState().refresh_token

      if (refreshToken) {
        config.headers['Authorization'] = 'Bearer ' + refreshToken
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )
  return api
}

export function axiosClient() {


  
  const api: AxiosInstance = axios.create({
    baseURL
  })

  api.interceptors.request.use(
    config => {
      // const { access_token} = userStore.getState()
      const token = userStore.getState().access_token
      // console.log(token)
      // const token = localStorage.getItem('access_token')
      // const token = userStore.getState().getAccessToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  api.interceptors.response.use(

    response => {
      return response
    },

    async error => {
      if (error.response?.status === 401) {

        const originalRequest = error.config
        if (originalRequest._retry) return Promise.reject(error)
        originalRequest._retry = true

        const refreshToken = userStore.getState().refresh_token



        if (!refreshToken) {
          authApi.destroyTokenUser()
          window.location.href = '/signin'
          return
        }

        try {
  
          const {data} = await authApi.refreshTokens()

            userStore.setState({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            });
            // setAccessToken(data.access_token)
            // setRefreshToken(data.refresh_token)

          // localStorage.setItem('access_token', tokens.access_token)
          // localStorage.setItem('refresh_token', tokens.refresh_token)

          originalRequest.headers.Authorization = `Bearer ${data.access_token}`

          return api(originalRequest)

        } catch (refreshError) {
          console.error('Échec du rafraîchissement du token :', refreshError)
          authApi.destroyTokenUser()
          window.location.href = '/signin'
        }
      }

      if (error.response && error.response.status === 500) {}

      return Promise.reject(error)
    }
    
  )

  return api
}


