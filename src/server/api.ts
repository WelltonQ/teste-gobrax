import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_URL}`,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
