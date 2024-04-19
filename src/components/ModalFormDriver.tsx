// import { useState } from "react";
import { Box, Button, MenuItem, Modal, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DriverTypes } from "../context/driverProvider";
import { schemaDriver } from "./schemas";
import { DataDriverRowType } from "./dataTableDriver";
import { useGetVehicles } from "../hooks/useVehicles";
import { DataVehicleRowType } from "./dataTableVehicle";

type ModalFormProps = {
  editDriver?: DataDriverRowType | null
  openModalDrivers: boolean
  handleCloseModal: () => void
  onSubmit: (data: DriverTypes) => void
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

export function ModalFormDriver({ editDriver, openModalDrivers, handleCloseModal, onSubmit }: ModalFormProps) {
  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<DriverTypes>({
    resolver: yupResolver(schemaDriver)
  })

   const { data: vehicles } = useGetVehicles()

   const handleClose = () => {
    reset()
    handleCloseModal()
  };

  return (
    <Modal
      open={openModalDrivers}
      onClose={handleClose}
    >
      <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <TextField
            label="Nome *"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("name")}
            defaultValue={editDriver?.row.name}
            error={!!errors.name}
            helperText={!!errors.name && errors.name.message}
          />
          <TextField
            label="Documento *"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("document")}
            defaultValue={editDriver?.row.document}
            error={!!errors.document}
            helperText={!!errors.document && errors.document.message}
          />
          <TextField
            defaultValue={editDriver?.row.bond || ""}
            select
            label="Veículo"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("bond")}
            disabled={!vehicles?.length}
            helperText={!vehicles?.length && 'Não há veículo cadastrado'}
          >
            {/* {vehicles?.map((item: DataVehicleRowType) => (
              <MenuItem key={item.id} value={item.placa}>
                {item.marca} - {item.placa}
              </MenuItem>
            ))} */}
          </TextField>
          <Button type='submit' variant='contained'>Salvar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
