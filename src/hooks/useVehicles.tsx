import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../server/api"
import { DriverTypes } from "../context/driverProvider"

export const useGetVehicles = () => {
  return useQuery({ queryKey: ['vehicles'], queryFn: async () => {
    const { data } = await api.get('/vehicles')
    return data
  }})
}

export const useCreateVehicle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newDriver: DriverTypes) => {
      return api.post('/drivers', newDriver)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })
}