import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../server/api"
import { VehicleTypes } from "../context/driverProvider"

export const useGetVehicles = () => {
  return useQuery({ queryKey: ['vehicles'], queryFn: async () => {
    const { data } = await api.get('/vehicles')
    return data
  }})
}

export const useCreateVehicle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newVehicle: VehicleTypes) => {
      return api.post('/vehicles', newVehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    }
  })
}

export const useAlterVehicle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newVehicle: VehicleTypes) => {
      return api.put(`/vehicles/${newVehicle.id}`, newVehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    }
  })
}

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | undefined) => {
      return api.delete(`/vehicles/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    }
  })
}