'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from '@/utils/axios'

// Example GET request hook
export function useGetData(key, url, options = {}) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const { data } = await axios.get(url)
        return data
      } catch (error) {
        console.log('API Error:', error)
        throw error
      }
    },
    enabled: true,
    ...options,
  })
}

// Example POST request hook
export function usePostData(key, url, options = {}) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(url, payload)
      return data
    },
    ...options,
  })
}

// Example PUT request hook
export function usePutData(key, url, options = {}) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.put(url, payload)
      return data
    },
    ...options,
  })
}

// Example DELETE request hook
export function useDeleteData(key, url, options = {}) {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(url)
      return data
    },
    ...options,
  })
} 