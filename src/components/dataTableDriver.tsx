import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import loadingGif from '../assets/loading.gif'
import { Box, Button } from '@mui/material';
import { DriverTypes } from '../context/driverProvider';
import { useDriver } from '../context/driverProvider';
import { useState } from 'react';
import { useAlterDriver, useDeleteDriver, useGetDrivers } from '../hooks/useDrivers';
import { ModalConfirmation } from './modalConfirmation';
import { ModalFormDriver } from './ModalFormDriver';
import { SubmitHandler } from 'react-hook-form';

export type DataDriverRowType = {
  row: DriverTypes
}

export function DataTableDriver() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false);
  const [openModalDeleteDrivers, setOpenModalDeleteDriver] = useState(false);
  const [editDriver, setEditDriver] = useState<DataDriverRowType | null>(null);

  const { handleSelectDriver } = useDriver()
  const { data, isLoading } = useGetDrivers()
  const mutationDelete = useDeleteDriver()
  const mutationAlter = useAlterDriver()

  const handleOpen = (values: DataDriverRowType) => {
    setEditDriver(values)
    setOpenModalDrivers(true)
  };
  
  const handleClose = () => {
    setOpenModalDrivers(false)
  };

  const handleOpenDelete = (values: DataDriverRowType) => {
    setEditDriver(values)
    setOpenModalDeleteDriver(true)
  };

  const handleCloseDelete = () => {
    setOpenModalDeleteDriver(false)
  };

  const handleDelete = (values: DataDriverRowType | null) => {
    mutationDelete.mutate(values?.row.id)
    handleCloseDelete()
  }

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

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    const selectedRows = newSelection.map((id) =>
      data.find((row: DriverTypes) => row.id === id)
    );
    handleSelectDriver(selectedRows);
  };


  const onSubmit: SubmitHandler<DriverTypes> = (data) => {
    const newData = {
      ...data,
      id: editDriver?.row.id
    }
    mutationAlter.mutate(newData)
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
      <ModalFormDriver 
        openModalDrivers={openModalDrivers}
        editDriver={editDriver}
        handleCloseModal={handleClose}
        onSubmit={onSubmit}
      />
      <ModalConfirmation
        title={`Tem certeza que deseja excluir o motorista ${editDriver?.row.name}?`}
        openModal={openModalDeleteDrivers}
        handleCloseModal={handleCloseDelete}
        onSubmit={() => handleDelete(editDriver)}
      />
    </>
  );
}