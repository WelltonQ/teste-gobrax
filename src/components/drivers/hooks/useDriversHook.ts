import { GridRowSelectionModel } from '@mui/x-data-grid'
import { useState } from 'react'

import { useContextProvider } from '../../../context/contextProvider'
import { useDeleteDriver, useGetDrivers } from '../../../hooks/useDrivers'
import { DriverTypes } from '../../../types'

export type DataDriverRowType = {
  row: DriverTypes
}
export function useDriversHook() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false)
  const [openModalDeleteDrivers, setOpenModalDeleteDriver] = useState(false)
  const [editDriver, setEditDriver] = useState<DataDriverRowType | null>(null)

  const { handleSelectDriver } = useContextProvider()
  const { data, isLoading } = useGetDrivers()
  const mutationDelete = useDeleteDriver()

  const handleOpen = (values: DataDriverRowType) => {
    setEditDriver(values)
    setOpenModalDrivers(true)
  }

  const handleClose = () => {
    setOpenModalDrivers(false)
  }

  const handleOpenDelete = (values: DataDriverRowType) => {
    setEditDriver(values)
    setOpenModalDeleteDriver(true)
  }

  const handleCloseDelete = () => {
    setOpenModalDeleteDriver(false)
  }

  const handleDelete = (values: DataDriverRowType | null) => {
    mutationDelete.mutate(values?.row.id)
    handleCloseDelete()
  }

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    const selectedRows = newSelection.map((id) =>
      data.find((row: DriverTypes) => row.id === id)
    )
    handleSelectDriver(selectedRows)
  }

  return {
    openModalDrivers,
    openModalDeleteDrivers,
    editDriver,
    data,
    isLoading,
    handleOpen,
    handleClose,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete,
    handleSelectionModelChange
  }
}
