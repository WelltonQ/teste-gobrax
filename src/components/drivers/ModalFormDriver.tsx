import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, Modal, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { style } from '../../styles/modal'

import { useAlterDriver, useCreateDriver } from '../../hooks/useDrivers'
import { useGetVehicles } from '../../hooks/useVehicles'
import { DriverTypes, VehicleTypes } from '../../types'
import { schemaDriver } from '../schemas'
import { DataDriverRowType } from './hooks/useDriversHook'

type ModalFormProps = {
  editDriver?: DataDriverRowType | null
  openModalDrivers: boolean
  handleCloseModal: () => void
}

export function ModalFormDriver({
  editDriver,
  openModalDrivers,
  handleCloseModal
}: ModalFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<DriverTypes>({
    resolver: yupResolver(schemaDriver)
  })

  const { data: vehicles } = useGetVehicles()
  const mutationCreateDriver = useCreateDriver()
  const { mutateAsync: mutationAlter } = useAlterDriver()

  const handleCreateDriver = (data: DriverTypes) => {
    mutationCreateDriver.mutate(data)
  }

  const handleClose = () => {
    reset()
    handleCloseModal()
  }

  const handleAlterDriver = (data: DriverTypes) => {
    const newData = {
      ...data,
      id: editDriver?.row.id
    }
    mutationAlter(newData)
  }

  const onSubmit: SubmitHandler<DriverTypes> = (data) => {
    if (!editDriver) {
      handleCreateDriver(data)
    } else handleAlterDriver(data)

    handleClose()
  }

  return (
    <Modal open={openModalDrivers} onClose={handleClose}>
      <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <TextField
            label="Nome *"
            InputLabelProps={{
              shrink: true
            }}
            {...register('name')}
            defaultValue={editDriver?.row.name}
            error={!!errors.name}
            helperText={!!errors.name && errors.name.message}
          />
          <TextField
            label="Documento *"
            InputLabelProps={{
              shrink: true
            }}
            {...register('document')}
            defaultValue={editDriver?.row.document}
            error={!!errors.document}
            helperText={!!errors.document && errors.document.message}
          />
          <TextField
            defaultValue={editDriver?.row.bond || ''}
            select
            label="Veículo"
            InputLabelProps={{
              shrink: true
            }}
            {...register('bond')}
            disabled={!vehicles?.length}
            helperText={!vehicles?.length && 'Não há veículo cadastrado'}
          >
            {vehicles?.map((item: VehicleTypes) => (
              <MenuItem key={item.id} value={item.plate}>
                {item.mark} - {item.plate}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
