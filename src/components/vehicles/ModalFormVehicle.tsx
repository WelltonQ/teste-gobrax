// import { useState } from "react";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaVehicle } from "../schemas";
import { DataVehicleRowType } from "./dataTableVehicle";
import { DriverTypes, VehicleTypes } from "../../types";
import { useAlterVehicle, useCreateVehicle } from "../../hooks/useVehicles";
import { useAlterDriver, useGetDrivers } from "../../hooks/useDrivers";

type ModalFormProps = {
  editVehicle?: DataVehicleRowType | null
  openModalVehicles: boolean
  handleCloseModal: () => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ModalFormVehicle({ editVehicle, openModalVehicles, handleCloseModal }: ModalFormProps) {
  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<VehicleTypes>({
    resolver: yupResolver(schemaVehicle)
  })

  const mutationCreateVehicle = useCreateVehicle()
  const mutationAlter = useAlterVehicle()
  const mutationAlterDriver = useAlterDriver()
  const { data: drivers } = useGetDrivers()


  const handleCreateVehicle = (data: VehicleTypes) => {
    mutationCreateVehicle.mutate(data)
  }

  const handleAlterBondDriver = (data: VehicleTypes) => {
    const filterDriver = drivers.filter((item: DriverTypes) => item.bond === editVehicle?.row.plate)
    return filterDriver.map((obj: DriverTypes) => mutationAlterDriver.mutate({
      ...obj,
      bond: data.plate
    }))
  }
  
  const handleAlterVehicle = (data: VehicleTypes) => {
    const newData = {
      ...data,
      id: editVehicle?.row.id
    }
    mutationAlter.mutate(newData)
    handleAlterBondDriver(data)    
  }

  const handleClose = () => {
    reset()
    handleCloseModal()
  };

  const onSubmit: SubmitHandler<VehicleTypes> = (data) => {
    if (!editVehicle) {
      handleCreateVehicle(data)
    } else (
      handleAlterVehicle(data)
    )

    handleClose()
  }

  return (
    <Modal
      open={openModalVehicles}
      onClose={handleClose}
    >
      <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <TextField
            label="Marca *"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("mark")}
            defaultValue={editVehicle?.row.mark}
            error={!!errors.mark}
            helperText={!!errors.mark && errors.mark.message}
          />
          <TextField
            label="Placa *"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("plate")}
            defaultValue={editVehicle?.row.plate}
            error={!!errors.plate}
            helperText={!!errors.plate && errors.plate.message}
          />
          <Button type='submit' variant='contained'>Salvar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
