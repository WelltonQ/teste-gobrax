import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import loadingGif from '../assets/loading.gif'
import { Box, Button, MenuItem, Modal, Stack, TextField } from '@mui/material';
import { DriverTypes } from '../context/driverProvider';
import { useDriver } from '../context/driverProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaDriver } from './schemas';
import { useState } from 'react';
import { useCreateDriver, useGetDrivers } from '../hooks/useDrivers';
import { useGetVehicles } from '../hooks/useVehicles';

type DataDriverRowType = {
  row: DriverTypes
}

type DataVehicleRowType = {
  id: string
  placa: string
  marca: string
}

export default function DataTable() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false);
  const [editDriver, setEditDriver] = useState<DataDriverRowType | null>(null);

  const { handleSelectDriver } = useDriver()
  const { data, isLoading } = useGetDrivers()
  const { data: vehicles } = useGetVehicles()

  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<DriverTypes>({
    resolver: yupResolver(schemaDriver)
  })

  const handleOpen = (values: DataDriverRowType) => {
    setEditDriver(values)
    setOpenModalDrivers(true)
  };
  
  const handleClose = () => {
    reset()
    setOpenModalDrivers(false)
  };

  const columnsDrivers: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'document', headerName: 'Documento', width: 200 },
    { 
      field: 'bond', 
      headerName: 'Vínculo', 
      width: 200, 
      valueGetter: (params: string) => (params !== "" ? 'Sim' : 'Não')
    },
    { 
      field: 'edit', 
      headerName: 'Ações',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <Button variant='outlined' sx={{textTransform: 'none'}} onClick={() => handleOpen(params)}>
          Editar
        </Button>
      )
    },
  ];

  const mutation = useCreateDriver()

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={loadingGif} alt="Carregando..." />
    </Box>
  )

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    const selectedRows = newSelection.map((id) =>
      data.find((row: DriverTypes) => row.id === id)
    );
    handleSelectDriver(selectedRows);
  };

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

  
  const onSubmit: SubmitHandler<DriverTypes> = (data) => {
    const newData = {
      ...data,
      id: editDriver?.row.id
    }
    mutation.mutate(newData)
    handleClose()
  }

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsDrivers}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableMultipleRowSelection
          disableColumnMenu
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </div>
      <Modal
        open={openModalDrivers}
        onClose={handleClose}
        aria-labelledby="Novo Motorista"
        aria-describedby="Adicionar novo motorista"
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
              defaultValue={editDriver?.row.bond}
              select
              label="Veículo"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("bond")}
              disabled={!vehicles.length}
              helperText={!vehicles.length && 'Não há veículo cadastrado'}
            >
              {vehicles.map((item: DataVehicleRowType) => (
                <MenuItem key={item.id} value={item.placa}>
                  {item.marca} - {item.placa}
                </MenuItem>
              ))}
            </TextField>
            <Button type='submit' variant='contained'>Salvar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}