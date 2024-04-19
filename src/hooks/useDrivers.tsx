import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../server/api"
import { DriverTypes } from "../types"

export const useGetDrivers = () => {
  return useQuery({ queryKey: ['drivers'], queryFn: async () => {
    const { data } = await api.get('/drivers')
    return data
  }})
}

export const useCreateDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (editDriver: DriverTypes) => {
      return api.post('/drivers', editDriver)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })
}

export const useAlterDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (editDriver: DriverTypes) => {
      return api.put(`/drivers/${editDriver.id}`, editDriver)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })
}

export const useDeleteDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | undefined) => {
      return api.delete(`/drivers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })
}