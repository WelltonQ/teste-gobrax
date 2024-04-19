import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Button, Tabs } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';

// import { CustomTabPanel } from './customTabPanel';
import logo from '../assets/gobrax.svg'
import { ModalFormDriver } from './ModalFormDriver';
import { useCreateDriver } from '../hooks/useDrivers';
import { VehicleTypes, useDriver } from '../context/driverProvider';
import { ModalFormVehicle } from './ModalFormVehicle';
import { useCreateVehicle } from '../hooks/useVehicles';

type DriverTypes = {
  name: string
  document: string
  bond?: string
}

// type DataVehicleRowType = {
//   id: string
//   placa: string
//   marca: string
// }

export function Header() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false);
  const [openModalVehicles, setOpenModalVehicles] = useState(false);
  const { handleTabs, tabValue } = useDriver()

  const mutationCreateDriver = useCreateDriver()
  const mutationCreateVehicle = useCreateVehicle()

  const handleOpenVehicle = () => setOpenModalVehicles(true);
  const handleCloseVehicle = () => {
    setOpenModalVehicles(false)
  };

  const handleOpen = () => setOpenModalDrivers(true);
  const handleCloseDriver = () => {
    setOpenModalDrivers(false)
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    handleTabs(newValue)
  };

  const onSubmitDriver: SubmitHandler<DriverTypes> = (data) => {
    mutationCreateDriver.mutate(data)
    handleCloseDriver()
  }

  const onSubmitVehicle: SubmitHandler<VehicleTypes> = (data) => {
    mutationCreateVehicle.mutate(data)
    handleCloseVehicle()
  }

  return (
    <>
      <Box component="header" sx={{height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Box>
            <Tabs value={tabValue} onChange={handleChange} aria-label="Lista de motoristas e veículos">
              <Tab label="Motoristas" sx={{textTransform: 'none', fontSize: '16px'}} value={0} />
              <Tab label="Veículos" sx={{textTransform: 'none', fontSize: '16px'}} value={1} />
            </Tabs>
          </Box>
        </Box>
        <img src={logo} alt="Logotipo do nome Gobrax" />
        {tabValue === 0 && (
          <Button onClick={handleOpen} sx={{width: '210px', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Motorista</Button>
        )} 
        {tabValue === 1 && (
          <Button onClick={handleOpenVehicle} sx={{width: '210px', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Veículo</Button>
        )}
      </Box>
      <ModalFormDriver 
        openModalDrivers={openModalDrivers}
        handleCloseModal={handleCloseDriver}
        onSubmit={onSubmitDriver}
      />
      <ModalFormVehicle
        openModalVehicles={openModalVehicles}
        // editDriver={editDriver}
        handleCloseModal={handleCloseVehicle}
        onSubmit={onSubmitVehicle}
      />
    </>
  )
}