import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../server/api"
import { DriverTypes } from "../context/driverProvider"

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
      return api.put(`/drivers/${editDriver.id}`, editDriver)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })
}