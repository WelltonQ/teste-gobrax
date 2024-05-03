import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import loadingGif from '../../assets/loading.gif'
import noData from '../../assets/no-data.gif'
import { useAlterDriver, useGetDrivers } from '../../hooks/useDrivers'
import { useDeleteVehicle, useGetVehicles } from '../../hooks/useVehicles'
import { DriverTypes, VehicleTypes } from '../../types'
import { ModalConfirmation } from '../modalConfirmation'
import { ModalFormVehicle } from './ModalFormVehicle'

export type DataVehicleRowType = {
  row: VehicleTypes
}

export function DataTableVehicle() {
  const [openModalVehicles, setOpenModalVehicles] = useState(false)
  const [openModalDeleteVehicle, setOpenModalDeleteVehicle] = useState(false)
  const [editVehicle, setEditVehicle] = useState<DataVehicleRowType | null>(
    null
  )

  const { data, isLoading } = useGetVehicles()
  const mutationDelete = useDeleteVehicle()
  const mutationAlterDriver = useAlterDriver()
  const { data: drivers } = useGetDrivers()

  const handleOpen = (values: DataVehicleRowType) => {
    setEditVehicle(values)
    setOpenModalVehicles(true)
  }

  const handleClose = () => {
    setOpenModalVehicles(false)
  }

  const handleOpenDelete = (values: DataVehicleRowType) => {
    setEditVehicle(values)
    setOpenModalDeleteVehicle(true)
  }

  const handleCloseDelete = () => {
    setOpenModalDeleteVehicle(false)
  }

  const handleAlterBondDriver = () => {
    const filterDriver = drivers.filter(
      (item: DriverTypes) => item.bond === editVehicle?.row.plate
    )
    return filterDriver.map((obj: DriverTypes) =>
      mutationAlterDriver.mutate({
        ...obj,
        bond: ''
      })
    )
  }

  const handleDelete = (values: DataVehicleRowType | null) => {
    mutationDelete.mutate(values?.row.id)
    handleAlterBondDriver()
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
          Não há veículos cadastrados
        </Typography>
        <img src={noData} alt="Sem dados" />
      </Box>
    )

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsVehicles}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 15]}
          disableColumnMenu
          hideFooterSelectedRowCount
        />
      </div>
      <ModalFormVehicle
        openModalVehicles={openModalVehicles}
        editVehicle={editVehicle}
        handleCloseModal={handleClose}
      />
      <ModalConfirmation
        title={`Tem certeza que deseja excluir o veículo ${editVehicle?.row.mark} - ${editVehicle?.row.plate}?`}
        openModal={openModalDeleteVehicle}
        handleCloseModal={handleCloseDelete}
        onSubmit={() => handleDelete(editVehicle)}
      />
    </>
  )
}
