import { DataGrid, GridColDef } from '@mui/x-data-grid';
import loadingGif from '../assets/loading.gif'
import { Box, Button } from '@mui/material';
import { VehicleTypes } from '../context/driverProvider';
import { useState } from 'react';
import { useAlterVehicle, useDeleteVehicle, useGetVehicles } from '../hooks/useVehicles';
import { ModalConfirmation } from './modalConfirmation';
import { SubmitHandler } from 'react-hook-form';
import { ModalFormVehicle } from './ModalFormVehicle';

export type DataVehicleRowType = {
  row: VehicleTypes
}

export function DataTableVehicle() {
  const [openModalVehicles, setOpenModalVehicles] = useState(false);
  const [openModalDeleteVehicle, setOpenModalDeleteVehicle] = useState(false);
  const [editVehicle, setEditVehicle] = useState<DataVehicleRowType | null>(null);

  const { data, isLoading } = useGetVehicles()
  const mutationAlter = useAlterVehicle()
  const mutationDelete = useDeleteVehicle()

  const handleOpen = (values: DataVehicleRowType) => {
    setEditVehicle(values)
    setOpenModalVehicles(true)
  };
  
  const handleClose = () => {
    setOpenModalVehicles(false)
  };

  const handleOpenDelete = (values: DataVehicleRowType) => {
    setEditVehicle(values)
    setOpenModalDeleteVehicle(true)
  };

  const handleCloseDelete = () => {
    setOpenModalDeleteVehicle(false)
  };

  const handleDelete = (values: DataVehicleRowType | null) => {
    console.log("🚀 ~ handleDelete ~ values:", values)
    mutationDelete.mutate(values?.row.id)
    handleCloseDelete()
  }

  const columnsVehicles: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'mark', headerName: 'Marca', width: 200 },
    { field: 'plate', headerName: 'Placa', width: 200 },
    { 
      field: 'edit', 
      headerName: 'Ações',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <>
          <Button variant='outlined' sx={{textTransform: 'none', mr: "5px"}} onClick={() => handleOpen(params)}>
            Editar
          </Button>
          <Button variant='outlined' sx={{textTransform: 'none', ml: "5px"}} onClick={() => handleOpenDelete(params)}>
            Excluir
          </Button>
        </>
      )
    },
  ];

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={loadingGif} alt="Carregando..." />
    </Box>
  )

  const onSubmit: SubmitHandler<VehicleTypes> = (data) => {
    const newData = {
      ...data,
      id: editVehicle?.row.id
    }
    mutationAlter.mutate(newData)
    handleClose()
  }

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsVehicles}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnMenu
        />
      </div>
      <ModalFormVehicle
        openModalVehicles={openModalVehicles}
        editVehicle={editVehicle}
        handleCloseModal={handleClose}
        onSubmit={onSubmit}
      />
      <ModalConfirmation
        title={`Tem certeza que deseja excluir o veículo ${editVehicle?.row.mark} - ${editVehicle?.row.plate}?`}
        openModal={openModalDeleteVehicle}
        handleCloseModal={handleCloseDelete}
        onSubmit={() => handleDelete(editVehicle)}
      /> 
    </>
  );
}