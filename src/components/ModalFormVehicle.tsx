// import { useState } from "react";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { VehicleTypes } from "../context/driverProvider";
import { schemaVehicle } from "./schemas";
import { DataVehicleRowType } from "./dataTableVehicle";

type ModalFormProps = {
  editVehicle?: DataVehicleRowType | null
  openModalVehicles: boolean
  handleCloseModal: () => void
  onSubmit: (data: VehicleTypes) => void
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

export function ModalFormVehicle({ editVehicle, openModalVehicles, handleCloseModal, onSubmit }: ModalFormProps) {
  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<VehicleTypes>({
    resolver: yupResolver(schemaVehicle)
  })

   const handleClose = () => {
    reset()
    handleCloseModal()
  };

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
