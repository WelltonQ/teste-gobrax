import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import loadingGif from '../../assets/loading.gif'
import noData from '../../assets/no-data.gif'
import { useContextProvider } from '../../context/contextProvider'
import { useGetDrivers } from '../../hooks/useDrivers'
import { DriverTypes } from '../../types'
import { ModalConfirmation } from '../modalConfirmation'
import { ModalFormDriver } from './ModalFormDriver'
import { UseDriversHook } from './useDriversHook'

export function DataTableDriver() {
  const { handleSelectDriver } = useContextProvider()
  const { data, isLoading } = useGetDrivers()
  const {
    openModalDrivers,
    openModalDeleteDrivers,
    editDriver,
    handleClose,
    handleCloseDelete,
    handleDelete,
    handleOpen,
    handleOpenDelete
  } = UseDriversHook()

  const columnsDrivers: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'document', headerName: 'Documento', width: 200 },
    {
      field: 'bond',
      headerName: 'Vínculo',
      width: 200,
      valueGetter: (params: string) => (params ? 'Sim' : 'Não')
    },
    {
      field: 'edit',
      headerName: 'Ações',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', mr: '5px', fontSize: '0.75rem' }}
            onClick={() => handleOpen(params)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', ml: '5px', fontSize: '0.75rem' }}
            onClick={() => handleOpenDelete(params)}
          >
            Excluir
          </Button>
        </>
      )
    }
  ]

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={loadingGif} alt="Carregando..." />
      </Box>
    )

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    const selectedRows = newSelection.map((id) =>
      data.find((row: DriverTypes) => row.id === id)
    )
    handleSelectDriver(selectedRows)
  }

  if (!data.length && !isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 4
        }}
      >
        <Typography component="h2" sx={{ fontSize: '20px' }}>
          Não há motoristas cadastrados
        </Typography>
        <img src={noData} alt="Sem dados" />
      </Box>
    )

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsDrivers}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableMultipleRowSelection
          disableColumnMenu
          hideFooterSelectedRowCount
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </div>
      <ModalFormDriver
        openModalDrivers={openModalDrivers}
        editDriver={editDriver}
        handleCloseModal={handleClose}
      />
      <ModalConfirmation
        title={`Tem certeza que deseja excluir o motorista ${editDriver?.row.name}?`}
        openModal={openModalDeleteDrivers}
        handleCloseModal={handleCloseDelete}
        onSubmit={() => handleDelete(editDriver)}
      />
    </>
  )
}
