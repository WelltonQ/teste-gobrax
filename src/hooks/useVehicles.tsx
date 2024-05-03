import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '../server/api'
import { VehicleTypes } from '../types'

export const useGetVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles')
      return data
    }
  })
}

export const useCreateVehicle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newVehicle: VehicleTypes) => {
      return api.post('/vehicles', newVehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast.success('Veículo criado com sucesso')
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
      toast.success('Veículo alterado com sucesso')
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
      toast.success('Veículo excluído com sucesso')
    }
  })
}
