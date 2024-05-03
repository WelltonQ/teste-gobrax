import { useState } from 'react'

import { useDeleteDriver } from '../../hooks/useDrivers'
import { DriverTypes } from '../../types'

export type DataDriverRowType = {
  row: DriverTypes
}
export function UseDriversHook() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false)
  const [openModalDeleteDrivers, setOpenModalDeleteDriver] = useState(false)
  const [editDriver, setEditDriver] = useState<DataDriverRowType | null>(null)

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

  return {
    openModalDrivers,
    openModalDeleteDrivers,
    editDriver,
    handleOpen,
    handleClose,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete
  }
}
