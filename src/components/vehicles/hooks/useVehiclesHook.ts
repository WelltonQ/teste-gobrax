import { useState } from 'react'

import { useAlterDriver, useGetDrivers } from '../../../hooks/useDrivers'
import { useDeleteVehicle, useGetVehicles } from '../../../hooks/useVehicles'
import { DriverTypes, VehicleTypes } from '../../../types'

export type DataVehicleRowType = {
  row: VehicleTypes
}

export function UseVehicleHook() {
  const [openModalVehicles, setOpenModalVehicles] = useState(false)
  const [openModalDeleteVehicle, setOpenModalDeleteVehicle] = useState(false)
  const [editVehicle, setEditVehicle] = useState<DataVehicleRowType | null>(
    null
  )

  const { data, isLoading } = useGetVehicles()
  const mutationDelete = useDeleteVehicle()
  const { mutateAsync: mutationAlterDriver } = useAlterDriver()
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
      mutationAlterDriver({
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

  return {
    openModalVehicles,
    openModalDeleteVehicle,
    data,
    isLoading,
    editVehicle,
    handleOpen,
    handleClose,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete
  }
}
